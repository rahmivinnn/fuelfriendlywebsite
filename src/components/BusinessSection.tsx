
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
            <div className="relative w-full max-w-[600px] rounded-lg overflow-hidden shadow-xl">
              <motion.img
                src="/lovable-uploads/e35685e0-0ac9-43c5-be6c-0efbf749e4be.png"
                alt="Business Analytics Dashboard"
                className="object-cover w-full relative rounded-lg shadow-md"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
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
