import { createContext, useContext, useEffect, useState } from "react";
import { useProfile } from "../api/user";
import { UserData } from "../types/user";

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserData | null;
  isLoading: boolean;
  error: Error | null;
  isAdmin: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const getInitialAuthState = (): boolean => {
  const token = localStorage.getItem("token");
  return !!token;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    getInitialAuthState()
  );
  const { data: user, isLoading, isError, error } = useProfile();
  console.log(user);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (user?.status) {
      setIsAuthenticated(true);
    } else if (!isLoading && (isError || !user)) {
      setIsAuthenticated(false);
      localStorage.removeItem("token");
    }
  }, [user, isLoading, isError]);

  const isInitialLoading = isAuthenticated && isLoading;
  const isAdmin = user?.data?.role === "admin";

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user: user?.data || null,
        isLoading: isInitialLoading,
        error: error || null,
        isAdmin,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};
