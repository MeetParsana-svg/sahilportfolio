import React, { createContext, useContext, useState, useEffect } from "react";

const ADMIN_EMAIL = "shubham@sangani.com";
const ADMIN_PASS = "shubham123";
const AUTH_KEY = "sahil_admin_auth_v1";

const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return localStorage.getItem(AUTH_KEY) === "true";
    } catch {
      return false;
    }
  });

  const [adminUser, setAdminUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("sahil_admin_user");
      return savedUser
        ? JSON.parse(savedUser)
        : isAuthenticated
        ? { email: ADMIN_EMAIL, name: "Shubham Sangani", role: "Super Admin" }
        : null;
    } catch {
      return null;
    }
  });

  const login = (email, password) => {
    const cleanEmail = (email || "").trim().toLowerCase();
    if (cleanEmail === ADMIN_EMAIL && password === ADMIN_PASS) {
      const user = {
        email: ADMIN_EMAIL,
        name: "Shubham Sangani",
        role: "Super Admin",
        loginTime: new Date().toISOString(),
      };
      setIsAuthenticated(true);
      setAdminUser(user);
      localStorage.setItem(AUTH_KEY, "true");
      localStorage.setItem("sahil_admin_user", JSON.stringify(user));
      return { success: true };
    } else {
      return {
        success: false,
        error: "Invalid email ID or password. Please verify credentials.",
      };
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAdminUser(null);
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem("sahil_admin_user");
  };

  return (
    <AdminAuthContext.Provider
      value={{
        isAuthenticated,
        adminUser,
        login,
        logout,
        adminEmail: ADMIN_EMAIL,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
};
