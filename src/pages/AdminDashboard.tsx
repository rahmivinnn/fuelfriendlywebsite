import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AdminDashboardLayout from '@/components/AdminDashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import {
  BarChart, LineChart, PieChart, Activity, Users,
  Building2, ShoppingBag, AlertTriangle, CheckCircle,
  TrendingUp, TrendingDown, Fuel, Zap, Shield, ShieldAlert,
  ShieldCheck, UserCog, Lock
} from 'lucide-react';

const AdminDashboard = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStations: 0,
    totalOrders: 0,
    totalRevenue: 0,
    activeAlerts: 0,
    systemStatus: 'Operational',
    userGrowth: 0,
    stationGrowth: 0,
    orderGrowth: 0,
    revenueGrowth: 0
  });

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({
        totalUsers: 50000,
        totalStations: 1250,
        totalOrders: 125670,
        totalRevenue: 4567890,
        activeAlerts: 15,
        systemStatus: 'Operational',
        userGrowth: 25.8,
        stationGrowth: 18.3,
        orderGrowth: 35.7,
        revenueGrowth: 43.4
      });
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Get role-specific welcome message
  const getWelcomeMessage = () => {
    if (!user) return "Welcome to the Admin Dashboard";

    switch (user.role) {
      case UserRole.Level1:
        return "Welcome to the Basic Admin Dashboard";
      case UserRole.Level2:
        return "Welcome to the Extended Admin Dashboard";
      case UserRole.Level3:
        return "Welcome to the Advanced Admin Dashboard";
      case UserRole.SuperiorAdmin:
        return "Welcome, Superior Administrator";
      default:
        return "Welcome to the Admin Dashboard";
    }
  };

  // Get role-specific description
  const getRoleDescription = () => {
    if (!user) return "";

    switch (user.role) {
      case UserRole.Level1:
        return "You have basic access to view stations, orders, and messages.";
      case UserRole.Level2:
        return "You have extended access to manage users, products, and view analytics.";
      case UserRole.Level3:
        return "You have advanced access to system data, API management, and security settings.";
      case UserRole.SuperiorAdmin:
        return "You have full system access with superior privileges to control all aspects of the platform.";
      default:
        return "";
    }
  };

  // Get role icon
  const getRoleIcon = () => {
    if (!user) return null;

    switch (user.role) {
      case UserRole.Level1:
        return <Shield size={24} className="text-blue-500" />;
      case UserRole.Level2:
        return <ShieldCheck size={24} className="text-purple-500" />;
      case UserRole.Level3:
        return <ShieldAlert size={24} className="text-amber-500" />;
      case UserRole.SuperiorAdmin:
        return <UserCog size={24} className="text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <AdminDashboardLayout title="Admin Dashboard">
      {isLoading ? (
        <div className="h-full flex items-center justify-center">
          <div className="text-center">
            <motion.div
              className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full mx-auto"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />
            <p className="mt-4 text-gray-500">Loading dashboard data...</p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Welcome Card */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-green-100">
                  {getRoleIcon()}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{getWelcomeMessage()}</h2>
                  <p className="text-gray-500">{getRoleDescription()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Users Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Users size={20} className="text-blue-600" />
                  </div>
                </div>
                <div className="mt-2 flex items-center text-xs">
                  {stats.userGrowth > 0 ? (
                    <>
                      <TrendingUp size={14} className="text-green-500 mr-1" />
                      <span className="text-green-500">{stats.userGrowth}% increase</span>
                    </>
                  ) : (
                    <>
                      <TrendingDown size={14} className="text-red-500 mr-1" />
                      <span className="text-red-500">{Math.abs(stats.userGrowth)}% decrease</span>
                    </>
                  )}
                  <span className="ml-1 text-gray-500">since last month</span>
                </div>
              </CardContent>
            </Card>

            {/* Stations Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Stations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="text-2xl font-bold">{stats.totalStations.toLocaleString()}</div>
                  <div className="p-2 bg-purple-100 rounded-full">
                    <Building2 size={20} className="text-purple-600" />
                  </div>
                </div>
                <div className="mt-2 flex items-center text-xs">
                  {stats.stationGrowth > 0 ? (
                    <>
                      <TrendingUp size={14} className="text-green-500 mr-1" />
                      <span className="text-green-500">{stats.stationGrowth}% increase</span>
                    </>
                  ) : (
                    <>
                      <TrendingDown size={14} className="text-red-500 mr-1" />
                      <span className="text-red-500">{Math.abs(stats.stationGrowth)}% decrease</span>
                    </>
                  )}
                  <span className="ml-1 text-gray-500">since last month</span>
                </div>
              </CardContent>
            </Card>

            {/* Orders Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="text-2xl font-bold">{stats.totalOrders.toLocaleString()}</div>
                  <div className="p-2 bg-amber-100 rounded-full">
                    <ShoppingBag size={20} className="text-amber-600" />
                  </div>
                </div>
                <div className="mt-2 flex items-center text-xs">
                  {stats.orderGrowth > 0 ? (
                    <>
                      <TrendingUp size={14} className="text-green-500 mr-1" />
                      <span className="text-green-500">{stats.orderGrowth}% increase</span>
                    </>
                  ) : (
                    <>
                      <TrendingDown size={14} className="text-red-500 mr-1" />
                      <span className="text-red-500">{Math.abs(stats.orderGrowth)}% decrease</span>
                    </>
                  )}
                  <span className="ml-1 text-gray-500">since last month</span>
                </div>
              </CardContent>
            </Card>

            {/* Revenue Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</div>
                  <div className="p-2 bg-green-100 rounded-full">
                    <Activity size={20} className="text-green-600" />
                  </div>
                </div>
                <div className="mt-2 flex items-center text-xs">
                  {stats.revenueGrowth > 0 ? (
                    <>
                      <TrendingUp size={14} className="text-green-500 mr-1" />
                      <span className="text-green-500">{stats.revenueGrowth}% increase</span>
                    </>
                  ) : (
                    <>
                      <TrendingDown size={14} className="text-red-500 mr-1" />
                      <span className="text-red-500">{Math.abs(stats.revenueGrowth)}% decrease</span>
                    </>
                  )}
                  <span className="ml-1 text-gray-500">since last month</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* System Status and Alerts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* System Status */}
            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
                <CardDescription>Current platform operational status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-green-100 rounded-full">
                    <CheckCircle size={20} className="text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium">{stats.systemStatus}</div>
                    <div className="text-sm text-gray-500">All systems running normally</div>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">API Services</span>
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">Operational</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Database</span>
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">Operational</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Payment Processing</span>
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">Operational</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">User Authentication</span>
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">Operational</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View System Health</Button>
              </CardFooter>
            </Card>

            {/* Active Alerts */}
            <Card>
              <CardHeader>
                <CardTitle>Active Alerts</CardTitle>
                <CardDescription>Issues requiring attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-amber-100 rounded-full">
                    <AlertTriangle size={20} className="text-amber-600" />
                  </div>
                  <div>
                    <div className="font-medium">{stats.activeAlerts} Active Alerts</div>
                    <div className="text-sm text-gray-500">Requiring administrator attention</div>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="flex items-center text-amber-800 font-medium">
                      <AlertTriangle size={16} className="mr-2" />
                      High API Usage Detected
                    </div>
                    <div className="mt-1 text-sm text-amber-700">
                      Station ID #1234 exceeding rate limits
                    </div>
                  </div>

                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center text-red-800 font-medium">
                      <AlertTriangle size={16} className="mr-2" />
                      Failed Login Attempts
                    </div>
                    <div className="mt-1 text-sm text-red-700">
                      Multiple failed attempts for admin@fuelfriendly.com
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center text-blue-800 font-medium">
                      <AlertTriangle size={16} className="mr-2" />
                      Database Backup Pending
                    </div>
                    <div className="mt-1 text-sm text-blue-700">
                      Scheduled backup needs confirmation
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View All Alerts</Button>
              </CardFooter>
            </Card>
          </div>

          {/* Charts Section - Only visible to Level 2 and above */}
          {user && user.role >= UserRole.Level2 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>User Distribution</CardTitle>
                  <CardDescription>By access level</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center items-center p-6">
                  <div className="relative w-40 h-40">
                    <PieChart size={160} className="text-gray-300" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold">50,000</div>
                        <div className="text-xs text-gray-500">Total Users</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between text-xs text-gray-500">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
                    Level 1 (65%)
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-purple-500 rounded-full mr-1"></div>
                    Level 2 (25%)
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-amber-500 rounded-full mr-1"></div>
                    Level 3 (10%)
                  </div>
                </CardFooter>
              </Card>

              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Station Types</CardTitle>
                  <CardDescription>By fuel category</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center items-center p-6">
                  <div className="relative w-40 h-40">
                    <PieChart size={160} className="text-gray-300" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold">1,250</div>
                        <div className="text-xs text-gray-500">Total Stations</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between text-xs text-gray-500">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
                    Eco-Friendly (40%)
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
                    Standard (45%)
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-amber-500 rounded-full mr-1"></div>
                    Premium (15%)
                  </div>
                </CardFooter>
              </Card>

              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Revenue Sources</CardTitle>
                  <CardDescription>By product category</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center items-center p-6">
                  <div className="relative w-40 h-40">
                    <PieChart size={160} className="text-gray-300" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold">$4.57M</div>
                        <div className="text-xs text-gray-500">Total Revenue</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between text-xs text-gray-500">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
                    Fuel (70%)
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
                    Services (20%)
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-amber-500 rounded-full mr-1"></div>
                    Other (10%)
                  </div>
                </CardFooter>
              </Card>
            </div>
          )}

          {/* Advanced System Controls - Only visible to Level 3 and Superior Admin */}
          {user && user.role >= UserRole.Level3 && (
            <Card>
              <CardHeader>
                <CardTitle>Advanced System Controls</CardTitle>
                <CardDescription>
                  {user.role === UserRole.SuperiorAdmin
                    ? "Full system control with superior admin privileges"
                    : "Advanced system management options"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="flex items-center justify-center h-20">
                    <div className="flex flex-col items-center">
                      <Fuel size={24} className="mb-2 text-green-600" />
                      <span>Fuel Price Control</span>
                    </div>
                  </Button>

                  <Button variant="outline" className="flex items-center justify-center h-20">
                    <div className="flex flex-col items-center">
                      <Zap size={24} className="mb-2 text-amber-600" />
                      <span>System Maintenance</span>
                    </div>
                  </Button>

                  <Button variant="outline" className="flex items-center justify-center h-20">
                    <div className="flex flex-col items-center">
                      <Lock size={24} className="mb-2 text-red-600" />
                      <span>Security Controls</span>
                    </div>
                  </Button>
                </div>

                {/* Superior Admin Only Controls */}
                {user.role === UserRole.SuperiorAdmin && (
                  <div className="mt-4 p-4 border border-red-200 bg-red-50 rounded-lg">
                    <h3 className="text-red-800 font-medium flex items-center">
                      <UserCog size={18} className="mr-2" />
                      Superior Admin Controls
                    </h3>
                    <p className="text-sm text-red-700 mt-1">
                      These controls provide complete system access and should be used with caution.
                    </p>
                    <div className="grid grid-cols-2 gap-2 mt-3">
                      <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-100">
                        User Role Management
                      </Button>
                      <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-100">
                        System Configuration
                      </Button>
                      <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-100">
                        Database Controls
                      </Button>
                      <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-100">
                        Emergency Override
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </AdminDashboardLayout>
  );
};

export default AdminDashboard;
