import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import {
  Zap,
  Shield,
  Clock,
  MapPin,
  Smartphone,
  Users,
  TrendingUp,
  ArrowRight
} from 'lucide-react';

const WhyItWorks = () => {
  const navigate = useNavigate();

  const handleLearnMore = () => {
    navigate('/about-us');
  };

  const reasons = [
    {
      title: "Innovative Technology",
      description: "Our platform connects customers, fuel stations, and delivery partners in real-time for seamless service.",
      icon: <Zap className="h-6 w-6" />,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      title: "Verified Partners",
      description: "All fuel stations and delivery partners undergo thorough verification for quality assurance.",
      icon: <Shield className="h-6 w-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "Time Efficiency",
      description: "Save valuable time by having fuel delivered directly to your vehicle when and where you need it.",
      icon: <Clock className="h-6 w-6" />,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Location Flexibility",
      description: "Get fuel delivered to your home, office, or anywhere your vehicle is parked within our service area.",
      icon: <MapPin className="h-6 w-6" />,
      color: "text-red-600",
      bgColor: "bg-red-100"
    },
    {
      title: "User-Friendly App",
      description: "Our intuitive mobile app makes ordering fuel and tracking delivery simple and convenient.",
      icon: <Smartphone className="h-6 w-6" />,
      color: "text-cyan-600",
      bgColor: "bg-cyan-100"
    },
    {
      title: "Community Focus",
      description: "We create jobs in local communities while providing an essential service to busy individuals.",
      icon: <Users className="h-6 w-6" />,
      color: "text-amber-600",
      bgColor: "bg-amber-100"
    }
  ];

  const stats = [
    { value: "85%", label: "Time Saved" },
    { value: "24/7", label: "Service Availability" },
    { value: "15min", label: "Average Delivery Time" },
    { value: "98%", label: "Customer Satisfaction" }
  ];

  return (
    <section className="py-12 md:py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 transition-colors duration-300">
      <div className="container px-4 md:px-6 mx-auto max-w-7xl">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="space-y-2 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl dark:text-white">
              Why It Works
            </h2>
            <p className="text-gray-500 dark:text-gray-300 md:text-xl/relaxed">
              FuelFriendly revolutionizes the way you refuel by bringing the gas station to you. Here's why our approach is changing the game:
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 mx-auto">
          {reasons.map((reason, index) => {
            // Define dark mode colors
            const darkBgColor = reason.bgColor === "bg-purple-100" ? "dark:bg-purple-900/30" :
                               reason.bgColor === "bg-blue-100" ? "dark:bg-blue-900/30" :
                               reason.bgColor === "bg-green-100" ? "dark:bg-green-900/30" :
                               reason.bgColor === "bg-red-100" ? "dark:bg-red-900/30" :
                               reason.bgColor === "bg-cyan-100" ? "dark:bg-cyan-900/30" :
                               "dark:bg-amber-900/30";

            return (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className={`${reason.bgColor} ${darkBgColor} p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4 transition-colors duration-300`}>
                  <div className={reason.color}>
                    {reason.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 dark:text-white">{reason.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{reason.description}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="bg-gradient-to-r from-blue-600 to-green-600 dark:from-blue-800 dark:to-green-800 rounded-2xl p-8 md:p-12 text-white mb-12 transition-colors duration-300"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                viewport={{ once: true }}
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-blue-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col md:flex-row items-center justify-between bg-gray-50 dark:bg-gray-800 rounded-xl p-8 border border-gray-100 dark:border-gray-700 transition-colors duration-300"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="mb-6 md:mb-0 md:mr-8">
            <h3 className="text-2xl font-bold mb-2 flex items-center dark:text-white">
              <TrendingUp className="mr-2 h-6 w-6 text-green-600 dark:text-green-400" />
              Ready to Experience the Future of Fueling?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
              Join thousands of satisfied customers who have made the switch to on-demand fuel delivery. Save time, avoid gas station lines, and never worry about running on empty again.
            </p>
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-6 text-lg"
              onClick={handleLearnMore}
            >
              Learn More
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyItWorks;
