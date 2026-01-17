import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import PageHero from "@/components/PageHero";
import FAQ from "@/components/FAQ";
import Testimonials from "@/components/Testimonials";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// Import vehicle images
import partyBusHero from "@/assets/fleet/party-bus-hero.jpg";
import limousine from "@/assets/fleet/limousine.jpg";
import coachBus from "@/assets/fleet/coach-bus.jpg";
import suvLimo from "@/assets/fleet/suv-limo.jpg";
import sedan from "@/assets/fleet/sedan.jpg";
import sprinterVan from "@/assets/fleet/sprinter-van.jpg";

const vehicles = [
  {
    id: "party-buses",
    title: "Party Buses",
    subtitle: "Accommodates 20-50 passengers",
    image: partyBusHero,
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
    id: "limousines",
    title: "Stretch Limousines",
    subtitle: "Accommodates 6-18 passengers",
    image: limousine,
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
    id: "coach-buses",
    title: "Coach Buses",
    subtitle: "Accommodates 40-56 passengers",
    image: coachBus,
    features: [
      "Panoramic Windows",
      "Overhead Storage",
      "On-board Restroom",
      "WiFi Available",
      "Climate Control",
      "Professional Chauffeur",
    ],
  },
  {
    id: "suv-limos",
    title: "SUV Limousines",
    subtitle: "Accommodates 8-14 passengers",
    image: suvLimo,
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
    id: "executive-sedans",
    title: "Executive Sedans",
    subtitle: "Accommodates 3-4 passengers",
    image: sedan,
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
    id: "sprinter-vans",
    title: "Executive Sprinter Vans",
    subtitle: "Accommodates 10-16 passengers",
    image: sprinterVan,
    features: [
      "Luggage Area",
      "Rear AC/Heating",
      "Custom Interior Lighting",
      "TV & DVD Capabilities",
      "Luxury Leather Interior",
      "Professional Chauffeur",
    ],
  },
];

const faqItems = [
  {
    question: "How far in advance should I book?",
    answer: "We recommend booking at least 2-4 weeks in advance for standard events, and 2-3 months for peak season events like proms and weddings. However, we do accommodate last-minute bookings when availability permits.",
  },
  {
    question: "What is included in the rental price?",
    answer: "All rentals include a professional chauffeur, fuel, standard gratuity, and basic amenities. Some vehicles include additional features like ice, cups, and red carpet service. Specific inclusions are listed for each vehicle.",
  },
  {
    question: "Can I see the vehicle before booking?",
    answer: "Absolutely! We encourage clients to schedule a viewing of the vehicle before booking. Contact us to arrange a time to visit our facility and see our fleet in person.",
  },
  {
    question: "What is your cancellation policy?",
    answer: "Cancellations made 7+ days before the event receive a full refund minus a small administrative fee. Cancellations within 7 days may incur additional charges. Please review your contract for full details.",
  },
  {
    question: "Do you offer hourly or one-way rates?",
    answer: "Yes, we offer flexible pricing options including hourly rates, one-way transfers, and point-to-point packages. Contact us for a customized quote based on your specific needs.",
  },
];

const Fleet = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageHero
        title="Our"
        highlightedWord="Fleet"
        subtitle="From intimate limousines to full-size coach buses, we have the perfect vehicle for every occasion."
        backgroundImage="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2048"
      />

      {/* Vehicles List - Alternating Layout */}
      <section className="pb-24">
        <div className="container">
          <div className="space-y-24 lg:space-y-32">
            {vehicles.map((vehicle, index) => (
              <div
                key={vehicle.id}
                className={`flex flex-col ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } items-center gap-12 lg:gap-20`}
              >
                {/* Image */}
                <div className="w-full lg:w-1/2">
                  <img
                    src={vehicle.image}
                    alt={vehicle.title}
                    className="w-full h-auto object-cover rounded-lg"
                  />
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2 space-y-6">
                  <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                    {vehicle.title}
                  </h2>
                  <p className="text-gold text-lg font-medium">
                    {vehicle.subtitle}
                  </p>
                  <ul className="space-y-3">
                    {vehicle.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center gap-3 text-muted-foreground"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button variant="gold" size="lg" asChild>
                    <Link to={`/fleet/${vehicle.id}`}>
                      View Details
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      <FAQ items={faqItems} subtitle="Get answers to common questions about our fleet and booking process." />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Fleet;
