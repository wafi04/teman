import { createContext, useContext, useEffect, useState } from "react";
import { useProfile } from "../api/user";
import { UserData } from "../types/user";

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserData | null;
  isLoading: boolean;
  error: Error | null;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const getInitialAuthState = (): boolean => {
  // Check if token exists in localStorage
  const token = localStorage.getItem("token");
  return !!token;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Initialize isAuthenticated based on token existence
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    getInitialAuthState()
  );

  const {
    data: user,
    isLoading,
    isError,
    error,
    // Add enabled option to prevent unnecessary profile fetch if not authenticated
  } = useProfile();

  useEffect(() => {
    // Update authentication state based on profile response
    if (isLoading) {
      // Don't update state while loading
      return;
    }

    if (user && user.status) {
      setIsAuthenticated(true);
    } else if (!isLoading && (isError || !user)) {
      // Only set to false if we're not loading and either have an error or no user
      setIsAuthenticated(false);
      // Optionally clear token if profile fetch fails
      localStorage.removeItem("token");
    }
  }, [user, isLoading, isError]);

  // Combine loading states
  const isInitialLoading = isAuthenticated && isLoading;
  const isAdmin = user?.data?.role === "admin" || false;

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user: user?.data || null,
        isLoading: isInitialLoading,
        error: error || null,
        isAdmin,
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

// Optional: Add logout function if needed
export const logout = () => {
  localStorage.removeItem("token");
  // You might want to add other cleanup here
  window.location.href = "/auth/login";
};
