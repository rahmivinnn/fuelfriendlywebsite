import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Grid, ShoppingBag, Package, Building2, 
  PieChart, Bell, HelpCircle, Settings, 
  LogOut, MapPin, LayoutDashboard, Activity, 
  FileText, MessageCircle, Users, Shield, 
  UserCog, Lock, ChevronDown, ChevronUp
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
import { DefaultAvatar } from '@/components/ui/avatar';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { ThemeToggle } from '@/components/molecules/ThemeToggle';
import NotificationCenter from '@/components/organisms/NotificationCenter';

type SidebarItem = {
  icon: React.ElementType;
  label: string;
  path: string;
  requiredRole: UserRole;
  realtime?: boolean;
};

const sidebarItems: SidebarItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin-dashboard', requiredRole: UserRole.Level1, realtime: true },
  { icon: Users, label: 'User Management', path: '/admin-dashboard/users', requiredRole: UserRole.Level2, realtime: true },
  { icon: Building2, label: 'Station Management', path: '/admin-dashboard/stations', requiredRole: UserRole.Level1, realtime: true },
  { icon: ShoppingBag, label: 'Order Management', path: '/admin-dashboard/orders', requiredRole: UserRole.Level1, realtime: true },
  { icon: Package, label: 'Product Management', path: '/admin-dashboard/products', requiredRole: UserRole.Level1 },
  { icon: PieChart, label: 'Analytics', path: '/analytics', requiredRole: UserRole.Level2, realtime: true },
  { icon: FileText, label: 'Reports', path: '/admin-dashboard/reports', requiredRole: UserRole.Level2 },
  { icon: MessageCircle, label: 'Messages', path: '/admin-dashboard/messages', requiredRole: UserRole.Level1 },
  { icon: Bell, label: 'Notifications', path: '/admin-dashboard/notifications', requiredRole: UserRole.Level1 },
  { icon: Shield, label: 'Access Control', path: '/admin-dashboard/access-control', requiredRole: UserRole.SuperiorAdmin },
  { icon: HelpCircle, label: 'Help & Support', path: '/admin-dashboard/support', requiredRole: UserRole.Level1 },
  { icon: Settings, label: 'Settings', path: '/admin-dashboard/settings', requiredRole: UserRole.Level1 },
];

