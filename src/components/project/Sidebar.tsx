// Sidebar.tsx
// TODO: implement this component. Purpose: A collapsible navigation sidebar that renders menu items based on the logged-in user's role.
// Full working example is in the guideline docx, Part D, section "Sidebar".
// Used in: The left navigation on every dashboard layout.

interface NavItem { label: string; href: string; icon: React.ElementType; }
interface SidebarProps {
  items: NavItem[];
  collapsed?: boolean;
  onToggle?: () => void;
}

export function Sidebar(props: SidebarProps) {
  return (
    <div>
      {/* TODO: build the real markup here — see the guideline docx for the full working example */}
    </div>
  );
}
