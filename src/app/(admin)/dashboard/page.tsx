import { AdminOverview } from "@/components/sections/AdminOverview";
import { chartPoints, kpiMetrics, quickActions, recentActivity, recentRecords } from "@/data/sample";

export default function DashboardPage() {
  return <AdminOverview metrics={kpiMetrics} chartPoints={chartPoints} activity={recentActivity} records={recentRecords} actions={quickActions} />;
}
