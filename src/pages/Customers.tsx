
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, UserPlus, Download, Filter, 
  Trash2, Edit, MoreVertical, Calendar,
  MessageCircle, Phone
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  Card,
  CardContent,
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

// Sample customer data
const customersData = [
  { 
    id: 1, 
    name: 'John Smith', 
    email: 'john.smith@example.com', 
    phone: '(901) 555-1234', 
    totalSpent: 1245.50, 
    lastVisit: '2023-07-01', 
    status: 'Active',
    visits: 12,
    loyaltyPoints: 450,
    preferredFuel: 'Premium',
    avatar: '/lovable-uploads/86c52672-6ac1-4afa-b99f-d1f6c2a23319.png'
  },
  { 
    id: 2, 
    name: 'Sarah Johnson', 
    email: 'sarah.j@example.com', 
    phone: '(901) 555-2345', 
    totalSpent: 875.25, 
    lastVisit: '2023-07-03', 
    status: 'Active',
    visits: 8,
    loyaltyPoints: 320,
    preferredFuel: 'Regular',
    avatar: '/lovable-uploads/86c52672-6ac1-4afa-b99f-d1f6c2a23319.png'
  },
  { 
    id: 3, 
    name: 'Michael Brown', 
    email: 'michael.b@example.com', 
    phone: '(901) 555-3456', 
    totalSpent: 2150.00, 
    lastVisit: '2023-06-28', 
    status: 'Active',
    visits: 15,
    loyaltyPoints: 680,
    preferredFuel: 'Diesel',
    avatar: '/lovable-uploads/86c52672-6ac1-4afa-b99f-d1f6c2a23319.png'
  },
  { 
    id: 4, 
    name: 'Emma Wilson', 
    email: 'emma.w@example.com', 
    phone: '(901) 555-4567', 
    totalSpent: 950.75, 
    lastVisit: '2023-07-02', 
    status: 'Active',
    visits: 10,
    loyaltyPoints: 380,
    preferredFuel: 'Regular',
    avatar: '/lovable-uploads/86c52672-6ac1-4afa-b99f-d1f6c2a23319.png'
  },
  { 
    id: 5, 
    name: 'David Miller', 
    email: 'david.m@example.com', 
    phone: '(901) 555-5678', 
    totalSpent: 1620.30, 
    lastVisit: '2023-06-15', 
    status: 'Inactive',
    visits: 20,
    loyaltyPoints: 520,
    preferredFuel: 'Premium',
    avatar: '/lovable-uploads/86c52672-6ac1-4afa-b99f-d1f6c2a23319.png'
  },
  { 
    id: 6, 
    name: 'Lisa Taylor', 
    email: 'lisa.t@example.com', 
    phone: '(901) 555-6789', 
    totalSpent: 750.00, 
    lastVisit: '2023-07-01', 
    status: 'Active',
    visits: 7,
    loyaltyPoints: 280,
    preferredFuel: 'Regular',
    avatar: '/lovable-uploads/86c52672-6ac1-4afa-b99f-d1f6c2a23319.png'
  },
  { 
    id: 7, 
    name: 'James Anderson', 
    email: 'james.a@example.com', 
    phone: '(901) 555-7890', 
    totalSpent: 2430.50, 
    lastVisit: '2023-06-20', 
    status: 'Active',
    visits: 25,
    loyaltyPoints: 780,
    preferredFuel: 'Diesel',
    avatar: '/lovable-uploads/86c52672-6ac1-4afa-b99f-d1f6c2a23319.png'
  },
  { 
    id: 8, 
    name: 'Jennifer Martin', 
    email: 'jennifer.m@example.com', 
    phone: '(901) 555-8901', 
    totalSpent: 1120.75, 
    lastVisit: '2023-07-03', 
    status: 'Active',
    visits: 12,
    loyaltyPoints: 420,
    preferredFuel: 'Premium',
    avatar: '/lovable-uploads/86c52672-6ac1-4afa-b99f-d1f6c2a23319.png'
  }
];

