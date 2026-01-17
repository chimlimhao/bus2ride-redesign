import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const events = [
  {
    title: "Weddings",
    subtitle: "Make your special day unforgettable",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800",
    description: "Arrive in style on your most important day. Our elegant fleet ensures you and your wedding party travel in comfort and luxury.",
    features: [
      "Bride & Groom Transportation",
      "Wedding Party Shuttles",
      "Guest Transportation",
      "Red Carpet Service",
      "Just Married Decorations",
      "Champagne Toast Ready",
    ],
  },
  {
    title: "Corporate Events",
    subtitle: "Professional transportation solutions",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800",
    description: "Impress clients and keep your team moving efficiently with our executive fleet and corporate shuttle services.",
    features: [
      "Executive Airport Transfers",
      "Conference Shuttles",
      "Team Building Outings",
      "Client Transportation",
      "Road Shows",
      "Corporate Retreats",
    ],
  },
  {
    title: "Prom & Homecoming",
    subtitle: "Safe, stylish student transportation",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800",
    description: "Give students a memorable night with safe and stylish transportation. Parents trust us for responsible service.",
    features: [
      "Group Discounts Available",
      "Trained Chauffeurs",
      "Parent Communication",
      "On-Time Guarantee",
      "Photo Opportunities",
      "Safe Transportation",
    ],
  },
  {
    title: "Bachelor & Bachelorette",
    subtitle: "Party in style with your crew",
    image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=800",
    description: "Celebrate your last night of freedom with our party buses equipped with premium sound systems and LED lighting.",
    features: [
      "Party Bus Options",
      "Premium Sound Systems",
      "LED Lighting",
      "Multiple Stops",
      "Flexible Itineraries",
      "VIP Treatment",
    ],
  },
  {
    title: "Airport Transfers",
    subtitle: "Reliable pickup and drop-off",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800",
    description: "Start and end your journey stress-free with our reliable airport transportation services for groups of any size.",
    features: [
      "Flight Tracking",
      "Meet & Greet Service",
      "Luggage Assistance",
      "24/7 Availability",
      "All Major Airports",
      "Group Rates",
    ],
  },
  {
    title: "Wine Tours & Tastings",
    subtitle: "Explore vineyards safely",
    image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=800",
    description: "Tour local wineries and enjoy tastings without worrying about driving. We handle the transportation while you sip and savor.",
    features: [
      "Multiple Winery Stops",
      "Custom Itineraries",
      "Cooler Storage",
      "Knowledgeable Drivers",
      "Flexible Timing",
      "Group Packages",
    ],
  },
];

const Events = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="container px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Events We <span className="text-gradient-gold">Serve</span>
            </h1>
            <div className="section-divider mb-6" />
            <p className="text-lg text-muted-foreground">
              From intimate gatherings to large corporate events, we provide premium transportation tailored to your needs.
            </p>
          </div>
        </div>
      </section>

      {/* Events List - Alternating Layout */}
      <section className="pb-24">
        <div className="container px-4">
          <div className="space-y-24 lg:space-y-32">
            {events.map((event, index) => (
              <div
                key={event.title}
                className={`flex flex-col ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } items-center gap-12 lg:gap-20`}
              >
                {/* Image */}
                <div className="w-full lg:w-1/2">
                  <div className="relative">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-auto rounded-lg object-cover aspect-[4/3]"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2 space-y-6">
                  <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                    {event.title}
                  </h2>
                  <p className="text-gold text-lg font-medium">
                    {event.subtitle}
                  </p>
                  <p className="text-muted-foreground">
                    {event.description}
                  </p>
                  <ul className="space-y-3">
                    {event.features.map((feature, featureIndex) => (
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
                    Plan This Event
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
};

export default Events;