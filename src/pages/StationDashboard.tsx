import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, User, ChevronDown, 
  ShoppingBag, Plus, Bell, MoreVertical,
  RefreshCcw, BarChart3, CircleDollarSign, Users
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Link } from 'react-router-dom';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  Legend, BarChart, Bar, LineChart, Line 
} from 'recharts';
import DashboardLayout from '@/components/DashboardLayout';
import { Badge } from "@/components/ui/badge";
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

// Generate random initial data
const generateSalesData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  return months.map(name => ({
    name,
    value: Math.floor(Math.random() * 400) + 200,
  }));
};

// Random fluctuation for real-time data simulation
const fluctuate = (value, percentage = 10) => {
  const fluctuation = (Math.random() * percentage * 2) - percentage;
  return Math.max(0, Math.floor(value * (1 + fluctuation / 100)));
};

// Initial data
const initialSalesData = generateSalesData();
const initialPieData = [
  { name: 'Petrol', value: 50 },
  { name: 'Diesel', value: 35 },
  { name: 'Grocery Items', value: 15 },
];

// Initial orders
const initialOrders = [
  { id: '#C1234', customer: 'JOHN DOE', items: 'Petrol 2 Liters', date: 'February 11, 2014', amount: '$250', status: 'New' },
  { id: '#C5678', customer: 'JANE SMITH', items: 'Petrol 2 Liters + Groceries', date: 'March 23, 2013', amount: '$250', status: 'New' },
  { id: '#C5678', customer: 'JOHN DOE', items: 'Petrol 2 Liters + Groceries', date: 'May 20, 2015', amount: '$250', status: 'New' },
  { id: '#C5678', customer: 'JANE SMITH', items: 'Petrol 2 Liters', date: 'October 31, 2017', amount: '$250', status: 'Completed' },
  { id: '#C5678', customer: 'JOHN DOE JOHN DOE JOHN DOE', items: 'Petrol 2 Liters + Groceries', date: 'October 24, 2018', amount: '$250', status: 'Completed' },
];

const COLORS = ['#00C853', '#29B6F6', '#FF9800'];

