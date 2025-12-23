// frontend/src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api/api";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  // ---------------- Initial check ----------------
  useEffect(() => {
    const init = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await api.get("/auth/me", { token });
        if (res.id) setUser(res);
      } catch (err) {
        console.error("ME CHECK FAILED:", err);
        setToken(null);
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [token]);

  // ---------------- Login ----------------
  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      if (res.token) {
        localStorage.setItem("token", res.token);
        setToken(res.token);
        setUser(res.user);
        return { ok: true };
      }
      return { ok: false, message: "Incorrect response" };
    } catch (err) {
      return { ok: false, message: err.message || "Login failed" };
    }
  };

  // ---------------- Register ----------------
  const register = async (name, email, password, role = "user") => {
    try {
      const res = await api.post("/auth/register", { name, email, password, role });
      if (res.token) {
        localStorage.setItem("token", res.token);
        setToken(res.token);
        setUser(res.user);
        return { ok: true };
      }
      return { ok: false, message: "Incorrect response" };
    } catch (err) {
      return { ok: false, message: err.message || "Registration failed" };
    }
  };

  // ---------------- Logout ----------------
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
