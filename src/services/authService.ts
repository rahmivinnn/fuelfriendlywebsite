import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { UserRole } from '@/contexts/AuthContext';

// API URL
const API_URL = import.meta.env.VITE_API_URL || 'https://api.fuelfriendly.com';

// Token storage keys
const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

// Token types
export interface JwtToken {
  sub: string;
  email: string;
  name: string;
  role: UserRole;
  stationId?: string;
  exp: number;
  iat: number;
}

// User type
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  stationId?: string;
}

// Auth service
const authService = {
  // Login user
  login: async (email: string, password: string): Promise<User> => {
    try {
      // In a real app, this would be an API call
      // For demo purposes, we'll simulate a successful login with mock data
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check credentials (mock validation)
      if (email === 'admin@fuelfriendly.com' && password === 'admin123') {
        // Create mock tokens
        const user: User = {
          id: '1',
          email: 'admin@fuelfriendly.com',
          name: 'Admin User',
          role: UserRole.SuperiorAdmin
        };
        
        // Create JWT token (mock)
        const accessToken = createMockJwt(user, '1h');
        const refreshToken = createMockJwt(user, '7d');
        
        // Store tokens
        localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
        localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
        
        return user;
      } else if (email === 'station@fuelfriendly.com' && password === 'station123') {
        // Create mock tokens for station user
        const user: User = {
          id: '2',
          email: 'station@fuelfriendly.com',
          name: 'Station Manager',
          role: UserRole.Level2,
          stationId: 'station-123'
        };
        
        // Create JWT token (mock)
        const accessToken = createMockJwt(user, '1h');
        const refreshToken = createMockJwt(user, '7d');
        
        // Store tokens
        localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
        localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
        
        return user;
      } else if (email === 'user@fuelfriendly.com' && password === 'user123') {
        // Create mock tokens for regular user
        const user: User = {
          id: '3',
          email: 'user@fuelfriendly.com',
          name: 'Regular User',
          role: UserRole.Level1
        };
        
        // Create JWT token (mock)
        const accessToken = createMockJwt(user, '1h');
        const refreshToken = createMockJwt(user, '7d');
        
        // Store tokens
        localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
        localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
        
        return user;
      }
      
      throw new Error('Invalid credentials');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  
  // Register user
  register: async (userData: {
    email: string;
    password: string;
    name: string;
    stationName?: string;
    address?: string;
    phone?: string;
  }): Promise<User> => {
    try {
      // In a real app, this would be an API call
      // For demo purposes, we'll simulate a successful registration
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create mock user
      const user: User = {
        id: Math.random().toString(36).substring(2, 9),
        email: userData.email,
        name: userData.name,
        role: userData.stationName ? UserRole.Level2 : UserRole.Level1,
        stationId: userData.stationName ? `station-${Math.random().toString(36).substring(2, 9)}` : undefined
      };
      
      // Create JWT token (mock)
      const accessToken = createMockJwt(user, '1h');
      const refreshToken = createMockJwt(user, '7d');
      
      // Store tokens
      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
      
      return user;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },
  
  // Logout user
  logout: (): void => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },
  
  // Get current user
  getCurrentUser: (): User | null => {
    try {
      const token = localStorage.getItem(ACCESS_TOKEN_KEY);
      
      if (!token) {
        return null;
      }
      
      // Decode token
      const decoded = jwtDecode<JwtToken>(token);
      
      // Check if token is expired
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        // Token is expired, try to refresh
        return null;
      }
      
      // Return user data
      return {
        id: decoded.sub,
        email: decoded.email,
        name: decoded.name,
        role: decoded.role,
        stationId: decoded.stationId
      };
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  },
  
  // Refresh token
  refreshToken: async (): Promise<string | null> => {
    try {
      const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
      
      if (!refreshToken) {
        return null;
      }
      
      // In a real app, this would be an API call to refresh the token
      // For demo purposes, we'll simulate a successful token refresh
      
      // Decode refresh token
      const decoded = jwtDecode<JwtToken>(refreshToken);
      
      // Check if refresh token is expired
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        // Refresh token is expired, user needs to login again
        authService.logout();
        return null;
      }
      
      // Create new access token
      const user: User = {
        id: decoded.sub,
        email: decoded.email,
        name: decoded.name,
        role: decoded.role,
        stationId: decoded.stationId
      };
      
      // Create new access token
      const newAccessToken = createMockJwt(user, '1h');
      
      // Store new access token
      localStorage.setItem(ACCESS_TOKEN_KEY, newAccessToken);
      
      return newAccessToken;
    } catch (error) {
      console.error('Refresh token error:', error);
      return null;
    }
  },
  
  // Get access token
  getAccessToken: (): string | null => {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },
  
  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!authService.getCurrentUser();
  },
  
  // Check if user has required role
  hasRole: (requiredRole: UserRole): boolean => {
    const user = authService.getCurrentUser();
    return !!user && user.role >= requiredRole;
  }
};

// Create a mock JWT token for demo purposes
function createMockJwt(user: User, expiresIn: string): string {
  // Calculate expiration time
  const now = Math.floor(Date.now() / 1000);
  const expiresInSeconds = expiresIn.includes('h') 
    ? parseInt(expiresIn) * 60 * 60 
    : parseInt(expiresIn) * 24 * 60 * 60;
  
  const exp = now + expiresInSeconds;
  
  // Create token payload
  const payload = {
    sub: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    stationId: user.stationId,
    iat: now,
    exp
  };
  
  // In a real app, this would be signed with a secret key
  // For demo purposes, we'll just encode it to base64
  const encodedPayload = btoa(JSON.stringify(payload));
  
  // Create a mock JWT token (header.payload.signature)
  return `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${encodedPayload}.mockSignature`;
}

// Set up axios interceptors for JWT authentication
axios.interceptors.request.use(
  async (config) => {
    const token = authService.getAccessToken();
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If error is 401 Unauthorized and we haven't tried to refresh the token yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      // Try to refresh the token
      const newToken = await authService.refreshToken();
      
      if (newToken) {
        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axios(originalRequest);
      }
    }
    
    return Promise.reject(error);
  }
);

export default authService;
