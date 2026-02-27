import React, { createContext, useState, useContext, useEffect } from 'react';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    // We'll store the user object { role: 'student' | 'admin' | 'parent' | 'staff', email: '...', id: '...' }
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Hydrate from localStorage for persistence
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (role, email, studentId) => {
        const newUser = { role, email, studentId };
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
