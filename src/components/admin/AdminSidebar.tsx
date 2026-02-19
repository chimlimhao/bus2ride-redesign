import { NavLink } from "@/components/NavLink";
import {
  LayoutDashboard,
  Car,
  CalendarDays,
  MessageSquareQuote,
  HelpCircle,
  Image,
  Settings,
  LogOut,
  Crown,
  ChevronLeft,
  ChevronDown,
  DollarSign,
  Users,
  Home,
  Info,
  Phone,
  Layers,
  Star,
  Type,
  List,
  Megaphone,
  BookOpen,
  Route,
  BarChart3,
  Award,
  Clock,
  Gift,
  Sparkles,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface SidebarChild {
  title: string;
  icon: any;
  path: string;
}

interface SidebarItem {
  title: string;
  icon: any;
  path: string;
  children?: SidebarChild[];
}

interface SidebarGroup {
  label: string;
  items: SidebarItem[];
}

const sidebarGroups: SidebarGroup[] = [
  {
    label: "Overview",
    items: [
      { title: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
    ],
  },
  {
    label: "Pages",
    items: [
      {
        title: "Home Page",
        icon: Home,
        path: "/admin/content?section=hero",
        children: [
          { title: "Top Banner", icon: Megaphone, path: "/admin/content?section=banner" },
          { title: "Hero Section", icon: Type, path: "/admin/content?section=hero" },
          { title: "Fleet Showcase", icon: Car, path: "/admin/content?section=fleet-showcase" },
          { title: "How It Works", icon: Route, path: "/admin/content?section=how-it-works" },
          { title: "Events Showcase", icon: CalendarDays, path: "/admin/content?section=events-showcase" },
          { title: "Testimonials", icon: Star, path: "/admin/content?section=testimonials" },
          { title: "Recommended", icon: Gift, path: "/admin/content?section=recommended" },
          { title: "CTA Section", icon: Layers, path: "/admin/content?section=cta" },
        ],
      },
      {
        title: "Fleet Page",
        icon: Car,
        path: "/admin/fleet",
        children: [
          { title: "Vehicles", icon: List, path: "/admin/fleet" },
        ],
      },
      {
        title: "Events Page",
        icon: CalendarDays,
        path: "/admin/events",
        children: [
          { title: "Event Types", icon: List, path: "/admin/events" },
        ],
      },
      {
        title: "Services Page",
        icon: BookOpen,
        path: "/admin/content?section=services",
        children: [
          { title: "Service Types", icon: List, path: "/admin/content?section=services" },
          { title: "Features Bar", icon: Sparkles, path: "/admin/content?section=services-features" },
        ],
      },
      {
        title: "About Page",
        icon: Info,
        path: "/admin/content?section=about-story",
        children: [
          { title: "Our Story", icon: BookOpen, path: "/admin/content?section=about-story" },
          { title: "Stats", icon: BarChart3, path: "/admin/content?section=about-stats" },
          { title: "Values", icon: Award, path: "/admin/content?section=about-values" },
          { title: "Milestones", icon: Clock, path: "/admin/content?section=about-milestones" },
        ],
      },
      {
        title: "Contact Page",
        icon: Phone,
        path: "/admin/content?section=contact-info",
        children: [
          { title: "Contact Info", icon: Phone, path: "/admin/content?section=contact-info" },
          { title: "Contact Form", icon: Type, path: "/admin/content?section=contact-form" },
        ],
      },
      {
        title: "Pricing Page",
        icon: DollarSign,
        path: "/admin/content?section=pricing-tiers",
        children: [
          { title: "Pricing Tiers", icon: DollarSign, path: "/admin/content?section=pricing-tiers" },
          { title: "Comparison Table", icon: List, path: "/admin/content?section=pricing-comparison" },
        ],
      },
    ],
  },
  {
    label: "Content",
    items: [
      { title: "Testimonials", icon: MessageSquareQuote, path: "/admin/testimonials" },
      { title: "FAQ Management", icon: HelpCircle, path: "/admin/faq" },
      { title: "Media Gallery", icon: Image, path: "/admin/media" },
    ],
  },
  {
    label: "Business",
    items: [
      { title: "Inquiries", icon: Users, path: "/admin/inquiries" },
      { title: "Pricing", icon: DollarSign, path: "/admin/pricing" },
    ],
  },
];

const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const location = useLocation();
  const currentUrl = location.pathname + location.search;

  // Auto-expand the parent group that contains the active child
  useEffect(() => {
    for (const group of sidebarGroups) {
      for (const item of group.items) {
        if (item.children) {
          const isChildActive = item.children.some((child) => currentUrl === child.path);
          if (isChildActive && !expandedItems.includes(item.title)) {
            setExpandedItems((prev) => [...prev, item.title]);
          }
        }
      }
    }
  }, [currentUrl]);

  const toggleExpand = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  const isChildActive = (path: string) => currentUrl === path;

  const isParentActive = (item: SidebarItem) => {
    if (!item.children) return currentUrl.startsWith(item.path.split("?")[0]);
    return item.children.some((child) => currentUrl === child.path);
  };

  return (
    <aside
      className={cn(
        "h-screen sticky top-0 bg-card border-r border-border flex flex-col transition-all duration-300",
        collapsed ? "w-[68px]" : "w-[280px]"
      )}
    >
      {/* Brand */}
      <div className="p-4 border-b border-border flex items-center gap-3">
        <div className="w-9 h-9 bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
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
      <nav className="flex-1 py-3 overflow-y-auto">
        {sidebarGroups.map((group) => (
          <div key={group.label} className={cn("mb-1", collapsed ? "px-2" : "px-3")}>
            {!collapsed && (
              <p className="text-[10px] uppercase tracking-widest text-gold/70 font-semibold mb-2 mt-3 px-2">
                {group.label}
              </p>
            )}
            <ul className="space-y-0.5">
              {group.items.map((item) => (
                <li key={item.title}>
                  {item.children && !collapsed ? (
                    <div>
                      <button
                        onClick={() => toggleExpand(item.title)}
                        className={cn(
                          "flex items-center justify-between w-full px-3 py-2 text-sm transition-all duration-200 group",
                          isParentActive(item)
                            ? "text-gold bg-gold/5"
                            : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className={cn(
                            "w-4 h-4 shrink-0 transition-colors",
                            isParentActive(item) ? "text-gold" : "group-hover:text-gold"
                          )} />
                          <span className="truncate">{item.title}</span>
                        </div>
                        <ChevronDown
                          className={cn(
                            "w-3 h-3 text-muted-foreground transition-transform duration-200",
                            expandedItems.includes(item.title) && "rotate-180"
                          )}
                        />
                      </button>
                      {expandedItems.includes(item.title) && (
                        <ul className="ml-4 pl-3 border-l border-gold/15 space-y-0.5 mt-0.5 mb-1">
                          {item.children.map((child) => (
                            <li key={child.path + child.title}>
                              <NavLink
                                to={child.path}
                                className={cn(
                                  "flex items-center gap-2.5 px-2.5 py-1.5 text-xs transition-all duration-200 group",
                                  isChildActive(child.path)
                                    ? "bg-gold/10 text-gold font-medium"
                                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/70"
                                )}
                              >
                                <child.icon className={cn(
                                  "w-3.5 h-3.5 shrink-0 transition-colors",
                                  isChildActive(child.path) ? "text-gold" : "group-hover:text-gold"
                                )} />
                                <span className="truncate">{child.title}</span>
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <NavLink
                      to={item.path}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 text-sm transition-all duration-200 group",
                        isChildActive(item.path) || (item.path === "/admin/dashboard" && location.pathname === "/admin/dashboard")
                          ? "bg-gold/10 text-gold border-r-2 border-gold"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                      )}
                    >
                      <item.icon className={cn(
                        "w-4 h-4 shrink-0 transition-colors",
                        isChildActive(item.path) ? "text-gold" : "group-hover:text-gold"
                      )} />
                      {!collapsed && <span className="truncate">{item.title}</span>}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* Bottom section */}
      <div className="border-t border-border p-3 space-y-1">
        <NavLink
          to="/admin/settings"
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 text-sm transition-all duration-200",
            location.pathname === "/admin/settings"
              ? "bg-gold/10 text-gold"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary"
          )}
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
