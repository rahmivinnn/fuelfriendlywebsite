
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const StationRegistration = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    stationName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phoneNumber: '',
    fuelTypes: [],
    amenities: [],
    businessHours: '',
    ownerName: '',
    businessLicense: '',
    taxId: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    if (step < 4) {
      setStep(prev => prev + 1);
      toast({
        title: "Progress Saved",
        description: "Your information has been saved. Please continue with the registration.",
      });
    } else {
      // Final step - complete registration
      toast({
        title: "Registration Complete!",
        description: "Your station has been registered successfully. Redirecting to dashboard...",
      });
      setTimeout(() => {
        navigate('/station-dashboard');
      }, 1500);
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(prev => prev - 1);
    }
  };

  const steps = [
    // Step 1: Get Started
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Get Started</CardTitle>
        <CardDescription>Create your account to register your station</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full bg-green-500 hover:bg-green-600"
          onClick={nextStep}
        >
          Continue
        </Button>
      </CardFooter>
    </Card>,

    // Step 2: Station Information
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Station Registration</CardTitle>
        <CardDescription>Enter your station details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="stationName">Station Name</Label>
          <Input
            id="stationName"
            name="stationName"
            placeholder="Your Station Name"
            value={formData.stationName}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            name="address"
            placeholder="123 Main St"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Select
              value={formData.state}
              onValueChange={(value) => handleSelectChange('state', value)}
            >
              <SelectTrigger id="state">
                <SelectValue placeholder="State" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AL">Alabama</SelectItem>
                <SelectItem value="AK">Alaska</SelectItem>
                <SelectItem value="AZ">Arizona</SelectItem>
                <SelectItem value="TN">Tennessee</SelectItem>
                <SelectItem value="TX">Texas</SelectItem>
                {/* Add other states */}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="zipCode">Zip Code</Label>
          <Input
            id="zipCode"
            name="zipCode"
            placeholder="12345"
            value={formData.zipCode}
            onChange={handleChange}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={prevStep}
        >
          Back
        </Button>
        <Button 
          className="bg-green-500 hover:bg-green-600"
          onClick={nextStep}
        >
          Continue
        </Button>
      </CardFooter>
    </Card>,

    // Step 3: Fuel Information
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Station Registration</CardTitle>
        <CardDescription>Tell us about your fuel options</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Fuel Types Available</Label>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="regular" className="rounded text-green-500 focus:ring-green-500" />
              <Label htmlFor="regular">Regular</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="premium" className="rounded text-green-500 focus:ring-green-500" />
              <Label htmlFor="premium">Premium</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="diesel" className="rounded text-green-500 focus:ring-green-500" />
              <Label htmlFor="diesel">Diesel</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="ethanol" className="rounded text-green-500 focus:ring-green-500" />
              <Label htmlFor="ethanol">Ethanol</Label>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            placeholder="(123) 456-7890"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label>Station Amenities</Label>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="carWash" className="rounded text-green-500 focus:ring-green-500" />
              <Label htmlFor="carWash">Car Wash</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="convenience" className="rounded text-green-500 focus:ring-green-500" />
              <Label htmlFor="convenience">Convenience Store</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="atm" className="rounded text-green-500 focus:ring-green-500" />
              <Label htmlFor="atm">ATM</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="restrooms" className="rounded text-green-500 focus:ring-green-500" />
              <Label htmlFor="restrooms">Restrooms</Label>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={prevStep}
        >
          Back
        </Button>
        <Button 
          className="bg-green-500 hover:bg-green-600"
          onClick={nextStep}
        >
          Continue
        </Button>
      </CardFooter>
    </Card>,

    // Step 4: Business Information
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Station Registration</CardTitle>
        <CardDescription>Enter your business information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input
            id="ownerName"
            name="ownerName"
            placeholder="Full Name"
            value={formData.ownerName}
            onChange={handleChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="businessLicense">Business License Number</Label>
          <Input
            id="businessLicense"
            name="businessLicense"
            placeholder="License Number"
            value={formData.businessLicense}
            onChange={handleChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="taxId">Tax ID / EIN</Label>
          <Input
            id="taxId"
            name="taxId"
            placeholder="XX-XXXXXXX"
            value={formData.taxId}
            onChange={handleChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="businessHours">Business Hours</Label>
          <Select
            value={formData.businessHours}
            onValueChange={(value) => handleSelectChange('businessHours', value)}
          >
            <SelectTrigger id="businessHours">
              <SelectValue placeholder="Select Hours" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24/7">24/7</SelectItem>
              <SelectItem value="6am-10pm">6am - 10pm</SelectItem>
              <SelectItem value="6am-12am">6am - 12am</SelectItem>
              <SelectItem value="5am-11pm">5am - 11pm</SelectItem>
              <SelectItem value="custom">Custom Hours</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={prevStep}
        >
          Back
        </Button>
        <Button 
          className="bg-green-500 hover:bg-green-600"
          onClick={nextStep}
        >
          Continue
        </Button>
      </CardFooter>
    </Card>,

    // Step 5: Review & Submit
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Complete Registration</CardTitle>
        <CardDescription>Review and submit your registration</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg bg-green-50 p-4 border border-green-100">
          <h3 className="font-medium text-green-800 mb-2">Registration Summary</h3>
          <p className="text-sm text-green-700 mb-1"><strong>Station:</strong> {formData.stationName || "Not provided"}</p>
          <p className="text-sm text-green-700 mb-1"><strong>Address:</strong> {formData.address || "Not provided"}, {formData.city || ""}, {formData.state || ""} {formData.zipCode || ""}</p>
          <p className="text-sm text-green-700 mb-1"><strong>Contact:</strong> {formData.phoneNumber || "Not provided"}</p>
          <p className="text-sm text-green-700"><strong>Owner:</strong> {formData.ownerName || "Not provided"}</p>
        </div>
        
        <div className="text-sm text-gray-500">
          By clicking "Complete Registration", you agree to our Terms of Service and Privacy Policy. We'll create your station profile and set up your dashboard.
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={prevStep}
        >
          Back
        </Button>
        <Button 
          className="bg-green-500 hover:bg-green-600"
          onClick={nextStep}
        >
          Complete Registration
        </Button>
      </CardFooter>
    </Card>
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <img 
              src="/lovable-uploads/f1f34c25-67df-4603-8eb1-3f1fe84812a4.png" 
              alt="FuelFriendly" 
              className="h-12 mx-auto mb-4" 
            />
            <h1 className="text-2xl font-bold">Station Registration</h1>
            <div className="flex justify-center mt-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex items-center">
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      index < step + 1 ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {index < step ? "✓" : index + 1}
                  </div>
                  {index < 4 && (
                    <div 
                      className={`w-12 h-1 ${
                        index < step ? "bg-green-500" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            {/* Registration form image in the background */}
            <div className="absolute right-0 top-0 w-1/3 h-full">
              <img 
                src="/lovable-uploads/f1f0e7c3-0517-4e65-a773-f0d394b5ec27.png" 
                alt="Registration illustration" 
                className="h-full object-contain" 
              />
            </div>
            
            {/* Form steps */}
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {steps[step]}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StationRegistration;
