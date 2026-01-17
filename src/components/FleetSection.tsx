import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const fleetCategories = [
  {
    title: "Party Buses",
    subtitle: "Accommodates 20-50 passengers",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800",
    features: [
      "Premium Sound System",
      "LED Lighting",
      "Climate Control",
      "On-board Restroom",
    ],
  },
  {
    title: "Luxury Limousines",
    subtitle: "Accommodates 6-18 passengers",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=800",
    features: [
      "Leather Interior",
      "Mini Bar",
      "Privacy Divider",
      "Professional Chauffeur",
    ],
  },
  {
    title: "Coach Buses",
    subtitle: "Accommodates 40-56 passengers",
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=800",
    features: [
      "Panoramic Windows",
      "Overhead Storage",
      "WiFi Available",
      "Climate Control",
    ],
  },
];

const FleetSection = () => {
  return (
    <section id="fleet" className="py-24 lg:py-32">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Our <span className="text-gradient-gold">Fleet</span>
          </h2>
          <div className="section-divider mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From intimate limousines to full-size coach buses, we have the perfect vehicle for every occasion.
          </p>
        </div>

        {/* Fleet List - Alternating Layout */}
        <div className="space-y-24 lg:space-y-32">
          {fleetCategories.map((category, index) => (
            <div
              key={category.title}
              className={`flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } items-center gap-12 lg:gap-20`}
            >
              {/* Image */}
              <div className="w-full lg:w-1/2">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-auto object-contain"
                />
              </div>

              {/* Content */}
              <div className="w-full lg:w-1/2 space-y-6">
                <h3 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                  {category.title}
                </h3>
                <p className="text-gold text-lg font-medium">
                  {category.subtitle}
                </p>
                <ul className="space-y-3">
                  {category.features.map((feature, featureIndex) => (
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
                  <Link to="/services">
                    View Details
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-20">
          <Button variant="outline" size="lg" asChild>
            <Link to="/services">
              View All Vehicles
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FleetSection;