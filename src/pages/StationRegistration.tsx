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
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Apple, Share2, Star, Mail, MessageSquare, X } from 'lucide-react';
import VerificationStep from "@/components/verification/VerificationStep";

// Define city data by state
const citiesByState: { [key: string]: string[] } = {
  "AL": ["Birmingham", "Montgomery", "Mobile", "Huntsville", "Tuscaloosa", "Hoover", "Dothan", "Auburn", "Decatur", "Madison"],
  "AK": ["Anchorage", "Fairbanks", "Juneau", "Sitka", "Ketchikan", "Wasilla", "Kenai", "Kodiak", "Bethel", "Palmer"],
  "AZ": ["Phoenix", "Tucson", "Mesa", "Chandler", "Scottsdale", "Glendale", "Gilbert", "Tempe", "Peoria", "Surprise"],
  "AR": ["Little Rock", "Fort Smith", "Fayetteville", "Springdale", "Jonesboro", "North Little Rock", "Conway", "Rogers", "Pine Bluff", "Bentonville"],
  "CA": ["Los Angeles", "San Diego", "San Jose", "San Francisco", "Fresno", "Sacramento", "Long Beach", "Oakland", "Bakersfield", "Anaheim"],
  "CO": ["Denver", "Colorado Springs", "Aurora", "Fort Collins", "Lakewood", "Thornton", "Arvada", "Westminster", "Pueblo", "Centennial"],
  "CT": ["Bridgeport", "New Haven", "Hartford", "Stamford", "Waterbury", "Norwalk", "Danbury", "New Britain", "Bristol", "Meriden"],
  "DE": ["Wilmington", "Dover", "Newark", "Middletown", "Smyrna", "Milford", "Seaford", "Georgetown", "Elsmere", "New Castle"],
  "FL": ["Jacksonville", "Miami", "Tampa", "Orlando", "St. Petersburg", "Hialeah", "Tallahassee", "Fort Lauderdale", "Port St. Lucie", "Cape Coral"],
  "GA": ["Atlanta", "Augusta", "Columbus", "Macon", "Savannah", "Athens", "Sandy Springs", "Roswell", "Albany", "Johns Creek"],
  "HI": ["Honolulu", "East Honolulu", "Pearl City", "Hilo", "Kailua", "Waipahu", "Kaneohe", "Mililani Town", "Kahului", "Ewa Gentry"],
  "ID": ["Boise", "Meridian", "Nampa", "Idaho Falls", "Pocatello", "Caldwell", "Coeur d'Alene", "Twin Falls", "Lewiston", "Post Falls"],
  "IL": ["Chicago", "Aurora", "Rockford", "Joliet", "Naperville", "Springfield", "Peoria", "Elgin", "Waukegan", "Champaign"],
  "IN": ["Indianapolis", "Fort Wayne", "Evansville", "South Bend", "Carmel", "Fishers", "Bloomington", "Hammond", "Gary", "Lafayette"],
  "IA": ["Des Moines", "Cedar Rapids", "Davenport", "Sioux City", "Iowa City", "Waterloo", "Council Bluffs", "Ames", "West Des Moines", "Ankeny"],
  "KS": ["Wichita", "Overland Park", "Kansas City", "Olathe", "Topeka", "Lawrence", "Shawnee", "Manhattan", "Lenexa", "Salina"],
  "KY": ["Louisville", "Lexington", "Bowling Green", "Owensboro", "Covington", "Richmond", "Georgetown", "Florence", "Hopkinsville", "Nicholasville"],
  "LA": ["New Orleans", "Baton Rouge", "Shreveport", "Lafayette", "Lake Charles", "Kenner", "Bossier City", "Monroe", "Alexandria", "Houma"],
  "ME": ["Portland", "Lewiston", "Bangor", "South Portland", "Auburn", "Biddeford", "Sanford", "Augusta", "Saco", "Westbrook"],
  "MD": ["Baltimore", "Frederick", "Rockville", "Gaithersburg", "Bowie", "Hagerstown", "Annapolis", "College Park", "Salisbury", "Laurel"],
  "MA": ["Boston", "Worcester", "Springfield", "Lowell", "Cambridge", "New Bedford", "Brockton", "Quincy", "Lynn", "Fall River"],
  "MI": ["Detroit", "Grand Rapids", "Warren", "Sterling Heights", "Ann Arbor", "Lansing", "Flint", "Dearborn", "Livonia", "Troy"],
  "MN": ["Minneapolis", "St. Paul", "Rochester", "Duluth", "Bloomington", "Brooklyn Park", "Plymouth", "St. Cloud", "Eagan", "Woodbury"],
  "MS": ["Jackson", "Gulfport", "Southaven", "Hattiesburg", "Biloxi", "Meridian", "Tupelo", "Greenville", "Olive Branch", "Horn Lake"],
  "MO": ["Kansas City", "St. Louis", "Springfield", "Columbia", "Independence", "Lee's Summit", "O'Fallon", "St. Joseph", "St. Charles", "Blue Springs"],
  "MT": ["Billings", "Missoula", "Great Falls", "Bozeman", "Butte", "Helena", "Kalispell", "Havre", "Anaconda", "Miles City"],
  "NE": ["Omaha", "Lincoln", "Bellevue", "Grand Island", "Kearney", "Fremont", "Hastings", "Norfolk", "Columbus", "North Platte"],
  "NV": ["Las Vegas", "Henderson", "Reno", "North Las Vegas", "Sparks", "Carson City", "Fernley", "Elko", "Mesquite", "Boulder City"],
  "NH": ["Manchester", "Nashua", "Concord", "Derry", "Dover", "Rochester", "Salem", "Merrimack", "Londonderry", "Hudson"],
  "NJ": ["Newark", "Jersey City", "Paterson", "Elizabeth", "Trenton", "Clifton", "Camden", "Passaic", "Union City", "Bayonne"],
  "NM": ["Albuquerque", "Las Cruces", "Rio Rancho", "Santa Fe", "Roswell", "Farmington", "Alamogordo", "Clovis", "Hobbs", "Carlsbad"],
  "NY": ["New York City", "Buffalo", "Rochester", "Yonkers", "Syracuse", "Albany", "New Rochelle", "Mount Vernon", "Schenectady", "Utica"],
  "NC": ["Charlotte", "Raleigh", "Greensboro", "Durham", "Winston-Salem", "Fayetteville", "Cary", "Wilmington", "High Point", "Concord"],
  "ND": ["Fargo", "Bismarck", "Grand Forks", "Minot", "West Fargo", "Williston", "Dickinson", "Mandan", "Jamestown", "Wahpeton"],
  "OH": ["Columbus", "Cleveland", "Cincinnati", "Toledo", "Akron", "Dayton", "Parma", "Canton", "Youngstown", "Lorain"],
  "OK": ["Oklahoma City", "Tulsa", "Norman", "Broken Arrow", "Lawton", "Edmond", "Moore", "Midwest City", "Enid", "Stillwater"],
  "OR": ["Portland", "Salem", "Eugene", "Gresham", "Hillsboro", "Beaverton", "Bend", "Medford", "Springfield", "Corvallis"],
  "PA": ["Philadelphia", "Pittsburgh", "Allentown", "Erie", "Reading", "Scranton", "Bethlehem", "Lancaster", "Harrisburg", "Altoona"],
  "RI": ["Providence", "Warwick", "Cranston", "Pawtucket", "East Providence", "Woonsocket", "Coventry", "Cumberland", "North Providence", "South Kingstown"],
  "SC": ["Columbia", "Charleston", "North Charleston", "Mount Pleasant", "Rock Hill", "Greenville", "Summerville", "Sumter", "Goose Creek", "Hilton Head Island"],
  "SD": ["Sioux Falls", "Rapid City", "Aberdeen", "Brookings", "Watertown", "Mitchell", "Yankton", "Pierre", "Huron", "Vermillion"],
  "TN": ["Nashville", "Memphis", "Knoxville", "Chattanooga", "Clarksville", "Murfreesboro", "Franklin", "Jackson", "Johnson City", "Bartlett"],
  "TX": ["Houston", "San Antonio", "Dallas", "Austin", "Fort Worth", "El Paso", "Arlington", "Corpus Christi", "Plano", "Laredo"],
  "UT": ["Salt Lake City", "West Valley City", "Provo", "West Jordan", "Orem", "Sandy", "Ogden", "St. George", "Layton", "South Jordan"],
  "VT": ["Burlington", "South Burlington", "Rutland", "Barre", "Montpelier", "Winooski", "St. Albans", "Newport", "Vergennes", "Brattleboro"],
  "VA": ["Virginia Beach", "Norfolk", "Chesapeake", "Richmond", "Newport News", "Alexandria", "Hampton", "Roanoke", "Portsmouth", "Suffolk"],
  "WA": ["Seattle", "Spokane", "Tacoma", "Vancouver", "Bellevue", "Kent", "Everett", "Renton", "Yakima", "Federal Way"],
  "WV": ["Charleston", "Huntington", "Parkersburg", "Morgantown", "Wheeling", "Weirton", "Fairmont", "Beckley", "Martinsburg", "Clarksburg"],
  "WI": ["Milwaukee", "Madison", "Green Bay", "Kenosha", "Racine", "Appleton", "Waukesha", "Eau Claire", "Oshkosh", "Janesville"],
  "WY": ["Cheyenne", "Casper", "Laramie", "Gillette", "Rock Springs", "Sheridan", "Green River", "Evanston", "Riverton", "Jackson"]
};

