import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Clock, Route, Search, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/molecules/Card';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { Typography } from '@/components/atoms/Typography';
import { FormField } from '@/components/molecules/FormField';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from '@/contexts/ThemeContext';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

// Fix Leaflet marker icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Custom marker icons
const createCustomIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

interface InteractiveMapProps {
  className?: string;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ className }) => {
  const { toast } = useToast();
  const { isDarkMode } = useTheme();
  const mapRef = useRef<L.Map | null>(null);
  const routingControlRef = useRef<any>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // Form state
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [routeInfo, setRouteInfo] = useState<{
    distance: number;
    duration: number;
    eta: string;
  } | null>(null);
  
  // Initialize map
  useEffect(() => {
    if (typeof window !== 'undefined' && !mapRef.current) {
      // Default to a central location
      const map = L.map('map').setView([51.505, -0.09], 13);
      
      // Add tile layer based on theme
      const tileLayer = L.tileLayer(
        isDarkMode
          ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
          : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          attribution: isDarkMode
            ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        }
      );
      
      tileLayer.addTo(map);
      mapRef.current = map;
      
      // Try to get user's location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            map.setView([latitude, longitude], 13);
            
            // Add marker for current location
            const currentLocationIcon = createCustomIcon('#3b82f6');
            L.marker([latitude, longitude], { icon: currentLocationIcon })
              .addTo(map)
              .bindPopup('Your current location')
              .openPopup();
            
            toast({
              title: "Location Found",
              description: "Map centered to your current location.",
              duration: 3000,
            });
          },
          (error) => {
            console.error('Error getting location:', error);
            toast({
              title: "Location Error",
              description: "Could not access your location. Using default view.",
              variant: "destructive",
              duration: 3000,
            });
          }
        );
      }
      
      setMapLoaded(true);
    }
    
    // Cleanup
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [isDarkMode, toast]);
  
  // Update map tiles when theme changes
  useEffect(() => {
    if (mapRef.current && mapLoaded) {
      // Remove existing tile layers
      mapRef.current.eachLayer((layer) => {
        if (layer instanceof L.TileLayer) {
          mapRef.current?.removeLayer(layer);
        }
      });
      
      // Add new tile layer based on theme
      const tileLayer = L.tileLayer(
        isDarkMode
          ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
          : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          attribution: isDarkMode
            ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        }
      );
      
      tileLayer.addTo(mapRef.current);
    }
  }, [isDarkMode, mapLoaded]);
  
  // Geocode address to coordinates
  const geocodeAddress = async (address: string): Promise<[number, number] | null> => {
    try {
      // In a real app, this would use a geocoding API like Nominatim, Google Maps, etc.
      // For demo purposes, we'll simulate geocoding with random coordinates
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Generate random coordinates near London for demo
      const lat = 51.505 + (Math.random() * 0.1 - 0.05);
      const lng = -0.09 + (Math.random() * 0.1 - 0.05);
      
      return [lat, lng];
    } catch (error) {
      console.error('Geocoding error:', error);
      toast({
        title: "Geocoding Error",
        description: "Could not find coordinates for the address.",
        variant: "destructive",
        duration: 3000,
      });
      return null;
    }
  };
  
  // Calculate route
  const calculateRoute = async () => {
    if (!startLocation || !endLocation) {
      toast({
        title: "Missing Locations",
        description: "Please enter both start and end locations.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    setIsSearching(true);
    
    try {
      // Geocode addresses
      const startCoords = await geocodeAddress(startLocation);
      const endCoords = await geocodeAddress(endLocation);
      
      if (!startCoords || !endCoords || !mapRef.current) {
        throw new Error('Could not get coordinates or map not initialized');
      }
      
      // Remove existing routing control
      if (routingControlRef.current) {
        mapRef.current.removeControl(routingControlRef.current);
      }
      
      // Create new routing control
      const routingControl = L.Routing.control({
        waypoints: [
          L.latLng(startCoords[0], startCoords[1]),
          L.latLng(endCoords[0], endCoords[1])
        ],
        routeWhileDragging: true,
        showAlternatives: true,
        fitSelectedRoutes: true,
        lineOptions: {
          styles: [
            { color: '#6366f1', opacity: 0.8, weight: 6 },
            { color: 'white', opacity: 0.3, weight: 2 }
          ]
        },
        altLineOptions: {
          styles: [
            { color: '#9ca3af', opacity: 0.6, weight: 4 },
            { color: 'white', opacity: 0.3, weight: 2 }
          ]
        },
        createMarker: function(i: number, waypoint: any, n: number) {
          const icon = i === 0 
            ? createCustomIcon('#3b82f6') // Start marker
            : createCustomIcon('#ef4444'); // End marker
          
          return L.marker(waypoint.latLng, { 
            icon: icon,
            draggable: true
          });
        }
      }).addTo(mapRef.current);
      
      routingControlRef.current = routingControl;
      
      // Get route info when route is calculated
      routingControl.on('routesfound', (e: any) => {
        const routes = e.routes;
        const summary = routes[0].summary;
        
        // Calculate ETA
        const now = new Date();
        const arrivalTime = new Date(now.getTime() + summary.totalTime * 1000);
        const formattedETA = arrivalTime.toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit' 
        });
        
        setRouteInfo({
          distance: summary.totalDistance / 1000, // Convert to km
          duration: summary.totalTime / 60, // Convert to minutes
          eta: formattedETA
        });
        
        toast({
          title: "Route Found",
          description: `Distance: ${(summary.totalDistance / 1000).toFixed(1)} km, ETA: ${formattedETA}`,
          duration: 3000,
        });
      });
      
    } catch (error) {
      console.error('Route calculation error:', error);
      toast({
        title: "Route Error",
        description: "Could not calculate the route. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsSearching(false);
    }
  };
  
  // Clear route
  const clearRoute = () => {
    if (mapRef.current && routingControlRef.current) {
      mapRef.current.removeControl(routingControlRef.current);
      routingControlRef.current = null;
      setRouteInfo(null);
      setStartLocation('');
      setEndLocation('');
      
      toast({
        title: "Route Cleared",
        description: "The route has been removed from the map.",
        duration: 3000,
      });
    }
  };
  
  return (
    <div className={`relative ${className}`}>
      <div 
        id="map" 
        className="h-[500px] w-full rounded-lg shadow-md z-10"
        style={{ zIndex: 0 }}
      />
      
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: isCollapsed ? 'calc(100% - 50px)' : 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="absolute bottom-4 left-4 right-4 md:left-auto md:w-96 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-20"
      >
        <div 
          className="p-4 cursor-pointer flex justify-between items-center"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <div className="flex items-center">
            <Route className="mr-2 h-5 w-5 text-green-500" />
            <Typography variant="h5">Route Planner</Typography>
          </div>
          <Button variant="ghost" size="icon">
            {isCollapsed ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </Button>
        </div>
        
        <div className="p-4 pt-0">
          <div className="space-y-3">
            <FormField
              label="Start Location"
              htmlFor="startLocation"
            >
              <Input
                id="startLocation"
                value={startLocation}
                onChange={(e) => setStartLocation(e.target.value)}
                placeholder="Enter start address"
                leftIcon={<MapPin size={16} className="text-blue-500" />}
              />
            </FormField>
            
            <FormField
              label="Destination"
              htmlFor="endLocation"
            >
              <Input
                id="endLocation"
                value={endLocation}
                onChange={(e) => setEndLocation(e.target.value)}
                placeholder="Enter destination address"
                leftIcon={<MapPin size={16} className="text-red-500" />}
              />
            </FormField>
            
            <div className="flex justify-between gap-2 pt-2">
              <Button
                variant="outline"
                onClick={clearRoute}
                leftIcon={<X size={16} />}
                className="flex-1"
              >
                Clear
              </Button>
              
              <Button
                onClick={calculateRoute}
                isLoading={isSearching}
                leftIcon={<Search size={16} />}
                variant="green"
                className="flex-1"
              >
                Find Route
              </Button>
            </div>
            
            {routeInfo && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-md"
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <Navigation className="mr-1 h-4 w-4 text-blue-500" />
                    <Typography variant="small" className="font-medium">Distance</Typography>
                  </div>
                  <Typography variant="small" className="font-bold">{routeInfo.distance.toFixed(1)} km</Typography>
                </div>
                
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <Clock className="mr-1 h-4 w-4 text-amber-500" />
                    <Typography variant="small" className="font-medium">Duration</Typography>
                  </div>
                  <Typography variant="small" className="font-bold">{Math.round(routeInfo.duration)} min</Typography>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Clock className="mr-1 h-4 w-4 text-green-500" />
                    <Typography variant="small" className="font-medium">ETA</Typography>
                  </div>
                  <Typography variant="small" className="font-bold">{routeInfo.eta}</Typography>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default InteractiveMap;
