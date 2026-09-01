// Sidebar.tsx
// Purpose: A collapsible navigation sidebar that renders menu items based on the logged-in user's role.
// Full working example is in the guideline docx, Part D, section "Sidebar".
// Used in: The left navigation on every dashboard layout.
import { ChevronLeft, ChevronRight, Circle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { theme } from "@/config/theme";

interface NavItem {
  label: string;
  href: string;
  icon?: LucideIcon;
}

interface SidebarProps {
  items: NavItem[];
  collapsed?: boolean;
  onToggle?: () => void;
}

export function Sidebar({ items, collapsed = false, onToggle }: SidebarProps) {
  return (
    <aside className={`min-h-full border-r bg-white transition-all duration-200 ${collapsed ? "w-16" : "w-64"}`}>
      <div className="flex items-center justify-between border-b px-4 py-4">
        {!collapsed && <span className="text-sm font-semibold text-gray-900">Admin Menu</span>}
        <button
          type="button"
          onClick={onToggle}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border text-gray-600 hover:bg-gray-50"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      <nav className="space-y-1 p-3">
        {items.map((item, index) => {
          const Icon = item.icon ?? Circle;
          const isActive = index === 0;

          return (
            <a
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition ${
                isActive ? "bg-gray-100 text-gray-950" : "text-gray-600 hover:bg-gray-50 hover:text-gray-950"
              }`}
              style={isActive ? { borderLeft: `3px solid ${theme.colors.primary}` } : undefined}
              title={collapsed ? item.label : undefined}
            >
              <Icon size={18} />
              {!collapsed && <span>{item.label}</span>}
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