const StationRegistration = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [showAppDownloadDialog, setShowAppDownloadDialog] = useState(false);
  const [availableCities, setAvailableCities] = useState<string[]>([]);
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

    // If state is changed, update available cities and reset city selection
    if (name === 'state') {
      const cities = citiesByState[value] || [];
      setAvailableCities(cities);
      setFormData(prev => ({ ...prev, city: '' }));
    }
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

  // Function to skip to dashboard
  const skipToDashboard = () => {
    // Save current progress
    localStorage.setItem('stationRegistrationProgress', JSON.stringify({
      step: step,
      formData: formData
    }));

    // Set verification status as incomplete
    localStorage.setItem('stationVerificationStatus', 'incomplete');
    localStorage.setItem('stationVerificationDate', new Date().toISOString());

    // Show notification
    toast({
      title: "Progress Saved",
      description: "You can complete your registration later from the dashboard.",
      duration: 5000,
    });

    // Redirect to dashboard
    navigate('/station-dashboard');
  };

  // Handle app download button click
  const handleAppDownloadClick = () => {
    setShowAppDownloadDialog(true);
  };

  // Handle download app action
  const handleDownloadApp = (platform: 'ios' | 'android') => {
    toast({
      title: `Downloading ${platform === 'ios' ? 'iOS' : 'Android'} App`,
      description: `You're being redirected to the ${platform === 'ios' ? 'App Store' : 'Google Play Store'}`,
      duration: 3000,
    });

    // Simulate app store redirect without delay
    setShowAppDownloadDialog(false);
    toast({
      title: "Download Started",
      description: "Thank you for downloading the FuelFriendly app!",
      duration: 3000,
    });
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
      <CardFooter className="flex flex-col space-y-3">
        <Button
          className="w-full bg-green-500 hover:bg-green-600"
          onClick={nextStep}
        >
          Continue
        </Button>
        <Button
          variant="ghost"
          className="w-full text-gray-500 hover:text-gray-700"
          onClick={skipToDashboard}
        >
          I'll Complete Later
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
            <Select
              value={formData.city}
              onValueChange={(value) => handleSelectChange('city', value)}
              disabled={!formData.state}
            >
              <SelectTrigger id="city">
                <SelectValue placeholder={formData.state ? "Select City" : "Select State First"} />
              </SelectTrigger>
              <SelectContent className="max-h-[200px]">
                {availableCities.length > 0 ? (
                  availableCities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="" disabled>
                    {formData.state ? "No cities available" : "Select a state first"}
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
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
              <SelectContent className="max-h-[200px]">
                <SelectItem value="AL">Alabama</SelectItem>
                <SelectItem value="AK">Alaska</SelectItem>
                <SelectItem value="AZ">Arizona</SelectItem>
                <SelectItem value="AR">Arkansas</SelectItem>
                <SelectItem value="CA">California</SelectItem>
                <SelectItem value="CO">Colorado</SelectItem>
                <SelectItem value="CT">Connecticut</SelectItem>
                <SelectItem value="DE">Delaware</SelectItem>
                <SelectItem value="FL">Florida</SelectItem>
                <SelectItem value="GA">Georgia</SelectItem>
                <SelectItem value="HI">Hawaii</SelectItem>
                <SelectItem value="ID">Idaho</SelectItem>
                <SelectItem value="IL">Illinois</SelectItem>
                <SelectItem value="IN">Indiana</SelectItem>
                <SelectItem value="IA">Iowa</SelectItem>
                <SelectItem value="KS">Kansas</SelectItem>
                <SelectItem value="KY">Kentucky</SelectItem>
                <SelectItem value="LA">Louisiana</SelectItem>
                <SelectItem value="ME">Maine</SelectItem>
                <SelectItem value="MD">Maryland</SelectItem>
                <SelectItem value="MA">Massachusetts</SelectItem>
                <SelectItem value="MI">Michigan</SelectItem>
                <SelectItem value="MN">Minnesota</SelectItem>
                <SelectItem value="MS">Mississippi</SelectItem>
                <SelectItem value="MO">Missouri</SelectItem>
                <SelectItem value="MT">Montana</SelectItem>
                <SelectItem value="NE">Nebraska</SelectItem>
                <SelectItem value="NV">Nevada</SelectItem>
                <SelectItem value="NH">New Hampshire</SelectItem>
                <SelectItem value="NJ">New Jersey</SelectItem>
                <SelectItem value="NM">New Mexico</SelectItem>
                <SelectItem value="NY">New York</SelectItem>
                <SelectItem value="NC">North Carolina</SelectItem>
                <SelectItem value="ND">North Dakota</SelectItem>
                <SelectItem value="OH">Ohio</SelectItem>
                <SelectItem value="OK">Oklahoma</SelectItem>
                <SelectItem value="OR">Oregon</SelectItem>
                <SelectItem value="PA">Pennsylvania</SelectItem>
                <SelectItem value="RI">Rhode Island</SelectItem>
                <SelectItem value="SC">South Carolina</SelectItem>
                <SelectItem value="SD">South Dakota</SelectItem>
                <SelectItem value="TN">Tennessee</SelectItem>
                <SelectItem value="TX">Texas</SelectItem>
                <SelectItem value="UT">Utah</SelectItem>
                <SelectItem value="VT">Vermont</SelectItem>
                <SelectItem value="VA">Virginia</SelectItem>
                <SelectItem value="WA">Washington</SelectItem>
                <SelectItem value="WV">West Virginia</SelectItem>
                <SelectItem value="WI">Wisconsin</SelectItem>
                <SelectItem value="WY">Wyoming</SelectItem>
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
      <CardFooter className="flex flex-col space-y-3">
        <div className="flex justify-between w-full">
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
        </div>
        <Button
          variant="ghost"
          className="w-full text-gray-500 hover:text-gray-700"
          onClick={skipToDashboard}
        >
          I'll Complete Later
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
      <CardFooter className="flex flex-col space-y-3">
        <div className="flex justify-between w-full">
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
        </div>
        <Button
          variant="ghost"
          className="w-full text-gray-500 hover:text-gray-700"
          onClick={skipToDashboard}
        >
          I'll Complete Later
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
      <CardFooter className="flex flex-col space-y-3">
        <div className="flex justify-between w-full">
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
        </div>
        <Button
          variant="ghost"
          className="w-full text-gray-500 hover:text-gray-700"
          onClick={skipToDashboard}
        >
          I'll Complete Later
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
      onSkip={skipToDashboard}
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
      <CardFooter className="flex flex-col space-y-3">
        <div className="flex justify-between w-full">
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
        </div>
        <Button
          variant="ghost"
          className="w-full text-gray-500 hover:text-gray-700"
          onClick={skipToDashboard}
        >
          I'll Complete Later
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
      <CardFooter className="flex flex-col space-y-3">
        <div className="flex justify-between w-full">
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
        </div>
        <Button
          variant="ghost"
          className="w-full text-gray-500 hover:text-gray-700"
          onClick={skipToDashboard}
        >
          I'll Complete Later
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

            {/* Download App Button */}
            <div className="mt-4 flex justify-center">
              <Button
                onClick={handleAppDownloadClick}
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                Download Our App
              </Button>
            </div>

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

      {/* App Download Dialog */}
      <Dialog open={showAppDownloadDialog} onOpenChange={setShowAppDownloadDialog}>
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
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">FuelFriendly</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Fuel delivery at your fingertips</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  onClick={() => setShowAppDownloadDialog(false)}
                >
                  <X size={18} />
                </Button>
              </div>

              <div className="flex flex-col md:flex-row gap-6">
                {/* App preview */}
                <div className="md:w-2/5">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-green-400/20 to-blue-500/20 rounded-3xl blur-xl"></div>
                    <div className="relative bg-gray-900 rounded-3xl p-2 shadow-xl overflow-hidden">
                      <div className="rounded-2xl overflow-hidden bg-green-500 dark:bg-green-600">
                        <div className="pt-6 px-4 bg-gradient-to-b from-green-500 to-green-600 dark:from-green-600 dark:to-green-700">
                          <div className="text-white mb-2">
                            <div className="text-xs opacity-80">Welcome back</div>
                            <div className="text-lg font-medium">John Doe</div>
                          </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-t-xl p-3 mt-2">
                          <div className="bg-white dark:bg-gray-800 rounded-xl p-3 mb-4">
                            <div className="text-sm">10 Gallons Regular</div>
                            <div className="flex justify-between items-center mt-2">
                              <div className="text-xs opacity-80">Status</div>
                              <div className="text-xs bg-green-500 dark:bg-green-600 px-2 py-0.5 rounded-full text-white">On the way</div>
                            </div>
                          </div>

                          <div className="bg-white dark:bg-gray-800 rounded-xl p-3 mb-4">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-green-500 dark:bg-green-600 rounded-full flex items-center justify-center mr-2">
                                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                </svg>
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
                        onClick={() => handleDownloadApp('ios')}
                      >
                        <div className="flex items-center">
                          <Apple className="w-8 h-8 mr-3" />
                          <div className="text-left">
                            <div className="text-xs">Download on the</div>
                            <div className="text-xl font-semibold -mt-1">App Store</div>
                          </div>
                        </div>
                      </Button>

                      <Button
                        className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center h-14 rounded-xl transition-transform hover:scale-105 active:scale-95"
                        onClick={() => handleDownloadApp('android')}
                      >
                        <div className="flex items-center">
                          <svg className="w-8 h-8 mr-3" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.2439 13.8533 7.8508 12 7.8508s-3.5902.3931-5.1367 1.0989L4.841 5.4467a.4161.4161 0 00-.5677-.1521.4157.4157 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3435-4.1021-2.6892-7.5743-6.0775-9.4396"/>
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
                        <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMzAgMzMwIj48cGF0aCBkPSJNMCAwaDMzMHYzMzBIMHoiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6TTYwIDMwaDMwdjMwSDYwek05MCAzMGgzMHYzMEg5MHpNMTIwIDMwaDMwdjMwaC0zMHpNMTUwIDMwaDMwdjMwaC0zMHpNMjEwIDMwaDMwdjMwaC0zMHpNMjcwIDMwaDMwdjMwaC0zMHpNMzAgNjBoMzB2MzBIMzB6TTYwIDIxMGgzMHYzMEg5MHpNMTIwIDEyMGgzMHYzMGgtMzB6TTIxMCA2MGgzMHYzMGgtMzB6TTI3MCA2MGgzMHYzMGgtMzB6TTMwIDkwaDMwdjM0SDMwek05MCA5MGgzMHYzMEg5MHpNMTIwIDEyMGgzMHYzMGgtMzB6TTE1MCAxMjBoMzB2MzBoLTMwek0xODAgMTIwaDMwdjMwaC0zMHpNMjEwIDEyMGgzMHYzMGgtMzB6TTI3MCAxODBoMzB2MzBoLTMwek0zMCAyMTBoMzB2MzBIMzB6TTYwIDIxMGgzMHYzMEg2MHpNOTAgMjEwaDMwdjMwSDkwek0xMjAgMjEwaDMwdjMwaC0zMHpNMTUwIDIxMGgzMHYzMGgtMzB6TDE4MCAyMTBoMzB2MzBoLTMwek0yMTAgMjEwaDMwdjMwaC0zMHpNMjQwIDIxMGgzMHYzMGgtMzB6TTI3MCAyMTBoMzB2MzBoLTMwek0zMCAyNDBoMzB2MzBIMzB6TTYwIDI0MGgzMHYzMEg2MHpNOTAgMjQwaDMwdjMwSDkwek0xMjAgMjQwaDMwdjMwaC0zMHpNMTUwIDI0MGgzMHYzMGgtMzB6TDE4MCAyNDBoMzB2MzBoLTMwek0yMTAgMjQwaDMwdjMwaC0zMHpNMjQwIDI0MGgzMHYzMGgtMzB6TTI3MCAyNDBoMzB2MzBoLTMweiIvPjwvc3ZnPg==')] dark:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMzAgMzMwIj48cGF0aCBkPSJNMCAwaDMzMHYzMzBIMHoiIGZpbGw9IiMxZjI5MzciLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6TTYwIDMwaDMwdjMwSDYwek05MCAzMGgzMHYzMEg5MHpNMTIwIDMwaDMwdjMwaC0zMHpNMTUwIDMwaDMwdjMwaC0zMHpNMjEwIDMwaDMwdjMwaC0zMHpNMjcwIDMwaDMwdjMwaC0zMHpNMzAgNjBoMzB2MzBIMzB6TTYwIDIxMGgzMHYzMEg5MHpNMTIwIDEyMGgzMHYzMGgtMzB6TTIxMCA2MGgzMHYzMGgtMzB6TTI3MCA2MGgzMHYzMGgtMzB6TTMwIDkwaDMwdjM0SDMwek05MCA5MGgzMHYzMEg5MHpNMTIwIDEyMGgzMHYzMGgtMzB6TTE1MCAxMjBoMzB2MzBoLTMwek0xODAgMTIwaDMwdjMwaC0zMHpNMjEwIDEyMGgzMHYzMGgtMzB6TTI3MCAxODBoMzB2MzBoLTMwek0zMCAyMTBoMzB2MzBIMzB6TTYwIDIxMGgzMHYzMEg2MHpNOTAgMjEwaDMwdjMwSDkwek0xMjAgMjEwaDMwdjMwaC0zMHpNMTUwIDIxMGgzMHYzMGgtMzB6TDE4MCAyMTBoMzB2MzBoLTMwek0yMTAgMjEwaDMwdjMwaC0zMHpNMjQwIDIxMGgzMHYzMGgtMzB6TTI3MCAyMTBoMzB2MzBoLTMwek0zMCAyNDBoMzB2MzBIMzB6TTYwIDI0MGgzMHYzMEg2MHpNOTAgMjQwaDMwdjMwSDkwek0xMjAgMjQwaDMwdjMwaC0zMHpNMTUwIDI0MGgzMHYzMGgtMzB6TDE4MCAyNDBoMzB2MzBoLTMwek0yMTAgMjQwaDMwdjMwaC0zMHpNMjQwIDI0MGgzMHYzMGgtMzB6TTI3MCAyNDBoMzB2MzBoLTMweiIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==')] bg-center bg-contain rounded-lg"></div>
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
                        setShowAppDownloadDialog(false);
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
  );
};

export default StationRegistration;
