
import React from 'react';
import { motion } from 'framer-motion';

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Find & Select Station",
      description: "Use the app to find fuel stations within 5 miles and compare fuel prices in real time.",
      icon: (
        <div className="w-12 h-12 rounded-lg bg-cyan-500 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
          </svg>
        </div>
      ),
      bgColor: "bg-cyan-50",
    },
    {
      id: 2,
      title: "Pickup Fuel & Shop",
      description: "Select the right fuel type for your vehicle and add groceries or essentials from the station store.",
      icon: (
        <div className="w-12 h-12 rounded-lg bg-fuchsia-500 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <path d="M14 2v6h6"/>
            <path d="M9 14h6"/>
            <path d="M9 18h6"/>
            <path d="M9 10h1"/>
          </svg>
        </div>
      ),
      bgColor: "bg-pink-50",
    },
    {
      id: 3,
      title: "Pay & Track Fuel Friend",
      description: "Pay directly from your device and track your Fuel Friend's location for a smooth fueling experience.",
      icon: (
        <div className="w-12 h-12 rounded-lg bg-blue-500 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="m16.2 7.8-2 6.3-6.4 2.1 2-6.3z"/>
          </svg>
        </div>
      ),
      bgColor: "bg-blue-50",
    },
    {
      id: 4,
      title: "Get Fuel & Delivery",
      description: "Your Fuel Friend fuels your vehicle and delivers groceries directly to your car trunk.",
      icon: (
        <div className="w-12 h-12 rounded-lg bg-green-500 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14"/>
            <path d="M12 5v14"/>
          </svg>
        </div>
      ),
      bgColor: "bg-green-50",
    },
  ];

  return (
    <section className="py-12 md:py-24 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-2"
          >
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl dark:text-white">How it Works</h2>
            <p className="text-gray-500 dark:text-gray-300 md:text-xl/relaxed">
              Fueling made easy - follow these simple steps!
            </p>
          </motion.div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 max-w-7xl mx-auto">
          {steps.map((step, index) => {
            // Define dark mode background colors
            const darkBgColor = step.bgColor === "bg-cyan-50" ? "dark:bg-cyan-900/30" :
                               step.bgColor === "bg-pink-50" ? "dark:bg-fuchsia-900/30" :
                               step.bgColor === "bg-blue-50" ? "dark:bg-blue-900/30" :
                               "dark:bg-green-900/30";

            return (
              <motion.div
                key={step.id}
                className={`${step.bgColor} ${darkBgColor} p-6 rounded-3xl transition-colors duration-300 h-full flex flex-col`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
              >
                <div className="space-y-4 flex-1 flex flex-col">
                  {step.icon}
                  <h3 className="text-xl font-bold dark:text-white">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 flex-grow">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
