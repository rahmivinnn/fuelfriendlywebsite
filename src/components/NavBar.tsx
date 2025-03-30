
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b">
      <div className="container flex items-center justify-between h-16 mx-auto px-4 md:px-6">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/66ecc96c-e744-41ff-bf0f-850f4b71e4b6.png" 
              alt="FuelFriendly Logo" 
              className="h-8 md:h-10"
            />
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm font-medium text-gray-700 hover:text-primary">
            Home
          </Link>
          <Link to="/" className="text-sm font-medium text-gray-700 hover:text-primary">
            How It Works
          </Link>
          <Link to="/" className="text-sm font-medium text-gray-700 hover:text-primary">
            Features
          </Link>
          <Link to="/" className="text-sm font-medium text-gray-700 hover:text-primary">
            Pricing
          </Link>
          <Link to="/" className="text-sm font-medium text-gray-700 hover:text-primary">
            Contact
          </Link>
        </nav>
        
        <div className="flex items-center space-x-3">
          <Button variant="ghost" className="hidden md:inline-flex">
            Sign In
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
