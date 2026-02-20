import AdminHeader from "@/components/admin/AdminHeader";
import StatCard from "@/components/admin/StatCard";
import { Car, CalendarDays, MessageSquareQuote, Users, TrendingUp, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

const recentActivity = [
  { action: "New inquiry received", detail: "Wedding package - John D.", time: "2 min ago", type: "inquiry" },
  { action: "Testimonial submitted", detail: "5-star review from Sarah M.", time: "1 hour ago", type: "testimonial" },
  { action: "Fleet vehicle updated", detail: "Party Bus - pricing changed", time: "3 hours ago", type: "fleet" },
  { action: "New booking request", detail: "Prom Night - 15 passengers", time: "5 hours ago", type: "inquiry" },
  { action: "FAQ item added", detail: "Cancellation policy updated", time: "1 day ago", type: "content" },
];

const AdminDashboard = () => {
  return (
    <div>
      <AdminHeader title="Dashboard" description="Welcome back, Admin. Here's your overview." />

      <div className="p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Fleet Vehicles" value="7" change="+1 this month" changeType="positive" icon={Car} />
          <StatCard title="Active Events" value="12" change="+3 this week" changeType="positive" icon={CalendarDays} />
          <StatCard title="Testimonials" value="24" change="4 pending review" changeType="neutral" icon={MessageSquareQuote} />
          <StatCard title="Inquiries" value="38" change="+12 this week" changeType="positive" icon={Users} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2 card-luxury">
            <div className="p-5 border-b border-border flex items-center justify-between">
              <h3 className="font-serif text-lg font-semibold text-foreground">Recent Activity</h3>
              <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
                View All
              </Button>
            </div>
            <div className="divide-y divide-border">
              {recentActivity.map((item, i) => (
                <div key={i} className="px-5 py-3.5 flex items-center justify-between hover:bg-secondary/50 transition-colors">
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.action}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.detail}</p>
                  </div>
                  <span className="text-[10px] text-muted-foreground whitespace-nowrap ml-4">{item.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="card-luxury">
            <div className="p-5 border-b border-border">
              <h3 className="font-serif text-lg font-semibold text-foreground">Quick Stats</h3>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Page Views</span>
                </div>
                <span className="text-sm font-semibold text-foreground">12.4K</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-gold" />
                  <span className="text-sm text-muted-foreground">Conversion Rate</span>
                </div>
                <span className="text-sm font-semibold text-foreground">4.2%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Repeat Customers</span>
                </div>
                <span className="text-sm font-semibold text-foreground">67%</span>
              </div>

              <div className="pt-4 border-t border-border">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-3">Popular Vehicles</p>
                {["Party Bus", "Limousine", "Sprinter Van"].map((v, i) => (
                  <div key={v} className="flex items-center justify-between py-1.5">
                    <span className="text-sm text-foreground">{v}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-1.5 bg-secondary overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${90 - i * 20}%` }} />
                      </div>
                      <span className="text-xs text-muted-foreground">{90 - i * 20}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
