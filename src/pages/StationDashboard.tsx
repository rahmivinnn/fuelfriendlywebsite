
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Bell, User, ChevronDown, 
  Grid, ShoppingBag, Package, Building2, 
  PieChart, Bell as BellIcon, HelpCircle, Settings,
  LogOut, Plus, FileUp, MoreVertical
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Link } from 'react-router-dom';
import { PieChart as ReChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area, AreaChart } from 'recharts';

const sidebarItems = [
  { icon: Grid, label: 'Dashboard', active: true, path: '/station-dashboard' },
  { icon: ShoppingBag, label: 'Orders', active: false, path: '/station-dashboard/orders' },
  { icon: Package, label: 'Products Management', active: false, path: '/station-dashboard/products' },
  { icon: Building2, label: 'Station Management', active: false, path: '/station-dashboard/station' },
  { icon: PieChart, label: 'Earnings & Transactions', active: false, path: '/station-dashboard/earnings' },
  { icon: BellIcon, label: 'Notifications', active: false, path: '/station-dashboard/notifications' },
  { icon: HelpCircle, label: 'Help & Support', active: false, path: '/station-dashboard/support' },
  { icon: Settings, label: 'Settings', active: false, path: '/station-dashboard/settings' },
];

const salesData = [
  { name: 'Jan', value: 200 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 400 },
  { name: 'Apr', value: 300 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 600 },
];

const pieData = [
  { name: 'Petrol', value: 50 },
  { name: 'Diesel', value: 35 },
  { name: 'Grocery Items', value: 15 },
];

const COLORS = ['#00C853', '#29B6F6', '#FF9800'];

const recentOrders = [
  { id: '#C1234', customer: 'JOHN DOE', items: 'Petrol 2 Liters', date: 'February 11, 2014', amount: '$250', status: 'New' },
  { id: '#C5678', customer: 'JANE SMITH', items: 'Petrol 2 Liters + Groceries', date: 'March 23, 2013', amount: '$250', status: 'New' },
  { id: '#C5678', customer: 'JOHN DOE', items: 'Petrol 2 Liters + Groceries', date: 'May 20, 2015', amount: '$250', status: 'New' },
  { id: '#C5678', customer: 'JANE SMITH', items: 'Petrol 2 Liters', date: 'October 31, 2017', amount: '$250', status: 'Completed' },
  { id: '#C5678', customer: 'JOHN DOE JOHN DOE JOHN DOE', items: 'Petrol 2 Liters + Groceries', date: 'October 24, 2018', amount: '$250', status: 'Completed' },
  { id: '#C5678', customer: 'JANE SMITH', items: 'Petrol 2 Liters + Groceries', date: 'September 24, 2017', amount: '$250', status: 'Canceled' },
  { id: '#C5678', customer: 'JOHN DOE JOHN DOE JOHN DOE', items: 'Petrol 2 Liters', date: 'February 29, 2012', amount: '$250', status: 'Completed' },
  { id: '#C5678', customer: 'REAL ESTATE ACTIVITIES', items: 'Petrol 2 Liters + Groceries', date: 'February 29, 2012', amount: '$250', status: 'Canceled' },
  { id: '#C5678', customer: 'JANE SMITH', items: 'Petrol 2 Liters', date: 'February 29, 2012', amount: '$250', status: 'Completed' },
];

