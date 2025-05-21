<<<<<<< HEAD
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Download,
  MoreVertical,
  CreditCard,
  Plus,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
=======

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
>>>>>>> fc50f12d78601307538b9c65c6925970812ed209
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
<<<<<<< HEAD
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
=======
} from "@/components/ui/card";
>>>>>>> fc50f12d78601307538b9c65c6925970812ed209
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
<<<<<<< HEAD
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Types
type Transaction = {
  id: string;
  customerName: string;
  date: string;
  invoiceId: string;
  amount: string;
  status: 'received' | 'withdrawn';
  details: string;
};

type EarningCard = {
  title: string;
  amount: string;
  transactions: number;
  trend: 'up' | 'down' | 'stable';
  percentage?: number;
};

type PaymentMethod = {
  type: 'mastercard' | 'visa' | 'paypal' | 'applepay';
  name: string;
  lastFour: string;
  icon: string;
};

// Mock data
const earningCards: EarningCard[] = [
  {
    title: 'DAILY EARNING',
    amount: '$512',
    transactions: 5,
    trend: 'up',
    percentage: 12,
  },
  {
    title: 'WEEKLY EARNING',
    amount: '$325',
    transactions: 45,
    trend: 'down',
    percentage: 8,
  },
  {
    title: 'MONTHLY EARNING',
    amount: '$268',
    transactions: 60,
    trend: 'up',
    percentage: 5,
  },
  {
    title: 'TOTAL EARNING',
    amount: '$2189',
    transactions: 450,
    trend: 'up',
    percentage: 15,
  },
];

const transactions: Transaction[] = [
  {
    id: '1',
    customerName: 'JOHN DOE',
    date: 'February 11, 2014',
    invoiceId: 'Petrol 2 Liters',
    amount: '$250',
    status: 'received',
    details: 'Regular transaction',
  },
  {
    id: '2',
    customerName: 'JANE SMITH',
    date: 'March 23, 2013',
    invoiceId: 'Petrol 2 Liters + Groceries',
    amount: '$250',
    status: 'withdrawn',
    details: 'Includes convenience store items',
  },
  {
    id: '3',
    customerName: 'JOHN DOE',
    date: 'May 20, 2015',
    invoiceId: 'Petrol 2 Liters + Groceries',
    amount: '$250',
    status: 'received',
    details: 'Premium fuel',
  },
  {
    id: '4',
    customerName: 'JANE SMITH',
    date: 'October 31, 2017',
    invoiceId: 'Petrol 2 Liters',
    amount: '$250',
    status: 'withdrawn',
    details: 'Regular transaction',
  },
  {
    id: '5',
    customerName: 'JOHN DOE JOHN DOE JOHN DOE',
    date: 'October 24, 2018',
    invoiceId: 'Petrol 2 Liters + Groceries',
    amount: '$250',
    status: 'received',
    details: 'Includes car wash',
  },
  {
    id: '6',
    customerName: 'JANE SMITH',
    date: 'September 24, 2017',
    invoiceId: 'Petrol 2 Liters + Groceries',
    amount: '$250',
    status: 'received',
    details: 'Regular transaction',
  },
  {
    id: '7',
    customerName: 'JOHN DOE JOHN DOE JOHN DOE',
    date: 'February 29, 2012',
    invoiceId: 'Petrol 2 Liters',
    amount: '$250',
    status: 'withdrawn',
    details: 'Premium fuel',
  },
  {
    id: '8',
    customerName: 'REAL ESTATE ACTIVITIES',
    date: 'February 29, 2012',
    invoiceId: 'Petrol 2 Liters + Groceries',
    amount: '$250',
    status: 'received',
    details: 'Corporate account',
  },
  {
    id: '9',
    customerName: 'JANE SMITH',
    date: 'February 29, 2012',
    invoiceId: 'Petrol 2 Liters',
    amount: '$250',
    status: 'withdrawn',
    details: 'Regular transaction',
  },
];

const paymentMethods: PaymentMethod[] = [
  {
    type: 'mastercard',
    name: 'MasterCard',
    lastFour: '3478',
    icon: '/mastercard.svg',
  },
  {
    type: 'paypal',
    name: 'Paypal',
    lastFour: '4472',
    icon: '/paypal.svg',
  },
  {
    type: 'applepay',
    name: 'Apple Pay',
    lastFour: '4472',
    icon: '/applepay.svg',
  },
];

const EarningsTransactions: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [timeFilter, setTimeFilter] = useState('Last Month');
  const { toast } = useToast();

  const handleWithdraw = () => {
    toast({
      title: 'Withdrawal Initiated',
      description: 'Your withdrawal request has been submitted successfully.',
=======
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
>>>>>>> fc50f12d78601307538b9c65c6925970812ed209
      duration: 3000,
    });
  };

