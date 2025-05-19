
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Grid, ShoppingBag, Package, Building2,
  PieChart, Bell as BellIcon, HelpCircle, Settings,
  LogOut, MapPin, LayoutDashboard, Activity, FileText,
  MessageCircle, Users, Menu, X
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
import { DefaultAvatar } from '@/components/ui/avatar';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [notificationCount, setNotificationCount] = useState<number>(4);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(isMobile);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [userName, setUserName] = useState('Station Owner');

  // Get user name from localStorage if available
  useEffect(() => {
    const storedName = localStorage.getItem('stationOwnerName');
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  // Real-time notifications disabled

  // Effect to handle sidebar state based on screen size
  useEffect(() => {
    if (isMobile) {
      setIsSidebarCollapsed(true);
      setIsSidebarOpen(false);
    }
  }, [isMobile]);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsSidebarOpen(!isSidebarOpen);
    } else {
      setIsSidebarCollapsed(!isSidebarCollapsed);
      toast({
        title: isSidebarCollapsed ? "Sidebar Expanded" : "Sidebar Collapsed",
        description: isSidebarCollapsed ? "Showing full sidebar view" : "Showing minimal sidebar for more space",
        duration: 2000,
      });
    }
  };

  const handleSidebarItemClick = (item: SidebarItem) => {
    if (!item.path.includes('/station-dashboard/')) return;

    // Navigate to the path
    navigate(item.path);

    // Close sidebar on mobile after navigation
    if (isMobile) {
      setIsSidebarOpen(false);
    }

    // For any item without a proper page yet, show a toast
    if (!['/station-dashboard', '/station-dashboard/orders', '/station-dashboard/products', '/station-dashboard/station'].includes(item.path)) {
      toast({
        title: `${item.label} Selected`,
        description: `The ${item.label.toLowerCase()} page is being loaded`,
        duration: 2000,
      });
    }
  };

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
      duration: 3000,
    });
    // Clear localStorage and redirect to homepage
    localStorage.removeItem('stationOwnerName');
    navigate('/');
  };

  return (
    <div className="h-screen flex bg-gray-50 overflow-hidden">
      {/* Mobile Overlay */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={{ x: isMobile ? -300 : 0 }}
        animate={{
          x: isMobile ? (isSidebarOpen ? 0 : -300) : 0,
          width: isMobile ? 256 : (isSidebarCollapsed ? 80 : 256)
        }}
        transition={{ type: "spring", stiffness: 100 }}
        className={`bg-white border-r border-gray-200 flex flex-col ${isMobile ? 'fixed h-full z-50' : ''}`}
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
                <div
                  onClick={() => handleSidebarItemClick(item)}
                  className={`flex items-center p-3 rounded-lg transition-colors hover:bg-gray-100 cursor-pointer ${isActive ? 'bg-green-50 text-green-500' : 'text-gray-600'}`}
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
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="p-4 border-t border-gray-200">
          <Button
            variant="ghost"
            className={`${isSidebarCollapsed ? 'justify-center' : 'w-full justify-start'} text-gray-600 hover:text-gray-900 hover:bg-gray-100`}
            onClick={handleLogout}
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
      <div className={`flex-1 flex flex-col overflow-hidden ${isMobile ? 'w-full' : ''}`}>
        {/* Top Nav */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-3 px-4 sm:py-4 sm:px-6 flex items-center justify-between transition-colors duration-300">
          <div className="flex items-center">
            {isMobile && (
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleSidebar}
                className="mr-2 hover:bg-gray-100"
                aria-label="Toggle Menu"
              >
                <Menu size={20} className="text-gray-500" />
              </Button>
            )}
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xl sm:text-2xl font-bold dark:text-white truncate"
            >
              {title}
            </motion.h1>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="ml-2 sm:ml-3 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs rounded-full flex items-center transition-colors duration-300"
            >
              <div className="h-2 w-2 bg-green-500 dark:bg-green-400 rounded-full mr-1 animate-pulse"></div>
              <span className="hidden xs:inline">Live Data</span>
            </motion.div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="relative z-10">
              <Button
                variant="ghost"
                size={isMobile ? "sm" : "default"}
                className="relative focus:ring-2 focus:ring-green-500 focus:outline-none cursor-pointer"
                onClick={() => {
                  setNotificationCount(0);
                  navigate('/station-dashboard/notifications');
                  toast({
                    title: "Notifications Viewed",
                    description: "All notifications have been marked as read",
                    duration: 3000,
                  });
                }}
                aria-label="Notifications"
              >
                <BellIcon className="text-gray-700 dark:text-gray-300" size={isMobile ? 18 : 20} />
                {notificationCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.2 }}
                    className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center"
                  >
                    {notificationCount}
                  </motion.span>
                )}
              </Button>
            </div>

            <div className="flex items-center space-x-1 sm:space-x-2">
              <Button
                variant="ghost"
                size={isMobile ? "sm" : "default"}
                className="p-0 focus:ring-2 focus:ring-green-500 focus:outline-none cursor-pointer"
                onClick={() => navigate('/station-dashboard/settings')}
                aria-label="Profile Settings"
              >
                <DefaultAvatar className="w-7 h-7 sm:w-8 sm:h-8" />
              </Button>
              <span className="font-medium text-xs sm:text-sm hidden sm:block">{userName}</span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-3 sm:p-6 transition-colors duration-300">
          <div className="container mx-auto max-w-7xl">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
