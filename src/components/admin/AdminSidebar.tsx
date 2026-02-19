import { NavLink } from "@/components/NavLink";
import {
  LayoutDashboard,
  Car,
  CalendarDays,
  MessageSquareQuote,
  HelpCircle,
  FileText,
  Image,
  Settings,
  LogOut,
  Crown,
  ChevronLeft,
  DollarSign,
  Users,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
  { title: "Fleet Vehicles", icon: Car, path: "/admin/fleet" },
  { title: "Events & Services", icon: CalendarDays, path: "/admin/events" },
  { title: "Testimonials", icon: MessageSquareQuote, path: "/admin/testimonials" },
  { title: "FAQ Management", icon: HelpCircle, path: "/admin/faq" },
  { title: "Page Content", icon: FileText, path: "/admin/content" },
  { title: "Media Gallery", icon: Image, path: "/admin/media" },
  { title: "Pricing", icon: DollarSign, path: "/admin/pricing" },
  { title: "Inquiries", icon: Users, path: "/admin/inquiries" },
];

const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "h-screen sticky top-0 bg-card border-r border-border flex flex-col transition-all duration-300",
        collapsed ? "w-[68px]" : "w-[260px]"
      )}
    >
      {/* Brand */}
      <div className="p-4 border-b border-border flex items-center gap-3">
        <div className="w-9 h-9 bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
          <Crown className="w-5 h-5 text-gold" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <h2 className="font-serif text-sm font-bold text-foreground truncate">Admin CMS</h2>
            <p className="text-[10px] text-muted-foreground">Content Management</p>
          </div>
        )}
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-16 w-6 h-6 bg-secondary border border-border flex items-center justify-center hover:bg-muted transition-colors z-10"
      >
        <ChevronLeft className={cn("w-3 h-3 text-muted-foreground transition-transform", collapsed && "rotate-180")} />
      </button>

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <div className={cn("px-3 mb-2", collapsed && "px-2")}>
          {!collapsed && (
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-3 px-2">
              Management
            </p>
          )}
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200 group"
                  activeClassName="bg-primary/10 text-primary border-r-2 border-primary"
                >
                  <item.icon className="w-4 h-4 shrink-0 group-hover:text-primary transition-colors" />
                  {!collapsed && <span className="truncate">{item.title}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Bottom section */}
      <div className="border-t border-border p-3 space-y-1">
        <NavLink
          to="/admin/settings"
          className="flex items-center gap-3 px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200"
          activeClassName="bg-primary/10 text-primary"
        >
          <Settings className="w-4 h-4 shrink-0" />
          {!collapsed && <span>Settings</span>}
        </NavLink>
        <NavLink
          to="/admin/login"
          className="flex items-center gap-3 px-3 py-2.5 text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-200"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </NavLink>
      </div>
    </aside>
  );
};

export default AdminSidebar;
