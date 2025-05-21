<<<<<<< HEAD
import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Clock, Shield, CreditCard, MapPin, Users, Heart, Fuel } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {
  const navigate = useNavigate();
=======
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Truck, Clock, Shield, CreditCard, MapPin, Users,
  Heart, Fuel, ChevronRight, Star, ArrowRight,
  Sparkles, Zap, Leaf, Droplet, Mail, Phone, Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate, Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const AboutUs = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('about');
  const [isLoading, setIsLoading] = useState(true);
  const [teamMembers, setTeamMembers] = useState([]);
  const [stats, setStats] = useState({
    stations: 0,
    countries: 0,
    customers: 0,
    deliveries: 0
  });

  // Refs for scroll animations
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 });

  // Interactive feedback for tab changes
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    toast({
      title: `${tabId.charAt(0).toUpperCase() + tabId.slice(1)}`,
      description: `Viewing ${tabId} information`,
      duration: 1500,
    });
  };

  // Simulate data loading
  useEffect(() => {
    const loadData = setTimeout(() => {
      setIsLoading(false);

      // Show welcome toast when the page loads
      toast({
        title: "About Fuel Friendly",
        description: "Learn more about our mission and values.",
        duration: 3000,
      });

      // Set team members data
      setTeamMembers([
        {
          id: 1,
          name: "Sarah Johnson",
          role: "CEO & Founder",
          image: "https://randomuser.me/api/portraits/women/32.jpg",
          bio: "Former petroleum industry executive with a vision to revolutionize pump side service."
        },
        {
          id: 2,
          name: "Michael Chen",
          role: "CTO",
          image: "https://randomuser.me/api/portraits/men/22.jpg",
          bio: "Tech innovator with expertise in mobile app development and logistics systems."
        },
        {
          id: 3,
          name: "Aisha Patel",
          role: "COO",
          image: "https://randomuser.me/api/portraits/women/44.jpg",
          bio: "Operations expert with experience scaling pump side service networks across multiple countries."
        },
        {
          id: 4,
          name: "David Rodriguez",
          role: "Head of Partnerships",
          image: "https://randomuser.me/api/portraits/men/67.jpg",
          bio: "Building relationships with fuel centers and convenience stores worldwide."
        }
      ]);

      // Animate stats
      animateStats();
    }, 800);

    return () => clearTimeout(loadData);
  }, [toast]);

  // Animate stats counting up
  const animateStats = () => {
    const finalStats = {
      stations: 1250,
      countries: 42,
      customers: 125000,
      deliveries: 3750000
    };

    const duration = 2000; // 2 seconds
    const steps = 50;
    const interval = duration / steps;

    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;

      setStats({
        stations: Math.floor(progress * finalStats.stations),
        countries: Math.floor(progress * finalStats.countries),
        customers: Math.floor(progress * finalStats.customers),
        deliveries: Math.floor(progress * finalStats.deliveries)
      });

      if (step >= steps) {
        clearInterval(timer);
      }
    }, interval);
  };
>>>>>>> fc50f12d78601307538b9c65c6925970812ed209

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

<<<<<<< HEAD
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-green-600 text-white py-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-green-500 opacity-90"></div>
          <div className="absolute inset-0 bg-[url('/fuel-pattern.svg')] opacity-10"></div>
=======
  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-4">
            Loading
          </div>
          <p className="text-gray-500">Loading About Us...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <NavBar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-green-500 text-white py-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-10"></div>
>>>>>>> fc50f12d78601307538b9c65c6925970812ed209
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
<<<<<<< HEAD
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
=======
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/10 p-3 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center backdrop-blur-sm"
            >
              <Droplet className="h-10 w-10" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Fuel Friendly</h1>
            <p className="text-xl md:text-2xl mb-8">
              Redefining convenience with our pump side service and everyday essentials.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                onClick={() => navigate('/station-registration')}
                className="bg-white text-green-600 hover:bg-gray-100 rounded-full px-8"
              >
                Register Your Station
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/nearby-stations')}
                className="border-white text-white hover:bg-white/10 rounded-full px-8"
              >
                Find Nearby Fuel Centers
                <MapPin className="ml-2 h-5 w-5" />
>>>>>>> fc50f12d78601307538b9c65c6925970812ed209
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

