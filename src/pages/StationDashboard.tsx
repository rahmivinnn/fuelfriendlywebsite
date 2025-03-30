
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, User, ChevronDown, 
  ShoppingBag, Plus, Bell, MoreVertical
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import DashboardLayout from '@/components/DashboardLayout';

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
];

const StationDashboard = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [salesTimeframe, setSalesTimeframe] = useState('Last 6 months');
  const [salesCategory, setSalesCategory] = useState('Week');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const loadDashboard = setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: "Welcome Back!",
        description: "Your station dashboard is ready",
        duration: 3000,
      });
    }, 1500);
    
    return () => {
      clearTimeout(loadDashboard);
    };
  }, [toast]);

  const refreshData = () => {
    setRefreshing(true);
    
    setTimeout(() => {
      setRefreshing(false);
      
      toast({
        title: "Dashboard Refreshed",
        description: "All data has been updated with the latest information",
        duration: 3000,
      });
    }, 1000);
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
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold mb-1">Welcome Back Shah</h2>
            <p className="text-gray-500">Here is what happening with your station</p>
          </div>
          
          <Button 
            onClick={refreshData}
            disabled={refreshing}
            className="bg-green-500 hover:bg-green-600"
          >
            {refreshing ? "Refreshing..." : "Refresh Data"}
          </Button>
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
                <PieChart width={180} height={180}>
                  <Pie
                    data={pieData}
                    cx={90}
                    cy={90}
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
          
          <div className="flex items-center justify-center mt-4">
            <Button 
              className="bg-green-500 hover:bg-green-600"
              onClick={() => {
                toast({
                  title: "Loading More Orders",
                  description: "Loading additional order history",
                  duration: 2000,
                });
              }}
            >
              Load More
            </Button>
          </div>
        </motion.div>
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
