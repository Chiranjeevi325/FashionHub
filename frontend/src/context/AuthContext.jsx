import React, { createContext, useContext, useState, useEffect } from 'react';
import { STORAGE_KEYS, USER_ROLES } from '../utils/constants';
import authService from '../services/authService';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem(STORAGE_KEYS.USER);
    const savedToken = localStorage.getItem(STORAGE_KEYS.TOKEN);
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setAccessToken(savedToken);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const data = await authService.login({ email, password });
      setUser(data);
      setAccessToken(data.accessToken);
      // Persist both user and token
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify({
        _id: data._id,
        name: data.name,
        email: data.email,
        role: data.role
      }));
      localStorage.setItem(STORAGE_KEYS.TOKEN, data.accessToken);
      toast.success('Successfully logged in!');
      return data;
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed. Please check your credentials.';
      toast.error(message);
      throw error;
    }
  };

  const signup = async (name, email, password, role) => {
    try {
      const data = await authService.signup({ name, email, password, role });
      toast.success('Account created! Please login.');
      return data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to create account. Try again later.';
      toast.error(message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setAccessToken(null);
      localStorage.removeItem(STORAGE_KEYS.USER);
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      toast.success('Signed out');
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, accessToken, loading, login, logout, signup, setAccessToken }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
