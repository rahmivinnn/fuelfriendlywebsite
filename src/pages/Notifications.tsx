
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, CheckCircle, AlertTriangle, Info, 
  Trash2, CheckCheck, MoreVertical, Filter,
  Search, Settings, RefreshCcw, X
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DashboardLayout from '@/components/DashboardLayout';

// Sample notifications data
const notificationsData = [
  { 
    id: 1, 
    type: 'success', 
    title: 'Inventory Updated', 
    message: 'All fuel inventory levels have been updated successfully', 
    time: '10 minutes ago', 
    read: false 
  },
  { 
    id: 2, 
    type: 'warning', 
    title: 'Low Stock Alert', 
    message: 'Regular unleaded fuel is running low (15% remaining)', 
    time: '1 hour ago', 
    read: false 
  },
  { 
    id: 3, 
    type: 'info', 
    title: 'New Order Received', 
    message: 'Customer #5423 placed an order for premium fuel', 
    time: '2 hours ago', 
    read: true 
  },
  { 
    id: 4, 
    type: 'success', 
    title: 'Daily Report Generated', 
    message: 'Your daily sales report for July 5th is ready to view', 
    time: '3 hours ago', 
    read: true 
  },
  { 
    id: 5, 
    type: 'info', 
    title: 'System Maintenance', 
    message: 'Scheduled maintenance will occur tonight at 2 AM', 
    time: 'Yesterday', 
    read: true 
  },
  { 
    id: 6, 
    type: 'warning', 
    title: 'Payment Processing Delay', 
    message: 'Some credit card transactions may be delayed by 10-15 minutes', 
    time: 'Yesterday', 
    read: true 
  },
  { 
    id: 7, 
    type: 'info', 
    title: 'New Feature Available', 
    message: 'You can now export custom reports in multiple formats', 
    time: '2 days ago', 
    read: true 
  },
  { 
    id: 8, 
    type: 'success', 
    title: 'Monthly Goals Achieved', 
    message: 'Congratulations! You've reached your sales target for June', 
    time: '3 days ago', 
    read: true 
  },
  { 
    id: 9, 
    type: 'warning', 
    title: 'Equipment Maintenance Due', 
    message: 'Pump #3 is due for regular maintenance in 2 days', 
    time: '4 days ago', 
    read: true 
  },
  { 
    id: 10, 
    type: 'info', 
    title: 'Price Update Reminder', 
    message: 'Remember to update fuel prices before Monday morning', 
    time: '5 days ago', 
    read: true 
  }
];

