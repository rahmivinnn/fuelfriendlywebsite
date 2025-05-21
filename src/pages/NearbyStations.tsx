import React from 'react';
import { Helmet } from 'react-helmet-async';
import NearbyStationsComponent from '@/components/organisms/NearbyStations';
import { motion } from 'framer-motion';

const NearbyStations: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Find Nearby Fuel Stations | Fuel Friendly</title>
        <meta name="description" content="Discover fuel stations near you with real-time prices, wait times, and amenities. Search by location to find the best gas stations in your area." />
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16 pb-12"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Find Nearby Fuel Stations
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Search for fuel stations across 195 countries worldwide. Get real-time information on prices, services, and more.
            </p>
          </div>
          
          <NearbyStationsComponent />
          
          <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">About Our Fuel Station Finder</h2>
            <p className="mb-4">
              Our fuel station finder uses Google Maps data to provide you with accurate and up-to-date information about fuel stations worldwide. 
              You can search for stations in any of the 195 countries we support, and filter by city to find exactly what you need.
            </p>
            <p className="mb-4">
              Each station listing includes:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Current fuel prices</li>
              <li>Opening hours</li>
              <li>Available services (car wash, convenience store, etc.)</li>
              <li>User ratings</li>
              <li>Distance from your selected location</li>
            </ul>
            <p>
              Use the map view to see stations on an interactive map, or the list view for a detailed comparison of options.
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default NearbyStations;
