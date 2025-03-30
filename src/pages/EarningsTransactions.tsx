
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, DollarSign, CreditCard, Download, 
  Filter, TrendingUp, Calendar, MoreVertical
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from '@/components/ui/table';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from '@/components/DashboardLayout';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

// Sample data for charts and tables
const earningsData = [
  { name: 'Jan', revenue: 18500, expenses: 12000, profit: 6500 },
  { name: 'Feb', revenue: 22400, expenses: 14500, profit: 7900 },
  { name: 'Mar', revenue: 21300, expenses: 13800, profit: 7500 },
  { name: 'Apr', revenue: 25100, expenses: 15200, profit: 9900 },
  { name: 'May', revenue: 27800, expenses: 16500, profit: 11300 },
  { name: 'Jun', revenue: 29200, expenses: 17800, profit: 11400 },
  { name: 'Jul', revenue: 28400, expenses: 17200, profit: 11200 },
];

const transactionsData = [
  { id: 'TRX-5432', date: '2023-07-01', customer: 'John Smith', type: 'Fuel Purchase', amount: 75.45, method: 'Credit Card', status: 'Completed' },
  { id: 'TRX-5433', date: '2023-07-01', customer: 'Sarah Johnson', type: 'Grocery Items', amount: 34.21, method: 'Cash', status: 'Completed' },
  { id: 'TRX-5434', date: '2023-07-02', customer: 'Michael Brown', type: 'Fuel Purchase', amount: 62.50, method: 'Debit Card', status: 'Completed' },
  { id: 'TRX-5435', date: '2023-07-02', customer: 'Emma Wilson', type: 'Fuel + Grocery', amount: 95.75, method: 'Credit Card', status: 'Completed' },
  { id: 'TRX-5436', date: '2023-07-03', customer: 'David Miller', type: 'Fuel Purchase', amount: 48.30, method: 'Mobile Pay', status: 'Completed' },
  { id: 'TRX-5437', date: '2023-07-03', customer: 'Lisa Taylor', type: 'Car Wash', amount: 15.00, method: 'Credit Card', status: 'Completed' },
  { id: 'TRX-5438', date: '2023-07-04', customer: 'James Anderson', type: 'Fuel Purchase', amount: 81.25, method: 'Debit Card', status: 'Completed' },
  { id: 'TRX-5439', date: '2023-07-04', customer: 'Jennifer Martin', type: 'Grocery Items', amount: 27.85, method: 'Cash', status: 'Completed' },
  { id: 'TRX-5440', date: '2023-07-05', customer: 'Robert White', type: 'Fuel + Car Wash', amount: 68.00, method: 'Credit Card', status: 'Completed' },
  { id: 'TRX-5441', date: '2023-07-05', customer: 'Patricia Clark', type: 'Fuel Purchase', amount: 55.40, method: 'Mobile Pay', status: 'Pending' },
];

const paymentMethodsData = [
  { name: 'Credit Card', value: 45 },
  { name: 'Debit Card', value: 30 },
  { name: 'Cash', value: 15 },
  { name: 'Mobile Pay', value: 10 },
];

const salesCategoryData = [
  { name: 'Fuel', value: 68 },
  { name: 'Grocery Items', value: 22 },
  { name: 'Car Wash', value: 7 },
  { name: 'Services', value: 3 },
];

