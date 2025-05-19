
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  Check, X, Apple, ArrowRight, Fuel,
  TrendingUp, TrendingDown, Clock, MapPin,
  DollarSign, Droplet, Truck, AlertTriangle,
  Maximize2, BarChart3, Bell
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
    servicesInProgress: 347,
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

  // Real-time data updates disabled
  useEffect(() => {
    // Static data is used instead of real-time updates
  }, []);

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
                The ultimate solution for modern fuel needs. Find and order fuel, Schedule Pump-Side service, and pay with ease - all from one convenient app.
              </p>
            </div>

            {/* Live fuel prices */}
            <motion.div
              className="grid grid-cols-3 gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              onClick={handleLiveDataClick}
            >
              <div className="text-center">
                <div className="text-sm text-gray-500 mb-1">Regular</div>
                <motion.div
                  className="text-2xl font-bold text-green-600"
                  key={fuelPrices.regular}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  ${fuelPrices.regular.toFixed(2)}
                </motion.div>
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
                <motion.div
                  className="text-2xl font-bold text-green-600"
                  key={fuelPrices.premium}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  ${fuelPrices.premium.toFixed(2)}
                </motion.div>
                <div className="text-xs text-amber-500 flex items-center justify-center">
                  <TrendingUp size={12} className="mr-1" />
                  <span>+0.5%</span>
                </div>
              </div>

              <div className="text-center">
                <div className="text-sm text-gray-500 mb-1">Diesel</div>
                <motion.div
                  className="text-2xl font-bold text-green-600"
                  key={fuelPrices.diesel}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  ${fuelPrices.diesel.toFixed(2)}
                </motion.div>
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
                <div className="text-xs text-blue-500 mt-1">Click for more details</div>
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
                  className="bg-black hover:bg-gray-800 text-white w-full sm:w-auto flex items-center"
                  onClick={handleAppDownloadClick}
                >
                  <Apple size={16} className="mr-2" />
                  <span>Download App</span>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  className="border-blue-200 text-blue-700 hover:bg-blue-50 hover:scale-105 hover:shadow-md transition-all duration-300 w-full sm:w-auto relative overflow-hidden group"
                  onClick={handleLiveDataClick}
                >
                  <span className="absolute inset-0 w-0 bg-blue-50 transition-all duration-300 group-hover:w-full"></span>
                  <span className="relative flex items-center">
                    <motion.span
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="mr-2 h-2 w-2 bg-blue-500 rounded-full inline-block"
                    />
                    Live Data
                    <motion.span
                      className="ml-1 text-xs text-blue-500"
                      animate={{ x: [0, 3, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      →
                    </motion.span>
                  </span>
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
                  className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg p-2 sm:p-3 text-white cursor-pointer overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={handleLiveDataClick}
                >
                  <div className="text-xs uppercase tracking-wider mb-2 flex items-center justify-between">
                    <div className="flex items-center">
                      <motion.div
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="w-2 h-2 bg-green-500 rounded-full mr-2"
                      />
                      Live Platform Statistics
                    </div>
                    <motion.div
                      whileHover={{ rotate: 180 }}
                      transition={{ duration: 0.3 }}
                      className="text-xs text-green-400"
                    >
                      <Maximize2 size={14} />
                    </motion.div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-3 text-center">
                    <motion.div
                      whileHover={{ y: -2 }}
                      className="bg-black/30 p-1.5 sm:p-2 rounded-lg overflow-hidden"
                    >
                      <motion.div
                        key={liveStats.activeUsers}
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        className="text-sm sm:text-base font-bold truncate w-full"
                      >
                        {(liveStats.activeUsers / 1000).toFixed(1)}k
                      </motion.div>
                      <div className="text-xs text-gray-300">Active Users</div>
                    </motion.div>
                    <motion.div
                      whileHover={{ y: -2 }}
                      className="bg-black/30 p-1.5 sm:p-2 rounded-lg overflow-hidden"
                    >
                      <motion.div
                        key={liveStats.servicesInProgress}
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        className="text-sm sm:text-base font-bold truncate w-full"
                      >
                        {liveStats.servicesInProgress}
                      </motion.div>
                      <div className="text-xs text-gray-300">Services</div>
                    </motion.div>
                    <motion.div
                      whileHover={{ y: -2 }}
                      className="bg-black/30 p-1.5 sm:p-2 rounded-lg overflow-hidden"
                    >
                      <motion.div
                        key={liveStats.stationsOnline}
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        className="text-sm sm:text-base font-bold truncate w-full"
                      >
                        {liveStats.stationsOnline.toLocaleString()}
                      </motion.div>
                      <div className="text-xs text-gray-300">Stations</div>
                    </motion.div>
                    <motion.div
                      whileHover={{ y: -2 }}
                      className="bg-black/30 p-1.5 sm:p-2 rounded-lg overflow-hidden"
                    >
                      <motion.div
                        key={liveStats.totalSavings}
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        className="text-sm sm:text-base font-bold truncate w-full"
                      >
                        ${Math.floor(liveStats.totalSavings/1000)}k
                      </motion.div>
                      <div className="text-xs text-gray-300">Saved</div>
                    </motion.div>
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
              Choose your platform to download the FuelFriendly app and start enjoying convenient pump side services.
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            className="bg-white p-4 sm:p-6 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center mb-4 sticky top-0 bg-white pt-2 pb-3 border-b">
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
                className="hover:bg-red-50 hover:text-red-500 transition-colors"
              >
                <X size={20} />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Fuel Prices */}
              <motion.div
                className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-all duration-300"
                whileHover={{ y: -2 }}
              >
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <Fuel className="mr-2 h-5 w-5 text-green-600" />
                  Current Fuel Prices
                </h3>

                <div className="space-y-3">
                  <motion.div
                    className="flex justify-between items-center p-2 bg-white rounded-lg hover:bg-green-50 transition-colors cursor-pointer"
                    whileHover={{ x: 3 }}
                    onClick={() => {
                      toast({
                        title: "Regular Unleaded",
                        description: `Current price: $${fuelPrices.regular.toFixed(2)}/gal`,
                        duration: 2000,
                      });
                    }}
                  >
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                      <span>Regular Unleaded</span>
                    </div>
                    <motion.div
                      className="font-bold"
                      key={fuelPrices.regular}
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                    >
                      ${fuelPrices.regular.toFixed(2)}/gal
                    </motion.div>
                  </motion.div>

                  <motion.div
                    className="flex justify-between items-center p-2 bg-white rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
                    whileHover={{ x: 3 }}
                    onClick={() => {
                      toast({
                        title: "Premium Unleaded",
                        description: `Current price: $${fuelPrices.premium.toFixed(2)}/gal`,
                        duration: 2000,
                      });
                    }}
                  >
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                      <span>Premium Unleaded</span>
                    </div>
                    <motion.div
                      className="font-bold"
                      key={fuelPrices.premium}
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                    >
                      ${fuelPrices.premium.toFixed(2)}/gal
                    </motion.div>
                  </motion.div>

                  <motion.div
                    className="flex justify-between items-center p-2 bg-white rounded-lg hover:bg-yellow-50 transition-colors cursor-pointer"
                    whileHover={{ x: 3 }}
                    onClick={() => {
                      toast({
                        title: "Diesel",
                        description: `Current price: $${fuelPrices.diesel.toFixed(2)}/gal`,
                        duration: 2000,
                      });
                    }}
                  >
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                      <span>Diesel</span>
                    </div>
                    <motion.div
                      className="font-bold"
                      key={fuelPrices.diesel}
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                    >
                      ${fuelPrices.diesel.toFixed(2)}/gal
                    </motion.div>
                  </motion.div>
                </div>

                <div className="mt-4 text-xs text-gray-500 flex items-center justify-end">
                  <Clock size={12} className="mr-1" />
                  <span>Updated: {fuelPrices.lastUpdated}</span>
                </div>
              </motion.div>

              {/* Platform Stats */}
              <motion.div
                className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-all duration-300"
                whileHover={{ y: -2 }}
              >
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5 text-blue-600" />
                  Platform Statistics
                </h3>

                <div className="grid grid-cols-2 gap-3">
                  <motion.div
                    className="bg-white p-3 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors"
                    whileHover={{ y: -2 }}
                    onClick={() => {
                      toast({
                        title: "Active Users",
                        description: `${liveStats.activeUsers.toLocaleString()} users currently online`,
                        duration: 2000,
                      });
                    }}
                  >
                    <div className="text-sm text-gray-500">Active Users</div>
                    <motion.div
                      className="text-xl sm:text-2xl font-bold text-blue-600 truncate min-w-0 overflow-hidden"
                      key={liveStats.activeUsers}
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                    >
                      {liveStats.activeUsers.toLocaleString()}
                    </motion.div>
                  </motion.div>

                  <motion.div
                    className="bg-white p-3 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors"
                    whileHover={{ y: -2 }}
                    onClick={() => {
                      toast({
                        title: "Services in Progress",
                        description: `${liveStats.servicesInProgress} services currently in progress`,
                        duration: 2000,
                      });
                    }}
                  >
                    <div className="text-sm text-gray-500">Services</div>
                    <motion.div
                      className="text-xl sm:text-2xl font-bold text-blue-600 truncate min-w-0 overflow-hidden"
                      key={liveStats.servicesInProgress}
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                    >
                      {liveStats.servicesInProgress}
                    </motion.div>
                  </motion.div>

                  <motion.div
                    className="bg-white p-3 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors"
                    whileHover={{ y: -2 }}
                    onClick={() => {
                      toast({
                        title: "Stations Online",
                        description: `${liveStats.stationsOnline.toLocaleString()} stations currently online`,
                        duration: 2000,
                      });
                    }}
                  >
                    <div className="text-sm text-gray-500">Stations Online</div>
                    <motion.div
                      className="text-xl sm:text-2xl font-bold text-blue-600 truncate min-w-0 overflow-hidden"
                      key={liveStats.stationsOnline}
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                    >
                      {liveStats.stationsOnline.toLocaleString()}
                    </motion.div>
                  </motion.div>

                  <motion.div
                    className="bg-white p-3 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors"
                    whileHover={{ y: -2 }}
                    onClick={() => {
                      toast({
                        title: "Total Savings",
                        description: `Users have saved $${(liveStats.totalSavings/1000).toFixed(1)}k in total`,
                        duration: 2000,
                      });
                    }}
                  >
                    <div className="text-sm text-gray-500">Total Savings</div>
                    <motion.div
                      className="text-xl sm:text-2xl font-bold text-blue-600 truncate min-w-0 overflow-hidden"
                      key={liveStats.totalSavings}
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                    >
                      ${(liveStats.totalSavings/1000).toFixed(1)}k
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Recent Alerts */}
              <motion.div
                className="bg-gray-50 rounded-lg p-4 md:col-span-2 hover:shadow-md transition-all duration-300"
                whileHover={{ y: -2 }}
              >
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
                      whileHover={{ x: 3, backgroundColor: "#f9fafb" }}
                      className="flex items-center bg-white p-3 rounded-lg cursor-pointer"
                      onClick={() => {
                        toast({
                          title: alert.message,
                          description: `Location: ${alert.location} • Time: ${alert.time}`,
                          duration: 2000,
                        });
                      }}
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
              </motion.div>
            </div>

            <div className="mt-6 flex justify-end sticky bottom-0 bg-white pt-3 border-t">
              <Button
                onClick={() => setShowLiveDataModal(false)}
                className="bg-green-500 hover:bg-green-600 text-white"
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
