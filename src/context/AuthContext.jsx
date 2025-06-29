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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId');
    
    if (token && userId) {
      setIsAuthenticated(true);
      setUser({ id: userId, token });
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    localStorage.setItem('authToken', userData.token);
    localStorage.setItem('userId', userData.userId);
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};