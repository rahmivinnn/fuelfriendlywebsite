import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { User } from 'lucide-react';

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
        variant: "destructive",
        duration: 3000,
      });
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
                    <User className="h-4 w-4 mr-2" />
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