<<<<<<< HEAD
  const handleAddPaymentMethod = () => {
    toast({
      title: 'Add Payment Method',
      description: 'This feature will be available soon.',
      duration: 3000,
    });
  };

  const handleExport = () => {
    toast({
      title: 'Export Started',
      description: 'Your transaction data is being exported.',
      duration: 3000,
    });
  };

  // Render trend line for earning cards
  const renderTrendLine = (trend: 'up' | 'down' | 'stable') => {
    if (trend === 'up') {
      return (
        <svg width="100" height="30" viewBox="0 0 100 30" className="text-green-500">
          <path
            d="M0 20 L10 15 L20 25 L30 10 L40 5 L50 15 L60 5 L70 10 L80 5 L90 0 L100 5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      );
    } else if (trend === 'down') {
      return (
        <svg width="100" height="30" viewBox="0 0 100 30" className="text-red-500">
          <path
            d="M0 5 L10 10 L20 5 L30 15 L40 20 L50 10 L60 25 L70 20 L80 25 L90 30 L100 25"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      );
    } else {
      return (
        <svg width="100" height="30" viewBox="0 0 100 30" className="text-yellow-500">
          <path
            d="M0 15 L10 15 L20 15 L30 15 L40 15 L50 15 L60 15 L70 15 L80 15 L90 15 L100 15"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      );
    }
  };

  return (
    <DashboardLayout title="Earnings & Transactions">
      <div className="p-4 md:p-6 space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl md:text-2xl font-bold">Earning and Transition</h2>
          <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">Stay on Top of Your Earnings and Payouts</p>
        </div>

        {/* Earning Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {earningCards.map((card, index) => (
            <Card key={index} className="bg-white dark:bg-gray-800">
              <CardHeader className="pb-2 p-4">
                <CardTitle className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  {card.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xl md:text-2xl font-bold">{card.amount}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {card.transactions} Transitions
                    </p>
                  </div>
                  <div className="w-20 md:w-24 h-10">{renderTrendLine(card.trend)}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Bank Card */}
          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="p-0">
              <div className="bg-green-500 text-white p-4 md:p-6 rounded-t-lg space-y-4 md:space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <p className="text-sm font-medium">BANK NAME</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-xs">Available Balance:</p>
                    <p className="text-lg md:text-xl font-bold">$ 7,284.00</p>
                  </div>
                </div>
                <div>
                  <p className="text-lg md:text-xl tracking-widest break-all">5000 0000 0000 0000</p>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs">Expire</p>
                    <p className="text-sm">10/28</p>
                  </div>
                  <div>
                    <p className="text-xs">CVV Code</p>
                    <p className="text-sm">10/28</p>
                  </div>
                </div>
              </div>
              <div className="p-4 md:p-6 space-y-4">
                <p className="text-base md:text-lg font-medium">Withdraw to</p>
                <div className="grid grid-cols-3 gap-2 md:gap-4">
                  <Button variant="outline" className="flex flex-col items-center justify-center h-16 md:h-20 p-2">
                    <img src="/paypal.svg" alt="PayPal" className="h-4 md:h-6 mb-1 md:mb-2" />
                    <span className="text-[10px] md:text-xs">Paypal</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col items-center justify-center h-16 md:h-20 p-2">
                    <img src="/visa-mastercard.svg" alt="Credit Card" className="h-4 md:h-6 mb-1 md:mb-2" />
                    <span className="text-[10px] md:text-xs">Credit card</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col items-center justify-center h-16 md:h-20 p-2">
                    <img src="/apple-pay.svg" alt="Apple Pay" className="h-4 md:h-6 mb-1 md:mb-2" />
                    <span className="text-[10px] md:text-xs">Apple Pay</span>
                  </Button>
                </div>
                <Button className="w-full bg-green-500 hover:bg-green-600" onClick={handleWithdraw}>
                  Withdraw Now
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Attached Credit Card */}
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader className="flex flex-row items-center justify-between p-4 md:p-6">
              <div>
                <CardTitle className="text-base md:text-lg">Attached Credit Card</CardTitle>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View All</DropdownMenuItem>
                  <DropdownMenuItem>Manage Cards</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent className="space-y-3 md:space-y-4 p-4 md:p-6">
              {paymentMethods.map((method, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 md:p-4 border rounded-lg"
                >
                  <div className="flex items-center">
                    <img src={method.icon} alt={method.name} className="h-6 md:h-8 w-6 md:w-8 mr-3 md:mr-4" />
                    <div>
                      <p className="text-sm md:text-base font-medium">{method.name}</p>
                      <p className="text-[10px] md:text-xs text-gray-500">**** **** **** {method.lastFour}</p>
                    </div>
                  </div>
                  <img
                    src={`/${method.type === 'mastercard' ? 'mastercard' : method.type === 'paypal' ? 'paypal' : 'applepay'}-logo.svg`}
                    alt={`${method.name} Logo`}
                    className="h-6 md:h-8"
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="transactions" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="earning">Earning</TabsTrigger>
          </TabsList>
          <TabsContent value="transactions">
            <div className="bg-white p-4 md:p-6 rounded-lg border border-gray-200 mb-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-gray-200 dark:bg-gray-800">
                    <TableRow>
                      <TableHead className="w-[100px]">ID</TableHead>
                      <TableHead>Customer Name</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Invoice ID</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-medium">{transaction.id}</TableCell>
                        <TableCell>{transaction.customerName}</TableCell>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell>{transaction.invoiceId}</TableCell>
                        <TableCell>{transaction.amount}</TableCell>
                        <TableCell>{transaction.status}</TableCell>
                        <TableCell>{transaction.details}</TableCell>
=======
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
>>>>>>> fc50f12d78601307538b9c65c6925970812ed209
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
<<<<<<< HEAD
            </div>
          </TabsContent>
          <TabsContent value="earning">
            {/* Earning Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {earningCards.map((card, index) => (
                <Card key={index} className="bg-white dark:bg-gray-800">
                  <CardHeader className="pb-2 p-4">
                    <CardTitle className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                      {card.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 md:p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xl md:text-2xl font-bold">{card.amount}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {card.transactions} Transitions
                        </p>
                      </div>
                      <div className="w-20 md:w-24 h-10">{renderTrendLine(card.trend)}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
=======
              
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
>>>>>>> fc50f12d78601307538b9c65c6925970812ed209
    </DashboardLayout>
  );
};

export default EarningsTransactions;
