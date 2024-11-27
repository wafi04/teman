import { Children } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { LoginPage } from "../pages/auth/login";
import { Register } from "../pages/auth/register";
import { Dashboard } from "../pages/dashboard/Dashboard";
import { DashboardCheckout } from "../pages/dashboard/DashboardCheckout";
import { DashboardHome } from "../pages/dashboard/DashboardHome";
import { DashboardNotifications } from "../pages/dashboard/DashboardNotifications";
import { DashboardProducts } from "../pages/dashboard/DashboardProducts";
import { DashboardCategory } from "../pages/dashboard/Dashboard_Category";
import { DashboardCart } from "../pages/dashboard/DashoardCart";
import { ProductId } from "../pages/p/ProductId";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/p/:id",
    element: <ProductId />,
  },

  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "category",
        element: <DashboardCategory />,
      },
      {
        path: "products",
        element: <DashboardProducts />,
      },
      {
        path: "cart",
        element: <DashboardCart />,
      },
      {
        path: "checkout",
        element: <DashboardCheckout />,
      },
      {
        path: "notifications",
        element: <DashboardNotifications />,
      },
    ],
  },
]);
