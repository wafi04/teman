import { HeaderDashboard } from "./components/Header";

export function DashboardHome() {
  return (
    <div className="space-y-10 p-6 overflow-auto">
      {/* Dashboard Header */}
      <HeaderDashboard
        title="Dashboard"
        subTitle="Welcome back! Here's your business summary."
      />
    </div>
  );
}
