import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api, setApiAuthToken } from '@/services/apiClient';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  profilePic?: string;
  mobile?: string;
  isActive: boolean;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, role: string, mobile?: string, profilePic?: File) => Promise<void>;
  updateProfile: (name: string, email: string, password?: string, profilePic?: File, mobile?: string) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setApiAuthToken(null);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      setApiAuthToken(storedToken);
    }
    setLoading(false);

    // Add response interceptor to handle 401
    const interceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          logout();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post(`/api/auth/login`, { email, password });
      const { user: userData, token: newToken } = response.data;
      setUser(userData);
      setToken(newToken);
      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(userData));
      setApiAuthToken(newToken);
    } catch (error) {
      throw error;
    }
  };

  const signup = async (name: string, email: string, password: string, role: string, mobile?: string, profilePic?: File) => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('role', role);
    if (mobile) {
      formData.append('mobile', mobile);
    }
    if (profilePic) {
      formData.append('profilePic', profilePic);
    }

    const response = await api.post(`/api/auth/signup`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    const { user: userData, token: newToken } = response.data;
    setUser(userData);
    setToken(newToken);
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(userData));
    setApiAuthToken(newToken);
  };

  const updateProfile = async (name: string, email: string, password?: string, profilePic?: File, mobile?: string) => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    if (password) {
      formData.append('password', password);
    }
    if (profilePic) {
      formData.append('profilePic', profilePic);
    }
    if (mobile) {
      formData.append('mobile', mobile);
    }

    const response = await api.put(`/api/users/${user?.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    const updatedUser = response.data;
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const forgotPassword = async (email: string) => {
    await api.post(`/api/auth/forgot-password`, { email });
  };

  const resetPassword = async (token: string, password: string) => {
    await api.post(`/api/auth/reset-password`, { token, password });
  };

  const value: AuthContextType = {
    user,
    token,
    loading,
    login,
    signup,
    updateProfile,
    logout,
    forgotPassword,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};