const Customers = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [customers, setCustomers] = useState(customersData);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Filtered customers based on search and filter
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = 
      statusFilter === 'all' || 
      customer.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesFilter;
  });

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: "Customers Loaded",
        description: "Customer data has been updated",
        duration: 3000,
      });
    }, 1500);
    
    // Simulate real-time customer activity
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * customers.length);
      const randomAmount = (Math.random() * 100).toFixed(2);
      
      toast({
        title: "Customer Activity",
        description: `${customers[randomIndex].name} just made a purchase of $${randomAmount}`,
        duration: 3000,
      });
    }, 45000); // Every 45 seconds
    
    return () => clearInterval(interval);
  }, [toast, customers]);

  const handleAddCustomer = () => {
    setSelectedCustomer(null);
    setShowCustomerForm(true);
  };

  const handleEditCustomer = (customer) => {
    setSelectedCustomer(customer);
    setShowCustomerForm(true);
  };

  const handleDeleteCustomer = (customer) => {
    setSelectedCustomer(customer);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (selectedCustomer) {
      setCustomers(customers.filter(c => c.id !== selectedCustomer.id));
      
      toast({
        title: "Customer Deleted",
        description: `${selectedCustomer.name} has been removed from the system`,
        duration: 3000,
      });
      
      setShowDeleteConfirm(false);
      setSelectedCustomer(null);
    }
  };

  const handleSaveCustomer = (e) => {
    e.preventDefault();
    
    // Simulate saving customer data
    if (selectedCustomer) {
      toast({
        title: "Customer Updated",
        description: `${selectedCustomer.name}'s information has been updated`,
        duration: 3000,
      });
    } else {
      toast({
        title: "Customer Added",
        description: "New customer has been added to the system",
        duration: 3000,
      });
    }
    
    setShowCustomerForm(false);
  };

  const handleContact = (customer, method) => {
    toast({
      title: `Contacting ${customer.name}`,
      description: method === 'email' 
        ? `Opening email to ${customer.email}` 
        : method === 'sms' 
        ? `Opening SMS to ${customer.phone}` 
        : `Calling ${customer.phone}`,
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
            <h2 className="text-2xl font-bold mb-1">Customer Management</h2>
            <p className="text-gray-500">Manage your customers and their purchase history</p>
          </div>
          
          <Button 
            className="bg-green-500 hover:bg-green-600 flex items-center"
            onClick={handleAddCustomer}
          >
            <UserPlus className="mr-2" size={16} />
            Add Customer
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Total Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{customers.length}</div>
              <p className="text-sm text-gray-500 mt-1">
                <span className="text-green-500">+12%</span> from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Active Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {customers.filter(c => c.status === 'Active').length}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                <span className="text-green-500">+5%</span> from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Customer Retention</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">78%</div>
              <p className="text-sm text-gray-500 mt-1">
                <span className="text-green-500">+3%</span> from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Avg. Spend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">$78.50</div>
              <p className="text-sm text-gray-500 mt-1">
                <span className="text-green-500">+8%</span> from last month
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input 
                type="text" 
                placeholder="Search customers..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Select 
                value={statusFilter}
                onValueChange={setStatusFilter}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Customers</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
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
                variant="outline" 
                className="flex items-center"
                onClick={() => {
                  toast({
                    title: "Report Generated",
                    description: "Customer report has been downloaded",
                    duration: 3000,
                  });
                }}
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
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Contact Info</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead>Last Visit</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <img 
                        src={customer.avatar} 
                        alt={customer.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{customer.name}</TableCell>
                    <TableCell>
                      <div>{customer.email}</div>
                      <div className="text-gray-500">{customer.phone}</div>
                    </TableCell>
                    <TableCell className="font-medium">${customer.totalSpent.toFixed(2)}</TableCell>
                    <TableCell>{customer.lastVisit}</TableCell>
                    <TableCell>
                      <span 
                        className={`inline-flex px-2 py-1 text-xs rounded-full ${
                          customer.status === 'Active' 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-red-100 text-red-600'
                        }`}
                      >
                        {customer.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleContact(customer, 'message')}
                        >
                          <MessageCircle size={18} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleContact(customer, 'call')}
                        >
                          <Phone size={18} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleEditCustomer(customer)}
                        >
                          <Edit size={18} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeleteCustomer(customer)}
                        >
                          <Trash2 size={18} className="text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing {filteredCustomers.length} of {customers.length} customers
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm" className="bg-gray-100">1</Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Customer Form Dialog */}
      <Dialog open={showCustomerForm} onOpenChange={setShowCustomerForm}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>{selectedCustomer ? 'Edit Customer' : 'Add New Customer'}</DialogTitle>
            <DialogDescription>
              {selectedCustomer 
                ? 'Update customer information in the system'
                : 'Fill out the form below to add a new customer'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveCustomer}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  defaultValue={selectedCustomer ? selectedCustomer.name : ''}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue={selectedCustomer ? selectedCustomer.email : ''}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input
                  id="phone"
                  defaultValue={selectedCustomer ? selectedCustomer.phone : ''}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select defaultValue={selectedCustomer ? selectedCustomer.status.toLowerCase() : 'active'}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowCustomerForm(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-green-500 hover:bg-green-600">
                {selectedCustomer ? 'Save Changes' : 'Add Customer'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedCustomer?.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );

  return (
    <DashboardLayout title="Customers">
      {content}
    </DashboardLayout>
  );
};

export default Customers;
