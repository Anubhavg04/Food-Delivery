import React, { createContext, useState } from 'react';
type User = { id: string; name: string; email: string } | null;
type AuthContextType = { user: User; token: string | null; login: (t: string, u: User) => void; logout: () => void; };
export const AuthContext = createContext<AuthContextType | null>(null);
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [user, setUser] = useState<User>(() => {
    const raw = localStorage.getItem('user'); return raw ? JSON.parse(raw) : null;
  });
  const login = (t: string, u: User) => { setToken(t); setUser(u); localStorage.setItem('token', t); if (u) localStorage.setItem('user', JSON.stringify(u)); };
  const logout = () => { setToken(null); setUser(null); localStorage.removeItem('token'); localStorage.removeItem('user'); };
  return <AuthContext.Provider value={{ user, token, login, logout }}>{children}</AuthContext.Provider>;
};
