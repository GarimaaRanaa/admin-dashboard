export type ModuleKey = "users" | "roles" | "categories" | "content" | "media" | "notifications" | "reports";

export interface ModuleRecord extends Record<string, unknown> {
  id: string;
  name: string;
  type: string;
  status: string;
  updated: string;
}

export interface ModuleDefinition {
  title: string;
  description: string;
  actionLabel: string;
  singular: string;
  records: ModuleRecord[];
}

export const moduleDefinitions: Record<ModuleKey, ModuleDefinition> = {
  users: {
    title: "Users", description: "Manage team members, roles, and account access.", actionLabel: "Add user", singular: "user",
    records: [
      { id: "USR-001", name: "Aarav Sharma", type: "Administrator", status: "Active", updated: "Today, 09:42" },
      { id: "USR-002", name: "Maya Gurung", type: "Editor", status: "Active", updated: "Yesterday" },
      { id: "USR-003", name: "Rohan Thapa", type: "Viewer", status: "Invited", updated: "Sep 24, 2026" },
      { id: "USR-004", name: "Nisha Rai", type: "Manager", status: "Active", updated: "Sep 22, 2026" },
      { id: "USR-005", name: "Kabir Joshi", type: "Editor", status: "Suspended", updated: "Sep 20, 2026" },
      { id: "USR-006", name: "Sara Karki", type: "Viewer", status: "Active", updated: "Sep 18, 2026" },
    ],
  },
  roles: {
    title: "Roles & Permissions", description: "Control what each team role can view and change.", actionLabel: "Create role", singular: "role",
    records: [
      { id: "ROL-01", name: "Administrator", type: "24 permissions", status: "System", updated: "Today" },
      { id: "ROL-02", name: "Manager", type: "18 permissions", status: "Active", updated: "Sep 25, 2026" },
      { id: "ROL-03", name: "Editor", type: "11 permissions", status: "Active", updated: "Sep 21, 2026" },
      { id: "ROL-04", name: "Viewer", type: "5 permissions", status: "Active", updated: "Sep 17, 2026" },
    ],
  },
  categories: {
    title: "Categories", description: "Organize content into reusable categories and groups.", actionLabel: "Add category", singular: "category",
    records: [
      { id: "CAT-101", name: "Announcements", type: "12 items", status: "Active", updated: "Today" },
      { id: "CAT-102", name: "Resources", type: "28 items", status: "Active", updated: "Sep 24, 2026" },
      { id: "CAT-103", name: "Company news", type: "16 items", status: "Active", updated: "Sep 22, 2026" },
      { id: "CAT-104", name: "Archived", type: "9 items", status: "Hidden", updated: "Sep 10, 2026" },
    ],
  },
  content: {
    title: "Content", description: "Draft, review, publish, and maintain site content.", actionLabel: "New content", singular: "content item",
    records: [
      { id: "CNT-301", name: "September product update", type: "Article", status: "Published", updated: "Today, 10:18" },
      { id: "CNT-302", name: "Getting started guide", type: "Page", status: "Published", updated: "Yesterday" },
      { id: "CNT-303", name: "New feature announcement", type: "Article", status: "Review", updated: "Sep 25, 2026" },
      { id: "CNT-304", name: "Partner spotlight", type: "Article", status: "Draft", updated: "Sep 23, 2026" },
      { id: "CNT-305", name: "About our team", type: "Page", status: "Published", updated: "Sep 15, 2026" },
    ],
  },
  media: {
    title: "Media", description: "Browse and manage uploaded images, videos, and files.", actionLabel: "Upload media", singular: "media asset",
    records: [
      { id: "MED-401", name: "dashboard-hero.jpg", type: "Image · 1.8 MB", status: "Ready", updated: "Today" },
      { id: "MED-402", name: "brand-guidelines.pdf", type: "PDF · 3.2 MB", status: "Ready", updated: "Yesterday" },
      { id: "MED-403", name: "product-demo.mp4", type: "Video · 24 MB", status: "Processing", updated: "Sep 25, 2026" },
      { id: "MED-404", name: "team-photo.webp", type: "Image · 980 KB", status: "Ready", updated: "Sep 20, 2026" },
    ],
  },
  notifications: {
    title: "Notifications", description: "Review system events, reminders, and team updates.", actionLabel: "New notification", singular: "notification",
    records: [
      { id: "NOT-501", name: "Weekly report is ready", type: "Report", status: "Unread", updated: "10 minutes ago" },
      { id: "NOT-502", name: "New user awaiting approval", type: "Account", status: "Unread", updated: "1 hour ago" },
      { id: "NOT-503", name: "Media upload completed", type: "Media", status: "Read", updated: "Yesterday" },
      { id: "NOT-504", name: "Content scheduled for publishing", type: "Content", status: "Read", updated: "Sep 24, 2026" },
    ],
  },
  reports: {
    title: "Reports", description: "Generate and review reusable operational reports.", actionLabel: "Generate report", singular: "report",
    records: [
      { id: "RPT-601", name: "Monthly performance", type: "Analytics", status: "Ready", updated: "Today" },
      { id: "RPT-602", name: "User activity", type: "Accounts", status: "Ready", updated: "Sep 25, 2026" },
      { id: "RPT-603", name: "Content inventory", type: "Content", status: "Generating", updated: "Sep 24, 2026" },
      { id: "RPT-604", name: "Storage usage", type: "Media", status: "Ready", updated: "Sep 20, 2026" },
    ],
  },
};
