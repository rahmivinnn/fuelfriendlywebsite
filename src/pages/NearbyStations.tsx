import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Search, ArrowLeft, Star, Navigation, Check, Clock, Droplet, Filter, SortDesc, X } from 'lucide-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const stationImages = [
  "/lovable-uploads/dfec04ad-bf5c-435a-8d25-46dde4060a5d.png",
  "/lovable-uploads/e35685e0-0ac9-43c5-be6c-0efbf749e4be.png",
  "/lovable-uploads/f1f34c25-67df-4603-8eb1-3f1fe84812a4.png",
  "/lovable-uploads/aeb19cdc-0a68-4220-b059-c82442722879.png",
  "/lovable-uploads/e962c9af-b6e3-4257-a75e-a6cf7e9a96f4.png",
];

interface FuelStation {
  id: number;
  name: string;
  address: string;
  distance: string;
  rating: number;
  petrolPrice: string;
  dieselPrice: string;
  premiumPrice: string;
  hours: string;
  hasEV: boolean;
  hasRestaurant: boolean;
  hasConvenienceStore: boolean;
  image: string;
  brand: 'Shell' | 'BP' | 'Chevron' | 'Exxon' | 'Texaco';
}

const mockStations: FuelStation[] = Array.from({ length: 15 }, (_, i) => {
  const randomImageIndex = Math.floor(Math.random() * stationImages.length);
  const brands = ['Shell', 'BP', 'Chevron', 'Exxon', 'Texaco'] as const;
  const randomBrand = brands[Math.floor(Math.random() * brands.length)];
  
  return {
    id: i + 1,
    name: `${randomBrand} Fuel Station`,
    address: `${Math.floor(Math.random() * 2000) + 100} Main St, Memphis, TN ${Math.floor(Math.random() * 9000) + 37000}`,
    distance: `${(Math.random() * 5 + 0.1).toFixed(1)} miles`,
    rating: Math.floor(Math.random() * 5) + 3,
    petrolPrice: `$${(Math.random() * 0.5 + 1.2).toFixed(2)}`,
    dieselPrice: `$${(Math.random() * 0.5 + 1.4).toFixed(2)}`,
    premiumPrice: `$${(Math.random() * 0.5 + 1.7).toFixed(2)}`,
    hours: Math.random() > 0.3 ? '24 Hours' : '6:00 AM - 11:00 PM',
    hasEV: Math.random() > 0.5,
    hasRestaurant: Math.random() > 0.7,
    hasConvenienceStore: Math.random() > 0.2,
    image: stationImages[randomImageIndex],
    brand: randomBrand,
  };
});

