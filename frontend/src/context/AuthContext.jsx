import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios'; // Make sure to run 'npm install axios'

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // To check initial auth status

    // Effect to check for user in localStorage on initial app load
    useEffect(() => {
        try {
            const storedUser = localStorage.getItem('bookbytes_admin');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        } catch (error) {
            console.error("Failed to parse user from localStorage", error);
            // If parsing fails, ensure user is logged out
            localStorage.removeItem('bookbytes_admin');
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, []);

    const login = async (username, password) => {
        // In a real app, use the full URL from an environment variable
        const API_URL = 'http://localhost:5000/api/auth/login'; // Adjust if your port/route is different
        
        const response = await axios.post(API_URL, { username, password });
        
        if (response.data.status === 'success') {
            const userData = response.data.user;
            setUser(userData);
            localStorage.setItem('bookbytes_admin', JSON.stringify(userData));
        }
        // Axios will automatically throw an error for non-2xx responses,
        // which we can catch in the component.
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('bookbytes_admin');
        // You might want to redirect to the login page here
        // window.location.href = '/admin/login'; 
    };

    const value = {
        user,
        login,
        logout,
        isAuthenticated: !!user, // A handy boolean flag
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to easily use the auth context in other components
export const useAuth = () => {
    return useContext(AuthContext);
};
