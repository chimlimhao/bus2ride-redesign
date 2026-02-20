import AdminHeader from "@/components/admin/AdminHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Save, RotateCcw, Plus, Trash2, Upload, Image as ImageIcon, Loader2,
  FileText, Calendar, Bus, Clock, CreditCard, MapPin, Users, Shield, Star,
  CheckCircle, Tag, Gift, Truck, Info, AlertCircle, Headphones
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSearchParams } from "react-router-dom";
import { useState, useCallback, useRef, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@bus2ride/shared/supabase";
import { uploadImage } from "@/lib/supabase-storage";

import partyBusImg from "@/assets/fleet/party-bus-hero.jpg";
import limousineImg from "@/assets/fleet/limousine.jpg";
import coachBusImg from "@/assets/fleet/coach-bus.jpg";
import suvLimoImg from "@/assets/fleet/suv-limo.jpg";
import sedanImg from "@/assets/fleet/sedan.jpg";
import sprinterImg from "@/assets/fleet/sprinter-van.jpg";

const getSupabaseInfo = (section: string) => {
  switch (section) {
    case "banner": return { slug: "home", sectionId: "top-banner" };
    case "hero": return { slug: "home", sectionId: "hero" };
    case "fleet-showcase": return { slug: "home", sectionId: "fleet-showcase" };
    case "how-it-works": return { slug: "home", sectionId: "how-it-works" };
    case "events-showcase": return { slug: "home", sectionId: "events-showcase" };
    case "testimonials": return { slug: "home", sectionId: "testimonials" };
    case "recommended": return { slug: "home", sectionId: "affiliate" };
    case "cta": return { slug: "global", sectionId: "cta" };
    case "about-story": case "about": return { slug: "about", sectionId: "story" };
    case "about-stats": return { slug: "about", sectionId: "stats" };
    case "about-values": return { slug: "about", sectionId: "values" };
    case "about-milestones": return { slug: "about", sectionId: "journey" };
    case "contact-info": case "contact": return { slug: "contact", sectionId: "info" };
    case "contact-form": return { slug: "contact", sectionId: "form" };
    case "services": return { slug: "services", sectionId: "hero" };
    case "services-features": return { slug: "services", sectionId: "features" };
    case "pricing-tiers": case "pricing": return { slug: "pricing", sectionId: "hero" };
    default: return { slug: "home", sectionId: "hero" };
  }
};

const AdminContent = () => {
  const [searchParams] = useSearchParams();
  const section = searchParams.get("section") || "hero";
  const { toast } = useToast();
  const [hasChanges, setHasChanges] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState<any>(null);

  const fetchContent = useCallback(async () => {
    try {
      setLoading(true);
      const { slug, sectionId } = getSupabaseInfo(section);
      const { data: contentData, error } = await supabase
        .from('pages_content')
        .select('content')
        .eq('slug', slug)
        .eq('section_id', sectionId)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      setData(contentData?.content || {});
      setHasChanges(false);
    } catch (err) {
      console.error('Error fetching content:', err);
      toast({
        title: "Error",
        description: "Failed to load current content for this section.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, [section, toast]);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  const handleSave = async () => {
    try {
      setSaving(true);
      const { slug, sectionId } = getSupabaseInfo(section);

      const { error } = await supabase
        .from('pages_content')
        .upsert({
          slug,
          section_id: sectionId,
          content: data,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'slug,section_id'
        });

      if (error) throw error;

      toast({ title: "Changes saved", description: "The section has been updated successfully." });
      setHasChanges(false);
    } catch (err) {
      console.error('Error saving content:', err);
      toast({
        title: "Save Failed",
        description: "An error occurred while saving. Please check your connection and try again.",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const handleReset = useCallback(() => {
    fetchContent();
    toast({ title: "Changes reset", description: "All changes have been reverted." });
    setHasChanges(false);
  }, [fetchContent, toast]);

  const updateData = (newData: any) => {
    setData(newData);
    setHasChanges(true);
  };

  const renderSection = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-gold" />
          <p className="text-sm text-muted-foreground">Loading content...</p>
        </div>
      );
    }

    if (!data) return null;

    switch (section) {
      case "banner": return <BannerSection data={data} onChange={updateData} />;
      case "hero": return <HeroSection data={data} onChange={updateData} />;
      case "fleet-showcase": return <FleetShowcaseSection data={data} onChange={updateData} />;
      case "how-it-works": return <HowItWorksSection data={data} onChange={updateData} />;
      case "events-showcase": return <EventsShowcaseSection data={data} onChange={updateData} />;
      case "testimonials": return <TestimonialsSection data={data} onChange={updateData} />;
      case "recommended": return <RecommendedSection data={data} onChange={updateData} />;
      case "cta": return <CTASectionEditor data={data} onChange={updateData} />;
      case "about-story": case "about": return <AboutStorySection data={data} onChange={updateData} />;
      case "about-stats": return <AboutStatsSection data={data} onChange={updateData} />;
      case "about-values": return <AboutValuesSection data={data} onChange={updateData} />;
      case "about-milestones": return <AboutMilestonesSection data={data} onChange={updateData} />;
      case "contact-info": case "contact": return <ContactInfoSection data={data} onChange={updateData} />;
      case "contact-form": return <ContactFormSection data={data} onChange={updateData} />;
      case "services": return <ServicesSection data={data} onChange={updateData} />;
      case "services-features": return <ServicesFeaturesSection data={data} onChange={updateData} />;
      case "pricing-tiers": case "pricing": return <PricingTiersSection data={data} onChange={updateData} />;
      case "pricing-comparison": return <PricingComparisonSection />;
      default: return <HeroSection data={data} onChange={updateData} />;
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
            <Button
              variant="outline"
              className="gap-2"
              onClick={handleReset}
              disabled={loading || saving}
            >
              <RotateCcw className="w-4 h-4" /> Reset Changes
            </Button>
            <Button
              className="gap-2 bg-gold text-gold-foreground hover:bg-gold/90"
              onClick={handleSave}
              disabled={loading || saving || !hasChanges}
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {saving ? "Saving..." : "Save All Changes"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};


/* ─── Shared Components ─── */

interface SectionProps {
  data: any;
  onChange: (data: any) => void;
}

const ICON_OPTIONS = [
  { label: "Document", value: "FileText", icon: FileText },
  { label: "Calendar", value: "Calendar", icon: Calendar },
  { label: "Bus", value: "Bus", icon: Bus },
  { label: "Clock", value: "Clock", icon: Clock },
  { label: "Credit Card", value: "CreditCard", icon: CreditCard },
  { label: "Map Pin", value: "MapPin", icon: MapPin },
  { label: "Users", value: "Users", icon: Users },
  { label: "Shield", value: "Shield", icon: Shield },
  { label: "Star", value: "Star", icon: Star },
  { label: "Check", value: "CheckCircle", icon: CheckCircle },
  { label: "Tag", value: "Tag", icon: Tag },
  { label: "Gift", value: "Gift", icon: Gift },
  { label: "Truck", value: "Truck", icon: Truck },
  { label: "Info", value: "Info", icon: Info },
  { label: "Alert", value: "AlertCircle", icon: AlertCircle },
  { label: "Support", value: "Headphones", icon: Headphones },
];

const IconSelect = ({ value, onChange, label }: { value: string; onChange: (val: string) => void; label: string }) => {
  return (
    <div className="space-y-1.5">
      <Label className="text-foreground text-xs">{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="bg-secondary border-border h-10">
          <SelectValue placeholder="Select icon" />
        </SelectTrigger>
        <SelectContent className="bg-card border-border">
          {ICON_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              <div className="flex items-center gap-2">
                <opt.icon className="w-4 h-4 text-gold" />
                <span>{opt.label}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

const SectionCard = ({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) => (
  <div className="card-luxury">
    <div className="p-5 border-b border-border">
      <h3 className="font-serif text-lg font-semibold text-foreground">{title}</h3>
      {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
    </div>
    <div className="p-5 space-y-4">{children}</div>
  </div>
);

const Field = ({ label, value, type = "text", rows, onChange }: { label: string; value: any; type?: string; rows?: number; onChange?: (val: string) => void }) => (
  <div className="space-y-2">
    <Label className="text-foreground text-sm">{label}</Label>
    {type === "textarea" ? (
      <Textarea value={value || ""} className="bg-secondary border-border focus:border-gold/50 focus:ring-gold/20" style={{ minHeight: (rows || 3) * 24 }} onChange={(e) => onChange?.(e.target.value)} />
    ) : (
      <Input type={type} value={value || ""} className="bg-secondary border-border focus:border-gold/50 focus:ring-gold/20" onChange={(e) => onChange?.(e.target.value)} />
    )}
  </div>
);

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

const ImageUploadField = ({
  label,
  src,
  alt,
  onImageChange,
  bucket = "site-assets"
}: {
  label?: string,
  src: string;
  alt: string;
  onImageChange: (url: string) => void;
  bucket?: string;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setUploading(true);
        // Upload to Supabase Storage instead of creating blob URL
        const url = await uploadImage(file, bucket);
        onImageChange(url);
        toast({
          title: "Image uploaded to storage",
          description: "Click 'Save All Changes' at the bottom to apply it to the page."
        });
      } catch (err: any) {
        console.error("Upload error:", err);
        toast({
          title: "Upload Failed",
          description: err.message || "Could not upload image. Make sure the 'site-assets' bucket exists.",
          variant: "destructive"
        });
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <div className="shrink-0 space-y-2">
      <Label className="text-foreground text-sm">{label || "Image"}</Label>
      <div
        className="w-full h-32 bg-secondary border border-border overflow-hidden relative group cursor-pointer"
        onClick={() => !uploading && fileInputRef.current?.click()}
      >
        {src ? (
          <img src={src} alt={alt} className={`w-full h-full object-cover ${uploading ? 'opacity-50' : ''}`} />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground text-xs gap-1">
            <ImageIcon className="w-5 h-5" />
            <span>{uploading ? "Uploading..." : "No image"}</span>
          </div>
        )}

        {uploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <Loader2 className="w-6 h-6 animate-spin text-gold" />
          </div>
        )}

        {!uploading && (
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="text-white text-xs flex items-center gap-1">
              <Upload className="w-3 h-3" /> Change
            </span>
          </div>
        )}
      </div>
      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileSelect} disabled={uploading} />
    </div>
  );
};


/* ─── Section Components ─── */

const BannerSection = ({ data, onChange }: SectionProps) => {
  const updateItem = (index: number, field: string, value: any) => {
    const items = [...(data.items || [])];
    items[index] = { ...items[index], [field]: value };
    onChange({ ...data, items });
  };

  const addItem = () => {
    const items = [...(data.items || []), { text: "New Banner Text", link: "/", icon: "Tag" }];
    onChange({ ...data, items });
  };

  const removeItem = (index: number) => {
    const items = (data.items || []).filter((_: any, idx: number) => idx !== index);
    onChange({ ...data, items });
  };

  return (
    <SectionCard title="Promotional Banners" subtitle="Links shown in the top banner bar">
      <div className="flex items-center gap-2 mb-4">
        <input
          type="checkbox"
          checked={data.active !== false}
          onChange={(e) => onChange({ ...data, active: e.target.checked })}
          className="w-4 h-4 accent-gold"
          id="banner-active"
        />
        <Label htmlFor="banner-active" className="text-sm font-medium">Banner Visible</Label>
      </div>
      <div className="space-y-4">
        {(data.items || []).map((b: any, i: number) => (
          <DeletableItem key={i} title={`Banner ${i + 1}`} onDelete={() => removeItem(i)}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <IconSelect label="Icon" value={b.icon} onChange={(val) => updateItem(i, "icon", val)} />
              <Field label="Text" value={b.text} onChange={(val) => updateItem(i, "text", val)} />
              <Field label="Link" value={b.link} onChange={(val) => updateItem(i, "link", val)} />
            </div>
          </DeletableItem>
        ))}
        <Button variant="outline" className="gap-2 w-full border-dashed border-gold/30 text-gold hover:bg-gold/5" onClick={addItem}>
          <Plus className="w-4 h-4" /> Add Banner
        </Button>
      </div>
    </SectionCard>
  );
};

const HeroSection = ({ data, onChange }: SectionProps) => {
  const updateStat = (index: number, field: string, value: string) => {
    const stats = [...(data.stats || [])];
    const s = stats[index] || { value: "", label: "" };
    stats[index] = { ...s, [field]: value };
    onChange({ ...data, stats });
  };

  return (
    <>
      <SectionCard title="Hero Content" subtitle="Main heading and subtext visible on the landing page">
        <Field label="Badge Text" value={data.badge} onChange={(val) => onChange({ ...data, badge: val })} />
        <Field label="Title" value={data.title} onChange={(val) => onChange({ ...data, title: val })} />
        <Field label="Highlighted Text" value={data.highlighted} onChange={(val) => onChange({ ...data, highlighted: val })} />
        <Field label="Subheading" value={data.subtitle} rows={3} type="textarea" onChange={(val) => onChange({ ...data, subtitle: val })} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Primary CTA Text" value={data.cta_primary} onChange={(val) => onChange({ ...data, cta_primary: val })} />
          <Field label="Secondary CTA Text" value={data.cta_secondary} onChange={(val) => onChange({ ...data, cta_secondary: val })} />
        </div>
      </SectionCard>
      <SectionCard title="Trust Indicators" subtitle="Stats displayed below the hero content">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {(data.stats || []).slice(0, 4).map((s: any, i: number) => (
            <div key={i} className="space-y-3">
              <Field label={`Stat ${i + 1} Value`} value={s.value} onChange={(val) => updateStat(i, "value", val)} />
              <Field label={`Stat ${i + 1} Label`} value={s.label} onChange={(val) => updateStat(i, "label", val)} />
            </div>
          ))}
        </div>
      </SectionCard>
      <SectionCard title="Hero Media" subtitle="Background image">
        <div className="space-y-2">
          <Label className="text-foreground text-sm">Background Image</Label>
          <ImageUploadField
            src={data.image_fallback}
            alt="Hero background"
            onImageChange={(url) => onChange({ ...data, image_fallback: url })}
            bucket="site-assets"
          />
        </div>
      </SectionCard>
    </>
  );
};

const FleetShowcaseSection = ({ data, onChange }: SectionProps) => {
  return (
    <SectionCard title="Fleet Showcase Cards" subtitle="Vehicle cards shown on the homepage">
      <Field label="Section Title" value={data.title} onChange={(val) => onChange({ ...data, title: val })} />
      <Field label="Section Subtitle" value={data.subtitle} rows={2} type="textarea" onChange={(val) => onChange({ ...data, subtitle: val })} />
      <p className="text-[10px] text-muted-foreground mt-2 italic">Note: The vehicle cards themselves are managed in the Fleet section.</p>
    </SectionCard>
  );
};

const HowItWorksSection = ({ data, onChange }: SectionProps) => {
  const updateStep = (index: number, field: string, value: string) => {
    const steps = [...(data.steps || [])];
    steps[index] = { ...steps[index], [field]: value };
    onChange({ ...data, steps });
  };

  return (
    <SectionCard title="How It Works Steps" subtitle="The 3-step booking process section">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Section Title" value={data.title} onChange={(val) => onChange({ ...data, title: val })} />
        <Field label="Highlighted Word" value={data.highlighted} onChange={(val) => onChange({ ...data, highlighted: val })} />
      </div>
      <Field label="Section Subtitle" value={data.subtitle} rows={2} type="textarea" onChange={(val) => onChange({ ...data, subtitle: val })} />

      <p className="text-xs font-semibold text-gold mt-4 mb-2 uppercase tracking-wider">Process Steps</p>
      <div className="space-y-3">
        {(data.steps || []).map((step: any, i: number) => (
          <div key={i} className="p-4 bg-secondary/50 border border-border rounded-lg">
            <p className="text-[10px] font-bold text-gold mb-3 uppercase tracking-tighter">Step {i + 1}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <IconSelect label="Step Icon" value={step.icon} onChange={(val) => updateStep(i, "icon", val)} />
              <Field label="Title" value={step.title} onChange={(val) => updateStep(i, "title", val)} />
              <Field label="Description" value={step.description} onChange={(val) => updateStep(i, "description", val)} />
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
};

const EventsShowcaseSection = ({ data, onChange }: SectionProps) => {
  return (
    <SectionCard title="Events Showcase Cards" subtitle="Event cards shown on the homepage">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Section Title" value={data.title} onChange={(val) => onChange({ ...data, title: val })} />
        <Field label="Highlighted Word" value={data.highlighted} onChange={(val) => onChange({ ...data, highlighted: val })} />
      </div>
      <Field label="Section Subtitle" value={data.subtitle} rows={2} type="textarea" onChange={(val) => onChange({ ...data, subtitle: val })} />
      <p className="text-[10px] text-muted-foreground mt-2 italic">Note: Event categories are managed in the Events section.</p>
    </SectionCard>
  );
};

const TestimonialsSection = ({ data, onChange }: SectionProps) => {
  const updateItem = (index: number, field: string, value: any) => {
    const items = [...(data.items || [])];
    items[index] = { ...items[index], [field]: value };
    onChange({ ...data, items });
  };

  const addItem = () => {
    const items = [...(data.items || []), { name: "New Customer", role: "Client", text: "Testimonial text...", image: "", rating: 5 }];
    onChange({ ...data, items });
  };

  const removeItem = (index: number) => {
    const items = (data.items || []).filter((_: any, idx: number) => idx !== index);
    onChange({ ...data, items });
  };

  return (
    <>
      <SectionCard title="Testimonials Section Header" subtitle="Section heading shown above testimonials">
        <Field label="Label" value={data.badge} onChange={(val) => onChange({ ...data, badge: val })} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Title" value={data.title} onChange={(val) => onChange({ ...data, title: val })} />
          <Field label="Highlighted Word" value={data.highlighted} onChange={(val) => onChange({ ...data, highlighted: val })} />
        </div>
        <Field label="Subtitle" value={data.subtitle} rows={2} type="textarea" onChange={(val) => onChange({ ...data, subtitle: val })} />
      </SectionCard>
      <SectionCard title="Testimonial Cards" subtitle="Individual testimonials with profile pictures">
        <div className="space-y-4">
          {(data.items || []).map((t: any, i: number) => (
            <DeletableItem key={i} title={t.name} onDelete={() => removeItem(i)}>
              <div className="flex gap-4">
                <div className="shrink-0 space-y-2">
                  <ImageUploadField
                    label="Profile Picture"
                    src={t.image}
                    alt={t.name}
                    onImageChange={(url) => updateItem(i, "image", url)}
                    bucket="testimonial-images"
                  />
                </div>
                <div className="flex-1 space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Field label="Name" value={t.name} onChange={(val) => updateItem(i, "name", val)} />
                    <Field label="Role / Event Type" value={t.role} onChange={(val) => updateItem(i, "role", val)} />
                  </div>
                  <Field label="Rating (1-5)" value={String(t.rating)} onChange={(val) => updateItem(i, "rating", val)} />
                  <Field label="Testimonial Text" value={t.text} rows={3} type="textarea" onChange={(val) => updateItem(i, "text", val)} />
                </div>
              </div>
            </DeletableItem>
          ))}
          <Button variant="outline" className="gap-2 w-full border-dashed border-gold/30 text-gold hover:bg-gold/5" onClick={addItem}>
            <Plus className="w-4 h-4" /> Add Testimonial
          </Button>
        </div>
      </SectionCard>
    </>
  );
};

const RecommendedSection = ({ data, onChange }: SectionProps) => {
  const updateItem = (index: number, field: string, value: any) => {
    const items = [...(data.items || [])];
    items[index] = { ...items[index], [field]: value };
    onChange({ ...data, items });
  };

  const addItem = () => {
    const items = [...(data.items || []), { title: "New Resource", category: "Category", rating: "5.0", description: "", link: "#" }];
    onChange({ ...data, items });
  };

  const removeItem = (index: number) => {
    const items = (data.items || []).filter((_: any, idx: number) => idx !== index);
    onChange({ ...data, items });
  };

  return (
    <SectionCard title="Recommended Resources" subtitle="Affiliate product cards on the homepage">
      <Field label="Section Label" value={data.badge} onChange={(val) => onChange({ ...data, badge: val })} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Section Title" value={data.title} onChange={(val) => onChange({ ...data, title: val })} />
        <Field label="Highlighted Word" value={data.highlighted} onChange={(val) => onChange({ ...data, highlighted: val })} />
      </div>
      <Field label="Section Subtitle" value={data.subtitle} rows={2} type="textarea" onChange={(val) => onChange({ ...data, subtitle: val })} />
      <div className="space-y-4 mt-4">
        {(data.items || []).map((p: any, i: number) => (
          <DeletableItem key={i} title={p.title} onDelete={() => removeItem(i)}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Field label="Title" value={p.title} onChange={(val) => updateItem(i, "title", val)} />
              <Field label="Category" value={p.category} onChange={(val) => updateItem(i, "category", val)} />
              <Field label="Rating" value={p.rating} onChange={(val) => updateItem(i, "rating", val)} />
            </div>
            <div className="mt-3">
              <Field label="Description" value={p.description} rows={2} type="textarea" onChange={(val) => updateItem(i, "description", val)} />
            </div>
            <div className="mt-3">
              <Field label="Affiliate Link" value={p.link} onChange={(val) => updateItem(i, "link", val)} />
            </div>
          </DeletableItem>
        ))}
        <Button variant="outline" className="gap-2 w-full border-dashed border-gold/30 text-gold hover:bg-gold/5" onClick={addItem}>
          <Plus className="w-4 h-4" /> Add Resource
        </Button>
      </div>
    </SectionCard>
  );
};

const CTASectionEditor = ({ data, onChange }: SectionProps) => (
  <SectionCard title="Call to Action" subtitle="Bottom CTA section on the homepage">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Field label="Headline" value={data.title} onChange={(val) => onChange({ ...data, title: val })} />
      <Field label="Highlighted Word" value={data.highlighted} onChange={(val) => onChange({ ...data, highlighted: val })} />
    </div>
    <Field label="Subtext" value={data.subtitle} rows={2} type="textarea" onChange={(val) => onChange({ ...data, subtitle: val })} />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Field label="Primary CTA Text" value={data.cta_primary} onChange={(val) => onChange({ ...data, cta_primary: val })} />
      <Field label="Secondary CTA Text" value={data.cta_secondary} onChange={(val) => onChange({ ...data, cta_secondary: val })} />
    </div>
    <Field label="Footer Note" value={data.note} onChange={(val) => onChange({ ...data, note: val })} />
  </SectionCard>
);

const AboutStorySection = ({ data, onChange }: SectionProps) => {
  const updateParagraph = (index: number, value: string) => {
    const paragraphs = [...(data.paragraphs || [])];
    paragraphs[index] = value;
    onChange({ ...data, paragraphs });
  };

  const addParagraph = () => {
    const paragraphs = [...(data.paragraphs || []), ""];
    onChange({ ...data, paragraphs });
  };

  const removeParagraph = (index: number) => {
    const paragraphs = (data.paragraphs || []).filter((_: any, idx: number) => idx !== index);
    onChange({ ...data, paragraphs });
  };

  return (
    <SectionCard title="Our Story" subtitle="The main narrative on the About page">
      <Field label="Badge" value={data.badge} onChange={(val) => onChange({ ...data, badge: val })} />
      <Field label="Heading" value={data.title} onChange={(val) => onChange({ ...data, title: val })} />
      <Field label="Highlighted Text" value={data.highlighted} onChange={(val) => onChange({ ...data, highlighted: val })} />

      <div className="space-y-4 my-4">
        <Label className="text-foreground text-sm">Story Paragraphs</Label>
        {(data.paragraphs || []).map((p: string, i: number) => (
          <div key={i} className="flex gap-2">
            <div className="flex-1">
              <Field label={`Paragraph ${i + 1}`} value={p} rows={3} type="textarea" onChange={(val) => updateParagraph(i, val)} />
            </div>
            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10 h-10 mt-6" onClick={() => removeParagraph(i)}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
        <Button variant="outline" size="sm" className="gap-2 w-full border-dashed border-gold/30 text-gold hover:bg-gold/5" onClick={addParagraph}>
          <Plus className="w-4 h-4" /> Add Paragraph
        </Button>
      </div>

      <div className="space-y-2 mt-4">
        <Label className="text-foreground text-sm">Story Image</Label>
        <ImageUploadField
          src={data.image}
          alt="Story"
          onImageChange={(url) => onChange({ ...data, image: url })}
          bucket="site-assets"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <Field label="Experience Value" value={data.exp_value} onChange={(val) => onChange({ ...data, exp_value: val })} />
        <Field label="Experience Label" value={data.exp_label} onChange={(val) => onChange({ ...data, exp_label: val })} />
      </div>
    </SectionCard>
  );
};

const AboutStatsSection = ({ data, onChange }: SectionProps) => {
  const updateStat = (index: number, field: string, value: string) => {
    const items = [...(data.items || [])];
    items[index] = { ...items[index], [field]: value };
    onChange({ ...data, items });
  };

  return (
    <SectionCard title="Company Statistics" subtitle="Key numbers displayed on the About page">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {(data.items || []).map((s: any, i: number) => (
          <div key={i} className="space-y-3">
            <Field label={`Stat ${i + 1} Value`} value={s.value} onChange={(val) => updateStat(i, "value", val)} />
            <Field label={`Stat ${i + 1} Label`} value={s.label} onChange={(val) => updateStat(i, "label", val)} />
          </div>
        ))}
      </div>
    </SectionCard>
  );
};

const AboutValuesSection = ({ data, onChange }: SectionProps) => {
  const updateItem = (index: number, field: string, value: any) => {
    const items = [...(data.items || [])];
    items[index] = { ...items[index], [field]: value };
    onChange({ ...data, items });
  };

  const addItem = () => {
    const items = [...(data.items || []), { title: "New Value", description: "", icon: "Shield" }];
    onChange({ ...data, items });
  };

  const removeItem = (index: number) => {
    const items = (data.items || []).filter((_: any, idx: number) => idx !== index);
    onChange({ ...data, items });
  };

  return (
    <>
      <SectionCard title="Company Values Header" subtitle="Header text for the values section">
        <Field label="Section Badge" value={data.badge} onChange={(val) => onChange({ ...data, badge: val })} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Section Title" value={data.title} onChange={(val) => onChange({ ...data, title: val })} />
          <Field label="Highlighted Word" value={data.highlighted} onChange={(val) => onChange({ ...data, highlighted: val })} />
        </div>
      </SectionCard>
      <SectionCard title="Company Values" subtitle="Value cards on the About page">
        <div className="space-y-4">
          {(data.items || []).map((v: any, i: number) => (
            <DeletableItem key={i} title={v.title} onDelete={() => removeItem(i)}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <IconSelect label="Value Icon" value={v.icon} onChange={(val) => updateItem(i, "icon", val)} />
                <Field label="Title" value={v.title} onChange={(val) => updateItem(i, "title", val)} />
                <Field label="Description" value={v.description} onChange={(val) => updateItem(i, "description", val)} />
              </div>
            </DeletableItem>
          ))}
          <Button variant="outline" className="gap-2 w-full border-dashed border-gold/30 text-gold hover:bg-gold/5" onClick={addItem}>
            <Plus className="w-4 h-4" /> Add Value
          </Button>
        </div>
      </SectionCard>
    </>
  );
};

const AboutMilestonesSection = ({ data, onChange }: SectionProps) => {
  const updateItem = (index: number, field: string, value: any) => {
    const items = [...(data.items || [])];
    items[index] = { ...items[index], [field]: value };
    onChange({ ...data, items });
  };

  const addItem = () => {
    const items = [...(data.items || []), { year: "2025", event: "New milestone" }];
    onChange({ ...data, items });
  };

  const removeItem = (index: number) => {
    const items = (data.items || []).filter((_: any, idx: number) => idx !== index);
    onChange({ ...data, items });
  };

  return (
    <>
      <SectionCard title="Company Journey Header" subtitle="Header text for the timeline section">
        <Field label="Section Badge" value={data.badge} onChange={(val) => onChange({ ...data, badge: val })} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Section Title" value={data.title} onChange={(val) => onChange({ ...data, title: val })} />
          <Field label="Highlighted Word" value={data.highlighted} onChange={(val) => onChange({ ...data, highlighted: val })} />
        </div>
      </SectionCard>
      <SectionCard title="Timeline / Milestones" subtitle="Company history timeline on the About page">
        <div className="space-y-4">
          {(data.items || []).map((m: any, i: number) => (
            <div key={i} className="flex items-center gap-3">
              <div className="grid grid-cols-[80px_1fr] gap-3 items-center flex-1">
                <Field label="Year" value={m.year} onChange={(val) => updateItem(i, "year", val)} />
                <Field label="Milestone" value={m.event} onChange={(val) => updateItem(i, "event", val)} />
              </div>
              <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10 h-7 mt-6" onClick={() => removeItem(i)}>
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          ))}
          <Button variant="outline" className="gap-2 w-full border-dashed border-gold/30 text-gold hover:bg-gold/5" onClick={addItem}>
            <Plus className="w-4 h-4" /> Add Milestone
          </Button>
        </div>
      </SectionCard>
    </>
  );
};

const ContactInfoSection = ({ data, onChange }: SectionProps) => (
  <SectionCard title="Contact Information" subtitle="Phone, email, address, and hours displayed on the Contact page">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Field label="Phone Number" value={data.phone} onChange={(val) => onChange({ ...data, phone: val })} />
      <Field label="Phone Description" value={data.phone_desc} onChange={(val) => onChange({ ...data, phone_desc: val })} />
      <Field label="Email" value={data.email} onChange={(val) => onChange({ ...data, email: val })} />
      <Field label="Email Description" value={data.email_desc} onChange={(val) => onChange({ ...data, email_desc: val })} />
      <Field label="Service Area" value={data.area} onChange={(val) => onChange({ ...data, area: val })} />
      <Field label="Area Description" value={data.area_desc} onChange={(val) => onChange({ ...data, area_desc: val })} />
      <Field label="Hours" value={data.hours} onChange={(val) => onChange({ ...data, hours: val })} />
      <Field label="Hours Description" value={data.hours_desc} onChange={(val) => onChange({ ...data, hours_desc: val })} />
    </div>
  </SectionCard>
);

const ContactFormSection = ({ data, onChange }: SectionProps) => (
  <SectionCard title="Contact Form Configuration" subtitle="Labels and placeholders for the contact form">
    <Field label="Form Heading" value={data.title} onChange={(val) => onChange({ ...data, title: val })} />
    <Field label="Form Description" value={data.subtitle} rows={2} type="textarea" onChange={(val) => onChange({ ...data, subtitle: val })} />
    <Field label="Submit Button Text" value={data.cta} onChange={(val) => onChange({ ...data, cta: val })} />
  </SectionCard>
);

const ServicesSection = ({ data, onChange }: SectionProps) => {
  const updateItem = (index: number, field: string, value: any) => {
    const items = [...(data.items || [])];
    items[index] = { ...items[index], [field]: value };
    onChange({ ...data, items });
  };

  const addItem = () => {
    const items = [...(data.items || []), { title: "New Service", subtitle: "Subtitle", description: "", image: "" }];
    onChange({ ...data, items });
  };

  const removeItem = (index: number) => {
    const items = (data.items || []).filter((_: any, idx: number) => idx !== index);
    onChange({ ...data, items });
  };

  return (
    <SectionCard title="Service Types" subtitle="Services listed on the Services page">
      <div className="space-y-4">
        {(data.items || []).map((s: any, i: number) => (
          <DeletableItem key={i} title={s.title} onDelete={() => removeItem(i)}>
            <div className="flex gap-4">
              <ImageUploadField
                src={s.image}
                alt={s.title}
                onImageChange={(url) => updateItem(i, "image", url)}
                bucket="service-images"
              />
              <div className="flex-1 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Field label="Title" value={s.title} onChange={(val) => updateItem(i, "title", val)} />
                  <Field label="Subtitle" value={s.subtitle} onChange={(val) => updateItem(i, "subtitle", val)} />
                </div>
                <Field label="Description" value={s.description} rows={2} type="textarea" onChange={(val) => updateItem(i, "description", val)} />
              </div>
            </div>
          </DeletableItem>
        ))}
        <Button variant="outline" className="gap-2 w-full border-dashed border-gold/30 text-gold hover:bg-gold/5" onClick={addItem}>
          <Plus className="w-4 h-4" /> Add Service
        </Button>
      </div>
    </SectionCard>
  );
};

const ServicesFeaturesSection = ({ data, onChange }: SectionProps) => {
  const updateItem = (index: number, field: string, value: any) => {
    const items = [...(data.items || [])];
    items[index] = { ...items[index], [field]: value };
    onChange({ ...data, items });
  };

  return (
    <SectionCard title="Features Bar" subtitle="Feature highlights shown at the top of the Services page">
      <div className="space-y-4">
        {(data.items || []).map((f: any, i: number) => (
          <div key={i} className="p-4 bg-secondary/50 border border-border space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <IconSelect label="Feature Icon" value={f.icon} onChange={(val) => updateItem(i, "icon", val)} />
              <Field label="Title" value={f.title} onChange={(val) => updateItem(i, "title", val)} />
            </div>
            <Field label="Description" value={f.description} onChange={(val) => updateItem(i, "description", val)} />
          </div>
        ))}
      </div>
    </SectionCard>
  );
};

const PricingTiersSection = ({ data, onChange }: SectionProps) => {
  const updateItem = (index: number, field: string, value: any) => {
    const items = [...(data.items || [])];
    items[index] = { ...items[index], [field]: value };
    onChange({ ...data, items });
  };

  const addItem = () => {
    const items = [...(data.items || []), { name: "New Vehicle", price_range: "$0 - $0", passengers: "Up to 0 passengers" }];
    onChange({ ...data, items });
  };

  const removeItem = (index: number) => {
    const items = (data.items || []).filter((_: any, idx: number) => idx !== index);
    onChange({ ...data, items });
  };

  return (
    <SectionCard title="Pricing Tiers" subtitle="Vehicle pricing cards on the Pricing page">
      <div className="space-y-4">
        {(data.items || []).map((t: any, i: number) => (
          <DeletableItem key={i} title={t.name} onDelete={() => removeItem(i)}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Field label="Vehicle Name" value={t.name} onChange={(val) => updateItem(i, "name", val)} />
              <Field label="Price Range" value={t.price_range} onChange={(val) => updateItem(i, "price_range", val)} />
              <Field label="Passengers" value={t.passengers} onChange={(val) => updateItem(i, "passengers", val)} />
            </div>
          </DeletableItem>
        ))}
        <Button variant="outline" className="gap-2 w-full border-dashed border-gold/30 text-gold hover:bg-gold/5" onClick={addItem}>
          <Plus className="w-4 h-4" /> Add Pricing Tier
        </Button>
      </div>
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
