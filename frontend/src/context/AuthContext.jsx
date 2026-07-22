import { createContext, useContext, useEffect, useState } from "react";
import {
  login as loginUser,
  logout as logoutUser,
  register as registerUser,
  getCurrentUser,
  changePassword as changePasswordService,
} from "../services/authService";

async function changePassword(passwords) {
    const { data } = await changePasswordService(passwords);
    return data;
}



const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const { data } = await getCurrentUser();
      setUser(data.user);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function login(credentials) {
    const { data } = await loginUser(credentials);
    setUser(data.user);
    return data;
  }

  async function register(userData) {
    const { data } = await registerUser(userData);
    setUser(data.user);
    return data;
  }

  async function logout() {
    await logoutUser();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        checkAuth,
        isAuthenticated: !!user,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}