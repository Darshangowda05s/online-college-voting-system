import StatsCards from "../../components/admin/StatsCards";
import QuickActions from "../../components/admin/QuickActions";
import RecentActivity from "../../components/admin/RecentActivity";

export default function DashboardHome({
  openCreateElection,
}) {
  return (
    <div className="dashboard-home">

      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome back, Admin 👋</p>
      </div>

      <StatsCards />

      <QuickActions
        openCreateElection={openCreateElection}
      />

      <RecentActivity />

    </div>
  );
}