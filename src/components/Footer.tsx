
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Facebook, Instagram, Twitter, Mail, Phone, MapPin,
  Linkedin, Youtube, Globe, ArrowUp, Send,
  Github, Twitch, Slack
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

const Footer = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showAllSocial, setShowAllSocial] = useState(false);
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

  const handleNavigation = (path: string) => {
    // Log the navigation for debugging
    console.log(`Navigating to: ${path}`);

    // Show toast for navigation feedback
    toast({
      title: "Navigating",
      description: `Going to ${path.replace('/', '')}`,
      duration: 2000,
    });

    // Add a small delay for the toast to be visible before navigation
    setTimeout(() => {
      navigate(path);
    }, 300);
  };

  const handleSocialClick = (platform: string, url: string = '#') => {
    toast({
      title: `${platform} Link Clicked`,
      description: `Opening ${platform} in a new tab`,
      duration: 2000,
    });

    // In a real app, this would open the actual social media page
    window.open(url, '_blank');
  };

  // Social media platforms with mock URLs
  const socialPlatforms = [
    { name: 'Facebook', icon: <Facebook size={20} />, url: 'https://facebook.com/nearby station' },
    { name: 'Instagram', icon: <Instagram size={20} />, url: 'https://instagram.com/nearby station' },
    { name: 'Twitter', icon: <Twitter size={20} />, url: 'https://twitter.com/nearby station' },
    { name: 'LinkedIn', icon: <Linkedin size={20} />, url: 'https://linkedin.com/company/nearby station' },
    { name: 'YouTube', icon: <Youtube size={20} />, url: 'https://youtube.com/nearby station' },
    { name: 'GitHub', icon: <Github size={20} />, url: 'https://github.com/nearby station' },
    { name: 'Twitch', icon: <Twitch size={20} />, url: 'https://twitch.tv/nearby station' },
    { name: 'Slack', icon: <Slack size={20} />, url: 'https://slack.com/nearby station' },
  ];

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const language = e.target.value;
    toast({
      title: "Language Changed",
      description: `Language set to ${language === 'en' ? 'English' : language === 'es' ? 'Spanish' : 'French'}`,
      duration: 2000,
    });
  };

  // Function to handle contact methods
  const handleContactMethod = (method: string, value: string) => {
    let action = '';

    switch (method) {
      case 'email':
        action = `mailto:${value}`;
        break;
      case 'phone':
        action = `tel:${value}`;
        break;
      case 'location':
        action = `https://maps.google.com/?q=${encodeURIComponent(value)}`;
        break;
      default:
        action = '';
    }

    if (action) {
      window.open(action, '_blank');
      toast({
        title: `${method.charAt(0).toUpperCase() + method.slice(1)} Contact`,
        description: `Opening ${method} contact method`,
        duration: 2000,
      });
    }
  };

  return (
    <footer className="bg-green-600 dark:bg-gray-900 text-white pt-12 pb-6 transition-colors duration-300">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">

            <p className="text-white text-sm">
              Making fuel accessible anywhere, anytime.
            </p>
            <div className="relative">
              <div className="flex flex-wrap gap-2 mb-2">
                {socialPlatforms.slice(0, showAllSocial ? socialPlatforms.length : 4).map((platform, index) => (
                  <motion.button
                    key={platform.name}
                    onClick={() => handleSocialClick(platform.name, platform.url)}
                    className="text-white hover:bg-white hover:text-green-600 dark:hover:text-gray-900 p-2 rounded-full transition-colors duration-300"
                    aria-label={platform.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: 1,
                      scale: hoveredSocial === platform.name ? 1.2 : 1,
                      y: hoveredSocial === platform.name ? -5 : 0
                    }}
                    transition={{
                      duration: 0.2,
                      delay: showAllSocial ? 0 : index * 0.1
                    }}
                    onMouseEnter={() => setHoveredSocial(platform.name)}
                    onMouseLeave={() => setHoveredSocial(null)}
                    whileTap={{ scale: 0.9 }}
                  >
                    {platform.icon}
                    {hoveredSocial === platform.name && (
                      <motion.div
                        className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white text-green-600 dark:bg-gray-800 dark:text-white px-2 py-1 rounded text-xs whitespace-nowrap"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                      >
                        {platform.name}
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>

              <button
                onClick={() => setShowAllSocial(!showAllSocial)}
                className="text-xs text-white/80 hover:text-white flex items-center gap-1 transition-colors duration-300"
              >
                {showAllSocial ? 'Show less' : 'Show all social media'}
                <motion.div
                  animate={{ rotate: showAllSocial ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowUp size={12} />
                </motion.div>
              </button>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4 text-white">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => handleNavigation('/nearby-stations')}
                  className="text-white hover:text-white/80 transition-colors flex items-center group"
                >
                  <span className="transform group-hover:translate-x-1 transition-transform duration-200">Find Fuel</span>
                  <span className="opacity-0 group-hover:opacity-100 ml-1 transition-opacity duration-200">→</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('/nearby-stations')}
                  className="text-white hover:text-white/80 transition-colors flex items-center group"
                >
                  <span className="transform group-hover:translate-x-1 transition-transform duration-200">Fuel Friendly</span>
                  <span className="opacity-0 group-hover:opacity-100 ml-1 transition-opacity duration-200">→</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('/nearby-stations')}
                  className="text-white hover:text-white/80 transition-colors flex items-center group"
                >
                  <span className="transform group-hover:translate-x-1 transition-transform duration-200">Price Tracking</span>
                  <span className="opacity-0 group-hover:opacity-100 ml-1 transition-opacity duration-200">→</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('/nearby-stations')}
                  className="text-white hover:text-white/80 transition-colors flex items-center group"
                >
                  <span className="transform group-hover:translate-x-1 transition-transform duration-200">Pump-Side Service Assistance</span>
                  <span className="opacity-0 group-hover:opacity-100 ml-1 transition-opacity duration-200">→</span>
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4 text-white">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => handleNavigation('/about-us')}
                  className="text-white hover:text-white/80 transition-colors flex items-center group"
                >
                  <span className="transform group-hover:translate-x-1 transition-transform duration-200">About Us</span>
                  <span className="opacity-0 group-hover:opacity-100 ml-1 transition-opacity duration-200">→</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('/about-us')}
                  className="text-white hover:text-white/80 transition-colors flex items-center group"
                >
                  <span className="transform group-hover:translate-x-1 transition-transform duration-200">Careers</span>
                  <span className="opacity-0 group-hover:opacity-100 ml-1 transition-opacity duration-200">→</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('/about-us')}
                  className="text-white hover:text-white/80 transition-colors flex items-center group"
                >
                  <span className="transform group-hover:translate-x-1 transition-transform duration-200">Partners</span>
                  <span className="opacity-0 group-hover:opacity-100 ml-1 transition-opacity duration-200">→</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('/contact-us')}
                  className="text-white hover:text-white/80 transition-colors flex items-center group"
                >
                  <span className="transform group-hover:translate-x-1 transition-transform duration-200">Contact</span>
                  <span className="opacity-0 group-hover:opacity-100 ml-1 transition-opacity duration-200">→</span>
                </button>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-semibold mb-4 text-white">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <motion.li
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <button
                  onClick={() => handleContactMethod('email', 'info@nearbystation.com')}
                  className="text-white hover:text-white/80 transition-colors flex items-center group bg-white/10 hover:bg-white/20 p-2 rounded-lg w-full"
                >
                  <div className="bg-white/20 p-2 rounded-full mr-3">
                    <Mail size={16} className="text-white" />
                  </div>
                  <div className="text-left">
                    <span className="block font-medium">Email Us</span>
                    <span className="text-xs text-white/80">info@nearbystation.com</span>
                  </div>
                  <Send size={14} className="ml-auto text-white/50 group-hover:text-white/80 transition-colors" />
                </button>
              </motion.li>
              <motion.li
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <button
                  onClick={() => handleContactMethod('phone', '+1-800-FUEL-NOW')}
                  className="text-white hover:text-white/80 transition-colors flex items-center group bg-white/10 hover:bg-white/20 p-2 rounded-lg w-full"
                >
                  <div className="bg-white/20 p-2 rounded-full mr-3">
                    <Phone size={16} className="text-white" />
                  </div>
                  <div className="text-left">
                    <span className="block font-medium">Call Us</span>
                    <span className="text-xs text-white/80">+1-800-FUEL-NOW</span>
                  </div>
                  <Send size={14} className="ml-auto text-white/50 group-hover:text-white/80 transition-colors" />
                </button>
              </motion.li>
              <motion.li
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <button
                  onClick={() => handleContactMethod('location', '123 Fuel Street, Gas City, FC 12345')}
                  className="text-white hover:text-white/80 transition-colors flex items-center group bg-white/10 hover:bg-white/20 p-2 rounded-lg w-full"
                >
                  <div className="bg-white/20 p-2 rounded-full mr-3">
                    <MapPin size={16} className="text-white" />
                  </div>
                  <div className="text-left">
                    <span className="block font-medium">Visit Us</span>
                    <span className="text-xs text-white/80">123 Fuel Street, Gas City</span>
                  </div>
                  <Send size={14} className="ml-auto text-white/50 group-hover:text-white/80 transition-colors" />
                </button>
              </motion.li>
            </ul>
            <div className="pt-2">
              <h4 className="text-sm font-semibold mb-2 text-white">Legal</h4>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                <button
                  onClick={() => handleNavigation('/privacy-policy')}
                  className="text-white hover:text-white/80 transition-colors text-xs flex items-center group"
                >
                  <span className="transform group-hover:translate-x-1 transition-transform duration-200">Privacy Policy</span>
                </button>
                <button
                  onClick={() => handleNavigation('/shopper-terms')}
                  className="text-white hover:text-white/80 transition-colors text-xs flex items-center group"
                >
                  <span className="transform group-hover:translate-x-1 transition-transform duration-200">Shopper Terms</span>
                </button>
                <button
                  onClick={() => handleNavigation('/about-us')}
                  className="text-white hover:text-white/80 transition-colors text-xs flex items-center group"
                >
                  <span className="transform group-hover:translate-x-1 transition-transform duration-200">Cookie Policy</span>
                </button>
                <button
                  onClick={() => handleNavigation('/independent-contractor-agreement')}
                  className="text-white hover:text-white/80 transition-colors text-xs flex items-center group"
                >
                  <span className="transform group-hover:translate-x-1 transition-transform duration-200">Independent Contractor Agreement</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/20 dark:border-gray-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center">
              <motion.p
                className="text-sm text-white"
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1 }}
              >
                © {new Date().getFullYear()} FuelFriendly. All rights reserved.
              </motion.p>
              <motion.div
                className="ml-4 flex items-center gap-2"
                initial={{ opacity: 0.6 }}
                whileHover={{ opacity: 1 }}
              >
                <Globe size={14} className="text-white/70" />
                <span className="text-xs text-white/70">Worldwide Service</span>
              </motion.div>
            </div>
            <div className="mt-4 md:mt-0 flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <select
                  className="text-sm bg-green-700 dark:bg-gray-800 border border-green-400 dark:border-gray-600 rounded-lg px-3 py-2 text-white cursor-pointer transition-colors duration-300"
                  onChange={handleLanguageChange}
                >
                  <option value="en">🇺🇸 English</option>
                  <option value="es">🇪🇸 Español</option>
                  <option value="fr">🇫🇷 Français</option>
                  <option value="de">🇩🇪 Deutsch</option>
                  <option value="it">🇮🇹 Italiano</option>
                  <option value="pt">🇵🇹 Português</option>
                  <option value="ru">🇷🇺 Русский</option>
                  <option value="zh">🇨🇳 中文</option>
                  <option value="ja">🇯🇵 日本語</option>
                  <option value="ko">🇰🇷 한국어</option>
                </select>
              </motion.div>
              <motion.button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-white bg-green-700 dark:bg-gray-800 hover:bg-green-800 dark:hover:bg-gray-700 rounded-full p-3 transition-colors duration-300"
                aria-label="Back to top"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                <ArrowUp size={16} />
              </motion.button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-white/50">
              FuelFriendly is committed to providing convenient pump side services worldwide. Our platform connects customers with verified fuel stations and pump side service providers.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
