
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Bell, ChevronDown, 
  Grid, ShoppingBag, Package, Building2, 
  PieChart, Bell as BellIcon, HelpCircle, Settings,
  LogOut, Plus, FileUp, MoreVertical, ChevronLeft, ChevronRight
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Link } from 'react-router-dom';

const sidebarItems = [
  { icon: Grid, label: 'Dashboard', active: false, path: '/station-dashboard' },
  { icon: ShoppingBag, label: 'Orders', active: false, path: '/station-dashboard/orders' },
  { icon: Package, label: 'Products Management', active: true, path: '/station-dashboard/products' },
  { icon: Building2, label: 'Station Management', active: false, path: '/station-dashboard/station' },
  { icon: PieChart, label: 'Earnings & Transactions', active: false, path: '/station-dashboard/earnings' },
  { icon: BellIcon, label: 'Notifications', active: false, path: '/station-dashboard/notifications' },
  { icon: HelpCircle, label: 'Help & Support', active: false, path: '/station-dashboard/support' },
  { icon: Settings, label: 'Settings', active: false, path: '/station-dashboard/settings' },
];

const mockProducts = [
  { id: 1, image: "/lovable-uploads/dfec04ad-bf5c-435a-8d25-46dde4060a5d.png", name: "Standard Petrol", category: "Fuel", price: "$1.25", stock: "10000L", status: "In Stock" },
  { id: 2, image: "/lovable-uploads/dfec04ad-bf5c-435a-8d25-46dde4060a5d.png", name: "Premium Petrol", category: "Fuel", price: "$1.89", stock: "8500L", status: "In Stock" },
  { id: 3, image: "/lovable-uploads/dfec04ad-bf5c-435a-8d25-46dde4060a5d.png", name: "Diesel", category: "Fuel", price: "$1.45", stock: "12000L", status: "In Stock" },
  { id: 4, image: "/lovable-uploads/dfec04ad-bf5c-435a-8d25-46dde4060a5d.png", name: "Engine Oil", category: "Automotive", price: "$24.99", stock: "120 units", status: "Low Stock" },
  { id: 5, image: "/lovable-uploads/dfec04ad-bf5c-435a-8d25-46dde4060a5d.png", name: "Bottled Water", category: "Grocery", price: "$1.99", stock: "75 units", status: "In Stock" },
  { id: 6, image: "/lovable-uploads/dfec04ad-bf5c-435a-8d25-46dde4060a5d.png", name: "Cookies", category: "Grocery", price: "$3.49", stock: "42 units", status: "In Stock" },
  { id: 7, image: "/lovable-uploads/dfec04ad-bf5c-435a-8d25-46dde4060a5d.png", name: "Energy Drink", category: "Grocery", price: "$2.99", stock: "60 units", status: "In Stock" },
  { id: 8, image: "/lovable-uploads/dfec04ad-bf5c-435a-8d25-46dde4060a5d.png", name: "Car Wash", category: "Service", price: "$10.00", stock: "Unlimited", status: "Available" },
  { id: 9, image: "/lovable-uploads/dfec04ad-bf5c-435a-8d25-46dde4060a5d.png", name: "Car Air Freshener", category: "Automotive", price: "$5.99", stock: "28 units", status: "Low Stock" },
  { id: 10, image: "/lovable-uploads/dfec04ad-bf5c-435a-8d25-46dde4060a5d.png", name: "Windshield Washer", category: "Automotive", price: "$8.99", stock: "15 units", status: "Low Stock" },
];

