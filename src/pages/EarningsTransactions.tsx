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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

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
      duration: 3000,
    });
  };

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
    <DashboardLayout title="Earning and Transition">
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Earning and Transition</h2>
          <p className="text-gray-500 dark:text-gray-400">Stay on Top of Your Earnings and Payouts</p>
        </div>

        {/* Earning Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {earningCards.map((card, index) => (
            <Card key={index} className="bg-white dark:bg-gray-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  {card.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-2xl font-bold">{card.amount}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {card.transactions} Transitions
                    </p>
                  </div>
                  <div className="w-24 h-10">{renderTrendLine(card.trend)}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Bank Card */}
          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="p-0">
              <div className="bg-green-500 text-white p-6 rounded-t-lg">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <p className="text-sm font-medium mb-1">BANK NAME</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs mb-1">Available Balance:</p>
                    <p className="text-xl font-bold">$ 7,284.00</p>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="text-xl tracking-widest">5000 0000 0000 0000</p>
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
              <div className="p-6">
                <p className="text-lg font-medium mb-4">Withdraw to</p>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <Button variant="outline" className="flex flex-col items-center justify-center h-20">
                    <img src="/paypal.svg" alt="PayPal" className="h-6 mb-2" />
                    <span className="text-xs">Paypal</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col items-center justify-center h-20">
                    <img src="/visa-mastercard.svg" alt="Credit Card" className="h-6 mb-2" />
                    <span className="text-xs">Credit card</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col items-center justify-center h-20">
                    <img src="/apple-pay.svg" alt="Apple Pay" className="h-6 mb-2" />
                    <span className="text-xs">Apple Pay</span>
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
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Attached Credit Card</CardTitle>
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
            <CardContent className="space-y-4">
              {paymentMethods.map((method, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center">
                    <img src={method.icon} alt={method.name} className="h-8 w-8 mr-4" />
                    <div>
                      <p className="font-medium">{method.name}</p>
                      <p className="text-xs text-gray-500">**** **** **** {method.lastFour}</p>
                    </div>
                  </div>
                  <img
                    src={`/${method.type === 'mastercard' ? 'mastercard' : method.type === 'paypal' ? 'paypal' : 'applepay'}-logo.svg`}
                    alt={`${method.name} Logo`}
                    className="h-8"
                  />
                </div>
              ))}
              <Button
                className="w-full bg-green-500 hover:bg-green-600"
                onClick={handleAddPaymentMethod}
              >
                Add Now
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Transactions */}
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center">
              <CardTitle>Transactions</CardTitle>
            </div>
            <div className="flex items-center space-x-2">
              <Select value={timeFilter} onValueChange={setTimeFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select time period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Today">Today</SelectItem>
                  <SelectItem value="This Week">This Week</SelectItem>
                  <SelectItem value="Last Month">Last Month</SelectItem>
                  <SelectItem value="Last 3 Months">Last 3 Months</SelectItem>
                  <SelectItem value="This Year">This Year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={handleExport}>
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer Name</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Invoice ID</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">{transaction.customerName}</TableCell>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.invoiceId}</TableCell>
                    <TableCell>{transaction.amount}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          transaction.status === 'received'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                        }
                      >
                        {transaction.status === 'received' ? 'Received' : 'Withdraw'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Download Invoice</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">Report Issue</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <Button variant="outline" size="sm" onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, '...', 8, 9, 10].map((page, i) => (
                <Button
                  key={i}
                  variant={currentPage === page ? 'default' : 'outline'}
                  size="sm"
                  className={`w-9 ${typeof page === 'string' ? 'cursor-default' : ''}`}
                  onClick={() => typeof page === 'number' && setCurrentPage(page)}
                  disabled={typeof page === 'string'}
                >
                  {page}
                </Button>
              ))}
            </div>
            <Button variant="outline" size="sm" onClick={() => setCurrentPage(currentPage + 1)}>
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default EarningsTransactions;