const StationDashboard = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [salesTimeframe, setSalesTimeframe] = useState('Last 6 months');
  const [salesCategory, setSalesCategory] = useState('Week');
  const [refreshing, setRefreshing] = useState(false);
  const [userName, setUserName] = useState('Station Owner');
  
  // Real-time data states
  const [salesData, setSalesData] = useState(initialSalesData);
  const [pieData, setPieData] = useState(initialPieData);
  const [recentOrders, setRecentOrders] = useState(initialOrders);
  const [dailyStats, setDailyStats] = useState({
    todayCustomers: 512,
    newCustomers: 325,
    averageRevenue: 268,
    totalRevenue: 2189
  });
  const [notifications, setNotifications] = useState([]);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Handle new order notification
  const addNotification = useCallback((message) => {
    const newNotification = {
      id: Date.now(),
      message,
      time: new Date().toLocaleTimeString()
    };
    
    setNotifications(prev => [newNotification, ...prev].slice(0, 10));
    
    toast({
      title: "New Notification",
      description: message,
      duration: 5000,
    });
  }, [toast]);
  
  // Process a new order
  const processNewOrder = useCallback(() => {
    const customers = ['John Smith', 'Mary Johnson', 'Robert Lee', 'Sarah Williams', 'Michael Brown'];
    const items = ['Petrol 3 Liters', 'Diesel 2 Liters', 'Petrol 5 Liters + Snacks', 'Diesel 4 Liters + Oil Change'];
    const amounts = ['$125', '$87', '$210', '$165', '$93'];
    
    const newOrder = {
      id: `#C${Math.floor(1000 + Math.random() * 9000)}`,
      customer: customers[Math.floor(Math.random() * customers.length)],
      items: items[Math.floor(Math.random() * items.length)],
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      amount: amounts[Math.floor(Math.random() * amounts.length)],
      status: 'New'
    };
    
    setRecentOrders(prev => [newOrder, ...prev].slice(0, 10));
    
    // Update stats
    setDailyStats(prev => ({
      ...prev,
      todayCustomers: prev.todayCustomers + 1,
      totalRevenue: prev.totalRevenue + parseInt(newOrder.amount.replace('$', ''))
    }));
    
    addNotification(`New order ${newOrder.id} received from ${newOrder.customer}`);
  }, [addNotification]);
  
  // Simulate real-time data updates
  useEffect(() => {
    // Get user name from localStorage if available
    const storedName = localStorage.getItem('stationOwnerName');
    if (storedName) {
      setUserName(storedName);
    }

    const loadDashboard = setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: "Welcome Back!",
        description: "Your station dashboard is ready",
        duration: 3000,
      });
      
      // Process a new order on initial load
      processNewOrder();
    }, 500);
    
    return () => clearTimeout(loadDashboard);
  }, [toast, processNewOrder]);
  
  // Auto-refresh effect
  useEffect(() => {
    let interval;
    
    if (autoRefresh) {
      interval = setInterval(() => {
        refreshData();
      }, 30000); // Auto refresh every 30 seconds
    }
    
    return () => clearInterval(interval);
  }, [autoRefresh]);
  
  // Real-time order updates
  useEffect(() => {
    let orderInterval;
    
    // Random order status updates
    orderInterval = setInterval(() => {
      if (recentOrders.length > 0) {
        setRecentOrders(prev => {
          const updated = [...prev];
          const randomIndex = Math.floor(Math.random() * updated.length);
          
          // Random chance to change status
          if (updated[randomIndex].status === 'New') {
            updated[randomIndex] = {
              ...updated[randomIndex],
              status: 'Completed'
            };
            
            addNotification(`Order ${updated[randomIndex].id} has been completed`);
          }
          
          return updated;
        });
      }
      
      // Random chance to receive a new order
      if (Math.random() > 0.7) {
        processNewOrder();
      }
    }, 15000); // Check every 15 seconds
    
    return () => clearInterval(orderInterval);
  }, [recentOrders, addNotification, processNewOrder]);
  
  // Filter orders based on search
  const filteredOrders = recentOrders.filter(order => 
    order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.items.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const refreshData = () => {
    setRefreshing(true);
    
    // Simulate data refresh with random fluctuations
    setSalesData(prev => prev.map(item => ({
      ...item,
      value: fluctuate(item.value)
    })));
    
    setPieData(prev => {
      // Keep total at 100%
      const newPetrol = Math.floor(35 + Math.random() * 30);
      const newDiesel = Math.floor(25 + Math.random() * 20);
      const newGrocery = 100 - newPetrol - newDiesel;
      return [
        { name: 'Petrol', value: newPetrol },
        { name: 'Diesel', value: newDiesel },
        { name: 'Grocery Items', value: newGrocery }
      ];
    });
    
    setDailyStats(prev => ({
      todayCustomers: fluctuate(prev.todayCustomers),
      newCustomers: fluctuate(prev.newCustomers),
      averageRevenue: fluctuate(prev.averageRevenue),
      totalRevenue: fluctuate(prev.totalRevenue)
    }));
    
    setTimeout(() => {
      setRefreshing(false);
      
      toast({
        title: "Dashboard Refreshed",
        description: "All data has been updated with the latest information",
        duration: 3000,
      });
    }, 500);
  };
  
  // Change order status
  const updateOrderStatus = (index, newStatus) => {
    setRecentOrders(prev => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        status: newStatus
      };
      
      addNotification(`Order ${updated[index].id} status updated to ${newStatus}`);
      
      return updated;
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
        transition={{ duration: 0.3 }}
      >
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-1">Welcome Back {userName}</h2>
            <p className="text-gray-500">Here is what happening with your station</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline"
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={autoRefresh ? "bg-green-50" : ""}
            >
              <RefreshCcw size={16} className="mr-1" />
              {autoRefresh ? "Auto-Refresh: ON" : "Auto-Refresh: OFF"}
            </Button>
            
            <Button 
              onClick={refreshData}
              disabled={refreshing}
              className="bg-green-500 hover:bg-green-600"
            >
              {refreshing ? "Refreshing..." : "Refresh Data"}
            </Button>
          </div>
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
              <div className="bg-green-100 p-2 rounded-md">
                <Users className="h-5 w-5 text-green-600" />
              </div>
              <span className="ml-2 text-sm text-gray-500">TODAY CUSTOMERS</span>
            </div>
            <h3 className="text-3xl font-bold mb-2">{dailyStats.todayCustomers}</h3>
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
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <span className="ml-2 text-sm text-gray-500">NEW CUSTOMERS</span>
            </div>
            <h3 className="text-3xl font-bold mb-2">{dailyStats.newCustomers}</h3>
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
              <div className="bg-purple-100 p-2 rounded-md">
                <BarChart3 className="h-5 w-5 text-purple-600" />
              </div>
              <span className="ml-2 text-sm text-gray-500">AVERAGE REVENUE</span>
            </div>
            <h3 className="text-3xl font-bold mb-2">${dailyStats.averageRevenue}</h3>
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
              <div className="bg-amber-100 p-2 rounded-md">
                <CircleDollarSign className="h-5 w-5 text-amber-600" />
              </div>
              <span className="ml-2 text-sm text-gray-500">TOTAL REVENUE</span>
            </div>
            <h3 className="text-3xl font-bold mb-2">${dailyStats.totalRevenue}</h3>
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
              <div className="flex items-center space-x-2">
                <Select
                  value={salesTimeframe}
                  onValueChange={setSalesTimeframe}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Select timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Last 6 months">Last 6 months</SelectItem>
                    <SelectItem value="Last 3 months">Last 3 months</SelectItem>
                    <SelectItem value="Last year">Last year</SelectItem>
                  </SelectContent>
                </Select>
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
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#00C853" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                    activeDot={{ r: 8 }}
                    name="Monthly Revenue"
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
              <div className="flex items-center space-x-2">
                <Select
                  value={salesCategory}
                  onValueChange={setSalesCategory}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Week">Week</SelectItem>
                    <SelectItem value="Month">Month</SelectItem>
                    <SelectItem value="Year">Year</SelectItem>
                  </SelectContent>
                </Select>
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
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                      animationBegin={0}
                      animationDuration={800}
                    >
                      {pieData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={COLORS[index % COLORS.length]}
                          className="hover:opacity-80 transition-opacity duration-200"
                        />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value}%`, 'Percentage']}
                      contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                  <span className="text-2xl font-bold">${dailyStats.totalRevenue}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm">Petrol ({pieData[0].value}%)</span>
                </div>
                <div className="text-sm font-medium">${Math.round(dailyStats.totalRevenue * pieData[0].value / 100)}</div>
              </div>
              
              <div className="text-xs text-gray-500">
                {Math.round(dailyStats.totalRevenue * pieData[0].value / 100 / 1.5)} Liters Petrol Sale
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-400 mr-2"></div>
                  <span className="text-sm">Diesel ({pieData[1].value}%)</span>
                </div>
                <div className="text-sm font-medium">${Math.round(dailyStats.totalRevenue * pieData[1].value / 100)}</div>
              </div>
              
              <div className="text-xs text-gray-500">
                {Math.round(dailyStats.totalRevenue * pieData[1].value / 100 / 1.8)} Liters Diesel Sale
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-orange-400 mr-2"></div>
                  <span className="text-sm">Grocery ({pieData[2].value}%)</span>
                </div>
                <div className="text-sm font-medium">${Math.round(dailyStats.totalRevenue * pieData[2].value / 100)}</div>
              </div>
              
              <div className="text-xs text-gray-500">
                {Math.round(dailyStats.totalRevenue * pieData[2].value / 100 / 12)} Category Products sale
              </div>
            </div>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <motion.div 
            className="bg-white p-6 rounded-lg border border-gray-200 lg:col-span-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <ShoppingBag className="text-green-500 mr-2" size={20} />
                <h3 className="text-lg font-bold">Real-time Orders</h3>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="relative w-64">
                  <Input 
                    type="text" 
                    placeholder="Search orders..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
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
                  {filteredOrders.map((order, index) => (
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
                        <select 
                          className="text-xs border border-gray-200 rounded px-2 py-1"
                          value={order.status}
                          onChange={(e) => updateOrderStatus(index, e.target.value)}
                        >
                          <option value="New">New</option>
                          <option value="Processing">Processing</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <div className="flex items-center justify-center mt-4">
              <Button 
                className="bg-green-500 hover:bg-green-600"
                onClick={processNewOrder}
              >
                Simulate New Order
              </Button>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-white p-6 rounded-lg border border-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Real-time Notifications</h3>
              <Badge variant="outline" className="bg-green-50 text-green-700">
                Live
              </Badge>
            </div>
            
            <div className="space-y-4 max-h-[400px] overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No notifications yet
                </div>
              ) : (
                <AnimatePresence>
                  {notifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-3 border border-gray-100 rounded-lg bg-gray-50"
                    >
                      <div className="flex justify-between items-start">
                        <p className="text-sm">{notification.message}</p>
                        <span className="text-xs text-gray-500">{notification.time}</span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>
            
            {notifications.length > 0 && (
              <Button 
                variant="outline" 
                className="w-full mt-4 text-sm"
                onClick={() => setNotifications([])}
              >
                Clear All
              </Button>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );

  return (
    <DashboardLayout title="Dashboard">
      {content}
    </DashboardLayout>
  );
};

export default StationDashboard;
