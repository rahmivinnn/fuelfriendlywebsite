
import React from 'react';
import { motion } from 'framer-motion';

const MapSection = () => {
  const dotVariants = {
    initial: { scale: 0.8, opacity: 0.5 },
    hover: { scale: 1.5, opacity: 1 }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  return (
    <section className="py-12 md:py-24 bg-white">
      <motion.div 
        className="container px-4 md:px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="flex flex-col items-start space-y-4">
          <div className="space-y-2 max-w-3xl">
            <motion.h2 
              className="text-3xl font-bold tracking-tighter md:text-4xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Explore Our Service Areas & Fuel Stations Near You!
            </motion.h2>
            <motion.p 
              className="text-gray-500 md:text-xl/relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Find registered fuel stations and Fuel Friend services in your city. Use the interactive map to locate nearby stations, compare prices, and access seamless fueling solutions.
            </motion.p>
          </div>
        </div>
        
        <motion.div 
          className="mt-12 relative w-full h-[500px] rounded-lg overflow-hidden border border-gray-200"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 bg-gray-100 bg-opacity-50 flex items-center justify-center">
            <div className="w-full h-full relative">
              <img 
                src="/lovable-uploads/e962c9af-b6e3-4257-a75e-a6cf7e9a96f4.png" 
                alt="Global service map" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-white opacity-0"></div>
            </div>
            
            {/* Interactive dots overlay */}
            <motion.div 
              className="absolute inset-0 pointer-events-none"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {/* Active location markers */}
              <motion.div 
                className="absolute left-1/4 top-1/3"
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              </motion.div>
              <motion.div 
                className="absolute right-1/3 bottom-1/4"
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              </motion.div>
              <motion.div 
                className="absolute left-1/2 top-1/2"
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-3 gap-8 mt-16 text-center">
          <motion.div 
            className="flex flex-col items-center space-y-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <span className="text-5xl font-bold text-gray-900">4.5k+</span>
            <span className="text-gray-500">Registered Users</span>
          </motion.div>
          <motion.div 
            className="flex flex-col items-center space-y-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <span className="text-5xl font-bold text-gray-900">1.5k+</span>
            <span className="text-gray-500">Active Fuel Friends</span>
          </motion.div>
          <motion.div 
            className="flex flex-col items-center space-y-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="text-5xl font-bold text-gray-900">1000+</span>
            <span className="text-gray-500">Fuel Stations Onboard</span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default MapSection;