const StationDashboard = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [salesTimeframe, setSalesTimeframe] = useState('Last 6 months');
  const [salesCategory, setSalesCategory] = useState('Week');

  useEffect(() => {
    const loadDashboard = setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: "Welcome Back!",
        description: "Your station dashboard is ready",
        duration: 3000,
      });
    }, 1500);
    
    // Simulating real-time updates
    const interval = setInterval(() => {
      const messages = [
        "New order received!",
        "Inventory update: Petrol levels at 75%",
        "Daily sales target achieved!",
        "System update available",
      ];
      
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      
      toast({
        title: "Real-time Update",
        description: randomMessage,
        duration: 3000,
      });
    }, 60000); // Show a random update every minute
    
    return () => {
      clearTimeout(loadDashboard);
      clearInterval(interval);
    };
  }, [toast]);

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar */}
      <motion.div 
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="bg-white w-64 border-r border-gray-200 flex flex-col"
      >
        <div className="p-4 border-b border-gray-200">
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/f1f34c25-67df-4603-8eb1-3f1fe84812a4.png" 
              alt="FuelFriendly Logo" 
              className="h-8"
            />
          </Link>
        </div>
        
        <div className="flex-1 p-4 space-y-2 overflow-y-auto">
          {sidebarItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link 
                to={item.path}
                className={`flex items-center p-3 rounded-lg transition-colors hover:bg-gray-100 ${item.active ? 'bg-green-50 text-green-500' : 'text-gray-600'}`}
              >
                <item.icon size={20} className={item.active ? 'text-green-500' : 'text-gray-500'} />
                <span className="ml-3 font-medium text-sm">{item.label}</span>
              </Link>
            </motion.div>
          ))}
        </div>
        
        <div className="p-4 border-t border-gray-200">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            onClick={() => {
              toast({
                title: "Logged Out",
                description: "You have been logged out successfully",
                duration: 3000,
              });
            }}
          >
            <LogOut size={20} className="mr-2" />
            Logout Account
          </Button>
        </div>
      </motion.div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Nav */}
        <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold"
          >
            Dashboard
          </motion.h1>
          
          <div className="flex items-center space-x-4">
            <div className="relative w-64">
              <Input 
                type="text" 
                placeholder="Search here" 
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
            
            <Button variant="ghost" className="relative">
              <Bell />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </Button>
            
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/86c52672-6ac1-4afa-b99f-d1f6c2a23319.png" 
                alt="User" 
                className="w-8 h-8 rounded-full object-cover"
              />
            </div>
          </div>
        </header>
        
        {/* Dashboard Content */}
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <motion.div 
              className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-6">
            <AnimatePresence>
              {showAddProduct ? (
                <motion.div 
                  className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div 
                    className="bg-white rounded-lg w-full max-w-2xl"
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                  >
                    <div className="p-6">
                      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
                      
                      <p className="mb-4">Enter product details to add it to your station's inventory.</p>
                      
                      <div className="space-y-6">
                        <div className="flex space-x-4 items-center">
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center space-x-2">
                              <div className="h-4 w-4 rounded-full border-2 border-green-500 flex items-center justify-center">
                                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                              </div>
                              <span>Fuel</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <div className="h-4 w-4 rounded-full border-2 border-gray-300"></div>
                            <span>Grocery Items</span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Fuel type</label>
                            <div className="relative">
                              <select className="w-full border border-gray-300 rounded-md px-4 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-green-500">
                                <option>Petrol</option>
                                <option>Diesel</option>
                                <option>Premium Petrol</option>
                              </select>
                              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">1 Liter Price</label>
                            <Input type="text" placeholder="$00.00" />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Product Description</label>
                          <textarea 
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                            rows={4}
                            placeholder="Add description"
                          ></textarea>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
                          <div className="border border-dashed border-gray-300 rounded-md p-10 flex flex-col items-center justify-center text-center">
                            <div className="mb-4 bg-green-50 p-4 rounded-full">
                              <FileUp className="text-green-500" size={24} />
                            </div>
                            <p className="font-medium text-gray-900">Upload Image from file</p>
                            <p className="text-xs text-gray-500 mt-2">Recommended dimension 500x500 pixels and Max file size 5MB.</p>
                            <input type="file" className="hidden" id="file-upload" />
                            <label htmlFor="file-upload" className="mt-4 bg-gray-100 text-gray-700 py-2 px-4 rounded-md cursor-pointer hover:bg-gray-200 transition-colors">
                              Choose File
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end bg-gray-50 p-4 rounded-b-lg border-t border-gray-200">
                      <Button 
                        variant="outline" 
                        className="mr-2"
                        onClick={() => setShowAddProduct(false)}
                      >
                        Cancel
                      </Button>
                      <Button 
                        className="bg-green-500 hover:bg-green-600"
                        onClick={() => {
                          setShowAddProduct(false);
                          toast({
                            title: "Product Added",
                            description: "New product has been added successfully",
                            duration: 3000,
                          });
                        }}
                      >
                        Add Product
                      </Button>
                    </div>
                  </motion.div>
                </motion.div>
              ) : null}
            </AnimatePresence>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-1">Welcome Back Shah</h2>
                <p className="text-gray-500">Here is what happening with your station</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <motion.div 
                  className="bg-white p-6 rounded-lg border border-gray-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                >
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 p-2 rounded-md">
                      <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                    </div>
                    <span className="ml-2 text-sm text-gray-500">TODAY CUSTOMERS</span>
                  </div>
                  <h3 className="text-3xl font-bold mb-2">$512</h3>
                  <div className="flex items-center text-sm">
                    <span className="text-green-500 flex items-center mr-2">
                      <ChevronDown className="transform rotate-180" size={16} />
                      +4%
                    </span>
                    <span className="text-gray-500">vs yesterday</span>
                  </div>
                  <div className="mt-2">
                    <svg height="40" width="100%">
                      <polyline
                        points="0,20 20,10 40,25 60,5 80,15 100,10 120,30 140,10 160,20"
                        style={{ fill: 'none', stroke: '#22c55e', strokeWidth: 2 }}
                      />
                    </svg>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="bg-white p-6 rounded-lg border border-gray-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                >
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 p-2 rounded-md">
                      <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                    </div>
                    <span className="ml-2 text-sm text-gray-500">NEW CUSTOMERS</span>
                  </div>
                  <h3 className="text-3xl font-bold mb-2">$325</h3>
                  <div className="flex items-center text-sm">
                    <span className="text-red-500 flex items-center mr-2">
                      <ChevronDown size={16} />
                      -4.4%
                    </span>
                    <span className="text-gray-500">vs yesterday</span>
                  </div>
                  <div className="mt-2">
                    <svg height="40" width="100%">
                      <polyline
                        points="0,5 20,25 40,15 60,30 80,20 100,30 120,15 140,25 160,5"
                        style={{ fill: 'none', stroke: '#ef4444', strokeWidth: 2 }}
                      />
                    </svg>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="bg-white p-6 rounded-lg border border-gray-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                >
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 p-2 rounded-md">
                      <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                    </div>
                    <span className="ml-2 text-sm text-gray-500">AVERAGE REVENUE</span>
                  </div>
                  <h3 className="text-3xl font-bold mb-2">$268</h3>
                  <div className="flex items-center text-sm">
                    <span className="text-green-500 flex items-center mr-2">
                      <ChevronDown className="transform rotate-180" size={16} />
                      +32%
                    </span>
                    <span className="text-gray-500">vs yesterday</span>
                  </div>
                  <div className="mt-2">
                    <svg height="40" width="100%">
                      <polyline
                        points="0,25 20,5 40,30 60,10 80,20 100,5 120,15 140,10 160,25"
                        style={{ fill: 'none', stroke: '#22c55e', strokeWidth: 2 }}
                      />
                    </svg>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="bg-white p-6 rounded-lg border border-gray-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                >
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 p-2 rounded-md">
                      <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                    </div>
                    <span className="ml-2 text-sm text-gray-500">TOTAL REVENUE</span>
                  </div>
                  <h3 className="text-3xl font-bold mb-2">$2189</h3>
                  <div className="flex items-center text-sm">
                    <span className="text-green-500 flex items-center mr-2">
                      <ChevronDown className="transform rotate-180" size={16} />
                      +12%
                    </span>
                    <span className="text-gray-500">vs yesterday</span>
                  </div>
                  <div className="mt-2">
                    <svg height="40" width="100%">
                      <polyline
                        points="0,20 20,15 40,25 60,10 80,20 100,15 120,5 140,15 160,5"
                        style={{ fill: 'none', stroke: '#22c55e', strokeWidth: 2 }}
                      />
                    </svg>
                  </div>
                </motion.div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <motion.div 
                  className="bg-white p-6 rounded-lg border border-gray-200 lg:col-span-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold">Sales Analytics</h3>
                    <div className="relative">
                      <select 
                        className="appearance-none bg-transparent border border-gray-300 rounded text-sm px-3 py-1 pr-8"
                        value={salesTimeframe}
                        onChange={(e) => setSalesTimeframe(e.target.value)}
                      >
                        <option>Last 6 months</option>
                        <option>Last 3 months</option>
                        <option>Last year</option>
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
                    </div>
                  </div>
                  
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={salesData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#00C853" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#00C853" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} />
                        <YAxis 
                          axisLine={false} 
                          tickLine={false} 
                          tickFormatter={(value) => `$${value}`} 
                        />
                        <Tooltip 
                          formatter={(value) => [`$${value}`, 'Revenue']}
                          labelFormatter={(label) => `Month: ${label}`}
                          contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#00C853" 
                          strokeWidth={2}
                          fillOpacity={1} 
                          fill="url(#colorValue)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="bg-white p-6 rounded-lg border border-gray-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold">Sales By category</h3>
                    <div className="relative">
                      <select 
                        className="appearance-none bg-transparent border border-gray-300 rounded text-sm px-3 py-1 pr-8"
                        value={salesCategory}
                        onChange={(e) => setSalesCategory(e.target.value)}
                      >
                        <option>Week</option>
                        <option>Month</option>
                        <option>Year</option>
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
                    </div>
                  </div>
                  
                  <div className="h-64 flex items-center justify-center">
                    <div className="relative">
                      <ResponsiveContainer width={180} height={180}>
                        <PieChart>
                          <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={2}
                            dataKey="value"
                          >
                            {pieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <span className="text-2xl font-bold">$1800</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                        <span className="text-sm">Petrol (50%)</span>
                      </div>
                      <div className="text-sm font-medium">$1000</div>
                    </div>
                    
                    <div className="text-xs text-gray-500">1,000 Liters Petrol Sale</div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-blue-400 mr-2"></div>
                        <span className="text-sm">Diesel (35%)</span>
                      </div>
                      <div className="text-sm font-medium">$500</div>
                    </div>
                    
                    <div className="text-xs text-gray-500">500 Liters Petrol Sale</div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-orange-400 mr-2"></div>
                        <span className="text-sm">Grocery Items (15%)</span>
                      </div>
                      <div className="text-sm font-medium">$300</div>
                    </div>
                    
                    <div className="text-xs text-gray-500">1348 Category Products sale</div>
                  </div>
                </motion.div>
              </div>
              
              <motion.div 
                className="bg-white p-6 rounded-lg border border-gray-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center">
                    <ShoppingBag className="text-green-500 mr-2" size={20} />
                    <h3 className="text-lg font-bold">Recent orders</h3>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="relative w-64">
                      <Input 
                        type="text" 
                        placeholder="Search here" 
                        className="pl-10"
                      />
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    </div>
                    
                    <Button 
                      className="bg-white border border-gray-200 text-green-500 hover:bg-green-50"
                    >
                      Export
                    </Button>
                  </div>
                </div>
                
                <div className="overflow-x-auto -mx-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="py-4">Order ID</TableHead>
                        <TableHead>Customer Name</TableHead>
                        <TableHead>Items</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Order status</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentOrders.map((order, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{order.customer}</TableCell>
                          <TableCell>{order.items}</TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>{order.amount}</TableCell>
                          <TableCell>
                            <span 
                              className={`inline-flex px-2 py-1 text-xs rounded-full ${
                                order.status === 'New' 
                                  ? 'bg-blue-100 text-blue-600' 
                                  : order.status === 'Completed'
                                  ? 'bg-green-100 text-green-600'
                                  : 'bg-red-100 text-red-600'
                              }`}
                            >
                              {order.status}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="icon">
                              <MoreVertical size={18} />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </motion.div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StationDashboard;
