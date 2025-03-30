
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const BusinessSection = () => {
  return (
    <section className="py-12 md:py-24 bg-gradient-to-br from-white to-gray-50">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <motion.div 
            className="flex justify-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative w-full max-w-[500px] rounded-lg overflow-hidden shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-blue-500/10 rounded-lg blur-lg"></div>
              <img
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800"
                alt="Business Analytics Dashboard"
                className="object-cover w-full relative rounded-lg shadow-md transform transition-transform hover:scale-105 duration-500"
              />
            </div>
          </motion.div>
          <motion.div 
            className="flex flex-col justify-center space-y-4"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Grow Your Fuel Business with Digital Convenience!
              </h2>
              <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join our network of fuel providers and unlock new revenue streams. Our platform makes it easy to reach more customers, streamline operations, and boost profits.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-primary hover:bg-primary/90 text-white">
                  Partner With Us
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BusinessSection;
