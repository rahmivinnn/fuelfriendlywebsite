import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Plus, MoreVertical, CheckCircle, Clock, XCircle, Edit, Trash2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from '@/components/DashboardLayout';

// Mock data for orders
const orders = [
  { 
    id: 'ORD-3845', 
    customer: 'John Smith', 
    vehicle: 'Toyota Camry (ABC-123)', 
    fuelType: 'Petrol',
    quantity: '15 Liters', 
    total: '$45.75', 
    date: '2024-03-30 14:30',
    status: 'Completed',
    paymentMethod: 'Credit Card',
    location: 'Drive-through'
  },
  { 
    id: 'ORD-3844', 
    customer: 'Sarah Williams', 
    vehicle: 'Honda Civic (XYZ-789)', 
    fuelType: 'Diesel',
    quantity: '20 Liters', 
    total: '$61.20', 
    date: '2024-03-30 13:15',
    status: 'In Progress',
    paymentMethod: 'Mobile Payment',
    location: 'Self-Service'
  },
  { 
    id: 'ORD-3843', 
    customer: 'Michael Johnson', 
    vehicle: 'Ford F-150 (DEF-456)', 
    fuelType: 'Premium',
    quantity: '25 Liters', 
    total: '$83.75', 
    date: '2024-03-30 12:45',
    status: 'Completed',
    paymentMethod: 'Cash',
    location: 'Drive-through'
  },
  { 
    id: 'ORD-3842', 
    customer: 'Emily Davis', 
    vehicle: 'Tesla Model 3 (GHI-789)', 
    fuelType: 'Electric Charging',
    quantity: '45 kWh', 
    total: '$22.50', 
    date: '2024-03-30 11:30',
    status: 'Completed',
    paymentMethod: 'Credit Card',
    location: 'Charging Station'
  },
  { 
    id: 'ORD-3841', 
    customer: 'Robert Miller', 
    vehicle: 'BMW X5 (JKL-012)', 
    fuelType: 'Premium',
    quantity: '30 Liters', 
    total: '$100.50', 
    date: '2024-03-30 10:15',
    status: 'Cancelled',
    paymentMethod: 'Credit Card',
    location: 'Drive-through'
  },
  { 
    id: 'ORD-3840', 
    customer: 'Jessica Wilson', 
    vehicle: 'Audi A4 (MNO-345)', 
    fuelType: 'Petrol',
    quantity: '18 Liters', 
    total: '$54.90', 
    date: '2024-03-30 09:00',
    status: 'Completed',
    paymentMethod: 'Mobile Payment',
    location: 'Self-Service'
  },
  { 
    id: 'ORD-3839', 
    customer: 'David Taylor', 
    vehicle: 'Chevrolet Malibu (PQR-678)', 
    fuelType: 'Diesel',
    quantity: '22 Liters', 
    total: '$67.10', 
    date: '2024-03-29 17:45',
    status: 'In Progress',
    paymentMethod: 'Cash',
    location: 'Drive-through'
  },
  { 
    id: 'ORD-3838', 
    customer: 'Jennifer Brown', 
    vehicle: 'Hyundai Tucson (STU-901)', 
    fuelType: 'Petrol',
    quantity: '16 Liters', 
    total: '$48.80', 
    date: '2024-03-29 16:30',
    status: 'Pending',
    paymentMethod: 'Credit Card',
    location: 'Self-Service'
  },
];

