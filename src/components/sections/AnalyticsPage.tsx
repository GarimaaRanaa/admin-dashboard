import { ArrowUpRight, Clock, MousePointerClick, Users } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { chartPoints } from "@/data/sample";

const channels = [
  { name: "Organic search", value: 42, color: "bg-primary" },
  { name: "Direct", value: 28, color: "bg-amber-500" },
  { name: "Social", value: 18, color: "bg-blue-500" },
  { name: "Referral", value: 12, color: "bg-emerald-500" },
];

export function AnalyticsPage() {
  const max = Math.max(...chartPoints.map((point) => point.value));
  return <div className="space-y-5"><div><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary">Insights</p><h1 className="mt-1.5 text-2xl font-bold tracking-tight text-slate-950">Analytics</h1><p className="mt-1 text-[13px] text-slate-500">Understand audience growth and engagement across the workspace.</p></div>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><Metric icon={Users} label="Visitors" value="24,892" change="12.5%" /><Metric icon={MousePointerClick} label="Page views" value="68,421" change="8.2%" /><Metric icon={Clock} label="Avg. session" value="4m 18s" change="5.1%" /><Metric icon={ArrowUpRight} label="Conversion" value="3.8%" change="0.7%" /></div>
    <div className="grid gap-4 xl:grid-cols-[1.4fr_0.6fr]"><Card><div className="flex items-center justify-between"><div><h2 className="text-sm font-bold text-slate-950">Traffic overview</h2><p className="mt-0.5 text-[11px] text-slate-500">Last seven days</p></div><select aria-label="Analytics period" className="rounded-lg border px-2.5 py-1.5 text-[12px]"><option>Last 7 days</option><option>Last 30 days</option></select></div><div className="mt-5 flex h-52 items-end gap-3">{chartPoints.map((point) => <div key={point.label} className="flex h-full flex-1 flex-col justify-end gap-2"><div className="rounded-t-md bg-primary transition-all" style={{ height: `${(point.value / max) * 100}%` }} /><span className="text-center text-[11px] text-slate-500">{point.label}</span></div>)}</div></Card>
      <Card><h2 className="font-bold text-gray-950">Traffic channels</h2><p className="mt-1 text-sm text-gray-500">Share of total visits</p><div className="mt-6 space-y-5">{channels.map((channel) => <div key={channel.name}><div className="mb-2 flex justify-between text-sm"><span className="font-medium text-gray-700">{channel.name}</span><span className="text-gray-500">{channel.value}%</span></div><div className="h-2 rounded-full bg-gray-100"><div className={`h-2 rounded-full ${channel.color}`} style={{ width: `${channel.value}%` }} /></div></div>)}</div></Card></div>
  </div>;
}

function Metric({ icon: Icon, label, value, change }: { icon: typeof Users; label: string; value: string; change: string }) {
  return <Card><div className="flex items-center justify-between"><span className="rounded-lg bg-primary/10 p-2 text-primary"><Icon size={20} /></span><span className="text-xs font-semibold text-emerald-700">+{change}</span></div><p className="mt-4 text-sm text-gray-500">{label}</p><p className="mt-1 text-2xl font-bold text-gray-950">{value}</p></Card>;
}
