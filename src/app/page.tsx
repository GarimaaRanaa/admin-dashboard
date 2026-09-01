// page.tsx — the homepage. Add your homepage sections here, one component per section (see PART C of the guideline docx for the exact section order).
import { AdminOverview } from "@/components/sections/AdminOverview";
import { Hero } from "@/components/sections/Hero";
import { Sidebar } from "@/components/project/Sidebar";
import {
  chartPoints,
  dashboardNavItems,
  kpiMetrics,
  quickActions,
  recentActivity,
  recentRecords,
} from "@/data/sample";

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="mx-auto flex max-w-6xl border-x bg-white">
        <div className="hidden lg:block">
          <Sidebar items={dashboardNavItems} />
        </div>
        <div className="min-w-0 flex-1">
          <AdminOverview
            metrics={kpiMetrics}
            chartPoints={chartPoints}
            activity={recentActivity}
            records={recentRecords}
            actions={quickActions}
          />
        </div>
      </div>
    </>
  );
}