const OrdersManagement = () => {
  const { toast } = useToast();
  const [displayOrders, setDisplayOrders] = useState(orders);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: "Orders Loaded",
        description: "Real-time order data has been loaded",
        duration: 3000,
      });
    }, 1500);
    
    // Set up real-time updates simulation
    const updateInterval = setInterval(() => {
      // Randomly change status of an order
      const randomIndex = Math.floor(Math.random() * orders.length);
      const statuses = ['Pending', 'In Progress', 'Completed', 'Cancelled'];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      
      setDisplayOrders(current => {
        const updated = [...current];
        updated[randomIndex] = {
          ...updated[randomIndex],
          status: randomStatus
        };
        return updated;
      });
      
      toast({
        title: "Order Status Updated",
        description: `Order ${orders[randomIndex].id} is now ${randomStatus}`,
        duration: 3000,
      });
    }, 30000); // Every 30 seconds
    
    return () => {
      clearTimeout(timer);
      clearInterval(updateInterval);
    };
  }, [toast]);

  // Handle search
  useEffect(() => {
    if (searchQuery) {
      const filtered = orders.filter(order => 
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.vehicle.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setDisplayOrders(filtered);
    } else {
      setDisplayOrders(orders);
    }
  }, [searchQuery]);

  // Handle filters
  useEffect(() => {
    let filtered = [...orders];
    
    // Apply status filter
    if (statusFilter !== 'All') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }
    
    // Apply date filter
    const now = new Date();
    if (dateFilter === 'Today') {
      const today = now.toISOString().split('T')[0];
      filtered = filtered.filter(order => order.date.includes(today));
    } else if (dateFilter === 'Week') {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      filtered = filtered.filter(order => {
        const orderDate = order.date.split(' ')[0];
        return orderDate >= weekAgo;
      });
    }
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(order => 
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.vehicle.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setDisplayOrders(filtered);
  }, [statusFilter, dateFilter, searchQuery]);

  const refreshOrders = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "Orders Refreshed",
        description: "Order data has been updated with the latest information",
        duration: 3000,
      });
    }, 1500);
  };

  const handleStatusChange = (orderId, newStatus) => {
    setDisplayOrders(current => 
      current.map(order => 
        order.id === orderId ? {...order, status: newStatus} : order
      )
    );
    
    toast({
      title: "Order Status Updated",
      description: `Order ${orderId} status changed to ${newStatus}`,
      duration: 3000,
    });
  };

  const handleEditOrder = (order) => {
    setSelectedOrder(order);
    setIsEditDialogOpen(true);
  };

  const handleDeleteOrder = (order) => {
    setSelectedOrder(order);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteOrder = () => {
    if (selectedOrder) {
      setDisplayOrders(current => 
        current.filter(order => order.id !== selectedOrder.id)
      );
      
      toast({
        title: "Order Deleted",
        description: `Order ${selectedOrder.id} has been deleted successfully`,
        duration: 3000,
      });
      
      setIsDeleteDialogOpen(false);
    }
  };

  const saveOrderChanges = () => {
    if (selectedOrder) {
      setDisplayOrders(current => 
        current.map(order => 
          order.id === selectedOrder.id ? selectedOrder : order
        )
      );
      
      toast({
        title: "Order Updated",
        description: `Order ${selectedOrder.id} has been updated successfully`,
        duration: 3000,
      });
      
      setIsEditDialogOpen(false);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-600';
      case 'In Progress':
        return 'bg-blue-100 text-blue-600';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-600';
      case 'Cancelled':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="w-4 h-4 mr-1" />;
      case 'In Progress':
        return <Clock className="w-4 h-4 mr-1" />;
      case 'Pending':
        return <Clock className="w-4 h-4 mr-1" />;
      case 'Cancelled':
        return <XCircle className="w-4 h-4 mr-1" />;
      default:
        return null;
    }
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
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-1">Orders Management</h2>
            <p className="text-gray-500">View and manage customer orders in real-time</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Button 
              onClick={refreshOrders}
              disabled={isRefreshing}
              className="bg-green-500 hover:bg-green-600"
            >
              {isRefreshing ? "Refreshing..." : "Refresh Orders"}
            </Button>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-blue-500 hover:bg-blue-600">
                  <Plus className="mr-1 h-4 w-4" /> New Order
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Order</DialogTitle>
                  <DialogDescription>
                    Fill in the details to create a new order
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right">Customer</label>
                    <Input className="col-span-3" placeholder="Customer name" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right">Vehicle</label>
                    <Input className="col-span-3" placeholder="Vehicle details" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right">Fuel Type</label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select fuel type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="petrol">Petrol</SelectItem>
                        <SelectItem value="diesel">Diesel</SelectItem>
                        <SelectItem value="premium">Premium</SelectItem>
                        <SelectItem value="electric">Electric Charging</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right">Quantity</label>
                    <Input className="col-span-3" placeholder="Quantity" type="number" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={() => {
                    toast({
                      title: "Order Created",
                      description: "New order has been created successfully",
                      duration: 3000,
                    });
                  }}>Create Order</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center mb-6 gap-4">
            <div className="relative flex-1">
              <Input 
                placeholder="Search by order ID, customer, or vehicle..." 
                className="pl-10"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
            
            <div className="flex gap-2 flex-wrap">
              <div className="flex items-center">
                <label className="mr-2 text-sm font-medium">Status:</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center">
                <label className="mr-2 text-sm font-medium">Date:</label>
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Time</SelectItem>
                    <SelectItem value="Today">Today</SelectItem>
                    <SelectItem value="Week">This Week</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button variant="outline" className="flex items-center gap-1">
                <Filter className="h-4 w-4" />
                More Filters
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Orders</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="inprogress">In Progress</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead className="hidden md:table-cell">Vehicle</TableHead>
                      <TableHead>Fuel Details</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead className="hidden lg:table-cell">Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {displayOrders.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                          No orders found matching your filters
                        </TableCell>
                      </TableRow>
                    ) : (
                      displayOrders.map((order, index) => (
                        <TableRow 
                          key={order.id}
                          className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 transition-colors`}
                        >
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{order.customer}</TableCell>
                          <TableCell className="hidden md:table-cell">{order.vehicle}</TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span>{order.fuelType}</span>
                              <span className="text-gray-500 text-sm">{order.quantity}</span>
                            </div>
                          </TableCell>
                          <TableCell className="font-semibold">{order.total}</TableCell>
                          <TableCell className="hidden lg:table-cell">{order.date}</TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(order.status)}`}>
                              {getStatusIcon(order.status)}
                              {order.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical size={16} />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleEditOrder(order)}>
                                  <Edit className="w-4 h-4 mr-2" /> Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-red-600"
                                  onClick={() => handleDeleteOrder(order)}
                                >
                                  <Trash2 className="w-4 h-4 mr-2" /> Delete
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleStatusChange(order.id, 'Completed')}
                                  disabled={order.status === 'Completed'}
                                >
                                  <CheckCircle className="w-4 h-4 mr-2" /> Mark as Completed
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleStatusChange(order.id, 'In Progress')}
                                  disabled={order.status === 'In Progress'}
                                >
                                  <Clock className="w-4 h-4 mr-2" /> Mark as In Progress
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleStatusChange(order.id, 'Cancelled')}
                                  disabled={order.status === 'Cancelled'}
                                >
                                  <XCircle className="w-4 h-4 mr-2" /> Cancel Order
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            {/* Other tab contents would show filtered data */}
            <TabsContent value="pending">
              {/* Similar table with pending orders only */}
            </TabsContent>
            <TabsContent value="inprogress">
              {/* Similar table with in progress orders only */}
            </TabsContent>
            <TabsContent value="completed">
              {/* Similar table with completed orders only */}
            </TabsContent>
            <TabsContent value="cancelled">
              {/* Similar table with cancelled orders only */}
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Edit Order Dialog */}
        {selectedOrder && (
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Order {selectedOrder.id}</DialogTitle>
                <DialogDescription>
                  Make changes to the order details
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right">Customer</label>
                  <Input 
                    className="col-span-3" 
                    value={selectedOrder.customer}
                    onChange={(e) => setSelectedOrder({...selectedOrder, customer: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right">Vehicle</label>
                  <Input 
                    className="col-span-3" 
                    value={selectedOrder.vehicle}
                    onChange={(e) => setSelectedOrder({...selectedOrder, vehicle: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right">Fuel Type</label>
                  <Select 
                    value={selectedOrder.fuelType.toLowerCase()}
                    onValueChange={(value) => setSelectedOrder({...selectedOrder, fuelType: value.charAt(0).toUpperCase() + value.slice(1)})}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="petrol">Petrol</SelectItem>
                      <SelectItem value="diesel">Diesel</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                      <SelectItem value="electric charging">Electric Charging</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right">Quantity</label>
                  <Input 
                    className="col-span-3" 
                    value={selectedOrder.quantity.split(' ')[0]}
                    onChange={(e) => setSelectedOrder({...selectedOrder, quantity: `${e.target.value} Liters`})}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right">Total</label>
                  <Input 
                    className="col-span-3" 
                    value={selectedOrder.total.substring(1)}
                    onChange={(e) => setSelectedOrder({...selectedOrder, total: `$${e.target.value}`})}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right">Status</label>
                  <Select 
                    value={selectedOrder.status.toLowerCase().replace(' ', '')}
                    onValueChange={(value) => {
                      const formattedValue = value === 'inprogress' ? 'In Progress' : value.charAt(0).toUpperCase() + value.slice(1);
                      setSelectedOrder({...selectedOrder, status: formattedValue});
                    }}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="inprogress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
                <Button onClick={saveOrderChanges}>Save Changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
        
        {/* Delete Order Dialog */}
        {selectedOrder && (
          <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete order {selectedOrder.id}? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
                <Button variant="destructive" onClick={confirmDeleteOrder}>Delete</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </motion.div>
    </div>
  );

  return (
    <DashboardLayout title="Orders">
      {content}
    </DashboardLayout>
  );
};

export default OrdersManagement;
