import React, { createContext, useContext, useState } from 'react';
import jwtDecode from 'jwt-decode';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(() => {
        const token = localStorage.getItem('token');
        if (token) {
            return jwtDecode(token);
        }
        return null;
    });

    const login = (token) => {
        localStorage.setItem('token', token);
        setCurrentUser(jwtDecode(token));
    }

    const logout = () => {
        localStorage.removeItem('token');
        setCurrentUser(null);
    }

    const contextValue = {
        currentUser,
        login,
        logout,
        setCurrentUser
    };

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}