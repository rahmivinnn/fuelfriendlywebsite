
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const AppShowcase = () => {
  return (
    <section className="py-12 md:py-24 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <motion.div 
            className="flex flex-col justify-center space-y-4"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Find, Refuel, Deliver - One App for Everything!
              </h2>
              <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our all-in-one solution puts everything you need for fueling at your fingertips. Monitor prices, schedule deliveries, and even get emergency assistance.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-primary hover:bg-primary/90 text-white">
                  Download the App
                </Button>
              </motion.div>
            </div>
          </motion.div>
          <motion.div 
            className="flex justify-center lg:justify-end mt-8 lg:mt-0"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-2 gap-4">
              <motion.div 
                className="relative w-[160px] h-[320px] md:w-[180px] md:h-[360px] rounded-3xl overflow-hidden shadow-lg rotate-2"
                whileHover={{ y: -10, rotate: 0, transition: { duration: 0.2 } }}
              >
                <img
                  src="/lovable-uploads/0b1492f3-7eb1-46e2-9bf5-c2ec23ca508f.png"
                  alt="FuelFriendly App Screen 1"
                  className="object-cover w-full h-full"
                />
              </motion.div>
              <motion.div 
                className="relative w-[160px] h-[320px] md:w-[180px] md:h-[360px] rounded-3xl overflow-hidden shadow-lg -rotate-2 mt-4"
                whileHover={{ y: -10, rotate: 0, transition: { duration: 0.2 } }}
              >
                <img
                  src="/lovable-uploads/0b1492f3-7eb1-46e2-9bf5-c2ec23ca508f.png"
                  alt="FuelFriendly App Screen 2"
                  className="object-cover w-full h-full"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AppShowcase;
