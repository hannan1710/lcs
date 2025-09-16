import React, { createContext, useContext, useState, useEffect } from 'react';

// Create context with undefined default value for better HMR compatibility
const UserContext = createContext(undefined);

// Custom hook to use the user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user data from localStorage on mount
  useEffect(() => {
    const loadUser = () => {
      try {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          const userData = JSON.parse(savedUser);
          setUser(userData);
        } else {
          // Default user data if no saved user
          const defaultUser = {
            id: 1,
            name: 'Hannan',
            email: 'hannan@example.com',
            phone: '(555) 123-4567',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
            loyaltyPoints: 1250,
            memberSince: '2023-03-15',
            hairType: 'Straight',
            allergies: 'None',
            totalSpent: 230,
            upcomingAppointments: 1
          };
          setUser(defaultUser);
          localStorage.setItem('user', JSON.stringify(defaultUser));
        }
      } catch (error) {
        console.error('Error loading user data:', error);
        // Set default user on error
        const defaultUser = {
          id: 1,
          name: 'Hannan',
          email: 'hannan@example.com',
          phone: '(555) 123-4567',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
          loyaltyPoints: 1250,
          memberSince: '2023-03-15',
          hairType: 'Straight',
          allergies: 'None',
          totalSpent: 230,
          upcomingAppointments: 1
        };
        setUser(defaultUser);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  // Save user data to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  const updateUser = (updates) => {
    setUser(prev => ({
      ...prev,
      ...updates,
      updatedAt: new Date().toISOString()
    }));
  };

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const addLoyaltyPoints = (points) => {
    setUser(prev => ({
      ...prev,
      loyaltyPoints: (prev.loyaltyPoints || 0) + points
    }));
  };

  const redeemReward = (points) => {
    setUser(prev => ({
      ...prev,
      loyaltyPoints: Math.max(0, (prev.loyaltyPoints || 0) - points)
    }));
  };

  const value = {
    user,
    isLoading,
    updateUser,
    login,
    logout,
    addLoyaltyPoints,
    redeemReward,
    setUser
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

// Add display name for better debugging and HMR
UserProvider.displayName = 'UserProvider';



