'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authApi } from '@/lib/api';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated on mount
    const checkAuth = async () => {
      try {
        const accessToken = sessionStorage.getItem('accessToken');
        if (accessToken) {
          // You could validate the token here or fetch user data
          // For now, we'll just set loading to false
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authApi.getInstance().post('/auth/login', {
        email,
        password,
      });

      if (response.data.success) {
        const { accessToken, user: userData } = response.data.data;
        sessionStorage.setItem('accessToken', accessToken);
        authApi.setToken(accessToken);
        setUser(userData);
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Login failed. Please check your credentials and try again.';
      throw new Error(errorMessage);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await authApi.getInstance().post('/auth/register', {
        name,
        email,
        password,
      });

      if (response.data.success) {
        // Registration successful, redirect to login
        window.location.href = '/login';
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Registration failed. Please try again.';
      throw new Error(errorMessage);
    }
  };

  const logout = async () => {
    try {
      await authApi.getInstance().post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      sessionStorage.removeItem('accessToken');
      authApi.clearToken();
      setUser(null);
      window.location.href = '/login';
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
