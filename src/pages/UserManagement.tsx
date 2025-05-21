import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AdminDashboardLayout from '@/components/AdminDashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { 
  Users, Search, Filter, MoreHorizontal, Shield, ShieldAlert, 
  ShieldCheck, UserCog, Edit, Trash2, UserPlus, CheckCircle, 
  XCircle, ArrowUpDown
} from 'lucide-react';
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

// Mock user data
const generateMockUsers = () => {
  const roles = [UserRole.Level1, UserRole.Level2, UserRole.Level3, UserRole.SuperiorAdmin];
  const statuses = ['Active', 'Inactive', 'Pending'];
  const names = [
    'John Smith', 'Sarah Johnson', 'Michael Brown', 'Emily Davis', 
    'David Wilson', 'Jessica Taylor', 'Daniel Anderson', 'Jennifer Thomas',
    'Matthew Jackson', 'Amanda White', 'Christopher Harris', 'Ashley Martin',
    'James Thompson', 'Stephanie Garcia', 'Robert Martinez', 'Nicole Robinson',
    'William Clark', 'Elizabeth Rodriguez', 'Joseph Lewis', 'Melissa Lee'
  ];
  
  return Array.from({ length: 20 }, (_, i) => {
    const name = names[i % names.length];
    const email = name.toLowerCase().replace(' ', '.') + '@example.com';
    const role = roles[Math.floor(Math.random() * (roles.length - 1))]; // Less chance for SuperiorAdmin
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const lastLogin = new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString();
    
    return {
      id: `user-${i + 1}`,
      name,
      email,
      role,
      status,
      lastLogin,
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000).toISOString()
    };
  });
};

