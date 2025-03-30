
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Edit, Save, Upload, MapPin, 
  Clock, Calendar, Phone, Mail, Building, User
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import DashboardLayout from '@/components/DashboardLayout';

const StationManagement = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
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
    premiumPrice: "1.89"
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
                <Edit size={18} className="mr-2" />
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
