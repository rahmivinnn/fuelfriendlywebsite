
import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const PricingSection = () => {
  // This component has been modified to remove pricing plans for gas stations
  // as per client requirements - gas stations register for free

  return (
    <section className="py-12 md:py-24 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl dark:text-white">
              Join FuelFriendly Today
            </h2>
            <p className="text-gray-500 dark:text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Connect with customers and grow your business
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto mt-12">
          <motion.div
            className="pricing-card flex flex-col justify-between p-8 rounded-lg shadow-sm border-2 border-green-500 bg-white dark:bg-gray-800"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold dark:text-white">Gas Station Registration</h3>
              <div className="mt-4 flex items-baseline justify-center">
                <span className="text-5xl font-extrabold text-green-600 dark:text-green-400">FREE</span>
              </div>
              <p className="mt-2 text-gray-600 dark:text-gray-300">No fees, no commissions - just more customers</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div>
                <h4 className="font-medium text-lg mb-3 dark:text-white">Benefits</h4>
                <ul className="space-y-3">
                  {[
                    "Increased visibility to customers",
                    "Real-time price updates",
                    "Customer analytics dashboard",
                    "Manage your station profile",
                    "24/7 customer support",
                    "Marketing tools"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 dark:text-green-400 flex-shrink-0 mr-2" />
                      <span className="text-sm dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-lg mb-3 dark:text-white">How It Works</h4>
                <ul className="space-y-3">
                  {[
                    "Register your station for free",
                    "Complete verification process",
                    "Set up your station profile",
                    "Start receiving orders",
                    "Grow your customer base",
                    "Access business insights"
                  ].map((step, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center mr-2">
                        <span className="text-xs font-medium text-green-600 dark:text-green-400">{index + 1}</span>
                      </div>
                      <span className="text-sm dark:text-gray-300">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 text-center">
              <motion.a
                href="/station-registration"
                className="inline-block px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Register Your Station Now
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