<<<<<<< HEAD
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
              We offer convenient pump-side service and a wide selection of convenience store items, all accessible through our easy-to-use mobile app. From snacks and drinks to toiletries and emergency fuel assistance, we've got you covered at participating gas stations.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start">
                <Fuel className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-800 dark:text-white">Pump-Side Service</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Convenient fueling at the station</p>
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
              alt="Pump side service" 
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
=======
      {/* Stats Section */}
      <section className="py-12 bg-white dark:bg-gray-800" ref={statsRef}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={statsInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="p-6 cursor-pointer bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
              onClick={() => {
                toast({
                  title: "Partner Fuel Centers",
                  description: `We have ${stats.stations.toLocaleString()}+ partner fuel centers worldwide`,
                  duration: 2000,
                });
              }}
            >
              <div className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                {stats.stations.toLocaleString()}+
              </div>
              <div className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
                Partner Fuel Centers
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={statsInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="p-6 cursor-pointer bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
              onClick={() => {
                toast({
                  title: "Global Presence",
                  description: `We operate in ${stats.countries.toLocaleString()} countries around the world`,
                  duration: 2000,
                });
              }}
            >
              <div className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                {stats.countries.toLocaleString()}
              </div>
              <div className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
                Countries
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={statsInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              className="p-6 cursor-pointer bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
              onClick={() => {
                toast({
                  title: "Happy Customers",
                  description: `Over ${stats.customers.toLocaleString()}+ satisfied customers and growing`,
                  duration: 2000,
                });
              }}
            >
              <div className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                {stats.customers.toLocaleString()}+
              </div>
              <div className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
                Happy Customers
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={statsInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              className="p-6 cursor-pointer bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
              onClick={() => {
                toast({
                  title: "Pump Side Services Completed",
                  description: `We've successfully completed ${stats.deliveries.toLocaleString()}+ pump side services`,
                  duration: 2000,
                });
              }}
            >
              <div className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                {stats.deliveries.toLocaleString()}+
              </div>
              <div className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
                Pump Side Services Completed
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex overflow-x-auto mb-8 pb-2 scrollbar-hide">
            <div className="flex space-x-2 mx-auto bg-gray-100 dark:bg-gray-800 p-1 rounded-full">
              {[
                { id: 'about', label: 'About Us' },
                { id: 'mission', label: 'Our Mission' },
                { id: 'story', label: 'What We Do' },
                { id: 'values', label: 'Our Values' },
                { id: 'team', label: 'Our Team' }
              ].map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-green-500 text-white shadow-md'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {tab.label}
                </motion.button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'about' && (
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-gray-800 dark:text-white">About Us</h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    At Fuel Friendly we're redefining convenience by bringing fuel and everyday essentials directly to your car side. Whether you're at home, at work, or on the go, our app connects you with friendly, professional staff—your "Pump-Side service providers"—ready to serve you with a smile.
                  </p>
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    Join the Pump-Side service community today and experience a new level of convenience.
                  </p>
                  <div className="mt-8">
                    <div
                      className="rounded-xl shadow-lg w-full h-64 bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center text-white font-bold text-xl"
                    >
                      Fuel Friendly Service
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'mission' && (
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Our Mission</h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    Our mission is simple: to make your life easier, more safer, more convenient. We understand that time is valuable, and running errands can be a hassle. That's why we're here—to save you time and effort by delivering what you need, when you need it.
                  </p>
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    We're building a world where you never have to interrupt your day for a fuel stop again. Whether you're at home, work, or on the go, Fuel Friendly ensures you have what you need, when you need it, delivered with a smile.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl">
                      <div className="bg-green-100 dark:bg-green-800 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                        <Zap className="h-6 w-6 text-green-600 dark:text-green-400" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Convenience First</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        We're eliminating the hassle of fuel stops and convenience store runs from your busy schedule.
                      </p>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl">
                      <div className="bg-green-100 dark:bg-green-800 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                        <Leaf className="h-6 w-6 text-green-600 dark:text-green-400" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Sustainability</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Our optimized delivery routes reduce overall traffic and emissions compared to individual trips.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'story' && (
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-gray-800 dark:text-white">What We Do</h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    At Fuel Friendly we're redefining convenience with our pump side service and everyday essentials. Whether you're at home, at work, or on the go, our app connects you with friendly, professional staff—your "Pump-Side service providers"—ready to serve you with a smile.
                  </p>
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    We offer pump side service and a wide selection of convenience store items, all accessible through our easy-to-use mobile app. From snacks and drinks to toiletries and traffic updates, we've got you covered—whenever and wherever you need it.
                  </p>

                  <h2 className="text-3xl font-bold text-gray-800 dark:text-white mt-10">Why Choose Us?</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div className="flex items-start">
                      <div className="bg-green-100 dark:bg-green-800 w-10 h-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                        <Zap className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Convenience at Your Fingertips</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          Order fuel and essentials with just a few taps on your phone.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-green-100 dark:bg-green-800 w-10 h-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                        <Heart className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Friendly Service</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          Our "Pump-Side service providers" are dedicated to providing you with a positive experience.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-green-100 dark:bg-green-800 w-10 h-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                        <Truck className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Traffic update</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          Running low on fuel? We're here to help, even in a pinch.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-green-100 dark:bg-green-800 w-10 h-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                        <CreditCard className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Secure Payments</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          Multiple payment options ensure a smooth and safe transaction every time.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-green-100 dark:bg-green-800 w-10 h-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                        <MapPin className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Real-Time Tracking</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          Know exactly when your service will be ready with our live tracking feature.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'values' && (
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Our Values</h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    At Fuel Friendly, our values guide everything we do. They shape our culture, inform our decisions, and help us deliver exceptional service to our customers and partners.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div className="border border-gray-200 dark:border-gray-700 p-6 rounded-xl hover:shadow-md transition-shadow">
                      <div className="flex items-center mb-4">
                        <div className="bg-green-100 dark:bg-green-800 w-10 h-10 rounded-full flex items-center justify-center mr-4">
                          <Heart className="h-5 w-5 text-green-600 dark:text-green-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Customer First</h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">
                        We prioritize customer needs above all else, constantly seeking ways to improve their experience.
                      </p>
                    </div>

                    <div className="border border-gray-200 dark:border-gray-700 p-6 rounded-xl hover:shadow-md transition-shadow">
                      <div className="flex items-center mb-4">
                        <div className="bg-green-100 dark:bg-green-800 w-10 h-10 rounded-full flex items-center justify-center mr-4">
                          <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Safety & Quality</h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">
                        We never compromise on safety standards or the quality of products we deliver.
                      </p>
                    </div>

                    <div className="border border-gray-200 dark:border-gray-700 p-6 rounded-xl hover:shadow-md transition-shadow">
                      <div className="flex items-center mb-4">
                        <div className="bg-green-100 dark:bg-green-800 w-10 h-10 rounded-full flex items-center justify-center mr-4">
                          <Sparkles className="h-5 w-5 text-green-600 dark:text-green-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Innovation</h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">
                        We continuously seek new ways to improve our service and solve customer problems.
                      </p>
                    </div>

                    <div className="border border-gray-200 dark:border-gray-700 p-6 rounded-xl hover:shadow-md transition-shadow">
                      <div className="flex items-center mb-4">
                        <div className="bg-green-100 dark:bg-green-800 w-10 h-10 rounded-full flex items-center justify-center mr-4">
                          <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Community</h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">
                        We build strong relationships with local communities and support the areas we serve.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'team' && (
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Our Team</h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    Meet the passionate individuals behind Fuel Friendly who are working to revolutionize pump side service and convenience.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                    {teamMembers.map((member, index) => (
                      <motion.div
                        key={member.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 * index }}
                        className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                      >
                        <div className="h-48 overflow-hidden">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold text-lg text-gray-800 dark:text-white">{member.name}</h3>
                          <p className="text-green-600 dark:text-green-400 text-sm mb-2">{member.role}</p>
                          <p className="text-gray-600 dark:text-gray-300 text-sm">{member.bio}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Get In Touch</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Have questions about our services or interested in partnering with us? We'd love to hear from you!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl text-center"
              >
                <div className="bg-green-100 dark:bg-green-800 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Call Us</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Our support team is available 24/7
                </p>
                <Button
                  variant="outline"
                  className="border-green-500 text-green-600 hover:bg-green-50 dark:border-green-500 dark:text-green-400"
                  onClick={() => {
                    toast({
                      title: "Phone Contact",
                      description: "Calling support at +1 (555) 123-4567",
                      duration: 3000,
                    });
                  }}
                >
                  +1 (555) 123-4567
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl text-center"
              >
                <div className="bg-green-100 dark:bg-green-800 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Email Us</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Send us an email and we'll respond within 24 hours
                </p>
                <Button
                  variant="outline"
                  className="border-green-500 text-green-600 hover:bg-green-50 dark:border-green-500 dark:text-green-400"
                  onClick={() => {
                    toast({
                      title: "Email Contact",
                      description: "Opening email to support@fuelfriendly.com",
                      duration: 3000,
                    });
                  }}
                >
                  support@fuelfriendly.com
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl text-center"
              >
                <div className="bg-green-100 dark:bg-green-800 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Visit Us</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Come visit our headquarters
                </p>
                <Button
                  variant="outline"
                  className="border-green-500 text-green-600 hover:bg-green-50 dark:border-green-500 dark:text-green-400"
                  onClick={() => {
                    toast({
                      title: "Office Location",
                      description: "Opening maps to 123 Fuel St, San Francisco, CA",
                      duration: 3000,
                    });
                  }}
                >
                  123 Fuel St, San Francisco, CA
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-50 dark:bg-green-900/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
              Join the Pump-Side Service Community
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Whether you're a fuel center owner looking to expand your reach or a customer seeking convenience, we're here to serve you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                onClick={() => navigate('/station-registration')}
                className="bg-green-600 hover:bg-green-700 text-white rounded-full px-8"
              >
                Register Your Station
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/nearby-stations')}
                className="border-green-600 text-green-600 hover:bg-green-50 dark:border-green-500 dark:text-green-500 dark:hover:bg-green-900/50 rounded-full px-8"
              >
                Find Nearby Fuel Centers
                <MapPin className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
>>>>>>> fc50f12d78601307538b9c65c6925970812ed209
    </div>
  );
};

export default AboutUs;
