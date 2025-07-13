import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check for stored auth data on mount
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (storedUser && token) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      // In real app, replace with actual API call
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const userData = data.user;
        const token = data.token;
        
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', token);
        
        return { success: true, message: 'Login successful' };
      } else {
        const errorData = await response.json();
        return { success: false, message: errorData.message || 'Login failed' };
      }
    } catch (error) {
      // Mock authentication for demo
      if (email === 'admin@example.com' && password === 'admin123') {
        const userData = {
          id: '1',
          name: 'Admin User',
          email: 'admin@example.com',
          role: 'admin'
        };
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', 'mock-admin-token');
        return { success: true, message: 'Login successful' };
      } else if (email === 'user@example.com' && password === 'user123') {
        const userData = {
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
        localStorage.setItem('token', 'mock-user-token');
        return { success: true, message: 'Login successful' };
      }
      
      return { 
        success: false, 
        message: 'Invalid credentials. Try admin@example.com/admin123 or user@example.com/user123' 
      };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      // In real app, replace with actual API call
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        const newUser = data.user;
        const token = data.token;
        
        setUser(newUser);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(newUser));
        localStorage.setItem('token', token);
        
        return { success: true, message: 'Registration successful' };
      } else {
        const errorData = await response.json();
        return { success: false, message: errorData.message || 'Registration failed' };
      }
    } catch (error) {
      // Mock registration for demo
      const newUser = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        role: 'user',
        address: userData.address
      };
      
      setUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(newUser));
      localStorage.setItem('token', 'mock-new-user-token');
      
      return { success: true, message: 'Registration successful' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const updateProfile = async (updatedData) => {
    setLoading(true);
    try {
      // In real app, replace with actual API call
      const token = localStorage.getItem('token');
      const response = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        const data = await response.json();
        const updatedUser = data.user;
        
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        return { success: true, message: 'Profile updated successfully' };
      } else {
        return { success: false, message: 'Failed to update profile' };
      }
    } catch (error) {
      // Mock update for demo
      if (user) {
        const updatedUser = { ...user, ...updatedData };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        return { success: true, message: 'Profile updated successfully' };
      }
      
      return { success: false, message: 'User not found' };
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email) => {
    setLoading(true);
    try {
      // In real app, replace with actual API call
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        return { success: true, message: 'Password reset email sent' };
      } else {
        return { success: false, message: 'Failed to send reset email' };
      }
    } catch (error) {
      // Mock for demo
      return { success: true, message: 'Password reset email sent (demo mode)' };
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      loading,
      login,
      register,
      logout,
      updateProfile,
      forgotPassword
    }}>
      {children}
    </AuthContext.Provider>
  );
};