import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart as BarChartIcon, 
  PieChart as PieChartIcon, 
  LineChart as LineChartIcon, 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Filter, 
  Download, 
  RefreshCw,
  Fuel,
  Truck,
  Users,
  DollarSign
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/molecules/Card';
import { Button } from '@/components/atoms/Button';
import { Typography } from '@/components/atoms/Typography';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { useTheme } from '@/contexts/ThemeContext';

// Mock data
const generateMockData = () => {
  // Monthly sales data
  const monthlySales = Array.from({ length: 12 }, (_, i) => {
    const month = new Date(0, i).toLocaleString('default', { month: 'short' });
    return {
      name: month,
      diesel: Math.floor(Math.random() * 5000) + 3000,
      petrol: Math.floor(Math.random() * 4000) + 2000,
      lpg: Math.floor(Math.random() * 1500) + 500,
    };
  });
  
  // Fuel distribution data
  const fuelDistribution = [
    { name: 'Diesel', value: 45 },
    { name: 'Petrol', value: 30 },
    { name: 'LPG', value: 15 },
    { name: 'Other', value: 10 },
  ];
  
  // Customer types
  const customerTypes = [
    { name: 'Business', value: 65 },
    { name: 'Individual', value: 35 },
  ];
  
  // Daily deliveries
  const dailyDeliveries = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - 29 + i);
    return {
      name: date.getDate(),
      deliveries: Math.floor(Math.random() * 20) + 5,
    };
  });
  
  // Key metrics
  const keyMetrics = {
    totalSales: Math.floor(Math.random() * 500000) + 200000,
    totalDeliveries: Math.floor(Math.random() * 1000) + 500,
    activeCustomers: Math.floor(Math.random() * 500) + 200,
    fuelVolume: Math.floor(Math.random() * 100000) + 50000,
    salesGrowth: (Math.random() * 20) - 5,
    deliveriesGrowth: (Math.random() * 15) - 3,
    customersGrowth: (Math.random() * 10) - 2,
    volumeGrowth: (Math.random() * 25) - 5,
  };
  
  return {
    monthlySales,
    fuelDistribution,
    customerTypes,
    dailyDeliveries,
    keyMetrics,
  };
};

