
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CtaSection = () => {
  return (
    <section className="py-12 md:py-16 bg-primary text-white overflow-hidden">
      <div className="container px-4 md:px-6 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl mb-4">
            Register your station today for a better future in fuel business!
          </h2>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Button className="bg-white text-primary hover:bg-gray-100 mt-6 px-8 py-6 text-lg font-medium" asChild>
              <Link to="/station-registration">Register Station</Link>
            </Button>
          </motion.div>
        </motion.div>
        
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute w-64 h-64 rounded-full bg-white/5"
            style={{ top: '10%', left: '5%' }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute w-48 h-48 rounded-full bg-white/5"
            style={{ bottom: '10%', right: '5%' }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div 
            className="absolute w-32 h-32 rounded-full bg-white/5"
            style={{ top: '40%', right: '15%' }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
