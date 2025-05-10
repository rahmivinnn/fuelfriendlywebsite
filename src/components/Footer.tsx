
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Footer = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

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

  const handleSocialClick = (platform: string) => {
    toast({
      title: `${platform} Link Clicked`,
      description: `Opening ${platform} in a new tab`,
      duration: 2000,
    });
    // In a real app, this would open the actual social media page
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const language = e.target.value;
    toast({
      title: "Language Changed",
      description: `Language set to ${language === 'en' ? 'English' : language === 'es' ? 'Spanish' : 'French'}`,
      duration: 2000,
    });
  };

  return (
    <footer className="bg-green-600 text-white pt-12 pb-6">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="relative group">
                <img
                  src="/lovable-uploads/f1f34c25-67df-4603-8eb1-3f1fe84812a4.png"
                  alt="FuelFriendly Logo"
                  className="h-12 mr-2 brightness-0 invert transition-transform duration-300 group-hover:scale-110"
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
                <div className="absolute inset-0 bg-white rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </div>
              <div className="ml-2">
                <h3 className="text-white font-bold text-lg">FuelFriendly</h3>
                <p className="text-white/80 text-xs">Your Fuel Delivery Partner</p>
              </div>
            </div>
            <p className="text-white text-sm">
              Making fuel accessible anywhere, anytime.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => handleSocialClick('Facebook')}
                className="text-white hover:bg-white hover:text-green-600 p-2 rounded-full transition-all duration-300 transform hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </button>
              <button
                onClick={() => handleSocialClick('Instagram')}
                className="text-white hover:bg-white hover:text-green-600 p-2 rounded-full transition-all duration-300 transform hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </button>
              <button
                onClick={() => handleSocialClick('Twitter')}
                className="text-white hover:bg-white hover:text-green-600 p-2 rounded-full transition-all duration-300 transform hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter size={20} />
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
                  onClick={() => handleNavigation('/fuel-delivery')}
                  className="text-white hover:text-white/80 transition-colors flex items-center group"
                >
                  <span className="transform group-hover:translate-x-1 transition-transform duration-200">Fuel Delivery</span>
                  <span className="opacity-0 group-hover:opacity-100 ml-1 transition-opacity duration-200">→</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('/price-tracking')}
                  className="text-white hover:text-white/80 transition-colors flex items-center group"
                >
                  <span className="transform group-hover:translate-x-1 transition-transform duration-200">Price Tracking</span>
                  <span className="opacity-0 group-hover:opacity-100 ml-1 transition-opacity duration-200">→</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('/road-assistance')}
                  className="text-white hover:text-white/80 transition-colors flex items-center group"
                >
                  <span className="transform group-hover:translate-x-1 transition-transform duration-200">Road Assistance</span>
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
                  onClick={() => handleNavigation('/careers')}
                  className="text-white hover:text-white/80 transition-colors flex items-center group"
                >
                  <span className="transform group-hover:translate-x-1 transition-transform duration-200">Careers</span>
                  <span className="opacity-0 group-hover:opacity-100 ml-1 transition-opacity duration-200">→</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('/partner-with-us')}
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
          <div>
            <h4 className="text-sm font-semibold mb-4 text-white">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => handleNavigation('/privacy-policy')}
                  className="text-white hover:text-white/80 transition-colors flex items-center group"
                >
                  <span className="transform group-hover:translate-x-1 transition-transform duration-200">Privacy Policy</span>
                  <span className="opacity-0 group-hover:opacity-100 ml-1 transition-opacity duration-200">→</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('/terms-of-service')}
                  className="text-white hover:text-white/80 transition-colors flex items-center group"
                >
                  <span className="transform group-hover:translate-x-1 transition-transform duration-200">Terms of Service</span>
                  <span className="opacity-0 group-hover:opacity-100 ml-1 transition-opacity duration-200">→</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('/cookie-policy')}
                  className="text-white hover:text-white/80 transition-colors flex items-center group"
                >
                  <span className="transform group-hover:translate-x-1 transition-transform duration-200">Cookie Policy</span>
                  <span className="opacity-0 group-hover:opacity-100 ml-1 transition-opacity duration-200">→</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/20 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-white">
            © {new Date().getFullYear()} FuelFriendly. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <select
              className="text-sm bg-green-700 border border-green-400 rounded px-2 py-1 text-white cursor-pointer"
              onChange={handleLanguageChange}
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
