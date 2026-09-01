// sample.ts — placeholder mock data so the UI has something to render before the backend is ready. Replace with real API calls via src/services/api.ts later.
import {
  Activity,
  BarChart3,
  Bell,
  FileText,
  Folder,
  LayoutDashboard,
  Settings,
  Shield,
  Upload,
  UserPlus,
  Users,
} from "lucide-react";
import type { ActivityItem, ChartPoint, KpiMetric, NavItem, QuickAction, RecordItem } from "@/types";

export const sampleItems = [
  { id: "1", title: "Sample Item One" },
  { id: "2", title: "Sample Item Two" },
  { id: "3", title: "Sample Item Three" },
];

export const dashboardNavItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Users", href: "/users", icon: Users },
  { label: "Roles", href: "/roles", icon: Shield },
  { label: "Content", href: "/content", icon: FileText },
  { label: "Media", href: "/media", icon: Folder },
  { label: "Reports", href: "/reports", icon: BarChart3 },
  { label: "Settings", href: "/settings", icon: Settings },
];

export const kpiMetrics: KpiMetric[] = [
  { label: "Active Users", value: "12,480", change: "+8.2%", trend: "up" },
  { label: "Open Reports", value: "34", change: "-3.1%", trend: "down" },
  { label: "Pending Reviews", value: "18", change: "+2.4%", trend: "up" },
  { label: "Media Assets", value: "1,284", change: "+12.7%", trend: "up" },
];

export const chartPoints: ChartPoint[] = [
  { label: "Mon", value: 42 },
  { label: "Tue", value: 58 },
  { label: "Wed", value: 51 },
  { label: "Thu", value: 74 },
  { label: "Fri", value: 68 },
  { label: "Sat", value: 81 },
  { label: "Sun", value: 76 },
];

export const recentActivity: ActivityItem[] = [
  {
    id: "activity-1",
    title: "New admin user invited",
    description: "A team manager account was added for review.",
    time: "12 min ago",
  },
  {
    id: "activity-2",
    title: "Content draft updated",
    description: "Homepage copy was saved as a reusable draft.",
    time: "1 hr ago",
  },
  {
    id: "activity-3",
    title: "Weekly report generated",
    description: "Analytics summary is ready for approval.",
    time: "3 hrs ago",
  },
];

export const recentRecords: RecordItem[] = [
  { id: "REC-1024", name: "Landing Page", type: "Content", status: "Published" },
  { id: "REC-1025", name: "Team Permissions", type: "Role", status: "Pending" },
  { id: "REC-1026", name: "Hero Banner", type: "Media", status: "Draft" },
  { id: "REC-1027", name: "Monthly Overview", type: "Report", status: "Published" },
];

export const quickActions: QuickAction[] = [
  { label: "Add User", href: "/users/new", icon: UserPlus },
  { label: "Upload Media", href: "/media/upload", icon: Upload },
  { label: "Review Alerts", href: "/notifications", icon: Bell },
  { label: "View Activity", href: "/analytics", icon: Activity },
];
