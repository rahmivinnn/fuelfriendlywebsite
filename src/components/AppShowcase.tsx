
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
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-300/20 to-primary/20 rounded-3xl blur-xl opacity-30"></div>
              <motion.div 
                className="relative"
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <img
                  src="/lovable-uploads/6d32f5db-8078-4b2d-b0ea-8dbdcfde3eff.png"
                  alt="FuelFriendly App Interface"
                  className="object-contain w-full h-full rounded-xl shadow-xl"
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
