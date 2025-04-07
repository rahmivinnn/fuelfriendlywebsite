
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Check, X, Apple, ArrowRight } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const HeroSection = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showAppStoreModal, setShowAppStoreModal] = useState(false);

  const handleRegisterClick = () => {
    // Navigate immediately without delay
    navigate('/station-registration');
  };

  const handleAppDownloadClick = () => {
    setShowAppStoreModal(true);
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
    <section className="py-12 md:py-24 overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <motion.div 
            className="flex flex-col justify-center space-y-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                The Best Way To Fuel - Anytime, Anywhere!
              </h1>
              <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                The ultimate solution for modern fuel needs. Find and order fuel, schedule deliveries, and pay with ease - all from one convenient app.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 text-base w-full sm:w-auto" 
                  onClick={handleRegisterClick}
                >
                  Register Station
                </Button>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="outline" 
                  className="border-gray-200 w-full sm:w-auto"
                  onClick={handleAppDownloadClick}
                >
                  Download App
                </Button>
              </motion.div>
            </div>
            <p className="text-xs text-gray-500">
              Downloaded by over 100,000 users
            </p>
          </motion.div>
          <motion.div 
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-blue-500/20 rounded-[32px] blur-xl opacity-30"></div>
              <motion.div 
                className="relative w-[300px] h-[600px] md:w-[320px] md:h-[640px]"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ 
                  repeat: Infinity, 
                  repeatType: "reverse", 
                  duration: 2,
                  ease: "easeInOut"
                }}
              >
                <img
                  src="/lovable-uploads/7b1b63ff-133e-4806-a870-d769ebf3fd94.png"
                  alt="FuelFriendly App Preview with Map"
                  className="object-contain w-full h-full rounded-2xl shadow-xl"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="container px-4 md:px-6 mt-12">
        <motion.div 
          className="grid grid-cols-3 gap-12 md:gap-24 justify-center items-center mt-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.div 
            className="flex flex-col items-center space-y-2 border rounded-lg p-4 hover:shadow-lg transition-all duration-300"
            whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
          >
            <h3 className="text-lg font-medium">Shell</h3>
          </motion.div>
          <motion.div 
            className="flex flex-col items-center space-y-2 border rounded-lg p-4 hover:shadow-lg transition-all duration-300"
            whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
          >
            <h3 className="text-lg font-medium">Memphis Gas</h3>
          </motion.div>
          <motion.div 
            className="flex flex-col items-center space-y-2 border rounded-lg p-4 hover:shadow-lg transition-all duration-300"
            whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
          >
            <h3 className="text-lg font-medium">BP</h3>
          </motion.div>
        </motion.div>
      </div>

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
    </section>
  );
};

export default HeroSection;
