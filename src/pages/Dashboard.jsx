import StatsCharts from "../components/Dashboard/Charts/StatsCharts";
import { DashboardHeader } from "../components/Dashboard/Header/Header";
import StatsSummary from "../components/Dashboard/Stats/StatsSummary";
import { useGetOrderStats } from "../hooks/useGetOrderStats";

const Dashboard = () => {
  const orderStats = useGetOrderStats();

  return (
    <div style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
      <DashboardHeader />
      <StatsSummary orderStats={orderStats} />
      <StatsCharts orderStats={orderStats} />
    </div>
  );
};

export default Dashboard;