const EarningsTransactions = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('earnings');
  const [timeframe, setTimeframe] = useState('weekly');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Filtered transactions based on search and filter
  const filteredTransactions = transactionsData.filter(transaction => {
    const matchesSearch = 
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = 
      filterStatus === 'all' || 
      transaction.status.toLowerCase() === filterStatus.toLowerCase();
    
    return matchesSearch && matchesFilter;
  });

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: "Financial Data Loaded",
        description: "Earnings and transactions data has been updated",
        duration: 3000,
      });
    }, 1500);
    
    // Simulate real-time transaction updates
    const interval = setInterval(() => {
      const randomAmount = (Math.random() * 100).toFixed(2);
      const transactionTypes = ['Fuel Purchase', 'Grocery Items', 'Car Wash', 'Fuel + Grocery'];
      const paymentMethods = ['Credit Card', 'Debit Card', 'Cash', 'Mobile Pay'];
      const names = ['John Smith', 'Sarah Johnson', 'Michael Brown', 'Emma Wilson', 'James Anderson'];
      
      const newTransaction = {
        id: `TRX-${Math.floor(Math.random() * 1000)}`,
        date: new Date().toISOString().split('T')[0],
        customer: names[Math.floor(Math.random() * names.length)],
        type: transactionTypes[Math.floor(Math.random() * transactionTypes.length)],
        amount: parseFloat(randomAmount),
        method: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
        status: 'Completed'
      };
      
      toast({
        title: "New Transaction",
        description: `${newTransaction.customer} purchased ${newTransaction.type} for $${newTransaction.amount}`,
        duration: 3000,
      });
    }, 30000); // Every 30 seconds
    
    return () => clearInterval(interval);
  }, [toast]);

  const handleDownloadReport = () => {
    toast({
      title: "Report Downloaded",
      description: "Financial report has been generated and downloaded",
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold mb-1">Financial Overview</h2>
            <p className="text-gray-500">Track your earnings, expenses, and transactions</p>
          </div>
          
          <Button 
            className="bg-green-500 hover:bg-green-600 flex items-center"
            onClick={handleDownloadReport}
          >
            <Download className="mr-2" size={16} />
            Download Report
          </Button>
        </div>
        
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="earnings">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <motion.div 
                className="bg-white p-6 rounded-lg border border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              >
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <DollarSign className="text-green-500" size={20} />
                  </div>
                  <span className="ml-3 text-sm text-gray-500">TOTAL REVENUE</span>
                </div>
                <h3 className="text-3xl font-bold mb-2">$172,458</h3>
                <div className="flex items-center text-sm">
                  <TrendingUp className="text-green-500 mr-1" size={16} />
                  <span className="text-green-500 mr-2">+12.5%</span>
                  <span className="text-gray-500">vs. last month</span>
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
                  <div className="bg-blue-100 p-3 rounded-full">
                    <CreditCard className="text-blue-500" size={20} />
                  </div>
                  <span className="ml-3 text-sm text-gray-500">TOTAL TRANSACTIONS</span>
                </div>
                <h3 className="text-3xl font-bold mb-2">3,854</h3>
                <div className="flex items-center text-sm">
                  <TrendingUp className="text-green-500 mr-1" size={16} />
                  <span className="text-green-500 mr-2">+8.2%</span>
                  <span className="text-gray-500">vs. last month</span>
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
                  <div className="bg-green-100 p-3 rounded-full">
                    <DollarSign className="text-green-500" size={20} />
                  </div>
                  <span className="ml-3 text-sm text-gray-500">NET PROFIT</span>
                </div>
                <h3 className="text-3xl font-bold mb-2">$65,700</h3>
                <div className="flex items-center text-sm">
                  <TrendingUp className="text-green-500 mr-1" size={16} />
                  <span className="text-green-500 mr-2">+15.3%</span>
                  <span className="text-gray-500">vs. last month</span>
                </div>
              </motion.div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <motion.div 
                className="bg-white p-6 rounded-lg border border-gray-200 lg:col-span-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold">Revenue Overview</h3>
                  <div className="relative">
                    <Select 
                      value={timeframe}
                      onValueChange={setTimeframe}
                    >
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Select timeframe" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="yearly">Yearly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={earningsData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
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
                        formatter={(value) => [`$${value}`, '']}
                        contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
                      />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="#22c55e" 
                        strokeWidth={2}
                        fillOpacity={1} 
                        fill="url(#colorRevenue)" 
                        name="Revenue"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="expenses" 
                        stroke="#ef4444" 
                        strokeWidth={2}
                        fillOpacity={1} 
                        fill="url(#colorExpenses)" 
                        name="Expenses"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="profit" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        fillOpacity={1} 
                        fill="url(#colorProfit)" 
                        name="Profit"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div 
                className="bg-white p-6 rounded-lg border border-gray-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold">Payment Methods</h3>
                </div>
                
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={paymentMethodsData}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                      <XAxis type="number" axisLine={false} tickLine={false} tickFormatter={(value) => `${value}%`} />
                      <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} />
                      <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                      <Bar dataKey="value" fill="#22c55e" radius={[0, 4, 4, 0]} barSize={20} />
                    </BarChart>
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
                  <h3 className="text-lg font-bold">Sales by Category</h3>
                </div>
                
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={salesCategoryData}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                      <XAxis type="number" axisLine={false} tickLine={false} tickFormatter={(value) => `${value}%`} />
                      <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} />
                      <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                      <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            </div>
          </TabsContent>
          
          <TabsContent value="transactions">
            <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input 
                    type="text" 
                    placeholder="Search transactions..." 
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <Select 
                    value={filterStatus}
                    onValueChange={setFilterStatus}
                  >
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button variant="outline" className="flex items-center">
                    <Calendar className="mr-2" size={16} />
                    Date Range
                  </Button>
                  
                  <Button variant="outline" className="flex items-center">
                    <Filter className="mr-2" size={16} />
                    More Filters
                  </Button>
                  
                  <Button 
                    className="bg-green-500 hover:bg-green-600"
                    onClick={handleDownloadReport}
                  >
                    <Download className="mr-2" size={16} />
                    Export
                  </Button>
                </div>
              </div>
              
              <div className="overflow-x-auto -mx-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="py-4 w-[120px]">Transaction ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Payment Method</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-medium">{transaction.id}</TableCell>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell>{transaction.customer}</TableCell>
                        <TableCell>{transaction.type}</TableCell>
                        <TableCell className="font-medium">${transaction.amount.toFixed(2)}</TableCell>
                        <TableCell>{transaction.method}</TableCell>
                        <TableCell>
                          <span 
                            className={`inline-flex px-2 py-1 text-xs rounded-full ${
                              transaction.status === 'Completed' 
                                ? 'bg-green-100 text-green-600' 
                                : transaction.status === 'Pending'
                                ? 'bg-yellow-100 text-yellow-600'
                                : 'bg-red-100 text-red-600'
                            }`}
                          >
                            {transaction.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon">
                            <MoreVertical size={18} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="mt-6 flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Showing {filteredTransactions.length} of {transactionsData.length} transactions
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled>Previous</Button>
                  <Button variant="outline" size="sm" className="bg-gray-100">1</Button>
                  <Button variant="outline" size="sm">2</Button>
                  <Button variant="outline" size="sm">3</Button>
                  <Button variant="outline" size="sm">Next</Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );

  return (
    <DashboardLayout title="Earnings & Transactions">
      {content}
    </DashboardLayout>
  );
};

export default EarningsTransactions;