const UserManagement = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showUserForm, setShowUserForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'ascending' | 'descending';
  } | null>(null);
  
  // Form state for adding/editing users
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: UserRole.Level1.toString(),
    status: 'Active'
  });
  
  // Load mock data
  useEffect(() => {
    const timer = setTimeout(() => {
      const mockUsers = generateMockUsers();
      setUsers(mockUsers);
      setFilteredUsers(mockUsers);
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle search
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredUsers(users);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = users.filter(user => 
        user.name.toLowerCase().includes(query) || 
        user.email.toLowerCase().includes(query)
      );
      setFilteredUsers(filtered);
    }
  }, [searchQuery, users]);
  
  // Handle sorting
  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    
    setSortConfig({ key, direction });
    
    const sortedUsers = [...filteredUsers].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    
    setFilteredUsers(sortedUsers);
  };
  
  // Get sort direction indicator
  const getSortDirectionIndicator = (key: string) => {
    if (!sortConfig || sortConfig.key !== key) {
      return <ArrowUpDown size={14} />;
    }
    
    return sortConfig.direction === 'ascending' 
      ? <ArrowUpDown size={14} className="text-green-500" /> 
      : <ArrowUpDown size={14} className="text-red-500" />;
  };
  
  // Handle edit user
  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role.toString(),
      status: user.status
    });
    setShowUserForm(true);
  };
  
  // Handle delete user
  const handleDeleteUser = (user: any) => {
    setSelectedUser(user);
    setShowDeleteConfirm(true);
  };
  
  // Confirm delete
  const confirmDelete = () => {
    if (selectedUser) {
      setUsers(users.filter(u => u.id !== selectedUser.id));
      setFilteredUsers(filteredUsers.filter(u => u.id !== selectedUser.id));
      
      toast({
        title: "User Deleted",
        description: `${selectedUser.name} has been removed from the system`,
        duration: 3000,
      });
      
      setShowDeleteConfirm(false);
      setSelectedUser(null);
    }
  };
  
  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle select change
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle save user
  const handleSaveUser = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedUser) {
      // Update existing user
      const updatedUsers = users.map(u => 
        u.id === selectedUser.id 
          ? { 
              ...u, 
              name: formData.name, 
              email: formData.email, 
              role: parseInt(formData.role), 
              status: formData.status 
            } 
          : u
      );
      
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
      
      toast({
        title: "User Updated",
        description: `${formData.name}'s information has been updated`,
        duration: 3000,
      });
    } else {
      // Add new user
      const newUser = {
        id: `user-${users.length + 1}`,
        name: formData.name,
        email: formData.email,
        role: parseInt(formData.role),
        status: formData.status,
        lastLogin: 'Never',
        createdAt: new Date().toISOString()
      };
      
      setUsers([newUser, ...users]);
      setFilteredUsers([newUser, ...filteredUsers]);
      
      toast({
        title: "User Added",
        description: `${formData.name} has been added to the system`,
        duration: 3000,
      });
    }
    
    setShowUserForm(false);
    setSelectedUser(null);
  };
  
  // Handle add new user
  const handleAddUser = () => {
    setSelectedUser(null);
    setFormData({
      name: '',
      email: '',
      role: UserRole.Level1.toString(),
      status: 'Active'
    });
    setShowUserForm(true);
  };
  
  // Get role badge
  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case UserRole.Level1:
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 flex items-center">
            <Shield size={12} className="mr-1" />
            Level 1
          </Badge>
        );
      case UserRole.Level2:
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 flex items-center">
            <ShieldCheck size={12} className="mr-1" />
            Level 2
          </Badge>
        );
      case UserRole.Level3:
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 flex items-center">
            <ShieldAlert size={12} className="mr-1" />
            Level 3
          </Badge>
        );
      case UserRole.SuperiorAdmin:
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 flex items-center">
            <UserCog size={12} className="mr-1" />
            Superior Admin
          </Badge>
        );
      default:
        return null;
    }
  };
  
  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center">
            <CheckCircle size={12} className="mr-1" />
            Active
          </Badge>
        );
      case 'Inactive':
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 flex items-center">
            <XCircle size={12} className="mr-1" />
            Inactive
          </Badge>
        );
      case 'Pending':
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 flex items-center">
            <Clock size={12} className="mr-1" />
            Pending
          </Badge>
        );
      default:
        return null;
    }
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    if (dateString === 'Never') return 'Never';
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  return (
    <AdminDashboardLayout title="User Management">
      {isLoading ? (
        <div className="h-full flex items-center justify-center">
          <div className="text-center">
            <motion.div 
              className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full mx-auto"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />
            <p className="mt-4 text-gray-500">Loading user data...</p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center">
                    <Users className="mr-2" />
                    User Management
                  </CardTitle>
                  <CardDescription>
                    Manage user accounts and access levels
                  </CardDescription>
                </div>
                
                <Button 
                  onClick={handleAddUser}
                  className="bg-green-500 hover:bg-green-600"
                  disabled={!user || user.role < UserRole.Level2}
                >
                  <UserPlus size={16} className="mr-2" />
                  Add User
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    placeholder="Search users by name or email..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex items-center">
                  <Button variant="outline" className="flex items-center">
                    <Filter size={16} className="mr-2" />
                    Filter
                  </Button>
                </div>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[250px]">
                        <Button 
                          variant="ghost" 
                          className="flex items-center p-0 h-auto font-medium"
                          onClick={() => requestSort('name')}
                        >
                          Name {getSortDirectionIndicator('name')}
                        </Button>
                      </TableHead>
                      <TableHead>
                        <Button 
                          variant="ghost" 
                          className="flex items-center p-0 h-auto font-medium"
                          onClick={() => requestSort('email')}
                        >
                          Email {getSortDirectionIndicator('email')}
                        </Button>
                      </TableHead>
                      <TableHead>
                        <Button 
                          variant="ghost" 
                          className="flex items-center p-0 h-auto font-medium"
                          onClick={() => requestSort('role')}
                        >
                          Role {getSortDirectionIndicator('role')}
                        </Button>
                      </TableHead>
                      <TableHead>
                        <Button 
                          variant="ghost" 
                          className="flex items-center p-0 h-auto font-medium"
                          onClick={() => requestSort('status')}
                        >
                          Status {getSortDirectionIndicator('status')}
                        </Button>
                      </TableHead>
                      <TableHead>
                        <Button 
                          variant="ghost" 
                          className="flex items-center p-0 h-auto font-medium"
                          onClick={() => requestSort('lastLogin')}
                        >
                          Last Login {getSortDirectionIndicator('lastLogin')}
                        </Button>
                      </TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                          No users found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{getRoleBadge(user.role)}</TableCell>
                          <TableCell>{getStatusBadge(user.status)}</TableCell>
                          <TableCell>{formatDate(user.lastLogin)}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal size={16} />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => handleEditUser(user)}>
                                  <Edit size={14} className="mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => handleDeleteUser(user)}
                                  className="text-red-600"
                                  disabled={!user || user.role < UserRole.Level3}
                                >
                                  <Trash2 size={14} className="mr-2" />
                                  Delete
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
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-gray-500">
                Showing {filteredUsers.length} of {users.length} users
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Next
                </Button>
              </div>
            </CardFooter>
          </Card>
          
          {/* User Form Dialog */}
          <Dialog open={showUserForm} onOpenChange={setShowUserForm}>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>{selectedUser ? 'Edit User' : 'Add New User'}</DialogTitle>
                <DialogDescription>
                  {selectedUser 
                    ? 'Update user information and access level'
                    : 'Fill out the form below to add a new user'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSaveUser}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="role" className="text-right">
                      Role
                    </Label>
                    <Select 
                      value={formData.role} 
                      onValueChange={(value) => handleSelectChange('role', value)}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={UserRole.Level1.toString()}>
                          <div className="flex items-center">
                            <Shield className="h-4 w-4 mr-2 text-blue-500" />
                            Level 1 - Basic Access
                          </div>
                        </SelectItem>
                        <SelectItem value={UserRole.Level2.toString()}>
                          <div className="flex items-center">
                            <ShieldCheck className="h-4 w-4 mr-2 text-purple-500" />
                            Level 2 - Extended Access
                          </div>
                        </SelectItem>
                        <SelectItem value={UserRole.Level3.toString()}>
                          <div className="flex items-center">
                            <ShieldAlert className="h-4 w-4 mr-2 text-amber-500" />
                            Level 3 - Advanced Access
                          </div>
                        </SelectItem>
                        {user && user.role === UserRole.SuperiorAdmin && (
                          <SelectItem value={UserRole.SuperiorAdmin.toString()}>
                            <div className="flex items-center">
                              <UserCog className="h-4 w-4 mr-2 text-red-500" />
                              Superior Admin
                            </div>
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="status" className="text-right">
                      Status
                    </Label>
                    <Select 
                      value={formData.status} 
                      onValueChange={(value) => handleSelectChange('status', value)}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">
                          <div className="flex items-center">
                            <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                            Active
                          </div>
                        </SelectItem>
                        <SelectItem value="Inactive">
                          <div className="flex items-center">
                            <XCircle className="h-4 w-4 mr-2 text-gray-500" />
                            Inactive
                          </div>
                        </SelectItem>
                        <SelectItem value="Pending">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-yellow-500" />
                            Pending
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setShowUserForm(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-green-500 hover:bg-green-600">
                    {selectedUser ? 'Update User' : 'Add User'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          
          {/* Delete Confirmation Dialog */}
          <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this user? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              {selectedUser && (
                <div className="py-4">
                  <div className="flex items-center p-4 border rounded-lg bg-gray-50">
                    <div>
                      <p className="font-medium">{selectedUser.name}</p>
                      <p className="text-sm text-gray-500">{selectedUser.email}</p>
                      <div className="mt-2">{getRoleBadge(selectedUser.role)}</div>
                    </div>
                  </div>
                </div>
              )}
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>
                  Cancel
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={confirmDelete}
                >
                  Delete User
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </AdminDashboardLayout>
  );
};

// Add missing Clock component
const Clock = (props: any) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
};

export default UserManagement;
