import { Outlet } from "react-router-dom";
import { AuthLayout, ProtectedLayout } from "../layouts/AuthLayout";
import Sidebar from "../layouts/Sidebar";

export function Dashboard() {
  return (
    <ProtectedLayout title="Dashboard" className="overflow-hidden h-screen">
      <Sidebar>
        <Outlet />
      </Sidebar>
    </ProtectedLayout>
  );
}