interface AdminDashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AdminDashboardLayout: React.FC<AdminDashboardLayoutProps> = ({ children, title }) => {
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  
  // Check if user is authenticated
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);
  
  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
    toast({
      title: isSidebarCollapsed ? "Sidebar Expanded" : "Sidebar Collapsed",
      description: isSidebarCollapsed ? "Showing full sidebar view" : "Showing minimal sidebar for more space",
      duration: 2000,
    });
  };
  
  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  // Handle sidebar item click
  const handleSidebarItemClick = (item: SidebarItem) => {
    // Check if user has permission to access this item
    if (!user || user.role < item.requiredRole) {
      toast({
        title: "Access Denied",
        description: `You need ${UserRole[item.requiredRole]} access or higher to view "${item.label}"`,
        variant: "destructive",
        duration: 3000,
      });
      
      // If user is close to having access (just one level below), show upgrade hint
      if (user && user.role === item.requiredRole - 1) {
        setTimeout(() => {
          toast({
            title: "Access Upgrade Available",
            description: "Contact your administrator to request an access level upgrade.",
            duration: 5000,
          });
        }, 1000);
      }
      
      return;
    }
    
    // Navigate to the path
    navigate(item.path);
  };
  
  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  // Get role name
  const getRoleName = (role: UserRole): string => {
    return UserRole[role] || 'Guest';
  };
  
  // Get role color
  const getRoleColor = (role: UserRole): string => {
    switch (role) {
      case UserRole.SuperiorAdmin:
        return 'text-red-500';
      case UserRole.Level3:
        return 'text-amber-500';
      case UserRole.Level2:
        return 'text-purple-500';
      case UserRole.Level1:
        return 'text-blue-500';
      default:
        return 'text-gray-500';
    }
  };
  
  if (!user) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }
  
  return (
    <div className="h-screen flex bg-gray-50 dark:bg-gray-900">
      {/* Sidebar - Desktop */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: 0, width: isSidebarCollapsed ? 80 : 256 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col hidden md:flex"
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
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
                  <span className="ml-2 font-bold text-green-600 dark:text-green-400">Admin</span>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Grid size={20} className="text-gray-500 dark:text-gray-400" />
          </Button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-2">
          {sidebarItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            const hasAccess = user && user.role >= item.requiredRole;
            
            return (
              <Button
                key={index}
                variant="ghost"
                className={`
                  ${isSidebarCollapsed ? 'justify-center' : 'justify-start w-full'} 
                  ${isActive ? 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400' : hasAccess ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-700' : 'text-gray-400 cursor-pointer dark:text-gray-500'}
                  mb-1 relative
                `}
                onClick={() => handleSidebarItemClick(item)}
                title={!hasAccess ? `Requires ${UserRole[item.requiredRole]} access or higher` : undefined}
              >
                <item.icon size={20} className={isSidebarCollapsed ? '' : 'mr-2'} />
                <AnimatePresence>
                  {!isSidebarCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      className="flex-1 text-left"
                    >
                      {item.label}
                      {!hasAccess && (
                        <span className="ml-2 text-xs text-gray-400 dark:text-gray-500">
                          (Level {item.requiredRole})
                        </span>
                      )}
                    </motion.span>
                  )}
                </AnimatePresence>
                
                {item.realtime && !isSidebarCollapsed && hasAccess && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="h-2 w-2 bg-green-500 rounded-full animate-pulse"
                  />
                )}
                
                {!hasAccess && !isSidebarCollapsed && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="h-2 w-2 bg-gray-300 dark:bg-gray-600 rounded-full ml-2"
                  />
                )}
              </Button>
            );
          })}
        </div>
        
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <Button
            variant="ghost"
            className={`${isSidebarCollapsed ? 'justify-center' : 'w-full justify-start'} text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-700`}
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
                  Logout
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
        </div>
      </motion.div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Nav */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-4 px-6 flex items-center justify-between">
          <div className="flex items-center">
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="mr-2 md:hidden"
              onClick={toggleMobileMenu}
            >
              <Grid size={20} className="text-gray-500 dark:text-gray-400" />
            </Button>
            
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold dark:text-white"
            >
              {title}
            </motion.h1>
            
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="ml-3 px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300 text-xs rounded-full flex items-center"
            >
              <div className="h-2 w-2 bg-blue-500 rounded-full mr-1 animate-pulse"></div>
              {getRoleName(user.role)}
            </motion.div>
          </div>
          
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <NotificationCenter />
            
            <div className="flex items-center space-x-2">
              <DefaultAvatar className="w-8 h-8" />
              <div className="hidden md:block">
                <div className="text-sm font-medium dark:text-white">{user.name}</div>
                <div className={`text-xs ${getRoleColor(user.role)}`}>{getRoleName(user.role)}</div>
              </div>
            </div>
          </div>
        </header>
        
        {/* Mobile Sidebar */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: -300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-0 z-50 md:hidden"
            >
              <div className="absolute inset-0 bg-black/50" onClick={toggleMobileMenu} />
              <div className="absolute inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-lg flex flex-col">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <Link to="/" className="flex items-center">
                    <img
                      src="/lovable-uploads/f1f34c25-67df-4603-8eb1-3f1fe84812a4.png"
                      alt="FuelFriendly Logo"
                      className="h-8"
                    />
                    <span className="ml-2 font-bold text-green-600 dark:text-green-400">Admin</span>
                  </Link>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleMobileMenu}
                    className="hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <X size={20} className="text-gray-500 dark:text-gray-400" />
                  </Button>
                </div>
                
                <div className="flex-1 overflow-y-auto py-2">
                  {sidebarItems.map((item, index) => {
                    const isActive = location.pathname === item.path;
                    const hasAccess = user && user.role >= item.requiredRole;
                    
                    return (
                      <Button
                        key={index}
                        variant="ghost"
                        className={`
                          justify-start w-full
                          ${isActive ? 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400' : hasAccess ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-700' : 'text-gray-400 cursor-pointer dark:text-gray-500'}
                          mb-1 relative
                        `}
                        onClick={() => {
                          handleSidebarItemClick(item);
                          if (hasAccess) {
                            toggleMobileMenu();
                          }
                        }}
                      >
                        <item.icon size={20} className="mr-2" />
                        <span className="flex-1 text-left">
                          {item.label}
                          {!hasAccess && (
                            <span className="ml-2 text-xs text-gray-400 dark:text-gray-500">
                              (Level {item.requiredRole})
                            </span>
                          )}
                        </span>
                        
                        {item.realtime && hasAccess && (
                          <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                        )}
                        
                        {!hasAccess && (
                          <div className="h-2 w-2 bg-gray-300 dark:bg-gray-600 rounded-full ml-2" />
                        )}
                      </Button>
                    );
                  })}
                </div>
                
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-700"
                    onClick={() => {
                      handleLogout();
                      toggleMobileMenu();
                    }}
                  >
                    <LogOut size={20} className="mr-2" />
                    Logout
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
