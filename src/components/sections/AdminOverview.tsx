import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, BarChart3, BellRing, Database, Download, FileText, MoreHorizontal, Users } from "lucide-react";
import { Card } from "@/components/ui/Card";
import type { ActivityItem, ChartPoint, KpiMetric, QuickAction, RecordItem } from "@/types";

interface AdminOverviewProps {
  metrics: KpiMetric[];
  chartPoints: ChartPoint[];
  activity: ActivityItem[];
  records: RecordItem[];
  actions: QuickAction[];
}

const metricStyles = [
  { icon: Users, iconClass: "bg-violet-100 text-violet-600", tint: "from-violet-50/70" },
  { icon: FileText, iconClass: "bg-blue-100 text-blue-600", tint: "from-blue-50/70" },
  { icon: BellRing, iconClass: "bg-amber-100 text-amber-600", tint: "from-amber-50/70" },
  { icon: Database, iconClass: "bg-emerald-100 text-emerald-600", tint: "from-emerald-50/70" },
];

export function AdminOverview({ metrics, chartPoints, activity, records, actions }: AdminOverviewProps) {
  const maxChartValue = Math.max(...chartPoints.map((point) => point.value), 1);
  return <section className="space-y-5">
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary">Overview</p><h1 className="mt-1.5 text-2xl font-bold tracking-tight text-slate-950">Dashboard <span aria-hidden="true">👋</span></h1><p className="mt-1 text-[13px] text-slate-500">Here&apos;s what&apos;s happening across your workspace today.</p></div>
      <Link href="/reports" className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-indigo-200 bg-white px-4 py-2.5 text-sm font-semibold text-indigo-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:self-auto"><Download size={17} />View report</Link>
    </div>

    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric, index) => {
        const TrendIcon = metric.trend === "up" ? ArrowUpRight : ArrowDownRight;
        const style = metricStyles[index % metricStyles.length];
        const Icon = style.icon;
        return <div key={metric.label} className={`relative overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-br ${style.tint} to-white p-4 shadow-panel`}>
          <div className="flex items-start justify-between"><span className={`grid h-9 w-9 place-items-center rounded-xl ${style.iconClass}`}><Icon size={18} /></span><Sparkline index={index} negative={metric.trend === "down"} /></div>
          <p className="mt-3.5 text-[12px] font-medium text-slate-500">{metric.label}</p><div className="mt-0.5 flex items-end justify-between gap-2"><p className="text-xl font-bold tracking-tight text-slate-950">{metric.value}</p><span className={`mb-0.5 inline-flex items-center gap-0.5 text-[11px] font-bold ${metric.trend === "up" ? "text-emerald-600" : "text-rose-600"}`}><TrendIcon size={13} />{metric.change}</span></div><p className="mt-0.5 text-[10px] text-slate-400">from last month</p>
        </div>;
      })}
    </div>

    <div className="grid gap-4 xl:grid-cols-[minmax(0,1.55fr)_minmax(280px,0.7fr)]">
      <Card className="min-w-0">
        <PanelHeading icon={BarChart3} title="Workspace activity" subtitle="Volume across the current week" />
        <div className="mt-4 flex items-center gap-5 text-[11px] text-slate-500"><span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-primary" />Completed</span><span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-indigo-200" />In progress</span></div>
        <div className="mt-4 flex h-52 items-end gap-3 border-b border-slate-100 px-1 sm:gap-4">
          {chartPoints.map((point, index) => <div key={point.label} className="flex h-full flex-1 flex-col justify-end gap-2"><div className="group relative flex h-full items-end justify-center"><div className="absolute inset-x-0 bottom-1/4 border-t border-dashed border-slate-100" /><div className="relative flex w-full max-w-12 flex-col justify-end overflow-hidden rounded-t-lg bg-indigo-100 transition group-hover:brightness-95" style={{ height: `${Math.max((point.value / maxChartValue) * 100, 12)}%` }}><div className="bg-gradient-to-t from-[#6655ee] to-[#8171ff]" style={{ height: `${50 + (index % 3) * 8}%` }} /></div><span className="pointer-events-none absolute -top-1 rounded-lg bg-slate-900 px-2 py-1 text-[10px] font-semibold text-white opacity-0 shadow-lg transition group-hover:opacity-100">{point.value} events</span></div><span className="text-center text-xs font-medium text-slate-400">{point.label}</span></div>)}
        </div>
      </Card>

      <Card className="p-0">
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3"><div><h2 className="text-sm font-bold text-slate-900">Recent activity</h2><p className="mt-0.5 text-[11px] text-slate-400">Latest workspace events</p></div><Link href="/notifications" className="text-[11px] font-semibold text-primary">View all</Link></div>
        <div className="divide-y divide-slate-100">{activity.map((item, index) => <div key={item.id} className="flex gap-3 px-4 py-3"><span className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg ${index === 0 ? "bg-violet-100 text-violet-600" : index === 1 ? "bg-amber-100 text-amber-600" : "bg-emerald-100 text-emerald-600"}`}><span className="h-1.5 w-1.5 rounded-full bg-current" /></span><div className="min-w-0"><p className="truncate text-[12px] font-semibold text-slate-800">{item.title}</p><p className="mt-0.5 line-clamp-1 text-[11px] leading-4 text-slate-500">{item.description}</p><p className="mt-1 text-[10px] text-slate-400">{item.time}</p></div></div>)}</div>
      </Card>
    </div>

    <div className="grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_minmax(300px,0.55fr)]">
      <Card className="overflow-hidden p-0"><div className="flex items-center justify-between border-b border-slate-100 px-4 py-3"><div><h2 className="text-sm font-bold text-slate-900">Recent records</h2><p className="mt-0.5 text-[11px] text-slate-400">Recently updated workspace items</p></div><button type="button" aria-label="More record options" className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-50"><MoreHorizontal size={18} /></button></div><div className="overflow-x-auto"><table className="w-full min-w-[600px] text-[12px]"><thead className="bg-slate-50/80 text-left text-[10px] uppercase tracking-wider text-slate-400"><tr><th className="px-4 py-2.5 font-semibold">Record</th><th className="px-4 py-2.5 font-semibold">Type</th><th className="px-4 py-2.5 font-semibold">Status</th><th className="px-4 py-2.5 font-semibold">ID</th></tr></thead><tbody className="divide-y divide-slate-100">{records.map((record, index) => <tr key={record.id} className="transition hover:bg-slate-50/70"><td className="px-4 py-2.5"><div className="flex items-center gap-2.5"><span className={`grid h-8 w-8 place-items-center rounded-lg text-[10px] font-bold ${index % 2 === 0 ? "bg-indigo-100 text-indigo-600" : "bg-slate-100 text-slate-600"}`}>{record.name.slice(0, 1)}</span><span className="font-semibold text-slate-800">{record.name}</span></div></td><td className="px-4 py-2.5 text-slate-500">{record.type}</td><td className="px-4 py-2.5"><StatusBadge status={record.status} /></td><td className="px-4 py-2.5 font-mono text-[11px] text-slate-400">{record.id}</td></tr>)}</tbody></table></div></Card>

      <Card><div className="flex items-center justify-between"><div><h2 className="text-sm font-bold text-slate-900">Quick actions</h2><p className="mt-0.5 text-[11px] text-slate-400">Common workspace tasks</p></div><span className="rounded-lg bg-indigo-50 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-indigo-600">Shortcuts</span></div><div className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-1">{actions.map((action, index) => { const Icon = action.icon; return <Link key={action.href} href={action.href} className="group flex items-center gap-2.5 rounded-xl border border-slate-200/80 p-2.5 transition hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-indigo-50/40 hover:shadow-sm"><span className={`grid h-8 w-8 place-items-center rounded-lg ${index % 2 === 0 ? "bg-indigo-100 text-indigo-600" : "bg-violet-100 text-violet-600"}`}><Icon size={16} /></span><span className="text-[12px] font-semibold text-slate-700 group-hover:text-indigo-700">{action.label}</span><ArrowUpRight size={14} className="ml-auto text-slate-300 transition group-hover:text-indigo-500" /></Link>; })}</div></Card>
    </div>
  </section>;
}

function PanelHeading({ icon: Icon, title, subtitle }: { icon: typeof BarChart3; title: string; subtitle: string }) { return <div className="flex items-start justify-between"><div className="flex items-center gap-2.5"><span className="grid h-9 w-9 place-items-center rounded-xl bg-indigo-50 text-indigo-600"><Icon size={17} /></span><div><h2 className="text-sm font-bold text-slate-900">{title}</h2><p className="mt-0.5 text-[11px] text-slate-400">{subtitle}</p></div></div><button type="button" className="rounded-lg border border-slate-200 px-2.5 py-1 text-[11px] font-semibold text-slate-500">Weekly</button></div>; }
function StatusBadge({ status }: { status: RecordItem["status"] }) { const style = status === "Published" ? "bg-emerald-50 text-emerald-700" : status === "Pending" ? "bg-amber-50 text-amber-700" : "bg-slate-100 text-slate-600"; return <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${style}`}>{status}</span>; }
function Sparkline({ index, negative }: { index: number; negative: boolean }) { const lines = ["M2 28 C12 28, 15 13, 25 17 S39 32, 49 16 S62 6, 72 13", "M2 27 C13 8, 23 8, 33 20 S50 24, 58 14 S67 10, 72 6", "M2 29 C14 26, 22 9, 32 19 S44 27, 54 11 S64 5, 72 16", "M2 27 C12 25, 19 16, 28 19 S41 5, 51 13 S62 27, 72 11"]; return <svg width="66" height="32" viewBox="0 0 76 36" fill="none" aria-hidden="true"><path d={lines[index % lines.length]} stroke={negative ? "#f43f5e" : "#6d5dfb"} strokeWidth="2" strokeLinecap="round" /><path d={`${lines[index % lines.length]} L72 36 L2 36 Z`} fill={negative ? "rgba(244,63,94,.06)" : "rgba(109,93,251,.06)"} /></svg>; }
