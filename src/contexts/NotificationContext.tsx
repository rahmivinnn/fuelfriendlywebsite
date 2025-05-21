import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Socket, io } from 'socket.io-client';

export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  timestamp: Date;
  read: boolean;
  link?: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
  isConnected: boolean;
}

const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  unreadCount: 0,
  addNotification: () => {},
  markAsRead: () => {},
  markAllAsRead: () => {},
  clearNotifications: () => {},
  isConnected: false,
});

// Mock socket for demo purposes
const createMockSocket = () => {
  const mockSocket = {
    on: (event: string, callback: Function) => {
      if (event === 'connect') {
        setTimeout(() => callback(), 1000);
      }
      if (event === 'notification') {
        // Simulate receiving notifications periodically
        const interval = setInterval(() => {
          const types: NotificationType[] = ['info', 'success', 'warning', 'error'];
          const randomType = types[Math.floor(Math.random() * types.length)];
          
          const notifications = [
            {
              title: 'New Order',
              message: 'Order #12345 has been placed for 500L of diesel',
              type: 'success' as NotificationType,
              link: '/admin-dashboard/orders'
            },
            {
              title: 'Delivery Update',
              message: 'Pump side service for order #12345 is on its way',
              type: 'info' as NotificationType,
              link: '/admin-dashboard/orders'
            },
            {
              title: 'Price Change',
              message: 'Diesel prices have increased by 2%',
              type: 'warning' as NotificationType,
              link: '/admin-dashboard/products'
            },
            {
              title: 'System Alert',
              message: 'Server maintenance scheduled for tonight',
              type: 'error' as NotificationType,
              link: '/admin-dashboard/settings'
            },
            {
              title: 'New User',
              message: 'A new user has registered on the platform',
              type: 'info' as NotificationType,
              link: '/admin-dashboard/users'
            },
          ];
          
          const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
          callback(randomNotification);
        }, 60000); // Send a notification every minute
        
        return () => clearInterval(interval);
      }
      return () => {};
    },
    off: () => {},
    disconnect: () => {},
    connected: true,
  };
  
  return mockSocket as unknown as Socket;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const savedNotifications = localStorage.getItem('notifications');
    if (savedNotifications) {
      try {
        const parsed = JSON.parse(savedNotifications);
        // Convert string timestamps back to Date objects
        return parsed.map((notification: any) => ({
          ...notification,
          timestamp: new Date(notification.timestamp)
        }));
      } catch (error) {
        console.error('Error parsing saved notifications:', error);
        return [];
      }
    }
    return [];
  });
  
  // Calculate unread count
  const unreadCount = notifications.filter(notification => !notification.read).length;
  
  // Initialize socket connection
  useEffect(() => {
    // In a real app, connect to a real socket server
    // const newSocket = io('https://api.fuelfriendly.com');
    
    // For demo purposes, use a mock socket
    const newSocket = createMockSocket();
    
    newSocket.on('connect', () => {
      setIsConnected(true);
      console.log('Connected to notification service');
    });
    
    newSocket.on('disconnect', () => {
      setIsConnected(false);
      console.log('Disconnected from notification service');
    });
    
    setSocket(newSocket);
    
    return () => {
      newSocket.disconnect();
    };
  }, []);
  
  // Listen for notifications
  useEffect(() => {
    if (!socket) return;
    
    const handleNotification = (data: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
      addNotification(data);
    };
    
    socket.on('notification', handleNotification);
    
    return () => {
      socket.off('notification', handleNotification);
    };
  }, [socket]);
  
  // Save notifications to localStorage
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);
  
  // Add a new notification
  const addNotification = (data: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      id: Math.random().toString(36).substring(2, 9),
      timestamp: new Date(),
      read: false,
      ...data
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    // Show toast for new notification
    toast({
      title: data.title,
      description: data.message,
      variant: data.type === 'error' ? 'destructive' : 'default',
      duration: 5000,
    });
  };
  
  // Mark a notification as read
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    );
  };
  
  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };
  
  // Clear all notifications
  const clearNotifications = () => {
    setNotifications([]);
  };
  
  return (
    <NotificationContext.Provider 
      value={{ 
        notifications, 
        unreadCount, 
        addNotification, 
        markAsRead, 
        markAllAsRead, 
        clearNotifications,
        isConnected
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
