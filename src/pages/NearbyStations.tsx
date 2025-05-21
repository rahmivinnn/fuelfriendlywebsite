<<<<<<< HEAD
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
=======
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Star, ChevronDown, Filter, Navigation, Clock, Phone, Car, Shell, TrendingUp, AlertTriangle, Globe, Maximize, Minimize, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
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
    "Shell Express Fuel Center", "Exxon Fuel Center", "Chevron Fuel & Go", "BP Premium Fuel Center",
    "Marathon Fuel Stop", "Citgo Quick Fuel", "Texaco Fuel Stop", "Mobil Fuel Plus",
    "Sunoco Ultra Fuel Center", "Phillips 66 Fuel Center", "Valero Fresh Fuel", "Gulf Express Fuel",
    "ARCO Fuel Point", "ConocoPhillips Fuel Center", "Speedway Fuel Junction", "76 Fuel & Market",
    "Circle K Fuel Center", "QuikTrip Fuel", "RaceTrac Fuel & Goods", "Wawa Fuel Center"
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
      address: `${randomStreetNumber} ${randomStreetName}, Tirana, Albania`,
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

// Set your Mapbox access token here
mapboxgl.accessToken = 'pk.eyJ1IjoiZnVlbGZyaWVuZGx5MjAyNSIsImEiOiJjbTlzZGZsOHowMW00Mm1xNGEzcHhzYnQ4In0.5K8rY561eFLN2hy0U7QPdw';

