
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b">
      <div className="container flex items-center justify-between h-16 mx-auto px-4 md:px-6">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 16a3 3 0 0 1-.5-5.94"/>
                <path d="M10 6a2 2 0 0 1 4 0v12"/>
                <path d="M14 12h3"/>
                <path d="M17 7v10"/>
              </svg>
            </div>
            <span className="text-xl font-bold">FuelFriendly</span>
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
