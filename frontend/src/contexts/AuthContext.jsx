import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      if (storedToken) setToken(storedToken);
      if (storedUser) setUser(JSON.parse(storedUser));
    } catch (e) {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async ({ email, password }) => {
    const res = await api.post('auth/login', { email, password });
    const receivedToken = res.data?.token || res.data?.accessToken || null;
    const receivedUser = res.data?.user || res.data?.usuario || null;

    if (receivedToken) {
      setToken(receivedToken);
      try {
        localStorage.setItem('token', receivedToken);
      } catch (e) {}
    }

    setUser(receivedUser || null);
    try {
      localStorage.setItem('user', JSON.stringify(receivedUser || null));
    } catch (e) {}
    return res;
  };

  const register = async ({ nombre, email, password }) => {
    const res = await api.post('auth/register', { nombre, email, password });
    const receivedToken = res.data?.token || res.data?.accessToken || null;
    const receivedUser = res.data?.user || res.data?.usuario || null;

    if (receivedToken) {
      setToken(receivedToken);
      try {
        localStorage.setItem('token', receivedToken);
      } catch (e) {}
    }

    setUser(receivedUser || null);
    try {
      localStorage.setItem('user', JSON.stringify(receivedUser || null));
    } catch (e) {}
    return res;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } catch (e) {}
    if (typeof window !== 'undefined') window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;
