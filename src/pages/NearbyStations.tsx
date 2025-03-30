
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { useToast } from "@/hooks/use-toast";

interface FuelStation {
  id: number;
  name: string;
  distance: number;
  rating: number;
  image: string;
}

const NearbyStations = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [stations, setStations] = useState<FuelStation[]>([]);
  
  // Simulating data loading for fuel stations
  useEffect(() => {
    const loadStations = setTimeout(() => {
      setIsLoading(false);
      
      // Generate mock data for fuel stations
      const mockStations: FuelStation[] = [];
      
      for (let i = 1; i <= 12; i++) {
        mockStations.push({
          id: i,
          name: "Shell Gas Station",
          distance: parseFloat((2.5 + Math.random() * 0.5).toFixed(1)),
          rating: 4.8,
          image: `/lovable-uploads/dfec04ad-bf5c-435a-8d25-46dde4060a5d.png`
        });
      }
      
      setStations(mockStations);
      
      toast({
        title: "Stations Loaded",
        description: "Displaying fuel stations near Memphis area",
        duration: 3000,
      });
    }, 1500);
    
    return () => clearTimeout(loadStations);
  }, [toast]);
  
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
      transition: { type: "spring", stiffness: 100 }
    },
    hover: { 
      y: -5,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
      transition: { type: "spring", stiffness: 400 }
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <main className="flex-1 bg-gray-50">
        <div className="container px-4 md:px-6 py-8 md:py-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Find Fuel Stations Nearby</h1>
            <p className="text-gray-600">Discover top-rated fuel stations near you and place your order with ease.</p>
          </motion.div>
          
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <motion.div 
                className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              />
            </div>
          ) : (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {stations.map((station) => (
                <motion.div
                  key={station.id}
                  variants={itemVariants}
                  whileHover="hover"
                  className="bg-white rounded-lg overflow-hidden border border-gray-200"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={station.image} 
                      alt={station.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="text-lg font-semibold mb-1">{station.name}</h2>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <MapPin size={16} className="text-red-500 mr-1" />
                      <span>{station.distance} Miles Away</span>
                      <div className="flex items-center ml-auto">
                        <span className="mr-1">{station.rating}</span>
                        <Star size={16} className="text-yellow-400 fill-current" />
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Reliable and top-rated fuel stations near you. Get the best service, competitive prices, and quick refueling options—all in one place!
                    </p>
                    <Button 
                      className="w-full bg-green-500 hover:bg-green-600 text-white"
                      onClick={() => {
                        toast({
                          title: "Order Initiated",
                          description: `Connecting to ${station.name}...`,
                          duration: 3000,
                        });
                      }}
                    >
                      Download App and Order Now
                    </Button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="flex justify-center mt-8"
          >
            <Button 
              variant="outline" 
              className="border-green-500 text-green-500 hover:bg-green-50"
            >
              See More Stations
            </Button>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NearbyStations;
