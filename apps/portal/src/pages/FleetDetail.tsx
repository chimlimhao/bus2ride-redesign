import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import FAQ from "@/components/FAQ";
import Testimonials from "@/components/Testimonials";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Users, Check, MessageSquare, ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import QuoteModal from "@/components/QuoteModal";
import AnimatedSection from "@/components/AnimatedSection";
import { supabase } from "@bus2ride/shared/supabase";
import type { Tables } from "@bus2ride/shared/supabase/types";
import { usePageContent, useSiteSettings } from "@/hooks/usePageContent";

type Vehicle = Tables<"fleet_vehicles">;

interface VehicleVariant {
  id: string;
  name: string;
  passengers: string;
  sweetSpot: string;
  type: string;
  image: string;
}

interface FleetDetailFAQs {
  items: { question: string; answer: string }[];
}

const bookingSteps = [
  {
    step: 1,
    title: "Pick date + pickup window",
    description: "We soft-hold the vehicle slot.",
  },
  {
    step: 2,
    title: "Share headcount + stops",
    description: "We map buffers so you stay on time.",
  },
  {
    step: 3,
    title: "Approve quote + pay",
    description: "You get itinerary + arrival notes.",
  },
];

const FleetDetail = () => {
  const { id: slug } = useParams<{ id: string }>();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const { settings } = useSiteSettings();
  const { content: faqs } = usePageContent<FleetDetailFAQs>('fleet', 'detailFAQs');

  useEffect(() => {
    async function fetchVehicle() {
      if (!slug) return;
      try {
        const { data, error } = await supabase
          .from("fleet_vehicles")
          .select("*")
          .eq("slug", slug)
          .single();

        if (error) throw error;
        setVehicle(data);
      } catch (err) {
        console.error("Error fetching vehicle:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchVehicle();
  }, [slug]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const goToPrevious = () => {
    if (!vehicle || !vehicle.gallery_urls) return;
    setLightboxIndex((prev) => (prev === 0 ? (vehicle.gallery_urls as string[]).length - 1 : prev - 1));
  };

  const goToNext = () => {
    if (!vehicle || !vehicle.gallery_urls) return;
    setLightboxIndex((prev) => (prev === (vehicle.gallery_urls as string[]).length - 1 ? 0 : prev + 1));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-32 text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-32 text-center">
          <h1 className="font-serif text-4xl font-bold text-foreground mb-4">Vehicle Not Found</h1>
          <p className="text-muted-foreground mb-8">The vehicle you're looking for doesn't exist.</p>
          <Button variant="gold" asChild>
            <Link to="/fleet">View All Vehicles</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const gallery = Array.isArray(vehicle.gallery_urls) ? (vehicle.gallery_urls as string[]) : [];
  const displayGallery = [vehicle.image_url, ...gallery.filter(url => url !== vehicle.image_url)].filter(Boolean) as string[];
  const variants = Array.isArray(vehicle.variants) ? (vehicle.variants as unknown as VehicleVariant[]) : [];
  const phone = settings.contact_phone || "888-535-2566";

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Vehicle Detail Section */}
      <section className="pt-32 pb-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column - Images */}
            <AnimatedSection direction="left">
              {/* Badges */}
              <div className="flex gap-3 mb-4">
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-green-500/20 text-green-400">
                  {vehicle.category_label || "FEATURED VEHICLE • 24/7 BOOKING"}
                </span>
              </div>

              {/* Title */}
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                {vehicle.name}
              </h1>
              <p className="text-muted-foreground mb-8">
                {vehicle.description}
              </p>

              {/* Main Image with Lightbox */}
              <div
                className="relative overflow-hidden mb-4 cursor-pointer group"
                onClick={() => openLightbox(0)}
              >
                <img
                  src={vehicle.image_url || ""}
                  alt={vehicle.name}
                  className="w-full h-auto object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors flex items-center justify-center">
                  <ZoomIn className="w-10 h-10 text-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 bg-background/80 backdrop-blur-sm text-xs font-medium">
                    TAP TO ZOOM + SWIPE →
                  </span>
                </div>
              </div>

              {/* Gallery Thumbnails */}
              <div className="grid grid-cols-4 gap-2">
                {displayGallery.map((img, index) => (
                  <div
                    key={index}
                    className={`overflow-hidden cursor-pointer group rounded ${index === 0 ? "ring-2 ring-gold" : ""}`}
                    onClick={() => openLightbox(index)}
                  >
                    <img
                      src={img}
                      alt={`${vehicle.name} view ${index + 1}`}
                      className="w-full h-20 object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                ))}
              </div>
            </AnimatedSection>

            {/* Right Column - Booking */}
            <AnimatedSection direction="right" delay={0.2}>
              {/* Fast Booking Card */}
              <div className="card-luxury p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    Fast Booking
                  </span>
                  <span className="px-2 py-1 text-xs font-medium bg-green-500/20 text-green-400">
                    ~2 minutes
                  </span>
                </div>

                <div className="mb-6">
                  <p className="text-sm text-muted-foreground mb-2">Call us (instant help)</p>
                  <a href={`tel:${phone}`} className="text-2xl font-bold text-gold hover:underline flex items-center gap-2">
                    {phone} <ArrowRight className="w-5 h-5" />
                  </a>
                  <p className="text-sm text-muted-foreground mt-2">
                    Tell us date + pickup window + stops. We handle the details.
                  </p>
                </div>

                {/* Booking Steps */}
                <div className="space-y-4 mb-6">
                  {bookingSteps.map((step) => (
                    <div key={step.step} className="p-4 bg-secondary/50">
                      <p className="text-xs text-gold font-semibold uppercase tracking-wider mb-1">
                        Step {step.step}
                      </p>
                      <p className="font-semibold text-foreground">{step.title}</p>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  ))}
                </div>

                <QuoteModal vehicleType={vehicle.name}>
                  <Button variant="gold" size="lg" className="w-full mb-3">
                    Start My Quote
                  </Button>
                </QuoteModal>
                <Button variant="outline" size="lg" className="w-full">
                  Booking FAQs
                </Button>
              </div>

              {/* Features & Amenities */}
              <div className="card-luxury p-6">
                <div className="grid sm:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-foreground mb-4">Features</h3>
                    <ul className="space-y-3">
                      {Array.isArray(vehicle.features) && (vehicle.features as string[]).map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-serif text-xl font-bold text-foreground mb-4">Amenities</h3>
                    <ul className="space-y-3">
                      {Array.isArray(vehicle.amenities) && (vehicle.amenities as string[]).map((amenity, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                          {amenity}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Vehicle Variants Section */}
      {variants.length > 0 && (
        <section className="py-20 bg-card">
          <div className="container">
            <AnimatedSection className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                Choose Your <span className="text-gradient-gold">{vehicle.name}</span>
              </h2>
              <div className="section-divider mb-6" />
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We offer multiple {vehicle.name.toLowerCase()} options to match your exact passenger count and requirements.
              </p>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {variants.map((variant, index) => (
                <AnimatedSection key={variant.id} delay={index * 0.1}>
                  <div className="card-luxury overflow-hidden hover:border-gold/30 transition-colors group">
                    {/* Variant Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={variant.image}
                        alt={variant.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <span className="badge-gold text-xs">{variant.type}</span>
                      </div>
                    </div>

                    {/* Variant Info */}
                    <div className="p-6">
                      <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                        {variant.name}
                      </h3>
                      <div className="flex items-center gap-2 text-gold text-sm mb-2">
                        <Users className="w-4 h-4" />
                        {variant.passengers} passengers
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        Sweet spot: {variant.sweetSpot} guests
                      </p>
                      <QuoteModal vehicleType={variant.name}>
                        <Button variant="gold" size="sm" className="w-full">
                          Get Quote
                        </Button>
                      </QuoteModal>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            {/* Custom Inquiry */}
            <AnimatedSection delay={0.3}>
              <div className="card-luxury p-8 text-center max-w-2xl mx-auto">
                <MessageSquare className="w-12 h-12 text-gold mx-auto mb-4" />
                <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
                  Need a Different Configuration?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Looking for a specific passenger count, vehicle type, or special requirements? Contact us directly and we'll find the perfect solution for your group.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href={`tel:${phone}`}>
                    <Button variant="gold" size="lg">
                      <Phone className="w-4 h-4" />
                      Call {phone}
                    </Button>
                  </a>
                  <QuoteModal>
                    <Button variant="outline" size="lg">
                      Request Custom Quote
                    </Button>
                  </QuoteModal>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      <Testimonials />
      {faqs && (
        <FAQ items={faqs.items} title="Booking FAQs" />
      )}
      <CTASection />
      <Footer />

      {/* Lightbox Dialog - Fixed for smooth operation */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent
          className="max-w-5xl w-full h-[90vh] bg-background border-border p-0 flex flex-col overflow-hidden"
          onPointerDownOutside={(e) => e.preventDefault()}
          hideCloseButton
        >
          {/* Header with close and counter */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-background">
            <span className="text-sm text-muted-foreground font-medium">
              {lightboxIndex + 1} / {displayGallery.length}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="text-foreground hover:bg-secondary"
              onClick={() => setLightboxOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Main Image Container */}
          <div className="flex-1 flex items-center justify-center p-4 md:p-8 relative bg-background/50 min-h-0">
            {/* Previous Button */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 md:h-12 md:w-12 bg-background/80 hover:bg-background border-border"
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>

            {/* Image */}
            <div className="w-full h-full flex items-center justify-center">
              <img
                src={displayGallery[lightboxIndex]}
                alt={`${vehicle.name} view ${lightboxIndex + 1}`}
                className="max-w-full max-h-full object-contain select-none"
                draggable={false}
              />
            </div>

            {/* Next Button */}
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 md:h-12 md:w-12 bg-background/80 hover:bg-background border-border"
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>

          {/* Thumbnail Strip */}
          <div className="p-3 md:p-4 border-t border-border bg-background">
            <div className="flex gap-2 justify-center overflow-x-auto">
              {displayGallery.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setLightboxIndex(index)}
                  className={`flex-shrink-0 w-14 h-14 md:w-16 md:h-16 overflow-hidden transition-all border-2 ${index === lightboxIndex
                      ? "border-gold opacity-100"
                      : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                </button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FleetDetail;

