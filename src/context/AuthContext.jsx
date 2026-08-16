import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // =========================
  // USER
  // =========================

  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("BitMart_user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("Error loading saved user:", error);
      return null;
    }
  });

  // =========================
  // TOKEN
  // =========================

  const [token, setToken] = useState(() => {
    return localStorage.getItem("BitMart_token") || null;
  });

  // =========================
  // LOGIN STATUS
  // =========================

  const isLoggedIn = !!token;

  // =========================
  // LOGIN
  // =========================

  const login = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);

    localStorage.setItem(
      "BitMart_user",
      JSON.stringify(userData)
    );

    localStorage.setItem(
      "BitMart_token",
      jwtToken
    );
  };

  // =========================
  // REGISTER
  // =========================

  const register = (userData, jwtToken) => {
    login(userData, jwtToken);
  };

  // =========================
  // LOGOUT
  // =========================

  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("BitMart_user");
    localStorage.removeItem("BitMart_token");
  };

  // =========================
  // UPDATE PROFILE
  // =========================

  const updateProfile = (updatedFields) => {
    setUser((prevUser) => {
      if (!prevUser) {
        return null;
      }

      const updatedUser = {
        ...prevUser,
        ...updatedFields,
      };

      localStorage.setItem(
        "BitMart_user",
        JSON.stringify(updatedUser)
      );

      return updatedUser;
    });
  };

  // =========================
  // CONTEXT
  // =========================

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoggedIn,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// =========================
// CUSTOM HOOK
// =========================

export const useAuth = () => {
  return useContext(AuthContext);
};