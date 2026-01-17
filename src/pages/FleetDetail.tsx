import { useState } from "react";
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

// Import vehicle images
import partyBusHero from "@/assets/fleet/party-bus-hero.jpg";
import partyBusInterior from "@/assets/fleet/party-bus-interior.jpg";
import limousine from "@/assets/fleet/limousine.jpg";
import coachBus from "@/assets/fleet/coach-bus.jpg";
import suvLimo from "@/assets/fleet/suv-limo.jpg";
import sedan from "@/assets/fleet/sedan.jpg";
import sprinterVan from "@/assets/fleet/sprinter-van.jpg";

interface VehicleVariant {
  id: string;
  name: string;
  passengers: string;
  sweetSpot: string;
  type: string;
  image: string;
}

const vehicleData: Record<string, {
  title: string;
  categoryLabel: string;
  description: string;
  mainImage: string;
  gallery: string[];
  features: string[];
  amenities: string[];
  variants: VehicleVariant[];
}> = {
  "party-buses": {
    title: "Party Bus",
    categoryLabel: "FEATURED PARTY BUS • 24/7 BOOKING",
    description: "Spacious party buses designed for lively celebrations and group outings. Features premium sound systems, LED lighting, and all the amenities you need for an unforgettable experience.",
    mainImage: partyBusHero,
    gallery: [
      partyBusHero,
      partyBusInterior,
      coachBus,
      limousine,
    ],
    features: [
      "Premium Sound System",
      "LED Lighting & Lasers",
      "Leather Seating",
      "Climate Control",
      "On-board Restroom",
      "Mini Bar Area",
    ],
    amenities: [
      "Dance Pole (select buses)",
      "Bluetooth Connectivity",
      "USB Charging Ports",
      "Tinted Windows",
      "Professional Chauffeur",
      "Ice & Cups Provided",
    ],
    variants: [
      { id: "party-bus-20", name: "20 Passenger Party Bus", passengers: "15-20", sweetSpot: "18", type: "Ford E-450", image: partyBusHero },
      { id: "party-bus-25", name: "25 Passenger Party Bus", passengers: "20-25", sweetSpot: "22", type: "Freightliner", image: partyBusHero },
      { id: "party-bus-30", name: "30 Passenger Party Bus", passengers: "25-30", sweetSpot: "28", type: "Freightliner M2", image: partyBusHero },
      { id: "party-bus-40", name: "40 Passenger Party Bus", passengers: "35-40", sweetSpot: "38", type: "Prevost", image: partyBusHero },
      { id: "party-bus-50", name: "50 Passenger Party Bus", passengers: "45-50", sweetSpot: "48", type: "MCI Coach", image: partyBusHero },
    ],
  },
  "limousines": {
    title: "Stretch Limousine",
    categoryLabel: "FEATURED STRETCH LIMOUSINE • 24/7 BOOKING",
    description: "Classic elegance meets modern luxury. Our stretch limousines provide the perfect setting for weddings, proms, and executive travel with premium amenities and professional service.",
    mainImage: limousine,
    gallery: [
      limousine,
      suvLimo,
      sedan,
      partyBusInterior,
    ],
    features: [
      "Leather Interior",
      "Mini Bar with Glassware",
      "Privacy Divider",
      "Premium Audio System",
      "Fiber Optic Lighting",
      "Sunroof (select models)",
    ],
    amenities: [
      "Champagne Bucket",
      "Bluetooth Audio",
      "Phone Chargers",
      "Bottled Water",
      "Professional Chauffeur",
      "Red Carpet Service",
    ],
    variants: [
      { id: "limo-6", name: "6 Passenger Stretch Limo", passengers: "4-6", sweetSpot: "6", type: "Lincoln Town Car", image: limousine },
      { id: "limo-8", name: "8 Passenger Stretch Limo", passengers: "6-8", sweetSpot: "8", type: "Lincoln Navigator", image: limousine },
      { id: "limo-10", name: "10 Passenger Stretch Limo", passengers: "8-10", sweetSpot: "10", type: "Chrysler 300", image: limousine },
      { id: "limo-14", name: "14 Passenger Stretch Limo", passengers: "12-14", sweetSpot: "14", type: "Hummer H2", image: suvLimo },
      { id: "limo-18", name: "18 Passenger Stretch Limo", passengers: "16-18", sweetSpot: "18", type: "Escalade ESV", image: suvLimo },
    ],
  },
  "coach-buses": {
    title: "Coach Bus",
    categoryLabel: "FEATURED COACH BUS • 24/7 BOOKING",
    description: "Perfect for large groups requiring comfortable long-distance travel. Our coach buses feature panoramic windows, ample storage, and all the amenities for a pleasant journey.",
    mainImage: coachBus,
    gallery: [
      coachBus,
      partyBusHero,
      partyBusInterior,
      limousine,
    ],
    features: [
      "Panoramic Windows",
      "Overhead Storage",
      "On-board Restroom",
      "WiFi Available",
      "Climate Control",
      "Reclining Seats",
    ],
    amenities: [
      "Power Outlets",
      "Reading Lights",
      "PA System",
      "DVD Players",
      "Professional Chauffeur",
      "Luggage Compartment",
    ],
    variants: [
      { id: "coach-36", name: "36 Passenger Coach Bus", passengers: "30-36", sweetSpot: "34", type: "MCI J4500", image: coachBus },
      { id: "coach-45", name: "45 Passenger Coach Bus", passengers: "40-45", sweetSpot: "42", type: "Prevost H3-45", image: coachBus },
      { id: "coach-50", name: "50 Passenger Coach Bus", passengers: "45-50", sweetSpot: "48", type: "Van Hool CX45", image: coachBus },
      { id: "coach-56", name: "56 Passenger Coach Bus", passengers: "50-56", sweetSpot: "54", type: "MCI D4505", image: coachBus },
    ],
  },
  "suv-limos": {
    title: "SUV Limousine",
    categoryLabel: "FEATURED SUV LIMOUSINE • 24/7 BOOKING",
    description: "The perfect blend of rugged style and luxurious comfort. Our SUV limousines offer more headroom and a commanding presence for those who want to make an impression.",
    mainImage: suvLimo,
    gallery: [
      suvLimo,
      limousine,
      sedan,
      partyBusInterior,
    ],
    features: [
      "Spacious Interior",
      "Premium Sound System",
      "Custom LED Lighting",
      "Leather Seating",
      "Mini Bar",
      "Privacy Windows",
    ],
    amenities: [
      "Fiber Optic Ceiling",
      "Flat Screen TV",
      "Bluetooth Audio",
      "Phone Chargers",
      "Professional Chauffeur",
      "Ice & Cups Provided",
    ],
    variants: [
      { id: "suv-limo-8", name: "8 Passenger SUV Limo", passengers: "6-8", sweetSpot: "8", type: "Cadillac Escalade", image: suvLimo },
      { id: "suv-limo-12", name: "12 Passenger SUV Limo", passengers: "10-12", sweetSpot: "12", type: "Lincoln Navigator", image: suvLimo },
      { id: "suv-limo-14", name: "14 Passenger SUV Limo", passengers: "12-14", sweetSpot: "14", type: "Hummer H2", image: suvLimo },
    ],
  },
  "executive-sedans": {
    title: "Executive Sedan",
    categoryLabel: "FEATURED EXECUTIVE SEDAN • 24/7 BOOKING",
    description: "Professional, understated elegance for corporate executives and discerning travelers. Our executive sedans provide a quiet, comfortable ride with premium amenities.",
    mainImage: sedan,
    gallery: [
      sedan,
      suvLimo,
      limousine,
      partyBusInterior,
    ],
    features: [
      "Leather Interior",
      "Rear Climate Control",
      "Bluetooth Audio",
      "Tinted Windows",
      "Extra Legroom",
      "Trunk Space for Luggage",
    ],
    amenities: [
      "Bottled Water",
      "Phone Chargers",
      "WiFi Available",
      "Newspapers/Magazines",
      "Professional Chauffeur",
      "Flight Tracking",
    ],
    variants: [
      { id: "sedan-3", name: "3 Passenger Sedan", passengers: "2-3", sweetSpot: "3", type: "Mercedes S-Class", image: sedan },
      { id: "sedan-4", name: "4 Passenger Sedan", passengers: "3-4", sweetSpot: "4", type: "BMW 7 Series", image: sedan },
      { id: "suv-exec", name: "Executive SUV", passengers: "4-6", sweetSpot: "5", type: "Cadillac Escalade", image: suvLimo },
    ],
  },
  "sprinter-vans": {
    title: "Executive Sprinter Van",
    categoryLabel: "FEATURED SPRINTER VAN • 24/7 BOOKING",
    description: "Versatile luxury vans perfect for medium-sized groups. Ideal for corporate travel, wine tours, and group outings with ample space and premium amenities.",
    mainImage: sprinterVan,
    gallery: [
      sprinterVan,
      partyBusInterior,
      coachBus,
      limousine,
    ],
    features: [
      "Luggage Area",
      "Rear AC/Heating",
      "Custom Interior Lighting",
      "TV & DVD Capabilities",
      "Luxury Leather Interior",
      "High Roof for Standing",
    ],
    amenities: [
      "WiFi Available",
      "Power Outlets",
      "Cooler Space",
      "Bluetooth Audio",
      "Professional Chauffeur",
      "Tinted Windows",
    ],
    variants: [
      { id: "sprinter-10", name: "10 Passenger Sprinter", passengers: "8-10", sweetSpot: "10", type: "Mercedes Sprinter", image: sprinterVan },
      { id: "sprinter-12", name: "12 Passenger Sprinter", passengers: "10-12", sweetSpot: "12", type: "Mercedes Sprinter", image: sprinterVan },
      { id: "sprinter-14", name: "14 Passenger Sprinter", passengers: "12-14", sweetSpot: "14", type: "Mercedes Sprinter", image: sprinterVan },
      { id: "sprinter-16", name: "16 Passenger Sprinter", passengers: "14-16", sweetSpot: "16", type: "Ford Transit", image: sprinterVan },
    ],
  },
};

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

