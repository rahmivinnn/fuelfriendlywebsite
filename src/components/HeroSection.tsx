
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  Check, X, Apple, ArrowRight, Fuel,
  TrendingUp, TrendingDown, Clock, MapPin,
  DollarSign, Droplet, Truck, AlertTriangle
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Badge } from '@/components/ui/badge';

const HeroSection = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showAppStoreModal, setShowAppStoreModal] = useState(false);
  const [showLiveDataModal, setShowLiveDataModal] = useState(false);

  // Real-time data states
  const [fuelPrices, setFuelPrices] = useState({
    regular: 3.45,
    premium: 3.89,
    diesel: 3.67,
    lastUpdated: new Date().toLocaleTimeString()
  });

  const [liveStats, setLiveStats] = useState({
    activeUsers: 12483,
    deliveriesInProgress: 347,
    stationsOnline: 1289,
    totalSavings: 1245678
  });

  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'price_drop',
      message: 'Gas prices dropping in your area',
      location: 'Downtown',
      time: '2 min ago',
      icon: TrendingDown,
      color: 'text-green-500'
    },
    {
      id: 2,
      type: 'high_demand',
      message: 'High demand in Northeast region',
      location: 'Northeast',
      time: '5 min ago',
      icon: TrendingUp,
      color: 'text-amber-500'
    },
    {
      id: 3,
      type: 'new_station',
      message: 'New station added to network',
      location: 'Westside',
      time: '12 min ago',
      icon: MapPin,
      color: 'text-blue-500'
    }
  ]);

  // Simulate real-time data updates
  useEffect(() => {
    // Update fuel prices randomly
    const priceInterval = setInterval(() => {
      setFuelPrices(prev => {
        const randomChange = (Math.random() * 0.04) - 0.02; // Random change between -0.02 and +0.02
        const newRegular = Math.max(2.5, Math.min(4.5, prev.regular + randomChange)).toFixed(2);

        return {
          regular: parseFloat(newRegular),
          premium: parseFloat((parseFloat(newRegular) + 0.40).toFixed(2)),
          diesel: parseFloat((parseFloat(newRegular) + 0.20).toFixed(2)),
          lastUpdated: new Date().toLocaleTimeString()
        };
      });
    }, 30000); // Update every 30 seconds

    // Update live stats
    const statsInterval = setInterval(() => {
      setLiveStats(prev => ({
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 10) - 3,
        deliveriesInProgress: prev.deliveriesInProgress + Math.floor(Math.random() * 5) - 2,
        stationsOnline: prev.stationsOnline + Math.floor(Math.random() * 3) - 1,
        totalSavings: prev.totalSavings + Math.floor(Math.random() * 1000)
      }));
    }, 5000); // Update every 5 seconds

    // Add new alerts occasionally
    const alertInterval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance of new alert
        const alertTypes = [
          {
            type: 'price_drop',
            message: 'Gas prices dropping in your area',
            icon: TrendingDown,
            color: 'text-green-500'
          },
          {
            type: 'price_increase',
            message: 'Slight price increase detected',
            icon: TrendingUp,
            color: 'text-red-500'
          },
          {
            type: 'high_demand',
            message: 'High demand in your region',
            icon: AlertTriangle,
            color: 'text-amber-500'
          },
          {
            type: 'new_station',
            message: 'New station joined the network',
            icon: MapPin,
            color: 'text-blue-500'
          },
          {
            type: 'promotion',
            message: 'New discount available',
            icon: DollarSign,
            color: 'text-green-500'
          }
        ];

        const locations = ['Downtown', 'Uptown', 'Westside', 'Eastside', 'Suburbs', 'City Center', 'Highway 95'];
        const randomAlert = alertTypes[Math.floor(Math.random() * alertTypes.length)];
        const randomLocation = locations[Math.floor(Math.random() * locations.length)];

        const newAlert = {
          id: Date.now(),
          ...randomAlert,
          location: randomLocation,
          time: 'Just now'
        };

        setAlerts(prev => [newAlert, ...prev.slice(0, 9)]); // Keep only 10 most recent alerts

        // Show toast for new alert
        toast({
          title: "Real-time Update",
          description: `${newAlert.message} in ${newAlert.location}`,
          duration: 3000,
        });
      }

      // Update time on existing alerts
      setAlerts(prev => prev.map(alert => {
        if (alert.time === 'Just now') {
          return { ...alert, time: '1 min ago' };
        } else if (alert.time === '1 min ago') {
          return { ...alert, time: '2 min ago' };
        } else if (alert.time.includes('min ago')) {
          const mins = parseInt(alert.time.split(' ')[0]);
          return { ...alert, time: `${mins + 1} min ago` };
        }
        return alert;
      }));
    }, 20000); // Check every 20 seconds

    return () => {
      clearInterval(priceInterval);
      clearInterval(statsInterval);
      clearInterval(alertInterval);
    };
  }, [toast]);

  const handleRegisterClick = () => {
    // Navigate immediately without delay
    navigate('/station-registration');
  };

  const handleAppDownloadClick = () => {
    setShowAppStoreModal(true);
  };

  const handleLiveDataClick = () => {
    setShowLiveDataModal(true);
  };

  const handleDownloadApp = (platform: 'ios' | 'android') => {
    toast({
      title: `Downloading ${platform === 'ios' ? 'iOS' : 'Android'} App`,
      description: `You're being redirected to the ${platform === 'ios' ? 'App Store' : 'Google Play Store'}`,
      duration: 3000,
    });

    // Simulate app store redirect
    setTimeout(() => {
      setShowAppStoreModal(false);
      toast({
        title: "Download Started",
        description: "Thank you for downloading the FuelFriendly app!",
        duration: 3000,
      });
    }, 1000);
  };

  return (
    <section className="py-12 md:py-24 overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <motion.div
            className="flex flex-col justify-center space-y-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-2">
              <Badge className="mb-2 bg-green-100 text-green-800 hover:bg-green-200">
                <motion.span
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="mr-1"
                >
                  ●
                </motion.span>
                LIVE FUEL PRICES
              </Badge>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                The Best Way To Fuel - Anytime, Anywhere!
              </h1>
              <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                The ultimate solution for modern fuel needs. Find and order fuel, schedule deliveries, and pay with ease - all from one convenient app.
              </p>
            </div>

            {/* Live fuel prices */}
            <motion.div
              className="grid grid-cols-3 gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="text-center">
                <div className="text-sm text-gray-500 mb-1">Regular</div>
                <div className="text-2xl font-bold text-green-600">${fuelPrices.regular.toFixed(2)}</div>
                <motion.div
                  className="text-xs text-green-500 flex items-center justify-center"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                >
                  <TrendingDown size={12} className="mr-1" />
                  <span>-2.4%</span>
                </motion.div>
              </div>

              <div className="text-center">
                <div className="text-sm text-gray-500 mb-1">Premium</div>
                <div className="text-2xl font-bold text-green-600">${fuelPrices.premium.toFixed(2)}</div>
                <div className="text-xs text-amber-500 flex items-center justify-center">
                  <TrendingUp size={12} className="mr-1" />
                  <span>+0.5%</span>
                </div>
              </div>

              <div className="text-center">
                <div className="text-sm text-gray-500 mb-1">Diesel</div>
                <div className="text-2xl font-bold text-green-600">${fuelPrices.diesel.toFixed(2)}</div>
                <div className="text-xs text-green-500 flex items-center justify-center">
                  <TrendingDown size={12} className="mr-1" />
                  <span>-1.2%</span>
                </div>
              </div>

              <div className="col-span-3 mt-2 text-center">
                <div className="text-xs text-gray-400 flex items-center justify-center">
                  <Clock size={10} className="mr-1" />
                  <span>Last updated: {fuelPrices.lastUpdated}</span>
                </div>
              </div>
            </motion.div>
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-3 text-base w-full sm:w-auto shadow-md"
                  onClick={handleRegisterClick}
                >
                  Register Station
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  className="border-green-200 text-green-700 hover:bg-green-50 w-full sm:w-auto"
                  onClick={handleAppDownloadClick}
                >
                  Download App
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  className="border-blue-200 text-blue-700 hover:bg-blue-50 w-full sm:w-auto"
                  onClick={handleLiveDataClick}
                >
                  <motion.span
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="mr-2 h-2 w-2 bg-blue-500 rounded-full inline-block"
                  />
                  Live Data
                </Button>
              </motion.div>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <Check className="h-4 w-4 text-green-500" />
                <span>No Subscription</span>
              </div>
              <div className="flex items-center space-x-1">
                <Check className="h-4 w-4 text-green-500" />
                <span>24/7 Service</span>
              </div>
              <div className="flex items-center space-x-1">
                <Check className="h-4 w-4 text-green-500" />
                <span>Competitive Pricing</span>
              </div>
            </div>

            {/* Live alerts ticker */}
            <motion.div
              className="bg-gray-50 rounded-lg p-2 overflow-hidden relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-center">
                <Badge className="bg-blue-100 text-blue-800 mr-2">LIVE UPDATES</Badge>
                <div className="overflow-hidden flex-1">
                  <AnimatePresence>
                    <motion.div
                      key={alerts[0]?.id}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center text-sm"
                    >
                      <div className={`${alerts[0]?.color} mr-2`}>
                        {alerts[0]?.icon && React.createElement(alerts[0].icon, { size: 14 })}
                      </div>
                      <span className="font-medium">{alerts[0]?.message}</span>
                      <span className="mx-2 text-gray-400">•</span>
                      <span className="text-gray-500">{alerts[0]?.location}</span>
                      <span className="mx-2 text-gray-400">•</span>
                      <span className="text-gray-400 text-xs">{alerts[0]?.time}</span>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            <p className="text-xs text-gray-500">
              Downloaded by over 100,000 users
            </p>
          </motion.div>
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-blue-500/20 rounded-[32px] blur-xl opacity-30"></div>
              <motion.div
                className="relative w-[300px] h-[600px] md:w-[320px] md:h-[640px]"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 2,
                  ease: "easeInOut"
                }}
              >
                <img
                  src="/lovable-uploads/7b1b63ff-133e-4806-a870-d769ebf3fd94.png"
                  alt="FuelFriendly App Preview with Map"
                  className="object-contain w-full h-full rounded-2xl shadow-xl"
                />

                {/* Live stats overlay */}
                <motion.div
                  className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg p-3 text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <div className="text-xs uppercase tracking-wider mb-2 flex items-center">
                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="w-2 h-2 bg-green-500 rounded-full mr-2"
                    />
                    Live Platform Statistics
                  </div>
                  <div className="grid grid-cols-4 gap-3 text-center">
                    <div>
                      <motion.div
                        key={liveStats.activeUsers}
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        className="text-lg font-bold"
                      >
                        {liveStats.activeUsers.toLocaleString()}
                      </motion.div>
                      <div className="text-xs text-gray-300">Active Users</div>
                    </div>
                    <div>
                      <motion.div
                        key={liveStats.deliveriesInProgress}
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        className="text-lg font-bold"
                      >
                        {liveStats.deliveriesInProgress}
                      </motion.div>
                      <div className="text-xs text-gray-300">Deliveries</div>
                    </div>
                    <div>
                      <motion.div
                        key={liveStats.stationsOnline}
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        className="text-lg font-bold"
                      >
                        {liveStats.stationsOnline.toLocaleString()}
                      </motion.div>
                      <div className="text-xs text-gray-300">Stations</div>
                    </div>
                    <div>
                      <motion.div
                        key={liveStats.totalSavings}
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        className="text-lg font-bold"
                      >
                        ${Math.floor(liveStats.totalSavings/1000)}k
                      </motion.div>
                      <div className="text-xs text-gray-300">Saved</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="container px-4 md:px-6 mt-12">
        <motion.div
          className="grid grid-cols-3 gap-12 md:gap-24 justify-center items-center mt-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.div
            className="flex flex-col items-center space-y-2 border rounded-lg p-4 hover:shadow-lg transition-all duration-300"
            whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
          >
            <h3 className="text-lg font-medium">Shell</h3>
          </motion.div>
          <motion.div
            className="flex flex-col items-center space-y-2 border rounded-lg p-4 hover:shadow-lg transition-all duration-300"
            whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
          >
            <h3 className="text-lg font-medium">Kastrati Oil</h3>
          </motion.div>
          <motion.div
            className="flex flex-col items-center space-y-2 border rounded-lg p-4 hover:shadow-lg transition-all duration-300"
            whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
          >
            <h3 className="text-lg font-medium">BP</h3>
          </motion.div>
        </motion.div>
      </div>

      {/* App Store Modal */}
      {showAppStoreModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-md w-full mx-4"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Download FuelFriendly App</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowAppStoreModal(false)}
              >
                <X size={20} />
              </Button>
            </div>

            <p className="text-gray-600 mb-6">
              Choose your platform to download the FuelFriendly app and start enjoying convenient fuel services.
            </p>

            <div className="space-y-3">
              <Button
                className="w-full justify-between bg-black hover:bg-gray-800 text-white py-6"
                onClick={() => handleDownloadApp('ios')}
              >
                <div className="flex items-center">
                  <Apple size={24} className="mr-3" />
                  <div className="text-left">
                    <div className="text-xs">Download on the</div>
                    <div className="text-lg font-semibold">App Store</div>
                  </div>
                </div>
                <ArrowRight size={20} />
              </Button>

              <Button
                className="w-full justify-between bg-green-600 hover:bg-green-700 text-white py-6"
                onClick={() => handleDownloadApp('android')}
              >
                <div className="flex items-center">
                  <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.2439 13.8533 7.8508 12 7.8508s-3.5902.3931-5.1367 1.0989L4.841 5.4467a.4161.4161 0 00-.5677-.1521.4157.4157 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3435-4.1021-2.6892-7.5743-6.0775-9.4396"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-xs">Download on</div>
                    <div className="text-lg font-semibold">Google Play</div>
                  </div>
                </div>
                <ArrowRight size={20} />
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Live Data Modal */}
      {showLiveDataModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            className="bg-white p-6 rounded-lg max-w-3xl w-full max-h-[80vh] overflow-y-auto mx-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-3 h-3 bg-green-500 rounded-full mr-2"
                />
                <h2 className="text-xl font-bold">Live Platform Data</h2>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowLiveDataModal(false)}
              >
                <X size={20} />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Fuel Prices */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <Fuel className="mr-2 h-5 w-5 text-green-600" />
                  Current Fuel Prices
                </h3>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                      <span>Regular Unleaded</span>
                    </div>
                    <div className="font-bold">${fuelPrices.regular.toFixed(2)}/gal</div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                      <span>Premium Unleaded</span>
                    </div>
                    <div className="font-bold">${fuelPrices.premium.toFixed(2)}/gal</div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                      <span>Diesel</span>
                    </div>
                    <div className="font-bold">${fuelPrices.diesel.toFixed(2)}/gal</div>
                  </div>
                </div>

                <div className="mt-4 text-xs text-gray-500 flex items-center justify-end">
                  <Clock size={12} className="mr-1" />
                  <span>Updated: {fuelPrices.lastUpdated}</span>
                </div>
              </div>

              {/* Platform Stats */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5 text-blue-600" />
                  Platform Statistics
                </h3>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded-lg">
                    <div className="text-sm text-gray-500">Active Users</div>
                    <div className="text-2xl font-bold text-blue-600">
                      {liveStats.activeUsers.toLocaleString()}
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-lg">
                    <div className="text-sm text-gray-500">Deliveries</div>
                    <div className="text-2xl font-bold text-blue-600">
                      {liveStats.deliveriesInProgress}
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-lg">
                    <div className="text-sm text-gray-500">Stations Online</div>
                    <div className="text-2xl font-bold text-blue-600">
                      {liveStats.stationsOnline.toLocaleString()}
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-lg">
                    <div className="text-sm text-gray-500">Total Savings</div>
                    <div className="text-2xl font-bold text-blue-600">
                      ${(liveStats.totalSavings/1000).toFixed(1)}k
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Alerts */}
              <div className="bg-gray-50 rounded-lg p-4 md:col-span-2">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <Bell className="mr-2 h-5 w-5 text-amber-600" />
                  Recent Alerts
                </h3>

                <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                  {alerts.map(alert => (
                    <motion.div
                      key={alert.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center bg-white p-3 rounded-lg"
                    >
                      <div className={`${alert.color} p-2 rounded-full mr-3`}>
                        {React.createElement(alert.icon, { size: 16 })}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{alert.message}</div>
                        <div className="flex items-center text-xs text-gray-500">
                          <MapPin size={10} className="mr-1" />
                          <span>{alert.location}</span>
                          <span className="mx-2">•</span>
                          <Clock size={10} className="mr-1" />
                          <span>{alert.time}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <Button
                onClick={() => setShowLiveDataModal(false)}
              >
                Close
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
