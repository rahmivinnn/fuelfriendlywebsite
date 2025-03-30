
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const Features = () => {
  const features = [
    {
      title: "Reliable & Secure",
      description: "Rely on our vetted network of fuel stations for consistent quality and secure transactions.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
        </svg>
      ),
      color: "bg-blue-500/10",
      textColor: "text-blue-600",
    },
    {
      title: "Fast & Convenient",
      description: "Skip the lines and simplify your refueling experience with our easy-to-use mobile app.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      ),
      color: "bg-purple-500/10",
      textColor: "text-purple-600",
    },
    {
      title: "Real-Time Tracking",
      description: "Track your fuel deliveries in real-time and get notifications when your order is on the way.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
        </svg>
      ),
      color: "bg-orange-500/10",
      textColor: "text-orange-600",
    },
    {
      title: "24/7 Road Assistance",
      description: "Get help whenever you need it with our 24/7 customer support and roadside assistance service.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 8v4l2 2"/>
        </svg>
      ),
      color: "bg-green-500/10",
      textColor: "text-green-600",
    },
  ];

  return (
    <section className="py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <motion.div 
          className="flex flex-col items-center justify-center space-y-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Why Choose Us?</h2>
            <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We're dedicated to making fueling up as easy as possible.
            </p>
          </div>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className="feature-card flex flex-col space-y-4 rounded-xl hover:shadow-lg transition-all duration-300 border border-gray-100 p-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-full ${feature.color}`}>
                  <div className={feature.textColor}>{feature.icon}</div>
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
              </div>
              <p className="text-gray-500">{feature.description}</p>
            </motion.div>
          ))}
        </div>
        <motion.div 
          className="flex justify-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="bg-primary hover:bg-primary/90 px-8 py-6 text-lg">Learn More</Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
