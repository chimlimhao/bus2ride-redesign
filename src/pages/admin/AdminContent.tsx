import AdminHeader from "@/components/admin/AdminHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, RotateCcw, Plus, Trash2 } from "lucide-react";
import { useSearchParams } from "react-router-dom";

import partyBusImg from "@/assets/fleet/party-bus-hero.jpg";
import limousineImg from "@/assets/fleet/limousine.jpg";
import coachBusImg from "@/assets/fleet/coach-bus.jpg";
import suvLimoImg from "@/assets/fleet/suv-limo.jpg";
import sedanImg from "@/assets/fleet/sedan.jpg";
import sprinterImg from "@/assets/fleet/sprinter-van.jpg";

const AdminContent = () => {
  const [searchParams] = useSearchParams();
  const section = searchParams.get("section") || "hero";

  const renderSection = () => {
    switch (section) {
      case "banner":
        return <BannerSection />;
      case "hero":
        return <HeroSection />;
      case "fleet-showcase":
        return <FleetShowcaseSection />;
      case "how-it-works":
        return <HowItWorksSection />;
      case "events-showcase":
        return <EventsShowcaseSection />;
      case "testimonials":
        return <TestimonialsSection />;
      case "recommended":
        return <RecommendedSection />;
      case "cta":
        return <CTASection />;
      case "about-story":
      case "about":
        return <AboutStorySection />;
      case "about-stats":
        return <AboutStatsSection />;
      case "about-values":
        return <AboutValuesSection />;
      case "about-milestones":
        return <AboutMilestonesSection />;
      case "contact-info":
      case "contact":
        return <ContactInfoSection />;
      case "contact-form":
        return <ContactFormSection />;
      case "services":
        return <ServicesSection />;
      case "services-features":
        return <ServicesFeaturesSection />;
      case "pricing-tiers":
      case "pricing":
        return <PricingTiersSection />;
      case "pricing-comparison":
        return <PricingComparisonSection />;
      default:
        return <HeroSection />;
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
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
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

/* ─── Section Components ─── */

const SectionCard = ({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) => (
  <div className="card-luxury">
    <div className="p-5 border-b border-border">
      <h3 className="font-serif text-lg font-semibold text-foreground">{title}</h3>
      {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
    </div>
    <div className="p-5 space-y-4">{children}</div>
  </div>
);

const Field = ({ label, value, type = "text", rows }: { label: string; value: string; type?: string; rows?: number }) => (
  <div className="space-y-2">
    <Label className="text-foreground text-sm">{label}</Label>
    {rows ? (
      <Textarea defaultValue={value} className="bg-secondary border-border" style={{ minHeight: rows * 24 }} />
    ) : (
      <Input type={type} defaultValue={value} className="bg-secondary border-border" />
    )}
  </div>
);

const BannerSection = () => (
  <SectionCard title="Promotional Banners" subtitle="Links shown in the top banner bar">
    <div className="space-y-4">
      {[
        { label: "Banner 1", text: "🚌 Free Quote on Party Buses", link: "/fleet" },
        { label: "Banner 2", text: "🎉 15% OFF Wedding Packages", link: "/services" },
        { label: "Banner 3", text: "✨ Book Today & Get VIP Treatment", link: "/contact" },
      ].map((b, i) => (
        <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 bg-secondary/50 border border-border">
          <Field label={`${b.label} Text`} value={b.text} />
          <Field label={`${b.label} Link`} value={b.link} />
        </div>
      ))}
    </div>
  </SectionCard>
);

const HeroSection = () => (
  <>
    <SectionCard title="Hero Content" subtitle="Main heading and subtext visible on the landing page">
      <Field label="Badge Text" value="Premium Fleet Rentals" />
      <Field label="Headline Line 1" value="Group Transport" />
      <Field label="Headline Line 2 (Gold)" value="Made Easy" />
      <Field label="Subheading" value="Instant quotes, transparent pricing, and meticulously maintained vehicles for weddings, proms, corporate events, and more." rows={3} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Primary CTA Text" value="Get Instant Quote" />
        <Field label="Secondary CTA Text" value="View Our Fleet" />
      </div>
    </SectionCard>
    <SectionCard title="Trust Indicators" subtitle="Stats displayed below the hero content">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Field label="Stat 1 Value" value="98%" />
        <Field label="Stat 1 Label" value="On-Time Rate" />
        <Field label="Stat 2 Value" value="15K+" />
        <Field label="Stat 2 Label" value="Happy Customers" />
        <Field label="Stat 3 Value" value="150+" />
        <Field label="Stat 3 Label" value="Premium Vehicles" />
        <Field label="Stat 4 Value" value="4.9" />
        <Field label="Stat 4 Label" value="Rating" />
      </div>
    </SectionCard>
    <SectionCard title="Hero Media" subtitle="Background video and fallback image">
      <Field label="Video URL" value="https://cdn.coverr.co/videos/coverr-driving-through-the-city-at-night-5639/1080p.mp4" />
      <Field label="Fallback Image URL" value="https://images.unsplash.com/photo-1563720360172-67b8f3dce741?q=80&w=2048" />
    </SectionCard>
  </>
);

const fleetShowcaseData = [
  { name: "Party Buses", passengers: "20-50 passengers", desc: "Ultimate party experience on wheels.", image: partyBusImg },
  { name: "Stretch Limousines", passengers: "8-12 passengers", desc: "Classic luxury for any occasion.", image: limousineImg },
  { name: "Coach Buses", passengers: "40-56 passengers", desc: "Comfortable group transportation.", image: coachBusImg },
  { name: "SUV Limousines", passengers: "6-8 passengers", desc: "Spacious premium SUV experience.", image: suvLimoImg },
  { name: "Executive Sedans", passengers: "3-4 passengers", desc: "Elegant executive travel.", image: sedanImg },
  { name: "Sprinter Vans", passengers: "12-15 passengers", desc: "Versatile group shuttle.", image: sprinterImg },
];

const FleetShowcaseSection = () => (
  <SectionCard title="Fleet Showcase Cards" subtitle="Vehicle cards shown on the homepage">
    <Field label="Section Title" value='Our Fleet' />
    <Field label="Section Subtitle" value="From intimate limousines to full-size coach buses, we have the perfect vehicle for every occasion." rows={2} />
    <div className="space-y-4 mt-4">
      {fleetShowcaseData.map((v, i) => (
        <div key={i} className="p-4 bg-secondary/50 border border-border">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-foreground">{v.name}</span>
            <Button variant="ghost" size="sm" className="text-destructive h-7"><Trash2 className="w-3.5 h-3.5" /></Button>
          </div>
          <div className="flex gap-4">
            {/* Image Preview & Upload */}
            <div className="shrink-0 space-y-2">
              <Label className="text-foreground text-sm">Image</Label>
              <div className="w-32 h-24 bg-secondary border border-border overflow-hidden relative group">
                <img src={v.image} alt={v.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button variant="ghost" size="sm" className="text-white text-xs h-7 gap-1">
                    <Plus className="w-3 h-3" /> Change
                  </Button>
                </div>
              </div>
            </div>
            {/* Fields */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
              <Field label="Title" value={v.name} />
              <Field label="Passengers" value={v.passengers} />
              <div className="md:col-span-2">
                <Field label="Description" value={v.desc} />
              </div>
              <div className="md:col-span-2">
                <Field label="Image URL" value={v.image} />
              </div>
            </div>
          </div>
        </div>
      ))}
      <Button variant="outline" className="gap-2 w-full"><Plus className="w-4 h-4" /> Add Vehicle Card</Button>
    </div>
  </SectionCard>
);

const HowItWorksSection = () => (
  <SectionCard title="How It Works Steps" subtitle="The 3-step booking process section">
    <Field label="Section Title" value="How It Works" />
    <Field label="Section Subtitle" value="No hidden fees, no complicated process. Just simple, transparent booking." rows={2} />
    {[
      { title: "Request a Quote", desc: "Tell us your event details—date, location, group size—and get an instant estimate." },
      { title: "Confirm Your Booking", desc: "Review your options, select your vehicle, and lock in your reservation with a deposit." },
      { title: "Enjoy the Ride", desc: "Your professional chauffeur arrives on time. Sit back, relax, and enjoy the experience." },
    ].map((step, i) => (
      <div key={i} className="p-4 bg-secondary/50 border border-border">
        <p className="text-xs font-semibold text-gold mb-3">Step {i + 1}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Field label="Title" value={step.title} />
          <Field label="Description" value={step.desc} />
        </div>
      </div>
    ))}
  </SectionCard>
);

const EventsShowcaseSection = () => (
  <SectionCard title="Events Showcase Cards" subtitle="Event cards shown on the homepage">
    <Field label="Section Title" value="Events We Serve" />
    <Field label="Section Subtitle" value="Whatever the occasion, we have the perfect transportation solution." rows={2} />
    <div className="space-y-4 mt-4">
      {["Weddings", "Corporate Events", "Prom & Homecoming", "Bachelor & Bachelorette", "Sports & Game Day", "Concerts & Festivals"].map((e, i) => (
        <div key={i} className="p-4 bg-secondary/50 border border-border">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-foreground">{e}</span>
            <Button variant="ghost" size="sm" className="text-destructive h-7"><Trash2 className="w-3.5 h-3.5" /></Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Field label="Title" value={e} />
            <Field label="Description" value="Elegant transportation for your special day." />
          </div>
        </div>
      ))}
      <Button variant="outline" className="gap-2 w-full"><Plus className="w-4 h-4" /> Add Event Card</Button>
    </div>
  </SectionCard>
);

const TestimonialsSection = () => (
  <SectionCard title="Testimonials Section Header" subtitle="Section heading shown above testimonials">
    <Field label="Label" value="Testimonials" />
    <Field label="Title" value="What Our Clients Say" />
    <Field label="Subtitle" value="See what our customers have to say about their experience with Bus2Ride." rows={2} />
    <p className="text-xs text-muted-foreground pt-2">
      To manage individual testimonials, go to <span className="text-primary font-medium">Content → Testimonials</span>.
    </p>
  </SectionCard>
);

const RecommendedSection = () => (
  <SectionCard title="Recommended Resources" subtitle="Affiliate product cards on the homepage">
    <Field label="Section Label" value="Recommended Resources" />
    <Field label="Section Title" value="Enhance Your Travel Experience" />
    <Field label="Section Subtitle" value="Discover handpicked guides and resources to help you plan the perfect group trip or celebration." rows={2} />
    <div className="space-y-4 mt-4">
      {["Ultimate Road Trip Planner", "Event Planning Masterclass", "Party on Wheels Guide"].map((p, i) => (
        <div key={i} className="p-4 bg-secondary/50 border border-border">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-foreground">{p}</span>
            <Button variant="ghost" size="sm" className="text-destructive h-7"><Trash2 className="w-3.5 h-3.5" /></Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Field label="Title" value={p} />
            <Field label="Category" value="Travel Guides" />
            <Field label="Rating" value="4.8" />
            <Field label="Affiliate Link" value="#" />
          </div>
          <div className="mt-3">
            <Field label="Description" value="Complete guide to planning unforgettable group road trips." rows={2} />
          </div>
        </div>
      ))}
      <Button variant="outline" className="gap-2 w-full"><Plus className="w-4 h-4" /> Add Resource</Button>
    </div>
  </SectionCard>
);

const CTASection = () => (
  <SectionCard title="Call to Action" subtitle="Bottom CTA section on the homepage">
    <Field label="Headline" value="Ready to Book Your Premium Ride?" />
    <Field label="Subtext" value="Get an instant quote in under 60 seconds. No obligation, no hidden fees." rows={2} />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Field label="Primary CTA Text" value="Get Instant Quote" />
      <Field label="Secondary CTA Text" value="Call 888-535-2566" />
    </div>
    <Field label="Footer Note" value="Available 24/7 · Response within 1 hour · Free cancellation up to 48 hours before" />
  </SectionCard>
);

const AboutStorySection = () => (
  <>
    <SectionCard title="Our Story" subtitle="The main narrative on the About page">
      <Field label="Label" value="Our Story" />
      <Field label="Heading" value="Redefining Luxury Transportation" />
      <Field label="Paragraph 1" value="Founded in 2008, Bus2Ride began with a simple vision: to provide exceptional group transportation that combines luxury, reliability, and outstanding service." rows={3} />
      <Field label="Paragraph 2" value="What started as a single party bus operation has grown into a nationwide network of premium vehicles..." rows={3} />
      <Field label="Paragraph 3" value="Today, we're proud to have transported over 50,000 satisfied customers across all 50 states..." rows={3} />
      <Field label="Image URL" value="https://images.unsplash.com/photo-1563720360172-67b8f3dce741?q=80&w=2070" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Badge Value" value="15+" />
        <Field label="Badge Label" value="Years of Excellence" />
      </div>
    </SectionCard>
  </>
);

const AboutStatsSection = () => (
  <SectionCard title="Company Statistics" subtitle="Key numbers displayed on the About page">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[
        { value: "15+", label: "Years of Experience" },
        { value: "50K+", label: "Happy Customers" },
        { value: "98%", label: "On-Time Rate" },
        { value: "500+", label: "Vehicles Nationwide" },
      ].map((s, i) => (
        <div key={i} className="space-y-3">
          <Field label={`Stat ${i + 1} Value`} value={s.value} />
          <Field label={`Stat ${i + 1} Label`} value={s.label} />
        </div>
      ))}
    </div>
  </SectionCard>
);

const AboutValuesSection = () => (
  <SectionCard title="Company Values" subtitle="Value cards on the About page">
    {[
      { title: "Safety First", desc: "All our vehicles undergo rigorous safety inspections..." },
      { title: "Premium Quality", desc: "We maintain the highest standards for our fleet..." },
      { title: "Punctuality", desc: "With a 98% on-time rate, you can trust us..." },
      { title: "Customer Focus", desc: "Your satisfaction is our priority..." },
    ].map((v, i) => (
      <div key={i} className="p-4 bg-secondary/50 border border-border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Field label="Title" value={v.title} />
          <Field label="Description" value={v.desc} />
        </div>
      </div>
    ))}
  </SectionCard>
);

const AboutMilestonesSection = () => (
  <SectionCard title="Timeline / Milestones" subtitle="Company history timeline on the About page">
    {[
      { year: "2008", event: "Bus2Ride founded with a single party bus" },
      { year: "2012", event: "Expanded fleet to include luxury limousines" },
      { year: "2015", event: "Launched nationwide service coverage" },
      { year: "2018", event: "Reached 25,000 satisfied customers" },
      { year: "2021", event: "Introduced eco-friendly vehicle options" },
      { year: "2024", event: "Serving over 50,000 happy customers" },
    ].map((m, i) => (
      <div key={i} className="grid grid-cols-[80px_1fr] gap-3 items-center">
        <Field label="Year" value={m.year} />
        <Field label="Milestone" value={m.event} />
      </div>
    ))}
    <Button variant="outline" className="gap-2 w-full"><Plus className="w-4 h-4" /> Add Milestone</Button>
  </SectionCard>
);

const ContactInfoSection = () => (
  <SectionCard title="Contact Information" subtitle="Phone, email, address, and hours displayed on the Contact page">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Field label="Phone Number" value="888-535-2566" />
      <Field label="Phone Description" value="Available 24/7 for reservations" />
      <Field label="Email" value="info@bus2ride.com" />
      <Field label="Email Description" value="We respond within 2 hours" />
      <Field label="Service Area" value="Nationwide Service" />
      <Field label="Area Description" value="We operate across all 50 states" />
      <Field label="Hours" value="24/7 Support" />
      <Field label="Hours Description" value="Always here when you need us" />
    </div>
  </SectionCard>
);

const ContactFormSection = () => (
  <SectionCard title="Contact Form Configuration" subtitle="Labels and placeholders for the contact form">
    <Field label="Form Heading" value="Get a Free Quote" />
    <Field label="Form Description" value="Fill out the form below and we'll get back to you with a personalized quote within 2 hours." rows={2} />
    <Field label="Submit Button Text" value="Submit Request" />
  </SectionCard>
);

const ServicesSection = () => (
  <SectionCard title="Service Types" subtitle="Services listed on the Services page">
    {["Airport Transfers", "Corporate Transportation", "Group Charters", "Wine Tours & Tastings", "Casino Trips", "City Tours"].map((s, i) => (
      <div key={i} className="p-4 bg-secondary/50 border border-border">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-foreground">{s}</span>
          <Button variant="ghost" size="sm" className="text-destructive h-7"><Trash2 className="w-3.5 h-3.5" /></Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Field label="Title" value={s} />
          <Field label="Subtitle" value="Reliable pickup and drop-off service" />
        </div>
        <div className="mt-3">
          <Field label="Description" value="Start and end your journey stress-free..." rows={2} />
        </div>
      </div>
    ))}
    <Button variant="outline" className="gap-2 w-full"><Plus className="w-4 h-4" /> Add Service</Button>
  </SectionCard>
);

const ServicesFeaturesSection = () => (
  <SectionCard title="Features Bar" subtitle="Feature highlights shown at the top of the Services page">
    {[
      { title: "24/7 Availability", desc: "Round-the-clock service for all your transportation needs." },
      { title: "Safety First", desc: "Licensed, insured, and rigorously maintained vehicles." },
      { title: "GPS Tracking", desc: "Real-time tracking for peace of mind." },
      { title: "Dedicated Support", desc: "Personal account managers for corporate clients." },
    ].map((f, i) => (
      <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 bg-secondary/50 border border-border">
        <Field label="Title" value={f.title} />
        <Field label="Description" value={f.desc} />
      </div>
    ))}
  </SectionCard>
);

const PricingTiersSection = () => (
  <SectionCard title="Pricing Tiers" subtitle="Vehicle pricing cards on the Pricing page">
    {[
      { name: "Luxury Sedan", range: "$75 - $150", passengers: "Up to 3 passengers" },
      { name: "Limousine", range: "$150 - $300", passengers: "Up to 10 passengers" },
      { name: "Party Bus", range: "$200 - $500", passengers: "Up to 40 passengers" },
      { name: "Coach Bus", range: "$150 - $400", passengers: "Up to 56 passengers" },
    ].map((t, i) => (
      <div key={i} className="p-4 bg-secondary/50 border border-border">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-foreground">{t.name}</span>
          <Button variant="ghost" size="sm" className="text-destructive h-7"><Trash2 className="w-3.5 h-3.5" /></Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Field label="Vehicle Name" value={t.name} />
          <Field label="Price Range" value={t.range} />
          <Field label="Passengers" value={t.passengers} />
        </div>
      </div>
    ))}
    <Button variant="outline" className="gap-2 w-full"><Plus className="w-4 h-4" /> Add Pricing Tier</Button>
  </SectionCard>
);

const PricingComparisonSection = () => (
  <SectionCard title="Comparison Table" subtitle="Feature comparison table on the Pricing page">
    <p className="text-sm text-muted-foreground">
      The comparison table is auto-generated from the pricing tiers and vehicle features. Edit individual pricing tiers to update the comparison.
    </p>
  </SectionCard>
);

export default AdminContent;
