
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Edit, Save, Upload, MapPin,
  Clock, Calendar, Phone, Mail, Building, User,
  Check, X, AlertCircle, Fuel, Car, ShoppingBag,
  Coffee, Wifi, CreditCard, Trash2, Plus, Image
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import DashboardLayout from '@/components/DashboardLayout';

const StationManagement = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const [showAddServiceDialog, setShowAddServiceDialog] = useState(false);
  const [newService, setNewService] = useState({ name: "", description: "", price: "", isActive: true });
  const [showAddStaffDialog, setShowAddStaffDialog] = useState(false);
  const [newStaff, setNewStaff] = useState({ name: "", position: "", email: "", phone: "" });

  const [formData, setFormData] = useState({
    stationName: "Downtown Fuel Station",
    address: "123 Main Street, Memphis, TN 38103",
    phone: "(901) 555-1234",
    email: "contact@downtownfuel.com",
    operatingHours: "24/7",
    managerName: "John Smith",
    latitude: "35.1495",
    longitude: "-90.0490",
    petrolPrice: "1.25",
    dieselPrice: "1.45",
    premiumPrice: "1.89",
    description: "Downtown Fuel Station offers premium fuel services with a convenient store and car wash facilities. We pride ourselves on excellent customer service and competitive prices.",
    website: "https://downtownfuel.com",
    foundedYear: "2010",
    isOpen24Hours: true,
    acceptsCreditCards: true,
    hasConvenienceStore: true,
    hasCarWash: true,
    hasATM: true,
    hasRestrooms: true,
    hasFoodService: false,
    hasWifi: false,
    hasElectricCharging: false,
    hasDiesel: true,
    hasPremiumFuel: true,
    hasEthanol: false,
    capacity: "50000",
    tankCount: "4",
    lastInspectionDate: "2023-05-15",
    nextInspectionDate: "2024-05-15",
    safetyRating: "A",
    environmentalCompliance: "Compliant",
    services: [
      { id: "1", name: "Car Wash", description: "Full service car wash with interior cleaning", price: "15.99", isActive: true },
      { id: "2", name: "Oil Change", description: "Quick oil change service with premium oil", price: "39.99", isActive: true },
      { id: "3", name: "Tire Inflation", description: "Free tire inflation service", price: "0.00", isActive: true },
      { id: "4", name: "Windshield Cleaning", description: "Free windshield cleaning with fuel purchase", price: "0.00", isActive: true }
    ],
    staff: [
      { id: "1", name: "John Smith", position: "Station Manager", email: "john@downtownfuel.com", phone: "(901) 555-1234" },
      { id: "2", name: "Sarah Johnson", position: "Assistant Manager", email: "sarah@downtownfuel.com", phone: "(901) 555-2345" },
      { id: "3", name: "Mike Williams", position: "Cashier", email: "mike@downtownfuel.com", phone: "(901) 555-3456" },
      { id: "4", name: "Lisa Brown", position: "Attendant", email: "lisa@downtownfuel.com", phone: "(901) 555-4567" }
    ],
    promotions: [
      { id: "1", name: "Summer Special", description: "Get 5% off on premium fuel", startDate: "2023-06-01", endDate: "2023-08-31", isActive: true },
      { id: "2", name: "Car Wash Discount", description: "Free car wash with 20+ gallons", startDate: "2023-07-01", endDate: "2023-07-31", isActive: false }
    ]
  });

  useEffect(() => {
    const loadData = setTimeout(() => {
      setIsLoading(false);

      toast({
        title: "Station Data Loaded",
        description: "Your station information is ready to manage",
        duration: 3000,
      });
    }, 1500);

    return () => clearTimeout(loadData);
  }, [toast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSave = () => {
    setIsEditing(false);

    toast({
      title: "Changes Saved",
      description: "Your station information has been updated",
      duration: 3000,
    });
  };

  const handleAddService = () => {
    if (!newService.name || !newService.description) {
      toast({
        title: "Missing Information",
        description: "Please provide a name and description for the service",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    const service = {
      id: Date.now().toString(),
      ...newService
    };

    setFormData(prev => ({
      ...prev,
      services: [...prev.services, service]
    }));

    setNewService({ name: "", description: "", price: "", isActive: true });
    setShowAddServiceDialog(false);

    toast({
      title: "Service Added",
      description: `${service.name} has been added to your services`,
      duration: 3000,
    });
  };

  const handleDeleteService = (id: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.filter(service => service.id !== id)
    }));

    toast({
      title: "Service Removed",
      description: "The service has been removed from your station",
      duration: 3000,
    });
  };

  const handleToggleServiceStatus = (id: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.map(service =>
        service.id === id ? { ...service, isActive: !service.isActive } : service
      )
    }));

    const service = formData.services.find(s => s.id === id);
    const newStatus = service ? !service.isActive : false;

    toast({
      title: `Service ${newStatus ? 'Activated' : 'Deactivated'}`,
      description: `The service has been ${newStatus ? 'activated' : 'deactivated'}`,
      duration: 3000,
    });
  };

  const handleAddStaff = () => {
    if (!newStaff.name || !newStaff.position || !newStaff.email) {
      toast({
        title: "Missing Information",
        description: "Please provide name, position, and email for the staff member",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    const staff = {
      id: Date.now().toString(),
      ...newStaff
    };

    setFormData(prev => ({
      ...prev,
      staff: [...prev.staff, staff]
    }));

    setNewStaff({ name: "", position: "", email: "", phone: "" });
    setShowAddStaffDialog(false);

    toast({
      title: "Staff Added",
      description: `${staff.name} has been added to your staff`,
      duration: 3000,
    });
  };

  const handleDeleteStaff = (id: string) => {
    setFormData(prev => ({
      ...prev,
      staff: prev.staff.filter(staff => staff.id !== id)
    }));

    toast({
      title: "Staff Removed",
      description: "The staff member has been removed from your station",
      duration: 3000,
    });
  };

  const content = isLoading ? (
    <div className="flex-1 flex items-center justify-center p-6">
      <motion.div
        className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
    </div>
  ) : (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-8"
      >
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">Station Management</h2>
            <p className="text-gray-500">Manage your station details and configuration</p>
          </div>

          <Button
            onClick={() => setIsEditing(!isEditing)}
            className={isEditing ? "bg-gray-200 text-gray-700" : "bg-green-500 hover:bg-green-600 text-white"}
          >
            {isEditing ? (
              <>
                <X size={18} className="mr-2" />
                Cancel Editing
              </>
            ) : (
              <>
                <Edit size={18} className="mr-2" />
                Edit Station
              </>
            )}
          </Button>
        </div>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid grid-cols-5 w-full max-w-4xl">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="features">Features & Amenities</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="staff">Staff</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          className="bg-white p-6 rounded-lg border border-gray-200 md:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-lg font-semibold mb-6 border-b pb-2">Station Information</h3>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Building size={16} className="inline mr-1" />
                  Station Name
                </label>
                {isEditing ? (
                  <Input
                    name="stationName"
                    value={formData.stationName}
                    onChange={handleInputChange}
                  />
                ) : (
                  <div className="p-2 border border-gray-200 rounded-md bg-gray-50">{formData.stationName}</div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <User size={16} className="inline mr-1" />
                  Manager Name
                </label>
                {isEditing ? (
                  <Input
                    name="managerName"
                    value={formData.managerName}
                    onChange={handleInputChange}
                  />
                ) : (
                  <div className="p-2 border border-gray-200 rounded-md bg-gray-50">{formData.managerName}</div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <MapPin size={16} className="inline mr-1" />
                Address
              </label>
              {isEditing ? (
                <Input
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              ) : (
                <div className="p-2 border border-gray-200 rounded-md bg-gray-50">{formData.address}</div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Phone size={16} className="inline mr-1" />
                  Phone Number
                </label>
                {isEditing ? (
                  <Input
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                ) : (
                  <div className="p-2 border border-gray-200 rounded-md bg-gray-50">{formData.phone}</div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Mail size={16} className="inline mr-1" />
                  Email Address
                </label>
                {isEditing ? (
                  <Input
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                ) : (
                  <div className="p-2 border border-gray-200 rounded-md bg-gray-50">{formData.email}</div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Clock size={16} className="inline mr-1" />
                Operating Hours
              </label>
              {isEditing ? (
                <Input
                  name="operatingHours"
                  value={formData.operatingHours}
                  onChange={handleInputChange}
                />
              ) : (
                <div className="p-2 border border-gray-200 rounded-md bg-gray-50">{formData.operatingHours}</div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Latitude
                </label>
                {isEditing ? (
                  <Input
                    name="latitude"
                    value={formData.latitude}
                    onChange={handleInputChange}
                  />
                ) : (
                  <div className="p-2 border border-gray-200 rounded-md bg-gray-50">{formData.latitude}</div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Longitude
                </label>
                {isEditing ? (
                  <Input
                    name="longitude"
                    value={formData.longitude}
                    onChange={handleInputChange}
                  />
                ) : (
                  <div className="p-2 border border-gray-200 rounded-md bg-gray-50">{formData.longitude}</div>
                )}
              </div>
            </div>

            {isEditing && (
              <div className="pt-4 border-t border-gray-200">
                <Button
                  className="bg-green-500 hover:bg-green-600"
                  onClick={handleSave}
                >
                  <Save size={18} className="mr-2" />
                  Save Changes
                </Button>
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          className="bg-white p-6 rounded-lg border border-gray-200 flex flex-col"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-6 border-b pb-2">Fuel Pricing</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Regular Petrol (per liter)
                </label>
                {isEditing ? (
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2">$</span>
                    <Input
                      name="petrolPrice"
                      value={formData.petrolPrice}
                      onChange={handleInputChange}
                      className="pl-8"
                    />
                  </div>
                ) : (
                  <div className="p-2 border border-gray-200 rounded-md bg-gray-50">${formData.petrolPrice}</div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Diesel (per liter)
                </label>
                {isEditing ? (
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2">$</span>
                    <Input
                      name="dieselPrice"
                      value={formData.dieselPrice}
                      onChange={handleInputChange}
                      className="pl-8"
                    />
                  </div>
                ) : (
                  <div className="p-2 border border-gray-200 rounded-md bg-gray-50">${formData.dieselPrice}</div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Premium Petrol (per liter)
                </label>
                {isEditing ? (
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2">$</span>
                    <Input
                      name="premiumPrice"
                      value={formData.premiumPrice}
                      onChange={handleInputChange}
                      className="pl-8"
                    />
                  </div>
                ) : (
                  <div className="p-2 border border-gray-200 rounded-md bg-gray-50">${formData.premiumPrice}</div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-auto">
            <h3 className="text-lg font-semibold mb-4 border-b pb-2">Station Image</h3>
            <div className="border border-dashed border-gray-300 rounded-md p-6 text-center">
              <div className="mb-4 mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                <Upload className="text-gray-400" size={24} />
              </div>
              <p className="text-sm text-gray-500">Upload your station image</p>
              <p className="text-xs text-gray-400 mt-1">Recommended: 800x600px, Max: 2MB</p>
              <Button className="mt-4 bg-gray-100 text-gray-700 hover:bg-gray-200">
                Choose File
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="bg-white p-6 rounded-lg border border-gray-200 mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-lg font-semibold mb-4">Station Location</h3>
        <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
          <div className="text-center">
            <MapPin size={48} className="mx-auto text-gray-400 mb-2" />
            <p className="text-gray-500">Interactive Map Coming Soon</p>
            <p className="text-sm text-gray-400">Current location: {formData.latitude}, {formData.longitude}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );

  return (
    <DashboardLayout title="Station Management">
      {content}
    </DashboardLayout>
  );
};

export default StationManagement;
