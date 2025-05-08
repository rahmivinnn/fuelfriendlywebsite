import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield, ShieldAlert, ShieldCheck, ShieldQuestion, User, UserCog } from 'lucide-react';

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: UserRole.Level1.toString()
  });

  const [showAccessCodeInput, setShowAccessCodeInput] = useState(false);
  const [accessCode, setAccessCode] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (value: string) => {
    setFormData(prev => ({ ...prev, role: value }));

    // Show access code input if Superior Admin is selected
    setShowAccessCodeInput(value === UserRole.SuperiorAdmin.toString());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Enhanced form validation
    const errors: string[] = [];

    if (!formData.email) {
      errors.push("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.push("Please enter a valid email address");
    }

    if (!formData.password) {
      errors.push("Password is required");
    } else if (formData.password.length < 6) {
      errors.push("Password must be at least 6 characters");
    }

    // If trying to login as Superior Admin, check access code
    if (formData.role === UserRole.SuperiorAdmin.toString()) {
      if (!accessCode) {
        errors.push("Access code is required for Superior Admin");
      } else if (accessCode !== 'FUEL-SUPERIOR-2023') {
        errors.push("Invalid Superior Admin access code");
      }
    }

    if (errors.length > 0) {
      toast({
        title: "Validation Error",
        description: (
          <ul className="list-disc pl-4">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        ),
        variant: "destructive",
        duration: 5000,
      });
      return;
    }

    const success = await login(
      formData.email,
      formData.password,
      parseInt(formData.role) as UserRole
    );

    if (success) {
      toast({
        title: "Login Successful",
        description: "Welcome to FuelFriendly Admin Panel",
        duration: 3000,
      });

      // Redirect based on role
      if (parseInt(formData.role) >= UserRole.Level1) {
        navigate('/admin-dashboard');
      } else {
        navigate('/station-dashboard');
      }
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const getRoleIcon = (role: string) => {
    switch (parseInt(role)) {
      case UserRole.Level1:
        return <Shield className="h-4 w-4 mr-2" />;
      case UserRole.Level2:
        return <ShieldCheck className="h-4 w-4 mr-2" />;
      case UserRole.Level3:
        return <ShieldAlert className="h-4 w-4 mr-2" />;
      case UserRole.SuperiorAdmin:
        return <UserCog className="h-4 w-4 mr-2" />;
      default:
        return <User className="h-4 w-4 mr-2" />;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <img
            src="/lovable-uploads/f1f34c25-67df-4603-8eb1-3f1fe84812a4.png"
            alt="FuelFriendly Logo"
            className="h-16 mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-900">Welcome to FuelFriendly</h1>
          <p className="text-gray-600">Sign in to access your account</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Access Level</Label>
                <Select
                  value={formData.role}
                  onValueChange={handleRoleChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your access level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={UserRole.Level1.toString()}>
                      <div className="flex items-center">
                        <Shield className="h-4 w-4 mr-2" />
                        Level 1 - Basic Access
                      </div>
                    </SelectItem>
                    <SelectItem value={UserRole.Level2.toString()}>
                      <div className="flex items-center">
                        <ShieldCheck className="h-4 w-4 mr-2" />
                        Level 2 - Extended Access
                      </div>
                    </SelectItem>
                    <SelectItem value={UserRole.Level3.toString()}>
                      <div className="flex items-center">
                        <ShieldAlert className="h-4 w-4 mr-2" />
                        Level 3 - Advanced Access
                      </div>
                    </SelectItem>
                    <SelectItem value={UserRole.SuperiorAdmin.toString()}>
                      <div className="flex items-center">
                        <UserCog className="h-4 w-4 mr-2" />
                        Superior Admin
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {showAccessCodeInput && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2"
                >
                  <Label htmlFor="accessCode">Superior Admin Access Code</Label>
                  <Input
                    id="accessCode"
                    type="password"
                    placeholder="Enter access code"
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value)}
                    required={showAccessCodeInput}
                  />
                  <p className="text-xs text-gray-500">
                    Superior Admin requires a special access code. Use: FUEL-SUPERIOR-2023
                  </p>
                </motion.div>
              )}

              <Button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    {getRoleIcon(formData.role)}
                    Sign In
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <Button
                variant="link"
                className="p-0 h-auto text-green-500"
                onClick={() => navigate('/station-registration')}
              >
                Register your station
              </Button>
            </p>
          </CardFooter>
        </Card>

        <div className="mt-6 text-center">
          <Button
            variant="ghost"
            className="text-gray-500"
            onClick={() => navigate('/')}
          >
            Back to Home
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
