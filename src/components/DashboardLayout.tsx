
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Grid, ShoppingBag, Package, Building2, 
  PieChart, Bell as BellIcon, HelpCircle, Settings,
  LogOut, MapPin, LayoutDashboard, Activity, FileText,
  MessageCircle, Users
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';

type SidebarItem = {
  icon: React.ElementType;
  label: string;
  path: string;
  realtime?: boolean;
};

const sidebarItems: SidebarItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/station-dashboard', realtime: true },
  { icon: ShoppingBag, label: 'Orders', path: '/station-dashboard/orders', realtime: true },
  { icon: Package, label: 'Products Management', path: '/station-dashboard/products', realtime: true },
  { icon: Building2, label: 'Station Management', path: '/station-dashboard/station', realtime: true },
  { icon: PieChart, label: 'Earnings & Transactions', path: '/station-dashboard/earnings', realtime: true },
  { icon: Users, label: 'Customers', path: '/station-dashboard/customers', realtime: true },
  { icon: FileText, label: 'Reports', path: '/station-dashboard/reports', realtime: true },
  { icon: MessageCircle, label: 'Messages', path: '/station-dashboard/messages' },
  { icon: BellIcon, label: 'Notifications', path: '/station-dashboard/notifications' },
  { icon: HelpCircle, label: 'Help & Support', path: '/station-dashboard/support' },
  { icon: Settings, label: 'Settings', path: '/station-dashboard/settings' },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title }) => {
  const { toast } = useToast();
  const location = useLocation();
  const [notificationCount, setNotificationCount] = useState<number>(4);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  
  // Simulate real-time notifications
  React.useEffect(() => {
    const interval = setInterval(() => {
      const messages = [
        "New order received!",
        "Inventory update: Petrol levels at 75%",
        "Daily sales target achieved!",
        "System update available",
        "Price change detected in competitors",
        "Customer feedback received"
      ];
      
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      
      setNotificationCount(prev => prev + 1);
      
      toast({
        title: "Real-time Update",
        description: randomMessage,
        duration: 3000,
      });
    }, 45000); // Random update every 45 seconds
    
    return () => clearInterval(interval);
  }, [toast]);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
    toast({
      title: isSidebarCollapsed ? "Sidebar Expanded" : "Sidebar Collapsed",
      description: isSidebarCollapsed ? "Showing full sidebar view" : "Showing minimal sidebar for more space",
      duration: 2000,
    });
  };

  const handleSidebarItemClick = (item: SidebarItem) => {
    if (!item.path.includes('/station-dashboard/')) return;
    
    // For any item without a proper page yet, show a toast
    if (!['/station-dashboard', '/station-dashboard/orders', '/station-dashboard/products', '/station-dashboard/station'].includes(item.path)) {
      toast({
        title: `${item.label} Selected`,
        description: `The ${item.label.toLowerCase()} page is being loaded`,
        duration: 2000,
      });
    }
  };

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar */}
      <motion.div 
        initial={{ x: -300 }}
        animate={{ x: 0, width: isSidebarCollapsed ? 80 : 256 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="bg-white border-r border-gray-200 flex flex-col"
      >
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <AnimatePresence>
            {!isSidebarCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Link to="/" className="flex items-center">
                  <img 
                    src="/lovable-uploads/f1f34c25-67df-4603-8eb1-3f1fe84812a4.png" 
                    alt="FuelFriendly Logo" 
                    className="h-8"
                  />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleSidebar}
            className="hover:bg-gray-100"
          >
            <Grid size={20} className="text-gray-500" />
          </Button>
        </div>
        
        <div className="flex-1 p-4 space-y-2 overflow-y-auto">
          {sidebarItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            
            return (
              <motion.div
                key={item.label}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link 
                  to={item.path}
                  className={`flex items-center p-3 rounded-lg transition-colors hover:bg-gray-100 ${isActive ? 'bg-green-50 text-green-500' : 'text-gray-600'}`}
                  onClick={() => handleSidebarItemClick(item)}
                >
                  <item.icon size={20} className={isActive ? 'text-green-500' : 'text-gray-500'} />
                  <AnimatePresence>
                    {!isSidebarCollapsed && (
                      <motion.span 
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        className="ml-3 font-medium text-sm whitespace-nowrap"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {item.realtime && (
                    <motion.div 
                      className="ml-auto"
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.2, 1] }}
                      transition={{ duration: 0.5, repeat: Infinity, repeatDelay: Math.random() * 20 + 10 }}
                    >
                      <Activity size={14} className="text-green-500" />
                    </motion.div>
                  )}
                </Link>
              </motion.div>
            );
          })}
        </div>
        
        <div className="p-4 border-t border-gray-200">
          <Button 
            variant="ghost" 
            className={`${isSidebarCollapsed ? 'justify-center' : 'w-full justify-start'} text-gray-600 hover:text-gray-900 hover:bg-gray-100`}
            onClick={() => {
              toast({
                title: "Logged Out",
                description: "You have been logged out successfully",
                duration: 3000,
              });
            }}
          >
            <LogOut size={20} className={isSidebarCollapsed ? '' : 'mr-2'} />
            <AnimatePresence>
              {!isSidebarCollapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                >
                  Logout Account
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
        </div>
      </motion.div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Nav */}
        <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
          <div className="flex items-center">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold"
            >
              {title}
            </motion.h1>
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="ml-3 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full flex items-center"
            >
              <div className="h-2 w-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
              Live Data
            </motion.div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Button variant="ghost" className="relative" onClick={() => {
                setNotificationCount(0);
                toast({
                  title: "Notifications Cleared",
                  description: "All notifications have been marked as read",
                  duration: 3000,
                });
              }}>
                <BellIcon />
                {notificationCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center"
                  >
                    {notificationCount}
                  </motion.span>
                )}
              </Button>
            </div>
            
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/86c52672-6ac1-4afa-b99f-d1f6c2a23319.png" 
                alt="User" 
                className="w-8 h-8 rounded-full object-cover"
              />
            </div>
          </div>
        </header>
        
        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