interface AnalyticsDashboardProps {
  className?: string;
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ className }) => {
  const { toast } = useToast();
  const { isDarkMode } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('year');
  const [data, setData] = useState(generateMockData());
  
  // Colors for charts
  const COLORS = {
    diesel: '#3b82f6',
    petrol: '#ef4444',
    lpg: '#10b981',
    other: '#f59e0b',
    business: '#8b5cf6',
    individual: '#ec4899',
    deliveries: '#6366f1',
  };
  
  // Load data
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call
    const timer = setTimeout(() => {
      setData(generateMockData());
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [timeRange]);
  
  // Handle refresh data
  const handleRefreshData = () => {
    setIsLoading(true);
    
    toast({
      title: "Refreshing Data",
      description: "Fetching the latest analytics data...",
      duration: 2000,
    });
    
    // Simulate API call
    setTimeout(() => {
      setData(generateMockData());
      setIsLoading(false);
      
      toast({
        title: "Data Refreshed",
        description: "Analytics dashboard has been updated with the latest data.",
        duration: 3000,
      });
    }, 1500);
  };
  
  // Handle export data
  const handleExportData = () => {
    toast({
      title: "Exporting Data",
      description: "Your analytics data is being exported to CSV.",
      duration: 3000,
    });
    
    // In a real app, this would trigger a download
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "Analytics data has been exported successfully.",
        duration: 3000,
      });
    }, 1500);
  };
  
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  return (
    <div className={className}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <Typography variant="h3">Analytics Dashboard</Typography>
          <Typography variant="muted">
            Monitor your business performance and pump side service metrics
          </Typography>
        </div>
        
        <div className="flex items-center space-x-2">
          <Select
            value={timeRange}
            onValueChange={setTimeRange}
          >
            <SelectTrigger className="w-[180px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Last 30 Days</SelectItem>
              <SelectItem value="quarter">Last Quarter</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
          
          <Button 
            variant="outline" 
            size="icon"
            onClick={handleRefreshData}
            disabled={isLoading}
          >
            <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
          </Button>
          
          <Button 
            variant="outline"
            onClick={handleExportData}
            leftIcon={<Download size={16} />}
          >
            Export
          </Button>
        </div>
      </div>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Total Sales */}
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <Typography variant="muted">Total Sales</Typography>
                <Typography variant="h3" className="mt-1">
                  {formatCurrency(data.keyMetrics.totalSales)}
                </Typography>
                <div className="flex items-center mt-1">
                  {data.keyMetrics.salesGrowth > 0 ? (
                    <>
                      <TrendingUp size={16} className="text-green-500 mr-1" />
                      <Typography variant="small" className="text-green-500">
                        {data.keyMetrics.salesGrowth.toFixed(1)}%
                      </Typography>
                    </>
                  ) : (
                    <>
                      <TrendingDown size={16} className="text-red-500 mr-1" />
                      <Typography variant="small" className="text-red-500">
                        {Math.abs(data.keyMetrics.salesGrowth).toFixed(1)}%
                      </Typography>
                    </>
                  )}
                  <Typography variant="small" className="text-gray-500 ml-1">
                    vs. previous period
                  </Typography>
                </div>
              </div>
              <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <DollarSign size={24} className="text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Total Deliveries */}
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <Typography variant="muted">Total Deliveries</Typography>
                <Typography variant="h3" className="mt-1">
                  {data.keyMetrics.totalDeliveries.toLocaleString()}
                </Typography>
                <div className="flex items-center mt-1">
                  {data.keyMetrics.deliveriesGrowth > 0 ? (
                    <>
                      <TrendingUp size={16} className="text-green-500 mr-1" />
                      <Typography variant="small" className="text-green-500">
                        {data.keyMetrics.deliveriesGrowth.toFixed(1)}%
                      </Typography>
                    </>
                  ) : (
                    <>
                      <TrendingDown size={16} className="text-red-500 mr-1" />
                      <Typography variant="small" className="text-red-500">
                        {Math.abs(data.keyMetrics.deliveriesGrowth).toFixed(1)}%
                      </Typography>
                    </>
                  )}
                  <Typography variant="small" className="text-gray-500 ml-1">
                    vs. previous period
                  </Typography>
                </div>
              </div>
              <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-full">
                <Truck size={24} className="text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Active Customers */}
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <Typography variant="muted">Active Customers</Typography>
                <Typography variant="h3" className="mt-1">
                  {data.keyMetrics.activeCustomers.toLocaleString()}
                </Typography>
                <div className="flex items-center mt-1">
                  {data.keyMetrics.customersGrowth > 0 ? (
                    <>
                      <TrendingUp size={16} className="text-green-500 mr-1" />
                      <Typography variant="small" className="text-green-500">
                        {data.keyMetrics.customersGrowth.toFixed(1)}%
                      </Typography>
                    </>
                  ) : (
                    <>
                      <TrendingDown size={16} className="text-red-500 mr-1" />
                      <Typography variant="small" className="text-red-500">
                        {Math.abs(data.keyMetrics.customersGrowth).toFixed(1)}%
                      </Typography>
                    </>
                  )}
                  <Typography variant="small" className="text-gray-500 ml-1">
                    vs. previous period
                  </Typography>
                </div>
              </div>
              <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                <Users size={24} className="text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Fuel Volume */}
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <Typography variant="muted">Fuel Volume</Typography>
                <Typography variant="h3" className="mt-1">
                  {data.keyMetrics.fuelVolume.toLocaleString()} L
                </Typography>
                <div className="flex items-center mt-1">
                  {data.keyMetrics.volumeGrowth > 0 ? (
                    <>
                      <TrendingUp size={16} className="text-green-500 mr-1" />
                      <Typography variant="small" className="text-green-500">
                        {data.keyMetrics.volumeGrowth.toFixed(1)}%
                      </Typography>
                    </>
                  ) : (
                    <>
                      <TrendingDown size={16} className="text-red-500 mr-1" />
                      <Typography variant="small" className="text-red-500">
                        {Math.abs(data.keyMetrics.volumeGrowth).toFixed(1)}%
                      </Typography>
                    </>
                  )}
                  <Typography variant="small" className="text-gray-500 ml-1">
                    vs. previous period
                  </Typography>
                </div>
              </div>
              <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded-full">
                <Fuel size={24} className="text-red-600 dark:text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts */}
      <Tabs defaultValue="sales" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="sales" className="flex items-center">
            <BarChartIcon size={16} className="mr-2" />
            Sales Analysis
          </TabsTrigger>
          <TabsTrigger value="distribution" className="flex items-center">
            <PieChartIcon size={16} className="mr-2" />
            Fuel Distribution
          </TabsTrigger>
          <TabsTrigger value="deliveries" className="flex items-center">
            <LineChartIcon size={16} className="mr-2" />
            Delivery Trends
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="sales">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Sales by Fuel Type</CardTitle>
              <CardDescription>
                Breakdown of sales volume across different fuel types
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                {isLoading ? (
                  <div className="h-full flex items-center justify-center">
                    <motion.div 
                      className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    />
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={data.monthlySales}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#e5e7eb'} />
                      <XAxis 
                        dataKey="name" 
                        stroke={isDarkMode ? '#9ca3af' : '#6b7280'} 
                      />
                      <YAxis 
                        stroke={isDarkMode ? '#9ca3af' : '#6b7280'} 
                        tickFormatter={(value) => `${value / 1000}k`} 
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                          borderColor: isDarkMode ? '#374151' : '#e5e7eb',
                          color: isDarkMode ? '#f9fafb' : '#111827'
                        }} 
                        formatter={(value) => [`${value.toLocaleString()} L`, undefined]}
                      />
                      <Legend />
                      <Bar dataKey="diesel" name="Diesel" fill={COLORS.diesel} radius={[4, 4, 0, 0]} />
                      <Bar dataKey="petrol" name="Petrol" fill={COLORS.petrol} radius={[4, 4, 0, 0]} />
                      <Bar dataKey="lpg" name="LPG" fill={COLORS.lpg} radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="distribution">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Fuel Type Distribution</CardTitle>
                <CardDescription>
                  Percentage breakdown of fuel types sold
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  {isLoading ? (
                    <div className="h-full flex items-center justify-center">
                      <motion.div 
                        className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      />
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={data.fuelDistribution}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {data.fuelDistribution.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={
                                entry.name === 'Diesel' ? COLORS.diesel :
                                entry.name === 'Petrol' ? COLORS.petrol :
                                entry.name === 'LPG' ? COLORS.lpg : COLORS.other
                              } 
                            />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value) => [`${value}%`, undefined]}
                          contentStyle={{ 
                            backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                            borderColor: isDarkMode ? '#374151' : '#e5e7eb',
                            color: isDarkMode ? '#f9fafb' : '#111827'
                          }} 
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Customer Type Distribution</CardTitle>
                <CardDescription>
                  Breakdown of business vs. individual customers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  {isLoading ? (
                    <div className="h-full flex items-center justify-center">
                      <motion.div 
                        className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      />
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={data.customerTypes}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {data.customerTypes.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={
                                entry.name === 'Business' ? COLORS.business : COLORS.individual
                              } 
                            />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value) => [`${value}%`, undefined]}
                          contentStyle={{ 
                            backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                            borderColor: isDarkMode ? '#374151' : '#e5e7eb',
                            color: isDarkMode ? '#f9fafb' : '#111827'
                          }} 
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="deliveries">
          <Card>
            <CardHeader>
              <CardTitle>Daily Delivery Volume</CardTitle>
              <CardDescription>
                Number of deliveries completed per day
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                {isLoading ? (
                  <div className="h-full flex items-center justify-center">
                    <motion.div 
                      className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    />
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={data.dailyDeliveries}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#e5e7eb'} />
                      <XAxis 
                        dataKey="name" 
                        stroke={isDarkMode ? '#9ca3af' : '#6b7280'} 
                      />
                      <YAxis 
                        stroke={isDarkMode ? '#9ca3af' : '#6b7280'} 
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                          borderColor: isDarkMode ? '#374151' : '#e5e7eb',
                          color: isDarkMode ? '#f9fafb' : '#111827'
                        }} 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="deliveries" 
                        name="Deliveries" 
                        stroke={COLORS.deliveries} 
                        fill={COLORS.deliveries} 
                        fillOpacity={0.3} 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsDashboard;
