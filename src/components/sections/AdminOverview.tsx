// AdminOverview.tsx - homepage dashboard flow for Week 2 sections.
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { theme } from "@/config/theme";
import type { ActivityItem, ChartPoint, KpiMetric, QuickAction, RecordItem } from "@/types";

interface AdminOverviewProps {
  metrics: KpiMetric[];
  chartPoints: ChartPoint[];
  activity: ActivityItem[];
  records: RecordItem[];
  actions: QuickAction[];
}

export function AdminOverview({ metrics, chartPoints, activity, records, actions }: AdminOverviewProps) {
  const maxChartValue = Math.max(...chartPoints.map((point) => point.value), 1);

  return (
    <section className="bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div>
          <p className="text-sm font-medium" style={{ color: theme.colors.primary }}>
            Dashboard
          </p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-950">Overview</h2>
              <p className="mt-1 text-sm text-gray-600">
                Reusable homepage sections for every admin theme module.
              </p>
            </div>
            <span className="text-sm text-gray-500">Updated today</span>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => {
            const TrendIcon = metric.trend === "up" ? ArrowUpRight : ArrowDownRight;
            const trendClass = metric.trend === "up" ? "text-emerald-700 bg-emerald-50" : "text-rose-700 bg-rose-50";

            return (
              <Card key={metric.label} className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                  <span className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold ${trendClass}`}>
                    <TrendIcon size={14} />
                    {metric.change}
                  </span>
                </div>
                <p className="text-2xl font-bold text-gray-950">{metric.value}</p>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-950">Weekly Analytics</h3>
                <p className="mt-1 text-sm text-gray-600">Activity volume across the current week.</p>
              </div>
              <span className="rounded-md bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600">Live preview</span>
            </div>
            <div className="mt-6 flex h-56 items-end gap-3">
              {chartPoints.map((point) => (
                <div key={point.label} className="flex flex-1 flex-col items-center gap-2">
                  <div className="flex h-44 w-full items-end rounded-md bg-gray-100">
                    <div
                      className="w-full rounded-md"
                      style={{
                        height: `${(point.value / maxChartValue) * 100}%`,
                        backgroundColor: theme.colors.primary,
                      }}
                    />
                  </div>
                  <span className="text-xs font-medium text-gray-500">{point.label}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-gray-950">Recent Activity</h3>
            <div className="mt-4 space-y-4">
              {activity.map((item) => (
                <div key={item.id} className="border-l-2 pl-4" style={{ borderColor: theme.colors.accent }}>
                  <p className="text-sm font-semibold text-gray-950">{item.title}</p>
                  <p className="mt-1 text-sm text-gray-600">{item.description}</p>
                  <p className="mt-1 text-xs text-gray-400">{item.time}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <Card className="overflow-hidden p-0">
            <div className="border-b px-4 py-3">
              <h3 className="text-lg font-semibold text-gray-950">Recent Records</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100 text-left text-gray-600">
                  <tr>
                    <th className="px-4 py-3 font-semibold">ID</th>
                    <th className="px-4 py-3 font-semibold">Name</th>
                    <th className="px-4 py-3 font-semibold">Type</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((record) => (
                    <tr key={record.id} className="border-t">
                      <td className="px-4 py-3 font-medium text-gray-950">{record.id}</td>
                      <td className="px-4 py-3 text-gray-700">{record.name}</td>
                      <td className="px-4 py-3 text-gray-600">{record.type}</td>
                      <td className="px-4 py-3">
                        <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-700">
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-gray-950">Quick Actions</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {actions.map((action) => {
                const Icon = action.icon;
                return (
                  <a
                    key={action.href}
                    href={action.href}
                    className="flex items-center gap-3 rounded-md border p-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    <span
                      className="inline-flex h-9 w-9 items-center justify-center rounded-md"
                      style={{ backgroundColor: `${theme.colors.primary}14`, color: theme.colors.primary }}
                    >
                      <Icon size={18} />
                    </span>
                    {action.label}
                  </a>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
