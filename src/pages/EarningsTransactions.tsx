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
              <CardContent className="p-4">
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
      </div>
    </DashboardLayout>
  );
};

export default EarningsTransactions;
