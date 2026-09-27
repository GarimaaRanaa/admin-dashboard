"use client";

import { usePathname } from "next/navigation";
import { theme } from "@/config/theme";

const standaloneRoutes = ["/dashboard", "/users", "/roles", "/categories", "/content", "/media", "/notifications", "/reports", "/analytics", "/settings", "/profile", "/login", "/register", "/forgot-password"];

export function Footer() {
  const pathname = usePathname();
  if (standaloneRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`))) return null;
  return <footer className="border-t bg-white"><div className="mx-auto max-w-6xl p-4 text-center text-sm text-gray-500">© {new Date().getFullYear()} {theme.brandName}. All rights reserved.</div></footer>;
}