const NearbyStations = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [stations, setStations] = useState<FuelStation[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStation, setSelectedStation] = useState<FuelStation | null>(null);
  const [locationAccess, setLocationAccess] = useState(false);
  const [sortBy, setSortBy] = useState<'distance' | 'price' | 'rating'>('distance');
  const [filters, setFilters] = useState({
    openNow: false,
    hasEV: false,
    hasRestaurant: false,
    hasConvenienceStore: false,
    maxDistance: 5,
    brands: {
      Shell: false,
      BP: false,
      Chevron: false,
      Exxon: false,
      Texaco: false
    }
  });

  useEffect(() => {
    const loadStations = setTimeout(() => {
      setIsLoading(false);
      setStations(mockStations);
      
      toast({
        title: "Nearby Stations Loaded",
        description: "Found 15 fuel stations in Memphis area",
        duration: 3000,
      });
      
      setTimeout(() => {
        setLocationAccess(true);
        toast({
          title: "Location Access Granted",
          description: "Showing fuel stations near your current location",
          duration: 3000,
        });
      }, 2000);
    }, 1500);
    
    return () => clearTimeout(loadStations);
  }, [toast]);

  const filteredStations = stations
    .filter(station => {
      if (searchQuery && !station.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !station.address.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      if (filters.openNow && station.hours !== '24 Hours') return false;
      if (filters.hasEV && !station.hasEV) return false;
      if (filters.hasRestaurant && !station.hasRestaurant) return false;
      if (filters.hasConvenienceStore && !station.hasConvenienceStore) return false;
      
      const anyBrandSelected = Object.values(filters.brands).some(value => value);
      if (anyBrandSelected && !filters.brands[station.brand]) return false;
      
      const distance = parseFloat(station.distance.split(' ')[0]);
      if (distance > filters.maxDistance) return false;
      
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'distance') {
        return parseFloat(a.distance.split(' ')[0]) - parseFloat(b.distance.split(' ')[0]);
      } else if (sortBy === 'price') {
        return parseFloat(a.petrolPrice.substring(1)) - parseFloat(b.petrolPrice.substring(1));
      } else {
        return b.rating - a.rating;
      }
    });

  const handleRequestDirections = (station: FuelStation) => {
    toast({
      title: "Directions Requested",
      description: `Navigating to ${station.name}`,
      duration: 3000,
    });
  };

  const handleClearFilters = () => {
    setFilters({
      openNow: false,
      hasEV: false,
      hasRestaurant: false,
      hasConvenienceStore: false,
      maxDistance: 5,
      brands: {
        Shell: false,
        BP: false,
        Chevron: false,
        Exxon: false,
        Texaco: false
      }
    });
    setSearchQuery('');
  };

  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Button 
                variant="ghost" 
                className="hover:bg-gray-100 mr-2 p-2 h-auto"
                onClick={() => window.history.back()}
              >
                <ArrowLeft size={20} />
              </Button>
              <h1 className="text-2xl md:text-3xl font-bold">Nearby Fuel Stations</h1>
            </div>
            <p className="text-gray-500">Find the best fuel stations around Memphis</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-80">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-4">
                <div className="p-4">
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Search by name or address..."
                      className="pl-10 w-full"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  </div>
                </div>
                
                <div className="border-t border-gray-200 p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium">Sort By</h3>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 text-xs"
                      onClick={() => setShowFilters(!showFilters)}
                    >
                      {showFilters ? 'Hide Filters' : 'Show Filters'}
                    </Button>
                  </div>
                  
                  <div className="flex space-x-2 mb-3">
                    <Button 
                      variant={sortBy === 'distance' ? 'default' : 'outline'}
                      size="sm"
                      className={sortBy === 'distance' ? 'bg-green-500 hover:bg-green-600' : ''}
                      onClick={() => setSortBy('distance')}
                    >
                      Distance
                    </Button>
                    <Button 
                      variant={sortBy === 'price' ? 'default' : 'outline'}
                      size="sm"
                      className={sortBy === 'price' ? 'bg-green-500 hover:bg-green-600' : ''}
                      onClick={() => setSortBy('price')}
                    >
                      Price
                    </Button>
                    <Button 
                      variant={sortBy === 'rating' ? 'default' : 'outline'}
                      size="sm"
                      className={sortBy === 'rating' ? 'bg-green-500 hover:bg-green-600' : ''}
                      onClick={() => setSortBy('rating')}
                    >
                      Rating
                    </Button>
                  </div>
                  
                  <AnimatePresence>
                    {showFilters && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-3 border-t border-gray-200">
                          <h3 className="font-medium mb-3 flex items-center">
                            <Filter size={16} className="mr-2" />
                            Filters
                          </h3>
                          
                          <div className="space-y-3">
                            <div className="flex items-center">
                              <input 
                                type="checkbox" 
                                id="openNow" 
                                className="h-4 w-4 rounded border-gray-300 text-green-500 focus:ring-green-500"
                                checked={filters.openNow}
                                onChange={(e) => setFilters({...filters, openNow: e.target.checked})}
                              />
                              <label htmlFor="openNow" className="ml-2 text-sm text-gray-700">Open Now</label>
                            </div>
                            
                            <div className="flex items-center">
                              <input 
                                type="checkbox" 
                                id="hasEV" 
                                className="h-4 w-4 rounded border-gray-300 text-green-500 focus:ring-green-500"
                                checked={filters.hasEV}
                                onChange={(e) => setFilters({...filters, hasEV: e.target.checked})}
                              />
                              <label htmlFor="hasEV" className="ml-2 text-sm text-gray-700">Has EV Charging</label>
                            </div>
                            
                            <div className="flex items-center">
                              <input 
                                type="checkbox" 
                                id="hasRestaurant" 
                                className="h-4 w-4 rounded border-gray-300 text-green-500 focus:ring-green-500"
                                checked={filters.hasRestaurant}
                                onChange={(e) => setFilters({...filters, hasRestaurant: e.target.checked})}
                              />
                              <label htmlFor="hasRestaurant" className="ml-2 text-sm text-gray-700">Has Restaurant</label>
                            </div>
                            
                            <div className="flex items-center">
                              <input 
                                type="checkbox" 
                                id="hasConvenienceStore" 
                                className="h-4 w-4 rounded border-gray-300 text-green-500 focus:ring-green-500"
                                checked={filters.hasConvenienceStore}
                                onChange={(e) => setFilters({...filters, hasConvenienceStore: e.target.checked})}
                              />
                              <label htmlFor="hasConvenienceStore" className="ml-2 text-sm text-gray-700">Has Convenience Store</label>
                            </div>
                            
                            <div>
                              <label htmlFor="maxDistance" className="block text-sm text-gray-700 mb-1">Max Distance: {filters.maxDistance} miles</label>
                              <input 
                                type="range" 
                                id="maxDistance" 
                                min="1" 
                                max="20" 
                                step="1"
                                value={filters.maxDistance}
                                onChange={(e) => setFilters({...filters, maxDistance: parseInt(e.target.value)})}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                              />
                            </div>
                            
                            <div>
                              <h4 className="text-sm font-medium mb-2">Brands</h4>
                              <div className="space-y-2">
                                {Object.keys(filters.brands).map((brand) => (
                                  <div key={brand} className="flex items-center">
                                    <input 
                                      type="checkbox" 
                                      id={`brand-${brand}`} 
                                      className="h-4 w-4 rounded border-gray-300 text-green-500 focus:ring-green-500"
                                      checked={filters.brands[brand as keyof typeof filters.brands]}
                                      onChange={(e) => setFilters({
                                        ...filters, 
                                        brands: {...filters.brands, [brand]: e.target.checked}
                                      })}
                                    />
                                    <label htmlFor={`brand-${brand}`} className="ml-2 text-sm text-gray-700">{brand}</label>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="w-full"
                              onClick={handleClearFilters}
                            >
                              <X size={16} className="mr-2" />
                              Clear All Filters
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4 md:mb-0">
                <h3 className="font-medium mb-3">Current Location</h3>
                
                {locationAccess ? (
                  <div className="flex items-center text-sm text-gray-700">
                    <MapPin size={16} className="text-green-500 mr-2" />
                    <span>Memphis, Tennessee, USA</span>
                  </div>
                ) : (
                  <Button 
                    className="w-full bg-green-500 hover:bg-green-600"
                    onClick={() => {
                      setLocationAccess(true);
                      toast({
                        title: "Location Access Granted",
                        description: "Showing fuel stations near your current location",
                        duration: 3000,
                      });
                    }}
                  >
                    <MapPin size={16} className="mr-2" />
                    Allow Location Access
                  </Button>
                )}
                
                {locationAccess && (
                  <div className="mt-3 bg-gray-50 p-3 rounded-md text-xs text-gray-500">
                    Showing results within {filters.maxDistance} miles of your location
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex-1">
              {isLoading ? (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                  <div className="flex justify-center">
                    <motion.div 
                      className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    />
                  </div>
                  <p className="text-center mt-4 text-gray-500">Locating nearby fuel stations...</p>
                </div>
              ) : (
                <AnimatePresence mode="wait">
                  {selectedStation ? (
                    <motion.div
                      key="station-details"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                    >
                      <div className="relative h-48 bg-gray-200">
                        <img 
                          src={selectedStation.image} 
                          alt={selectedStation.name}
                          className="w-full h-full object-cover"
                        />
                        <Button 
                          variant="ghost" 
                          className="absolute top-4 left-4 bg-white/80 hover:bg-white rounded-full p-2 h-auto w-auto"
                          onClick={() => setSelectedStation(null)}
                        >
                          <ArrowLeft size={20} />
                        </Button>
                      </div>
                      
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h2 className="text-xl font-bold">{selectedStation.name}</h2>
                            <p className="text-gray-500">{selectedStation.address}</p>
                            
                            <div className="flex items-center mt-2">
                              <div className="flex">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star 
                                    key={i} 
                                    size={16} 
                                    className={i < selectedStation.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
                                  />
                                ))}
                              </div>
                              <span className="ml-2 text-sm text-gray-500">{selectedStation.rating.toFixed(1)}</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-col items-end">
                            <span className="text-sm text-gray-500">{selectedStation.distance} away</span>
                            <span className="text-sm text-gray-500">{selectedStation.hours}</span>
                          </div>
                        </div>
                        
                        <div className="mb-6">
                          <h3 className="font-medium mb-3">Fuel Prices</h3>
                          <div className="grid grid-cols-3 gap-3">
                            <div className="bg-gray-50 p-3 rounded-md">
                              <p className="text-xs text-gray-500">Regular</p>
                              <p className="text-lg font-bold">{selectedStation.petrolPrice}</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-md">
                              <p className="text-xs text-gray-500">Premium</p>
                              <p className="text-lg font-bold">{selectedStation.premiumPrice}</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-md">
                              <p className="text-xs text-gray-500">Diesel</p>
                              <p className="text-lg font-bold">{selectedStation.dieselPrice}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mb-6">
                          <h3 className="font-medium mb-3">Station Amenities</h3>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex items-center text-sm">
                              <Clock size={16} className="mr-2 text-gray-500" />
                              <span>{selectedStation.hours}</span>
                            </div>
                            {selectedStation.hasConvenienceStore && (
                              <div className="flex items-center text-sm">
                                <Check size={16} className="mr-2 text-green-500" />
                                <span>Convenience Store</span>
                              </div>
                            )}
                            {selectedStation.hasEV && (
                              <div className="flex items-center text-sm">
                                <Check size={16} className="mr-2 text-green-500" />
                                <span>EV Charging</span>
                              </div>
                            )}
                            {selectedStation.hasRestaurant && (
                              <div className="flex items-center text-sm">
                                <Check size={16} className="mr-2 text-green-500" />
                                <span>Restaurant</span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex space-x-3">
                          <Button 
                            className="flex-1 bg-green-500 hover:bg-green-600"
                            onClick={() => handleRequestDirections(selectedStation)}
                          >
                            <Navigation size={18} className="mr-2" />
                            Get Directions
                          </Button>
                          <Button variant="outline" className="flex-1">
                            <Droplet size={18} className="mr-2" />
                            Pay for Fuel
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="station-list"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      {filteredStations.length === 0 ? (
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                          <Search size={40} className="mx-auto text-gray-300 mb-3" />
                          <h3 className="text-lg font-medium mb-2">No Results Found</h3>
                          <p className="text-gray-500 mb-4">Try adjusting your filters or search query</p>
                          <Button 
                            variant="outline"
                            onClick={handleClearFilters}
                          >
                            Clear All Filters
                          </Button>
                        </div>
                      ) : (
                        filteredStations.map((station, index) => (
                          <motion.div
                            key={station.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                            onClick={() => setSelectedStation(station)}
                          >
                            <div className="flex flex-col md:flex-row">
                              <div className="w-full md:w-40 h-32 md:h-auto bg-gray-200">
                                <img 
                                  src={station.image} 
                                  alt={station.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              
                              <div className="flex-1 p-4">
                                <div className="flex justify-between">
                                  <div>
                                    <h3 className="font-bold">{station.name}</h3>
                                    <p className="text-sm text-gray-500">{station.address}</p>
                                    
                                    <div className="flex items-center mt-1">
                                      <div className="flex">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                          <Star 
                                            key={i} 
                                            size={14} 
                                            className={i < station.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
                                          />
                                        ))}
                                      </div>
                                      <span className="ml-2 text-xs text-gray-500">{station.rating.toFixed(1)}</span>
                                    </div>
                                  </div>
                                  
                                  <div className="text-right">
                                    <span className="text-xs text-gray-500">{station.distance} away</span>
                                    <div className="mt-1 flex items-center text-xs">
                                      <Clock size={12} className="mr-1 text-gray-400" />
                                      <span className="text-gray-500">{station.hours}</span>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="flex mt-3 justify-between items-end">
                                  <div className="flex space-x-3">
                                    <div>
                                      <p className="text-xs text-gray-500">Regular</p>
                                      <p className="font-bold">{station.petrolPrice}</p>
                                    </div>
                                    <div>
                                      <p className="text-xs text-gray-500">Diesel</p>
                                      <p className="font-bold">{station.dieselPrice}</p>
                                    </div>
                                  </div>
                                  
                                  <div className="flex space-x-2">
                                    {station.hasEV && (
                                      <div className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-xs">
                                        EV
                                      </div>
                                    )}
                                    {station.hasRestaurant && (
                                      <div className="bg-orange-50 text-orange-600 px-2 py-1 rounded-full text-xs">
                                        Food
                                      </div>
                                    )}
                                    {station.hasConvenienceStore && (
                                      <div className="bg-green-50 text-green-600 px-2 py-1 rounded-full text-xs">
                                        Store
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NearbyStations;
