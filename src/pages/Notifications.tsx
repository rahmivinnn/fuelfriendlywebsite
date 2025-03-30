
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bell, Check, Trash2, Clock, ChevronDown, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

// Sample notification data
const notifications = [
  {
    id: 1,
    type: 'alert',
    title: 'Low Fuel Stock Alert',
    message: 'Regular Unleaded fuel is running low (15% remaining)',
    time: '10 minutes ago',
    read: false,
    icon: AlertTriangle,
    iconColor: 'text-amber-500',
    bgColor: 'bg-amber-50',
  },
  {
    id: 2,
    type: 'info',
    title: 'System Update Completed',
    message: 'The system has been updated to version 2.3.4',
    time: '1 hour ago',
    read: true,
    icon: Info,
    iconColor: 'text-blue-500',
    bgColor: 'bg-blue-50',
  },
  {
    id: 3,
    type: 'alert',
    title: 'Payment Failed',
    message: "Customer payment for order #4532 couldn't be processed",
    time: '2 hours ago',
    read: false,
    icon: AlertTriangle,
    iconColor: 'text-red-500',
    bgColor: 'bg-red-50',
  },
  {
    id: 4,
    type: 'success',
    title: 'New Order Received',
    message: 'Order #4892 has been received and is being processed',
    time: '3 hours ago',
    read: true,
    icon: CheckCircle2,
    iconColor: 'text-green-500',
    bgColor: 'bg-green-50',
  },
  {
    id: 5,
    type: 'info',
    title: 'Price Change Notification',
    message: 'Fuel prices have been updated. Premium: $3.89, Regular: $3.45',
    time: 'Yesterday',
    read: false,
    icon: Info,
    iconColor: 'text-blue-500',
    bgColor: 'bg-blue-50',
  },
  {
    id: 6,
    type: 'success',
    title: 'Maintenance Completed',
    message: 'Scheduled maintenance has been completed successfully',
    time: 'Yesterday',
    read: true,
    icon: CheckCircle2,
    iconColor: 'text-green-500',
    bgColor: 'bg-green-50',
  },
  {
    id: 7,
    type: 'alert',
    title: 'Equipment Malfunction',
    message: 'Pump #3 reported an error and needs maintenance',
    time: '2 days ago',
    read: true,
    icon: AlertTriangle,
    iconColor: 'text-red-500',
    bgColor: 'bg-red-50',
  }
];

