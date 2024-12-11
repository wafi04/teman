import {
  Home,
  BarChart,
  ShoppingBag,
  ShoppingCart,
  Bell,
  Layers,
} from "lucide-react";

export const menuItems = [
  {
    icon: Home,
    label: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: Layers,
    label: "Categories",
    path: "/dashboard/category",
    adminOnly: true,
  },
  {
    icon: BarChart,
    label: "Products",
    path: "/dashboard/products",
    adminOnly: true,
  },
  {
    icon: ShoppingBag,
    label: "Cart",
    path: "/dashboard/cart",
    adminOnly: false,
  },
  {
    icon: ShoppingCart,
    label: "Checkout",
    path: "/dashboard/checkout",
  },
  {
    icon: Bell,
    label: "Notifications",
    path: "/dashboard/notifications",
  },
];

// Helper function to filter menu items based on user role
export const getFilteredMenuItems = (isAdmin: boolean) => {
  return menuItems.filter((item) => {
    if (item.adminOnly === undefined) return true;
    if (item.adminOnly === true) return isAdmin;
    if (item.adminOnly === false) return !isAdmin;

    return false;
  });
};
