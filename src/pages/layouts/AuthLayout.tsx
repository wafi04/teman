import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Navbar } from "./Navbar";
import { useAuth } from "../../provider/AuthProvider";
import { LoadingOverlay } from "../../components/ui/skeleton/LoadingSkeleton";
import { pageTransition, pageVariants } from "../../utils/pageVariants";

type LayoutType = "public" | "auth" | "protected";

interface BaseLayoutProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

interface LayoutProps extends BaseLayoutProps {
  layoutType: LayoutType;
}

const getRedirectPath = (
  isAuthenticated: boolean,
  hasProfile: boolean,
  layoutType: LayoutType,
  currentPath: string
): string | null => {
  if (layoutType === "protected" && !isAuthenticated) {
    return "/auth/login";
  }

  if (layoutType === "auth" && isAuthenticated && hasProfile) {
    return "/dashboard";
  }

  return null;
};

export function MainLayout({
  children,
  className = "",
  title = "Aplikasi",
  layoutType,
}: LayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isLoading, user } = useAuth();
  const hasProfile = Boolean(user);

  // Update page title
  useEffect(() => {
    document.title = title;
  }, [title]);

  // Handle redirects only after loading is complete
  useEffect(() => {
    // Don't do anything while loading
    if (isLoading) {
      return;
    }

    const redirectPath = getRedirectPath(
      isAuthenticated,
      hasProfile,
      layoutType,
      location.pathname
    );

    // Only redirect if we have a path and it's different from current
    if (redirectPath && redirectPath !== location.pathname) {
      navigate(redirectPath, {
        replace: true,
        state: { from: location.pathname },
      });
    }
  }, [
    isAuthenticated,
    isLoading,
    hasProfile,
    navigate,
    layoutType,
    location.pathname,
  ]);

  // Show loading overlay while checking auth status for protected routes
  if (layoutType === "protected" && isLoading) {
    return <LoadingOverlay />;
  }

  // Don't render protected content until loading is complete and auth is verified
  if (
    layoutType === "protected" &&
    !isLoading &&
    (!isAuthenticated || !hasProfile)
  ) {
    return null;
  }

  // Don't render auth pages if already authenticated
  if (layoutType === "auth" && !isLoading && isAuthenticated && hasProfile) {
    return null;
  }

  const showNavbar = layoutType !== "auth";

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className={className}>
      {showNavbar && <Navbar />}
      {children}
    </motion.div>
  );
}

export function ProtectedLayout({ children, ...props }: BaseLayoutProps) {
  return (
    <MainLayout layoutType="protected" {...props}>
      {children}
    </MainLayout>
  );
}

export function AuthLayout({ children, ...props }: BaseLayoutProps) {
  return (
    <MainLayout layoutType="auth" {...props}>
      {children}
    </MainLayout>
  );
}

export function PublicLayout({ children, ...props }: BaseLayoutProps) {
  return (
    <MainLayout layoutType="public" {...props}>
      {children}
    </MainLayout>
  );
}
