import AdminHeader from "@/components/admin/AdminHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, RotateCcw } from "lucide-react";

const AdminContent = () => {
  return (
    <div>
      <AdminHeader title="Page Content" description="Edit hero sections, taglines, and key page content." />

      <div className="p-6 space-y-6">
        {/* Hero Section */}
        <div className="card-luxury">
          <div className="p-5 border-b border-border">
            <h3 className="font-serif text-lg font-semibold text-foreground">Homepage Hero</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Main heading and subtext visible on landing page</p>
          </div>
          <div className="p-5 space-y-4">
            <div className="space-y-2">
              <Label className="text-foreground text-sm">Headline</Label>
              <Input
                defaultValue="Premium Party Bus & Limo Rentals"
                className="bg-secondary border-border"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-foreground text-sm">Subheadline</Label>
              <Textarea
                defaultValue="Experience luxury transportation for any occasion. From weddings to corporate events, we make every journey unforgettable."
                className="bg-secondary border-border min-h-[80px]"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-foreground text-sm">CTA Button Text</Label>
              <Input
                defaultValue="Get a Free Quote"
                className="bg-secondary border-border"
              />
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="card-luxury">
          <div className="p-5 border-b border-border">
            <h3 className="font-serif text-lg font-semibold text-foreground">About Section</h3>
          </div>
          <div className="p-5 space-y-4">
            <div className="space-y-2">
              <Label className="text-foreground text-sm">Section Title</Label>
              <Input
                defaultValue="Why Choose Royal Ride Rentals?"
                className="bg-secondary border-border"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-foreground text-sm">Description</Label>
              <Textarea
                defaultValue="With over 10 years of experience, we've been the go-to choice for luxury transportation in the area..."
                className="bg-secondary border-border min-h-[100px]"
              />
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="card-luxury">
          <div className="p-5 border-b border-border">
            <h3 className="font-serif text-lg font-semibold text-foreground">Contact Information</h3>
          </div>
          <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-foreground text-sm">Phone Number</Label>
              <Input defaultValue="(555) 123-4567" className="bg-secondary border-border" />
            </div>
            <div className="space-y-2">
              <Label className="text-foreground text-sm">Email</Label>
              <Input defaultValue="info@royalriderentals.com" className="bg-secondary border-border" />
            </div>
            <div className="space-y-2">
              <Label className="text-foreground text-sm">Address</Label>
              <Input defaultValue="123 Luxury Lane, Suite 100" className="bg-secondary border-border" />
            </div>
            <div className="space-y-2">
              <Label className="text-foreground text-sm">Business Hours</Label>
              <Input defaultValue="Mon-Sun: 24/7" className="bg-secondary border-border" />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3">
          <Button variant="outline" className="gap-2">
            <RotateCcw className="w-4 h-4" /> Reset Changes
          </Button>
          <Button variant="hero" className="gap-2">
            <Save className="w-4 h-4" /> Save All Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminContent;
