
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
            <Link to="/" className="text-sm font-medium text-gray-700 hover:text-green-500 transition-colors">
              Home
            </Link>
            <Link to="/" className="text-sm font-medium text-gray-700 hover:text-green-500 transition-colors">
              How It Works
            </Link>
            <Link to="/" className="text-sm font-medium text-gray-700 hover:text-green-500 transition-colors">
              User & Fuel Friend App
            </Link>
            <Link to="/nearby-stations" className="text-sm font-medium text-gray-700 hover:text-green-500 transition-colors">
              Nearby Fuel Stations
            </Link>
            <Link to="/" className="text-sm font-medium text-gray-700 hover:text-green-500 transition-colors">
              Contact Us
            </Link>
          </motion.div>
        </nav>
        
        <div className="flex items-center space-x-3">
          <motion.div 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Link to="/station-dashboard">
              <Button className="bg-green-500 hover:bg-green-600 text-white">
                Register Station
              </Button>
            </Link>
          </motion.div>
          
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
              <Link to="/" className="block py-2 text-base font-medium text-gray-700 hover:text-green-500">
                Home
              </Link>
              <Link to="/" className="block py-2 text-base font-medium text-gray-700 hover:text-green-500">
                How It Works
              </Link>
              <Link to="/" className="block py-2 text-base font-medium text-gray-700 hover:text-green-500">
                User & Fuel Friend App
              </Link>
              <Link to="/nearby-stations" className="block py-2 text-base font-medium text-gray-700 hover:text-green-500">
                Nearby Fuel Stations
              </Link>
              <Link to="/" className="block py-2 text-base font-medium text-gray-700 hover:text-green-500">
                Contact Us
              </Link>
              <div className="pt-2 pb-3">
                <Link to="/station-dashboard">
                  <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                    Register Station
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default NavBar;
