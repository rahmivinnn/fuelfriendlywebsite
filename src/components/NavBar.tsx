
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, Apple, ArrowRight, LogIn, LogOut,
  User, Shield, ShieldCheck, ShieldAlert, UserCog
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useAuth, UserRole } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { DefaultAvatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const NavBar = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAppStoreModal, setShowAppStoreModal] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleRegisterClick = () => {
    // Navigate immediately without delay
    navigate('/station-registration');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
      duration: 3000,
    });
    navigate('/');
  };

  const handleAdminDashboard = () => {
    navigate('/admin-dashboard');
  };

  const handleStationDashboard = () => {
    navigate('/station-dashboard');
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
        return <Shield size={14} className="mr-1" />;
      case UserRole.Level2:
        return <ShieldCheck size={14} className="mr-1" />;
      case UserRole.Level3:
        return <ShieldAlert size={14} className="mr-1" />;
      case UserRole.SuperiorAdmin:
        return <UserCog size={14} className="mr-1" />;
      default:
        return null;
    }
  };

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);

    // If on homepage, scroll to section
    if (window.location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If not on homepage, navigate to homepage with section hash
      navigate(`/#${sectionId}`);
    }
  };

  const handleAppDownloadClick = () => {
    setShowAppStoreModal(true);
    setMobileMenuOpen(false);
  };

  const handleDownloadApp = (platform: 'ios' | 'android') => {
    toast({
      title: `Downloading ${platform === 'ios' ? 'iOS' : 'Android'} App`,
      description: `You're being redirected to the ${platform === 'ios' ? 'App Store' : 'Google Play Store'}`,
      duration: 3000,
    });

    // Simulate app store redirect
    setTimeout(() => {
      setShowAppStoreModal(false);
      toast({
        title: "Download Started",
        description: "Thank you for downloading the FuelFriendly app!",
        duration: 3000,
      });
    }, 1000);
  };

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-white'} border-b`}>
      <div className="container flex items-center justify-between h-16 mx-auto px-4 md:px-6">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <motion.div
              className="flex items-center"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src="/lovable-uploads/f1f34c25-67df-4603-8eb1-3f1fe84812a4.png"
                alt="FuelFriendly Logo"
                className="h-10 md:h-12"
              />
            </motion.div>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <motion.div
            className="flex space-x-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <button
              onClick={() => navigate('/')}
              className="text-sm font-medium text-gray-700 hover:text-green-500 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('how-it-works')}
              className="text-sm font-medium text-gray-700 hover:text-green-500 transition-colors"
            >
              How It Works
            </button>
            <button
              onClick={() => navigate('/about-us')}
              className="text-sm font-medium text-gray-700 hover:text-green-500 transition-colors"
            >
              About Us
            </button>
            <button
              onClick={handleAppDownloadClick}
              className="text-sm font-medium text-gray-700 hover:text-green-500 transition-colors"
            >
              User & Fuel Friend App
            </button>
            <button
              onClick={() => navigate('/nearby-stations')}
              className="text-sm font-medium text-gray-700 hover:text-green-500 transition-colors"
            >
              Nearby Fuel Stations
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="text-sm font-medium text-gray-700 hover:text-green-500 transition-colors"
            >
              Contact Us
            </button>
          </motion.div>
        </nav>

        <div className="flex items-center space-x-3">
          {!isAuthenticated ? (
            <>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Button
                  variant="outline"
                  className="border-green-500 text-green-600"
                  onClick={handleLoginClick}
                >
                  <LogIn size={16} className="mr-2" />
                  Login
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <Button
                  className="bg-green-500 hover:bg-green-600 text-white"
                  onClick={handleRegisterClick}
                >
                  Register Station
                </Button>
              </motion.div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="flex items-center"
            >
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <DefaultAvatar className="h-8 w-8" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                      {user && (
                        <div className={`text-xs px-2 py-0.5 mt-1 rounded-full flex items-center ${getRoleBadgeColor(user.role)}`}>
                          {getRoleIcon(user.role)}
                          {UserRole[user.role]}
                        </div>
                      )}
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  {user && user.role >= UserRole.Level1 && (
                    <DropdownMenuItem onClick={handleAdminDashboard}>
                      <Shield className="mr-2 h-4 w-4" />
                      <span>Admin Dashboard</span>
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuItem onClick={handleStationDashboard}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Station Dashboard</span>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </motion.div>
          )}

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 py-3 space-y-1 bg-white border-t">
              <button
                onClick={() => navigate('/')}
                className="block py-2 text-base font-medium text-gray-700 hover:text-green-500 w-full text-left"
              >
                Home
              </button>
              <button
                onClick={() => handleNavClick('how-it-works')}
                className="block py-2 text-base font-medium text-gray-700 hover:text-green-500 w-full text-left"
              >
                How It Works
              </button>
              <button
                onClick={() => navigate('/about-us')}
                className="block py-2 text-base font-medium text-gray-700 hover:text-green-500 w-full text-left"
              >
                About Us
              </button>
              <button
                onClick={handleAppDownloadClick}
                className="block py-2 text-base font-medium text-gray-700 hover:text-green-500 w-full text-left"
              >
                User & Fuel Friend App
              </button>
              <button
                onClick={() => navigate('/nearby-stations')}
                className="block py-2 text-base font-medium text-gray-700 hover:text-green-500 w-full text-left"
              >
                Nearby Fuel Stations
              </button>
              <button
                onClick={() => handleNavClick('contact')}
                className="block py-2 text-base font-medium text-gray-700 hover:text-green-500 w-full text-left"
              >
                Contact Us
              </button>
              {!isAuthenticated ? (
                <div className="pt-2 pb-3 space-y-2">
                  <Button
                    variant="outline"
                    className="w-full border-green-500 text-green-600"
                    onClick={handleLoginClick}
                  >
                    <LogIn size={16} className="mr-2" />
                    Login
                  </Button>
                  <Button
                    className="w-full bg-green-500 hover:bg-green-600 text-white"
                    onClick={handleRegisterClick}
                  >
                    Register Station
                  </Button>
                </div>
              ) : (
                <div className="pt-2 pb-3 space-y-2">
                  {user && user.role >= UserRole.Level1 && (
                    <Button
                      variant="outline"
                      className="w-full border-blue-500 text-blue-600"
                      onClick={handleAdminDashboard}
                    >
                      <Shield size={16} className="mr-2" />
                      Admin Dashboard
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    className="w-full border-gray-500 text-gray-600"
                    onClick={handleStationDashboard}
                  >
                    <User size={16} className="mr-2" />
                    Station Dashboard
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-red-500 text-red-600"
                    onClick={handleLogout}
                  >
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </Button>
                  {user && (
                    <div className={`mt-2 p-2 rounded-md flex items-center justify-center ${getRoleBadgeColor(user.role)}`}>
                      {getRoleIcon(user.role)}
                      <span className="text-sm font-medium">
                        {UserRole[user.role]} Access
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* App Store Modal */}
      {showAppStoreModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-md w-full mx-4"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Download FuelFriendly App</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowAppStoreModal(false)}
              >
                <X size={20} />
              </Button>
            </div>

            <p className="text-gray-600 mb-6">
              Choose your platform to download the FuelFriendly app and start enjoying convenient fuel services.
            </p>

            <div className="space-y-3">
              <Button
                className="w-full justify-between bg-black hover:bg-gray-800 text-white py-6"
                onClick={() => handleDownloadApp('ios')}
              >
                <div className="flex items-center">
                  <Apple size={24} className="mr-3" />
                  <div className="text-left">
                    <div className="text-xs">Download on the</div>
                    <div className="text-lg font-semibold">App Store</div>
                  </div>
                </div>
                <ArrowRight size={20} />
              </Button>

              <Button
                className="w-full justify-between bg-green-600 hover:bg-green-700 text-white py-6"
                onClick={() => handleDownloadApp('android')}
              >
                <div className="flex items-center">
                  <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.2439 13.8533 7.8508 12 7.8508s-3.5902.3931-5.1367 1.0989L4.841 5.4467a.4161.4161 0 00-.5677-.1521.4157.4157 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3435-4.1021-2.6892-7.5743-6.0775-9.4396"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-xs">Download on</div>
                    <div className="text-lg font-semibold">Google Play</div>
                  </div>
                </div>
                <ArrowRight size={20} />
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
