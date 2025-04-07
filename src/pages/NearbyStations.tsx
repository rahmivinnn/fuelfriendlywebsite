
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Star, ChevronDown, Filter, Navigation, Clock, Phone, Car, Shell, TrendingUp, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Station data with consistently using the gas station image
const stations = [
  {
    id: 1,
    name: "Shell Express Station",
    address: "123 Main St, Memphis, TN",
    distance: "0.5 miles",
    rating: 4.7,
    priceRegular: 2.89,
    pricePremium: 3.29,
    priceDiesel: 3.09,
    openTime: "24/7",
    amenities: ["ATM", "Car Wash", "Convenience Store"],
    logo: "shell",
    congestion: "Low",
    waitTime: "< 5 min",
    lastUpdated: "5 min ago",
    favorites: 132,
    phoneNumber: "123-456-7890",
    image: "/lovable-uploads/58115195-2a08-4330-8ffd-e365aeca25fe.png"
  },
  {
    id: 2,
    name: "Exxon Fuel Center",
    address: "456 Oak Ave, Memphis, TN",
    distance: "1.2 miles",
    rating: 4.3,
    priceRegular: 2.92,
    pricePremium: 3.32,
    priceDiesel: 3.12,
    openTime: "6am - 11pm",
    amenities: ["Convenience Store", "Restrooms"],
    logo: "exxon",
    congestion: "Medium",
    waitTime: "5-10 min",
    lastUpdated: "12 min ago",
    favorites: 98,
    phoneNumber: "234-567-8901",
    image: "/lovable-uploads/58115195-2a08-4330-8ffd-e365aeca25fe.png"
  },
  {
    id: 3,
    name: "Chevron Gas & Go",
    address: "789 Pine Rd, Memphis, TN",
    distance: "1.8 miles",
    rating: 4.5,
    priceRegular: 2.87,
    pricePremium: 3.27,
    priceDiesel: 3.07,
    openTime: "5am - 12am",
    amenities: ["ATM", "Convenience Store", "Restrooms", "Car Wash"],
    logo: "chevron",
    congestion: "High",
    waitTime: "10-15 min",
    lastUpdated: "8 min ago",
    favorites: 115,
    phoneNumber: "345-678-9012",
    image: "/lovable-uploads/58115195-2a08-4330-8ffd-e365aeca25fe.png"
  },
  {
    id: 4,
    name: "BP Premium Station",
    address: "321 Elm St, Memphis, TN",
    distance: "2.3 miles",
    rating: 4.2,
    priceRegular: 2.85,
    pricePremium: 3.25,
    priceDiesel: 3.05,
    openTime: "24/7",
    amenities: ["Convenience Store", "Restrooms"],
    logo: "bp",
    congestion: "Low",
    waitTime: "< 5 min",
    lastUpdated: "15 min ago",
    favorites: 87,
    phoneNumber: "456-789-0123",
    image: "/lovable-uploads/58115195-2a08-4330-8ffd-e365aeca25fe.png"
  },
  {
    id: 5,
    name: "Marathon Pit Stop",
    address: "654 Maple Dr, Memphis, TN",
    distance: "3.0 miles",
    rating: 4.0,
    priceRegular: 2.83,
    pricePremium: 3.23,
    priceDiesel: 3.03,
    openTime: "6am - 10pm",
    amenities: ["ATM", "Convenience Store"],
    logo: "marathon",
    congestion: "Medium",
    waitTime: "5-10 min",
    lastUpdated: "20 min ago",
    favorites: 72,
    phoneNumber: "567-890-1234",
    image: "/lovable-uploads/58115195-2a08-4330-8ffd-e365aeca25fe.png"
  },
  {
    id: 6,
    name: "Citgo Quick Fuel",
    address: "987 Cedar Ln, Memphis, TN",
    distance: "3.5 miles",
    rating: 4.1,
    priceRegular: 2.90,
    pricePremium: 3.30,
    priceDiesel: 3.10,
    openTime: "5:30am - 11:30pm",
    amenities: ["Convenience Store", "Restrooms", "Car Wash"],
    logo: "citgo",
    congestion: "Low",
    waitTime: "< 5 min",
    lastUpdated: "18 min ago",
    favorites: 81,
    phoneNumber: "678-901-2345",
    image: "/lovable-uploads/58115195-2a08-4330-8ffd-e365aeca25fe.png"
  }
];

