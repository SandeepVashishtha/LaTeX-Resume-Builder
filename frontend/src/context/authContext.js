import React, { createContext, useState, useEffect } from 'react';
import authService from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(authService.getCurrentUser());

    const login = async (email, password) => {
        const loggedInUser = await authService.login(email, password);
        setUser(loggedInUser);
    };

    const register = async (username, email, password) => {
        await authService.register(username, email, password);
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    useEffect(() => {
        setUser(authService.getCurrentUser());
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
