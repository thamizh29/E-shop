import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  register: (userData: Omit<User, 'id' | 'role'> & { password: string }) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<{ success: boolean; message: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for stored auth data on mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication - in real app, this would be an API call
    if (email === 'admin@example.com' && password === 'admin123') {
      const userData: User = {
        id: '1',
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'admin'
      };
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(userData));
      return { success: true, message: 'Login successful' };
    } else if (email === 'user@example.com' && password === 'user123') {
      const userData: User = {
        id: '2',
        name: 'John Doe',
        email: 'user@example.com',
        role: 'user',
        address: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'USA'
        }
      };
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(userData));
      return { success: true, message: 'Login successful' };
    }
    
    return { success: false, message: 'Invalid credentials. Try admin@example.com/admin123 or user@example.com/user123' };
  };

  const register = async (userData: Omit<User, 'id' | 'role'> & { password: string }): Promise<{ success: boolean; message: string }> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock registration
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      role: 'user',
      address: userData.address
    };
    
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(newUser));
    
    return { success: true, message: 'Registration successful' };
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  const updateProfile = async (userData: Partial<User>): Promise<{ success: boolean; message: string }> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return { success: true, message: 'Profile updated successfully' };
    }
    
    return { success: false, message: 'User not found' };
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      login,
      register,
      logout,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};