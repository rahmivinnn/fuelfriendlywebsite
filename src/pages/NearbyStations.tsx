
import React, { useState, useEffect, useCallback } from 'react';
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Expanded station data with 50 entries
const generateStationsData = () => {
  const stationNames = [
    "Shell Express Station", "Exxon Fuel Center", "Chevron Gas & Go", "BP Premium Station", 
    "Marathon Pit Stop", "Citgo Quick Fuel", "Texaco Star Stop", "Mobil Fuel Plus", 
    "Sunoco Ultra Service", "Phillips 66 Station", "Valero Fresh Start", "Gulf Express", 
    "ARCO Gas Point", "ConocoPhillips Station", "Speedway Junction", "76 Gas & Market", 
    "Circle K Gas", "QuikTrip Fuel", "RaceTrac Gas & Goods", "Wawa Fuel Stop"
  ];
  
  const streetNames = [
    "Main St", "Oak Ave", "Pine Rd", "Elm St", "Maple Dr", "Cedar Ln", "Walnut Ave", 
    "Cherry St", "Spruce Rd", "Birch Ln", "Willow Dr", "Poplar Ave", "Chestnut St", 
    "Sycamore Dr", "Magnolia Blvd", "Laurel Ave", "Juniper Rd", "Cypress Dr", "Hemlock Ln", 
    "Redwood Blvd", "Beech St", "Holly Dr", "Dogwood Ln", "Aspen Rd", "Locust Ave"
  ];
  
  const amenitiesList = ["ATM", "Car Wash", "Convenience Store", "Restrooms", "EV Charging", 
    "Food Court", "Coffee Shop", "Tire Inflation", "Air Pump", "Vacuum Cleaner", 
    "Oil Change", "Windshield Service", "Loyalty Program", "WiFi", "Truck Parking"
  ];
  
  const phoneFormats = ["123-456-####", "234-567-####", "345-678-####", "456-789-####", "567-890-####"];
  
  const reviews = [
    "Great service and clean facilities!",
    "The prices are competitive and staff is friendly.",
    "Very convenient location with good amenities.",
    "Fast service, rarely any waiting time.",
    "Good fuel quality, my car runs smoothly.",
    "The convenience store has a good selection.",
    "Easily accessible from the highway.",
    "Modern pumps that work quickly.",
    "Fair prices compared to others in the area.",
    "Clean restrooms, which is important for me.",
    "The car wash does an excellent job.",
    "Friendly staff who are always helpful.",
    "Good coffee available in the store.",
    "Spacious area to maneuver your vehicle.",
    "The loyalty program offers good discounts.",
    "Well-lit area makes it safe at night.",
    "Fast and efficient service every time.",
    "Regular price updates keep them competitive.",
    "ATM is always working and convenient.",
    "The air pump is free and easy to use."
  ];
  
  const reviewerNames = [
    "John S.", "Emily R.", "Michael T.", "Sarah W.", "David L.", "Jessica M.", "Robert P.", 
    "Lisa K.", "James B.", "Jennifer C.", "Thomas H.", "Amanda G.", "Christopher V.", 
    "Elizabeth N.", "Daniel F.", "Nicole J.", "Matthew Q.", "Rebecca Z.", "Andrew Y.", 
    "Michelle X.", "Brian W.", "Stephanie V.", "Kevin U.", "Laura T.", "Steven S."
  ];
  
  const randomDate = () => {
    const now = new Date();
    const pastDays = Math.floor(Math.random() * 30) + 1;
    const pastDate = new Date(now.getTime() - (pastDays * 24 * 60 * 60 * 1000));
    return pastDate;
  };
  
  const getFormattedDate = (date) => {
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 60) {
      return `${diffMins} min ago`;
    } else if (diffMins < 1440) {
      return `${Math.floor(diffMins / 60)} hours ago`;
    } else {
      return `${Math.floor(diffMins / 1440)} days ago`;
    }
  };
  
  const generateUserReviews = () => {
    const reviewCount = Math.floor(Math.random() * 15) + 5;
    const userReviews = [];
    
    for (let i = 0; i < reviewCount; i++) {
      const reviewDate = randomDate();
      userReviews.push({
        id: i,
        username: reviewerNames[Math.floor(Math.random() * reviewerNames.length)],
        rating: (Math.floor(Math.random() * 10) + 1) / 2,
        text: reviews[Math.floor(Math.random() * reviews.length)],
        date: getFormattedDate(reviewDate),
        helpfulCount: Math.floor(Math.random() * 20),
        verified: Math.random() > 0.3,
      });
    }
    
    return userReviews;
  };
  
  let stationsArray = [];
  
  for (let i = 0; i < 50; i++) {
    const priceBase = 2.7 + Math.random() * 0.5;
    const distance = (0.5 + Math.random() * 5).toFixed(1);
    const congestionLevel = Math.random() < 0.33 ? "Low" : (Math.random() < 0.66 ? "Medium" : "High");
    const waitTime = congestionLevel === "Low" ? "< 5 min" : (congestionLevel === "Medium" ? "5-10 min" : "10-15 min");
    
    const randomStreetNumber = Math.floor(Math.random() * 999) + 100;
    const randomStreetName = streetNames[Math.floor(Math.random() * streetNames.length)];
    
    // Select 3-8 random amenities
    const stationAmenities = [];
    const amenitiesCount = Math.floor(Math.random() * 6) + 3;
    const possibleAmenities = [...amenitiesList];
    
    for (let j = 0; j < amenitiesCount; j++) {
      if (possibleAmenities.length === 0) break;
      const randomIndex = Math.floor(Math.random() * possibleAmenities.length);
      stationAmenities.push(possibleAmenities[randomIndex]);
      possibleAmenities.splice(randomIndex, 1);
    }
    
    // Generate random phone number
    const format = phoneFormats[Math.floor(Math.random() * phoneFormats.length)];
    const phoneNumber = format.replace('####', Math.floor(Math.random() * 10000).toString().padStart(4, '0'));
    
    // Generate station
    stationsArray.push({
      id: i + 1,
      name: stationNames[Math.floor(Math.random() * stationNames.length)] + " #" + (i + 1),
      address: `${randomStreetNumber} ${randomStreetName}, Memphis, TN`,
      distance: `${distance} miles`,
      rating: (Math.floor(Math.random() * 10) + 36) / 10, // Random rating from 3.6 to 4.6
      priceRegular: parseFloat((priceBase).toFixed(2)),
      pricePremium: parseFloat((priceBase + 0.4).toFixed(2)),
      priceDiesel: parseFloat((priceBase + 0.2).toFixed(2)),
      openTime: Math.random() > 0.3 ? "24/7" : `${Math.floor(Math.random() * 7) + 5}am - ${Math.floor(Math.random() * 4) + 9}pm`,
      amenities: stationAmenities,
      logo: ["shell", "exxon", "chevron", "bp", "marathon", "citgo"][Math.floor(Math.random() * 6)],
      congestion: congestionLevel,
      waitTime: waitTime,
      lastUpdated: `${Math.floor(Math.random() * 30) + 1} min ago`,
      favorites: Math.floor(Math.random() * 200) + 50,
      phoneNumber: phoneNumber,
      image: "/lovable-uploads/58115195-2a08-4330-8ffd-e365aeca25fe.png",
      reviews: generateUserReviews(),
    });
  }
  
  return stationsArray;
};

