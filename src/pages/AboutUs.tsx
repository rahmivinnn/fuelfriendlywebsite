import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Clock, Shield, CreditCard, MapPin, Users, Heart, Fuel } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-green-600 text-white py-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-green-500 opacity-90"></div>
          <div className="absolute inset-0 bg-[url('/fuel-pattern.svg')] opacity-10"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Fuel Friendly</h1>
            <p className="text-xl md:text-2xl mb-8">
              Redefining convenience by bringing fuel and everyday essentials directly to your car side.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg" 
                onClick={() => navigate('/station-registration')}
                className="bg-white text-green-600 hover:bg-gray-100"
              >
                Register Your Station
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => navigate('/global-stations')}
                className="border-white text-white hover:bg-white/10"
              >
                Find Nearby Stations
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20"
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">What We Do</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              We offer on-demand fuel service and a wide selection of convenience store items, all accessible through our easy-to-use mobile app. From snacks and drinks to toiletries and emergency fuel top-ups, we've got you covered—whenever and wherever you need it.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start">
                <Fuel className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-800 dark:text-white">Fuel Delivery</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">On-demand fuel wherever you are</p>
                </div>
              </div>
              <div className="flex items-start">
                <Truck className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-800 dark:text-white">Convenience Items</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Essentials delivered to you</p>
                </div>
              </div>
              <div className="flex items-start">
                <Clock className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-800 dark:text-white">24/7 Service</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Available whenever you need us</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-800 dark:text-white">Location Tracking</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Real-time delivery updates</p>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div variants={itemVariants} className="rounded-lg overflow-hidden shadow-xl">
            <img 
              src="/fuel-delivery.jpg" 
              alt="Fuel delivery service" 
              className="w-full h-auto object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://images.unsplash.com/photo-1545459720-aac8509eb149?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80';
              }}
            />
          </motion.div>
        </motion.div>

        {/* Our Mission */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Our Mission</motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-gray-600 dark:text-gray-300">
            Our mission is simple: to make your life easier, safer, and more convenient. We understand that time is valuable, and running errands can be a hassle. That's why we're here—to save you time and effort by delivering what you need, when you need it.
          </motion.p>
        </motion.div>

        {/* Why Choose Us */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-20"
        >
          <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-10 text-center text-gray-800 dark:text-white">Why Choose Us?</motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div variants={itemVariants}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-green-100 dark:bg-green-900 p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <Truck className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Convenience at Your Fingertips</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Order fuel and essentials with just a few taps on your phone.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-green-100 dark:bg-green-900 p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <Heart className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Friendly Service</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Our "Fuel Friends" are dedicated to providing you with a positive experience.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-green-100 dark:bg-green-900 p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Emergency Assistance</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Running low on fuel? We're here to help, even in a pinch.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-green-100 dark:bg-green-900 p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <CreditCard className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Secure Payments</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Multiple payment options ensure a smooth and safe transaction every time.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-green-100 dark:bg-green-900 p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <MapPin className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Real-Time Tracking</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Know exactly when your delivery will arrive with our live tracking feature.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-green-100 dark:bg-green-900 p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Community Focus</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Join the Fuel Friends community today and experience a new level of convenience.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-green-50 dark:bg-green-900/30 rounded-xl p-8 text-center"
        >
          <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl font-bold mb-4 text-gray-800 dark:text-white">
            Join the Fuel Friends Community Today
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Experience a new level of convenience with our on-demand fuel and essentials delivery service.
          </motion.p>
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              onClick={() => navigate('/station-registration')}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Register Your Station
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => navigate('/global-stations')}
              className="border-green-600 text-green-600 hover:bg-green-50 dark:border-green-500 dark:text-green-500 dark:hover:bg-green-900/50"
            >
              Find Nearby Stations
            </Button>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default AboutUs;
