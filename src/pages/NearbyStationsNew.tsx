import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, MapPin, Star, ChevronDown, Filter, Navigation, Clock, Phone, Car,
  Shell, TrendingUp, AlertTriangle, Globe, Maximize, Minimize, Layers,
  Fuel, Info, Zap, Droplets, DollarSign, Wifi, Coffee, ShoppingBag,
  Utensils, CreditCard, Truck, RefreshCw, X, ChevronLeft, ChevronRight,
  ThumbsUp, ThumbsDown, Share2, Heart, Bookmark, ExternalLink, Locate
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from "@/hooks/use-toast";
import { countries, cities } from '@/data/countries';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { useTheme } from '@/components/ThemeProvider';

// Set your Mapbox access token here
mapboxgl.accessToken = 'pk.eyJ1IjoiZnVlbGZyaWVuZGx5MjAyNSIsImEiOiJjbTlzZGZsOHowMW00Mm1xNGEzcHhzYnQ4In0.5K8rY561eFLN2hy0U7QPdw';

// Interface definitions
interface Station {
  id: number;
  name: string;
  address: string;
  coordinates: [number, number];
  distance: string;
  distanceValue: number;
  rating: number;
  priceRegular: number;
  pricePremium: number;
  priceDiesel: number;
  openTime: string;
  isOpen: boolean;
  amenities: string[];
  logo: string;
  congestion: string;
  waitTime: string;
  lastUpdated: string;
  favorites: number;
  phoneNumber: string;
  image: string;
  reviews: Review[];
  fuelTypes: string[];
}

interface Review {
  id: number;
  username: string;
  rating: number;
  text: string;
  date: string;
  helpfulCount: number;
  verified: boolean;
}

interface UserLocation {
  lat: number;
  lng: number;
}

// Random cities from around the world for fallback
const randomCities = [
  { name: "Reykjavík", country: "Iceland", lat: 64.1265, lng: -21.8174, countryCode: "IS" },
  { name: "Cairo", country: "Egypt", lat: 30.0444, lng: 31.2357, countryCode: "EG" },
  { name: "Jakarta", country: "Indonesia", lat: -6.2088, lng: 106.8456, countryCode: "ID" },
  { name: "Buenos Aires", country: "Argentina", lat: -34.6037, lng: -58.3816, countryCode: "AR" },
  { name: "Cape Town", country: "South Africa", lat: -33.9249, lng: 18.4241, countryCode: "ZA" },
  { name: "Auckland", country: "New Zealand", lat: -36.8509, lng: 174.7645, countryCode: "NZ" },
  { name: "Seoul", country: "South Korea", lat: 37.5665, lng: 126.9780, countryCode: "KR" },
  { name: "Lima", country: "Peru", lat: -12.0464, lng: -77.0428, countryCode: "PE" },
  { name: "Helsinki", country: "Finland", lat: 60.1699, lng: 24.9384, countryCode: "FI" },
  { name: "Marrakech", country: "Morocco", lat: 31.6295, lng: -7.9811, countryCode: "MA" },
  { name: "Nairobi", country: "Kenya", lat: -1.2921, lng: 36.8219, countryCode: "KE" },
  { name: "Bangkok", country: "Thailand", lat: 13.7563, lng: 100.5018, countryCode: "TH" },
];

// Fuel station icons for different brands
const stationIcons = {
  shell: <Shell className="h-5 w-5 text-yellow-500" />,
  exxon: <Fuel className="h-5 w-5 text-blue-500" />,
  chevron: <Fuel className="h-5 w-5 text-red-500" />,
  bp: <Fuel className="h-5 w-5 text-green-500" />,
  marathon: <Fuel className="h-5 w-5 text-purple-500" />,
  citgo: <Fuel className="h-5 w-5 text-orange-500" />,
  default: <Fuel className="h-5 w-5 text-gray-500" />
};

// Amenity icons
const amenityIcons = {
  "ATM": <DollarSign className="h-4 w-4" />,
  "Car Wash": <Car className="h-4 w-4" />,
  "Convenience Store": <ShoppingBag className="h-4 w-4" />,
  "Restrooms": <MapPin className="h-4 w-4" />,
  "EV Charging": <Zap className="h-4 w-4" />,
  "Food Court": <Utensils className="h-4 w-4" />,
  "Coffee Shop": <Coffee className="h-4 w-4" />,
  "WiFi": <Wifi className="h-4 w-4" />,
  "Truck Parking": <Truck className="h-4 w-4" />,
  "Loyalty Program": <CreditCard className="h-4 w-4" />,
  "default": <Info className="h-4 w-4" />
};

