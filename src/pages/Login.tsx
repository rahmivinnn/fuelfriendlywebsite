import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
<<<<<<< HEAD
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Eye, EyeOff, LogIn } from 'lucide-react';
=======
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { User } from 'lucide-react';
>>>>>>> fc50f12d78601307538b9c65c6925970812ed209

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
<<<<<<< HEAD
    password: '',
    rememberMe: false
  });

  const [showPassword, setShowPassword] = useState(false);

=======
    password: ''
  });

>>>>>>> fc50f12d78601307538b9c65c6925970812ed209
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

<<<<<<< HEAD
  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, rememberMe: checked }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
        duration: 3000,
=======
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
>>>>>>> fc50f12d78601307538b9c65c6925970812ed209
      });
      return;
    }

<<<<<<< HEAD
    try {
      // Simplified login - no admin levels
      const success = await login(
        formData.email,
        formData.password
      );

      if (success) {
        // Store user info in localStorage if remember me is checked
        if (formData.rememberMe) {
          localStorage.setItem('stationOwnerEmail', formData.email);
          // Extract name from email for demo purposes
          const name = formData.email.split('@')[0].replace(/[.]/g, ' ');
          const formattedName = name
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
          localStorage.setItem('stationOwnerName', formattedName);
        }

        toast({
          title: "Login Successful",
          description: "Welcome to FuelFriendly Partner Dashboard",
          duration: 3000,
        });

        // Redirect to station dashboard
        navigate('/station-dashboard');
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid credentials. Please try again.",
          variant: "destructive",
          duration: 3000,
        });
      }
    } catch (error) {
      toast({
        title: "Login Error",
        description: "An error occurred during login. Please try again.",
=======
    const success = await login(
      formData.email,
      formData.password
    );

    if (success) {
      toast({
        title: "Login Successful",
        description: "Welcome to FuelFriendly",
        duration: 3000,
      });

      // Redirect to station dashboard
      navigate('/station-dashboard');
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please try again.",
>>>>>>> fc50f12d78601307538b9c65c6925970812ed209
        variant: "destructive",
        duration: 3000,
      });
    }
  };



  return (
<<<<<<< HEAD
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
=======
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
>>>>>>> fc50f12d78601307538b9c65c6925970812ed209
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
<<<<<<< HEAD
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome to FuelFriendly</h1>
          <p className="text-gray-600 dark:text-gray-400">Sign in to access your fuel partner account</p>
        </div>

        <Card className="border-gray-200 dark:border-gray-700 dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="dark:text-white">Partner Login</CardTitle>
            <CardDescription className="dark:text-gray-400">
=======
          <h1 className="text-2xl font-bold text-gray-900">Welcome to FuelFriendly</h1>
          <p className="text-gray-600">Sign in to access your account</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
>>>>>>> fc50f12d78601307538b9c65c6925970812ed209
              Enter your credentials to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
<<<<<<< HEAD
                <Label htmlFor="email" className="dark:text-gray-300">Email</Label>
=======
                <Label htmlFor="email">Email</Label>
>>>>>>> fc50f12d78601307538b9c65c6925970812ed209
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
<<<<<<< HEAD
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
=======
>>>>>>> fc50f12d78601307538b9c65c6925970812ed209
                />
              </div>

              <div className="space-y-2">
<<<<<<< HEAD
                <Label htmlFor="password" className="dark:text-gray-300">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent dark:text-gray-400"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="rememberMe"
                  checked={formData.rememberMe}
                  onCheckedChange={handleCheckboxChange}
                  className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                />
                <Label
                  htmlFor="rememberMe"
                  className="text-sm font-normal dark:text-gray-300"
                >
                  Remember me
                </Label>
              </div>
=======
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


>>>>>>> fc50f12d78601307538b9c65c6925970812ed209

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
<<<<<<< HEAD
                    <LogIn className="h-4 w-4 mr-2" />
=======
                    <User className="h-4 w-4 mr-2" />
>>>>>>> fc50f12d78601307538b9c65c6925970812ed209
                    Sign In
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
<<<<<<< HEAD
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center w-full">
              <a
                href="#"
                className="text-sm text-green-500 hover:text-green-600 dark:text-green-400 dark:hover:text-green-300"
              >
                Forgot your password?
              </a>
            </div>

            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                  Don't have an account?
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              onClick={() => navigate('/station-registration')}
            >
              Register your station
            </Button>
=======
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
>>>>>>> fc50f12d78601307538b9c65c6925970812ed209
          </CardFooter>
        </Card>

        <div className="mt-6 text-center">
          <Button
            variant="ghost"
<<<<<<< HEAD
            className="text-gray-500 dark:text-gray-400"
=======
            className="text-gray-500"
>>>>>>> fc50f12d78601307538b9c65c6925970812ed209
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
