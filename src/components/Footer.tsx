
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-green-500 text-white pt-12 pb-6">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/f1f34c25-67df-4603-8eb1-3f1fe84812a4.png" 
                alt="FuelFriendly Logo" 
                className="h-12 mr-2"
              />
            </div>
            <p className="text-white/80 text-sm">
              Making fuel accessible anywhere, anytime.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/80 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="text-white/80 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="text-white/80 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-white/80 hover:text-white">Find Fuel</Link></li>
              <li><Link to="/" className="text-white/80 hover:text-white">Fuel Delivery</Link></li>
              <li><Link to="/" className="text-white/80 hover:text-white">Price Tracking</Link></li>
              <li><Link to="/" className="text-white/80 hover:text-white">Road Assistance</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-white/80 hover:text-white">About Us</Link></li>
              <li><Link to="/" className="text-white/80 hover:text-white">Careers</Link></li>
              <li><Link to="/" className="text-white/80 hover:text-white">Partners</Link></li>
              <li><Link to="/" className="text-white/80 hover:text-white">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-white/80 hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/" className="text-white/80 hover:text-white">Terms of Service</Link></li>
              <li><Link to="/" className="text-white/80 hover:text-white">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/20 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-white/80">
            © {new Date().getFullYear()} FuelFriendly. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <select className="text-sm bg-green-600 border border-green-400 rounded px-2 py-1 text-white">
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
