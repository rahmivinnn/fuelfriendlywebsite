import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const PerfectPlan = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: "Station Owner",
      price: "FREE",
      description: "Perfect for gas station owners looking to expand their business",
      features: [
        "Register your station on our platform",
        "Receive orders from customers",
        "Manage your station profile",
        "Access to analytics dashboard",
        "24/7 customer support",
        "No commission fees",
        "Unlimited orders",
        "Marketing tools"
      ],
      highlighted: true,
      buttonText: "Register Now",
      action: () => navigate('/station-registration')
    },
    {
      name: "Pump-Side Service Provider",
      price: "EARN MONEY",
      description: "Become a Pump-Side service provider and earn money on your schedule",
      features: [
        "Flexible working hours",
        "Keep 100% of your tips",
        "Weekly payments",
        "In-app navigation",
        "Customer support",
        "Pump-Side service tracking",
        "Rating system",
        "Bonus opportunities"
      ],
      highlighted: false,
      buttonText: "Become a Fuel Friend",
      action: () => navigate('/independent-contractor-agreement')
    }
  ];

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Join the FuelFriendly Network
          </motion.h2>
          <motion.p
            className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Register your station for free or become a Pump-Side service provider and earn money
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mt-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`rounded-xl overflow-hidden shadow-lg ${
                plan.highlighted
                  ? 'border-2 border-green-500 dark:border-green-400 bg-white dark:bg-gray-800'
                  : 'bg-white dark:bg-gray-800'
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {plan.highlighted && (
                <div className="bg-green-500 text-white text-center py-1 text-sm font-medium">
                  ALWAYS FREE
                </div>
              )}
              <div className="p-6 md:p-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-3xl font-bold text-green-600 dark:text-green-400">{plan.price}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6">{plan.description}</p>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 dark:text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={plan.action}
                    className={`w-full ${
                      plan.highlighted
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : 'bg-white border-2 border-green-600 text-green-600 hover:bg-green-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-green-500 dark:text-green-500'
                    }`}
                  >
                    {plan.buttonText}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PerfectPlan;
