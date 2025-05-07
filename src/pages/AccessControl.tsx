import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AdminDashboardLayout from '@/components/AdminDashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { 
  Lock, Key, Shield, ShieldAlert, ShieldCheck, 
  UserCog, AlertTriangle, CheckCircle, Settings,
  Eye, EyeOff, RefreshCw, Database, Server
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const AccessControl = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  
  // Access code state
  const [superiorAdminCode, setSuperiorAdminCode] = useState('FUEL-SUPERIOR-2023');
  const [showSuperiorAdminCode, setShowSuperiorAdminCode] = useState(false);
  
  // Permission settings
  const [permissions, setPermissions] = useState({
    level1: {
      viewStations: true,
      viewOrders: true,
      viewMessages: true,
      viewReports: false,
      manageProducts: false,
      manageUsers: false,
      accessAPI: false,
      accessSystemData: false,
      accessSecurity: false
    },
    level2: {
      viewStations: true,
      viewOrders: true,
      viewMessages: true,
      viewReports: true,
      manageProducts: true,
      manageUsers: true,
      accessAPI: false,
      accessSystemData: false,
      accessSecurity: false
    },
    level3: {
      viewStations: true,
      viewOrders: true,
      viewMessages: true,
      viewReports: true,
      manageProducts: true,
      manageUsers: true,
      accessAPI: true,
      accessSystemData: true,
      accessSecurity: true
    }
  });
  
  // System settings
  const [systemSettings, setSystemSettings] = useState({
    enableUserRegistration: true,
    enableStationRegistration: true,
    enablePublicAPI: true,
    maintenanceMode: false,
    enforceStrongPasswords: true,
    twoFactorAuth: false,
    sessionTimeout: 30,
    maxLoginAttempts: 5
  });
  
  // Audit log
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  
  // Load mock data
  useEffect(() => {
    if (user?.role !== UserRole.SuperiorAdmin) {
      toast({
        title: "Access Denied",
        description: "You need Superior Admin privileges to access this page",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    const timer = setTimeout(() => {
      // Generate mock audit logs
      const mockLogs = Array.from({ length: 20 }, (_, i) => {
        const actions = [
          'Changed user role',
          'Updated system settings',
          'Reset access code',
          'Modified permissions',
          'Enabled maintenance mode',
          'Disabled user account',
          'Restored database backup',
          'Updated API access keys'
        ];
        
        const users = [
          'admin@fuelfriendly.com',
          'john.smith@example.com',
          'sarah.johnson@example.com',
          'system@fuelfriendly.com'
        ];
        
        const action = actions[Math.floor(Math.random() * actions.length)];
        const actor = users[Math.floor(Math.random() * users.length)];
        const timestamp = new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000);
        
        return {
          id: `log-${i + 1}`,
          action,
          actor,
          timestamp,
          ipAddress: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`
        };
      });
      
      setAuditLogs(mockLogs.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()));
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [toast, user]);
  
  // Handle permission change
  const handlePermissionChange = (level: string, permission: string, checked: boolean) => {
    setPermissions(prev => ({
      ...prev,
      [level]: {
        ...prev[level as keyof typeof prev],
        [permission]: checked
      }
    }));
    
    toast({
      title: "Permission Updated",
      description: `${permission} for ${level} users is now ${checked ? 'enabled' : 'disabled'}`,
      duration: 2000,
    });
    
    // Add to audit log
    const newLog = {
      id: `log-${auditLogs.length + 1}`,
      action: `${checked ? 'Enabled' : 'Disabled'} ${permission} for ${level} users`,
      actor: user?.email || 'unknown',
      timestamp: new Date(),
      ipAddress: '127.0.0.1' // Placeholder
    };
    
    setAuditLogs([newLog, ...auditLogs]);
  };
  
  // Handle system setting change
  const handleSystemSettingChange = (setting: string, value: any) => {
    setSystemSettings(prev => ({
      ...prev,
      [setting]: value
    }));
    
    toast({
      title: "Setting Updated",
      description: `${setting} is now ${typeof value === 'boolean' ? (value ? 'enabled' : 'disabled') : value}`,
      duration: 2000,
    });
    
    // Add to audit log
    const newLog = {
      id: `log-${auditLogs.length + 1}`,
      action: `Updated system setting: ${setting} to ${value}`,
      actor: user?.email || 'unknown',
      timestamp: new Date(),
      ipAddress: '127.0.0.1' // Placeholder
    };
    
    setAuditLogs([newLog, ...auditLogs]);
  };
  
  // Handle access code change
  const handleAccessCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSuperiorAdminCode(e.target.value);
  };
  
  // Save access code
  const saveAccessCode = () => {
    if (superiorAdminCode.trim() === '') {
      toast({
        title: "Error",
        description: "Access code cannot be empty",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    toast({
      title: "Access Code Updated",
      description: "Superior Admin access code has been updated",
      duration: 3000,
    });
    
    // Add to audit log
    const newLog = {
      id: `log-${auditLogs.length + 1}`,
      action: "Updated Superior Admin access code",
      actor: user?.email || 'unknown',
      timestamp: new Date(),
      ipAddress: '127.0.0.1' // Placeholder
    };
    
    setAuditLogs([newLog, ...auditLogs]);
  };
  
  // Generate new access code
  const generateNewAccessCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = 'FUEL-';
    
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
    result += '-' + new Date().getFullYear();
    
    setSuperiorAdminCode(result);
    
    toast({
      title: "New Code Generated",
      description: "Remember to save the new access code",
      duration: 3000,
    });
  };
  
  // Format date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(date);
  };
  
  if (user?.role !== UserRole.SuperiorAdmin) {
    return (
      <AdminDashboardLayout title="Access Control">
        <div className="h-full flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="flex items-center text-red-600">
                <Lock className="mr-2" />
                Access Denied
              </CardTitle>
              <CardDescription>
                You do not have permission to view this page
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Superior Admin Access Required</AlertTitle>
                <AlertDescription>
                  This page is restricted to Superior Administrators only. Please contact a Superior Admin if you need access.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </AdminDashboardLayout>
    );
  }
  
  return (
    <AdminDashboardLayout title="Access Control">
      {isLoading ? (
        <div className="h-full flex items-center justify-center">
          <div className="text-center">
            <motion.div 
              className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full mx-auto"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />
            <p className="mt-4 text-gray-500">Loading access control settings...</p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Superior Admin Area</AlertTitle>
            <AlertDescription>
              This area provides complete control over the system. All actions are logged and audited.
            </AlertDescription>
          </Alert>
          
          <Tabs defaultValue="access-codes">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="access-codes" className="flex items-center">
                <Key size={16} className="mr-2" />
                Access Codes
              </TabsTrigger>
              <TabsTrigger value="permissions" className="flex items-center">
                <Shield size={16} className="mr-2" />
                Role Permissions
              </TabsTrigger>
              <TabsTrigger value="system" className="flex items-center">
                <Settings size={16} className="mr-2" />
                System Settings
              </TabsTrigger>
              <TabsTrigger value="audit" className="flex items-center">
                <Server size={16} className="mr-2" />
                Audit Log
              </TabsTrigger>
            </TabsList>
            
            {/* Access Codes Tab */}
            <TabsContent value="access-codes">
              <Card>
                <CardHeader>
                  <CardTitle>Superior Admin Access Code</CardTitle>
                  <CardDescription>
                    This code is required to gain Superior Admin privileges
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="accessCode">Current Access Code</Label>
                    <div className="flex">
                      <div className="relative flex-1">
                        <Input
                          id="accessCode"
                          type={showSuperiorAdminCode ? "text" : "password"}
                          value={superiorAdminCode}
                          onChange={handleAccessCodeChange}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          type="button"
                          className="absolute right-0 top-0 h-full"
                          onClick={() => setShowSuperiorAdminCode(!showSuperiorAdminCode)}
                        >
                          {showSuperiorAdminCode ? <EyeOff size={16} /> : <Eye size={16} />}
                        </Button>
                      </div>
                      <Button 
                        variant="outline" 
                        className="ml-2"
                        onClick={generateNewAccessCode}
                      >
                        <RefreshCw size={16} className="mr-2" />
                        Generate
                      </Button>
                    </div>
                  </div>
                  
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Important Security Notice</AlertTitle>
                    <AlertDescription>
                      Keep this access code secure. Anyone with this code can gain Superior Admin access to the system.
                    </AlertDescription>
                  </Alert>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="bg-red-600 hover:bg-red-700"
                    onClick={saveAccessCode}
                  >
                    <Key size={16} className="mr-2" />
                    Save Access Code
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Permissions Tab */}
            <TabsContent value="permissions">
              <Card>
                <CardHeader>
                  <CardTitle>Role Permissions</CardTitle>
                  <CardDescription>
                    Configure what each access level can do in the system
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Level 1 Permissions */}
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Shield size={20} className="text-blue-500 mr-2" />
                        <h3 className="text-lg font-medium">Level 1 - Basic Access</h3>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center justify-between space-x-2">
                          <Label htmlFor="level1-viewStations">View Stations</Label>
                          <Switch
                            id="level1-viewStations"
                            checked={permissions.level1.viewStations}
                            onCheckedChange={(checked) => handlePermissionChange('level1', 'viewStations', checked)}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between space-x-2">
                          <Label htmlFor="level1-viewOrders">View Orders</Label>
                          <Switch
                            id="level1-viewOrders"
                            checked={permissions.level1.viewOrders}
                            onCheckedChange={(checked) => handlePermissionChange('level1', 'viewOrders', checked)}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between space-x-2">
                          <Label htmlFor="level1-viewMessages">View Messages</Label>
                          <Switch
                            id="level1-viewMessages"
                            checked={permissions.level1.viewMessages}
                            onCheckedChange={(checked) => handlePermissionChange('level1', 'viewMessages', checked)}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between space-x-2">
                          <Label htmlFor="level1-viewReports">View Reports</Label>
                          <Switch
                            id="level1-viewReports"
                            checked={permissions.level1.viewReports}
                            onCheckedChange={(checked) => handlePermissionChange('level1', 'viewReports', checked)}
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Level 2 Permissions */}
                    <div className="space-y-4 pt-4 border-t">
                      <div className="flex items-center">
                        <ShieldCheck size={20} className="text-purple-500 mr-2" />
                        <h3 className="text-lg font-medium">Level 2 - Extended Access</h3>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center justify-between space-x-2">
                          <Label htmlFor="level2-manageProducts">Manage Products</Label>
                          <Switch
                            id="level2-manageProducts"
                            checked={permissions.level2.manageProducts}
                            onCheckedChange={(checked) => handlePermissionChange('level2', 'manageProducts', checked)}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between space-x-2">
                          <Label htmlFor="level2-manageUsers">Manage Users</Label>
                          <Switch
                            id="level2-manageUsers"
                            checked={permissions.level2.manageUsers}
                            onCheckedChange={(checked) => handlePermissionChange('level2', 'manageUsers', checked)}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between space-x-2">
                          <Label htmlFor="level2-viewReports">View Reports</Label>
                          <Switch
                            id="level2-viewReports"
                            checked={permissions.level2.viewReports}
                            onCheckedChange={(checked) => handlePermissionChange('level2', 'viewReports', checked)}
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Level 3 Permissions */}
                    <div className="space-y-4 pt-4 border-t">
                      <div className="flex items-center">
                        <ShieldAlert size={20} className="text-amber-500 mr-2" />
                        <h3 className="text-lg font-medium">Level 3 - Advanced Access</h3>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center justify-between space-x-2">
                          <Label htmlFor="level3-accessAPI">Access API</Label>
                          <Switch
                            id="level3-accessAPI"
                            checked={permissions.level3.accessAPI}
                            onCheckedChange={(checked) => handlePermissionChange('level3', 'accessAPI', checked)}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between space-x-2">
                          <Label htmlFor="level3-accessSystemData">Access System Data</Label>
                          <Switch
                            id="level3-accessSystemData"
                            checked={permissions.level3.accessSystemData}
                            onCheckedChange={(checked) => handlePermissionChange('level3', 'accessSystemData', checked)}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between space-x-2">
                          <Label htmlFor="level3-accessSecurity">Access Security</Label>
                          <Switch
                            id="level3-accessSecurity"
                            checked={permissions.level3.accessSecurity}
                            onCheckedChange={(checked) => handlePermissionChange('level3', 'accessSecurity', checked)}
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Superior Admin Note */}
                    <div className="pt-4 border-t">
                      <div className="flex items-center">
                        <UserCog size={20} className="text-red-500 mr-2" />
                        <h3 className="text-lg font-medium">Superior Admin</h3>
                      </div>
                      
                      <p className="text-sm text-gray-500 mt-2">
                        Superior Admins have full access to all system functions and cannot be restricted.
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-green-500 hover:bg-green-600">
                    <CheckCircle size={16} className="mr-2" />
                    Save All Permissions
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* System Settings Tab */}
            <TabsContent value="system">
              <Card>
                <CardHeader>
                  <CardTitle>System Settings</CardTitle>
                  <CardDescription>
                    Configure global system behavior and security settings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Registration Settings */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Registration Settings</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center justify-between space-x-2">
                          <Label htmlFor="enableUserRegistration">Enable User Registration</Label>
                          <Switch
                            id="enableUserRegistration"
                            checked={systemSettings.enableUserRegistration}
                            onCheckedChange={(checked) => handleSystemSettingChange('enableUserRegistration', checked)}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between space-x-2">
                          <Label htmlFor="enableStationRegistration">Enable Station Registration</Label>
                          <Switch
                            id="enableStationRegistration"
                            checked={systemSettings.enableStationRegistration}
                            onCheckedChange={(checked) => handleSystemSettingChange('enableStationRegistration', checked)}
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Security Settings */}
                    <div className="space-y-4 pt-4 border-t">
                      <h3 className="text-lg font-medium">Security Settings</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center justify-between space-x-2">
                          <Label htmlFor="enforceStrongPasswords">Enforce Strong Passwords</Label>
                          <Switch
                            id="enforceStrongPasswords"
                            checked={systemSettings.enforceStrongPasswords}
                            onCheckedChange={(checked) => handleSystemSettingChange('enforceStrongPasswords', checked)}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between space-x-2">
                          <Label htmlFor="twoFactorAuth">Require Two-Factor Authentication</Label>
                          <Switch
                            id="twoFactorAuth"
                            checked={systemSettings.twoFactorAuth}
                            onCheckedChange={(checked) => handleSystemSettingChange('twoFactorAuth', checked)}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between space-x-2">
                          <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                          <Input
                            id="sessionTimeout"
                            type="number"
                            className="w-20 text-right"
                            value={systemSettings.sessionTimeout}
                            onChange={(e) => handleSystemSettingChange('sessionTimeout', parseInt(e.target.value))}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between space-x-2">
                          <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                          <Input
                            id="maxLoginAttempts"
                            type="number"
                            className="w-20 text-right"
                            value={systemSettings.maxLoginAttempts}
                            onChange={(e) => handleSystemSettingChange('maxLoginAttempts', parseInt(e.target.value))}
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* API Settings */}
                    <div className="space-y-4 pt-4 border-t">
                      <h3 className="text-lg font-medium">API Settings</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center justify-between space-x-2">
                          <Label htmlFor="enablePublicAPI">Enable Public API</Label>
                          <Switch
                            id="enablePublicAPI"
                            checked={systemSettings.enablePublicAPI}
                            onCheckedChange={(checked) => handleSystemSettingChange('enablePublicAPI', checked)}
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Maintenance Settings */}
                    <div className="space-y-4 pt-4 border-t">
                      <h3 className="text-lg font-medium">Maintenance</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center justify-between space-x-2">
                          <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                          <Switch
                            id="maintenanceMode"
                            checked={systemSettings.maintenanceMode}
                            onCheckedChange={(checked) => handleSystemSettingChange('maintenanceMode', checked)}
                          />
                        </div>
                      </div>
                      
                      {systemSettings.maintenanceMode && (
                        <Alert variant="destructive">
                          <AlertTriangle className="h-4 w-4" />
                          <AlertTitle>Maintenance Mode Active</AlertTitle>
                          <AlertDescription>
                            The system is currently in maintenance mode. Only Superior Admins can access the system.
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-green-500 hover:bg-green-600">
                    <CheckCircle size={16} className="mr-2" />
                    Save System Settings
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Audit Log Tab */}
            <TabsContent value="audit">
              <Card>
                <CardHeader>
                  <CardTitle>Audit Log</CardTitle>
                  <CardDescription>
                    Record of all administrative actions in the system
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Timestamp
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Action
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            User
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            IP Address
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {auditLogs.map((log) => (
                          <tr key={log.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatDate(log.timestamp)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {log.action}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {log.actor}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {log.ipAddress}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="text-sm text-gray-500">
                    Showing {auditLogs.length} recent actions
                  </div>
                  
                  <Button variant="outline">
                    Export Audit Log
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </AdminDashboardLayout>
  );
};

export default AccessControl;