const NearbyStations = () => {
  const { toast } = useToast();
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("distance");
  const [filteredStations, setFilteredStations] = useState(stations);
  const [selectedStation, setSelectedStation] = useState(null);
  const [showStationDetails, setShowStationDetails] = useState(false);

  // Simulating loading
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Stations Loaded",
        description: "Nearby stations data has been updated",
        duration: 3000,
      });
    }, 1500);

    // Set up a simulated real-time update
    const interval = setInterval(() => {
      // Create a copy of the stations
      const updatedStations = [...filteredStations];
      
      // Randomly select a station to update
      const randomStationIndex = Math.floor(Math.random() * updatedStations.length);
      
      // Generate a small random price change (±0.05)
      const priceChange = (Math.random() * 0.1 - 0.05).toFixed(2);
      const oldPrice = updatedStations[randomStationIndex].priceRegular;
      const newPrice = (parseFloat(oldPrice.toString()) + parseFloat(priceChange)).toFixed(2);
      
      // Update the price
      updatedStations[randomStationIndex] = {
        ...updatedStations[randomStationIndex],
        priceRegular: parseFloat(newPrice),
        lastUpdated: "Just now"
      };
      
      // Update the state
      setFilteredStations(updatedStations);
      
      // Show a notification
      toast({
        title: "Price Update",
        description: `${updatedStations[randomStationIndex].name} updated to $${newPrice}/gallon`,
        duration: 3000,
      });
    }, 45000); // Update every 45 seconds
    
    return () => clearInterval(interval);
  }, [toast, filteredStations]);

  // Sort stations
  useEffect(() => {
    let sorted = [...stations];
    
    if (sortOption === "distance") {
      sorted.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
    } else if (sortOption === "price") {
      sorted.sort((a, b) => a.priceRegular - b.priceRegular);
    } else if (sortOption === "rating") {
      sorted.sort((a, b) => b.rating - a.rating);
    }
    
    setFilteredStations(sorted);
  }, [sortOption]);

  // Filter stations by search input
  useEffect(() => {
    if (searchInput.trim() === "") {
      setFilteredStations(stations);
    } else {
      const filtered = stations.filter(
        station => 
          station.name.toLowerCase().includes(searchInput.toLowerCase()) ||
          station.address.toLowerCase().includes(searchInput.toLowerCase())
      );
      setFilteredStations(filtered);
    }
  }, [searchInput]);

  const handleCallStation = (station) => {
    toast({
      title: "Calling Station",
      description: `Calling ${station.name} at ${station.phoneNumber}`,
      duration: 3000,
    });
  };

  const handleViewDetails = (station) => {
    setSelectedStation(station);
    setShowStationDetails(true);
    toast({
      title: "Station Details",
      description: `Viewing details for ${station.name}`,
      duration: 3000,
    });
  };

  const handleGetDirections = (station) => {
    toast({
      title: "Getting Directions",
      description: `Directions to ${station.name} at ${station.address}`,
      duration: 3000,
    });
  };

  const handleApplyFilters = () => {
    toast({
      title: "Filters Applied",
      description: "Your filters have been applied to the results",
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Changed background to white */}
      <div className="bg-white py-12 px-6 border-b border-gray-200">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-center mb-8">
              <div>
                <Link to="/" className="text-black text-lg font-bold flex items-center">
                  <img 
                    src="/lovable-uploads/f1f34c25-67df-4603-8eb1-3f1fe84812a4.png" 
                    alt="FuelFriendly" 
                    className="h-10 mr-2" 
                  />
                </Link>
              </div>
              
              <div className="flex space-x-4 text-black">
                <Link to="/" className="hover:text-green-600 transition-colors">
                  Home
                </Link>
                <Link to="/" className="hover:text-green-600 transition-colors">
                  How It Works
                </Link>
                <Link to="/" className="hover:text-green-600 transition-colors">
                  User & Fuel Friendly App
                </Link>
                <Link to="/nearby-stations" className="font-bold underline text-green-600">
                  Nearby Fuel Stations
                </Link>
                <Link to="/" className="hover:text-green-600 transition-colors">
                  Contact Us
                </Link>
              </div>
              
              <div>
                <Button asChild className="bg-green-600 text-white hover:bg-green-700">
                  <Link to="/station-dashboard">Register Station</Link>
                </Button>
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Find Nearby Fuel Stations
            </h1>
            <p className="text-gray-600 text-lg mb-6">
              Discover the best gas stations near Memphis with real-time prices, wait times, and amenities
            </p>
            
            <div className="bg-white p-2 rounded-full shadow-lg flex items-center border border-gray-200">
              <div className="flex-1 flex items-center pl-4">
                <MapPin className="text-green-500 mr-2" size={20} />
                <Input 
                  placeholder="Search for gas stations or addresses..." 
                  className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </div>
              <Button className="rounded-full bg-green-500 hover:bg-green-600">
                <Search className="mr-2" size={16} />
                Search
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          
          <div className="md:w-1/4">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-6">
              <h2 className="text-xl font-bold mb-4">Filters</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Sort By</h3>
                  <Select value={sortOption} onValueChange={setSortOption}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="distance">Distance</SelectItem>
                      <SelectItem value="price">Price (Low to High)</SelectItem>
                      <SelectItem value="rating">Rating (High to Low)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Fuel Type</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input 
                        id="regular" 
                        type="checkbox" 
                        className="rounded text-green-500 focus:ring-green-500" 
                        defaultChecked
                      />
                      <label htmlFor="regular" className="ml-2 text-sm">Regular</label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        id="premium" 
                        type="checkbox" 
                        className="rounded text-green-500 focus:ring-green-500" 
                        defaultChecked
                      />
                      <label htmlFor="premium" className="ml-2 text-sm">Premium</label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        id="diesel" 
                        type="checkbox" 
                        className="rounded text-green-500 focus:ring-green-500" 
                        defaultChecked
                      />
                      <label htmlFor="diesel" className="ml-2 text-sm">Diesel</label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Distance</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input 
                        id="dist1" 
                        type="radio" 
                        name="distance" 
                        className="text-green-500 focus:ring-green-500" 
                        defaultChecked
                      />
                      <label htmlFor="dist1" className="ml-2 text-sm">Any distance</label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        id="dist2" 
                        type="radio" 
                        name="distance" 
                        className="text-green-500 focus:ring-green-500" 
                      />
                      <label htmlFor="dist2" className="ml-2 text-sm">Within 1 mile</label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        id="dist3" 
                        type="radio" 
                        name="distance" 
                        className="text-green-500 focus:ring-green-500" 
                      />
                      <label htmlFor="dist3" className="ml-2 text-sm">Within 3 miles</label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        id="dist4" 
                        type="radio" 
                        name="distance" 
                        className="text-green-500 focus:ring-green-500" 
                      />
                      <label htmlFor="dist4" className="ml-2 text-sm">Within 5 miles</label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Amenities</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input 
                        id="amenity1" 
                        type="checkbox" 
                        className="rounded text-green-500 focus:ring-green-500" 
                      />
                      <label htmlFor="amenity1" className="ml-2 text-sm">ATM</label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        id="amenity2" 
                        type="checkbox" 
                        className="rounded text-green-500 focus:ring-green-500" 
                      />
                      <label htmlFor="amenity2" className="ml-2 text-sm">Car Wash</label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        id="amenity3" 
                        type="checkbox" 
                        className="rounded text-green-500 focus:ring-green-500" 
                      />
                      <label htmlFor="amenity3" className="ml-2 text-sm">Convenience Store</label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        id="amenity4" 
                        type="checkbox" 
                        className="rounded text-green-500 focus:ring-green-500" 
                      />
                      <label htmlFor="amenity4" className="ml-2 text-sm">Restrooms</label>
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-green-500 hover:bg-green-600"
                  onClick={handleApplyFilters}
                >
                  <Filter className="mr-2" size={16} />
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>
          
          {/* Stations */}
          <div className="md:w-3/4">
            <Tabs defaultValue="list">
              <div className="flex justify-between items-center mb-6">
                <TabsList>
                  <TabsTrigger value="list">List View</TabsTrigger>
                  <TabsTrigger value="map">Map View</TabsTrigger>
                </TabsList>
                
                <div className="text-sm text-gray-500">
                  Showing {filteredStations.length} stations within Memphis
                </div>
              </div>
              
              <TabsContent value="list" className="space-y-6">
                {loading ? (
                  <div className="flex items-center justify-center py-20">
                    <motion.div 
                      className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    />
                  </div>
                ) : (
                  filteredStations.map((station, index) => (
                    <motion.div
                      key={station.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="overflow-hidden hover:shadow-md transition-shadow">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/3 h-[200px]">
                            <img 
                              src={station.image} 
                              alt={station.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          <div className="md:w-2/3">
                            <CardHeader className="pb-2">
                              <div className="flex justify-between items-start">
                                <CardTitle className="text-xl">{station.name}</CardTitle>
                                <div className="flex items-center bg-green-50 px-2 py-1 rounded text-sm text-green-700">
                                  <Star className="fill-green-500 stroke-green-500 mr-1" size={16} />
                                  {station.rating}
                                </div>
                              </div>
                              <CardDescription className="flex items-center">
                                <MapPin className="mr-1" size={14} />
                                {station.address} • 
                                <span className="font-medium ml-1">{station.distance}</span>
                              </CardDescription>
                            </CardHeader>
                            
                            <CardContent className="pb-2">
                              <div className="grid grid-cols-3 gap-4 mb-4">
                                <div>
                                  <div className="text-xs text-gray-500">Regular</div>
                                  <div className="text-xl font-bold">${station.priceRegular.toFixed(2)}</div>
                                </div>
                                <div>
                                  <div className="text-xs text-gray-500">Premium</div>
                                  <div className="text-xl font-bold">${station.pricePremium.toFixed(2)}</div>
                                </div>
                                <div>
                                  <div className="text-xs text-gray-500">Diesel</div>
                                  <div className="text-xl font-bold">${station.priceDiesel.toFixed(2)}</div>
                                </div>
                              </div>
                              
                              <div className="flex flex-wrap gap-2 mb-4">
                                <div className="flex items-center text-xs bg-gray-100 px-2 py-1 rounded">
                                  <Clock size={12} className="mr-1" />
                                  {station.openTime}
                                </div>
                                
                                <div className={`flex items-center text-xs px-2 py-1 rounded ${
                                  station.congestion === 'Low' 
                                    ? 'bg-green-100 text-green-700' 
                                    : station.congestion === 'Medium'
                                    ? 'bg-yellow-100 text-yellow-700'
                                    : 'bg-red-100 text-red-700'
                                }`}>
                                  <Car size={12} className="mr-1" />
                                  {station.congestion} Congestion
                                </div>
                                
                                <div className={`flex items-center text-xs px-2 py-1 rounded ${
                                  station.waitTime === '< 5 min' 
                                    ? 'bg-green-100 text-green-700' 
                                    : station.waitTime === '5-10 min'
                                    ? 'bg-yellow-100 text-yellow-700'
                                    : 'bg-red-100 text-red-700'
                                }`}>
                                  <Clock size={12} className="mr-1" />
                                  Wait: {station.waitTime}
                                </div>
                                
                                {station.amenities.slice(0, 2).map(amenity => (
                                  <div key={amenity} className="flex items-center text-xs bg-gray-100 px-2 py-1 rounded">
                                    {amenity}
                                  </div>
                                ))}
                                
                                {station.amenities.length > 2 && (
                                  <div className="flex items-center text-xs bg-gray-100 px-2 py-1 rounded">
                                    +{station.amenities.length - 2} more
                                  </div>
                                )}
                              </div>
                            </CardContent>
                            
                            <CardFooter className="flex justify-between items-center pt-0">
                              <div className="text-xs text-gray-500 flex items-center">
                                <TrendingUp size={12} className="mr-1" />
                                Updated {station.lastUpdated}
                              </div>
                              
                              <div className="flex gap-2">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="text-green-600"
                                  onClick={() => handleCallStation(station)}
                                >
                                  <Phone size={14} className="mr-1" />
                                  Call
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="text-green-600"
                                  onClick={() => handleGetDirections(station)}
                                >
                                  <Navigation size={14} className="mr-1" />
                                  Directions
                                </Button>
                                <Button 
                                  size="sm" 
                                  className="bg-green-500 hover:bg-green-600"
                                  onClick={() => handleViewDetails(station)}
                                >
                                  View Details
                                </Button>
                              </div>
                            </CardFooter>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))
                )}
              </TabsContent>
              
              <TabsContent value="map">
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden h-[700px] flex items-center justify-center text-center p-6">
                  <div>
                    <div className="text-7xl mb-4">🗺️</div>
                    <h3 className="text-xl font-semibold mb-2">Map View Coming Soon</h3>
                    <p className="text-gray-500 max-w-md mx-auto">
                      We're working on a comprehensive map view for all stations. In the meantime, please use the list view to find the nearest stations.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      {/* Station Details Modal */}
      {showStationDetails && selectedStation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="relative h-64">
              <img 
                src={selectedStation.image} 
                alt={selectedStation.name}
                className="w-full h-full object-cover"
              />
              <button 
                className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md"
                onClick={() => setShowStationDetails(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                <h2 className="text-white text-2xl font-bold">{selectedStation.name}</h2>
                <p className="text-white flex items-center">
                  <MapPin size={16} className="mr-1" />
                  {selectedStation.address}
                </p>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-bold mb-2">Station Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <MapPin className="text-green-500 mt-1 mr-2" size={18} />
                      <div>
                        <div className="font-medium">Address</div>
                        <div className="text-gray-600">{selectedStation.address}</div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Phone className="text-green-500 mt-1 mr-2" size={18} />
                      <div>
                        <div className="font-medium">Phone</div>
                        <div className="text-gray-600">{selectedStation.phoneNumber}</div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Clock className="text-green-500 mt-1 mr-2" size={18} />
                      <div>
                        <div className="font-medium">Hours</div>
                        <div className="text-gray-600">{selectedStation.openTime}</div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Star className="text-green-500 mt-1 mr-2" size={18} />
                      <div>
                        <div className="font-medium">Rating</div>
                        <div className="text-gray-600">{selectedStation.rating} / 5</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold mb-2">Current Fuel Prices</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Regular Unleaded</span>
                      <span className="font-bold">${selectedStation.priceRegular.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Premium Unleaded</span>
                      <span className="font-bold">${selectedStation.pricePremium.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Diesel</span>
                      <span className="font-bold">${selectedStation.priceDiesel.toFixed(2)}</span>
                    </div>
                    <div className="text-sm text-gray-500 italic mt-2">
                      Prices last updated {selectedStation.lastUpdated}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold mt-6 mb-2">Amenities</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedStation.amenities.map(amenity => (
                      <div key={amenity} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                        {amenity}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-bold mb-4">Current Status</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className={`p-4 rounded-lg ${
                    selectedStation.congestion === 'Low' 
                      ? 'bg-green-50 border border-green-100' 
                      : selectedStation.congestion === 'Medium'
                      ? 'bg-yellow-50 border border-yellow-100'
                      : 'bg-red-50 border border-red-100'
                  }`}>
                    <div className="text-sm text-gray-500">Congestion</div>
                    <div className={`font-bold ${
                      selectedStation.congestion === 'Low' 
                        ? 'text-green-600' 
                        : selectedStation.congestion === 'Medium'
                        ? 'text-yellow-600'
                        : 'text-red-600'
                    }`}>
                      {selectedStation.congestion}
                    </div>
                  </div>
                  
                  <div className={`p-4 rounded-lg ${
                    selectedStation.waitTime === '< 5 min' 
                      ? 'bg-green-50 border border-green-100' 
                      : selectedStation.waitTime === '5-10 min'
                      ? 'bg-yellow-50 border border-yellow-100'
                      : 'bg-red-50 border border-red-100'
                  }`}>
                    <div className="text-sm text-gray-500">Wait Time</div>
                    <div className={`font-bold ${
                      selectedStation.waitTime === '< 5 min' 
                        ? 'text-green-600' 
                        : selectedStation.waitTime === '5-10 min'
                        ? 'text-yellow-600'
                        : 'text-red-600'
                    }`}>
                      {selectedStation.waitTime}
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
                    <div className="text-sm text-gray-500">Traffic Forecast</div>
                    <div className="font-bold text-blue-600">
                      {selectedStation.congestion === 'Low' 
                        ? 'Steady' 
                        : selectedStation.congestion === 'Medium'
                        ? 'Increasing'
                        : 'Peak Hours'}
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-end space-x-4">
                  <Button 
                    variant="outline" 
                    onClick={() => handleCallStation(selectedStation)}
                  >
                    <Phone className="mr-2" size={16} />
                    Call Station
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => handleGetDirections(selectedStation)}
                  >
                    <Navigation className="mr-2" size={16} />
                    Get Directions
                  </Button>
                  <Button 
                    className="bg-green-500 hover:bg-green-600"
                    onClick={() => setShowStationDetails(false)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default NearbyStations;
