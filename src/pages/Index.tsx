
import React, { useEffect, useState } from 'react';
import NavBar from '@/components/NavBar';
import HeroSection from '@/components/HeroSection';
import HowItWorks from '@/components/HowItWorks';
import Features from '@/components/Features';
import AppShowcase from '@/components/AppShowcase';
import BusinessSection from '@/components/BusinessSection';
import MapSection from '@/components/MapSection';
import PricingSection from '@/components/PricingSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CtaSection from '@/components/CtaSection';
import Footer from '@/components/Footer';
import { useToast } from "@/hooks/use-toast";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Index = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  // Simulating real-time data loading
  useEffect(() => {
    const loadData = setTimeout(() => {
      setIsLoading(false);
      
      // Show welcome toast when the page loads
      toast({
        title: "Welcome to FuelFriendly!",
        description: "Discover the smartest way to find and purchase fuel.",
        duration: 5000,
      });
      
      // Simulate real-time updates
      const interval = setInterval(() => {
        const messages = [
          "New fuel station added in your area!",
          "Gas prices updated in real-time",
          "Special discount available now!",
          "New feature: Schedule recurring deliveries"
        ];
        
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        
        toast({
          title: "Real-time Update",
          description: randomMessage,
          duration: 3000,
        });
      }, 45000); // Show a random update every 45 seconds
      
      return () => clearInterval(interval);
    }, 1500);
    
    return () => clearTimeout(loadData);
  }, [toast]);

  return (
    <motion.div 
      className="flex min-h-screen flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <NavBar />
      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="space-y-4 text-center">
            <motion.div 
              className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full mx-auto"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />
            <p className="text-gray-500">Loading FuelFriendly experience...</p>
          </div>
        </div>
      ) : (
        <main>
          <HeroSection />
          <HowItWorks />
          <Features />
          <AppShowcase />
          <BusinessSection />
          <MapSection />
          <PricingSection />
          <TestimonialsSection />
          <div className="py-12 flex justify-center">
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/nearby-stations">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-md font-medium shadow-lg transition-all duration-300">
                    Find Nearby Stations
                  </button>
                </motion.div>
              </Link>
              <Link to="/station-dashboard">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button className="bg-white border-2 border-green-500 text-green-500 hover:bg-green-50 px-8 py-3 rounded-md font-medium shadow-lg transition-all duration-300">
                    Register Your Station
                  </button>
                </motion.div>
              </Link>
            </div>
          </div>
          <CtaSection />
        </main>
      )}
      <Footer />
    </motion.div>
  );
};

export default Index;