const NearbyStations = () => {
  const { toast } = useToast();
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("distance");
  const [allStations, setAllStations] = useState([]);
  const [filteredStations, setFilteredStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);
  const [showStationDetails, setShowStationDetails] = useState(false);
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [showAppStoreDialog, setShowAppStoreDialog] = useState(false);
  
  // Filter states
  const [fuelTypeFilters, setFuelTypeFilters] = useState({
    regular: true,
    premium: true,
    diesel: true
  });
  const [distanceFilter, setDistanceFilter] = useState("any");
  const [amenityFilters, setAmenityFilters] = useState({
    "ATM": false,
    "Car Wash": false,
    "Convenience Store": false,
    "Restrooms": false,
  });

  // Initialize station data
  useEffect(() => {
    const generatedStations = generateStationsData();
    setAllStations(generatedStations);
    setFilteredStations(generatedStations);
    
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
      setAllStations(prev => {
        const updatedStations = [...prev];
        
        // Randomly select 1-3 stations to update
        const updateCount = Math.floor(Math.random() * 3) + 1;
        const updatedIndices = [];
        
        for (let i = 0; i < updateCount; i++) {
          // Generate a random index that hasn't been updated yet
          let randomStationIndex;
          do {
            randomStationIndex = Math.floor(Math.random() * updatedStations.length);
          } while (updatedIndices.includes(randomStationIndex));
          
          updatedIndices.push(randomStationIndex);
          
          // Generate a small random price change (±0.05)
          const priceChange = (Math.random() * 0.1 - 0.05).toFixed(2);
          const oldPrice = updatedStations[randomStationIndex].priceRegular;
          const newPrice = (parseFloat(oldPrice.toString()) + parseFloat(priceChange)).toFixed(2);
          
          // Randomly update congestion and wait time
          const congestionOptions = ["Low", "Medium", "High"];
          const newCongestion = congestionOptions[Math.floor(Math.random() * congestionOptions.length)];
          const newWaitTime = newCongestion === "Low" ? "< 5 min" : (newCongestion === "Medium" ? "5-10 min" : "10-15 min");
          
          // Update the station
          updatedStations[randomStationIndex] = {
            ...updatedStations[randomStationIndex],
            priceRegular: parseFloat(newPrice),
            congestion: newCongestion,
            waitTime: newWaitTime,
            lastUpdated: "Just now"
          };
          
          // Show a notification for the first updated station
          if (i === 0) {
            toast({
              title: "Price Update",
              description: `${updatedStations[randomStationIndex].name} updated to $${newPrice}/gallon`,
              duration: 3000,
            });
          }
        }
        
        return updatedStations;
      });
    }, 8000); // Update more frequently for demonstration
    
    return () => clearInterval(interval);
  }, [toast]);

  // Apply filters and sorting
  useEffect(() => {
    if (allStations.length === 0) return;
    
    let filtered = [...allStations];
    
    // Apply search filter
    if (searchInput.trim() !== "") {
      filtered = filtered.filter(
        station => 
          station.name.toLowerCase().includes(searchInput.toLowerCase()) ||
          station.address.toLowerCase().includes(searchInput.toLowerCase())
      );
    }
    
    // Apply distance filter
    if (distanceFilter !== "any") {
      const maxDistance = parseInt(distanceFilter);
      filtered = filtered.filter(station => {
        const stationDistance = parseFloat(station.distance);
        return stationDistance <= maxDistance;
      });
    }
    
    // Apply amenity filters
    const selectedAmenities = Object.entries(amenityFilters)
      .filter(([_, isSelected]) => isSelected)
      .map(([amenity]) => amenity);
    
    if (selectedAmenities.length > 0) {
      filtered = filtered.filter(station => 
        selectedAmenities.every(amenity => station.amenities.includes(amenity))
      );
    }
    
    // Apply fuel type filters
    if (!fuelTypeFilters.regular || !fuelTypeFilters.premium || !fuelTypeFilters.diesel) {
      filtered = filtered.filter(station => {
        if (!fuelTypeFilters.regular && station.priceRegular) return false;
        if (!fuelTypeFilters.premium && station.pricePremium) return false;
        if (!fuelTypeFilters.diesel && station.priceDiesel) return false;
        return true;
      });
    }
    
    // Apply sorting
    if (sortOption === "distance") {
      filtered.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
    } else if (sortOption === "price") {
      filtered.sort((a, b) => a.priceRegular - b.priceRegular);
    } else if (sortOption === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    }
    
    setFilteredStations(filtered);
  }, [allStations, searchInput, sortOption, distanceFilter, amenityFilters, fuelTypeFilters]);

  const handleFuelTypeChange = (type) => {
    setFuelTypeFilters(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handleDistanceFilterChange = (e) => {
    setDistanceFilter(e.target.value);
  };

  const handleAmenityChange = (amenity) => {
    setAmenityFilters(prev => ({
      ...prev,
      [amenity]: !prev[amenity]
    }));
  };

  const handleApplyFilters = () => {
    toast({
      title: "Filters Applied",
      description: "Your filters have been applied to the results",
      duration: 3000,
    });
  };

  const handleCallStation = (station) => {
    setSelectedStation(station);
    setShowContactDialog(true);
  };

  const handleGetDirections = (station) => {
    toast({
      title: "Getting Directions",
      description: `Directions to ${station.name} at ${station.address}`,
      duration: 3000,
    });
    
    // Open maps in a new tab (simulated)
    window.open(`https://maps.google.com/maps?q=${encodeURIComponent(station.address)}`, '_blank');
  };

  const handleViewDetails = (station) => {
    setSelectedStation(station);
    setShowStationDetails(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="hover:text-green-600 transition-colors">
                      User & Fuel Friendly App
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="bg-white p-6 shadow-lg rounded-lg w-80">
                    <div className="text-center space-y-4">
                      <h3 className="font-bold text-lg">Download Our App</h3>
                      <p className="text-sm text-gray-600">Get the FuelFriendly app on your mobile device for the best experience!</p>
                      <div className="flex flex-col space-y-2">
                        <Button 
                          className="bg-black text-white hover:bg-gray-800"
                          onClick={() => setShowAppStoreDialog(true)}
                        >
                          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.5689 12.9203C17.5497 10.1443 19.8283 8.79465 19.9124 8.74006C18.6135 6.84407 16.6012 6.58714 15.8758 6.56358C14.1517 6.38391 12.4795 7.57982 11.6047 7.57982C10.7298 7.57982 9.35361 6.58358 7.88884 6.61893C5.99285 6.65427 4.22354 7.76304 3.23909 9.49783C1.21902 13.0259 2.73612 18.2392 4.6793 21.0388C5.65196 22.4042 6.78429 23.9213 8.26085 23.859C9.70205 23.7967 10.2304 22.9139 11.9427 22.9139C13.6549 22.9139 14.1478 23.859 15.6601 23.8237C17.2077 23.7967 18.1803 22.4454 19.1295 21.0682C20.2382 19.5088 20.6974 17.9801 20.7209 17.9095C20.6739 17.8918 17.5924 16.721 17.5689 12.9203Z" />
                            <path d="M14.9694 4.28149C15.7772 3.28525 16.3173 1.91084 16.1612 0.523438C14.9929 0.570522 13.5753 1.32232 12.7557 2.29498C12.0186 3.16162 11.3758 4.56773 11.5554 5.93035C12.8779 6.01852 14.1381 5.27731 14.9694 4.28149Z" />
                          </svg>
                          App Store
                        </Button>
                        <Button 
                          className="bg-green-600 text-white hover:bg-green-700"
                          onClick={() => setShowAppStoreDialog(true)}
                        >
                          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M3.60481 21.5988L12.0586 13.145L3.60481 4.69133L3.60481 21.5988Z" />
                            <path d="M14.2851 15.3716L5.83139 23.8253C5.83139 23.8253 6.14563 23.8253 6.54695 23.8253C7.56231 23.8253 8.96854 23.5111 10.3748 22.6373L21.2972 16.3891L14.2851 15.3716Z" />
                            <path d="M21.2984 7.88899L14.2863 6.87152L5.83261 15.3253C5.83261 15.3253 9.98037 23.0962 10.376 22.6385C10.7716 22.1809 21.2984 7.88899 21.2984 7.88899Z" />
                            <path d="M5.83236 0.454578C5.83236 0.454578 5.1905 0.0532505 3.93337 0.908025C2.67625 1.7628 2.83215 3.35418 2.83215 3.35418L12.0586 12.5807L14.2847 10.3546L5.83236 0.454578Z" />
                          </svg>
                          Google Play
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
                <Link to="/nearby-stations" className="font-bold underline text-green-600">
                  Nearby Fuel Stations
                </Link>
                <button 
                  onClick={() => setShowContactDialog(true)}
                  className="hover:text-green-600 transition-colors"
                >
                  Contact Us
                </button>
              </div>
              
              <div>
                <Button 
                  asChild 
                  className="bg-green-600 text-white hover:bg-green-700"
                >
                  <Link to="/station-registration">Register Station</Link>
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
                        checked={fuelTypeFilters.regular}
                        onChange={() => handleFuelTypeChange('regular')}
                      />
                      <label htmlFor="regular" className="ml-2 text-sm">Regular</label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        id="premium" 
                        type="checkbox" 
                        className="rounded text-green-500 focus:ring-green-500" 
                        checked={fuelTypeFilters.premium}
                        onChange={() => handleFuelTypeChange('premium')}
                      />
                      <label htmlFor="premium" className="ml-2 text-sm">Premium</label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        id="diesel" 
                        type="checkbox" 
                        className="rounded text-green-500 focus:ring-green-500" 
                        checked={fuelTypeFilters.diesel}
                        onChange={() => handleFuelTypeChange('diesel')}
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
                        value="any"
                        className="text-green-500 focus:ring-green-500" 
                        checked={distanceFilter === "any"}
                        onChange={handleDistanceFilterChange}
                      />
                      <label htmlFor="dist1" className="ml-2 text-sm">Any distance</label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        id="dist2" 
                        type="radio" 
                        name="distance" 
                        value="1"
                        className="text-green-500 focus:ring-green-500" 
                        checked={distanceFilter === "1"}
                        onChange={handleDistanceFilterChange}
                      />
                      <label htmlFor="dist2" className="ml-2 text-sm">Within 1 mile</label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        id="dist3" 
                        type="radio" 
                        name="distance" 
                        value="3"
                        className="text-green-500 focus:ring-green-500" 
                        checked={distanceFilter === "3"}
                        onChange={handleDistanceFilterChange}
                      />
                      <label htmlFor="dist3" className="ml-2 text-sm">Within 3 miles</label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        id="dist4" 
                        type="radio" 
                        name="distance" 
                        value="5"
                        className="text-green-500 focus:ring-green-500" 
                        checked={distanceFilter === "5"}
                        onChange={handleDistanceFilterChange}
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
                        checked={amenityFilters["ATM"]}
                        onChange={() => handleAmenityChange("ATM")}
                      />
                      <label htmlFor="amenity1" className="ml-2 text-sm">ATM</label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        id="amenity2" 
                        type="checkbox" 
                        className="rounded text-green-500 focus:ring-green-500" 
                        checked={amenityFilters["Car Wash"]}
                        onChange={() => handleAmenityChange("Car Wash")}
                      />
                      <label htmlFor="amenity2" className="ml-2 text-sm">Car Wash</label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        id="amenity3" 
                        type="checkbox" 
                        className="rounded text-green-500 focus:ring-green-500" 
                        checked={amenityFilters["Convenience Store"]}
                        onChange={() => handleAmenityChange("Convenience Store")}
                      />
                      <label htmlFor="amenity3" className="ml-2 text-sm">Convenience Store</label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        id="amenity4" 
                        type="checkbox" 
                        className="rounded text-green-500 focus:ring-green-500" 
                        checked={amenityFilters["Restrooms"]}
                        onChange={() => handleAmenityChange("Restrooms")}
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
                      transition={{ delay: index * 0.05 }}
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
                                  {station.rating.toFixed(1)}
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
                        <div className="text-gray-600">{selectedStation.rating.toFixed(1)} / 5</div>
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
                
                {/* Reviews Section */}
                <div className="mt-8">
                  <h3 className="text-lg font-bold mb-4">Customer Reviews</h3>
                  <div className="space-y-4">
                    {selectedStation.reviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-100 pb-4">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center">
                            <div className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center text-gray-600 font-bold mr-3">
                              {review.username.charAt(0)}
                            </div>
                            <div>
                              <div className="font-medium flex items-center">
                                {review.username}
                                {review.verified && (
                                  <span className="ml-2 bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded-full">Verified</span>
                                )}
                              </div>
                              <div className="flex items-center text-yellow-400 text-sm mt-0.5">
                                {[...Array(5)].map((_, i) => (
                                  <span key={i}>
                                    {i < Math.floor(review.rating) ? (
                                      <Star className="fill-yellow-400 w-4 h-4" size={16} />
                                    ) : i < Math.ceil(review.rating) && review.rating % 1 !== 0 ? (
                                      <div className="relative w-4 h-4">
                                        <Star className="fill-gray-200 absolute w-4 h-4" size={16} />
                                        <div className="absolute overflow-hidden w-[50%]">
                                          <Star className="fill-yellow-400 w-4 h-4" size={16} />
                                        </div>
                                      </div>
                                    ) : (
                                      <Star className="fill-gray-200 w-4 h-4" size={16} />
                                    )}
                                  </span>
                                ))}
                                <span className="ml-1 text-xs text-gray-500">{review.date}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <p className="mt-2 text-gray-600">{review.text}</p>
                        <div className="mt-2 text-sm text-gray-500">
                          <button className="flex items-center hover:text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                            </svg>
                            Helpful ({review.helpfulCount})
                          </button>
                        </div>
                      </div>
                    ))}
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
      
      {/* Contact Us Dialog */}
      <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Contact FuelFriendly</DialogTitle>
            <DialogDescription>
              Have questions or feedback? We'd love to hear from you!
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <h4 className="font-medium">Customer Support</h4>
              <p className="text-sm text-gray-500">
                Email: support@fuelfriendly.com<br />
                Phone: 1-800-FUEL-123<br />
                Hours: 24/7 Support
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Business Inquiries</h4>
              <p className="text-sm text-gray-500">
                Email: hellofuel@com<br />
                Phone: 1-888-FUEL-BIZ<br />
                Hours: Monday - Friday, 9am - 5pm EST
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Station Registration</h4>
              <p className="text-sm text-gray-500">
                For fuel station owners looking to register their stations on our platform.
              </p>
              <Button 
                asChild
                className="w-full bg-green-500 hover:bg-green-600 mt-2"
              >
                <Link to="/station-registration">Register Your Station</Link>
              </Button>
            </div>
          </div>
          <DialogFooter className="sm:justify-center">
            <Button 
              variant="outline"
              onClick={() => setShowContactDialog(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* App Store Dialog */}
      <Dialog open={showAppStoreDialog} onOpenChange={setShowAppStoreDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Download Our Mobile App</DialogTitle>
            <DialogDescription>
              Get the FuelFriendly experience on your mobile device
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="bg-gray-50 p-4 rounded-lg text-center hover:bg-gray-100 transition-colors cursor-pointer">
              <svg className="w-16 h-16 mx-auto mb-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.5689 12.9203C17.5497 10.1443 19.8283 8.79465 19.9124 8.74006C18.6135 6.84407 16.6012 6.58714 15.8758 6.56358C14.1517 6.38391 12.4795 7.57982 11.6047 7.57982C10.7298 7.57982 9.35361 6.58358 7.88884 6.61893C5.99285 6.65427 4.22354 7.76304 3.23909 9.49783C1.21902 13.0259 2.73612 18.2392 4.6793 21.0388C5.65196 22.4042 6.78429 23.9213 8.26085 23.859C9.70205 23.7967 10.2304 22.9139 11.9427 22.9139C13.6549 22.9139 14.1478 23.859 15.6601 23.8237C17.2077 23.7967 18.1803 22.4454 19.1295 21.0682C20.2382 19.5088 20.6974 17.9801 20.7209 17.9095C20.6739 17.8918 17.5924 16.721 17.5689 12.9203Z" />
                <path d="M14.9694 4.28149C15.7772 3.28525 16.3173 1.91084 16.1612 0.523438C14.9929 0.570522 13.5753 1.32232 12.7557 2.29498C12.0186 3.16162 11.3758 4.56773 11.5554 5.93035C12.8779 6.01852 14.1381 5.27731 14.9694 4.28149Z" />
              </svg>
              <h4 className="font-medium">iOS App</h4>
              <p className="text-sm text-gray-500 mt-1">Download on the App Store</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg text-center hover:bg-gray-100 transition-colors cursor-pointer">
              <svg className="w-16 h-16 mx-auto mb-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.60481 21.5988L12.0586 13.145L3.60481 4.69133L3.60481 21.5988Z" />
                <path d="M14.2851 15.3716L5.83139 23.8253C5.83139 23.8253 6.14563 23.8253 6.54695 23.8253C7.56231 23.8253 8.96854 23.5111 10.3748 22.6373L21.2972 16.3891L14.2851 15.3716Z" />
                <path d="M21.2984 7.88899L14.2863 6.87152L5.83261 15.3253C5.83261 15.3253 9.98037 23.0962 10.376 22.6385C10.7716 22.1809 21.2984 7.88899 21.2984 7.88899Z" />
                <path d="M5.83236 0.454578C5.83236 0.454578 5.1905 0.0532505 3.93337 0.908025C2.67625 1.7628 2.83215 3.35418 2.83215 3.35418L12.0586 12.5807L14.2847 10.3546L5.83236 0.454578Z" />
              </svg>
              <h4 className="font-medium">Android App</h4>
              <p className="text-sm text-gray-500 mt-1">Get it on Google Play</p>
            </div>
          </div>
          
          <div className="py-4 text-center">
            <h4 className="font-medium mb-2">Scan QR Code</h4>
            <div className="bg-gray-800 inline-block p-2 rounded-lg">
              <div className="bg-white p-4 rounded">
                <div className="w-36 h-36 mx-auto bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMzAgMzMwIj48cGF0aCBkPSJNMCAwaDMzMHYzMzBIMHoiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6TTYwIDMwaDMwdjMwSDYwek05MCAzMGgzMHYzMEg5MHpNMTIwIDMwaDMwdjMwaC0zMHpNMTUwIDMwaDMwdjMwaC0zMHpNMTgwIDMwaDMwdjMwaC0zMHpNMjEwIDMwaDMwdjMwaC0zMHpNMjcwIDMwaDMwdjMwaC0zMHpNMzAgNjBoMzB2MzBIMzB6TTIxMCA2MGgzMHYzMGgtMzB6TTI3MCA2MGgzMHYzMGgtMzB6TTMwIDkwaDMwdjMwSDMwek05MCA5MGgzMHYzMEg5MHpNMTIwIDkwaDMwdjMwaC0zMHpNMTUwIDkwaDMwdjMwaC0zMHpNMjEwIDkwaDMwdjMwaC0zMHpNMjcwIDkwaDMwdjMwaC0zMHpNMzAgMTIwaDMwdjMwSDMwek02MCAxMjBoMzB2MzBINjB6TTkwIDEyMGgzMHYzMEg5MHpNMTIwIDEyMGgzMHYzMGgtMzB6TTE1MCAxMjBoMzB2MzBoLTMwek0xODAgMTIwaDMwdjMwaC0zMHpNMjEwIDEyMGgzMHYzMGgtMzB6TTI0MCAxMjBoMzB2MzBoLTMwek0yNzAgMTIwaDMwdjMwaC0zMHpNMzAgMTUwaDMwdjMwSDMwek0yNzAgMTUwaDMwdjMwaC0zMHpNMzAgMTgwaDMwdjMwSDMwek05MCAxODBoMzB2MzBIOTB6TTEyMCAxODBoMzB2MzBoLTMwek0xNTAgMTgwaDMwdjMwaC0zMHpNMTgwIDE4MGgzMHYzMGgtMzB6TTI3MCAxODBoMzB2MzBoLTMwek0zMCAyMTBoMzB2MzBIMzB6TTYwIDIxMGgzMHYzMEg2MHpNOTAgMjEwaDMwdjMwSDkwek0xMjAgMjEwaDMwdjMwaC0zMHpNMTUwIDIxMGgzMHYzMGgtMzB6TTE4MCAyMTBoMzB2MzBoLTMwek0yMTAgMjEwaDMwdjMwaC0zMHpNMjQwIDIxMGgzMHYzMGgtMzB6TTI3MCAyMTBoMzB2MzBoLTMwek0zMCAyNDBoMzB2MzBIMzB6TTYwIDI0MGgzMHYzMEg2MHpNOTAgMjQwaDMwdjMwSDkwek0xMjAgMjQwaDMwdjMwaC0zMHpNMTUwIDI0MGgzMHYzMGgtMzB6TTE4MCAyNDBoMzB2MzBoLTMwek0yMTAgMjQwaDMwdjMwaC0zMHpNMjQwIDI0MGgzMHYzMGgtMzB6TTI3MCAyNDBoMzB2MzBoLTMwek0zMCAyNzBoMzB2MzBIMzB6TTYwIDI3MGgzMHYzMEg2MHpNOTAgMjcwaDMwdjMwSDkwek0xMjAgMjcwaDMwdjMwaC0zMHpNMTUwIDI3MGgzMHYzMGgtMzB6TTE4MCAyNzBoMzB2MzBoLTMwek0yMTAgMjcwaDMwdjMwaC0zMHpNMjQwIDI3MGgzMHYzMGgtMzB6TTI3MCAyNzBoMzB2MzBoLTMweiIvPjwvc3ZnPg==')] bg-center bg-contain"></div>
              </div>
            </div>
          </div>
          
          <DialogFooter className="sm:justify-center">
            <Button 
              variant="outline"
              onClick={() => setShowAppStoreDialog(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NearbyStations;
