
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, Download, Calendar, Filter, 
  BarChart4, PieChart, LineChart, ArrowUpRight,
  ChevronDown, ArrowDownRight, TrendingUp
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import DashboardLayout from '@/components/DashboardLayout';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart as RechartLine, Line, PieChart as RechartPie, Pie, Cell, AreaChart, Area } from 'recharts';

// Sample reports data
const reportsData = [
  { id: 1, name: 'Monthly Sales Summary', type: 'Sales', date: '2023-07-01', format: 'PDF' },
  { id: 2, name: 'Quarterly Financial Report', type: 'Finance', date: '2023-06-30', format: 'Excel' },
  { id: 3, name: 'Inventory Status Report', type: 'Inventory', date: '2023-06-28', format: 'PDF' },
  { id: 4, name: 'Customer Transactions', type: 'Customers', date: '2023-06-25', format: 'PDF' },
  { id: 5, name: 'Employee Hours Log', type: 'HR', date: '2023-06-20', format: 'Excel' },
  { id: 6, name: 'Fuel Pricing Analysis', type: 'Analysis', date: '2023-06-15', format: 'PDF' },
  { id: 7, name: 'Equipment Maintenance Log', type: 'Maintenance', date: '2023-06-10', format: 'PDF' },
  { id: 8, name: 'Vendor Payments Summary', type: 'Finance', date: '2023-06-05', format: 'Excel' },
];

// Chart data
const monthlySalesData = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 5000 },
  { name: 'Apr', sales: 4500 },
  { name: 'May', sales: 6000 },
  { name: 'Jun', sales: 5500 },
  { name: 'Jul', sales: 7000 },
];

const categoryData = [
  { name: 'Fuel', value: 65 },
  { name: 'Convenience Store', value: 20 },
  { name: 'Services', value: 10 },
  { name: 'Other', value: 5 },
];

const COLORS = ['#00C853', '#29B6F6', '#FF9800', '#E91E63'];

const customerTrendsData = [
  { name: 'Week 1', returning: 400, new: 240 },
  { name: 'Week 2', returning: 420, new: 230 },
  { name: 'Week 3', returning: 430, new: 245 },
  { name: 'Week 4', returning: 450, new: 260 },
  { name: 'Week 5', returning: 470, new: 280 },
  { name: 'Week 6', returning: 490, new: 300 },
];

const inventoryLevelsData = [
  { name: 'Jan', actual: 90, target: 95 },
  { name: 'Feb', actual: 85, target: 95 },
  { name: 'Mar', actual: 92, target: 95 },
  { name: 'Apr', actual: 87, target: 95 },
  { name: 'May', actual: 95, target: 95 },
  { name: 'Jun', actual: 91, target: 95 },
  { name: 'Jul', actual: 89, target: 95 },
];

