import React, { createContext, useContext, useState, useEffect } from 'react';

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
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
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
        role: UserRole.User,
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

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        isLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);
