import React, { createContext, useContext, useState, useEffect } from 'react';
<<<<<<< HEAD
import authService, { User } from '@/services/authService';
import { useToast } from '@/hooks/use-toast';

// User roles enum
export enum UserRole {
  Guest = 0,
  Level1 = 1,
  Level2 = 2,
  Level3 = 3,
  SuperiorAdmin = 4
}

// Auth context type
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: {
    email: string;
    password: string;
    name: string;
    stationName?: string;
    address?: string;
    phone?: string;
  }) => Promise<void>;
  logout: () => void;
  hasRole: (requiredRole: UserRole) => boolean;
  elevateToSuperiorAdmin: (accessCode: string) => boolean;
  updateUserRole: (userId: string, newRole: UserRole) => boolean;
}

// Create context
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  hasRole: () => false,
  elevateToSuperiorAdmin: () => false,
  updateUserRole: () => false
});

// Superior admin access code
const SUPERIOR_ADMIN_CODE = "FUEL-SUPERIOR-2023";

// Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Get current user from token
        const currentUser = authService.getCurrentUser();

        if (currentUser) {
          setUser(currentUser);
        }
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
=======

// Define user roles with numeric values for easy comparison
export enum UserRole {
  Guest = 0,
  User = 1
}

// Define the user type
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  lastLogin: string;
}

// Define the context type
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => false,
  logout: () => {},
  isAuthenticated: false,
  isLoading: true,
});

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing user session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('fuelFriendlyUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
>>>>>>> fc50f12d78601307538b9c65c6925970812ed209
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    try {
<<<<<<< HEAD
      const user = await authService.login(email, password);
      setUser(user);

      toast({
        title: "Login Successful",
        description: `Welcome back, ${user.name}!`,
        duration: 3000,
      });
=======
      // In a real app, this would be an API call
      // For now, we'll simulate a successful login with a delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Create a new user object
      const newUser: User = {
        id: Math.random().toString(36).substring(2, 9),
        name: email.split('@')[0], // Use part of email as name
        email,
        role: UserRole.User,
        lastLogin: new Date().toISOString(),
      };

      // Save user to localStorage
      localStorage.setItem('fuelFriendlyUser', JSON.stringify(newUser));
      localStorage.setItem('stationOwnerName', newUser.name); // For backward compatibility

      // Update state
      setUser(newUser);
      setIsLoading(false);
>>>>>>> fc50f12d78601307538b9c65c6925970812ed209

      return true;
    } catch (error) {
      console.error('Login error:', error);
<<<<<<< HEAD

      toast({
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
        duration: 5000,
      });

      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (userData: {
    email: string;
    password: string;
    name: string;
    stationName?: string;
    address?: string;
    phone?: string;
  }) => {
    setIsLoading(true);

    try {
      const user = await authService.register(userData);
      setUser(user);

      toast({
        title: "Registration Successful",
        description: `Welcome to FuelFriendly, ${user.name}!`,
        duration: 3000,
      });
    } catch (error) {
      console.error('Registration error:', error);

      toast({
        title: "Registration Failed",
        description: "Could not create your account. Please try again.",
        variant: "destructive",
        duration: 5000,
      });

      throw error;
    } finally {
      setIsLoading(false);
=======
      setIsLoading(false);
      return false;
>>>>>>> fc50f12d78601307538b9c65c6925970812ed209
    }
  };

  // Logout function
  const logout = () => {
<<<<<<< HEAD
    authService.logout();
    setUser(null);

    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
      duration: 3000,
    });
  };

  // Check if user has required role
  const hasRole = (requiredRole: UserRole): boolean => {
    return !!user && user.role >= requiredRole;
  };

  // Function to elevate a user to superior admin
  const elevateToSuperiorAdmin = (accessCode: string): boolean => {
    if (accessCode !== SUPERIOR_ADMIN_CODE || !user) {
      toast({
        title: "Access Denied",
        description: "Invalid superior admin access code.",
        variant: "destructive",
        duration: 5000,
      });
      return false;
    }

    // In a real app, this would be an API call
    const updatedUser = {
      ...user,
      role: UserRole.SuperiorAdmin
    };

    setUser(updatedUser);

    toast({
      title: "Role Elevated",
      description: "You now have Superior Admin privileges.",
      duration: 3000,
    });

    return true;
  };

  // Function to update a user's role (for superior admin)
  const updateUserRole = (userId: string, newRole: UserRole): boolean => {
    // In a real app, this would update the user in a database
    if (!user || user.role !== UserRole.SuperiorAdmin) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to update user roles.",
        variant: "destructive",
        duration: 5000,
      });
      return false;
    }

    // In a real app, this would be an API call

    toast({
      title: "Role Updated",
      description: `User role has been updated successfully.`,
      duration: 3000,
    });

    return true;
=======
    localStorage.removeItem('fuelFriendlyUser');
    localStorage.removeItem('stationOwnerName'); // For backward compatibility
    setUser(null);
>>>>>>> fc50f12d78601307538b9c65c6925970812ed209
  };

  return (
    <AuthContext.Provider
      value={{
        user,
<<<<<<< HEAD
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        hasRole,
        elevateToSuperiorAdmin,
        updateUserRole
=======
        login,
        logout,
        isAuthenticated: !!user,
        isLoading
>>>>>>> fc50f12d78601307538b9c65c6925970812ed209
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);
