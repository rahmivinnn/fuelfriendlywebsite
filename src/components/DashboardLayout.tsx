
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Grid, ShoppingBag, Package, Building2, 
  PieChart, Bell as BellIcon, HelpCircle, Settings,
  LogOut, MapPin, LayoutDashboard, Activity
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

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar */}
      <motion.div 
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="bg-white w-64 border-r border-gray-200 flex flex-col"
      >
        <div className="p-4 border-b border-gray-200">
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/f1f34c25-67df-4603-8eb1-3f1fe84812a4.png" 
              alt="FuelFriendly Logo" 
              className="h-8"
            />
          </Link>
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
                >
                  <item.icon size={20} className={isActive ? 'text-green-500' : 'text-gray-500'} />
                  <span className="ml-3 font-medium text-sm">{item.label}</span>
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
            className="w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            onClick={() => {
              toast({
                title: "Logged Out",
                description: "You have been logged out successfully",
                duration: 3000,
              });
            }}
          >
            <LogOut size={20} className="mr-2" />
            Logout Account
          </Button>
        </div>
      </motion.div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Nav */}
        <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold"
          >
            {title}
          </motion.h1>
          
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