const Notifications = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState(notificationsData);
  const [filterType, setFilterType] = useState('all');
  const [filterRead, setFilterRead] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFetching, setIsFetching] = useState(false);

  // Filtered notifications based on type, read status, and search
  const filteredNotifications = notifications.filter(notification => {
    const matchesType = 
      filterType === 'all' || 
      notification.type === filterType;
    
    const matchesRead = 
      filterRead === 'all' || 
      (filterRead === 'read' && notification.read) || 
      (filterRead === 'unread' && !notification.read);
    
    const matchesSearch = 
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesType && matchesRead && matchesSearch;
  });

  // Count unread notifications
  const unreadCount = notifications.filter(notification => !notification.read).length;

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: "Notifications Loaded",
        description: `You have ${unreadCount} unread notifications`,
        duration: 3000,
      });
    }, 1500);
    
    // Simulate receiving new notifications
    const interval = setInterval(() => {
      const notificationTypes = ['success', 'warning', 'info'];
      const titles = [
        'New Customer Registration', 
        'Fuel Delivery Scheduled', 
        'System Update Available', 
        'Maintenance Alert',
        'Transaction Completed',
        'Price Change Detected',
        'Employee Shift Change'
      ];
      const messages = [
        'A new customer has registered for your loyalty program',
        'Fuel delivery scheduled for tomorrow at 9 AM',
        'A new system update is available for installation',
        'Scheduled maintenance for pump #2 is due',
        'Large transaction of $500+ completed successfully',
        'Competitor fuel prices have changed in your area',
        'Employee shift change request approved'
      ];
      
      const randomType = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
      const randomTitle = titles[Math.floor(Math.random() * titles.length)];
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      
      const newNotification = {
        id: Date.now(),
        type: randomType,
        title: randomTitle,
        message: randomMessage,
        time: 'Just now',
        read: false
      };
      
      setNotifications(prevNotifications => [newNotification, ...prevNotifications]);
      
      toast({
        title: "New Notification",
        description: newNotification.title,
        duration: 3000,
      });
    }, 60000); // Every minute for demo purposes
    
    return () => clearInterval(interval);
  }, [toast, unreadCount]);

  const handleMarkAsRead = (id) => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
    
    toast({
      title: "Notification Updated",
      description: "Marked as read",
      duration: 2000,
    });
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => 
        !notification.read ? { ...notification, read: true } : notification
      )
    );
    
    toast({
      title: "All Notifications Read",
      description: "All notifications have been marked as read",
      duration: 2000,
    });
  };

  const handleDeleteNotification = (id) => {
    setNotifications(prevNotifications => 
      prevNotifications.filter(notification => notification.id !== id)
    );
    
    toast({
      title: "Notification Deleted",
      description: "The notification has been removed",
      duration: 2000,
    });
  };

  const handleClearAll = () => {
    setNotifications([]);
    
    toast({
      title: "Notifications Cleared",
      description: "All notifications have been deleted",
      duration: 2000,
    });
  };

  const handleRefresh = () => {
    setIsFetching(true);
    
    setTimeout(() => {
      setIsFetching(false);
      
      toast({
        title: "Notifications Refreshed",
        description: "Your notifications are up to date",
        duration: 2000,
      });
    }, 1000);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'warning':
        return <AlertTriangle className="text-yellow-500" size={20} />;
      case 'info':
        return <Info className="text-blue-500" size={20} />;
      default:
        return <Bell className="text-gray-500" size={20} />;
    }
  };

  const content = isLoading ? (
    <div className="flex-1 flex items-center justify-center p-6">
      <motion.div 
        className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
    </div>
  ) : (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold mb-1 flex items-center">
              Notifications
              {unreadCount > 0 && (
                <span className="ml-3 text-sm bg-green-100 text-green-800 px-2.5 py-0.5 rounded-full">
                  {unreadCount} unread
                </span>
              )}
            </h2>
            <p className="text-gray-500">Stay updated with important alerts and information</p>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="flex items-center"
              onClick={handleRefresh}
              disabled={isFetching}
            >
              <RefreshCcw className={`mr-2 ${isFetching ? 'animate-spin' : ''}`} size={16} />
              Refresh
            </Button>
            
            {unreadCount > 0 && (
              <Button 
                variant="outline" 
                className="flex items-center"
                onClick={handleMarkAllAsRead}
              >
                <CheckCheck className="mr-2" size={16} />
                Mark All as Read
              </Button>
            )}
            
            <Button 
              variant="outline" 
              className="flex items-center"
              onClick={() => {
                toast({
                  title: "Notification Settings",
                  description: "Opening notification preferences",
                  duration: 2000,
                });
              }}
            >
              <Settings className="mr-2" size={16} />
              Settings
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-3/4">
            <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div className="flex flex-wrap gap-3">
                  <Select 
                    value={filterType}
                    onValueChange={setFilterType}
                  >
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="success">Success</SelectItem>
                      <SelectItem value="warning">Warning</SelectItem>
                      <SelectItem value="info">Information</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select 
                    value={filterRead}
                    onValueChange={setFilterRead}
                  >
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="read">Read</SelectItem>
                      <SelectItem value="unread">Unread</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input 
                    type="text" 
                    placeholder="Search notifications..." 
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              {filteredNotifications.length > 0 ? (
                <div className="space-y-4">
                  {filteredNotifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex p-4 border rounded-lg ${
                        notification.read ? 'bg-white' : 'bg-green-50 border-green-100'
                      }`}
                    >
                      <div className="mr-4 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium text-gray-900">{notification.title}</h4>
                          <span className="text-xs text-gray-500">{notification.time}</span>
                        </div>
                        <p className="text-gray-600 mt-1">{notification.message}</p>
                      </div>
                      <div className="ml-4 flex">
                        {!notification.read && (
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleMarkAsRead(notification.id)}
                          >
                            <CheckCircle size={18} className="text-green-500" />
                          </Button>
                        )}
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeleteNotification(notification.id)}
                        >
                          <Trash2 size={18} className="text-red-500" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Bell className="mx-auto text-gray-400 mb-4" size={48} />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No notifications found</h3>
                  <p className="text-gray-500">
                    {notifications.length === 0 
                      ? "You've cleared all your notifications"
                      : "Try changing your filters to see more results"}
                  </p>
                </div>
              )}
              
              {filteredNotifications.length > 0 && (
                <div className="flex justify-center mt-6">
                  <Button 
                    variant="outline" 
                    className="text-red-600"
                    onClick={handleClearAll}
                  >
                    <Trash2 className="mr-2" size={16} />
                    Clear All Notifications
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          <div className="md:w-1/4">
            <div className="bg-white p-6 rounded-lg border border-gray-200 sticky top-6">
              <h3 className="font-bold mb-4">Notification Summary</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">All Notifications</span>
                  <span className="font-medium">{notifications.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Unread</span>
                  <span className="font-medium">{unreadCount}</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-medium mb-2">By Type</h4>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-gray-600">Success</span>
                      </div>
                      <span className="font-medium">
                        {notifications.filter(n => n.type === 'success').length}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                        <span className="text-gray-600">Warning</span>
                      </div>
                      <span className="font-medium">
                        {notifications.filter(n => n.type === 'warning').length}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                        <span className="text-gray-600">Information</span>
                      </div>
                      <span className="font-medium">
                        {notifications.filter(n => n.type === 'info').length}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-medium mb-3">Quick Actions</h4>
                  
                  <div className="space-y-2">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-left"
                      onClick={() => setFilterType('warning')}
                    >
                      <AlertTriangle className="mr-2 text-yellow-500" size={16} />
                      View Warnings
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-left"
                      onClick={() => setFilterRead('unread')}
                    >
                      <Bell className="mr-2 text-blue-500" size={16} />
                      Unread Only
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-left"
                      onClick={() => {
                        setFilterType('all');
                        setFilterRead('all');
                        setSearchTerm('');
                      }}
                    >
                      <RefreshCcw className="mr-2 text-gray-500" size={16} />
                      Reset Filters
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );

  return (
    <DashboardLayout title="Notifications">
      {content}
    </DashboardLayout>
  );
};

export default Notifications;
