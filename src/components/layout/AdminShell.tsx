"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bell, CalendarDays, ChevronDown, Menu, Search } from "lucide-react";
import { Sidebar } from "@/components/project/Sidebar";
import { dashboardNavItems } from "@/data/sample";
import { theme } from "@/config/theme";
import { useAdminStore } from "@/store/useAdminStore";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const profile = useAdminStore((state) => state.profile);
  useEffect(() => { void useAdminStore.persist.rehydrate(); }, []);

  return <div className="min-h-screen bg-[#f6f7fb] lg:flex">
    <Sidebar items={dashboardNavItems} collapsed={collapsed} onToggle={() => setCollapsed((value) => !value)} mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />
    <div className="min-w-0 flex-1">
      <header className="sticky top-0 z-20 flex h-[68px] items-center gap-2.5 border-b border-slate-200/70 bg-white/90 px-4 backdrop-blur-xl sm:px-5 xl:px-6">
        <button type="button" onClick={() => setMobileOpen(true)} aria-label="Open navigation" className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-600 shadow-sm lg:hidden"><Menu size={20} /></button>
        <Link href="/dashboard" className="mr-auto flex items-center gap-2 font-bold text-primary sm:hidden"><span className="h-7 w-7 rounded-lg bg-primary" />{theme.brandName}</Link>

        <label className="relative mr-auto hidden w-full max-w-[420px] sm:block"><span className="sr-only">Search dashboard</span><Search className="absolute left-3.5 top-2.5 text-slate-400" size={18} /><input className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-2 pl-10 pr-16 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-100/60" placeholder="Search anything..." /><span className="pointer-events-none absolute right-3 top-2 rounded-md border border-slate-200 bg-white px-2 py-1 text-[10px] font-semibold text-slate-400">⌘ K</span></label>

        <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 shadow-sm xl:flex"><CalendarDays size={16} className="text-indigo-500" /><span>Workspace overview</span><ChevronDown size={14} className="text-slate-400" /></div>
        <Link href="/notifications" aria-label="Notifications" className="relative rounded-xl border border-slate-200 bg-white p-2.5 text-slate-600 shadow-sm transition hover:border-indigo-200 hover:text-primary"><Bell size={19} /><span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full border-2 border-white bg-rose-500 px-1 text-[9px] font-bold text-white">3</span></Link>
        <span className="mx-1 hidden h-8 w-px bg-slate-200 sm:block" />
        <Link href="/profile" className="flex items-center gap-2.5 rounded-xl p-1 transition hover:bg-slate-50"><span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 text-xs font-bold text-white shadow-md shadow-indigo-200">{`${profile.firstName[0] ?? "A"}${profile.lastName[0] ?? "D"}`.toUpperCase()}</span><span className="hidden min-w-0 sm:block"><span className="block max-w-28 truncate text-sm font-semibold text-slate-800">{profile.firstName} {profile.lastName}</span><span className="block text-[10px] text-slate-500">Administrator</span></span><ChevronDown size={14} className="hidden text-slate-400 sm:block" /></Link>
      </header>
      <main className="min-h-[calc(100vh-68px)] bg-[radial-gradient(circle_at_top_left,rgba(109,93,251,0.045),transparent_28%)] p-4 sm:p-5 xl:p-6"><div className="mx-auto max-w-[1560px]">{children}</div></main>
    </div>
  </div>;
}
