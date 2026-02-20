import AdminHeader from "@/components/admin/AdminHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, User, Shield, Bell, Palette } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const AdminSettings = () => {
  return (
    <div>
      <AdminHeader title="Settings" description="Manage your admin account and site configuration." />

      <div className="p-6 space-y-6 max-w-3xl">
        {/* Profile */}
        <div className="card-luxury">
          <div className="p-5 border-b border-border flex items-center gap-2">
            <User className="w-4 h-4 text-primary" />
            <h3 className="font-serif text-lg font-semibold text-foreground">Profile</h3>
          </div>
          <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-foreground text-sm">Full Name</Label>
              <Input defaultValue="Admin User" className="bg-secondary border-border" />
            </div>
            <div className="space-y-2">
              <Label className="text-foreground text-sm">Email</Label>
              <Input defaultValue="admin@royalride.com" className="bg-secondary border-border" />
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="card-luxury">
          <div className="p-5 border-b border-border flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            <h3 className="font-serif text-lg font-semibold text-foreground">Security</h3>
          </div>
          <div className="p-5 space-y-4">
            <div className="space-y-2">
              <Label className="text-foreground text-sm">Current Password</Label>
              <Input type="password" placeholder="••••••••" className="bg-secondary border-border" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-foreground text-sm">New Password</Label>
                <Input type="password" placeholder="••••••••" className="bg-secondary border-border" />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground text-sm">Confirm Password</Label>
                <Input type="password" placeholder="••••••••" className="bg-secondary border-border" />
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="card-luxury">
          <div className="p-5 border-b border-border flex items-center gap-2">
            <Bell className="w-4 h-4 text-primary" />
            <h3 className="font-serif text-lg font-semibold text-foreground">Notifications</h3>
          </div>
          <div className="p-5 space-y-4">
            {[
              { label: "New inquiry notifications", desc: "Get notified when a new quote request comes in" },
              { label: "Testimonial submissions", desc: "Receive alerts for new customer reviews" },
              { label: "Booking confirmations", desc: "Email confirmation for all bookings" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <Switch />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <Button variant="hero" className="gap-2">
            <Save className="w-4 h-4" /> Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
