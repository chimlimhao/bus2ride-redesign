import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users } from "lucide-react";

const services = [
  {
    title: "Party Buses",
    subtitle: "Accommodates up to 50 passengers",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800",
    features: [
      "Premium Sound System",
      "LED Lighting & Lasers",
      "Leather Seating",
      "Climate Control",
      "On-board Restroom",
      "Professional Chauffeur",
    ],
  },
  {
    title: "Stretch Limousines",
    subtitle: "Accommodates up to 18 passengers",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=800",
    features: [
      "Leather Interior",
      "Mini Bar",
      "Privacy Divider",
      "Premium Audio",
      "Fiber Optic Lighting",
      "Professional Chauffeur",
    ],
  },
  {
    title: "Executive Sedans",
    subtitle: "Accommodates up to 4 passengers",
    image: "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?q=80&w=800",
    features: [
      "Leather Interior",
      "Seats 3-4 Comfortably",
      "Air Conditioned",
      "Bluetooth Audio",
      "Phone Chargers",
      "Professional Chauffeur",
    ],
  },
  {
    title: "SUV Limousines",
    subtitle: "Accommodates up to 14 passengers",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800",
    features: [
      "Spacious Interior",
      "Premium Sound System",
      "Custom Lighting",
      "Leather Seating",
      "Mini Bar",
      "Professional Chauffeur",
    ],
  },
  {
    title: "Executive Sprinter Vans",
    subtitle: "Accommodates up to 16 passengers",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800",
    features: [
      "Luggage Area",
      "Rear AC/Heating",
      "Custom Interior Lighting",
      "TV & DVD Capabilities",
      "Luxury Leather Interior",
      "Professional Chauffeur",
    ],
  },
  {
    title: "Coach Buses",
    subtitle: "Accommodates up to 56 passengers",
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=800",
    features: [
      "Panoramic Windows",
      "Overhead Storage",
      "On-board Restroom",
      "WiFi Available",
      "Climate Control",
      "Professional Chauffeur",
    ],
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="container px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Our <span className="text-gradient-gold">Vehicles</span>
            </h1>
            <div className="section-divider mb-6" />
            <p className="text-lg text-muted-foreground">
              We do Sedan, Luxury Sedan, SUV, Limo, Stretch SUV, Executive Vans, Shuttles, Coaches. Below are some of our most popular vehicles.
            </p>
          </div>
        </div>
      </section>

      {/* Services List - Alternating Layout */}
      <section className="pb-24">
        <div className="container px-4">
          <div className="space-y-24 lg:space-y-32">
            {services.map((service, index) => (
              <div
                key={service.title}
                className={`flex flex-col ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } items-center gap-12 lg:gap-20`}
              >
                {/* Image */}
                <div className="w-full lg:w-1/2">
                  <div className="relative">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2 space-y-6">
                  <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                    {service.title}
                  </h2>
                  <p className="text-gold text-lg font-medium">
                    {service.subtitle}
                  </p>
                  <ul className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center gap-3 text-muted-foreground"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button variant="gold" size="lg" className="mt-4">
                    Get a Quote
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Amenities */}
      <section className="py-20 bg-card">
        <div className="container px-4">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-12">
            Additional Amenities
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <h3 className="font-serif text-xl font-bold text-gold mb-4">Comfort</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-3 text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  Leather Seats
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  Lighting & Climate Control
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  Onboard Restrooms
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-gold mb-4">Productivity</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-3 text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  Workstations
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  Secure Wi-Fi
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  Collaborative Workspaces
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-gold mb-4">Accessibility</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-3 text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  Bike Racks
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  ADA Wheelchair Lifts
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  Bike & Luggage Storage
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
};

export default Services;