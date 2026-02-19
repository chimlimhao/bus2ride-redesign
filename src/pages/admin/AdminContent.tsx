import AdminHeader from "@/components/admin/AdminHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, RotateCcw, Plus, Trash2, Check } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";

import partyBusImg from "@/assets/fleet/party-bus-hero.jpg";
import limousineImg from "@/assets/fleet/limousine.jpg";
import coachBusImg from "@/assets/fleet/coach-bus.jpg";
import suvLimoImg from "@/assets/fleet/suv-limo.jpg";
import sedanImg from "@/assets/fleet/sedan.jpg";
import sprinterImg from "@/assets/fleet/sprinter-van.jpg";

const AdminContent = () => {
  const [searchParams] = useSearchParams();
  const section = searchParams.get("section") || "hero";
  const { toast } = useToast();
  const [hasChanges, setHasChanges] = useState(false);

  const handleSave = useCallback(() => {
    toast({ title: "Changes saved", description: "Your content has been updated successfully." });
    setHasChanges(false);
  }, [toast]);

  const handleReset = useCallback(() => {
    toast({ title: "Changes reset", description: "All changes have been reverted." });
    setHasChanges(false);
  }, [toast]);

  const markChanged = () => setHasChanges(true);

  const renderSection = () => {
    switch (section) {
      case "banner": return <BannerSection onChange={markChanged} />;
      case "hero": return <HeroSection onChange={markChanged} />;
      case "fleet-showcase": return <FleetShowcaseSection onChange={markChanged} />;
      case "how-it-works": return <HowItWorksSection onChange={markChanged} />;
      case "events-showcase": return <EventsShowcaseSection onChange={markChanged} />;
      case "testimonials": return <TestimonialsSection onChange={markChanged} />;
      case "recommended": return <RecommendedSection onChange={markChanged} />;
      case "cta": return <CTASectionEditor onChange={markChanged} />;
      case "about-story": case "about": return <AboutStorySection onChange={markChanged} />;
      case "about-stats": return <AboutStatsSection onChange={markChanged} />;
      case "about-values": return <AboutValuesSection onChange={markChanged} />;
      case "about-milestones": return <AboutMilestonesSection onChange={markChanged} />;
      case "contact-info": case "contact": return <ContactInfoSection onChange={markChanged} />;
      case "contact-form": return <ContactFormSection onChange={markChanged} />;
      case "services": return <ServicesSection onChange={markChanged} />;
      case "services-features": return <ServicesFeaturesSection onChange={markChanged} />;
      case "pricing-tiers": case "pricing": return <PricingTiersSection onChange={markChanged} />;
      case "pricing-comparison": return <PricingComparisonSection />;
      default: return <HeroSection onChange={markChanged} />;
    }
  };

  const sectionTitles: Record<string, { title: string; description: string }> = {
    banner: { title: "Top Banner", description: "Edit promotional banners shown at the top of the homepage." },
    hero: { title: "Hero Section", description: "Edit the main hero heading, subtext, CTA buttons, and trust indicators." },
    "fleet-showcase": { title: "Fleet Showcase", description: "Manage the fleet cards displayed on the homepage." },
    "how-it-works": { title: "How It Works", description: "Edit the 3-step process section on the homepage." },
    "events-showcase": { title: "Events Showcase", description: "Manage event cards displayed on the homepage." },
    testimonials: { title: "Testimonials Section", description: "Edit the testimonials section header and layout." },
    recommended: { title: "Recommended Resources", description: "Manage affiliate/recommended product cards." },
    cta: { title: "CTA Section", description: "Edit the call-to-action section heading and buttons." },
    "about-story": { title: "Our Story", description: "Edit the About page story section." },
    about: { title: "Our Story", description: "Edit the About page story section." },
    "about-stats": { title: "Company Stats", description: "Edit statistics displayed on the About page." },
    "about-values": { title: "Our Values", description: "Manage company value cards on the About page." },
    "about-milestones": { title: "Company Milestones", description: "Manage the timeline on the About page." },
    "contact-info": { title: "Contact Information", description: "Edit phone, email, address and hours." },
    contact: { title: "Contact Information", description: "Edit phone, email, address and hours." },
    "contact-form": { title: "Contact Form", description: "Configure the contact form fields and labels." },
    services: { title: "Service Types", description: "Manage the services listed on the Services page." },
    "services-features": { title: "Features Bar", description: "Edit the feature highlights on the Services page." },
    "pricing-tiers": { title: "Pricing Tiers", description: "Manage vehicle pricing cards." },
    pricing: { title: "Pricing Tiers", description: "Manage vehicle pricing cards." },
    "pricing-comparison": { title: "Comparison Table", description: "Edit the vehicle comparison table." },
  };

  const current = sectionTitles[section] || { title: "Page Content", description: "Edit page content." };

  return (
    <div>
      <AdminHeader title={current.title} description={current.description} />

      <div className="p-6 space-y-6">
        {renderSection()}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            {hasChanges && (
              <span className="text-xs text-gold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                Unsaved changes
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2" onClick={handleReset}>
              <RotateCcw className="w-4 h-4" /> Reset Changes
            </Button>
            <Button className="gap-2 bg-gold text-gold-foreground hover:bg-gold/90" onClick={handleSave}>
              <Save className="w-4 h-4" /> Save All Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Shared Components ─── */

interface SectionProps {
  onChange?: () => void;
}

const SectionCard = ({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) => (
  <div className="card-luxury">
    <div className="p-5 border-b border-border">
      <h3 className="font-serif text-lg font-semibold text-foreground">{title}</h3>
      {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
    </div>
    <div className="p-5 space-y-4">{children}</div>
  </div>
);

const Field = ({ label, value, type = "text", rows, onChange }: { label: string; value: string; type?: string; rows?: number; onChange?: () => void }) => (
  <div className="space-y-2">
    <Label className="text-foreground text-sm">{label}</Label>
    {rows ? (
      <Textarea defaultValue={value} className="bg-secondary border-border focus:border-gold/50 focus:ring-gold/20" style={{ minHeight: rows * 24 }} onChange={onChange} />
    ) : (
      <Input type={type} defaultValue={value} className="bg-secondary border-border focus:border-gold/50 focus:ring-gold/20" onChange={onChange} />
    )}
  </div>
);

/* ─── Deletable Item Wrapper ─── */

const DeletableItem = ({ title, onDelete, children }: { title: string; onDelete: () => void; children: React.ReactNode }) => (
  <div className="p-4 bg-secondary/50 border border-border">
    <div className="flex items-center justify-between mb-3">
      <span className="text-sm font-medium text-foreground">{title}</span>
      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10 h-7" onClick={onDelete}>
        <Trash2 className="w-3.5 h-3.5" />
      </Button>
    </div>
    {children}
  </div>
);

/* ─── Section Components ─── */

const BannerSection = ({ onChange }: SectionProps) => {
  const { toast } = useToast();
  const [banners, setBanners] = useState([
    { text: "🚌 Free Quote on Party Buses", link: "/fleet" },
    { text: "🎉 15% OFF Wedding Packages", link: "/services" },
    { text: "✨ Book Today & Get VIP Treatment", link: "/contact" },
  ]);

  const deleteBanner = (i: number) => {
    setBanners((prev) => prev.filter((_, idx) => idx !== i));
    toast({ title: "Banner removed" });
    onChange?.();
  };

  const addBanner = () => {
    setBanners((prev) => [...prev, { text: "New Banner Text", link: "/" }]);
    toast({ title: "Banner added" });
    onChange?.();
  };

  return (
    <SectionCard title="Promotional Banners" subtitle="Links shown in the top banner bar">
      <div className="space-y-4">
        {banners.map((b, i) => (
          <DeletableItem key={i} title={`Banner ${i + 1}`} onDelete={() => deleteBanner(i)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Field label="Text" value={b.text} onChange={onChange} />
              <Field label="Link" value={b.link} onChange={onChange} />
            </div>
          </DeletableItem>
        ))}
        <Button variant="outline" className="gap-2 w-full border-dashed border-gold/30 text-gold hover:bg-gold/5" onClick={addBanner}>
          <Plus className="w-4 h-4" /> Add Banner
        </Button>
      </div>
    </SectionCard>
  );
};

const HeroSection = ({ onChange }: SectionProps) => (
  <>
    <SectionCard title="Hero Content" subtitle="Main heading and subtext visible on the landing page">
      <Field label="Badge Text" value="Premium Fleet Rentals" onChange={onChange} />
      <Field label="Headline Line 1" value="Group Transport" onChange={onChange} />
      <Field label="Headline Line 2 (Gold)" value="Made Easy" onChange={onChange} />
      <Field label="Subheading" value="Instant quotes, transparent pricing, and meticulously maintained vehicles for weddings, proms, corporate events, and more." rows={3} onChange={onChange} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Primary CTA Text" value="Get Instant Quote" onChange={onChange} />
        <Field label="Secondary CTA Text" value="View Our Fleet" onChange={onChange} />
      </div>
    </SectionCard>
    <SectionCard title="Trust Indicators" subtitle="Stats displayed below the hero content">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { v: "98%", l: "On-Time Rate" }, { v: "15K+", l: "Happy Customers" },
          { v: "150+", l: "Premium Vehicles" }, { v: "4.9", l: "Rating" },
        ].map((s, i) => (
          <div key={i} className="space-y-3">
            <Field label={`Stat ${i + 1} Value`} value={s.v} onChange={onChange} />
            <Field label={`Stat ${i + 1} Label`} value={s.l} onChange={onChange} />
          </div>
        ))}
      </div>
    </SectionCard>
    <SectionCard title="Hero Media" subtitle="Background video and fallback image">
      <Field label="Video URL" value="https://cdn.coverr.co/videos/coverr-driving-through-the-city-at-night-5639/1080p.mp4" onChange={onChange} />
      <Field label="Fallback Image URL" value="https://images.unsplash.com/photo-1563720360172-67b8f3dce741?q=80&w=2048" onChange={onChange} />
    </SectionCard>
  </>
);

const FleetShowcaseSection = ({ onChange }: SectionProps) => {
  const { toast } = useToast();
  const [vehicles, setVehicles] = useState([
    { name: "Party Buses", passengers: "20-50 passengers", desc: "Ultimate party experience on wheels.", image: partyBusImg },
    { name: "Stretch Limousines", passengers: "8-12 passengers", desc: "Classic luxury for any occasion.", image: limousineImg },
    { name: "Coach Buses", passengers: "40-56 passengers", desc: "Comfortable group transportation.", image: coachBusImg },
    { name: "SUV Limousines", passengers: "6-8 passengers", desc: "Spacious premium SUV experience.", image: suvLimoImg },
    { name: "Executive Sedans", passengers: "3-4 passengers", desc: "Elegant executive travel.", image: sedanImg },
    { name: "Sprinter Vans", passengers: "12-15 passengers", desc: "Versatile group shuttle.", image: sprinterImg },
  ]);

  const deleteVehicle = (i: number) => {
    setVehicles((prev) => prev.filter((_, idx) => idx !== i));
    toast({ title: "Vehicle card removed" });
    onChange?.();
  };

  const addVehicle = () => {
    setVehicles((prev) => [...prev, { name: "New Vehicle", passengers: "0 passengers", desc: "Description here.", image: "" }]);
    toast({ title: "Vehicle card added" });
    onChange?.();
  };

  return (
    <SectionCard title="Fleet Showcase Cards" subtitle="Vehicle cards shown on the homepage">
      <Field label="Section Title" value="Our Fleet" onChange={onChange} />
      <Field label="Section Subtitle" value="From intimate limousines to full-size coach buses, we have the perfect vehicle for every occasion." rows={2} onChange={onChange} />
      <div className="space-y-4 mt-4">
        {vehicles.map((v, i) => (
          <DeletableItem key={i} title={v.name} onDelete={() => deleteVehicle(i)}>
            <div className="flex gap-4">
              <div className="shrink-0 space-y-2">
                <Label className="text-foreground text-sm">Image</Label>
                <div className="w-32 h-24 bg-secondary border border-border overflow-hidden relative group">
                  {v.image ? (
                    <img src={v.image} alt={v.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">No image</div>
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button variant="ghost" size="sm" className="text-white text-xs h-7 gap-1">
                      <Plus className="w-3 h-3" /> Change
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                <Field label="Title" value={v.name} onChange={onChange} />
                <Field label="Passengers" value={v.passengers} onChange={onChange} />
                <div className="md:col-span-2">
                  <Field label="Description" value={v.desc} onChange={onChange} />
                </div>
              </div>
            </div>
          </DeletableItem>
        ))}
        <Button variant="outline" className="gap-2 w-full border-dashed border-gold/30 text-gold hover:bg-gold/5" onClick={addVehicle}>
          <Plus className="w-4 h-4" /> Add Vehicle Card
        </Button>
      </div>
    </SectionCard>
  );
};

const HowItWorksSection = ({ onChange }: SectionProps) => (
  <SectionCard title="How It Works Steps" subtitle="The 3-step booking process section">
    <Field label="Section Title" value="How It Works" onChange={onChange} />
    <Field label="Section Subtitle" value="No hidden fees, no complicated process. Just simple, transparent booking." rows={2} onChange={onChange} />
    {[
      { title: "Request a Quote", desc: "Tell us your event details—date, location, group size—and get an instant estimate." },
      { title: "Confirm Your Booking", desc: "Review your options, select your vehicle, and lock in your reservation with a deposit." },
      { title: "Enjoy the Ride", desc: "Your professional chauffeur arrives on time. Sit back, relax, and enjoy the experience." },
    ].map((step, i) => (
      <div key={i} className="p-4 bg-secondary/50 border border-border">
        <p className="text-xs font-semibold text-gold mb-3">Step {i + 1}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Field label="Title" value={step.title} onChange={onChange} />
          <Field label="Description" value={step.desc} onChange={onChange} />
        </div>
      </div>
    ))}
  </SectionCard>
);

const EventsShowcaseSection = ({ onChange }: SectionProps) => {
  const { toast } = useToast();
  const [events, setEvents] = useState([
    "Weddings", "Corporate Events", "Prom & Homecoming", "Bachelor & Bachelorette", "Sports & Game Day", "Concerts & Festivals",
  ]);

  const deleteEvent = (i: number) => {
    setEvents((prev) => prev.filter((_, idx) => idx !== i));
    toast({ title: "Event card removed" });
    onChange?.();
  };

  const addEvent = () => {
    setEvents((prev) => [...prev, "New Event"]);
    toast({ title: "Event card added" });
    onChange?.();
  };

  return (
    <SectionCard title="Events Showcase Cards" subtitle="Event cards shown on the homepage">
      <Field label="Section Title" value="Events We Serve" onChange={onChange} />
      <Field label="Section Subtitle" value="Whatever the occasion, we have the perfect transportation solution." rows={2} onChange={onChange} />
      <div className="space-y-4 mt-4">
        {events.map((e, i) => (
          <DeletableItem key={i} title={e} onDelete={() => deleteEvent(i)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Field label="Title" value={e} onChange={onChange} />
              <Field label="Description" value="Elegant transportation for your special day." onChange={onChange} />
            </div>
          </DeletableItem>
        ))}
        <Button variant="outline" className="gap-2 w-full border-dashed border-gold/30 text-gold hover:bg-gold/5" onClick={addEvent}>
          <Plus className="w-4 h-4" /> Add Event Card
        </Button>
      </div>
    </SectionCard>
  );
};

const TestimonialsSection = ({ onChange }: SectionProps) => (
  <SectionCard title="Testimonials Section Header" subtitle="Section heading shown above testimonials">
    <Field label="Label" value="Testimonials" onChange={onChange} />
    <Field label="Title" value="What Our Clients Say" onChange={onChange} />
    <Field label="Subtitle" value="See what our customers have to say about their experience with Bus2Ride." rows={2} onChange={onChange} />
    <p className="text-xs text-muted-foreground pt-2">
      To manage individual testimonials, go to <span className="text-gold font-medium">Content → Testimonials</span>.
    </p>
  </SectionCard>
);

const RecommendedSection = ({ onChange }: SectionProps) => {
  const { toast } = useToast();
  const [resources, setResources] = useState([
    { title: "Ultimate Road Trip Planner", cat: "Travel Guides", rating: "4.8" },
    { title: "Event Planning Masterclass", cat: "Education", rating: "4.7" },
    { title: "Party on Wheels Guide", cat: "Entertainment", rating: "4.9" },
  ]);

  const deleteResource = (i: number) => {
    setResources((prev) => prev.filter((_, idx) => idx !== i));
    toast({ title: "Resource removed" });
    onChange?.();
  };

  const addResource = () => {
    setResources((prev) => [...prev, { title: "New Resource", cat: "Category", rating: "5.0" }]);
    toast({ title: "Resource added" });
    onChange?.();
  };

  return (
    <SectionCard title="Recommended Resources" subtitle="Affiliate product cards on the homepage">
      <Field label="Section Label" value="Recommended Resources" onChange={onChange} />
      <Field label="Section Title" value="Enhance Your Travel Experience" onChange={onChange} />
      <Field label="Section Subtitle" value="Discover handpicked guides and resources to help you plan the perfect group trip or celebration." rows={2} onChange={onChange} />
      <div className="space-y-4 mt-4">
        {resources.map((p, i) => (
          <DeletableItem key={i} title={p.title} onDelete={() => deleteResource(i)}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Field label="Title" value={p.title} onChange={onChange} />
              <Field label="Category" value={p.cat} onChange={onChange} />
              <Field label="Rating" value={p.rating} onChange={onChange} />
            </div>
            <div className="mt-3">
              <Field label="Description" value="Complete guide to planning unforgettable group road trips." rows={2} onChange={onChange} />
            </div>
            <div className="mt-3">
              <Field label="Affiliate Link" value="#" onChange={onChange} />
            </div>
          </DeletableItem>
        ))}
        <Button variant="outline" className="gap-2 w-full border-dashed border-gold/30 text-gold hover:bg-gold/5" onClick={addResource}>
          <Plus className="w-4 h-4" /> Add Resource
        </Button>
      </div>
    </SectionCard>
  );
};

const CTASectionEditor = ({ onChange }: SectionProps) => (
  <SectionCard title="Call to Action" subtitle="Bottom CTA section on the homepage">
    <Field label="Headline" value="Ready to Book Your Premium Ride?" onChange={onChange} />
    <Field label="Subtext" value="Get an instant quote in under 60 seconds. No obligation, no hidden fees." rows={2} onChange={onChange} />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Field label="Primary CTA Text" value="Get Instant Quote" onChange={onChange} />
      <Field label="Secondary CTA Text" value="Call 888-535-2566" onChange={onChange} />
    </div>
    <Field label="Footer Note" value="Available 24/7 · Response within 1 hour · Free cancellation up to 48 hours before" onChange={onChange} />
  </SectionCard>
);

const AboutStorySection = ({ onChange }: SectionProps) => (
  <SectionCard title="Our Story" subtitle="The main narrative on the About page">
    <Field label="Label" value="Our Story" onChange={onChange} />
    <Field label="Heading" value="Redefining Luxury Transportation" onChange={onChange} />
    <Field label="Paragraph 1" value="Founded in 2008, Bus2Ride began with a simple vision: to provide exceptional group transportation that combines luxury, reliability, and outstanding service." rows={3} onChange={onChange} />
    <Field label="Paragraph 2" value="What started as a single party bus operation has grown into a nationwide network of premium vehicles..." rows={3} onChange={onChange} />
    <Field label="Paragraph 3" value="Today, we're proud to have transported over 50,000 satisfied customers across all 50 states..." rows={3} onChange={onChange} />
    <Field label="Image URL" value="https://images.unsplash.com/photo-1563720360172-67b8f3dce741?q=80&w=2070" onChange={onChange} />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Field label="Badge Value" value="15+" onChange={onChange} />
      <Field label="Badge Label" value="Years of Excellence" onChange={onChange} />
    </div>
  </SectionCard>
);

const AboutStatsSection = ({ onChange }: SectionProps) => (
  <SectionCard title="Company Statistics" subtitle="Key numbers displayed on the About page">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[
        { value: "15+", label: "Years of Experience" },
        { value: "50K+", label: "Happy Customers" },
        { value: "98%", label: "On-Time Rate" },
        { value: "500+", label: "Vehicles Nationwide" },
      ].map((s, i) => (
        <div key={i} className="space-y-3">
          <Field label={`Stat ${i + 1} Value`} value={s.value} onChange={onChange} />
          <Field label={`Stat ${i + 1} Label`} value={s.label} onChange={onChange} />
        </div>
      ))}
    </div>
  </SectionCard>
);

const AboutValuesSection = ({ onChange }: SectionProps) => {
  const { toast } = useToast();
  const [values, setValues] = useState([
    { title: "Safety First", desc: "All our vehicles undergo rigorous safety inspections..." },
    { title: "Premium Quality", desc: "We maintain the highest standards for our fleet..." },
    { title: "Punctuality", desc: "With a 98% on-time rate, you can trust us..." },
    { title: "Customer Focus", desc: "Your satisfaction is our priority..." },
  ]);

  const deleteValue = (i: number) => {
    setValues((prev) => prev.filter((_, idx) => idx !== i));
    toast({ title: "Value removed" });
    onChange?.();
  };

  return (
    <SectionCard title="Company Values" subtitle="Value cards on the About page">
      {values.map((v, i) => (
        <DeletableItem key={i} title={v.title} onDelete={() => deleteValue(i)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Field label="Title" value={v.title} onChange={onChange} />
            <Field label="Description" value={v.desc} onChange={onChange} />
          </div>
        </DeletableItem>
      ))}
    </SectionCard>
  );
};

const AboutMilestonesSection = ({ onChange }: SectionProps) => {
  const { toast } = useToast();
  const [milestones, setMilestones] = useState([
    { year: "2008", event: "Bus2Ride founded with a single party bus" },
    { year: "2012", event: "Expanded fleet to include luxury limousines" },
    { year: "2015", event: "Launched nationwide service coverage" },
    { year: "2018", event: "Reached 25,000 satisfied customers" },
    { year: "2021", event: "Introduced eco-friendly vehicle options" },
    { year: "2024", event: "Serving over 50,000 happy customers" },
  ]);

  const deleteMilestone = (i: number) => {
    setMilestones((prev) => prev.filter((_, idx) => idx !== i));
    toast({ title: "Milestone removed" });
    onChange?.();
  };

  const addMilestone = () => {
    setMilestones((prev) => [...prev, { year: "2025", event: "New milestone" }]);
    toast({ title: "Milestone added" });
    onChange?.();
  };

  return (
    <SectionCard title="Timeline / Milestones" subtitle="Company history timeline on the About page">
      {milestones.map((m, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="grid grid-cols-[80px_1fr] gap-3 items-center flex-1">
            <Field label="Year" value={m.year} onChange={onChange} />
            <Field label="Milestone" value={m.event} onChange={onChange} />
          </div>
          <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10 h-7 mt-6" onClick={() => deleteMilestone(i)}>
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      ))}
      <Button variant="outline" className="gap-2 w-full border-dashed border-gold/30 text-gold hover:bg-gold/5" onClick={addMilestone}>
        <Plus className="w-4 h-4" /> Add Milestone
      </Button>
    </SectionCard>
  );
};

const ContactInfoSection = ({ onChange }: SectionProps) => (
  <SectionCard title="Contact Information" subtitle="Phone, email, address, and hours displayed on the Contact page">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Field label="Phone Number" value="888-535-2566" onChange={onChange} />
      <Field label="Phone Description" value="Available 24/7 for reservations" onChange={onChange} />
      <Field label="Email" value="info@bus2ride.com" onChange={onChange} />
      <Field label="Email Description" value="We respond within 2 hours" onChange={onChange} />
      <Field label="Service Area" value="Nationwide Service" onChange={onChange} />
      <Field label="Area Description" value="We operate across all 50 states" onChange={onChange} />
      <Field label="Hours" value="24/7 Support" onChange={onChange} />
      <Field label="Hours Description" value="Always here when you need us" onChange={onChange} />
    </div>
  </SectionCard>
);

const ContactFormSection = ({ onChange }: SectionProps) => (
  <SectionCard title="Contact Form Configuration" subtitle="Labels and placeholders for the contact form">
    <Field label="Form Heading" value="Get a Free Quote" onChange={onChange} />
    <Field label="Form Description" value="Fill out the form below and we'll get back to you with a personalized quote within 2 hours." rows={2} onChange={onChange} />
    <Field label="Submit Button Text" value="Submit Request" onChange={onChange} />
  </SectionCard>
);

const ServicesSection = ({ onChange }: SectionProps) => {
  const { toast } = useToast();
  const [services, setServices] = useState([
    { title: "Airport Transfers", subtitle: "Reliable pickup and drop-off service", desc: "Start and end your journey stress-free..." },
    { title: "Corporate Transportation", subtitle: "Professional business travel solutions", desc: "Impress clients and keep your team moving..." },
    { title: "Group Charters", subtitle: "Custom transportation for any group size", desc: "Whether it's a school field trip, church outing..." },
    { title: "Wine Tours & Tastings", subtitle: "Explore vineyards in style", desc: "Tour local wineries and enjoy tastings..." },
    { title: "Casino Trips", subtitle: "Round-trip casino transportation", desc: "Enjoy a night at the casino without the hassle..." },
    { title: "City Tours", subtitle: "Explore the city in comfort", desc: "Discover the best sights and attractions..." },
  ]);

  const deleteService = (i: number) => {
    setServices((prev) => prev.filter((_, idx) => idx !== i));
    toast({ title: "Service removed" });
    onChange?.();
  };

  const addService = () => {
    setServices((prev) => [...prev, { title: "New Service", subtitle: "Subtitle", desc: "Description" }]);
    toast({ title: "Service added" });
    onChange?.();
  };

  return (
    <SectionCard title="Service Types" subtitle="Services listed on the Services page">
      {services.map((s, i) => (
        <DeletableItem key={i} title={s.title} onDelete={() => deleteService(i)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Field label="Title" value={s.title} onChange={onChange} />
            <Field label="Subtitle" value={s.subtitle} onChange={onChange} />
          </div>
          <div className="mt-3">
            <Field label="Description" value={s.desc} rows={2} onChange={onChange} />
          </div>
        </DeletableItem>
      ))}
      <Button variant="outline" className="gap-2 w-full border-dashed border-gold/30 text-gold hover:bg-gold/5" onClick={addService}>
        <Plus className="w-4 h-4" /> Add Service
      </Button>
    </SectionCard>
  );
};

const ServicesFeaturesSection = ({ onChange }: SectionProps) => (
  <SectionCard title="Features Bar" subtitle="Feature highlights shown at the top of the Services page">
    {[
      { title: "24/7 Availability", desc: "Round-the-clock service for all your transportation needs." },
      { title: "Safety First", desc: "Licensed, insured, and rigorously maintained vehicles." },
      { title: "GPS Tracking", desc: "Real-time tracking for peace of mind." },
      { title: "Dedicated Support", desc: "Personal account managers for corporate clients." },
    ].map((f, i) => (
      <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 bg-secondary/50 border border-border">
        <Field label="Title" value={f.title} onChange={onChange} />
        <Field label="Description" value={f.desc} onChange={onChange} />
      </div>
    ))}
  </SectionCard>
);

const PricingTiersSection = ({ onChange }: SectionProps) => {
  const { toast } = useToast();
  const [tiers, setTiers] = useState([
    { name: "Luxury Sedan", range: "$75 - $150", passengers: "Up to 3 passengers" },
    { name: "Limousine", range: "$150 - $300", passengers: "Up to 10 passengers" },
    { name: "Party Bus", range: "$200 - $500", passengers: "Up to 40 passengers" },
    { name: "Coach Bus", range: "$150 - $400", passengers: "Up to 56 passengers" },
  ]);

  const deleteTier = (i: number) => {
    setTiers((prev) => prev.filter((_, idx) => idx !== i));
    toast({ title: "Pricing tier removed" });
    onChange?.();
  };

  const addTier = () => {
    setTiers((prev) => [...prev, { name: "New Vehicle", range: "$0 - $0", passengers: "Up to 0 passengers" }]);
    toast({ title: "Pricing tier added" });
    onChange?.();
  };

  return (
    <SectionCard title="Pricing Tiers" subtitle="Vehicle pricing cards on the Pricing page">
      {tiers.map((t, i) => (
        <DeletableItem key={i} title={t.name} onDelete={() => deleteTier(i)}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Field label="Vehicle Name" value={t.name} onChange={onChange} />
            <Field label="Price Range" value={t.range} onChange={onChange} />
            <Field label="Passengers" value={t.passengers} onChange={onChange} />
          </div>
        </DeletableItem>
      ))}
      <Button variant="outline" className="gap-2 w-full border-dashed border-gold/30 text-gold hover:bg-gold/5" onClick={addTier}>
        <Plus className="w-4 h-4" /> Add Pricing Tier
      </Button>
    </SectionCard>
  );
};

const PricingComparisonSection = () => (
  <SectionCard title="Comparison Table" subtitle="Feature comparison table on the Pricing page">
    <p className="text-sm text-muted-foreground">
      The comparison table is auto-generated from the pricing tiers and vehicle features. Edit individual pricing tiers to update the comparison.
    </p>
  </SectionCard>
);

export default AdminContent;
