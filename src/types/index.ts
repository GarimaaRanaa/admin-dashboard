// index.ts — shared TypeScript types used across the app. Add project-specific types here (or in a new file in this same folder) as you build features.
import type { LucideIcon } from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon?: LucideIcon;
  group?: "Overview" | "Management" | "Workspace";
}

export interface KpiMetric {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
}

export interface ChartPoint {
  label: string;
  value: number;
}

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  time: string;
}

export interface RecordItem {
  id: string;
  name: string;
  type: string;
  status: "Published" | "Draft" | "Pending";
}

export interface QuickAction {
  label: string;
  href: string;
  icon: LucideIcon;
}
