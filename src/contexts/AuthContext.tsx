// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import AuthAPI from "@/lib/api/types/auth";

export type UserRole = "admin" | "user" | "instructor" | "superadmin";

export interface User {
  id: string;
  email: string;
  fullName?: string;
  role: UserRole;
  [key: string]: any;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (identifier: string, password: string) => Promise<void>;
  logout: (logoutAll?: boolean) => Promise<void>;
  refreshAccessToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("edulearn_user");
    if (storedUser) setUser(JSON.parse(storedUser));
    setIsLoading(false);
  }, []);

  /** 🔐 LOGIN — matches `/api/v1/auth/login` */
  const login = async (identifier: string, password: string) => {
    setIsLoading(true);
    try {
      const payload = {
        identifier,
        password,
        deviceId: "web-client",
        rememberMe: true,
      };
      const data = await AuthAPI.login(payload);

      console.log("✅ Login Response:", data);

      if (data?.accessToken) localStorage.setItem("access_token", data.accessToken);
      if (data?.refreshToken) localStorage.setItem("refresh_token", data.refreshToken);
      if (data?.user) {
        localStorage.setItem("edulearn_user", JSON.stringify(data.user));
        setUser(data.user);
      }
    } catch (err) {
      console.error("❌ Login failed:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  /** 🚪 LOGOUT — matches `/api/v1/auth/logout` */
  const logout = async (logoutAll: boolean = false) => {
    const refreshToken = localStorage.getItem("refresh_token");
    try {
      if (refreshToken) {
        await AuthAPI.logout({
          refreshToken,
          logoutFromAllDevices: logoutAll,
        });
      }
    } catch (err) {
      console.warn("⚠️ Logout API error:", err);
    } finally {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("edulearn_user");
      setUser(null);
    }
  };

  /** ♻️ REFRESH TOKEN — matches `/api/v1/auth/refresh-token` */
  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) return;

    try {
      const data = await AuthAPI.refreshToken({ refreshToken });
      if (data?.accessToken) localStorage.setItem("access_token", data.accessToken);
    } catch (err) {
      console.warn("⚠️ Failed to refresh token:", err);
      await logout(); // clean up if refresh fails
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, refreshAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

/** 🔸 Hook for easy access to Auth context */
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};
