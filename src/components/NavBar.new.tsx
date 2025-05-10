import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, Apple, ArrowRight, LogIn, LogOut,
  User, Shield, ShieldCheck, ShieldAlert, UserCog,
  Star, Share2, Mail, MessageSquare, Droplet
} from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
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
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-sm' : 'bg-white dark:bg-gray-900'} border-b dark:border-gray-800`}>
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
              onClick={() => handleNavClick('how-it-works')}
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 transition-colors"
            >
              How It Works
            </button>
            <button
              onClick={() => handleNavClick('why-it-works')}
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 transition-colors"
            >
              Why It Works
            </button>
            <button
              onClick={() => navigate('/about-us')}
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 transition-colors"
            >
              About Us
            </button>
            <button
              onClick={() => navigate('/contact-us')}
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 transition-colors"
            >
              Contact Us
            </button>
            <button
              onClick={handleAppDownloadClick}
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 transition-colors"
            >
              User & Fuel Friend App
            </button>
            <button
              onClick={() => handleNavClick('partner-with-us')}
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 transition-colors"
            >
              Become a Fuel Friend
            </button>
            <button
              onClick={() => navigate('/nearby-stations')}
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 transition-colors"
            >
              Nearby Fuel Stations
            </button>
          </motion.div>
        </nav>

        <div className="flex items-center space-x-3">
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <ThemeToggle />
          </motion.div>

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
                  className="border-green-500 text-green-600 dark:border-green-400 dark:text-green-400"
                  onClick={handleLoginClick}
                >
                  <LogIn size={16} className="mr-2" />
                  <span className="hidden sm:inline">Login</span>
                  <span className="sm:hidden">Log In</span>
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
                  <span className="hidden sm:inline">Register Station</span>
                  <span className="sm:hidden">Register</span>
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
            <div className="px-4 py-3 space-y-1 bg-white dark:bg-gray-800 border-t dark:border-gray-700">
              <div className="flex justify-between items-center py-2">
                <span className="text-base font-medium text-gray-700 dark:text-gray-300">Theme</span>
                <ThemeToggle />
              </div>

              <button
                onClick={() => handleNavClick('how-it-works')}
                className="block py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 w-full text-left"
              >
                How It Works
              </button>
              <button
                onClick={() => handleNavClick('why-it-works')}
                className="block py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 w-full text-left"
              >
                Why It Works
              </button>
              <button
                onClick={() => navigate('/about-us')}
                className="block py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 w-full text-left"
              >
                About Us
              </button>
              <button
                onClick={() => navigate('/contact-us')}
                className="block py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 w-full text-left"
              >
                Contact Us
              </button>
              <button
                onClick={handleAppDownloadClick}
                className="block py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 w-full text-left"
              >
                User & Fuel Friend App
              </button>
              <button
                onClick={() => handleNavClick('partner-with-us')}
                className="block py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 w-full text-left"
              >
                Become a FuelFriend
              </button>
              <button
                onClick={() => navigate('/nearby-stations')}
                className="block py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 w-full text-left"
              >
                Nearby Fuel Stations
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

      {/* Enhanced App Store Modal */}
      {showAppStoreModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 rounded-xl overflow-hidden max-w-4xl w-full mx-4 shadow-xl"
          >
            <div className="relative">
              {/* Background animation */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-24 -left-24 w-64 h-64 bg-green-200 dark:bg-green-900 rounded-full opacity-20 animate-blob"></div>
                <div className="absolute top-32 -right-24 w-72 h-72 bg-blue-200 dark:bg-blue-900 rounded-full opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-24 left-32 w-56 h-56 bg-yellow-200 dark:bg-yellow-900 rounded-full opacity-20 animate-blob animation-delay-4000"></div>
              </div>

              {/* Content */}
              <div className="relative z-10 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <img
                      src="/lovable-uploads/f1f34c25-67df-4603-8eb1-3f1fe84812a4.png"
                      alt="FuelFriendly"
                      className="h-10 mr-3"
                    />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">FuelFriendly</h3>
                      <p className="text-sm text-gray-500">Fuel delivery at your fingertips</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    onClick={() => setShowAppStoreModal(false)}
                  >
                    <X size={18} />
                  </Button>
                </div>

                <div className="flex flex-col md:flex-row gap-6 py-4">
                  {/* Phone mockup */}
                  <div className="relative mx-auto md:mx-0 w-48 h-96 bg-black rounded-[40px] border-[8px] border-black overflow-hidden shadow-xl">
                    <div className="absolute top-0 left-0 right-0 h-6 bg-black z-10 flex justify-center">
                      <div className="w-24 h-4 bg-black rounded-b-xl"></div>
                    </div>
                    <div className="h-full w-full bg-gradient-to-b from-green-400 to-green-600 dark:from-green-600 dark:to-green-800 overflow-hidden">
                      <div className="animate-float">
                        <div className="pt-8 px-4 text-white">
                          <div className="flex justify-between items-center mb-6">
                            <div>
                              <div className="text-xs opacity-80">Welcome back</div>
                              <div className="font-bold">John Doe</div>
                            </div>
                            <div className="w-8 h-8 bg-white dark:bg-gray-200 rounded-full"></div>
                          </div>

                          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 mb-4">
                            <div className="text-xs font-medium mb-1">Current Order</div>
                            <div className="text-sm">10 Gallons Regular</div>
                            <div className="flex justify-between items-center mt-2">
                              <div className="text-xs opacity-80">Status</div>
                              <div className="text-xs bg-green-500 dark:bg-green-600 px-2 py-0.5 rounded-full">On the way</div>
                            </div>
                          </div>

                          <div className="bg-white dark:bg-gray-800 rounded-xl p-3 mb-4">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-green-500 dark:bg-green-600 rounded-full flex items-center justify-center mr-2">
                                <Droplet size={16} className="text-white" />
                              </div>
                              <div>
                                <div className="text-xs font-medium text-gray-800 dark:text-gray-200">Order Fuel</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">Quick & easy delivery</div>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                              <div className="text-xs font-medium mb-1">Nearby</div>
                              <div className="text-sm">12 stations</div>
                            </div>
                            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                              <div className="text-xs font-medium mb-1">Saved</div>
                              <div className="text-sm">3 locations</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Download options */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Download Our App</h2>
                      <p className="text-gray-600 dark:text-gray-300 mb-6">
                        Get fuel delivered to your doorstep with our mobile app. Available for iOS and Android devices.
                      </p>

                      <div className="space-y-4">
                        <Button
                          className="w-full bg-black hover:bg-gray-800 text-white flex items-center justify-center h-14 rounded-xl transition-transform hover:scale-105 active:scale-95"
                          onClick={() => handleDownloadApp('ios')}
                        >
                          <div className="flex items-center">
                            <Apple className="w-8 h-8 mr-3" />
                            <div className="text-left">
                              <div className="text-xs">Download on the</div>
                              <div className="text-xl font-semibold -mt-1">App Store</div>
                            </div>
                          </div>
                        </Button>

                        <Button
                          className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center h-14 rounded-xl transition-transform hover:scale-105 active:scale-95"
                          onClick={() => handleDownloadApp('android')}
                        >
                          <div className="flex items-center">
                            <svg className="w-8 h-8 mr-3" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.2439 13.8533 7.8508 12 7.8508s-3.5902.3931-5.1367 1.0989L4.841 5.4467a.4161.4161 0 00-.5677-.1521.4157.4157 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3435-4.1021-2.6892-7.5743-6.0775-9.4396"/>
                            </svg>
                            <div className="text-left">
                              <div className="text-xs">GET IT ON</div>
                              <div className="text-xl font-semibold -mt-1">Google Play</div>
                            </div>
                          </div>
                        </Button>
                      </div>
                    </div>

                    <div className="mt-6">
                      <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="flex items-center">
                          <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                          <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                          <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                          <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                          <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-300">4.9 • 2.3k+ reviews</span>
                      </div>

                      <div className="flex justify-center">
                        <Button
                          variant="outline"
                          className="rounded-full px-6 border-green-500 text-green-600 dark:text-green-400 dark:border-green-700 hover:bg-green-50 dark:hover:bg-green-900/30"
                          onClick={() => {
                            navigator.clipboard.writeText("https://fuelfriendlywebsite.vercel.app");
                            toast({
                              title: "Link Copied",
                              description: "Download link copied to clipboard",
                              duration: 3000,
                            });
                          }}
                        >
                          <Share2 size={16} className="mr-2" />
                          Share App Link
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center">
                      <div className="relative mr-4">
                        <div className="w-16 h-16 bg-white dark:bg-gray-700 p-1 rounded-xl shadow-md rotate-3 absolute -right-1 -top-1"></div>
                        <div className="w-16 h-16 bg-white dark:bg-gray-700 p-1 rounded-xl shadow-md -rotate-3 absolute -left-1 -bottom-1"></div>
                        <div className="w-16 h-16 bg-white dark:bg-gray-700 p-1 rounded-xl shadow-md relative z-10">
                          <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMzAgMzMwIj48cGF0aCBkPSJNMCAwaDMzMHYzMzBIMHoiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6TTYwIDMwaDMwdjMwSDYwek05MCAzMGgzMHYzMEg5MHpNMTIwIDMwaDMwdjMwaC0zMHpNMTUwIDMwaDMwdjMwaC0zMHpNMjEwIDMwaDMwdjMwaC0zMHpNMjcwIDMwaDMwdjMwaC0zMHpNMzAgNjBoMzB2MzBIMzB6TTYwIDIxMGgzMHYzMEg5MHpNMTIwIDEyMGgzMHYzMGgtMzB6TTIxMCA2MGgzMHYzMGgtMzB6TTI3MCA2MGgzMHYzMGgtMzB6TTMwIDkwaDMwdjM0SDMwek05MCA5MGgzMHYzMEg5MHpNMTIwIDEyMGgzMHYzMGgtMzB6TTE1MCAxMjBoMzB2MzBoLTMwek0xODAgMTIwaDMwdjMwaC0zMHpNMjEwIDEyMGgzMHYzMGgtMzB6TTI3MCAxODBoMzB2MzBoLTMwek0zMCAyMTBoMzB2MzBIMzB6TTYwIDIxMGgzMHYzMEg2MHpNOTAgMjEwaDMwdjMwSDkwek0xMjAgMjEwaDMwdjMwaC0zMHpNMTUwIDIxMGgzMHYzMGgtMzB6TDE4MCAyMTBoMzB2MzBoLTMwek0yMTAgMjEwaDMwdjMwaC0zMHpNMjQwIDIxMGgzMHYzMGgtMzB6TTI3MCAyMTBoMzB2MzBoLTMwek0zMCAyNDBoMzB2MzBIMzB6TTYwIDI0MGgzMHYzMEg2MHpNOTAgMjQwaDMwdjMwSDkwek0xMjAgMjQwaDMwdjMwaC0zMHpNMTUwIDI0MGgzMHYzMGgtMzB6TDE4MCAyNDBoMzB2MzBoLTMwek0yMTAgMjQwaDMwdjMwaC0zMHpNMjQwIDI0MGgzMHYzMGgtMzB6TTI3MCAyNDBoMzB2MzBoLTMweiIvPjwvc3ZnPg==')] dark:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMzAgMzMwIj48cGF0aCBkPSJNMCAwaDMzMHYzMzBIMHoiIGZpbGw9IiMxZjI5MzciLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6TTYwIDMwaDMwdjMwSDYwek05MCAzMGgzMHYzMEg5MHpNMTIwIDMwaDMwdjMwaC0zMHpNMTUwIDMwaDMwdjMwaC0zMHpNMjEwIDMwaDMwdjMwaC0zMHpNMjcwIDMwaDMwdjMwaC0zMHpNMzAgNjBoMzB2MzBIMzB6TTYwIDIxMGgzMHYzMEg5MHpNMTIwIDEyMGgzMHYzMGgtMzB6TTIxMCA2MGgzMHYzMGgtMzB6TTI3MCA2MGgzMHYzMGgtMzB6TTMwIDkwaDMwdjM0SDMwek05MCA5MGgzMHYzMEg5MHpNMTIwIDEyMGgzMHYzMGgtMzB6TTE1MCAxMjBoMzB2MzBoLTMwek0xODAgMTIwaDMwdjMwaC0zMHpNMjEwIDEyMGgzMHYzMGgtMzB6TTI3MCAxODBoMzB2MzBoLTMwek0zMCAyMTBoMzB2MzBIMzB6TTYwIDIxMGgzMHYzMEg2MHpNOTAgMjEwaDMwdjMwSDkwek0xMjAgMjEwaDMwdjMwaC0zMHpNMTUwIDIxMGgzMHYzMGgtMzB6TDE4MCAyMTBoMzB2MzBoLTMwek0yMTAgMjEwaDMwdjMwaC0zMHpNMjQwIDIxMGgzMHYzMGgtMzB6TTI3MCAyMTBoMzB2MzBoLTMwek0zMCAyNDBoMzB2MzBIMzB6TTYwIDI0MGgzMHYzMEg2MHpNOTAgMjQwaDMwdjMwSDkwek0xMjAgMjQwaDMwdjMwaC0zMHpNMTUwIDI0MGgzMHYzMGgtMzB6TDE4MCAyNDBoMzB2MzBoLTMwek0yMTAgMjQwaDMwdjMwaC0zMHpNMjQwIDI0MGgzMHYzMGgtMzB6TTI3MCAyNDBoMzB2MzBoLTMweiIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==')] bg-center bg-contain rounded-lg"></div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">Scan to Download</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Use your phone's camera</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="rounded-full"
                        onClick={() => {
                          toast({
                            title: "Email Sent",
                            description: "Download link sent to your email",
                            duration: 3000,
                          });
                        }}
                      >
                        <Mail size={16} className="mr-2" />
                        Email Link
                      </Button>
                      <Button
                        className="rounded-full bg-green-600 hover:bg-green-700"
                        onClick={() => {
                          toast({
                            title: "SMS Sent",
                            description: "Download link sent to your phone",
                            duration: 3000,
                          });
                          setShowAppStoreModal(false);
                        }}
                      >
                        <MessageSquare size={16} className="mr-2" />
                        Text Link
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Add animation styles */}
      <style jsx global>{`
        @keyframes blob {
          0% { transform: scale(1) translate(0px, 0px); }
          33% { transform: scale(1.1) translate(30px, -50px); }
          66% { transform: scale(0.9) translate(-20px, 20px); }
          100% { transform: scale(1) translate(0px, 0px); }
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </header>
  );
};

export default NavBar;