// Fix for Mapbox GL JS in environments where the bundler doesn't properly handle browser-specific dependencies
if (!mapboxgl.supported()) {
  console.warn('Your browser does not support Mapbox GL');
}

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

  // Map related states
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapFullscreen, setMapFullscreen] = useState(false);
  const [mapStyle, setMapStyle] = useState('mapbox://styles/mapbox/streets-v12');
  const [lng, setLng] = useState(19.8187); // Default to Albania
  const [lat, setLat] = useState(41.3275);
  const [zoom, setZoom] = useState(7);

  // Country and city selection
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [availableCities, setAvailableCities] = useState([]);

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

  // Filter cities based on selected country
  useEffect(() => {
    if (selectedCountry) {
      const filteredCities = cities.filter(city => city.countryCode === selectedCountry);
      setAvailableCities(filteredCities);
      setSelectedCity("");
    } else {
      setAvailableCities([]);
    }
  }, [selectedCountry]);

  // Initialize station data
  useEffect(() => {
    const generatedStations = generateStationsData();
    setAllStations(generatedStations);
    setFilteredStations(generatedStations);

    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Fuel Centers Loaded",
        description: "Nearby fuel centers data has been updated",
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

  // User location state
  const [userLocation, setUserLocation] = useState(null);
  const [userCountry, setUserCountry] = useState("");
  const [userCity, setUserCity] = useState("");
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState("");

  // Function to detect user's location
  const detectUserLocation = useCallback(() => {
    setIsLocating(true);
    setLocationError("");

    // Check if geolocation is supported
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

    // Set a timeout to handle cases where geolocation hangs
    const timeoutId = setTimeout(() => {
      if (isLocating) {
        setLocationError("Location detection timed out. Please try again or select your location manually.");
        setIsLocating(false);

        toast({
          title: "Location Timeout",
          description: "Location detection is taking too long. Please try again or select your location manually.",
          variant: "destructive",
          duration: 5000,
        });
      }
    }, 15000);

    // Get current position with error handling
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        clearTimeout(timeoutId);
        const { latitude, longitude } = position.coords;

        // Update user location state
        setUserLocation({ lat: latitude, lng: longitude });

        try {
          // Reverse geocode to get country and city using Mapbox API
          const response = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxgl.accessToken}&types=country,place&limit=5`
          );

          if (response.ok) {
            const data = await response.json();

            // Extract country and city from response
            let country = "";
            let countryCode = "";
            let city = "";

            // Process features to find country and city
            data.features.forEach(feature => {
              if (feature.place_type.includes('country') && !country) {
                country = feature.text;

                // Try to find country code in our list
                const countryObj = countries.find(c =>
                  c.name.toLowerCase() === country.toLowerCase() ||
                  c.name.toLowerCase().includes(country.toLowerCase()) ||
                  country.toLowerCase().includes(c.name.toLowerCase())
                );

                if (countryObj) {
                  countryCode = countryObj.code;
                  setUserCountry(countryObj.code);
                  setSelectedCountry(countryObj.code);
                }
              }

              if (feature.place_type.includes('place') && !city) {
                city = feature.text;
                setUserCity(city);
              }
            });

            // If we found both country and city
            if (country && city) {
              console.log(`Detected location: ${city}, ${country} (${countryCode})`);

              // Wait for cities to be loaded based on country before setting selected city
              setTimeout(() => {
                // Find the closest matching city name
                const cityMatch = availableCities.find(c =>
                  c.name.toLowerCase() === city.toLowerCase() ||
                  c.name.toLowerCase().includes(city.toLowerCase()) ||
                  city.toLowerCase().includes(c.name.toLowerCase())
                );

                if (cityMatch) {
                  setSelectedCity(cityMatch.name);
                } else if (availableCities.length > 0) {
                  // If no match found but we have cities, select the first one
                  setSelectedCity(availableCities[0].name);
                }
              }, 800);

              toast({
                title: "Location Detected",
                description: `You are in ${city}, ${country}`,
                duration: 3000,
              });
            } else if (country) {
              // If we only found country
              toast({
                title: "Country Detected",
                description: `You are in ${country}`,
                duration: 3000,
              });
            } else {
              // If we couldn't determine location details
              toast({
                title: "Location Detected",
                description: "Your location was detected, but we couldn't determine your country and city. Please select them manually.",
                duration: 5000,
              });
            }
          } else {
            // Handle API error
            console.error("Mapbox geocoding API error:", await response.text());
            toast({
              title: "Location Error",
              description: "Could not determine your location details. Please select your country and city manually.",
              variant: "destructive",
              duration: 5000,
            });
          }
        } catch (error) {
          console.error("Error reverse geocoding:", error);
          toast({
            title: "Location Error",
            description: "An error occurred while determining your location details. Please select your country and city manually.",
            variant: "destructive",
            duration: 5000,
          });
        }

        setIsLocating(false);
      },
      (error) => {
        clearTimeout(timeoutId);
        console.error("Geolocation error:", error);

        // Handle specific error codes
        let errorMessage = "Unknown error getting your location.";

        switch (error.code) {
          case 1: // PERMISSION_DENIED
            errorMessage = "Location access was denied. Please enable location services in your browser settings.";
            break;
          case 2: // POSITION_UNAVAILABLE
            errorMessage = "Your location information is unavailable. Please try again later.";
            break;
          case 3: // TIMEOUT
            errorMessage = "Location request timed out. Please try again.";
            break;
        }

        setLocationError(errorMessage);
        setIsLocating(false);

        toast({
          title: "Location Error",
          description: errorMessage,
          variant: "destructive",
          duration: 5000,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 12000,  // Increased timeout for slower connections
        maximumAge: 0    // Always get fresh position
      }
    );
  }, [availableCities, toast, isLocating]);

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
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: mapStyle,
          center: [lng, lat],
          zoom: zoom,
          attributionControl: false,
          failIfMajorPerformanceCaveat: false // Allow map to render even if performance might be poor
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

      // Add navigation controls
      try {
        map.current.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
      } catch (error) {
        console.error("Error adding navigation control:", error);
      }

      // Add geolocate control with error handling
      try {
        // Custom geolocate control with callback
        const geolocateControl = new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true
          },
          trackUserLocation: true,
          showUserHeading: true
        });

        map.current.addControl(geolocateControl, 'bottom-right');

        // When user clicks the geolocate button
        geolocateControl.on('geolocate', (e) => {
          try {
            const { latitude, longitude } = e.coords;
            setUserLocation({ lat: latitude, lng: longitude });

            // Trigger our custom location detection
            detectUserLocation();
          } catch (error) {
            console.error("Error handling geolocate event:", error);
          }
        });

        // Handle geolocate errors
        geolocateControl.on('error', (e) => {
          console.error("Geolocate control error:", e.error);
          setLocationError("Error getting your location. Please try again.");
          setIsLocating(false);

          toast({
            title: "Location Error",
            description: "Could not determine your location. Please try again.",
            variant: "destructive",
            duration: 3000,
          });
        });
      } catch (error) {
        console.error("Error setting up geolocate control:", error);
      }

      // Set up map load event
      map.current.on('load', () => {
        setMapLoaded(true);

        // Try to detect user location on initial load, but don't force it
        // This makes it more reliable across different browsers and countries
        setTimeout(() => {
          try {
            // Only attempt to get location if the user hasn't manually selected a country/city
            if (!selectedCountry && !selectedCity) {
              detectUserLocation();
            }
          } catch (error) {
            console.error("Error detecting location on load:", error);
          }
        }, 1000);
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
  }, [detectUserLocation, mapStyle, lng, lat, zoom, toast, selectedCountry, selectedCity]);

  // Calculate distance between two coordinates in miles
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    if (!lat1 || !lon1 || !lat2 || !lon2) return null;

    const R = 3958.8; // Earth's radius in miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    return distance.toFixed(1);
  };

  // Update stations with real distances when user location changes
  useEffect(() => {
    if (!userLocation || allStations.length === 0) return;

    const updatedStations = allStations.map(station => {
      // Generate consistent coordinates for each station based on its ID
      // This ensures stations don't move around on each render
      const stationId = station.id;
      const seedLng = (stationId * 0.01) % 0.5;
      const seedLat = (stationId * 0.02) % 0.5;

      // Generate coordinates around user location or default center
      const stationLng = (userLocation ? userLocation.lng : lng) + (seedLng - 0.25);
      const stationLat = (userLocation ? userLocation.lat : lat) + (seedLat - 0.25);

      // Calculate real distance based on coordinates
      const distance = calculateDistance(
        userLocation ? userLocation.lat : lat,
        userLocation ? userLocation.lng : lng,
        stationLat,
        stationLng
      );

      return {
        ...station,
        coordinates: [stationLng, stationLat],
        distance: `${distance} miles`
      };
    });

    setAllStations(updatedStations);

    // If we have user location, fly to it
    if (map.current && mapLoaded && userLocation) {
      map.current.flyTo({
        center: [userLocation.lng, userLocation.lat],
        zoom: 12,
        essential: true
      });

      // Add user marker
      const userMarkerEl = document.createElement('div');
      userMarkerEl.className = 'user-location-marker';
      userMarkerEl.style.width = '20px';
      userMarkerEl.style.height = '20px';
      userMarkerEl.style.borderRadius = '50%';
      userMarkerEl.style.backgroundColor = '#3b82f6';
      userMarkerEl.style.border = '3px solid white';
      userMarkerEl.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.5)';

      // Remove existing user markers
      const existingUserMarkers = document.querySelectorAll('.user-location-marker');
      existingUserMarkers.forEach(marker => marker.remove());

      // Add new user marker
      new mapboxgl.Marker(userMarkerEl)
        .setLngLat([userLocation.lng, userLocation.lat])
        .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML('<div style="padding: 8px;"><strong>Your Location</strong></div>'))
        .addTo(map.current);
    }
  }, [userLocation, mapLoaded]);

  // Update map when stations change
  useEffect(() => {
    if (!map.current || !mapLoaded || filteredStations.length === 0) return;

    // Remove existing station markers
    const existingMarkers = document.querySelectorAll('.station-marker');
    existingMarkers.forEach(marker => marker.remove());

    // Add markers for each station
    filteredStations.forEach(station => {
      // Use station coordinates if available, otherwise generate random ones
      const stationCoords = station.coordinates || [
        lng + (Math.random() - 0.5) * 0.5,
        lat + (Math.random() - 0.5) * 0.5
      ];

      // Create custom marker element
      const el = document.createElement('div');
      el.className = 'station-marker';
      el.style.width = '30px';
      el.style.height = '30px';
      el.style.borderRadius = '50%';
      el.style.backgroundColor = '#10b981';
      el.style.border = '3px solid white';
      el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
      el.style.cursor = 'pointer';
      el.style.display = 'flex';
      el.style.alignItems = 'center';
      el.style.justifyContent = 'center';
      el.style.color = 'white';
      el.style.fontWeight = 'bold';
      el.style.fontSize = '12px';
      el.innerHTML = `$${station.priceRegular.toFixed(2)}`;

      // Create popup
      const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(`
          <div style="padding: 8px;">
            <div style="font-weight: bold; margin-bottom: 4px;">${station.name}</div>
            <div style="font-size: 12px; color: #666; margin-bottom: 4px;">${station.address}</div>
            <div style="font-size: 12px; color: #666; margin-bottom: 4px;">
              <strong>Distance:</strong> ${station.distance}
            </div>
            <div style="display: flex; gap: 8px; margin-top: 8px;">
              <div style="text-align: center;">
                <div style="font-size: 10px; color: #666;">Regular</div>
                <div style="font-weight: bold;">$${station.priceRegular.toFixed(2)}</div>
              </div>
              <div style="text-align: center;">
                <div style="font-size: 10px; color: #666;">Premium</div>
                <div style="font-weight: bold;">$${station.pricePremium.toFixed(2)}</div>
              </div>
              <div style="text-align: center;">
                <div style="font-size: 10px; color: #666;">Diesel</div>
                <div style="font-weight: bold;">$${station.priceDiesel.toFixed(2)}</div>
              </div>
            </div>
            <div style="display: flex; gap: 4px; margin-top: 8px;">
              <button
                style="background-color: #10b981; color: white; border: none; padding: 4px 8px; border-radius: 4px; flex: 1; cursor: pointer;"
                onclick="window.viewStationDetails(${station.id})"
              >
                View Details
              </button>
              <button
                style="background-color: #3b82f6; color: white; border: none; padding: 4px 8px; border-radius: 4px; flex: 1; cursor: pointer;"
                onclick="window.getDirections(${station.id})"
              >
                Directions
              </button>
            </div>
          </div>
        `);

      // Add marker to map
      new mapboxgl.Marker(el)
        .setLngLat(stationCoords)
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
      if (station) {
        handleGetDirections(station);
      }
    };

  }, [filteredStations, mapLoaded, handleGetDirections]);

  // Update map style
  useEffect(() => {
    if (!map.current || !mapLoaded) return;
    map.current.setStyle(mapStyle);
  }, [mapStyle, mapLoaded]);

  // Update map when country/city changes
  useEffect(() => {
    if (selectedCountry && selectedCity && allStations.length > 0) {
      const countryName = countries.find(c => c.code === selectedCountry)?.name;

      // Create a copy of the stations with updated addresses
      const updatedStations = allStations.map(station => ({
        ...station,
        address: station.address.replace(/Tirana, Albania/, `${selectedCity}, ${countryName}`)
      }));

      setAllStations(updatedStations);

      // Update map center based on selected country
      if (map.current && mapLoaded) {
        // In a real app, you would use actual coordinates for the selected country/city
        // For demo purposes, we'll just slightly adjust the coordinates
        const newLng = lng + (Math.random() - 0.5) * 2;
        const newLat = lat + (Math.random() - 0.5) * 2;

        map.current.flyTo({
          center: [newLng, newLat],
          zoom: 9,
          essential: true
        });
      }
    }
  }, [selectedCountry, selectedCity]);

  // Apply filters and sorting
  useEffect(() => {
    if (allStations.length === 0) return;

    let filtered = [...allStations];

    // Apply country and city filter
    if (selectedCountry && selectedCity) {
      const countryName = countries.find(c => c.code === selectedCountry)?.name;
      filtered = filtered.filter(station =>
        station.address.includes(selectedCity) &&
        station.address.includes(countryName)
      );
    }

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
  }, [allStations, searchInput, sortOption, distanceFilter, amenityFilters, fuelTypeFilters, selectedCountry, selectedCity]);

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

  const toggleMapStyle = () => {
    const styles = [
      'mapbox://styles/mapbox/streets-v12',
      'mapbox://styles/mapbox/satellite-streets-v12',
      'mapbox://styles/mapbox/navigation-day-v1',
      'mapbox://styles/mapbox/light-v11'
    ];

    const currentIndex = styles.indexOf(mapStyle);
    const nextIndex = (currentIndex + 1) % styles.length;
    setMapStyle(styles[nextIndex]);

    toast({
      title: "Map Style Changed",
      description: `Switched to ${styles[nextIndex].split('/').pop().replace('-v', ' v')}`,
      duration: 2000,
    });
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
              Find Nearby Fuel Stations Worldwide
            </h1>
            <p className="text-gray-600 text-lg mb-6">
              Discover the best fuel centers near you with automatic location detection across 195 countries. Get real-time prices, wait times, and amenities for stations anywhere in the world.
            </p>

            <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1 text-gray-700">Country</label>
                  <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a country (195 available)" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                      <div className="max-h-[300px] overflow-y-auto">
                        {countries.map((country) => (
                          <SelectItem key={country.code} value={country.code}>
                            {country.name}
                          </SelectItem>
                        ))}
                      </div>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1 text-gray-700">City</label>
                  <Select
                    value={selectedCity}
                    onValueChange={setSelectedCity}
                    disabled={!selectedCountry || availableCities.length === 0}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={!selectedCountry ? "Select a country first" : availableCities.length === 0 ? "No cities available" : "Select a city"} />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                      <div className="max-h-[300px] overflow-y-auto">
                        {availableCities.length > 0 ? (
                          availableCities.map((city) => (
                            <SelectItem key={city.name} value={city.name}>
                              {city.name}
                            </SelectItem>
                          ))
                        ) : (
                          <div className="p-2 text-center text-gray-500">No cities available for this country yet</div>
                        )}
                      </div>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" size={20} />
                      <Input
                        placeholder="Search for fuel centers or addresses..."
                        className="pl-10 border-gray-300"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                      />
                    </div>
                  </div>
                  <Button className="bg-green-500 hover:bg-green-600">
                    <Search className="mr-2" size={16} />
                    Search
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <Button
                    className="bg-blue-500 hover:bg-blue-600 text-white"
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
                        <Navigation className="mr-2" size={16} />
                        Detect My Location
                      </>
                    )}
                  </Button>

                  {userLocation && userCountry && userCity && (
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Your location:</span> {userCity}, {countries.find(c => c.code === userCountry)?.name}
                    </div>
                  )}

                  {locationError && (
                    <div className="text-sm text-red-500">
                      {locationError}
                    </div>
                  )}
                </div>
              </div>
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
                  {selectedCountry && selectedCity ? (
                    <div className="flex items-center">
                      <Globe size={14} className="mr-1" />
                      Showing {filteredStations.length} stations in {selectedCity}, {countries.find(c => c.code === selectedCountry)?.name}
                    </div>
                  ) : (
                    <div>
                      Showing {filteredStations.length} stations
                      {selectedCountry ? ` in ${countries.find(c => c.code === selectedCountry)?.name}` : ''}
                    </div>
                  )}
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
                <div className={`bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden ${mapFullscreen ? 'fixed inset-0 z-50' : 'h-[700px]'}`}>
                  <div className="absolute top-4 right-4 z-10 flex gap-2">
                    <div className="bg-white rounded-md shadow-md p-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setMapFullscreen(!mapFullscreen)}
                        className="h-8 w-8"
                      >
                        {mapFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
                      </Button>
                    </div>
                    <div className="bg-white rounded-md shadow-md p-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleMapStyle}
                        className="h-8 w-8"
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
                        className="bg-white text-black hover:bg-gray-100"
                        onClick={() => setMapFullscreen(false)}
                      >
                        Exit Fullscreen
                      </Button>
                    </div>
                  )}

                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 bg-white px-4 py-2 rounded-full shadow-md text-sm">
                    Showing {filteredStations.length} stations {selectedCountry ? `in ${countries.find(c => c.code === selectedCountry)?.name}` : ''}
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

      {/* Call Station Dialog */}
      <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Call Station</DialogTitle>
            <DialogDescription>
              Contact information for the selected station
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {selectedStation && (
              <div className="space-y-2">
                <h4 className="font-medium">{selectedStation.name}</h4>
                <p className="text-sm text-gray-500 flex items-center">
                  <Phone size={16} className="mr-2" />
                  {selectedStation.phoneNumber}
                </p>
              </div>
            )}
          </div>
          <DialogFooter className="sm:justify-end">
            {selectedStation && (
              <Button
                className="bg-green-500 hover:bg-green-600"
                onClick={() => {
                  toast({
                    title: "Calling Station",
                    description: `Calling ${selectedStation.name} at ${selectedStation.phoneNumber}`,
                    duration: 3000,
                  });
                  setShowContactDialog(false);
                }}
              >
                <Phone className="mr-2" size={16} />
                Call
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Enhanced App Store Dialog */}
      <Dialog open={showAppStoreDialog} onOpenChange={setShowAppStoreDialog}>
        <DialogContent className="sm:max-w-lg p-0 overflow-hidden bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 border-0">
          <div className="relative">
            {/* Background animation */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-24 -left-24 w-64 h-64 bg-green-200 dark:bg-green-900 rounded-full opacity-20 animate-blob"></div>
              <div className="absolute top-32 -right-24 w-72 h-72 bg-blue-200 dark:bg-blue-900 rounded-full opacity-20 animate-blob animation-delay-2000"></div>
              <div className="absolute -bottom-24 left-32 w-56 h-56 bg-yellow-200 dark:bg-yellow-900 rounded-full opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <img
                    src="/lovable-uploads/f1f34c25-67df-4603-8eb1-3f1fe84812a4.png"
                    alt="FuelFriendly"
                    className="h-10 mr-3"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">FuelFriendly</h3>
                    <p className="text-sm text-gray-500">Pump side service at your fingertips</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  onClick={() => setShowAppStoreDialog(false)}
                >
                  <X size={18} />
                </Button>
              </div>

              <div className="flex flex-col md:flex-row gap-6 py-4">
                {/* Phone mockup */}
                <div className="relative mx-auto md:mx-0 w-48 h-96 bg-black rounded-[40px] border-[8px] border-black overflow-hidden shadow-xl">
                  <div className="absolute top-0 left-0 right-0 h-6 bg-black z-10 flex justify-center">
                    <div className="w-24 h-4 bg-black rounded-b-xl"></div>
                  </div>
                  <div className="h-full w-full bg-gradient-to-b from-green-400 to-green-600 dark:from-green-600 dark:to-green-800 overflow-hidden">
                    <div className="animate-float">
                      <div className="pt-8 px-4 text-white">
                        <div className="flex justify-between items-center mb-6">
                          <div>
                            <div className="text-xs opacity-80">Welcome back</div>
                            <div className="font-bold">John Doe</div>
                          </div>
                          <div className="w-8 h-8 bg-white dark:bg-gray-200 rounded-full"></div>
                        </div>

                        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 mb-4">
                          <div className="text-xs font-medium mb-1">Current Order</div>
                          <div className="text-sm">10 Gallons Regular</div>
                          <div className="flex justify-between items-center mt-2">
                            <div className="text-xs opacity-80">Status</div>
                            <div className="text-xs bg-green-500 dark:bg-green-600 px-2 py-0.5 rounded-full">On the way</div>
                          </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-xl p-3 mb-4">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-green-500 dark:bg-green-600 rounded-full flex items-center justify-center mr-2">
                              <Droplet size={16} className="text-white" />
                            </div>
                            <div>
                              <div className="text-xs font-medium text-gray-800 dark:text-gray-200">Order Fuel</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">Quick & easy delivery</div>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                            <div className="text-xs font-medium mb-1">Nearby</div>
                            <div className="text-sm">12 stations</div>
                          </div>
                          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                            <div className="text-xs font-medium mb-1">Saved</div>
                            <div className="text-sm">3 locations</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Download options */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Download Our App</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      Get fuel delivered to your doorstep with our mobile app. Available for iOS and Android devices.
                    </p>

                    <div className="space-y-4">
                      <Button
                        className="w-full bg-black hover:bg-gray-800 text-white flex items-center justify-center h-14 rounded-xl transition-transform hover:scale-105 active:scale-95"
                        onClick={() => {
                          toast({
                            title: "App Store",
                            description: "Redirecting to the App Store...",
                            duration: 3000,
                          });
                        }}
                      >
                        <div className="flex items-center">
                          <svg className="w-8 h-8 mr-3" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.5689 12.9203C17.5497 10.1443 19.8283 8.79465 19.9124 8.74006C18.6135 6.84407 16.6012 6.58714 15.8758 6.56358C14.1517 6.38391 12.4795 7.57982 11.6047 7.57982C10.7298 7.57982 9.35361 6.58358 7.88884 6.61893C5.99285 6.65427 4.22354 7.76304 3.23909 9.49783C1.21902 13.0259 2.73612 18.2392 4.6793 21.0388C5.65196 22.4042 6.78429 23.9213 8.26085 23.859C9.70205 23.7967 10.2304 22.9139 11.9427 22.9139C13.6549 22.9139 14.1478 23.859 15.6601 23.8237C17.2077 23.7967 18.1803 22.4454 19.1295 21.0682C20.2382 19.5088 20.6974 17.9801 20.7209 17.9095C20.6739 17.8918 17.5924 16.721 17.5689 12.9203Z" />
                            <path d="M14.9694 4.28149C15.7772 3.28525 16.3173 1.91084 16.1612 0.523438C14.9929 0.570522 13.5753 1.32232 12.7557 2.29498C12.0186 3.16162 11.3758 4.56773 11.5554 5.93035C12.8779 6.01852 14.1381 5.27731 14.9694 4.28149Z" />
                          </svg>
                          <div className="text-left">
                            <div className="text-xs">Download on the</div>
                            <div className="text-xl font-semibold -mt-1">App Store</div>
                          </div>
                        </div>
                      </Button>

                      <Button
                        className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center h-14 rounded-xl transition-transform hover:scale-105 active:scale-95"
                        onClick={() => {
                          toast({
                            title: "Google Play",
                            description: "Redirecting to Google Play Store...",
                            duration: 3000,
                          });
                        }}
                      >
                        <div className="flex items-center">
                          <svg className="w-8 h-8 mr-3" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M3.60481 21.5988L12.0586 13.145L3.60481 4.69133L3.60481 21.5988Z" />
                            <path d="M14.2851 15.3716L5.83139 23.8253C5.83139 23.8253 6.14563 23.8253 6.54695 23.8253C7.56231 23.8253 8.96854 23.5111 10.3748 22.6373L21.2972 16.3891L14.2851 15.3716Z" />
                            <path d="M21.2984 7.88899L14.2863 6.87152L5.83261 15.3253C5.83261 15.3253 9.98037 23.0962 10.376 22.6385C10.7716 22.1809 21.2984 7.88899 21.2984 7.88899Z" />
                            <path d="M5.83236 0.454578C5.83236 0.454578 5.1905 0.0532505 3.93337 0.908025C2.67625 1.7628 2.83215 3.35418 2.83215 3.35418L12.0586 12.5807L14.2847 10.3546L5.83236 0.454578Z" />
                          </svg>
                          <div className="text-left">
                            <div className="text-xs">GET IT ON</div>
                            <div className="text-xl font-semibold -mt-1">Google Play</div>
                          </div>
                        </div>
                      </Button>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <div className="flex items-center">
                        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-300">4.9 • 2.3k+ reviews</span>
                    </div>

                    <div className="flex justify-center">
                      <Button
                        variant="outline"
                        className="rounded-full px-6 border-green-500 text-green-600 dark:text-green-400 dark:border-green-700 hover:bg-green-50 dark:hover:bg-green-900/30"
                        onClick={() => {
                          navigator.clipboard.writeText("https://fuelfriendlywebsite.vercel.app");
                          toast({
                            title: "Link Copied",
                            description: "Download link copied to clipboard",
                            duration: 3000,
                          });
                        }}
                      >
                        <Share2 size={16} className="mr-2" />
                        Share App Link
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center">
                    <div className="relative mr-4">
                      <div className="w-16 h-16 bg-white dark:bg-gray-700 p-1 rounded-xl shadow-md rotate-3 absolute -right-1 -top-1"></div>
                      <div className="w-16 h-16 bg-white dark:bg-gray-700 p-1 rounded-xl shadow-md -rotate-3 absolute -left-1 -bottom-1"></div>
                      <div className="w-16 h-16 bg-white dark:bg-gray-700 p-1 rounded-xl shadow-md relative z-10">
                        <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMzAgMzMwIj48cGF0aCBkPSJNMCAwaDMzMHYzMzBIMHoiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6TTYwIDMwaDMwdjMwSDYwek05MCAzMGgzMHYzMEg5MHpNMTIwIDMwaDMwdjMwaC0zMHpNMTUwIDMwaDMwdjMwaC0zMHpNMjEwIDMwaDMwdjMwaC0zMHpNMjcwIDMwaDMwdjMwaC0zMHpNMzAgNjBoMzB2MzBIMzB6TTYwIDIxMGgzMHYzMEg5MHpNMTIwIDEyMGgzMHYzMGgtMzB6TTIxMCA2MGgzMHYzMGgtMzB6TTI3MCA2MGgzMHYzMGgtMzB6TTMwIDkwaDMwdjM0SDMwek05MCA5MGgzMHYzMEg5MHpNMTIwIDEyMGgzMHYzMGgtMzB6TTE1MCAxMjBoMzB2MzBoLTMwek0xODAgMTIwaDMwdjMwaC0zMHpNMjEwIDEyMGgzMHYzMGgtMzB6TTI3MCAxODBoMzB2MzBoLTMwek0zMCAyMTBoMzB2MzBIMzB6TTYwIDIxMGgzMHYzMEg2MHpNOTAgMjEwaDMwdjMwSDkwek0xMjAgMjEwaDMwdjMwaC0zMHpNMTUwIDIxMGgzMHYzMGgtMzB6TTE4MCAyMTBoMzB2MzBoLTMwek0yMTAgMjEwaDMwdjMwaC0zMHpNMjQwIDIxMGgzMHYzMGgtMzB6TTI3MCAyMTBoMzB2MzBoLTMwek0zMCAyNDBoMzB2MzBIMzB6TTYwIDI0MGgzMHYzMEg2MHpNOTAgMjQwaDMwdjMwSDkwek0xMjAgMjQwaDMwdjMwaC0zMHpNMTUwIDI0MGgzMHYzMGgtMzB6TTE4MCAyNDBoMzB2MzBoLTMwek0yMTAgMjQwaDMwdjMwaC0zMHpNMjQwIDI0MGgzMHYzMGgtMzB6TTI3MCAyNDBoMzB2MzBoLTMweiIvPjwvc3ZnPg==')] dark:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMzAgMzMwIj48cGF0aCBkPSJNMCAwaDMzMHYzMzBIMHoiIGZpbGw9IiMxZjI5MzciLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6TTYwIDMwaDMwdjMwSDYwek05MCAzMGgzMHYzMEg5MHpNMTIwIDMwaDMwdjMwaC0zMHpNMTUwIDMwaDMwdjMwaC0zMHpNMjEwIDMwaDMwdjMwaC0zMHpNMjcwIDMwaDMwdjMwaC0zMHpNMzAgNjBoMzB2MzBIMzB6TTYwIDIxMGgzMHYzMEg5MHpNMTIwIDEyMGgzMHYzMGgtMzB6TTIxMCA2MGgzMHYzMGgtMzB6TTI3MCA2MGgzMHYzMGgtMzB6TTMwIDkwaDMwdjM0SDMwek05MCA5MGgzMHYzMEg5MHpNMTIwIDEyMGgzMHYzMGgtMzB6TTE1MCAxMjBoMzB2MzBoLTMwek0xODAgMTIwaDMwdjMwaC0zMHpNMjEwIDEyMGgzMHYzMGgtMzB6TTI3MCAxODBoMzB2MzBoLTMwek0zMCAyMTBoMzB2MzBIMzB6TTYwIDIxMGgzMHYzMEg2MHpNOTAgMjEwaDMwdjMwSDkwek0xMjAgMjEwaDMwdjMwaC0zMHpNMTUwIDIxMGgzMHYzMGgtMzB6TTE4MCAyMTBoMzB2MzBoLTMwek0yMTAgMjEwaDMwdjMwaC0zMHpNMjQwIDIxMGgzMHYzMGgtMzB6TTI3MCAyMTBoMzB2MzBoLTMwek0zMCAyNDBoMzB2MzBIMzB6TTYwIDI0MGgzMHYzMEg2MHpNOTAgMjQwaDMwdjMwSDkwek0xMjAgMjQwaDMwdjMwaC0zMHpNMTUwIDI0MGgzMHYzMGgtMzB6TTE4MCAyNDBoMzB2MzBoLTMwek0yMTAgMjQwaDMwdjMwaC0zMHpNMjQwIDI0MGgzMHYzMGgtMzB6TTI3MCAyNDBoMzB2MzBoLTMweiIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==')] bg-center bg-contain rounded-lg"></div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">Scan to Download</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Use your phone's camera</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="rounded-full"
                      onClick={() => {
                        toast({
                          title: "Email Sent",
                          description: "Download link sent to your email",
                          duration: 3000,
                        });
                      }}
                    >
                      <Mail size={16} className="mr-2" />
                      Email Link
                    </Button>
                    <Button
                      className="rounded-full bg-green-600 hover:bg-green-700"
                      onClick={() => {
                        toast({
                          title: "SMS Sent",
                          description: "Download link sent to your phone",
                          duration: 3000,
                        });
                        setShowAppStoreDialog(false);
                      }}
                    >
                      <MessageSquare size={16} className="mr-2" />
                      Text Link
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add animation styles */}
      <style jsx global>{`
        @keyframes blob {
          0% { transform: scale(1) translate(0px, 0px); }
          33% { transform: scale(1.1) translate(30px, -50px); }
          66% { transform: scale(0.9) translate(-20px, 20px); }
          100% { transform: scale(1) translate(0px, 0px); }
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
>>>>>>> fc50f12d78601307538b9c65c6925970812ed209
  );
};

export default NearbyStations;
