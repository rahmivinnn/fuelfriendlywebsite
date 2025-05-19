import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Grid, ShoppingBag, Package, Building2,
  PieChart, Bell as BellIcon, HelpCircle, Settings,
  LogOut, MapPin, LayoutDashboard, Activity, FileText,
  MessageCircle, Users, Shield, ShieldAlert, ShieldCheck,
  UserCog, Lock, Key, Database, Server
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
import { DefaultAvatar } from '@/components/ui/avatar';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type SidebarItem = {
  icon: React.ElementType;
  label: string;
  path: string;
  requiredRole: UserRole;
  realtime?: boolean;
};

interface AdminDashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AdminDashboardLayout: React.FC<AdminDashboardLayoutProps> = ({ children, title }) => {
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, elevateToSuperiorAdmin } = useAuth();

  const [notificationCount, setNotificationCount] = useState<number>(4);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [showSuperiorAdminDialog, setShowSuperiorAdminDialog] = useState<boolean>(false);
  const [accessCode, setAccessCode] = useState<string>('');

  // Sidebar items with role-based access
  const sidebarItems: SidebarItem[] = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/admin-dashboard",
      requiredRole: UserRole.Level1,
      realtime: true
    },
    {
      icon: Users,
      label: "User Management",
      path: "/admin-dashboard/users",
      requiredRole: UserRole.Level2
    },
    {
      icon: Building2,
      label: "Stations",
      path: "/admin-dashboard/stations",
      requiredRole: UserRole.Level1
    },
    {
      icon: Package,
      label: "Products",
      path: "/admin-dashboard/products",
      requiredRole: UserRole.Level2
    },
    {
      icon: ShoppingBag,
      label: "Orders",
      path: "/admin-dashboard/orders",
      requiredRole: UserRole.Level1
    },
    {
      icon: Activity,
      label: "Analytics",
      path: "/admin-dashboard/analytics",
      requiredRole: UserRole.Level2,
      realtime: true
    },
    {
      icon: PieChart,
      label: "Reports",
      path: "/admin-dashboard/reports",
      requiredRole: UserRole.Level2
    },
    {
      icon: MessageCircle,
      label: "Messages",
      path: "/admin-dashboard/messages",
      requiredRole: UserRole.Level1
    },
    {
      icon: MapPin,
      label: "Map View",
      path: "/admin-dashboard/map",
      requiredRole: UserRole.Level1
    },
    {
      icon: Database,
      label: "System Data",
      path: "/admin-dashboard/system-data",
      requiredRole: UserRole.Level3
    },
    {
      icon: Server,
      label: "API Management",
      path: "/admin-dashboard/api",
      requiredRole: UserRole.Level3
    },
    {
      icon: Lock,
      label: "Security",
      path: "/admin-dashboard/security",
      requiredRole: UserRole.Level3
    },
    {
      icon: Key,
      label: "Access Control",
      path: "/admin-dashboard/access-control",
      requiredRole: UserRole.SuperiorAdmin
    },
    {
      icon: Settings,
      label: "Settings",
      path: "/admin-dashboard/settings",
      requiredRole: UserRole.Level1
    },
    {
      icon: HelpCircle,
      label: "Help & Support",
      path: "/admin-dashboard/support",
      requiredRole: UserRole.Level1
    }
  ];

  // Real-time notifications disabled

  const handleSidebarItemClick = (item: SidebarItem) => {
    // Check if user has permission to access this item
    if (!user || user.role < item.requiredRole) {
      toast({
        title: "Access Denied",
        description: `You need ${UserRole[item.requiredRole]} access or higher to view this page`,
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    // Navigate to the path
    navigate(item.path);
  };

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
      duration: 3000,
    });
    logout();
    navigate('/login');
  };

  const handleSuperiorAdminAccess = () => {
    const success = elevateToSuperiorAdmin(accessCode);

    if (success) {
      toast({
        title: "Access Granted",
        description: "You now have Superior Admin privileges",
        duration: 3000,
      });
      setShowSuperiorAdminDialog(false);
    } else {
      toast({
        title: "Access Denied",
        description: "Invalid Superior Admin access code",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  // Get role badge color
  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case UserRole.Level1:
        return "bg-blue-100 text-blue-800";
      case UserRole.Level2:
        return "bg-purple-100 text-purple-800";
      case UserRole.Level3:
        return "bg-amber-100 text-amber-800";
      case UserRole.SuperiorAdmin:
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Get role icon
  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case UserRole.Level1:
        return <Shield size={16} className="mr-1" />;
      case UserRole.Level2:
        return <ShieldCheck size={16} className="mr-1" />;
      case UserRole.Level3:
        return <ShieldAlert size={16} className="mr-1" />;
      case UserRole.SuperiorAdmin:
        return <UserCog size={16} className="mr-1" />;
      default:
        return null;
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
                  <span className="ml-2 font-bold text-green-600">Admin</span>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            aria-label="Toggle sidebar"
          >
            <Grid size={20} />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto py-2">
          {sidebarItems.map((item, index) => {
            // Skip items that require higher access than the user has
            if (!user || user.role < item.requiredRole) {
              return null;
            }

            const isActive = location.pathname === item.path;

            return (
              <Button
                key={index}
                variant="ghost"
                className={`
                  ${isSidebarCollapsed ? 'justify-center' : 'justify-start w-full'}
                  ${isActive ? 'bg-green-50 text-green-600' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}
                  mb-1 relative
                `}
                onClick={() => handleSidebarItemClick(item)}
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
                    </motion.span>
                  )}
                </AnimatePresence>

                {item.realtime && !isSidebarCollapsed && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="h-2 w-2 bg-green-500 rounded-full animate-pulse"
                  />
                )}
              </Button>
            );
          })}
        </div>

        {/* Superior Admin Access Button (only show for Level 3 users who aren't already Superior Admin) */}
        {user && user.role === UserRole.Level3 && (
          <div className="p-4 border-t border-gray-200">
            <Button
              variant="outline"
              className={`${isSidebarCollapsed ? 'justify-center' : 'w-full justify-start'} text-amber-600 hover:text-amber-700 hover:bg-amber-50 border-amber-200`}
              onClick={() => setShowSuperiorAdminDialog(true)}
            >
              <UserCog size={20} className={isSidebarCollapsed ? '' : 'mr-2'} />
              <AnimatePresence>
                {!isSidebarCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                  >
                    Superior Access
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </div>
        )}

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
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-4 px-6 flex items-center justify-between transition-colors duration-300">
          <div className="flex items-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold dark:text-white"
            >
              {title}
            </motion.h1>
            {user && user.role >= UserRole.Level2 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="ml-3 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs rounded-full flex items-center transition-colors duration-300"
              >
                <div className="h-2 w-2 bg-green-500 dark:bg-green-400 rounded-full mr-1 animate-pulse"></div>
                Live Admin Data
              </motion.div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative z-10">
              <Button
                variant="ghost"
                className="relative focus:ring-2 focus:ring-green-500 focus:outline-none"
                onClick={() => {
                  setNotificationCount(0);
                  toast({
                    title: "Notifications Cleared",
                    description: "All notifications have been marked as read",
                    duration: 3000,
                  });
                }}
                aria-label="Notifications"
              >
                <BellIcon className="text-gray-700 dark:text-gray-300" />
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

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                className="p-0 focus:ring-2 focus:ring-green-500 focus:outline-none"
                aria-label="Profile Settings"
              >
                <DefaultAvatar className="w-8 h-8" />
              </Button>
              <div className="hidden md:block">
                <div className="font-medium text-sm">{user?.name || 'Admin User'}</div>
                {user && (
                  <div className={`text-xs px-2 py-0.5 rounded-full flex items-center ${getRoleBadgeColor(user.role)}`}>
                    {getRoleIcon(user.role)}
                    {UserRole[user.role]}
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-6 transition-colors duration-300">
          <div className="container mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>

      {/* Superior Admin Access Dialog */}
      <Dialog open={showSuperiorAdminDialog} onOpenChange={setShowSuperiorAdminDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Superior Admin Access</DialogTitle>
            <DialogDescription>
              Enter the Superior Admin access code to gain elevated privileges.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="accessCode" className="text-right">
                Access Code
              </Label>
              <Input
                id="accessCode"
                type="password"
                placeholder="Enter access code"
                className="col-span-3"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
              />
            </div>
            <div className="col-span-4 text-xs text-gray-500">
              <p>Superior Admin has full control over all system functions.</p>
              <p className="mt-1">For demo purposes, use: FUEL-SUPERIOR-2023</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSuperiorAdminDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSuperiorAdminAccess} className="bg-amber-600 hover:bg-amber-700">
              Verify Access
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboardLayout;
