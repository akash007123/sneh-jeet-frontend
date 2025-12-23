import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

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
    delete axios.defaults.headers.common['Authorization'];
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    }
    setLoading(false);

    // Add response interceptor to handle 401
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          logout();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, { email, password });
      const { user: userData, token: newToken } = response.data;
      setUser(userData);
      setToken(newToken);
      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(userData));
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
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

    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/signup`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    const { user: userData, token: newToken } = response.data;
    setUser(userData);
    setToken(newToken);
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(userData));
    axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
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

    const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/users/${user?.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    const updatedUser = response.data;
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const value: AuthContextType = {
    user,
    token,
    loading,
    login,
    signup,
    updateProfile,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};