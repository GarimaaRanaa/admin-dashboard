"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { theme } from "@/config/theme";

const standaloneRoutes = ["/dashboard", "/users", "/roles", "/categories", "/content", "/media", "/notifications", "/reports", "/analytics", "/settings", "/profile", "/login", "/register", "/forgot-password"];

export function Navbar() {
  const pathname = usePathname();
  if (standaloneRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`))) return null;
  return <header className="border-b bg-white"><div className="mx-auto flex max-w-6xl items-center justify-between p-4"><Link href="/" className="text-lg font-bold text-primary">{theme.brandName}</Link><nav className="flex items-center gap-3 text-sm"><Link href="/dashboard" className="hidden font-medium text-gray-600 hover:text-primary sm:block">Dashboard</Link><Link href="/login" className="rounded-lg border border-primary px-3 py-2 font-semibold text-primary">Sign in</Link></nav></div></header>;
}
