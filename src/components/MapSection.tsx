
import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Layers, Maximize, Minimize } from 'lucide-react';
import { Button } from './ui/button';

// Set your Mapbox access token here
mapboxgl.accessToken = 'pk.eyJ1IjoiZnVlbGZyaWVuZGx5IiwiYSI6ImNscXRqcWVxcjFnNGUya3BnZnRxZGJnbXQifQ.Ry9xQMKHWgTHDgYTlmBcKA';

const MapSection = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapFullscreen, setMapFullscreen] = useState(false);
  const [mapStyle, setMapStyle] = useState('mapbox://styles/mapbox/streets-v12');
  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(20);
  const [zoom, setZoom] = useState(1.5);

  // Initialize map when component mounts
  useEffect(() => {
    if (map.current) return; // Initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: mapStyle,
      center: [lng, lat],
      zoom: zoom,
      attributionControl: false,
      projection: 'globe'
    });

    map.current.on('load', () => {
      setMapLoaded(true);

      // Add atmosphere and stars for globe view
      map.current.setFog({
        color: 'rgb(186, 210, 235)', // Lower atmosphere
        'high-color': 'rgb(36, 92, 223)', // Upper atmosphere
        'horizon-blend': 0.02, // Atmosphere thickness
        'space-color': 'rgb(11, 11, 25)', // Background (space) color
        'star-intensity': 0.6 // Background star brightness
      });

      // Add random markers for fuel stations around the world
      addRandomMarkers();

      // Add 3D terrain
      map.current.addSource('mapbox-dem', {
        'type': 'raster-dem',
        'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
        'tileSize': 512,
        'maxzoom': 14
      });
      map.current.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
    map.current.addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true,
      showUserHeading: true
    }), 'bottom-right');

    // Start a slow automatic rotation
    map.current.on('idle', () => {
      if (!map.current.isMoving() && !map.current.isZooming() && !map.current.isRotating()) {
        rotateCamera(0);
      }
    });

    return () => map.current?.remove();
  }, []);

  // Update map style when it changes
  useEffect(() => {
    if (!map.current || !mapLoaded) return;
    map.current.setStyle(mapStyle);

    // Re-add 3D terrain after style change
    map.current.once('style.load', () => {
      map.current.addSource('mapbox-dem', {
        'type': 'raster-dem',
        'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
        'tileSize': 512,
        'maxzoom': 14
      });
      map.current.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });

      // Re-add fog
      map.current.setFog({
        color: 'rgb(186, 210, 235)',
        'high-color': 'rgb(36, 92, 223)',
        'horizon-blend': 0.02,
        'space-color': 'rgb(11, 11, 25)',
        'star-intensity': 0.6
      });

      // Re-add markers
      addRandomMarkers();
    });
  }, [mapStyle, mapLoaded]);

  // Function to add random markers
  const addRandomMarkers = () => {
    if (!map.current || !mapLoaded) return;

    // Remove existing markers
    const existingMarkers = document.querySelectorAll('.mapboxgl-marker');
    existingMarkers.forEach(marker => marker.remove());

    // Major cities around the world with their coordinates
    const cities = [
      { name: "New York", coords: [-74.006, 40.7128], color: "#10b981" },
      { name: "London", coords: [-0.1278, 51.5074], color: "#10b981" },
      { name: "Tokyo", coords: [139.6503, 35.6762], color: "#10b981" },
      { name: "Sydney", coords: [151.2093, -33.8688], color: "#10b981" },
      { name: "Rio de Janeiro", coords: [-43.1729, -22.9068], color: "#10b981" },
      { name: "Cairo", coords: [31.2357, 30.0444], color: "#10b981" },
      { name: "Moscow", coords: [37.6173, 55.7558], color: "#10b981" },
      { name: "Beijing", coords: [116.4074, 39.9042], color: "#10b981" },
      { name: "Mumbai", coords: [72.8777, 19.0760], color: "#10b981" },
      { name: "Los Angeles", coords: [-118.2437, 34.0522], color: "#10b981" },
      { name: "Paris", coords: [2.3522, 48.8566], color: "#eab308" },
      { name: "Berlin", coords: [13.4050, 52.5200], color: "#3b82f6" },
      { name: "Dubai", coords: [55.2708, 25.2048], color: "#eab308" },
      { name: "Singapore", coords: [103.8198, 1.3521], color: "#3b82f6" },
      { name: "Mexico City", coords: [-99.1332, 19.4326], color: "#3b82f6" },
      { name: "Johannesburg", coords: [28.0473, -26.2041], color: "#eab308" },
      { name: "Toronto", coords: [-79.3832, 43.6532], color: "#3b82f6" },
      { name: "Bangkok", coords: [100.5018, 13.7563], color: "#eab308" },
      { name: "Seoul", coords: [126.9780, 37.5665], color: "#3b82f6" },
      { name: "Tirana", coords: [19.8187, 41.3275], color: "#eab308" }
    ];

    // Add markers for each city
    cities.forEach(city => {
      // Create custom marker element
      const el = document.createElement('div');
      el.className = 'station-marker';
      el.style.width = '20px';
      el.style.height = '20px';
      el.style.borderRadius = '50%';
      el.style.backgroundColor = city.color;
      el.style.border = '3px solid white';
      el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
      el.style.cursor = 'pointer';

      // Create popup
      const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(`
          <div style="padding: 8px; text-align: center;">
            <div style="font-weight: bold; margin-bottom: 4px;">${city.name}</div>
            <div style="font-size: 12px; color: #666; margin-bottom: 4px;">FuelFriendly Service Area</div>
            <div style="display: flex; justify-content: center; gap: 8px; margin-top: 8px;">
              <div style="text-align: center;">
                <div style="font-size: 10px; color: #666;">Stations</div>
                <div style="font-weight: bold;">${Math.floor(Math.random() * 50) + 20}</div>
              </div>
              <div style="text-align: center;">
                <div style="font-size: 10px; color: #666;">Fuel Friends</div>
                <div style="font-weight: bold;">${Math.floor(Math.random() * 30) + 10}</div>
              </div>
            </div>
          </div>
        `);

      // Add marker to map
      new mapboxgl.Marker(el)
        .setLngLat(city.coords)
        .setPopup(popup)
        .addTo(map.current);
    });
  };

  // Function to rotate the camera
  const rotateCamera = (timestamp) => {
    if (!map.current || !mapLoaded || mapFullscreen) return;

    // Slow rotation speed
    map.current.rotateTo((timestamp / 100) % 360, { duration: 0 });
    requestAnimationFrame(rotateCamera);
  };

  // Function to toggle map style
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
  };

  return (
    <section className="py-12 md:py-24 bg-white">
      <motion.div
        className="container px-4 md:px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="flex flex-col items-start space-y-4">
          <div className="space-y-2 max-w-3xl">
            <motion.h2
              className="text-3xl font-bold tracking-tighter md:text-4xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Explore Our Service Areas & Fuel Stations Near You!
            </motion.h2>
            <motion.p
              className="text-gray-500 md:text-xl/relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Find registered fuel stations and Fuel Friend services in your city. Use the interactive map to locate nearby stations, compare prices, and access seamless fueling solutions.
            </motion.p>
          </div>
        </div>

        <motion.div
          className={`mt-12 relative w-full rounded-lg overflow-hidden border border-gray-200 ${mapFullscreen ? 'fixed inset-0 z-50' : 'h-[500px]'}`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
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
            style={{ minHeight: mapFullscreen ? '100vh' : '500px' }}
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
        </motion.div>

        <div className="grid grid-cols-3 gap-8 mt-16 text-center">
          <motion.div
            className="flex flex-col items-center space-y-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <span className="text-5xl font-bold text-gray-900">4.5k+</span>
            <span className="text-gray-500">Registered Users</span>
          </motion.div>
          <motion.div
            className="flex flex-col items-center space-y-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <span className="text-5xl font-bold text-gray-900">1.5k+</span>
            <span className="text-gray-500">Active Fuel Friends</span>
          </motion.div>
          <motion.div
            className="flex flex-col items-center space-y-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="text-5xl font-bold text-gray-900">1000+</span>
            <span className="text-gray-500">Fuel Stations Onboard</span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default MapSection;
