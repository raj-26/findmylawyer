import React, { createContext, useContext, useState, useCallback } from 'react';

// Create the auth context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: 'lawyer_001',
    name: 'Adv. Rajesh Sharma',
    email: 'rajesh.sharma@findmylawyer.com',
    phone: '+91 9876543210',
    specialization: 'Criminal Law',
    experience: 8,
    location: 'New Delhi',
    rating: 4.8,
    reviews: 127,
    avatar: 'R',
    languages: ['Hindi', 'English', 'Punjabi'],
    verified: true,
  });

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setUser(null);
  }, []);

  const updateProfile = useCallback((updates) => {
    setUser((prev) => ({ ...prev, ...updates }));
  }, []);

  const value = {
    user,
    isAuthenticated,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
