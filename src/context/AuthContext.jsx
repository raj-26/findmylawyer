import React, { createContext, useContext, useState, useCallback } from 'react';

// Create the auth context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: 'lawyer_001',
    name: '',
    email: '',
    phone: '',
    specialization: '',
    experience: 8,
    location: '',
    rating: 4.8,
    reviews: 127,
    avatar: '',
    languages: ['Hindi', 'English'],
    verified: false,
    age: '',
    college: '',
    panCard: '',
    workplace: '',
    barCouncilNo: '',
    profilePhoto: '',
    address: '',
    workAddress: '',
    lawyerLicence: '',
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
