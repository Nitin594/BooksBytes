import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import API_URL from "../api/api.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // To check initial auth status

  // Effect to check for user and token in localStorage on initial app load
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("bookbytes_admin");
      const storedToken = localStorage.getItem("bookbytes_token");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      // if token exists, set default axios Authorization header
      if (storedToken) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem("bookbytes_admin");
      localStorage.removeItem("bookbytes_token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    // In a real app, use the full URL from an environment variable
    // const API_URL = "http://localhost:5000/api/auth/login";

    const response = await axios.post(`${API_URL}/auth/login`, { email, password });

    // expected backend response: { message, token, user }
    if (response?.data?.token && response?.data?.user) {
      const userData = response.data.user;
      const token = response.data.token;

      setUser(userData);
      localStorage.setItem("bookbytes_admin", JSON.stringify(userData));
      localStorage.setItem("bookbytes_token", token);

      // set default Authorization header for future requests
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      return userData;
    }

    const err = new Error(response?.data?.message || "Login failed");
    err.response = response;
    throw err;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("bookbytes_admin");
    localStorage.removeItem("bookbytes_token");
    delete axios.defaults.headers.common["Authorization"];
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user, // A handy boolean flag
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to easily use the auth context in other components
export const useAuth = () => {
  return useContext(AuthContext);
};
