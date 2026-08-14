import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // =========================
  // USER
  // =========================

  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("BitMart_user");

      return saved ? JSON.parse(saved) : null;
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

    localStorage.setItem("BitMart_user", JSON.stringify(userData));

    localStorage.setItem("BitMart_token", jwtToken);
  };

  // =========================
  // REGISTER
  // =========================
  // Registration does NOT login the user.
  // User must verify email first.

  const register = (userData) => {
    console.log("Registration successful:", userData);
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
    setUser((prev) => {
      if (!prev) {
        return prev;
      }

      const next = {
        ...prev,
        ...updatedFields,
      };

      localStorage.setItem("BitMart_user", JSON.stringify(next));

      return next;
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

export const useAuth = () => useContext(AuthContext);