const Reports = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [reports, setReports] = useState(reportsData);
  const [filterType, setFilterType] = useState('all');
  const [dateRange, setDateRange] = useState('last-30');
  const [customDateRange, setCustomDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({ from: undefined, to: undefined });
  const [isCustomDatePickerOpen, setIsCustomDatePickerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('reports');

  // Filter reports based on type and date range
  const filteredReports = reports.filter(report => {
    const reportDate = new Date(report.date);
    const typeMatch = filterType === 'all' || report.type.toLowerCase() === filterType.toLowerCase();
    
    if (!typeMatch) return false;

    if (dateRange === 'custom' && customDateRange.from && customDateRange.to) {
      return reportDate >= customDateRange.from && reportDate <= customDateRange.to;
    }

    const today = new Date();
    switch (dateRange) {
      case 'last-7':
        const sevenDaysAgo = new Date(today.setDate(today.getDate() - 7));
        return reportDate >= sevenDaysAgo;
      case 'last-30':
        const thirtyDaysAgo = new Date(today.setDate(today.getDate() - 30));
        return reportDate >= thirtyDaysAgo;
      case 'last-90':
        const ninetyDaysAgo = new Date(today.setDate(today.getDate() - 90));
        return reportDate >= ninetyDaysAgo;
      case 'this-year':
        return reportDate.getFullYear() === today.getFullYear();
      case 'all-time':
        return true;
      default:
        return true;
    }
  });

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: "Reports Loaded",
        description: "All reports and analytics data has been loaded",
        duration: 3000,
      });
    }, 1500);
    
    // Simulate new reports being added
    const interval = setInterval(() => {
      const reportTypes = ['Sales', 'Finance', 'Inventory', 'Customers', 'HR', 'Analysis', 'Maintenance'];
      const formats = ['PDF', 'Excel'];
      
      const newReport = {
        id: reports.length + 1,
        name: `New Report ${new Date().toLocaleTimeString()}`,
        type: reportTypes[Math.floor(Math.random() * reportTypes.length)],
        date: new Date().toISOString().split('T')[0],
        format: formats[Math.floor(Math.random() * formats.length)]
      };
      
      setReports(prevReports => [newReport, ...prevReports]);
      
      toast({
        title: "New Report Available",
        description: `${newReport.name} has been generated`,
        duration: 3000,
      });
    }, 120000); // Every 2 minutes
    
    return () => clearInterval(interval);
  }, [toast, reports]);

  const handleDownloadReport = (report) => {
    toast({
      title: "Downloading Report",
      description: `${report.name} is being downloaded in ${report.format} format`,
      duration: 3000,
    });
  };

  const handleGenerateReport = () => {
    toast({
      title: "Generating Report",
      description: "Your custom report is being generated. It will be available shortly.",
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
            <h2 className="text-2xl font-bold mb-1">Reports & Analytics</h2>
            <p className="text-gray-500">View and download reports, or analyze your business data</p>
          </div>
          
          <Button 
            className="bg-green-500 hover:bg-green-600 flex items-center"
            onClick={handleGenerateReport}
          >
            <FileText className="mr-2" size={16} />
            Generate New Report
          </Button>
        </div>
        
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="reports">Reports Library</TabsTrigger>
            <TabsTrigger value="analytics">Data Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="reports">
            <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div className="flex flex-wrap gap-3">
                  <Select 
                    value={filterType}
                    onValueChange={setFilterType}
                  >
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="inventory">Inventory</SelectItem>
                      <SelectItem value="customers">Customers</SelectItem>
                      <SelectItem value="hr">HR</SelectItem>
                      <SelectItem value="analysis">Analysis</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select 
                    value={dateRange}
                    onValueChange={setDateRange}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select date range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="last-7">Last 7 days</SelectItem>
                      <SelectItem value="last-30">Last 30 days</SelectItem>
                      <SelectItem value="last-90">Last 90 days</SelectItem>
                      <SelectItem value="this-year">This year</SelectItem>
                      <SelectItem value="all-time">All time</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Popover open={isCustomDatePickerOpen} onOpenChange={setIsCustomDatePickerOpen}>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="flex items-center">
                        <Calendar className="mr-2" size={16} />
                        {customDateRange.from && customDateRange.to ? 
                          `${customDateRange.from.toLocaleDateString()} - ${customDateRange.to.toLocaleDateString()}` :
                          'Custom Date Range'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        initialFocus
                        mode="range"
                        defaultMonth={customDateRange.from}
                        selected={{
                          from: customDateRange.from,
                          to: customDateRange.to
                        }}
                        onSelect={(range) => {
                          setCustomDateRange(range || { from: undefined, to: undefined });
                          if (range?.from && range?.to) {
                            setDateRange('custom');
                            setIsCustomDatePickerOpen(false);
                          }
                        }}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="relative">
                  <Input 
                    type="text" 
                    placeholder="Search reports..." 
                    className="w-full md:w-64"
                  />
                </div>
              </div>
              
              <div className="overflow-x-auto -mx-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[300px]">Report Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Date Generated</TableHead>
                      <TableHead>Format</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.name}</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {report.type}
                          </span>
                        </TableCell>
                        <TableCell>{report.date}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            report.format === 'PDF' 
                              ? 'bg-red-100 text-red-800' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {report.format}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-green-600"
                            onClick={() => handleDownloadReport(report)}
                          >
                            <Download className="mr-2" size={14} />
                            Download
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="mt-6 flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Showing {filteredReports.length} of {reports.length} reports
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled>Previous</Button>
                  <Button variant="outline" size="sm" className="bg-gray-100">1</Button>
                  <Button variant="outline" size="sm">2</Button>
                  <Button variant="outline" size="sm">Next</Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">TOTAL SALES</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$43,594</div>
                  <div className="flex items-center mt-1 text-sm">
                    <span className="text-green-500 flex items-center mr-1">
                      <ArrowUpRight size={14} className="mr-1" />
                      12%
                    </span>
                    <span className="text-gray-500">vs last month</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">TOTAL TRANSACTIONS</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3,782</div>
                  <div className="flex items-center mt-1 text-sm">
                    <span className="text-green-500 flex items-center mr-1">
                      <ArrowUpRight size={14} className="mr-1" />
                      8%
                    </span>
                    <span className="text-gray-500">vs last month</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">AVG. ORDER VALUE</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$37.42</div>
                  <div className="flex items-center mt-1 text-sm">
                    <span className="text-green-500 flex items-center mr-1">
                      <ArrowUpRight size={14} className="mr-1" />
                      3%
                    </span>
                    <span className="text-gray-500">vs last month</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">CONVERSION RATE</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">68.2%</div>
                  <div className="flex items-center mt-1 text-sm">
                    <span className="text-red-500 flex items-center mr-1">
                      <ArrowDownRight size={14} className="mr-1" />
                      2%
                    </span>
                    <span className="text-gray-500">vs last month</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-base font-semibold">Monthly Sales</CardTitle>
                  <BarChart4 className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlySalesData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`$${value}`, 'Sales']} />
                        <Bar dataKey="sales" fill="#00C853" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-base font-semibold">Sales by Category</CardTitle>
                  <PieChart className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent className="flex justify-center">
                  <div className="h-80 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartPie>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={4}
                          dataKey="value"
                          label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                      </RechartPie>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-base font-semibold">Customer Trends</CardTitle>
                  <LineChart className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartLine
                        data={customerTrendsData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="returning" stroke="#00C853" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="new" stroke="#29B6F6" />
                      </RechartLine>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-base font-semibold">Inventory Levels</CardTitle>
                  <TrendingUp className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={inventoryLevelsData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#00C853" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#00C853" stopOpacity={0.1} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="actual"
                          stroke="#00C853"
                          fillOpacity={1}
                          fill="url(#colorActual)"
                        />
                        <Line type="monotone" dataKey="target" stroke="#FF9800" strokeDasharray="5 5" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );

  return (
    <DashboardLayout title="Reports & Analytics">
      {content}
    </DashboardLayout>
  );
};

export default Reports;
