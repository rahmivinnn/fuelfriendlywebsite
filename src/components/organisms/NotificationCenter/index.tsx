import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, CheckCircle, Info, AlertTriangle, AlertCircle, X, Check, Trash2 } from 'lucide-react';
import { useNotifications, Notification, NotificationType } from '@/contexts/NotificationContext';
import { Button } from '@/components/atoms/Button';
import { Typography } from '@/components/atoms/Typography';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface NotificationCenterProps {
  className?: string;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ className }) => {
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead, 
    clearNotifications,
    isConnected
  } = useNotifications();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  
  // Format timestamp
  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffMins < 1) {
      return 'Just now';
    } else if (diffMins < 60) {
      return `${diffMins} min${diffMins === 1 ? '' : 's'} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };
  
  // Get icon based on notification type
  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'info':
        return <Info size={16} className="text-blue-500" />;
      case 'warning':
        return <AlertTriangle size={16} className="text-amber-500" />;
      case 'error':
        return <AlertCircle size={16} className="text-red-500" />;
      default:
        return <Info size={16} className="text-blue-500" />;
    }
  };
  
  // Handle notification click
  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    
    if (notification.link) {
      navigate(notification.link);
      setIsOpen(false);
    }
  };
  
  // Handle mark all as read
  const handleMarkAllAsRead = () => {
    markAllAsRead();
    toast({
      title: "Notifications",
      description: "All notifications marked as read",
      duration: 3000,
    });
  };
  
  // Handle clear all notifications
  const handleClearNotifications = () => {
    clearNotifications();
    toast({
      title: "Notifications",
      description: "All notifications cleared",
      duration: 3000,
    });
  };
  
  return (
    <div className={className}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell size={20} />
                  {unreadCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white"
                    >
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </motion.span>
                  )}
                </Button>
              </PopoverTrigger>
              <TooltipContent>
                <p>Notifications {unreadCount > 0 ? `(${unreadCount} unread)` : ''}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <PopoverContent className="w-80 p-0" align="end">
            <div className="flex items-center justify-between border-b p-3">
              <div className="flex items-center">
                <Bell size={16} className="mr-2" />
                <Typography variant="h5">Notifications</Typography>
              </div>
              <div className="flex items-center space-x-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-7 w-7"
                        onClick={handleMarkAllAsRead}
                        disabled={unreadCount === 0}
                      >
                        <Check size={14} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Mark all as read</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-7 w-7"
                        onClick={handleClearNotifications}
                        disabled={notifications.length === 0}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Clear all notifications</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            
            <div className="max-h-[300px] overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-6 text-center">
                  <Bell size={24} className="text-gray-400 mb-2" />
                  <Typography variant="muted">No notifications</Typography>
                </div>
              ) : (
                <AnimatePresence>
                  {notifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`border-b p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 ${
                        !notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                      }`}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <div className="flex items-start">
                        <div className="mr-3 mt-0.5">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <Typography variant="small" className="font-medium">
                              {notification.title}
                            </Typography>
                            <Typography variant="small" className="text-gray-500 text-xs">
                              {formatTimestamp(notification.timestamp)}
                            </Typography>
                          </div>
                          <Typography variant="small" className="text-gray-600 dark:text-gray-400 mt-1">
                            {notification.message}
                          </Typography>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>
            
            <div className="border-t p-2 text-center">
              <Typography variant="small" className="text-gray-500">
                {isConnected ? (
                  <span className="flex items-center justify-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Connected to notification service
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <span className="h-2 w-2 rounded-full bg-red-500 mr-2"></span>
                    Disconnected from notification service
                  </span>
                )}
              </Typography>
            </div>
          </PopoverContent>
        </Popover>
      </TooltipProvider>
    </div>
  );
};

export default NotificationCenter;