const ProductsManagement = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    const loadData = setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: "Products Loaded",
        description: "Your product inventory is ready to manage",
        duration: 3000,
      });
    }, 1500);
    
    return () => clearTimeout(loadData);
  }, [toast]);

  const handleToggleSelect = (id: number) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter(productId => productId !== id));
    } else {
      setSelectedProducts([...selectedProducts, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(mockProducts.map(product => product.id));
    }
    setSelectAll(!selectAll);
  };

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar */}
      <motion.div 
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="bg-white w-64 border-r border-gray-200 flex flex-col"
      >
        <div className="p-4 border-b border-gray-200">
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/f1f34c25-67df-4603-8eb1-3f1fe84812a4.png" 
              alt="FuelFriendly Logo" 
              className="h-8"
            />
          </Link>
        </div>
        
        <div className="flex-1 p-4 space-y-2 overflow-y-auto">
          {sidebarItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link 
                to={item.path}
                className={`flex items-center p-3 rounded-lg transition-colors hover:bg-gray-100 ${item.active ? 'bg-green-50 text-green-500' : 'text-gray-600'}`}
              >
                <item.icon size={20} className={item.active ? 'text-green-500' : 'text-gray-500'} />
                <span className="ml-3 font-medium text-sm">{item.label}</span>
              </Link>
            </motion.div>
          ))}
        </div>
        
        <div className="p-4 border-t border-gray-200">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            onClick={() => {
              toast({
                title: "Logged Out",
                description: "You have been logged out successfully",
                duration: 3000,
              });
            }}
          >
            <LogOut size={20} className="mr-2" />
            Logout Account
          </Button>
        </div>
      </motion.div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Nav */}
        <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold"
          >
            Products Management
          </motion.h1>
          
          <div className="flex items-center space-x-4">
            <div className="relative w-64">
              <Input 
                type="text" 
                placeholder="Search here" 
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
            
            <Button variant="ghost" className="relative">
              <Bell />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </Button>
            
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/86c52672-6ac1-4afa-b99f-d1f6c2a23319.png" 
                alt="User" 
                className="w-8 h-8 rounded-full object-cover"
              />
            </div>
          </div>
        </header>
        
        {/* Products Content */}
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <motion.div 
              className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-6">
            <AnimatePresence>
              {showAddProduct ? (
                <motion.div 
                  className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div 
                    className="bg-white rounded-lg w-full max-w-2xl"
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                  >
                    <div className="p-6">
                      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
                      
                      <p className="mb-4">Enter product details to add it to your station's inventory.</p>
                      
                      <div className="space-y-6">
                        <div className="flex space-x-4 items-center">
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center space-x-2">
                              <div className="h-4 w-4 rounded-full border-2 border-green-500 flex items-center justify-center">
                                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                              </div>
                              <span>Fuel</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <div className="h-4 w-4 rounded-full border-2 border-gray-300"></div>
                            <span>Grocery Items</span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Fuel type</label>
                            <div className="relative">
                              <select className="w-full border border-gray-300 rounded-md px-4 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-green-500">
                                <option>Petrol</option>
                                <option>Diesel</option>
                                <option>Premium Petrol</option>
                              </select>
                              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">1 Liter Price</label>
                            <Input type="text" placeholder="$00.00" />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Product Description</label>
                          <textarea 
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                            rows={4}
                            placeholder="Add description"
                          ></textarea>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
                          <div className="border border-dashed border-gray-300 rounded-md p-10 flex flex-col items-center justify-center text-center">
                            <div className="mb-4 bg-green-50 p-4 rounded-full">
                              <FileUp className="text-green-500" size={24} />
                            </div>
                            <p className="font-medium text-gray-900">Upload Image from file</p>
                            <p className="text-xs text-gray-500 mt-2">Recommended dimension 500x500 pixels and Max file size 5MB.</p>
                            <input type="file" className="hidden" id="file-upload" />
                            <label htmlFor="file-upload" className="mt-4 bg-gray-100 text-gray-700 py-2 px-4 rounded-md cursor-pointer hover:bg-gray-200 transition-colors">
                              Choose File
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end bg-gray-50 p-4 rounded-b-lg border-t border-gray-200">
                      <Button 
                        variant="outline" 
                        className="mr-2"
                        onClick={() => setShowAddProduct(false)}
                      >
                        Cancel
                      </Button>
                      <Button 
                        className="bg-green-500 hover:bg-green-600"
                        onClick={() => {
                          setShowAddProduct(false);
                          toast({
                            title: "Product Added",
                            description: "New product has been added successfully",
                            duration: 3000,
                          });
                        }}
                      >
                        Add Product
                      </Button>
                    </div>
                  </motion.div>
                </motion.div>
              ) : null}
            </AnimatePresence>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="flex flex-col space-y-2">
                <h2 className="text-xl font-bold">Products Management</h2>
                <p className="text-gray-500">Simplify Product Management for Better Sales</p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <div className="flex items-center">
                  <Package className="text-green-500 mr-2" size={20} />
                  <h3 className="font-bold">All Products</h3>
                </div>
                
                <Button 
                  className="bg-green-500 hover:bg-green-600"
                  onClick={() => setShowAddProduct(true)}
                >
                  <Plus size={18} className="mr-1" />
                  Add Product
                </Button>
              </div>
              
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">
                        <div className="flex items-center justify-center">
                          <input 
                            type="checkbox" 
                            className="h-4 w-4 rounded border-gray-300 text-green-500 focus:ring-green-500"
                            checked={selectAll}
                            onChange={handleSelectAll}
                          />
                        </div>
                      </TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div className="flex items-center justify-center">
                            <input 
                              type="checkbox" 
                              className="h-4 w-4 rounded border-gray-300 text-green-500 focus:ring-green-500"
                              checked={selectedProducts.includes(product.id)}
                              onChange={() => handleToggleSelect(product.id)}
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 rounded-md bg-gray-100 overflow-hidden">
                              <img 
                                src={product.image} 
                                alt={product.name} 
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <span className="font-medium">{product.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>{product.price}</TableCell>
                        <TableCell>{product.stock}</TableCell>
                        <TableCell>
                          <span 
                            className={`inline-flex px-2 py-1 text-xs rounded-full ${
                              product.status === 'In Stock' 
                                ? 'bg-green-100 text-green-600' 
                                : product.status === 'Low Stock'
                                ? 'bg-yellow-100 text-yellow-600'
                                : 'bg-blue-100 text-blue-600'
                            }`}
                          >
                            {product.status}
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
              
              <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
                <Button variant="outline" className="text-sm">
                  <ChevronLeft size={16} className="mr-1" />
                  Previous
                </Button>
                
                <div className="flex items-center space-x-1">
                  <Button variant="outline" className="h-8 w-8 p-0 bg-green-50 text-green-500 border-green-200">1</Button>
                  <Button variant="outline" className="h-8 w-8 p-0">2</Button>
                  <Button variant="outline" className="h-8 w-8 p-0">3</Button>
                  <span className="mx-1">...</span>
                  <Button variant="outline" className="h-8 w-8 p-0">8</Button>
                  <Button variant="outline" className="h-8 w-8 p-0">9</Button>
                  <Button variant="outline" className="h-8 w-8 p-0">10</Button>
                </div>
                
                <Button variant="outline" className="text-sm">
                  Next
                  <ChevronRight size={16} className="ml-1" />
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsManagement;
