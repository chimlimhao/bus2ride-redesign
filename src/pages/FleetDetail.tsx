import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import FAQ from "@/components/FAQ";
import Testimonials from "@/components/Testimonials";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Users, Check, MessageSquare } from "lucide-react";

interface VehicleVariant {
  id: string;
  name: string;
  passengers: string;
  sweetSpot: string;
  type: string;
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
    mainImage: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800",
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
      { id: "party-bus-20", name: "Party Bus 20", passengers: "15-20", sweetSpot: "18", type: "Ford E-450" },
      { id: "party-bus-25", name: "Party Bus 25", passengers: "20-25", sweetSpot: "22", type: "Freightliner" },
      { id: "party-bus-30", name: "Party Bus 30", passengers: "25-30", sweetSpot: "28", type: "Freightliner M2" },
      { id: "party-bus-40", name: "Party Bus 40", passengers: "35-40", sweetSpot: "38", type: "Prevost" },
      { id: "party-bus-50", name: "Party Bus 50", passengers: "45-50", sweetSpot: "48", type: "MCI Coach" },
    ],
  },
  "limousines": {
    title: "Stretch Limousine",
    categoryLabel: "FEATURED STRETCH LIMOUSINE • 24/7 BOOKING",
    description: "Classic elegance meets modern luxury. Our stretch limousines provide the perfect setting for weddings, proms, and executive travel with premium amenities and professional service.",
    mainImage: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=800",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800",
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
      { id: "limo-6", name: "6 Passenger Stretch", passengers: "4-6", sweetSpot: "6", type: "Lincoln Town Car" },
      { id: "limo-8", name: "8 Passenger Stretch", passengers: "6-8", sweetSpot: "8", type: "Lincoln Navigator" },
      { id: "limo-10", name: "10 Passenger Stretch", passengers: "8-10", sweetSpot: "10", type: "Chrysler 300" },
      { id: "limo-14", name: "14 Passenger Stretch", passengers: "12-14", sweetSpot: "14", type: "Hummer H2" },
      { id: "limo-18", name: "18 Passenger Stretch", passengers: "16-18", sweetSpot: "18", type: "Escalade ESV" },
    ],
  },
  "coach-buses": {
    title: "Coach Bus",
    categoryLabel: "FEATURED COACH BUS • 24/7 BOOKING",
    description: "Perfect for large groups requiring comfortable long-distance travel. Our coach buses feature panoramic windows, ample storage, and all the amenities for a pleasant journey.",
    mainImage: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=800",
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800",
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
      { id: "coach-36", name: "36 Passenger Coach", passengers: "30-36", sweetSpot: "34", type: "MCI J4500" },
      { id: "coach-45", name: "45 Passenger Coach", passengers: "40-45", sweetSpot: "42", type: "Prevost H3-45" },
      { id: "coach-50", name: "50 Passenger Coach", passengers: "45-50", sweetSpot: "48", type: "Van Hool CX45" },
      { id: "coach-56", name: "56 Passenger Coach", passengers: "50-56", sweetSpot: "54", type: "MCI D4505" },
    ],
  },
  "suv-limos": {
    title: "SUV Limousine",
    categoryLabel: "FEATURED SUV LIMOUSINE • 24/7 BOOKING",
    description: "The perfect blend of rugged style and luxurious comfort. Our SUV limousines offer more headroom and a commanding presence for those who want to make an impression.",
    mainImage: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800",
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=800",
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
      { id: "suv-limo-8", name: "8 Passenger SUV Limo", passengers: "6-8", sweetSpot: "8", type: "Cadillac Escalade" },
      { id: "suv-limo-12", name: "12 Passenger SUV Limo", passengers: "10-12", sweetSpot: "12", type: "Lincoln Navigator" },
      { id: "suv-limo-14", name: "14 Passenger SUV Limo", passengers: "12-14", sweetSpot: "14", type: "Hummer H2" },
    ],
  },
  "executive-sedans": {
    title: "Executive Sedan",
    categoryLabel: "FEATURED EXECUTIVE SEDAN • 24/7 BOOKING",
    description: "Professional, understated elegance for corporate executives and discerning travelers. Our executive sedans provide a quiet, comfortable ride with premium amenities.",
    mainImage: "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?q=80&w=800",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800",
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
      { id: "sedan-3", name: "3 Passenger Sedan", passengers: "2-3", sweetSpot: "3", type: "Mercedes S-Class" },
      { id: "sedan-4", name: "4 Passenger Sedan", passengers: "3-4", sweetSpot: "4", type: "BMW 7 Series" },
      { id: "suv-exec", name: "Executive SUV", passengers: "4-6", sweetSpot: "5", type: "Cadillac Escalade" },
    ],
  },
  "sprinter-vans": {
    title: "Executive Sprinter Van",
    categoryLabel: "FEATURED SPRINTER VAN • 24/7 BOOKING",
    description: "Versatile luxury vans perfect for medium-sized groups. Ideal for corporate travel, wine tours, and group outings with ample space and premium amenities.",
    mainImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800",
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800",
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
      { id: "sprinter-10", name: "10 Passenger Sprinter", passengers: "8-10", sweetSpot: "10", type: "Mercedes Sprinter" },
      { id: "sprinter-12", name: "12 Passenger Sprinter", passengers: "10-12", sweetSpot: "12", type: "Mercedes Sprinter" },
      { id: "sprinter-14", name: "14 Passenger Sprinter", passengers: "12-14", sweetSpot: "14", type: "Mercedes Sprinter" },
      { id: "sprinter-16", name: "16 Passenger Sprinter", passengers: "14-16", sweetSpot: "16", type: "Ford Transit" },
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

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container px-4 py-32 text-center">
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
        <div className="container px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column - Images */}
            <div>
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

              {/* Main Image */}
              <div className="relative overflow-hidden mb-4">
                <img
                  src={vehicle.mainImage}
                  alt={vehicle.title}
                  className="w-full h-auto object-cover aspect-[4/3]"
                />
              </div>

              {/* Gallery Thumbnails */}
              <div className="grid grid-cols-2 gap-4">
                {vehicle.gallery.map((img, index) => (
                  <div key={index} className="overflow-hidden">
                    <img
                      src={img}
                      alt={`${vehicle.title} view ${index + 1}`}
                      className="w-full h-32 object-cover hover:scale-105 transition-transform cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Booking */}
            <div>
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

                <Button variant="gold" size="lg" className="w-full mb-3">
                  Start My Quote
                </Button>
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
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle Variants Section */}
      <section className="py-20 bg-card">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Choose Your <span className="text-gradient-gold">{vehicle.title}</span>
            </h2>
            <div className="section-divider mb-6" />
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We offer multiple {vehicle.title.toLowerCase()} options to match your exact passenger count and requirements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {vehicle.variants.map((variant) => (
              <div
                key={variant.id}
                className="card-luxury p-6 hover:border-gold/30 transition-colors"
              >
                <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                  {variant.name}
                </h3>
                <p className="text-xs text-muted-foreground mb-4 uppercase tracking-wider">
                  {variant.type}
                </p>
                <div className="flex items-center gap-2 text-gold text-sm mb-4">
                  <Users className="w-4 h-4" />
                  {variant.passengers} passengers
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Sweet spot: {variant.sweetSpot} guests
                </p>
                <Button variant="gold" size="sm" className="w-full">
                  Get Quote
                </Button>
              </div>
            ))}
          </div>

          {/* Custom Inquiry */}
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
              <Button variant="outline" size="lg">
                Request Custom Quote
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />
      <FAQ items={faqItems} title="Booking FAQs" />
      <CTASection />
      <Footer />
    </div>
  );
};

export default FleetDetail;
