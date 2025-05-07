// Service Worker for FuelFriendly PWA
const CACHE_NAME = 'fuelfriendly-cache-v1';

// Assets to cache on install
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/images/logo.png',
  '/assets/images/icons/icon-72x72.png',
  '/assets/images/icons/icon-96x96.png',
  '/assets/images/icons/icon-128x128.png',
  '/assets/images/icons/icon-144x144.png',
  '/assets/images/icons/icon-152x152.png',
  '/assets/images/icons/icon-192x192.png',
  '/assets/images/icons/icon-384x384.png',
  '/assets/images/icons/icon-512x512.png',
  '/assets/images/splash.png'
];

// Install event - precache assets
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing Service Worker...');
  
  // Skip waiting to ensure the new service worker activates immediately
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Precaching App Shell');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .catch((error) => {
        console.error('[Service Worker] Precaching failed:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating Service Worker...');
  
  // Claim clients to ensure the service worker takes control immediately
  event.waitUntil(self.clients.claim());
  
  // Remove old caches
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('[Service Worker] Removing old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
  );
  
  return self.clients.claim();
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }
  
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }
  
  // For HTML pages - use network-first strategy
  if (event.request.headers.get('accept').includes('text/html')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Clone the response to store in cache
          const responseToCache = response.clone();
          
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });
          
          return response;
        })
        .catch(() => {
          // If network fails, try to serve from cache
          return caches.match(event.request);
        })
    );
    return;
  }
  
  // For other assets - use cache-first strategy
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return from cache if found
        if (response) {
          return response;
        }
        
        // Otherwise fetch from network
        return fetch(event.request)
          .then((response) => {
            // Don't cache responses that aren't successful
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clone the response to store in cache
            const responseToCache = response.clone();
            
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          });
      })
  );
});

// Background sync for offline form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'fuel-request-sync') {
    event.waitUntil(syncFuelRequests());
  }
});

// Push notification event
self.addEventListener('push', (event) => {
  console.log('[Service Worker] Push Received:', event);
  
  let data = { title: 'FuelFriendly Update', body: 'New notification from FuelFriendly' };
  
  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      console.error('[Service Worker] Error parsing push data:', e);
    }
  }
  
  const options = {
    body: data.body,
    icon: '/assets/images/icons/icon-192x192.png',
    badge: '/assets/images/icons/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      url: data.url || '/'
    }
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Notification click event
self.addEventListener('notificationclick', (event) => {
  console.log('[Service Worker] Notification click:', event);
  
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});

// Function to sync fuel requests when back online
async function syncFuelRequests() {
  try {
    // Get all pending requests from IndexedDB
    const db = await openDatabase();
    const pendingRequests = await getPendingRequests(db);
    
    console.log('[Service Worker] Syncing fuel requests:', pendingRequests.length);
    
    // Process each request
    const syncPromises = pendingRequests.map(async (request) => {
      try {
        // Send the request to the server
        const response = await fetch('/api/fuel-requests', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(request.data)
        });
        
        if (response.ok) {
          // If successful, remove from pending requests
          await deleteRequest(db, request.id);
          
          // Show a success notification
          await self.registration.showNotification('Fuel Request Synced', {
            body: 'Your fuel request has been successfully submitted.',
            icon: '/assets/images/icons/icon-192x192.png',
            badge: '/assets/images/icons/badge-72x72.png'
          });
          
          return true;
        }
        
        return false;
      } catch (error) {
        console.error('[Service Worker] Error syncing request:', error);
        return false;
      }
    });
    
    return Promise.all(syncPromises);
  } catch (error) {
    console.error('[Service Worker] Sync failed:', error);
    return false;
  }
}

// IndexedDB helper functions
function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('FuelFriendlyDB', 1);
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('pendingRequests')) {
        db.createObjectStore('pendingRequests', { keyPath: 'id' });
      }
    };
    
    request.onsuccess = (event) => {
      resolve(event.target.result);
    };
    
    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
}

function getPendingRequests(db) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('pendingRequests', 'readonly');
    const store = transaction.objectStore('pendingRequests');
    const request = store.getAll();
    
    request.onsuccess = (event) => {
      resolve(event.target.result);
    };
    
    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
}

function deleteRequest(db, id) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('pendingRequests', 'readwrite');
    const store = transaction.objectStore('pendingRequests');
    const request = store.delete(id);
    
    request.onsuccess = () => {
      resolve();
    };
    
    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
}