const NearbyStationsNew = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { theme } = useTheme();

  // Default map coordinates (centered on Europe)
  const [lng, setLng] = useState(15.2551);
  const [lat, setLat] = useState(54.5260);
  const [zoom, setZoom] = useState(3);

  // State for stations and filtering
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [sortOption, setSortOption] = useState("distance");
  const [stations, setStations] = useState<Station[]>([]);
  const [filteredStations, setFilteredStations] = useState<Station[]>([]);
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [showStationDetails, setShowStationDetails] = useState(false);

  // Map related states
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapFullscreen, setMapFullscreen] = useState(false);
  const [mapStyle, setMapStyle] = useState(
    theme === 'dark'
      ? 'mapbox://styles/mapbox/dark-v11'
      : 'mapbox://styles/mapbox/streets-v12'
  );

  // Location states
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [availableCities, setAvailableCities] = useState<any[]>([]);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState("");

  // Filter states
  const [showFilters, setShowFilters] = useState(false);
  const [fuelTypeFilters, setFuelTypeFilters] = useState({
    regular: true,
    premium: true,
    diesel: true
  });
  const [distanceFilter, setDistanceFilter] = useState(10); // miles
  const [ratingFilter, setRatingFilter] = useState(0); // minimum rating
  const [amenityFilters, setAmenityFilters] = useState<Record<string, boolean>>({
    "ATM": false,
    "Car Wash": false,
    "Convenience Store": false,
    "Restrooms": false,
    "EV Charging": false,
    "Food Court": false,
    "Coffee Shop": false,
    "WiFi": false,
  });

  // Function to fetch stations from Overpass API
  const fetchStationsFromOverpass = useCallback(async (lat: number, lon: number, radius: number = 10000) => {
    if (!lat || !lon) return;

    setLoading(true);

    try {
      // Overpass API query for fuel stations within radius (in meters)
      const query = `
        [out:json];
        node["amenity"="fuel"](around:${radius}, ${lat}, ${lon});
        out body;
      `;

      const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Overpass API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (!data.elements || data.elements.length === 0) {
        // If no stations found, use fallback mock data
        toast({
          title: "No Fuel Centers Found",
          description: "Could not find fuel centers in this area. Using sample data instead.",
          duration: 3000,
        });

        // Generate mock data
        generateMockStations(lat, lon);
        return;
      }

      // Process the stations data
      const processedStations = data.elements.map((element: any, index: number) => {
        // Calculate distance from user location
        const stationLat = element.lat;
        const stationLon = element.lon;
        const distanceValue = calculateDistance(lat, lon, stationLat, stationLon);

        // Extract tags
        const tags = element.tags || {};

        // Determine available fuel types
        const fuelTypes = [];
        if (tags["fuel:diesel"] === "yes") fuelTypes.push("diesel");
        if (tags["fuel:octane_91"] === "yes" || tags["fuel:octane_95"] === "yes") fuelTypes.push("regular");
        if (tags["fuel:octane_98"] === "yes" || tags["fuel:octane_100"] === "yes") fuelTypes.push("premium");

        // If no specific fuel types are tagged, assume all are available
        if (fuelTypes.length === 0) {
          fuelTypes.push("regular", "premium", "diesel");
        }

        // Extract amenities
        const amenities = [];
        if (tags["atm"] === "yes") amenities.push("ATM");
        if (tags["car_wash"] === "yes") amenities.push("Car Wash");
        if (tags["shop"] === "convenience" || tags["shop"] === "yes") amenities.push("Convenience Store");
        if (tags["toilets"] === "yes") amenities.push("Restrooms");
        if (tags["charging_station"] === "yes") amenities.push("EV Charging");
        if (tags["restaurant"] === "yes" || tags["fast_food"] === "yes") amenities.push("Food Court");
        if (tags["cuisine"] === "coffee_shop") amenities.push("Coffee Shop");
        if (tags["internet_access"] === "wlan" || tags["internet_access"] === "yes") amenities.push("WiFi");

        // Generate random prices (since real prices aren't in OSM data)
        const basePrice = 2.5 + Math.random() * 1.5;

        // Determine if station is open
        const isOpen = tags["opening_hours"] ?
          !tags["opening_hours"].includes("closed") :
          Math.random() > 0.2; // 80% chance of being open if no data

        // Get brand/operator
        let name = tags["name"] || tags["brand"] || tags["operator"] || "Unnamed Station";
        let logo = "default";

        // Try to match known brands
        const brandLower = (tags["brand"] || "").toLowerCase();
        if (brandLower.includes("shell")) logo = "shell";
        else if (brandLower.includes("exxon") || brandLower.includes("esso")) logo = "exxon";
        else if (brandLower.includes("bp")) logo = "bp";
        else if (brandLower.includes("chevron")) logo = "chevron";
        else if (brandLower.includes("marathon")) logo = "marathon";
        else if (brandLower.includes("citgo")) logo = "citgo";

        // Generate a station object
        return {
          id: element.id || index + 1,
          name: name,
          address: tags["addr:street"] ?
            `${tags["addr:housenumber"] || ""} ${tags["addr:street"]}, ${tags["addr:city"] || selectedCity || ""}, ${tags["addr:country"] || countries.find(c => c.code === selectedCountry)?.name || ""}` :
            `Near ${selectedCity || ""}, ${countries.find(c => c.code === selectedCountry)?.name || ""}`,
          coordinates: [stationLon, stationLat] as [number, number],
          distance: `${distanceValue.toFixed(1)} miles`,
          distanceValue: distanceValue,
          rating: (3 + Math.random() * 2).toFixed(1), // Random rating between 3.0 and 5.0
          priceRegular: parseFloat((basePrice).toFixed(2)),
          pricePremium: parseFloat((basePrice + 0.4).toFixed(2)),
          priceDiesel: parseFloat((basePrice + 0.2).toFixed(2)),
          openTime: isOpen ? (Math.random() > 0.7 ? "24/7" : `${Math.floor(Math.random() * 7) + 5}am - ${Math.floor(Math.random() * 4) + 9}pm`) : "Closed",
          isOpen: isOpen,
          amenities: amenities,
          logo: logo,
          congestion: ["Low", "Medium", "High"][Math.floor(Math.random() * 3)],
          waitTime: ["< 5 min", "5-10 min", "10-15 min"][Math.floor(Math.random() * 3)],
          lastUpdated: `${Math.floor(Math.random() * 30) + 1} min ago`,
          favorites: Math.floor(Math.random() * 200) + 50,
          phoneNumber: `+${Math.floor(Math.random() * 90) + 10}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
          image: "/lovable-uploads/58115195-2a08-4330-8ffd-e365aeca25fe.png",
          reviews: generateMockReviews(),
          fuelTypes: fuelTypes,
        };
      });

      setStations(processedStations);
      setFilteredStations(processedStations);

      toast({
        title: "Fuel Centers Loaded",
        description: `Found ${processedStations.length} fuel centers near ${selectedCity || "your location"}`,
        duration: 3000,
      });
    } catch (error) {
      console.error("Error fetching stations:", error);

      toast({
        title: "Error Loading Fuel Centers",
        description: "Could not load fuel centers. Using sample data instead.",
        variant: "destructive",
        duration: 5000,
      });

      // Generate mock data as fallback
      generateMockStations(lat, lon);
    } finally {
      setLoading(false);
    }
  }, [selectedCity, selectedCountry, toast]);

  // Generate mock reviews
  const generateMockReviews = () => {
    const reviewCount = Math.floor(Math.random() * 10) + 3;
    const reviews = [];

    const reviewTexts = [
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
      "The loyalty program offers good discounts."
    ];

    const reviewerNames = [
      "John S.", "Emily R.", "Michael T.", "Sarah W.", "David L.", "Jessica M.", "Robert P.",
      "Lisa K.", "James B.", "Jennifer C.", "Thomas H.", "Amanda G.", "Christopher V.",
      "Elizabeth N.", "Daniel F.", "Nicole J.", "Matthew Q.", "Rebecca Z.", "Andrew Y."
    ];

    for (let i = 0; i < reviewCount; i++) {
      reviews.push({
        id: i,
        username: reviewerNames[Math.floor(Math.random() * reviewerNames.length)],
        rating: (Math.floor(Math.random() * 10) + 1) / 2, // Random rating from 0.5 to 5.0
        text: reviewTexts[Math.floor(Math.random() * reviewTexts.length)],
        date: `${Math.floor(Math.random() * 30) + 1} days ago`,
        helpfulCount: Math.floor(Math.random() * 20),
        verified: Math.random() > 0.3,
      });
    }

    return reviews;
  };

  // Generate mock stations as fallback
  const generateMockStations = (lat: number, lon: number) => {
    const stationCount = Math.floor(Math.random() * 15) + 10; // 10-25 stations
    const mockStations = [];

    const stationNames = [
      "Shell Express Fuel Center", "Exxon Fuel Center", "Chevron Fuel & Go", "BP Premium Fuel Center",
      "Marathon Fuel Stop", "Citgo Quick Fuel", "Texaco Fuel Stop", "Mobil Fuel Plus",
      "Sunoco Ultra Fuel Center", "Phillips 66 Fuel Center", "Valero Fresh Fuel", "Gulf Express Fuel",
      "ARCO Fuel Point", "ConocoPhillips Fuel Center", "Speedway Fuel Junction", "76 Fuel & Market"
    ];

    const streetNames = [
      "Main St", "Oak Ave", "Pine Rd", "Elm St", "Maple Dr", "Cedar Ln", "Walnut Ave",
      "Cherry St", "Spruce Rd", "Birch Ln", "Willow Dr", "Poplar Ave", "Chestnut St"
    ];

    for (let i = 0; i < stationCount; i++) {
      // Generate random coordinates within ~5 miles
      const latOffset = (Math.random() - 0.5) * 0.15;
      const lonOffset = (Math.random() - 0.5) * 0.15;
      const stationLat = lat + latOffset;
      const stationLon = lon + lonOffset;

      // Calculate actual distance
      const distance = calculateDistance(lat, lon, stationLat, stationLon);

      // Generate random amenities
      const allAmenities = ["ATM", "Car Wash", "Convenience Store", "Restrooms", "EV Charging", "Food Court", "Coffee Shop", "WiFi"];
      const amenities = [];
      const amenityCount = Math.floor(Math.random() * 5) + 1;

      for (let j = 0; j < amenityCount; j++) {
        const randomAmenity = allAmenities[Math.floor(Math.random() * allAmenities.length)];
        if (!amenities.includes(randomAmenity)) {
          amenities.push(randomAmenity);
        }
      }

      // Generate random fuel types
      const fuelTypes = [];
      if (Math.random() > 0.1) fuelTypes.push("regular");
      if (Math.random() > 0.3) fuelTypes.push("premium");
      if (Math.random() > 0.4) fuelTypes.push("diesel");

      // Ensure at least one fuel type
      if (fuelTypes.length === 0) fuelTypes.push("regular");

      // Generate random prices
      const basePrice = 2.5 + Math.random() * 1.5;

      // Generate random address
      const streetNumber = Math.floor(Math.random() * 1000) + 100;
      const streetName = streetNames[Math.floor(Math.random() * streetNames.length)];

      // Generate station logo
      const logoOptions = ["shell", "exxon", "chevron", "bp", "marathon", "citgo"];
      const logo = logoOptions[Math.floor(Math.random() * logoOptions.length)];

      // Create station object
      mockStations.push({
        id: i + 1,
        name: stationNames[Math.floor(Math.random() * stationNames.length)] + " #" + (i + 1),
        address: `${streetNumber} ${streetName}, ${selectedCity || "Unknown City"}, ${countries.find(c => c.code === selectedCountry)?.name || "Unknown Country"}`,
        coordinates: [stationLon, stationLat] as [number, number],
        distance: `${distance.toFixed(1)} miles`,
        distanceValue: distance,
        rating: (3 + Math.random() * 2).toFixed(1), // Random rating between 3.0 and 5.0
        priceRegular: parseFloat((basePrice).toFixed(2)),
        pricePremium: parseFloat((basePrice + 0.4).toFixed(2)),
        priceDiesel: parseFloat((basePrice + 0.2).toFixed(2)),
        openTime: Math.random() > 0.2 ? (Math.random() > 0.7 ? "24/7" : `${Math.floor(Math.random() * 7) + 5}am - ${Math.floor(Math.random() * 4) + 9}pm`) : "Closed",
        isOpen: Math.random() > 0.2,
        amenities: amenities,
        logo: logo,
        congestion: ["Low", "Medium", "High"][Math.floor(Math.random() * 3)],
        waitTime: ["< 5 min", "5-10 min", "10-15 min"][Math.floor(Math.random() * 3)],
        lastUpdated: `${Math.floor(Math.random() * 30) + 1} min ago`,
        favorites: Math.floor(Math.random() * 200) + 50,
        phoneNumber: `+${Math.floor(Math.random() * 90) + 10}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
        image: "/lovable-uploads/58115195-2a08-4330-8ffd-e365aeca25fe.png",
        reviews: generateMockReviews(),
        fuelTypes: fuelTypes,
      });
    }

    setStations(mockStations);
    setFilteredStations(mockStations);
  };

  // Calculate distance between two coordinates in miles
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 3958.8; // Earth's radius in miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Function to geocode a city and country to get coordinates
  const geocodeLocation = useCallback(async (city: string, countryCode: string): Promise<{lat: number, lng: number} | null> => {
    try {
      const countryName = countries.find(c => c.code === countryCode)?.name || "";
      const query = `${city}, ${countryName}`;

      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${mapboxgl.accessToken}&types=place&limit=1`
      );

      if (response.ok) {
        const data = await response.json();

        if (data.features && data.features.length > 0) {
          const [lng, lat] = data.features[0].center;
          return { lat, lng };
        }
      }

      return null;
    } catch (error) {
      console.error("Error geocoding location:", error);
      return null;
    }
  }, [countries]);

  // Function to detect user's location
  const detectUserLocation = useCallback(() => {
    setIsLocating(true);
    setLocationError("");

    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      setIsLocating(false);
      toast({
        title: "Location Not Supported",
        description: "Your browser does not support geolocation. Please select your country and city manually.",
        variant: "destructive",
        duration: 5000,
      });
      return;
    }

    // Set a timeout for geolocation
    const timeoutId = setTimeout(() => {
      if (isLocating) {
        setLocationError("Location detection timed out. Using a random global location.");
        setIsLocating(false);

        // Use a random global city as fallback
        const randomCity = randomCities[Math.floor(Math.random() * randomCities.length)];
        setUserLocation({ lat: randomCity.lat, lng: randomCity.lng });

        // Find the country in our list
        const countryObj = countries.find(c => c.code === randomCity.countryCode);
        if (countryObj) {
          setSelectedCountry(countryObj.code);

          // Wait for cities to load then set the city
          setTimeout(() => {
            setSelectedCity(randomCity.name);
          }, 500);
        }

        toast({
          title: "Using Random Location",
          description: `Showing stations in ${randomCity.name}, ${randomCity.country}`,
          duration: 3000,
        });
      }
    }, 10000);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        clearTimeout(timeoutId);
        const { latitude, longitude } = position.coords;

        // Update user location
        setUserLocation({ lat: latitude, lng: longitude });

        try {
          // Reverse geocode to get country and city
          const response = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxgl.accessToken}&types=country,place&limit=5`
          );

          if (response.ok) {
            const data = await response.json();
            let country = "";
            let countryCode = "";
            let city = "";

            // Process features to find country and city
            data.features.forEach(feature => {
              if (feature.place_type.includes('country') && !country) {
                country = feature.text;

                // Find country code
                const countryObj = countries.find(c =>
                  c.name.toLowerCase() === country.toLowerCase() ||
                  c.name.toLowerCase().includes(country.toLowerCase()) ||
                  country.toLowerCase().includes(c.name.toLowerCase())
                );

                if (countryObj) {
                  countryCode = countryObj.code;
                  setSelectedCountry(countryObj.code);
                }
              }

              if (feature.place_type.includes('place') && !city) {
                city = feature.text;
                setSelectedCity(city);
              }
            });

            if (country && city) {
              toast({
                title: "Location Detected",
                description: `Showing stations near ${city}, ${country}`,
                duration: 3000,
              });
            }
          }
        } catch (error) {
          console.error("Error reverse geocoding:", error);

          // Use a random global city as fallback
          const randomCity = randomCities[Math.floor(Math.random() * randomCities.length)];

          // Find the country in our list
          const countryObj = countries.find(c => c.code === randomCity.countryCode);
          if (countryObj) {
            setSelectedCountry(countryObj.code);
            setTimeout(() => {
              setSelectedCity(randomCity.name);
            }, 500);
          }

          toast({
            title: "Location Error",
            description: `Using ${randomCity.name}, ${randomCity.country} as fallback`,
            duration: 3000,
          });
        }

        setIsLocating(false);
      },
      (error) => {
        clearTimeout(timeoutId);
        console.error("Geolocation error:", error);

        // Use a random global city as fallback
        const randomCity = randomCities[Math.floor(Math.random() * randomCities.length)];
        setUserLocation({ lat: randomCity.lat, lng: randomCity.lng });

        // Find the country in our list
        const countryObj = countries.find(c => c.code === randomCity.countryCode);
        if (countryObj) {
          setSelectedCountry(countryObj.code);
          setTimeout(() => {
            setSelectedCity(randomCity.name);
          }, 500);
        }

        let errorMessage = "Unknown error getting your location.";
        switch (error.code) {
          case 1: // PERMISSION_DENIED
            errorMessage = "Location access was denied.";
            break;
          case 2: // POSITION_UNAVAILABLE
            errorMessage = "Your location information is unavailable.";
            break;
          case 3: // TIMEOUT
            errorMessage = "Location request timed out.";
            break;
        }

        setLocationError(errorMessage);
        setIsLocating(false);

        toast({
          title: "Using Random Location",
          description: `${errorMessage} Showing stations in ${randomCity.name}, ${randomCity.country}`,
          duration: 5000,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  }, [toast, countries, isLocating]);

  // Filter cities based on selected country
  useEffect(() => {
    if (selectedCountry) {
      const filteredCities = cities.filter(city => city.countryCode === selectedCountry);
      setAvailableCities(filteredCities);

      // If there was a previously selected city and it's not in the new country, clear it
      if (selectedCity && !filteredCities.some(city => city.name === selectedCity)) {
        setSelectedCity("");
      }

      // If no cities are available for this country, generate specific city names
      if (filteredCities.length === 0) {
        const countryName = countries.find(c => c.code === selectedCountry)?.name || "";

        // Map of countries to their major cities
        const countryCities: Record<string, string[]> = {
          // A few examples for common countries
          'US': ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'],
          'GB': ['London', 'Birmingham', 'Manchester', 'Glasgow', 'Liverpool', 'Bristol', 'Edinburgh', 'Leeds', 'Sheffield', 'Newcastle'],
          'CA': ['Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Edmonton', 'Ottawa', 'Quebec City', 'Winnipeg', 'Hamilton', 'Halifax'],
          'AU': ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Gold Coast', 'Canberra', 'Newcastle', 'Wollongong', 'Hobart'],
          'DE': ['Berlin', 'Hamburg', 'Munich', 'Cologne', 'Frankfurt', 'Stuttgart', 'Düsseldorf', 'Leipzig', 'Dortmund', 'Essen'],
          'FR': ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg', 'Montpellier', 'Bordeaux', 'Lille'],
          'JP': ['Tokyo', 'Yokohama', 'Osaka', 'Nagoya', 'Sapporo', 'Fukuoka', 'Kobe', 'Kyoto', 'Kawasaki', 'Saitama'],
          'CN': ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen', 'Chengdu', 'Tianjin', 'Wuhan', 'Xi\'an', 'Hangzhou', 'Nanjing'],
          'IN': ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Ahmedabad', 'Pune', 'Jaipur', 'Lucknow'],
          'BR': ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador', 'Fortaleza', 'Belo Horizonte', 'Manaus', 'Curitiba', 'Recife', 'Porto Alegre'],
          'RU': ['Moscow', 'Saint Petersburg', 'Novosibirsk', 'Yekaterinburg', 'Kazan', 'Nizhny Novgorod', 'Chelyabinsk', 'Samara', 'Omsk', 'Rostov-on-Don'],
          'MX': ['Mexico City', 'Guadalajara', 'Monterrey', 'Puebla', 'Tijuana', 'León', 'Juárez', 'Zapopan', 'Mérida', 'Cancún'],
          'ES': ['Madrid', 'Barcelona', 'Valencia', 'Seville', 'Zaragoza', 'Málaga', 'Murcia', 'Palma', 'Las Palmas', 'Bilbao'],
          'IT': ['Rome', 'Milan', 'Naples', 'Turin', 'Palermo', 'Genoa', 'Bologna', 'Florence', 'Bari', 'Catania'],
          'NZ': ['Auckland', 'Wellington', 'Christchurch', 'Hamilton', 'Tauranga', 'Napier-Hastings', 'Dunedin', 'Palmerston North', 'Nelson', 'Rotorua'],
          'ID': ['Jakarta', 'Surabaya', 'Bandung', 'Medan', 'Semarang', 'Makassar', 'Palembang', 'Tangerang', 'Depok', 'Padang'],
          'ZA': ['Johannesburg', 'Cape Town', 'Durban', 'Pretoria', 'Port Elizabeth', 'Bloemfontein', 'Nelspruit', 'Kimberley', 'Polokwane', 'Pietermaritzburg'],
          'NG': ['Lagos', 'Kano', 'Ibadan', 'Kaduna', 'Port Harcourt', 'Benin City', 'Maiduguri', 'Zaria', 'Aba', 'Jos'],
          'EG': ['Cairo', 'Alexandria', 'Giza', 'Shubra El-Kheima', 'Port Said', 'Suez', 'Luxor', 'Aswan', 'Mansoura', 'Tanta'],
          'AR': ['Buenos Aires', 'Córdoba', 'Rosario', 'Mendoza', 'Tucumán', 'La Plata', 'Mar del Plata', 'Salta', 'Santa Fe', 'San Juan'],
        };

        // Get cities for the selected country, or generate generic ones if not in our map
        let cityNames = countryCities[selectedCountry] || [];

        // If we don't have specific cities for this country, generate generic ones with the capital
        if (cityNames.length === 0) {
          cityNames = [
            `${countryName} City`, // Capital city
            `New ${countryName}`, // New city
            `Port ${countryName}`, // Port city
            `${countryName} Heights`, // Heights
            `${countryName} Valley`, // Valley
            `${countryName} Springs`, // Springs
            `${countryName} Harbor`, // Harbor
            `${countryName} Junction`, // Junction
            `${countryName} Village`, // Village
            `${countryName} Town` // Town
          ];
        }

        // Create city objects
        const defaultCities = cityNames.map(cityName => ({
          name: cityName,
          countryCode: selectedCountry
        }));

        setAvailableCities(defaultCities);
      }
    } else {
      setAvailableCities([]);
    }
  }, [selectedCountry, selectedCity, countries]);

  // Initialize map when component mounts
  useEffect(() => {
    if (map.current) return; // Initialize map only once

    try {
      // Check if mapboxgl is supported
      if (!mapboxgl.supported()) {
        toast({
          title: "Browser Not Supported",
          description: "Your browser does not support Mapbox GL. Some features may not work correctly.",
          variant: "destructive",
          duration: 5000,
        });
        return;
      }

      // Check if container exists
      if (!mapContainer.current) {
        console.error("Map container not found");
        return;
      }

      // Create map with error handling
      try {
        // Force the map to be created even if there are issues
        mapboxgl.clearStorage();

        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: mapStyle,
          center: [lng, lat],
          zoom: zoom,
          attributionControl: false,
          projection: 'globe',
          failIfMajorPerformanceCaveat: false, // Allow map to render even if performance might be poor
          preserveDrawingBuffer: true // Helps with rendering issues
        });
      } catch (error) {
        console.error("Error initializing Mapbox map:", error);
        toast({
          title: "Map Error",
          description: "There was an error loading the map. Please try again later.",
          variant: "destructive",
          duration: 5000,
        });
        return;
      }

      // Add error handling for map
      map.current.on('error', (e) => {
        console.error('Mapbox GL error:', e.error);
      });

      // Set up map load event
      map.current.on('load', () => {
        setMapLoaded(true);
      });

      return () => {
        try {
          if (map.current) {
            map.current.remove();
          }
        } catch (error) {
          console.error("Error removing map:", error);
        }
      };
    } catch (error) {
      console.error("Critical error in map initialization:", error);
      toast({
        title: "Map Error",
        description: "There was a critical error loading the map. Please try refreshing the page.",
        variant: "destructive",
        duration: 5000,
      });
    }
  }, [mapStyle, lng, lat, zoom, toast]);

  // Update map style when theme changes
  useEffect(() => {
    setMapStyle(theme === 'dark'
      ? 'mapbox://styles/mapbox/dark-v11'
      : 'mapbox://styles/mapbox/streets-v12');
  }, [theme]);

  // Update map when map style changes
  useEffect(() => {
    if (!map.current || !mapLoaded) return;
    map.current.setStyle(mapStyle);
  }, [mapStyle, mapLoaded]);

  // Try to detect location on initial load
  useEffect(() => {
    // Short delay to allow the component to fully mount
    const timer = setTimeout(() => {
      detectUserLocation();
    }, 1000);

    return () => clearTimeout(timer);
  }, [detectUserLocation]);

  // Store previous location to prevent unnecessary refreshes
  const prevLocationRef = useRef<{lat: number, lng: number} | null>(null);

  // Fetch stations when user location changes
  useEffect(() => {
    if (userLocation) {
      // Check if location has significantly changed to avoid unnecessary refreshes
      const hasLocationChanged = !prevLocationRef.current ||
        Math.abs(prevLocationRef.current.lat - userLocation.lat) > 0.01 ||
        Math.abs(prevLocationRef.current.lng - userLocation.lng) > 0.01;

      // Update map center
      if (map.current && mapLoaded) {
        map.current.flyTo({
          center: [userLocation.lng, userLocation.lat],
          zoom: 12,
          essential: true
        });
      }

      // Only fetch stations if location has changed significantly
      if (hasLocationChanged) {
        // Fetch stations
        fetchStationsFromOverpass(userLocation.lat, userLocation.lng, distanceFilter * 1609); // Convert miles to meters

        // Update previous location
        prevLocationRef.current = {
          lat: userLocation.lat,
          lng: userLocation.lng
        };
      }
    }
  }, [userLocation, mapLoaded, fetchStationsFromOverpass, distanceFilter]);

  // Update map markers when stations change
  useEffect(() => {
    if (!map.current || !mapLoaded || filteredStations.length === 0) return;

    // Remove existing station markers
    const existingMarkers = document.querySelectorAll('.station-marker');
    existingMarkers.forEach(marker => marker.remove());

    // Add user location marker if available
    if (userLocation) {
      // Create a custom marker element for user location
      const userMarkerEl = document.createElement('div');
      userMarkerEl.className = 'user-marker';
      userMarkerEl.innerHTML = `
        <div class="w-6 h-6 bg-blue-500 border-2 border-white rounded-full flex items-center justify-center animate-pulse">
          <div class="w-2 h-2 bg-white rounded-full"></div>
        </div>
      `;

      // Add new user marker
      new mapboxgl.Marker(userMarkerEl)
        .setLngLat([userLocation.lng, userLocation.lat])
        .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML('<div style="padding: 8px;"><strong>Your Location</strong></div>'))
        .addTo(map.current);
    }

    // Add station markers
    filteredStations.forEach(station => {
      // Create a custom marker element
      const el = document.createElement('div');
      el.className = 'station-marker';

      // Determine marker color based on station properties
      let markerColor = 'bg-gray-500';
      if (station.isOpen) {
        if (station.priceRegular < 3.0) markerColor = 'bg-green-500';
        else if (station.priceRegular < 3.5) markerColor = 'bg-yellow-500';
        else markerColor = 'bg-red-500';
      }

      // Create marker HTML
      el.innerHTML = `
        <div class="w-8 h-8 ${markerColor} rounded-full border-2 border-white shadow-md flex items-center justify-center transition-transform hover:scale-110 cursor-pointer">
          <span class="text-white text-xs font-bold">$${station.priceRegular.toFixed(2).split('.')[0]}</span>
        </div>
      `;

      // Create popup content
      const popupContent = `
        <div class="p-2 max-w-[250px]">
          <h3 class="font-bold text-sm">${station.name}</h3>
          <div class="text-xs text-gray-500 mb-2">${station.address}</div>
          <div class="flex items-center text-xs mb-1">
            <span class="flex items-center mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-yellow-500 mr-1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              ${station.rating}
            </span>
            <span class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-500 mr-1"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              ${station.isOpen ? 'Open' : 'Closed'}
            </span>
          </div>
          <div class="grid grid-cols-3 gap-1 text-xs mb-2">
            ${station.fuelTypes.includes('regular') ? `<div class="bg-gray-100 p-1 rounded text-center">Regular: $${station.priceRegular.toFixed(2)}</div>` : ''}
            ${station.fuelTypes.includes('premium') ? `<div class="bg-gray-100 p-1 rounded text-center">Premium: $${station.pricePremium.toFixed(2)}</div>` : ''}
            ${station.fuelTypes.includes('diesel') ? `<div class="bg-gray-100 p-1 rounded text-center">Diesel: $${station.priceDiesel.toFixed(2)}</div>` : ''}
          </div>
          <div class="flex justify-between">
            <button onclick="window.viewStationDetails(${station.id})" class="text-xs bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded">Details</button>
            <button onclick="window.getDirections(${station.id})" class="text-xs bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded">Directions</button>
          </div>
        </div>
      `;

      // Create popup
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(popupContent);

      // Add marker to map
      new mapboxgl.Marker(el)
        .setLngLat(station.coordinates)
        .setPopup(popup)
        .addTo(map.current);
    });

    // Add global functions to handle popup button clicks
    window.viewStationDetails = (stationId) => {
      const station = filteredStations.find(s => s.id === stationId);
      if (station) {
        setSelectedStation(station);
        setShowStationDetails(true);
      }
    };

    window.getDirections = (stationId) => {
      const station = filteredStations.find(s => s.id === stationId);
      if (station && userLocation) {
        // Open directions in Google Maps
        window.open(`https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${station.coordinates[1]},${station.coordinates[0]}&travelmode=driving`, '_blank');
      } else {
        toast({
          title: "Location Required",
          description: "Please enable location services to get directions.",
          variant: "destructive",
          duration: 3000,
        });
      }
    };
  }, [filteredStations, mapLoaded, userLocation, toast]);

  // Apply filters and sorting
  useEffect(() => {
    if (stations.length === 0) return;

    let filtered = [...stations];

    // Apply search filter
    if (searchInput.trim() !== "") {
      const searchTerm = searchInput.toLowerCase();
      filtered = filtered.filter(
        station =>
          station.name.toLowerCase().includes(searchTerm) ||
          station.address.toLowerCase().includes(searchTerm)
      );
    }

    // Apply fuel type filters
    filtered = filtered.filter(station => {
      if (fuelTypeFilters.regular && station.fuelTypes.includes("regular")) return true;
      if (fuelTypeFilters.premium && station.fuelTypes.includes("premium")) return true;
      if (fuelTypeFilters.diesel && station.fuelTypes.includes("diesel")) return true;
      return false;
    });

    // Apply distance filter
    if (userLocation && distanceFilter > 0) {
      filtered = filtered.filter(station => station.distanceValue <= distanceFilter);
    }

    // Apply rating filter
    if (ratingFilter > 0) {
      filtered = filtered.filter(station => parseFloat(station.rating.toString()) >= ratingFilter);
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

    // Apply sorting
    switch (sortOption) {
      case "distance":
        filtered.sort((a, b) => a.distanceValue - b.distanceValue);
        break;
      case "price":
        filtered.sort((a, b) => a.priceRegular - b.priceRegular);
        break;
      case "rating":
        filtered.sort((a, b) => parseFloat(b.rating.toString()) - parseFloat(a.rating.toString()));
        break;
      default:
        break;
    }

    setFilteredStations(filtered);
  }, [stations, searchInput, sortOption, distanceFilter, ratingFilter, amenityFilters, fuelTypeFilters, userLocation]);

  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <main className="flex-1 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 text-center dark:text-white">
            Find Nearby Fuel Stations
          </h1>

          {/* Search and Location Selection */}
          <div className="max-w-4xl mx-auto mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-colors duration-300"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor="country" className="text-sm font-medium mb-1 block dark:text-gray-300">
                    Country
                  </Label>
                  <Select
                    value={selectedCountry}
                    onValueChange={(value) => {
                      setSelectedCountry(value);
                      // Don't immediately fetch stations when country changes
                      // Wait for city selection
                    }}
                  >
                    <SelectTrigger className="w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                    <SelectContent className="max-h-80 dark:bg-gray-800 dark:border-gray-700">
                      {countries.map((country) => (
                        <SelectItem
                          key={country.code}
                          value={country.code}
                          className="dark:text-gray-300 dark:hover:bg-gray-700"
                        >
                          {country.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="city" className="text-sm font-medium mb-1 block dark:text-gray-300">
                    City
                  </Label>
                  <Select
                    value={selectedCity}
                    onValueChange={(value) => {
                      setSelectedCity(value);

                      // Find the selected city's coordinates
                      if (value && selectedCountry) {
                        // Show loading state
                        setLoading(true);

                        // Get country name
                        const countryName = countries.find(c => c.code === selectedCountry)?.name || "";

                        // Always generate coordinates for the selected city to ensure it works
                        // This is a simplified approach that guarantees a location is set
                        const generateCoordinates = () => {
                          // Define continent centers
                          const regionCoordinates: Record<string, [number, number]> = {
                            'EU': [50, 10],    // Europe
                            'AS': [35, 105],   // Asia
                            'AF': [0, 20],     // Africa
                            'NA': [40, -100],  // North America
                            'SA': [-20, -60],  // South America
                            'OC': [-25, 135],  // Oceania
                            'AN': [-80, 0]     // Antarctica
                          };

                          // Map country codes to continents
                          const continentMap: Record<string, string> = {
                            // Europe
                            'AL': 'EU', 'AD': 'EU', 'AT': 'EU', 'BE': 'EU', 'BA': 'EU', 'BG': 'EU', 'HR': 'EU',
                            'CY': 'EU', 'CZ': 'EU', 'DK': 'EU', 'EE': 'EU', 'FI': 'EU', 'FR': 'EU', 'DE': 'EU',
                            'GR': 'EU', 'HU': 'EU', 'IS': 'EU', 'IE': 'EU', 'IT': 'EU', 'LV': 'EU', 'LI': 'EU',
                            'LT': 'EU', 'LU': 'EU', 'MT': 'EU', 'MC': 'EU', 'ME': 'EU', 'NL': 'EU', 'MK': 'EU',
                            'NO': 'EU', 'PL': 'EU', 'PT': 'EU', 'RO': 'EU', 'SM': 'EU', 'RS': 'EU', 'SK': 'EU',
                            'SI': 'EU', 'ES': 'EU', 'SE': 'EU', 'CH': 'EU', 'GB': 'EU', 'VA': 'EU', 'UK': 'EU',

                            // Asia
                            'AF': 'AS', 'AM': 'AS', 'AZ': 'AS', 'BH': 'AS', 'BD': 'AS', 'BT': 'AS', 'BN': 'AS',
                            'KH': 'AS', 'CN': 'AS', 'GE': 'AS', 'IN': 'AS', 'ID': 'AS', 'IR': 'AS', 'IQ': 'AS',
                            'IL': 'AS', 'JP': 'AS', 'JO': 'AS', 'KZ': 'AS', 'KW': 'AS', 'KG': 'AS', 'LA': 'AS',
                            'LB': 'AS', 'MY': 'AS', 'MV': 'AS', 'MN': 'AS', 'MM': 'AS', 'NP': 'AS', 'KP': 'AS',
                            'OM': 'AS', 'PK': 'AS', 'PS': 'AS', 'PH': 'AS', 'QA': 'AS', 'SA': 'AS', 'SG': 'AS',
                            'KR': 'AS', 'LK': 'AS', 'SY': 'AS', 'TW': 'AS', 'TJ': 'AS', 'TH': 'AS', 'TR': 'AS',
                            'TM': 'AS', 'AE': 'AS', 'UZ': 'AS', 'VN': 'AS', 'YE': 'AS',

                            // Africa
                            'DZ': 'AF', 'AO': 'AF', 'BJ': 'AF', 'BW': 'AF', 'BF': 'AF', 'BI': 'AF', 'CV': 'AF',
                            'CM': 'AF', 'CF': 'AF', 'TD': 'AF', 'KM': 'AF', 'CD': 'AF', 'CG': 'AF', 'CI': 'AF',
                            'DJ': 'AF', 'EG': 'AF', 'GQ': 'AF', 'ER': 'AF', 'SZ': 'AF', 'ET': 'AF', 'GA': 'AF',
                            'GM': 'AF', 'GH': 'AF', 'GN': 'AF', 'GW': 'AF', 'KE': 'AF', 'LS': 'AF', 'LR': 'AF',
                            'LY': 'AF', 'MG': 'AF', 'MW': 'AF', 'ML': 'AF', 'MR': 'AF', 'MU': 'AF', 'MA': 'AF',
                            'MZ': 'AF', 'NA': 'AF', 'NE': 'AF', 'NG': 'AF', 'RW': 'AF', 'ST': 'AF', 'SN': 'AF',
                            'SC': 'AF', 'SL': 'AF', 'SO': 'AF', 'ZA': 'AF', 'SS': 'AF', 'SD': 'AF', 'TZ': 'AF',
                            'TG': 'AF', 'TN': 'AF', 'UG': 'AF', 'ZM': 'AF', 'ZW': 'AF',

                            // North America
                            'AG': 'NA', 'BS': 'NA', 'BB': 'NA', 'BZ': 'NA', 'CA': 'NA', 'CR': 'NA', 'CU': 'NA',
                            'DM': 'NA', 'DO': 'NA', 'SV': 'NA', 'GD': 'NA', 'GT': 'NA', 'HT': 'NA', 'HN': 'NA',
                            'JM': 'NA', 'MX': 'NA', 'NI': 'NA', 'PA': 'NA', 'KN': 'NA', 'LC': 'NA', 'VC': 'NA',
                            'TT': 'NA', 'US': 'NA',

                            // South America
                            'AR': 'SA', 'BO': 'SA', 'BR': 'SA', 'CL': 'SA', 'CO': 'SA', 'EC': 'SA', 'GY': 'SA',
                            'PY': 'SA', 'PE': 'SA', 'SR': 'SA', 'UY': 'SA', 'VE': 'SA',

                            // Oceania
                            'AU': 'OC', 'FJ': 'OC', 'KI': 'OC', 'MH': 'OC', 'FM': 'OC', 'NR': 'OC', 'NZ': 'OC',
                            'PW': 'OC', 'PG': 'OC', 'WS': 'OC', 'SB': 'OC', 'TO': 'OC', 'TV': 'OC', 'VU': 'OC'
                          };

                          const continent = continentMap[selectedCountry] || 'EU'; // Default to Europe if unknown
                          const [baseLat, baseLng] = regionCoordinates[continent] || [0, 0];

                          // Add some randomness (±3 degrees) - smaller range for more realistic locations
                          const randomLat = baseLat + (Math.random() * 6 - 3);
                          const randomLng = baseLng + (Math.random() * 6 - 3);

                          return { lat: randomLat, lng: randomLng };
                        };

                        // First try to find in our cities data
                        const selectedCityObj = availableCities.find(city => city.name === value);

                        if (selectedCityObj && selectedCityObj.latitude && selectedCityObj.longitude) {
                          // If we have coordinates for this city, use them
                          setUserLocation({
                            lat: selectedCityObj.latitude,
                            lng: selectedCityObj.longitude
                          });

                          toast({
                            title: "Location Updated",
                            description: `Showing stations in ${value}, ${countryName}`,
                            duration: 2000,
                          });
                          setLoading(false);
                        } else {
                          // Try to geocode the location
                          geocodeLocation(value, selectedCountry)
                            .then(location => {
                              if (location) {
                                // If geocoding succeeded, use the coordinates
                                setUserLocation(location);

                                toast({
                                  title: "Location Updated",
                                  description: `Showing stations in ${value}, ${countryName}`,
                                  duration: 2000,
                                });
                              } else {
                                // If geocoding failed, use our generated coordinates
                                const coordinates = generateCoordinates();
                                setUserLocation(coordinates);

                                toast({
                                  title: "Location Set",
                                  description: `Showing stations in ${value}, ${countryName}`,
                                  duration: 2000,
                                });
                              }
                            })
                            .catch(() => {
                              // If geocoding throws an error, use our generated coordinates
                              const coordinates = generateCoordinates();
                              setUserLocation(coordinates);

                              toast({
                                title: "Location Set",
                                description: `Showing stations in ${value}, ${countryName}`,
                                duration: 2000,
                              });
                            })
                            .finally(() => {
                              // Hide loading state after geocoding attempt
                              setLoading(false);
                            });
                        }
                      }
                    }}
                    disabled={!selectedCountry || availableCities.length === 0}
                  >
                    <SelectTrigger className="w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      <SelectValue placeholder={!selectedCountry ? "Select a country first" : "Select a city"} />
                    </SelectTrigger>
                    <SelectContent className="max-h-80 dark:bg-gray-800 dark:border-gray-700">
                      {availableCities.map((city) => (
                        <SelectItem
                          key={`${city.countryCode}-${city.name}`}
                          value={city.name}
                          className="dark:text-gray-300 dark:hover:bg-gray-700"
                        >
                          {city.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search by station name or address..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                />
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <Button
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-700 dark:hover:bg-blue-800 transition-colors duration-300"
                  onClick={detectUserLocation}
                  disabled={isLocating}
                >
                  {isLocating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Detecting...
                    </>
                  ) : (
                    <>
                      <Locate className="mr-2 h-4 w-4" />
                      Detect My Location
                    </>
                  )}
                </Button>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter className="mr-2 h-4 w-4" />
                    Filters
                  </Button>

                  <Select
                    value={sortOption}
                    onValueChange={(value) => setSortOption(value)}
                  >
                    <SelectTrigger className="w-[160px] dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                      <SelectItem value="distance" className="dark:text-gray-300 dark:hover:bg-gray-700">Distance</SelectItem>
                      <SelectItem value="price" className="dark:text-gray-300 dark:hover:bg-gray-700">Price (Low to High)</SelectItem>
                      <SelectItem value="rating" className="dark:text-gray-300 dark:hover:bg-gray-700">Rating (High to Low)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {locationError && (
                <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-md text-sm">
                  <AlertTriangle className="inline-block mr-2 h-4 w-4" />
                  {locationError}
                </div>
              )}

              {userLocation && (
                <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-md text-sm">
                  <MapPin className="inline-block mr-2 h-4 w-4" />
                  Using location: {selectedCity ? `${selectedCity}, ` : ''}
                  {selectedCountry ? countries.find(c => c.code === selectedCountry)?.name : 'Unknown'}
                </div>
              )}
            </motion.div>
          </div>

          {/* Filters Panel - Will be expanded in next edit */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="max-w-4xl mx-auto mb-8 overflow-hidden"
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-colors duration-300">
                  <h3 className="text-lg font-semibold mb-4 dark:text-white">Filter Options</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium mb-2 dark:text-gray-300">Fuel Types</h4>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Checkbox
                            id="regular"
                            checked={fuelTypeFilters.regular}
                            onCheckedChange={(checked) =>
                              setFuelTypeFilters(prev => ({ ...prev, regular: !!checked }))
                            }
                            className="mr-2 dark:border-gray-600"
                          />
                          <Label htmlFor="regular" className="text-sm dark:text-gray-300">Regular Gasoline</Label>
                        </div>

                        <div className="flex items-center">
                          <Checkbox
                            id="premium"
                            checked={fuelTypeFilters.premium}
                            onCheckedChange={(checked) =>
                              setFuelTypeFilters(prev => ({ ...prev, premium: !!checked }))
                            }
                            className="mr-2 dark:border-gray-600"
                          />
                          <Label htmlFor="premium" className="text-sm dark:text-gray-300">Premium Gasoline</Label>
                        </div>

                        <div className="flex items-center">
                          <Checkbox
                            id="diesel"
                            checked={fuelTypeFilters.diesel}
                            onCheckedChange={(checked) =>
                              setFuelTypeFilters(prev => ({ ...prev, diesel: !!checked }))
                            }
                            className="mr-2 dark:border-gray-600"
                          />
                          <Label htmlFor="diesel" className="text-sm dark:text-gray-300">Diesel</Label>
                        </div>
                      </div>

                      <h4 className="text-sm font-medium mt-4 mb-2 dark:text-gray-300">Distance (miles)</h4>
                      <div className="px-2">
                        <Slider
                          value={[distanceFilter]}
                          min={1}
                          max={20}
                          step={1}
                          onValueChange={(value) => setDistanceFilter(value[0])}
                          className="dark:bg-gray-700"
                        />
                        <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
                          <span>1 mile</span>
                          <span>{distanceFilter} miles</span>
                          <span>20 miles</span>
                        </div>
                      </div>

                      <h4 className="text-sm font-medium mt-4 mb-2 dark:text-gray-300">Minimum Rating</h4>
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <button
                            key={rating}
                            type="button"
                            onClick={() => setRatingFilter(rating)}
                            className={`p-1 rounded-md transition-colors ${
                              ratingFilter >= rating
                                ? 'text-yellow-500'
                                : 'text-gray-300 dark:text-gray-600'
                            }`}
                          >
                            <Star className="h-5 w-5" fill={ratingFilter >= rating ? 'currentColor' : 'none'} />
                          </button>
                        ))}
                        <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                          {ratingFilter > 0 ? `${ratingFilter}+ stars` : 'Any rating'}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2 dark:text-gray-300">Amenities</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(amenityFilters).map(([amenity, checked]) => (
                          <div key={amenity} className="flex items-center">
                            <Checkbox
                              id={`amenity-${amenity}`}
                              checked={checked}
                              onCheckedChange={(checked) =>
                                setAmenityFilters(prev => ({ ...prev, [amenity]: !!checked }))
                              }
                              className="mr-2 dark:border-gray-600"
                            />
                            <Label htmlFor={`amenity-${amenity}`} className="text-sm dark:text-gray-300 flex items-center">
                              <span className="mr-1">
                                {amenityIcons[amenity] || amenityIcons.default}
                              </span>
                              {amenity}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end mt-6">
                    <Button
                      variant="outline"
                      className="mr-2 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                      onClick={() => {
                        // Reset filters to default
                        setFuelTypeFilters({ regular: true, premium: true, diesel: true });
                        setDistanceFilter(10);
                        setRatingFilter(0);
                        setAmenityFilters({
                          "ATM": false,
                          "Car Wash": false,
                          "Convenience Store": false,
                          "Restrooms": false,
                          "EV Charging": false,
                          "Food Court": false,
                          "Coffee Shop": false,
                          "WiFi": false,
                        });
                      }}
                    >
                      Reset Filters
                    </Button>
                    <Button
                      className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-700 dark:hover:bg-blue-800"
                      onClick={() => {
                        setShowFilters(false);
                        toast({
                          title: "Filters Applied",
                          description: "Your filter settings have been applied",
                          duration: 2000,
                        });
                      }}
                    >
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Station Results */}
          <div className="max-w-6xl mx-auto">
            {loading ? (
              <div className="text-center py-12">
                <div className="w-12 h-12 border-4 border-t-blue-600 border-blue-200 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-500 dark:text-gray-400">Loading nearby stations...</p>
              </div>
            ) : (
              <Tabs defaultValue="list" className="w-full">
                <div className="flex justify-between items-center mb-6">
                  <TabsList>
                    <TabsTrigger value="list" className="dark:data-[state=active]:bg-gray-700 dark:text-gray-300">
                      List View
                    </TabsTrigger>
                    <TabsTrigger value="map" className="dark:data-[state=active]:bg-gray-700 dark:text-gray-300">
                      Map View
                    </TabsTrigger>
                  </TabsList>

                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {filteredStations.length === 0 ? (
                      <span>No stations found</span>
                    ) : (
                      <div className="flex items-center">
                        <Globe size={14} className="mr-1" />
                        Showing {filteredStations.length} stations
                        {selectedCity ? ` in ${selectedCity}` : ''}
                        {selectedCountry ? `, ${countries.find(c => c.code === selectedCountry)?.name}` : ''}
                      </div>
                    )}
                  </div>
                </div>

                <TabsContent value="list" className="mt-0">
                  {filteredStations.length === 0 ? (
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 text-center transition-colors duration-300">
                      <div className="mb-4 text-gray-400 dark:text-gray-500">
                        <AlertTriangle size={48} className="mx-auto" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2 dark:text-white">No Stations Found</h3>
                      <p className="text-gray-500 dark:text-gray-400 mb-4">
                        We couldn't find any fuel stations matching your criteria.
                      </p>
                      <Button
                        variant="outline"
                        className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                        onClick={() => {
                          // Reset filters
                          setFuelTypeFilters({ regular: true, premium: true, diesel: true });
                          setDistanceFilter(10);
                          setRatingFilter(0);
                          setAmenityFilters({
                            "ATM": false,
                            "Car Wash": false,
                            "Convenience Store": false,
                            "Restrooms": false,
                            "EV Charging": false,
                            "Food Court": false,
                            "Coffee Shop": false,
                            "WiFi": false,
                          });
                          setSearchInput("");
                        }}
                      >
                        Reset Filters
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredStations.map((station) => (
                        <motion.div
                          key={station.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          whileHover={{ y: -5 }}
                          className="h-full"
                        >
                          <Card className="overflow-hidden h-full flex flex-col border-2 hover:border-blue-500 transition-all duration-300 dark:bg-gray-800 dark:border-gray-700">
                            <div className="h-36 sm:h-48 bg-gray-200 dark:bg-gray-700 relative overflow-hidden group">
                              {station.image ? (
                                <motion.img
                                  src={station.image}
                                  alt={station.name}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                  whileHover={{ scale: 1.05 }}
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                                  <MapPin size={40} className="text-gray-400" />
                                </div>
                              )}
                              <Badge
                                className={`absolute top-2 right-2 ${
                                  station.isOpen ? 'bg-green-500 dark:bg-green-600' : 'bg-red-500 dark:bg-red-600'
                                } transition-all duration-300 hover:scale-110`}
                              >
                                {station.isOpen ? 'Open Now' : 'Closed'}
                              </Badge>

                              <div className="absolute bottom-2 left-2 flex space-x-1">
                                {station.fuelTypes.includes('regular') && (
                                  <Badge className="bg-blue-500 dark:bg-blue-600">Regular</Badge>
                                )}
                                {station.fuelTypes.includes('premium') && (
                                  <Badge className="bg-purple-500 dark:bg-purple-600">Premium</Badge>
                                )}
                                {station.fuelTypes.includes('diesel') && (
                                  <Badge className="bg-yellow-500 dark:bg-yellow-600">Diesel</Badge>
                                )}
                              </div>
                            </div>

                            <CardContent className="flex-grow p-4">
                              <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-lg dark:text-white line-clamp-1">{station.name}</h3>
                                <div className="flex items-center">
                                  <Star className="h-4 w-4 text-yellow-500 mr-1 fill-current" />
                                  <span className="text-sm font-medium dark:text-gray-300">{station.rating}</span>
                                </div>
                              </div>

                              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">{station.address}</p>

                              <div className="grid grid-cols-3 gap-2 mb-3 max-w-full overflow-hidden">
                                {station.fuelTypes.includes('regular') && (
                                  <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-md text-center">
                                    <div className="text-xs text-gray-500 dark:text-gray-400 truncate">Regular</div>
                                    <div className="font-bold dark:text-white text-sm sm:text-base">${station.priceRegular.toFixed(2)}</div>
                                  </div>
                                )}

                                {station.fuelTypes.includes('premium') && (
                                  <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-md text-center">
                                    <div className="text-xs text-gray-500 dark:text-gray-400 truncate">Premium</div>
                                    <div className="font-bold dark:text-white text-sm sm:text-base">${station.pricePremium.toFixed(2)}</div>
                                  </div>
                                )}

                                {station.fuelTypes.includes('diesel') && (
                                  <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-md text-center">
                                    <div className="text-xs text-gray-500 dark:text-gray-400 truncate">Diesel</div>
                                    <div className="font-bold dark:text-white text-sm sm:text-base">${station.priceDiesel.toFixed(2)}</div>
                                  </div>
                                )}
                              </div>

                              <div className="flex flex-wrap gap-1 mb-3">
                                {station.amenities.slice(0, 4).map((amenity, index) => (
                                  <Badge key={index} variant="outline" className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600">
                                    <span className="mr-1">
                                      {amenityIcons[amenity] || amenityIcons.default}
                                    </span>
                                    {amenity}
                                  </Badge>
                                ))}
                                {station.amenities.length > 4 && (
                                  <Badge variant="outline" className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600">
                                    +{station.amenities.length - 4} more
                                  </Badge>
                                )}
                              </div>

                              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                                <div className="flex items-center">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {station.openTime}
                                </div>
                                <div className="flex items-center">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {station.distance}
                                </div>
                              </div>
                            </CardContent>

                            <CardFooter className="p-4 pt-0 flex flex-col sm:flex-row gap-2 sm:gap-0 sm:justify-between">
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full sm:w-[48%] dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                                onClick={() => {
                                  if (userLocation) {
                                    window.open(`https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${station.coordinates[1]},${station.coordinates[0]}&travelmode=driving`, '_blank');
                                  } else {
                                    toast({
                                      title: "Location Required",
                                      description: "Please enable location services to get directions.",
                                      variant: "destructive",
                                      duration: 3000,
                                    });
                                  }
                                }}
                              >
                                <Navigation className="h-4 w-4 mr-1" />
                                Directions
                              </Button>

                              <Button
                                size="sm"
                                className="w-full sm:w-[48%] bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                                onClick={() => {
                                  setSelectedStation(station);
                                  setShowStationDetails(true);
                                }}
                              >
                                <Info className="h-4 w-4 mr-1" />
                                Details
                              </Button>
                            </CardFooter>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="map" className="mt-0">
                  <div className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden transition-colors duration-300 ${mapFullscreen ? 'fixed inset-0 z-50' : 'h-[700px]'}`}>
                    <div className="absolute top-4 right-4 z-10 flex gap-2">
                      <div className="bg-white dark:bg-gray-800 rounded-md shadow-md p-2 transition-colors duration-300">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setMapFullscreen(!mapFullscreen)}
                          className="h-8 w-8 dark:text-gray-300 dark:hover:bg-gray-700"
                        >
                          {mapFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
                        </Button>
                      </div>
                      <div className="bg-white dark:bg-gray-800 rounded-md shadow-md p-2 transition-colors duration-300">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setMapStyle(
                              mapStyle === 'mapbox://styles/mapbox/streets-v12'
                                ? 'mapbox://styles/mapbox/satellite-streets-v12'
                                : 'mapbox://styles/mapbox/streets-v12'
                            );
                          }}
                          className="h-8 w-8 dark:text-gray-300 dark:hover:bg-gray-700"
                        >
                          <Layers size={16} />
                        </Button>
                      </div>
                    </div>

                    <div
                      ref={mapContainer}
                      className="w-full h-full"
                      style={{ minHeight: mapFullscreen ? '100vh' : '700px' }}
                    />

                    {mapFullscreen && (
                      <div className="absolute bottom-4 left-4 z-10">
                        <Button
                          className="bg-white text-black hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 transition-colors duration-300"
                          onClick={() => setMapFullscreen(false)}
                        >
                          Exit Fullscreen
                        </Button>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            )}
          </div>

          {/* Station Details Dialog */}
          <Dialog open={showStationDetails} onOpenChange={setShowStationDetails}>
            <DialogContent className="sm:max-w-3xl dark:bg-gray-800 dark:border-gray-700 transition-colors duration-300">
              {selectedStation && (
                <>
                  <DialogHeader>
                    <DialogTitle className="text-xl dark:text-white">{selectedStation.name}</DialogTitle>
                    <DialogDescription className="dark:text-gray-400">
                      {selectedStation.address}
                    </DialogDescription>
                  </DialogHeader>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden mb-4">
                        {selectedStation.image ? (
                          <img
                            src={selectedStation.image}
                            alt={selectedStation.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <MapPin size={48} className="text-gray-400" />
                          </div>
                        )}
                      </div>

                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center">
                          <Badge className={selectedStation.isOpen ? 'bg-green-500 dark:bg-green-600' : 'bg-red-500 dark:bg-red-600'}>
                            {selectedStation.isOpen ? 'Open Now' : 'Closed'}
                          </Badge>
                          <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">{selectedStation.openTime}</span>
                        </div>

                        <div className="flex items-center">
                          <Star className="h-5 w-5 text-yellow-500 fill-current mr-1" />
                          <span className="font-bold dark:text-white">{selectedStation.rating}</span>
                          <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">({selectedStation.reviews.length} reviews)</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h3 className="text-sm font-medium mb-2 dark:text-white">Fuel Prices</h3>
                        <div className="grid grid-cols-3 gap-2">
                          {selectedStation.fuelTypes.includes('regular') && (
                            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md text-center">
                              <div className="text-xs text-gray-500 dark:text-gray-400">Regular</div>
                              <div className="font-bold text-lg dark:text-white">${selectedStation.priceRegular.toFixed(2)}</div>
                            </div>
                          )}

                          {selectedStation.fuelTypes.includes('premium') && (
                            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md text-center">
                              <div className="text-xs text-gray-500 dark:text-gray-400">Premium</div>
                              <div className="font-bold text-lg dark:text-white">${selectedStation.pricePremium.toFixed(2)}</div>
                            </div>
                          )}

                          {selectedStation.fuelTypes.includes('diesel') && (
                            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md text-center">
                              <div className="text-xs text-gray-500 dark:text-gray-400">Diesel</div>
                              <div className="font-bold text-lg dark:text-white">${selectedStation.priceDiesel.toFixed(2)}</div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mb-4">
                        <h3 className="text-sm font-medium mb-2 dark:text-white">Amenities</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedStation.amenities.map((amenity, index) => (
                            <Badge key={index} variant="outline" className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600">
                              <span className="mr-1">
                                {amenityIcons[amenity] || amenityIcons.default}
                              </span>
                              {amenity}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="mb-4">
                        <h3 className="text-sm font-medium mb-2 dark:text-white">Contact</h3>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <Phone className="h-4 w-4 mr-2" />
                          {selectedStation.phoneNumber}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-2 dark:text-white">Reviews</h3>
                      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                        {selectedStation.reviews.map((review) => (
                          <div key={review.id} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                            <div className="flex justify-between items-center mb-1">
                              <div className="flex items-center">
                                <span className="font-medium dark:text-white">{review.username}</span>
                                {review.verified && (
                                  <Badge className="ml-2 bg-green-500 dark:bg-green-600 text-[10px] py-0">Verified</Badge>
                                )}
                              </div>
                              <span className="text-xs text-gray-500 dark:text-gray-400">{review.date}</span>
                            </div>

                            <div className="flex items-center mb-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-3 w-3 ${
                                    star <= review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300 dark:text-gray-600'
                                  }`}
                                />
                              ))}
                            </div>

                            <p className="text-sm text-gray-600 dark:text-gray-300">{review.text}</p>

                            <div className="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
                              <button className="flex items-center mr-3 hover:text-gray-700 dark:hover:text-gray-200">
                                <ThumbsUp className="h-3 w-3 mr-1" />
                                Helpful ({review.helpfulCount})
                              </button>
                              <button className="flex items-center hover:text-gray-700 dark:hover:text-gray-200">
                                <ThumbsDown className="h-3 w-3 mr-1" />
                                Not helpful
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <DialogFooter>
                    <Button
                      variant="outline"
                      className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                      onClick={() => setShowStationDetails(false)}
                    >
                      Close
                    </Button>

                    <Button
                      className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                      onClick={() => {
                        if (userLocation) {
                          window.open(`https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${selectedStation.coordinates[1]},${selectedStation.coordinates[0]}&travelmode=driving`, '_blank');
                        } else {
                          toast({
                            title: "Location Required",
                            description: "Please enable location services to get directions.",
                            variant: "destructive",
                            duration: 3000,
                          });
                        }
                      }}
                    >
                      <Navigation className="h-4 w-4 mr-2" />
                      Get Directions
                    </Button>
                  </DialogFooter>
                </>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NearbyStationsNew;
