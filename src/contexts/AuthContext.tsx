import React, { createContext, useContext, useState, useEffect } from 'react';

// Define user roles with numeric values for easy comparison
export enum UserRole {
  Guest = 0,
  Level1 = 1,
  Level2 = 2,
  Level3 = 3,
  SuperiorAdmin = 4
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
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  elevateToSuperiorAdmin: (accessCode: string) => boolean;
  updateUserRole: (userId: string, newRole: UserRole) => boolean;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => false,
  logout: () => {},
  isAuthenticated: false,
  isLoading: true,
  elevateToSuperiorAdmin: () => false,
  updateUserRole: () => false,
});

// Superior admin access code
const SUPERIOR_ADMIN_CODE = "FUEL-SUPERIOR-2023";

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
  }, []);

  // Login function
  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call
      // For now, we'll simulate a successful login with a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a new user object
      const newUser: User = {
        id: Math.random().toString(36).substring(2, 9),
        name: email.split('@')[0], // Use part of email as name
        email,
        role,
        lastLogin: new Date().toISOString(),
      };
      
      // Save user to localStorage
      localStorage.setItem('fuelFriendlyUser', JSON.stringify(newUser));
      localStorage.setItem('stationOwnerName', newUser.name); // For backward compatibility
      
      // Update state
      setUser(newUser);
      setIsLoading(false);
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('fuelFriendlyUser');
    localStorage.removeItem('stationOwnerName'); // For backward compatibility
    setUser(null);
  };

  // Function to elevate a user to superior admin
  const elevateToSuperiorAdmin = (accessCode: string): boolean => {
    if (accessCode !== SUPERIOR_ADMIN_CODE || !user) {
      return false;
    }
    
    const updatedUser = {
      ...user,
      role: UserRole.SuperiorAdmin
    };
    
    localStorage.setItem('fuelFriendlyUser', JSON.stringify(updatedUser));
    setUser(updatedUser);
    return true;
  };

  // Function to update a user's role (for superior admin)
  const updateUserRole = (userId: string, newRole: UserRole): boolean => {
    // In a real app, this would update the user in a database
    // For this demo, we'll only allow updating the current user
    if (!user || user.id !== userId || user.role !== UserRole.SuperiorAdmin) {
      return false;
    }
    
    const updatedUser = {
      ...user,
      role: newRole
    };
    
    localStorage.setItem('fuelFriendlyUser', JSON.stringify(updatedUser));
    setUser(updatedUser);
    return true;
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        login, 
        logout, 
        isAuthenticated: !!user,
        isLoading,
        elevateToSuperiorAdmin,
        updateUserRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);
