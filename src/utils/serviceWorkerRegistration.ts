// Service Worker Registration
// This file handles the registration of the service worker for PWA functionality

// Check if service workers are supported
export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      const swUrl = '/service-worker.js';
      
      registerValidSW(swUrl);
      
      // Add event listener for beforeinstallprompt
      window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault();
        // Store the event so it can be triggered later
        (window as any).deferredPrompt = e;
        
        // Update UI to notify the user they can add to home screen
        const installButton = document.getElementById('install-button');
        if (installButton) {
          installButton.style.display = 'block';
        }
      });
    });
  }
}

// Register the service worker
function registerValidSW(swUrl: string) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);
      
      // Check for updates on page load
      registration.update();
      
      // Set up periodic updates
      setInterval(() => {
        registration.update();
      }, 60 * 60 * 1000); // Check for updates every hour
      
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // At this point, the updated precached content has been fetched,
              // but the previous service worker will still serve the older
              // content until all client tabs are closed.
              console.log('New content is available and will be used when all tabs for this page are closed.');
              
              // Show update notification to user
              showUpdateNotification();
            } else {
              // At this point, everything has been precached.
              console.log('Content is cached for offline use.');
            }
          }
        };
      };
    })
    .catch((error) => {
      console.error('Error during service worker registration:', error);
    });
}

// Show notification to user about update
function showUpdateNotification() {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = 'fixed bottom-4 right-4 bg-green-600 text-white p-4 rounded-lg shadow-lg z-50 flex items-center';
  notification.innerHTML = `
    <div class="mr-3">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    </div>
    <div class="flex-1">
      <p class="font-medium">Update Available</p>
      <p class="text-sm">Refresh to get the latest version</p>
    </div>
    <button id="update-button" class="ml-4 bg-white text-green-600 px-3 py-1 rounded text-sm font-medium">
      Update
    </button>
    <button id="close-notification" class="ml-2 text-white">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  `;
  
  // Add to DOM
  document.body.appendChild(notification);
  
  // Add event listeners
  document.getElementById('update-button')?.addEventListener('click', () => {
    window.location.reload();
  });
  
  document.getElementById('close-notification')?.addEventListener('click', () => {
    notification.remove();
  });
}

// Function to prompt user to install the PWA
export function promptInstall() {
  const deferredPrompt = (window as any).deferredPrompt;
  if (!deferredPrompt) {
    // The deferred prompt isn't available
    return;
  }
  
  // Show the install prompt
  deferredPrompt.prompt();
  
  // Wait for the user to respond to the prompt
  deferredPrompt.userChoice.then((choiceResult: { outcome: string }) => {
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    // Clear the deferredPrompt so it can be garbage collected
    (window as any).deferredPrompt = null;
    
    // Hide the install button
    const installButton = document.getElementById('install-button');
    if (installButton) {
      installButton.style.display = 'none';
    }
  });
}

// Function to check if the app is in standalone mode (installed as PWA)
export function isInStandaloneMode() {
  return (window.matchMedia('(display-mode: standalone)').matches) || 
         ((window.navigator as any).standalone) || 
         document.referrer.includes('android-app://');
}

// Function to store data for offline use
export function storeDataForOffline(key: string, data: any) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error storing data for offline use:', error);
    return false;
  }
}

// Function to retrieve offline data
export function getOfflineData(key: string) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error retrieving offline data:', error);
    return null;
  }
}

// Function to store form data in IndexedDB for background sync
export async function storeFormDataForSync(formData: any) {
  if (!('indexedDB' in window)) {
    console.error('IndexedDB not supported');
    return false;
  }
  
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('FuelFriendlyDB', 1);
    
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains('pendingRequests')) {
        db.createObjectStore('pendingRequests', { keyPath: 'id' });
      }
    };
    
    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction('pendingRequests', 'readwrite');
      const store = transaction.objectStore('pendingRequests');
      
      const request = store.add({
        id: Date.now().toString(),
        timestamp: new Date(),
        data: formData
      });
      
      request.onsuccess = () => {
        // Register for background sync if available
        if ('serviceWorker' in navigator && 'SyncManager' in window) {
          navigator.serviceWorker.ready
            .then(registration => {
              registration.sync.register('fuel-request-sync')
                .then(() => {
                  console.log('Background sync registered');
                  resolve(true);
                })
                .catch(err => {
                  console.error('Background sync registration failed:', err);
                  resolve(false);
                });
            });
        } else {
          console.log('Background sync not supported');
          resolve(true); // Still stored in IndexedDB
        }
      };
      
      request.onerror = () => {
        console.error('Error storing form data for sync');
        reject(false);
      };
    };
    
    request.onerror = () => {
      console.error('Error opening IndexedDB');
      reject(false);
    };
  });
}