const faqItems = [
  {
    question: "How far in advance should I book?",
    answer: "We recommend booking at least 2-4 weeks in advance for standard events, and 2-3 months for peak season events like proms and weddings.",
  },
  {
    question: "What is included in the rental?",
    answer: "All rentals include a professional chauffeur, fuel, standard gratuity, and basic amenities. Ice, cups, and soft drinks are typically included.",
  },
  {
    question: "Can I bring alcohol?",
    answer: "Adults 21+ may bring their own alcohol on party buses and limousines. We provide ice, cups, and glassware. Alcohol is not permitted for minors.",
  },
  {
    question: "What is your cancellation policy?",
    answer: "Cancellations made 7+ days before the event receive a full refund. Cancellations within 7 days may incur charges. See your contract for details.",
  },
];

const FleetDetail = () => {
  const { id } = useParams<{ id: string }>();
  const vehicle = id ? vehicleData[id] : null;
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const goToPrevious = () => {
    if (!vehicle) return;
    setLightboxIndex((prev) => (prev === 0 ? vehicle.gallery.length - 1 : prev - 1));
  };

  const goToNext = () => {
    if (!vehicle) return;
    setLightboxIndex((prev) => (prev === vehicle.gallery.length - 1 ? 0 : prev + 1));
  };

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
                  {vehicle.categoryLabel}
                </span>
              </div>

              {/* Title */}
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                {vehicle.title}
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
                  src={vehicle.mainImage}
                  alt={vehicle.title}
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
                {vehicle.gallery.map((img, index) => (
                  <div
                    key={index}
                    className="overflow-hidden cursor-pointer group"
                    onClick={() => openLightbox(index)}
                  >
                    <img
                      src={img}
                      alt={`${vehicle.title} view ${index + 1}`}
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
                  <a href="tel:888-535-2566" className="text-2xl font-bold text-gold hover:underline flex items-center gap-2">
                    (888) 535-2566 <ArrowRight className="w-5 h-5" />
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

                <QuoteModal vehicleType={vehicle.title}>
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
                <h3 className="font-serif text-xl font-bold text-foreground mb-4">Features</h3>
                <ul className="grid grid-cols-2 gap-3 mb-6">
                  {vehicle.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-gold" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <h3 className="font-serif text-xl font-bold text-foreground mb-4">Amenities</h3>
                <ul className="grid grid-cols-2 gap-3">
                  {vehicle.amenities.map((amenity, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-gold" />
                      {amenity}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Vehicle Variants Section */}
      <section className="py-20 bg-card">
        <div className="container">
          <AnimatedSection className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Choose Your <span className="text-gradient-gold">{vehicle.title}</span>
            </h2>
            <div className="section-divider mb-6" />
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We offer multiple {vehicle.title.toLowerCase()} options to match your exact passenger count and requirements.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {vehicle.variants.map((variant, index) => (
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
                <a href="tel:888-535-2566">
                  <Button variant="gold" size="lg">
                    <Phone className="w-4 h-4" />
                    Call (888) 535-2566
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

      <Testimonials />
      <FAQ items={faqItems} title="Booking FAQs" />
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
              {lightboxIndex + 1} / {vehicle.gallery.length}
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
                src={vehicle.gallery[lightboxIndex]}
                alt={`${vehicle.title} view ${lightboxIndex + 1}`}
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
              {vehicle.gallery.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setLightboxIndex(index)}
                  className={`flex-shrink-0 w-14 h-14 md:w-16 md:h-16 overflow-hidden transition-all border-2 ${
                    index === lightboxIndex
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
