import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fuel, Calculator, Car, DollarSign, Droplet, BarChart, RefreshCw } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/molecules/Card';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { Typography } from '@/components/atoms/Typography';
import { FormField } from '@/components/molecules/FormField';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

// Fuel types and their properties
const FUEL_TYPES = [
  { id: 'petrol', name: 'Petrol', price: 1.45, co2: 2.31 },
  { id: 'diesel', name: 'Diesel', price: 1.50, co2: 2.68 },
  { id: 'lpg', name: 'LPG', price: 0.85, co2: 1.51 },
  { id: 'electric', name: 'Electric', price: 0.15, co2: 0 }, // price per kWh
  { id: 'hybrid', name: 'Hybrid', price: 1.45, co2: 1.85 },
];

// Default values
const DEFAULT_VALUES = {
  distance: 100,
  efficiency: 8, // L/100km
  fuelType: 'petrol',
  electricEfficiency: 15, // kWh/100km
};

interface FuelCalculatorProps {
  className?: string;
}

const FuelCalculator: React.FC<FuelCalculatorProps> = ({ className }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [fuelPrices, setFuelPrices] = useState(FUEL_TYPES);
  
  // Form state
  const [distance, setDistance] = useState(DEFAULT_VALUES.distance);
  const [efficiency, setEfficiency] = useState(DEFAULT_VALUES.efficiency);
  const [fuelType, setFuelType] = useState(DEFAULT_VALUES.fuelType);
  const [electricEfficiency, setElectricEfficiency] = useState(DEFAULT_VALUES.electricEfficiency);
  
  // Results
  const [cost, setCost] = useState(0);
  const [consumption, setConsumption] = useState(0);
  const [co2Emissions, setCo2Emissions] = useState(0);
  const [showResults, setShowResults] = useState(false);
  
  // Check online status
  useEffect(() => {
    const handleOnlineStatusChange = () => {
      setIsOnline(navigator.onLine);
      
      if (navigator.onLine) {
        toast({
          title: "You're back online",
          description: "Fuel prices will be updated with real-time data.",
          duration: 3000,
        });
        fetchFuelPrices();
      } else {
        toast({
          title: "You're offline",
          description: "Using cached fuel prices. Some features may be limited.",
          variant: "destructive",
          duration: 3000,
        });
      }
    };
    
    window.addEventListener('online', handleOnlineStatusChange);
    window.addEventListener('offline', handleOnlineStatusChange);
    
    return () => {
      window.removeEventListener('online', handleOnlineStatusChange);
      window.removeEventListener('offline', handleOnlineStatusChange);
    };
  }, [toast]);
  
  // Fetch fuel prices from API
  const fetchFuelPrices = async () => {
    if (!navigator.onLine) return;
    
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call to a fuel price service
      // For demo purposes, we'll simulate an API call with a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate API response with slightly randomized prices
      const updatedPrices = FUEL_TYPES.map(fuel => ({
        ...fuel,
        price: fuel.price + (Math.random() * 0.2 - 0.1) // Add random variation
      }));
      
      setFuelPrices(updatedPrices);
      
      toast({
        title: "Prices Updated",
        description: "Fuel prices have been updated with the latest data.",
        duration: 3000,
      });
    } catch (error) {
      console.error('Error fetching fuel prices:', error);
      toast({
        title: "Failed to Update Prices",
        description: "Using cached fuel prices. Please try again later.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Calculate fuel cost and emissions
  const calculateFuelCost = () => {
    setIsLoading(true);
    
    // Simulate calculation delay
    setTimeout(() => {
      const selectedFuel = fuelPrices.find(fuel => fuel.id === fuelType);
      
      if (!selectedFuel) {
        toast({
          title: "Calculation Error",
          description: "Invalid fuel type selected.",
          variant: "destructive",
          duration: 3000,
        });
        setIsLoading(false);
        return;
      }
      
      let calculatedCost = 0;
      let calculatedConsumption = 0;
      let calculatedCo2 = 0;
      
      if (fuelType === 'electric') {
        // Electric calculation (kWh/100km)
        calculatedConsumption = (distance / 100) * electricEfficiency;
        calculatedCost = calculatedConsumption * selectedFuel.price;
        calculatedCo2 = 0; // Zero direct emissions
      } else {
        // Fuel calculation (L/100km)
        calculatedConsumption = (distance / 100) * efficiency;
        calculatedCost = calculatedConsumption * selectedFuel.price;
        calculatedCo2 = calculatedConsumption * selectedFuel.co2;
      }
      
      setCost(calculatedCost);
      setConsumption(calculatedConsumption);
      setCo2Emissions(calculatedCo2);
      setShowResults(true);
      setIsLoading(false);
      
      toast({
        title: "Calculation Complete",
        description: `Your trip will cost approximately $${calculatedCost.toFixed(2)}.`,
        duration: 3000,
      });
    }, 800);
  };
  
  // Reset calculator
  const resetCalculator = () => {
    setDistance(DEFAULT_VALUES.distance);
    setEfficiency(DEFAULT_VALUES.efficiency);
    setFuelType(DEFAULT_VALUES.fuelType);
    setElectricEfficiency(DEFAULT_VALUES.electricEfficiency);
    setShowResults(false);
    
    toast({
      title: "Calculator Reset",
      description: "All values have been reset to defaults.",
      duration: 3000,
    });
  };
  
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calculator className="mr-2 h-6 w-6 text-green-500" />
          Smart Fuel Cost Calculator
        </CardTitle>
        <CardDescription>
          Calculate fuel costs, consumption, and emissions for your trip
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="calculator" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="calculator" className="flex items-center">
              <Calculator className="mr-2 h-4 w-4" />
              Calculator
            </TabsTrigger>
            <TabsTrigger value="results" className="flex items-center" disabled={!showResults}>
              <BarChart className="mr-2 h-4 w-4" />
              Results
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="calculator" className="space-y-4 mt-4">
            <FormField
              label="Fuel Type"
              htmlFor="fuelType"
            >
              <Select
                value={fuelType}
                onValueChange={setFuelType}
              >
                <SelectTrigger id="fuelType">
                  <SelectValue placeholder="Select fuel type" />
                </SelectTrigger>
                <SelectContent>
                  {fuelPrices.map((fuel) => (
                    <SelectItem key={fuel.id} value={fuel.id}>
                      <div className="flex items-center">
                        <Droplet className="mr-2 h-4 w-4" />
                        {fuel.name} (${fuel.price.toFixed(2)}/
                        {fuel.id === 'electric' ? 'kWh' : 'L'})
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
            
            <FormField
              label="Distance (km)"
              htmlFor="distance"
            >
              <Input
                id="distance"
                type="number"
                min="1"
                value={distance}
                onChange={(e) => setDistance(Number(e.target.value))}
                leftIcon={<Car size={16} />}
              />
            </FormField>
            
            {fuelType === 'electric' ? (
              <FormField
                label="Efficiency (kWh/100km)"
                htmlFor="electricEfficiency"
                hint="Lower is better"
              >
                <Input
                  id="electricEfficiency"
                  type="number"
                  min="1"
                  step="0.1"
                  value={electricEfficiency}
                  onChange={(e) => setElectricEfficiency(Number(e.target.value))}
                  leftIcon={<Fuel size={16} />}
                />
              </FormField>
            ) : (
              <FormField
                label="Efficiency (L/100km)"
                htmlFor="efficiency"
                hint="Lower is better"
              >
                <Input
                  id="efficiency"
                  type="number"
                  min="1"
                  step="0.1"
                  value={efficiency}
                  onChange={(e) => setEfficiency(Number(e.target.value))}
                  leftIcon={<Fuel size={16} />}
                />
              </FormField>
            )}
            
            <div className="flex justify-between mt-6">
              <Button
                variant="outline"
                onClick={resetCalculator}
                leftIcon={<RefreshCw size={16} />}
              >
                Reset
              </Button>
              
              <Button
                onClick={calculateFuelCost}
                isLoading={isLoading}
                leftIcon={<Calculator size={16} />}
                variant="green"
              >
                Calculate
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="results" className="space-y-4 mt-4">
            <AnimatePresence>
              {showResults && (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg mb-4">
                      <div className="flex justify-between items-center">
                        <Typography variant="h4" className="text-green-700 dark:text-green-400 flex items-center">
                          <DollarSign className="mr-2 h-5 w-5" />
                          Total Cost
                        </Typography>
                        <Typography variant="h3" className="text-green-700 dark:text-green-400">
                          ${cost.toFixed(2)}
                        </Typography>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="grid grid-cols-2 gap-4"
                  >
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                      <Typography variant="muted">Consumption</Typography>
                      <Typography variant="h4" className="text-blue-700 dark:text-blue-400">
                        {consumption.toFixed(2)} {fuelType === 'electric' ? 'kWh' : 'L'}
                      </Typography>
                    </div>
                    
                    <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
                      <Typography variant="muted">CO₂ Emissions</Typography>
                      <Typography variant="h4" className="text-amber-700 dark:text-amber-400">
                        {co2Emissions.toFixed(2)} kg
                      </Typography>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    className="mt-4"
                  >
                    <Typography variant="muted">
                      Based on current prices for {fuelPrices.find(f => f.id === fuelType)?.name} 
                      (${fuelPrices.find(f => f.id === fuelType)?.price.toFixed(2)}/
                      {fuelType === 'electric' ? 'kWh' : 'L'})
                    </Typography>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Typography variant="small" className="text-muted-foreground">
          {isOnline ? 'Using real-time prices' : 'Using offline prices'}
        </Typography>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={fetchFuelPrices}
          disabled={isLoading || !isOnline}
          leftIcon={<RefreshCw size={14} />}
        >
          Update Prices
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FuelCalculator;
