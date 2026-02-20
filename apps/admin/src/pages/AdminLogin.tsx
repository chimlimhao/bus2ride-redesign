import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Lock, Mail, Crown, Shield, BarChart3, Settings } from "lucide-react";

import { supabase } from "@bus2ride/shared/supabase";
import { toast } from "sonner";

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Welcome back!");
        navigate("/dashboard");
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-secondary items-center justify-center">
        <div className="absolute inset-0 texture-overlay pointer-events-none" />
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-gold/10 rounded-full blur-3xl" />

        <div className="relative z-10 px-16 max-w-lg">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 border border-primary/20 mb-8">
            <Crown className="w-10 h-10 text-gold" />
          </div>
          <h1 className="font-serif text-4xl font-bold text-foreground mb-3">
            Royal Ride Rentals
          </h1>
          <p className="text-muted-foreground mb-10 text-base leading-relaxed">
            Manage your fleet, events, testimonials, and customer inquiries from one central dashboard.
          </p>

          <div className="space-y-5">
            {[
              { icon: BarChart3, label: "Real-time analytics & lead tracking" },
              { icon: Settings, label: "Full fleet & event content management" },
              { icon: Shield, label: "Secure, role-based admin access" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-4">
                <div className="flex items-center justify-center w-10 h-10 bg-primary/10 border border-border">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>

          <div className="section-divider mt-12 !mx-0" />
          <p className="text-xs text-muted-foreground mt-4">
            © {new Date().getFullYear()} Royal Ride Rentals. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
        <div className="absolute inset-0 texture-overlay pointer-events-none" />

        <div className="w-full max-w-md relative z-10">
          {/* Mobile-only branding */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 border border-primary/20 mb-3">
              <Crown className="w-7 h-7 text-gold" />
            </div>
            <h1 className="font-serif text-2xl font-bold text-foreground">
              Royal Ride Rentals
            </h1>
          </div>

          <div className="mb-8">
            <h2 className="font-serif text-2xl font-bold text-foreground">
              Welcome back
            </h2>
            <p className="text-muted-foreground mt-1 text-sm">
              Sign in to access the admin dashboard
            </p>
          </div>

          <div className="card-luxury p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground text-sm">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@royalride.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-secondary border-border focus:border-primary h-11 pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground text-sm">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-secondary border-border focus:border-primary h-11 pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                variant="hero"
                className="w-full h-12 text-base mt-2"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In to Dashboard"}
              </Button>
            </form>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6">
            Protected admin area • Royal Ride Rentals
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
