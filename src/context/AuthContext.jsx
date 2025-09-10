import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // Abhi ke liye, hum ek hi user state rakhenge.
  // Asli app mein, yeh users ki ek list ho sakti hai.
  const [user, setUser] = useState(null);
const login = (userData) => {
    const mockUser = {
      id: Date.now(),
      name: userData.name,
      role: userData.role,
      location: userData.location,
      points: Math.floor(Math.random() * 200), // Shuru mein random points
    };
    setUser(mockUser);
  };

  const logout = () => { setUser(null); };

  // Naya function: User ke points badhane ke liye
  const addPoints = (pointsToAdd) => {
    if (user) {
      setUser(currentUser => ({
        ...currentUser,
        points: currentUser.points + pointsToAdd,
      }));
    }
  };
   const value = { user, isAuthenticated: !!user, login, logout, addPoints };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