const Notifications = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [allNotifications, setAllNotifications] = useState(notifications);
  const [activeTab, setActiveTab] = useState('all');
  
  // Filtered notifications
  const filteredNotifications = allNotifications.filter(notification => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !notification.read;
    return notification.type === activeTab;
  });
  
  // Unread count
  const unreadCount = allNotifications.filter(notification => !notification.read).length;
  
  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    // Simulate receiving new notifications periodically
    const interval = setInterval(() => {
      const notificationTypes = ['alert', 'info', 'success'];
      const type = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
      
      let icon, iconColor, bgColor, title, message;
      
      if (type === 'alert') {
        icon = AlertTriangle;
        iconColor = 'text-amber-500';
        bgColor = 'bg-amber-50';
        const alertMessages = [
          { title: 'Low Stock Warning', message: 'Diesel fuel is below 20% capacity' },
          { title: 'Equipment Alert', message: 'Pump #5 needs inspection' },
          { title: 'Payment Issue', message: 'Failed payment transaction detected' }
        ];
        const selected = alertMessages[Math.floor(Math.random() * alertMessages.length)];
        title = selected.title;
        message = selected.message;
      } else if (type === 'info') {
        icon = Info;
        iconColor = 'text-blue-500';
        bgColor = 'bg-blue-50';
        const infoMessages = [
          { title: 'System Update', message: 'New features available in your dashboard' },
          { title: 'Weather Alert', message: 'Heavy rain expected in your area tomorrow' },
          { title: 'Market Update', message: 'Fuel wholesale prices changed by 2.3%' }
        ];
        const selected = infoMessages[Math.floor(Math.random() * infoMessages.length)];
        title = selected.title;
        message = selected.message;
      } else {
        icon = CheckCircle2;
        iconColor = 'text-green-500';
        bgColor = 'bg-green-50';
        const successMessages = [
          { title: 'Delivery Completed', message: 'Fuel delivery successfully received' },
          { title: 'Sales Goal Reached', message: 'Daily sales target has been achieved' },
          { title: 'Customer Feedback', message: 'New positive review from a customer' }
        ];
        const selected = successMessages[Math.floor(Math.random() * successMessages.length)];
        title = selected.title;
        message = selected.message;
      }
      
      const newNotification = {
        id: Date.now(),
        type,
        title,
        message,
        time: 'Just now',
        read: false,
        icon,
        iconColor,
        bgColor
      };
      
      setAllNotifications(prev => [newNotification, ...prev]);
      
      toast({
        title: "New Notification",
        description: title,
        duration: 3000,
      });
    }, 60000); // Every minute
    
    return () => clearInterval(interval);
  }, [toast]);
  
  const markAsRead = (id) => {
    setAllNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };
  
  const markAllAsRead = () => {
    setAllNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    toast({
      title: "Notifications",
      description: "All notifications marked as read",
      duration: 2000,
    });
  };
  
  const deleteNotification = (id) => {
    setAllNotifications(prev => 
      prev.filter(notification => notification.id !== id)
    );
    toast({
      title: "Notification Deleted",
      description: "The notification has been removed",
      duration: 2000,
    });
  };
  
  const clearAllNotifications = () => {
    setAllNotifications([]);
    toast({
      title: "Notifications Cleared",
      description: "All notifications have been removed",
      duration: 2000,
    });
  };
  
  const content = isLoading ? (
    <div className="flex items-center justify-center h-full">
      <motion.div 
        className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
    </div>
  ) : (
    <div className="container mx-auto p-6 max-w-5xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Your Notifications</h2>
          <p className="text-gray-500">{unreadCount} unread notifications</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
          >
            <Check className="mr-2" size={16} />
            Mark all as read
          </Button>
          <Button 
            variant="outline" 
            onClick={clearAllNotifications}
            disabled={allNotifications.length === 0}
            className="text-red-500 border-red-200 hover:bg-red-50"
          >
            <Trash2 className="mr-2" size={16} />
            Clear all
          </Button>
        </div>
      </div>
      
      <Tabs 
        defaultValue="all" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="mb-4">
          <TabsTrigger value="all">
            All
            <span className="ml-2 bg-gray-200 text-gray-700 text-xs rounded-full px-2">{allNotifications.length}</span>
          </TabsTrigger>
          <TabsTrigger value="unread">
            Unread
            <span className="ml-2 bg-red-100 text-red-700 text-xs rounded-full px-2">{unreadCount}</span>
          </TabsTrigger>
          <TabsTrigger value="alert">Alerts</TabsTrigger>
          <TabsTrigger value="info">Information</TabsTrigger>
          <TabsTrigger value="success">Success</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-0">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="mx-auto h-12 w-12 text-gray-300" />
              <p className="mt-4 text-lg text-gray-500">No notifications to display</p>
              <p className="text-gray-400">Check back later for updates</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredNotifications.map((notification) => {
                const NotificationIcon = notification.icon;
                
                return (
                  <motion.div
                    key={notification.id}
                    className={`p-4 rounded-lg border ${notification.bgColor} ${notification.read ? 'opacity-75' : 'border-l-4 border-l-green-500'}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-start">
                      <div className={`p-2 rounded-full ${notification.bgColor} mr-4`}>
                        <NotificationIcon className={notification.iconColor} size={24} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{notification.title}</h3>
                            <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
                            <p className="text-gray-400 text-xs mt-2 flex items-center">
                              <Clock size={12} className="mr-1" />
                              {notification.time}
                            </p>
                          </div>
                          
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <ChevronDown size={16} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-40">
                              {!notification.read && (
                                <DropdownMenuItem onClick={() => markAsRead(notification.id)}>
                                  <Check size={14} className="mr-2" />
                                  Mark as read
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                onClick={() => deleteNotification(notification.id)}
                                className="text-red-600"
                              >
                                <Trash2 size={14} className="mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
  
  return (
    <DashboardLayout title="Notifications">
      {content}
    </DashboardLayout>
  );
};

export default Notifications;
