
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings as SettingsIcon, User, Bell, Lock, 
  CreditCard, Monitor, Globe, Shield, Save,
  CheckCircle, PlusCircle, Trash2, Eye, EyeOff,
  ToggleLeft, ToggleRight
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import DashboardLayout from '@/components/DashboardLayout';

const Settings = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  
  // Form states
  const [profileForm, setProfileForm] = useState({
    name: 'Shah Miller',
    email: 'shah.miller@example.com',
    phone: '(901) 555-1234',
    address: '123 Station St, Memphis, TN 38103'
  });
  
  const [passwordForm, setPasswordForm] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, type: 'card', last4: '4242', expiry: '12/24', default: true },
    { id: 2, type: 'bank', account: '****6789', bank: 'Chase', default: false }
  ]);
  
  const [confirmDeletePayment, setConfirmDeletePayment] = useState(false);
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: "Settings Loaded",
        description: "Your account settings have been loaded",
        duration: 3000,
      });
    }, 1500);
  }, [toast]);
  
  const handleProfileSubmit = (e) => {
    e.preventDefault();
    setSaveLoading(true);
    
    // Simulate saving
    setTimeout(() => {
      setSaveLoading(false);
      
      toast({
        title: "Profile Updated",
        description: "Your profile information has been saved",
        duration: 3000,
      });
    }, 1500);
  };
  
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setSaveLoading(true);
    
    // Check if new password matches confirmation
    if (passwordForm.new !== passwordForm.confirm) {
      setSaveLoading(false);
      
      toast({
        title: "Password Error",
        description: "New password and confirmation do not match",
        duration: 3000,
      });
      
      return;
    }
    
    // Simulate saving
    setTimeout(() => {
      setSaveLoading(false);
      
      toast({
        title: "Password Updated",
        description: "Your password has been changed successfully",
        duration: 3000,
      });
      
      // Reset form
      setPasswordForm({
        current: '',
        new: '',
        confirm: ''
      });
    }, 1500);
  };
  
  const handleInputChange = (form, field, value) => {
    if (form === 'profile') {
      setProfileForm(prev => ({ ...prev, [field]: value }));
    } else if (form === 'password') {
      setPasswordForm(prev => ({ ...prev, [field]: value }));
    }
  };
  
  const handleToggleDefault = (id) => {
    setPaymentMethods(prevMethods => 
      prevMethods.map(method => ({
        ...method,
        default: method.id === id
      }))
    );
    
    toast({
      title: "Default Payment Updated",
      description: "Your default payment method has been changed",
      duration: 2000,
    });
  };
  
  const handleDeletePayment = (id) => {
    setSelectedPaymentId(id);
    setConfirmDeletePayment(true);
  };
  
  const confirmDelete = () => {
    setPaymentMethods(prevMethods => 
      prevMethods.filter(method => method.id !== selectedPaymentId)
    );
    
    setConfirmDeletePayment(false);
    
    toast({
      title: "Payment Method Removed",
      description: "The payment method has been deleted from your account",
      duration: 3000,
    });
  };
  
  const handleAddPayment = (e) => {
    e.preventDefault();
    
    // Simulate adding new payment method
    const newPayment = {
      id: paymentMethods.length + 1,
      type: 'card',
      last4: '5678',
      expiry: '06/25',
      default: paymentMethods.length === 0
    };
    
    setPaymentMethods([...paymentMethods, newPayment]);
    setShowAddPayment(false);
    
    toast({
      title: "Payment Method Added",
      description: "Your new payment method has been saved",
      duration: 3000,
    });
  };
  
  const handleToggleNotifications = (type) => {
    if (type === 'email') {
      setEmailNotifications(!emailNotifications);
    } else if (type === 'push') {
      setPushNotifications(!pushNotifications);
    } else if (type === 'sms') {
      setSmsNotifications(!smsNotifications);
    }
    
    toast({
      title: "Notification Settings Updated",
      description: `${type.charAt(0).toUpperCase() + type.slice(1)} notifications ${!eval(type + 'Notifications') ? 'enabled' : 'disabled'}`,
      duration: 2000,
    });
  };
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    
    toast({
      title: "Display Mode Changed",
      description: `${!darkMode ? 'Dark' : 'Light'} mode activated`,
      duration: 2000,
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-1">Account Settings</h2>
          <p className="text-gray-500">Manage your account preferences and settings</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/4">
            <Card className="sticky top-6">
              <CardContent className="p-4">
                <Tabs
                  defaultValue={activeTab}
                  onValueChange={setActiveTab}
                  orientation="vertical"
                  className="w-full"
                >
                  <TabsList className="flex flex-col items-stretch h-auto bg-transparent space-y-1">
                    <TabsTrigger
                      value="profile"
                      className="justify-start text-left px-3 py-2 data-[state=active]:bg-gray-100"
                    >
                      <User className="mr-2" size={18} />
                      Profile
                    </TabsTrigger>
                    <TabsTrigger
                      value="security"
                      className="justify-start text-left px-3 py-2 data-[state=active]:bg-gray-100"
                    >
                      <Lock className="mr-2" size={18} />
                      Security
                    </TabsTrigger>
                    <TabsTrigger
                      value="notifications"
                      className="justify-start text-left px-3 py-2 data-[state=active]:bg-gray-100"
                    >
                      <Bell className="mr-2" size={18} />
                      Notifications
                    </TabsTrigger>
                    <TabsTrigger
                      value="payment"
                      className="justify-start text-left px-3 py-2 data-[state=active]:bg-gray-100"
                    >
                      <CreditCard className="mr-2" size={18} />
                      Payment Methods
                    </TabsTrigger>
                    <TabsTrigger
                      value="appearance"
                      className="justify-start text-left px-3 py-2 data-[state=active]:bg-gray-100"
                    >
                      <Monitor className="mr-2" size={18} />
                      Appearance
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:w-3/4">
            <Card>
              <CardHeader>
                <CardTitle>
                  {activeTab === 'profile' && 'Profile Information'}
                  {activeTab === 'security' && 'Security Settings'}
                  {activeTab === 'notifications' && 'Notification Preferences'}
                  {activeTab === 'payment' && 'Payment Methods'}
                  {activeTab === 'appearance' && 'Display Settings'}
                </CardTitle>
                <CardDescription>
                  {activeTab === 'profile' && 'Update your account profile information'}
                  {activeTab === 'security' && 'Manage your account security settings'}
                  {activeTab === 'notifications' && 'Control how you receive notifications'}
                  {activeTab === 'payment' && 'Add or update your payment methods'}
                  {activeTab === 'appearance' && 'Customize your dashboard appearance'}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                {/* Profile Tab */}
                {activeTab === 'profile' && (
                  <form onSubmit={handleProfileSubmit}>
                    <div className="space-y-4">
                      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                        <div className="w-full">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={profileForm.name}
                            onChange={(e) => handleInputChange('profile', 'name', e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        <div className="w-full">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            value={profileForm.email}
                            onChange={(e) => handleInputChange('profile', 'email', e.target.value)}
                            className="mt-1"
                          />
                        </div>
                      </div>
                      
                      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                        <div className="w-full">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            value={profileForm.phone}
                            onChange={(e) => handleInputChange('profile', 'phone', e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        <div className="w-full">
                          <Label htmlFor="timezone">Timezone</Label>
                          <Select defaultValue="america_central">
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Select timezone" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="america_eastern">Eastern Time (ET)</SelectItem>
                              <SelectItem value="america_central">Central Time (CT)</SelectItem>
                              <SelectItem value="america_mountain">Mountain Time (MT)</SelectItem>
                              <SelectItem value="america_pacific">Pacific Time (PT)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          value={profileForm.address}
                          onChange={(e) => handleInputChange('profile', 'address', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="language">Preferred Language</Label>
                        <Select defaultValue="english">
                          <SelectTrigger>
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="english">English</SelectItem>
                            <SelectItem value="spanish">Spanish</SelectItem>
                            <SelectItem value="french">French</SelectItem>
                            <SelectItem value="german">German</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-end">
                      <Button 
                        type="submit" 
                        className="bg-green-500 hover:bg-green-600"
                        disabled={saveLoading}
                      >
                        {saveLoading ? (
                          <>
                            <motion.div 
                              className="h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"
                              animate={{ rotate: 360 }}
                              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                            />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="mr-2" size={16} />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                )}
                
                {/* Security Tab */}
                {activeTab === 'security' && (
                  <div className="space-y-6">
                    <form onSubmit={handlePasswordSubmit} className="space-y-4">
                      <h3 className="text-lg font-semibold">Change Password</h3>
                      
                      <div>
                        <Label htmlFor="current-password">Current Password</Label>
                        <div className="relative mt-1">
                          <Input
                            id="current-password"
                            type={showPassword ? "text" : "password"}
                            value={passwordForm.current}
                            onChange={(e) => handleInputChange('password', 'current', e.target.value)}
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-5 w-5 text-gray-400" />
                            ) : (
                              <Eye className="h-5 w-5 text-gray-400" />
                            )}
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="new-password">New Password</Label>
                        <div className="relative mt-1">
                          <Input
                            id="new-password"
                            type={showPassword ? "text" : "password"}
                            value={passwordForm.new}
                            onChange={(e) => handleInputChange('password', 'new', e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <div className="relative mt-1">
                          <Input
                            id="confirm-password"
                            type={showPassword ? "text" : "password"}
                            value={passwordForm.confirm}
                            onChange={(e) => handleInputChange('password', 'confirm', e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div className="mt-2 flex justify-end">
                        <Button 
                          type="submit" 
                          className="bg-green-500 hover:bg-green-600"
                          disabled={saveLoading}
                        >
                          {saveLoading ? (
                            <>
                              <motion.div 
                                className="h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                              />
                              Updating...
                            </>
                          ) : (
                            <>
                              <Lock className="mr-2" size={16} />
                              Update Password
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                    
                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-lg font-semibold">Two-Factor Authentication</h3>
                      <p className="text-sm text-gray-500 mt-1 mb-4">
                        Add an extra layer of security to your account by enabling two-factor authentication.
                      </p>
                      
                      <Button 
                        className="bg-green-500 hover:bg-green-600"
                        onClick={() => {
                          toast({
                            title: "2FA Setup",
                            description: "Setting up two-factor authentication",
                            duration: 3000,
                          });
                        }}
                      >
                        <Shield className="mr-2" size={16} />
                        Enable 2FA
                      </Button>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-lg font-semibold">Session Management</h3>
                      <p className="text-sm text-gray-500 mt-1 mb-4">
                        Review and manage your active sessions across different devices.
                      </p>
                      
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <div>
                            <p className="font-medium">Current Session</p>
                            <p className="text-sm text-gray-500">Memphis, TN • Chrome on Windows</p>
                          </div>
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            Active Now
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <div>
                            <p className="font-medium">Mobile App</p>
                            <p className="text-sm text-gray-500">Memphis, TN • iPhone 12</p>
                          </div>
                          <Button variant="ghost" size="sm" className="text-red-600">
                            Log Out
                          </Button>
                        </div>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        className="mt-4 text-red-600"
                        onClick={() => {
                          toast({
                            title: "All Sessions Terminated",
                            description: "You have been logged out of all devices",
                            duration: 3000,
                          });
                        }}
                      >
                        Log Out of All Devices
                      </Button>
                    </div>
                  </div>
                )}
                
                {/* Notifications Tab */}
                {activeTab === 'notifications' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Email Notifications</h3>
                      
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Email Notifications</p>
                            <p className="text-sm text-gray-500">Receive email notifications for important updates</p>
                          </div>
                          <button 
                            className="text-gray-500"
                            onClick={() => handleToggleNotifications('email')}
                          >
                            {emailNotifications ? (
                              <ToggleRight className="h-6 w-6 text-green-500" />
                            ) : (
                              <ToggleLeft className="h-6 w-6" />
                            )}
                          </button>
                        </div>
                        
                        <div className="pl-4 space-y-3 border-l-2 border-gray-100">
                          <div className="flex items-center">
                            <input 
                              type="checkbox" 
                              id="email-orders" 
                              className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500" 
                              defaultChecked={true}
                              disabled={!emailNotifications}
                            />
                            <label htmlFor="email-orders" className={`ml-2 block text-sm ${!emailNotifications ? 'text-gray-400' : 'text-gray-700'}`}>
                              Order Notifications
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input 
                              type="checkbox" 
                              id="email-inventory" 
                              className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500" 
                              defaultChecked={true}
                              disabled={!emailNotifications}
                            />
                            <label htmlFor="email-inventory" className={`ml-2 block text-sm ${!emailNotifications ? 'text-gray-400' : 'text-gray-700'}`}>
                              Inventory Alerts
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input 
                              type="checkbox" 
                              id="email-marketing" 
                              className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500" 
                              defaultChecked={false}
                              disabled={!emailNotifications}
                            />
                            <label htmlFor="email-marketing" className={`ml-2 block text-sm ${!emailNotifications ? 'text-gray-400' : 'text-gray-700'}`}>
                              Marketing & Promotions
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-lg font-semibold mb-4">Push Notifications</h3>
                      
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Push Notifications</p>
                            <p className="text-sm text-gray-500">Receive real-time notifications on your device</p>
                          </div>
                          <button 
                            className="text-gray-500"
                            onClick={() => handleToggleNotifications('push')}
                          >
                            {pushNotifications ? (
                              <ToggleRight className="h-6 w-6 text-green-500" />
                            ) : (
                              <ToggleLeft className="h-6 w-6" />
                            )}
                          </button>
                        </div>
                        
                        <div className="pl-4 space-y-3 border-l-2 border-gray-100">
                          <div className="flex items-center">
                            <input 
                              type="checkbox" 
                              id="push-orders" 
                              className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500" 
                              defaultChecked={true}
                              disabled={!pushNotifications}
                            />
                            <label htmlFor="push-orders" className={`ml-2 block text-sm ${!pushNotifications ? 'text-gray-400' : 'text-gray-700'}`}>
                              New Orders
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input 
                              type="checkbox" 
                              id="push-critical" 
                              className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500" 
                              defaultChecked={true}
                              disabled={!pushNotifications}
                            />
                            <label htmlFor="push-critical" className={`ml-2 block text-sm ${!pushNotifications ? 'text-gray-400' : 'text-gray-700'}`}>
                              Critical Alerts
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input 
                              type="checkbox" 
                              id="push-reports" 
                              className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500" 
                              defaultChecked={false}
                              disabled={!pushNotifications}
                            />
                            <label htmlFor="push-reports" className={`ml-2 block text-sm ${!pushNotifications ? 'text-gray-400' : 'text-gray-700'}`}>
                              Reports & Analytics
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-lg font-semibold mb-4">SMS Notifications</h3>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">SMS Notifications</p>
                          <p className="text-sm text-gray-500">Receive text messages for critical updates</p>
                        </div>
                        <button 
                          className="text-gray-500"
                          onClick={() => handleToggleNotifications('sms')}
                        >
                          {smsNotifications ? (
                            <ToggleRight className="h-6 w-6 text-green-500" />
                          ) : (
                            <ToggleLeft className="h-6 w-6" />
                          )}
                        </button>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-end">
                      <Button 
                        className="bg-green-500 hover:bg-green-600"
                        onClick={() => {
                          toast({
                            title: "Notification Settings Saved",
                            description: "Your notification preferences have been updated",
                            duration: 3000,
                          });
                        }}
                      >
                        <Save className="mr-2" size={16} />
                        Save Preferences
                      </Button>
                    </div>
                  </div>
                )}
                
                {/* Payment Methods Tab */}
                {activeTab === 'payment' && (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      {paymentMethods.length > 0 ? (
                        paymentMethods.map((method) => (
                          <div key={method.id} className="flex justify-between items-center p-4 border rounded-lg">
                            <div className="flex items-center">
                              {method.type === 'card' ? (
                                <div className="bg-blue-100 p-2 rounded-full">
                                  <CreditCard className="text-blue-600" size={20} />
                                </div>
                              ) : (
                                <div className="bg-green-100 p-2 rounded-full">
                                  <Globe className="text-green-600" size={20} />
                                </div>
                              )}
                              <div className="ml-4">
                                <p className="font-medium">
                                  {method.type === 'card' ? 'Credit Card' : 'Bank Account'}
                                  {method.default && (
                                    <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                                      Default
                                    </span>
                                  )}
                                </p>
                                {method.type === 'card' ? (
                                  <p className="text-sm text-gray-500">•••• {method.last4} | Expires {method.expiry}</p>
                                ) : (
                                  <p className="text-sm text-gray-500">{method.bank} | {method.account}</p>
                                )}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              {!method.default && (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleToggleDefault(method.id)}
                                >
                                  Set Default
                                </Button>
                              )}
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="text-red-600"
                                onClick={() => handleDeletePayment(method.id)}
                              >
                                <Trash2 size={16} />
                              </Button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-6 bg-gray-50 rounded-lg border border-gray-200">
                          <CreditCard className="mx-auto text-gray-400 mb-2" size={36} />
                          <p className="text-gray-600 mb-4">No payment methods found</p>
                          <Button 
                            className="bg-green-500 hover:bg-green-600"
                            onClick={() => setShowAddPayment(true)}
                          >
                            <PlusCircle className="mr-2" size={16} />
                            Add Payment Method
                          </Button>
                        </div>
                      )}
                    </div>
                    
                    {paymentMethods.length > 0 && (
                      <div className="flex justify-center">
                        <Button 
                          className="bg-green-500 hover:bg-green-600"
                          onClick={() => setShowAddPayment(true)}
                        >
                          <PlusCircle className="mr-2" size={16} />
                          Add New Payment Method
                        </Button>
                      </div>
                    )}
                    
                    {/* Delete Payment Method Dialog */}
                    <Dialog open={confirmDeletePayment} onOpenChange={setConfirmDeletePayment}>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Confirm Deletion</DialogTitle>
                          <DialogDescription>
                            Are you sure you want to remove this payment method? This action cannot be undone.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setConfirmDeletePayment(false)}>
                            Cancel
                          </Button>
                          <Button variant="destructive" onClick={confirmDelete}>
                            Delete
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    
                    {/* Add Payment Method Dialog */}
                    <Dialog open={showAddPayment} onOpenChange={setShowAddPayment}>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Add Payment Method</DialogTitle>
                          <DialogDescription>
                            Enter your payment details below
                          </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleAddPayment}>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="card-type">Payment Type</Label>
                              <Select defaultValue="credit-card">
                                <SelectTrigger>
                                  <SelectValue placeholder="Select payment type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="credit-card">Credit Card</SelectItem>
                                  <SelectItem value="bank-account">Bank Account</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="card-number">Card Number</Label>
                              <Input id="card-number" placeholder="1234 5678 9012 3456" />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="expiry">Expiration Date</Label>
                                <Input id="expiry" placeholder="MM/YY" />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="cvc">CVC</Label>
                                <Input id="cvc" placeholder="123" />
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="card-name">Name on Card</Label>
                              <Input id="card-name" placeholder="John Doe" />
                            </div>
                            
                            <div className="flex items-center">
                              <input 
                                id="default-payment" 
                                type="checkbox" 
                                className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500" 
                              />
                              <label htmlFor="default-payment" className="ml-2 block text-sm text-gray-700">
                                Set as default payment method
                              </label>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setShowAddPayment(false)}>
                              Cancel
                            </Button>
                            <Button type="submit" className="bg-green-500 hover:bg-green-600">
                              Add Payment Method
                            </Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                )}
                
                {/* Appearance Tab */}
                {activeTab === 'appearance' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Theme Settings</h3>
                      
                      <div className="flex justify-between items-center mb-6">
                        <div>
                          <p className="font-medium">Dark Mode</p>
                          <p className="text-sm text-gray-500">Switch between light and dark themes</p>
                        </div>
                        <button 
                          className="text-gray-500"
                          onClick={toggleDarkMode}
                        >
                          {darkMode ? (
                            <ToggleRight className="h-6 w-6 text-green-500" />
                          ) : (
                            <ToggleLeft className="h-6 w-6" />
                          )}
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className={`border rounded-lg p-4 cursor-pointer ${!darkMode ? 'ring-2 ring-green-500' : ''}`} onClick={() => setDarkMode(false)}>
                          <div className="h-24 bg-white border mb-2 rounded shadow-sm"></div>
                          <p className="text-center font-medium">Light Mode</p>
                        </div>
                        <div className={`border rounded-lg p-4 cursor-pointer ${darkMode ? 'ring-2 ring-green-500' : ''}`} onClick={() => setDarkMode(true)}>
                          <div className="h-24 bg-gray-800 border border-gray-700 mb-2 rounded shadow-sm"></div>
                          <p className="text-center font-medium">Dark Mode</p>
                        </div>
                        <div className={`border rounded-lg p-4 cursor-pointer`}>
                          <div className="h-24 bg-gradient-to-r from-gray-100 to-white border mb-2 rounded shadow-sm"></div>
                          <p className="text-center font-medium">System (Auto)</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-lg font-semibold mb-4">Color Scheme</h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Choose a color scheme for your dashboard
                      </p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="border rounded-lg p-4 cursor-pointer ring-2 ring-green-500">
                          <div className="h-8 bg-green-500 rounded-md mb-2"></div>
                          <p className="text-center text-sm font-medium">Green (Default)</p>
                        </div>
                        <div className="border rounded-lg p-4 cursor-pointer">
                          <div className="h-8 bg-blue-500 rounded-md mb-2"></div>
                          <p className="text-center text-sm font-medium">Blue</p>
                        </div>
                        <div className="border rounded-lg p-4 cursor-pointer">
                          <div className="h-8 bg-purple-500 rounded-md mb-2"></div>
                          <p className="text-center text-sm font-medium">Purple</p>
                        </div>
                        <div className="border rounded-lg p-4 cursor-pointer">
                          <div className="h-8 bg-red-500 rounded-md mb-2"></div>
                          <p className="text-center text-sm font-medium">Red</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-lg font-semibold mb-4">Layout Settings</h3>
                      
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Compact Mode</p>
                            <p className="text-sm text-gray-500">Display more content with less spacing</p>
                          </div>
                          <button className="text-gray-500">
                            <ToggleLeft className="h-6 w-6" />
                          </button>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Animations</p>
                            <p className="text-sm text-gray-500">Enable UI animations and transitions</p>
                          </div>
                          <button className="text-gray-500">
                            <ToggleRight className="h-6 w-6 text-green-500" />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-end">
                      <Button 
                        className="bg-green-500 hover:bg-green-600"
                        onClick={() => {
                          toast({
                            title: "Appearance Settings Saved",
                            description: "Your display preferences have been updated",
                            duration: 3000,
                          });
                        }}
                      >
                        <Save className="mr-2" size={16} />
                        Save Settings
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );

  return (
    <DashboardLayout title="Settings">
      {content}
    </DashboardLayout>
  );
};

export default Settings;
