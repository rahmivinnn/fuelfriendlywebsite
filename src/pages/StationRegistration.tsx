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
import VerificationStep from "@/components/verification/VerificationStep";

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
    taxId: '',
    paymentMethods: [],
    isVerified: false,
    licenseVerified: false,
    faceVerified: false
  });

  const [paymentMethod, setPaymentMethod] = useState({
    type: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    holderName: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentMethod(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentTypeChange = (value: string) => {
    setPaymentMethod(prev => ({ ...prev, type: value }));
  };

  const addPaymentMethod = () => {
    // Basic validation
    if (!paymentMethod.type || !paymentMethod.cardNumber || !paymentMethod.expiry || !paymentMethod.holderName) {
      toast({
        title: "Incomplete Information",
        description: "Please fill in all required payment method fields.",
        variant: "destructive"
      });
      return;
    }

    // Add payment method to formData
    const newPaymentMethod = { ...paymentMethod, id: Date.now().toString() };
    setFormData(prev => ({
      ...prev,
      paymentMethods: [...prev.paymentMethods, newPaymentMethod]
    }));

    // Reset payment form
    setPaymentMethod({
      type: '',
      cardNumber: '',
      expiry: '',
      cvv: '',
      holderName: ''
    });

    toast({
      title: "Payment Method Added",
      description: "Your payment method has been added successfully.",
    });
  };

  const removePaymentMethod = (id: string) => {
    setFormData(prev => ({
      ...prev,
      paymentMethods: prev.paymentMethods.filter(method => method.id !== id)
    }));

    toast({
      title: "Payment Method Removed",
      description: "Your payment method has been removed.",
    });
  };

  const nextStep = () => {
    // If we're on the verification step and not verified, show a message
    if (step === 4 && !formData.isVerified) {
      toast({
        title: "Verification Required",
        description: "Please complete both verification steps before proceeding.",
        variant: "destructive"
      });
      return;
    }

    if (step < 6) {
      setStep(prev => prev + 1);
      toast({
        title: "Progress Saved",
        description: "Your information has been saved. Please continue with the registration.",
      });
    } else {
      // Show verification waiting notification
      toast({
        title: "Registration Complete!",
        description: "Your station has been registered successfully.",
      });

      // Show verification waiting notification
      setTimeout(() => {
        toast({
          title: "Verification Pending",
          description: "Your station is now pending verification. This process may take up to 3x24 hours.",
          duration: 6000,
        });
      }, 1000);

      // Store verification status in localStorage
      localStorage.setItem('stationVerificationStatus', 'pending');
      localStorage.setItem('stationVerificationDate', new Date().toISOString());

      // Redirect to dashboard
      navigate('/station-dashboard');
    }
  };

  // Handle verification completion
  const handleVerificationComplete = () => {
    setFormData(prev => ({
      ...prev,
      isVerified: true,
      // These would normally be set by the verification components
      // but for demo purposes we'll set them here
      licenseVerified: true,
      faceVerified: true,
      // Optional verifications might be partially completed
      phoneVerified: Math.random() > 0.5,
      emailVerified: Math.random() > 0.3,
      documentVerified: Math.random() > 0.7,
      governmentIdVerified: Math.random() > 0.6,
      biometricVerified: Math.random() > 0.4
    }));

    toast({
      title: "Verification Complete",
      description: "Your identity has been verified successfully. You can now proceed with registration.",
    });
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
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
          <h3 className="font-medium text-green-800 mb-1">Free Registration for Station Owners</h3>
          <p className="text-sm text-green-700">
            Registration is completely free for all station owners. Join our platform and start growing your business today!
          </p>
        </div>
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

    // Step 5: Identity Verification
    <VerificationStep
      onNext={() => {
        handleVerificationComplete();
        nextStep();
      }}
      onPrev={prevStep}
      email={formData.email}
    />,

    // Step 6: Payment Methods
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Payment Methods</CardTitle>
        <CardDescription>Add payment methods for your station</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Display existing payment methods */}
        {formData.paymentMethods.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Your Payment Methods</h3>
            {formData.paymentMethods.map((method) => (
              <div key={method.id} className="p-3 bg-gray-50 rounded-lg flex justify-between items-center">
                <div>
                  <p className="font-medium">{method.type}</p>
                  <p className="text-sm text-gray-500">
                    {method.cardNumber.substring(0, 4)} •••• •••• {method.cardNumber.slice(-4)} | {method.holderName}
                  </p>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removePaymentMethod(method.id)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Add new payment method form */}
        <div className="border p-4 rounded-lg space-y-4">
          <h3 className="text-sm font-medium">Add New Payment Method</h3>

          <div className="space-y-2">
            <Label htmlFor="paymentType">Payment Type</Label>
            <Select
              value={paymentMethod.type}
              onValueChange={(value) => handlePaymentTypeChange(value)}
            >
              <SelectTrigger id="paymentType">
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Visa">Visa</SelectItem>
                <SelectItem value="Mastercard">Mastercard</SelectItem>
                <SelectItem value="American Express">American Express</SelectItem>
                <SelectItem value="Discover">Discover</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              name="cardNumber"
              placeholder="XXXX XXXX XXXX XXXX"
              value={paymentMethod.cardNumber}
              onChange={handlePaymentMethodChange}
              maxLength={16}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiry">Expiry Date</Label>
              <Input
                id="expiry"
                name="expiry"
                placeholder="MM/YY"
                value={paymentMethod.expiry}
                onChange={handlePaymentMethodChange}
                maxLength={5}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                name="cvv"
                placeholder="XXX"
                type="password"
                value={paymentMethod.cvv}
                onChange={handlePaymentMethodChange}
                maxLength={4}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="holderName">Card Holder Name</Label>
            <Input
              id="holderName"
              name="holderName"
              placeholder="Full Name on Card"
              value={paymentMethod.holderName}
              onChange={handlePaymentMethodChange}
            />
          </div>

          <Button
            type="button"
            className="w-full bg-green-500 hover:bg-green-600 mt-2"
            onClick={addPaymentMethod}
          >
            Add Payment Method
          </Button>
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

    // Step 7: Review & Submit
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
          <p className="text-sm text-green-700 mb-1"><strong>Owner:</strong> {formData.ownerName || "Not provided"}</p>
          <p className="text-sm text-green-700 mb-1"><strong>Payment Methods:</strong> {formData.paymentMethods.length} added</p>
          <p className="text-sm text-green-700 mb-1"><strong>Identity Verification:</strong> {formData.isVerified ? "✓ Verified" : "Not verified"}</p>
          <div className="mt-2 pt-2 border-t border-green-100">
            <p className="text-sm font-medium text-green-800 mb-1">Verification Status:</p>
            <ul className="text-xs text-green-700 space-y-1 pl-2">
              <li className="flex items-center">
                <span className="inline-block w-4 h-4 mr-1 bg-green-100 rounded-full flex items-center justify-center">
                  {formData.licenseVerified ? "✓" : "○"}
                </span>
                Driver's License: {formData.licenseVerified ? "Verified" : "Not verified"}
              </li>
              <li className="flex items-center">
                <span className="inline-block w-4 h-4 mr-1 bg-green-100 rounded-full flex items-center justify-center">
                  {formData.faceVerified ? "✓" : "○"}
                </span>
                Face Verification: {formData.faceVerified ? "Verified" : "Not verified"}
              </li>
              <li className="flex items-center">
                <span className="inline-block w-4 h-4 mr-1 bg-green-100 rounded-full flex items-center justify-center">
                  {formData.phoneVerified ? "✓" : "○"}
                </span>
                Phone Number: {formData.phoneVerified ? "Verified" : "Optional"}
              </li>
              <li className="flex items-center">
                <span className="inline-block w-4 h-4 mr-1 bg-green-100 rounded-full flex items-center justify-center">
                  {formData.emailVerified ? "✓" : "○"}
                </span>
                Email Address: {formData.emailVerified ? "Verified" : "Optional"}
              </li>
              <li className="flex items-center">
                <span className="inline-block w-4 h-4 mr-1 bg-green-100 rounded-full flex items-center justify-center">
                  {formData.documentVerified ? "✓" : "○"}
                </span>
                Business Document: {formData.documentVerified ? "Verified" : "Optional"}
              </li>
              <li className="flex items-center">
                <span className="inline-block w-4 h-4 mr-1 bg-green-100 rounded-full flex items-center justify-center">
                  {formData.governmentIdVerified ? "✓" : "○"}
                </span>
                Government ID: {formData.governmentIdVerified ? "Verified" : "Optional"}
              </li>
              <li className="flex items-center">
                <span className="inline-block w-4 h-4 mr-1 bg-green-100 rounded-full flex items-center justify-center">
                  {formData.biometricVerified ? "✓" : "○"}
                </span>
                Biometric: {formData.biometricVerified ? "Verified" : "Optional"}
              </li>
            </ul>
          </div>
        </div>

        <div className="text-sm text-gray-500">
          By clicking "Complete Registration", you agree to our Terms of Service and Privacy Policy. We'll create your station profile and set up your dashboard.
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={prevStep}
          className="px-6 py-6 rounded-xl border-2 hover:bg-gray-50 transition-all duration-300 font-medium"
          size="lg"
        >
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </span>
        </Button>
        <Button
          className="bg-green-500 hover:bg-green-600 px-6 py-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 font-medium"
          onClick={nextStep}
          size="lg"
        >
          <span className="flex items-center">
            Complete Registration
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
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
              {Array.from({ length: 7 }).map((_, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      index < step + 1 ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {index < step ? "✓" : index + 1}
                  </div>
                  {index < 6 && (
                    <div
                      className={`w-8 h-1 ${
                        index < step ? "bg-green-500" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            {/* Form steps */}
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
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
