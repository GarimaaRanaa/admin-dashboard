"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight, Circle, Sparkles, X } from "lucide-react";
import type { NavItem } from "@/types";
import { theme } from "@/config/theme";

interface SidebarProps { items: NavItem[]; collapsed?: boolean; onToggle?: () => void; mobileOpen?: boolean; onMobileClose?: () => void; }

export function Sidebar({ items, collapsed = false, onToggle, mobileOpen = false, onMobileClose }: SidebarProps) {
  const pathname = usePathname();
  let lastGroup = "";

  return <>
    {mobileOpen && <button type="button" aria-label="Close navigation" onClick={onMobileClose} className="fixed inset-0 z-30 bg-slate-950/55 backdrop-blur-sm lg:hidden" />}
    <aside className={`fixed inset-y-0 left-0 z-40 flex h-screen flex-col overflow-hidden bg-[#12152b] text-white shadow-2xl shadow-slate-950/20 transition-all duration-300 lg:sticky lg:top-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"} ${collapsed ? "w-[76px]" : "w-[238px]"}`}>
      <div className="flex h-[68px] shrink-0 items-center border-b border-white/10 px-4">
        <Link href="/dashboard" className="flex min-w-0 items-center gap-3" onClick={onMobileClose}>
          <BrandMark />
          {!collapsed && <span className="min-w-0"><span className="block truncate text-lg font-bold tracking-tight">{theme.brandName}</span><span className="block text-[11px] font-medium tracking-wide text-indigo-200/70">{theme.brandTagline}</span></span>}
        </Link>
        <button type="button" onClick={onMobileClose} className="ml-auto rounded-lg p-2 text-indigo-200 lg:hidden" aria-label="Close menu"><X size={20} /></button>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-3">
        {items.map((item) => {
          const Icon = item.icon ?? Circle;
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(`${item.href}/`));
          const showGroup = item.group !== lastGroup;
          lastGroup = item.group ?? "";
          return <div key={item.href}>
            {showGroup && !collapsed && <p className="mb-1.5 mt-3.5 px-3 text-[9px] font-bold uppercase tracking-[0.18em] text-indigo-200/45 first:mt-0">{item.group}</p>}
            {showGroup && collapsed && <div className="my-3 h-px bg-white/10" />}
            <Link href={item.href} onClick={onMobileClose} className={`group mb-0.5 flex items-center gap-3 rounded-xl px-3 py-2 text-[13px] font-medium transition-all ${isActive ? "bg-gradient-to-r from-[#6d5dfb] to-[#7f5cf4] text-white shadow-lg shadow-indigo-950/30" : "text-indigo-100/70 hover:bg-white/[0.07] hover:text-white"}`} title={collapsed ? item.label : undefined}>
              <Icon size={18} strokeWidth={isActive ? 2.3 : 1.8} className="shrink-0" />
              {!collapsed && <span>{item.label}</span>}
              {isActive && !collapsed && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-white/80" />}
            </Link>
          </div>;
        })}
      </nav>

      {!collapsed && <div className="m-3 rounded-xl border border-indigo-300/15 bg-gradient-to-br from-white/[0.09] to-indigo-400/[0.08] p-3"><span className="inline-flex rounded-lg bg-indigo-400/15 p-1.5 text-indigo-200"><Sparkles size={16} /></span><p className="mt-2 text-xs font-semibold">Ready for any business</p><p className="mt-1 text-[10px] leading-4 text-indigo-100/55">Configure modules and branding without rebuilding.</p></div>}
      <button type="button" onClick={onToggle} className="hidden h-11 shrink-0 items-center justify-center gap-2 border-t border-white/10 text-[11px] font-semibold text-indigo-100/55 transition hover:bg-white/[0.05] hover:text-white lg:flex" aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}>{collapsed ? <ChevronRight size={16} /> : <><ChevronLeft size={16} />Collapse menu</>}</button>
    </aside>
  </>;
}

function BrandMark() {
  return <span className="relative grid h-10 w-10 shrink-0 grid-cols-2 gap-1 rounded-xl bg-white/5 p-1.5 shadow-inner shadow-white/10"><span className="rounded-full rounded-br-sm bg-[#8b7cff]" /><span className="rounded-full rounded-bl-sm bg-[#6d5dfb]" /><span className="rounded-full rounded-tr-sm bg-[#6d5dfb]" /><span className="rounded-full rounded-tl-sm bg-[#a99fff]" /></span>;
}
