
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const HeroSection = () => {
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
                Your Smart Fueling Solution - Anytime, Anywhere!
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
                <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-base">
                  Download Now
                </Button>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="outline" className="border-gray-200">
                  View All Features
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
            <h3 className="text-lg font-medium">Pertamina</h3>
          </motion.div>
          <motion.div 
            className="flex flex-col items-center space-y-2 border rounded-lg p-4 hover:shadow-lg transition-all duration-300"
            whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
          >
            <h3 className="text-lg font-medium">BP</h3>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
