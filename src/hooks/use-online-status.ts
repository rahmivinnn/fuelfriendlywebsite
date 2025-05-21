import { useState, useEffect } from 'react';

export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [wasOffline, setWasOffline] = useState(false);
  const [lastOfflineTime, setLastOfflineTime] = useState<Date | null>(null);
  const [lastOnlineTime, setLastOnlineTime] = useState<Date | null>(
    navigator.onLine ? new Date() : null
  );

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setLastOnlineTime(new Date());
      
      // If we were previously offline, set wasOffline to true
      if (!isOnline) {
        setWasOffline(true);
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
      setLastOfflineTime(new Date());
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [isOnline]);

  // Reset wasOffline after a delay
  useEffect(() => {
    if (wasOffline && isOnline) {
      const timer = setTimeout(() => {
        setWasOffline(false);
      }, 5000); // Reset after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [wasOffline, isOnline]);

  return {
    isOnline,
    wasOffline,
    lastOfflineTime,
    lastOnlineTime,
    reconnected: wasOffline && isOnline,
  };
}
