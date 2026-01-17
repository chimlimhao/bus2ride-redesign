import { Button } from "@/components/ui/button";
import { ArrowRight, Users } from "lucide-react";
import { Link } from "react-router-dom";

// Import vehicle images
import partyBusHero from "@/assets/fleet/party-bus-hero.jpg";
import limousine from "@/assets/fleet/limousine.jpg";
import coachBus from "@/assets/fleet/coach-bus.jpg";
import suvLimo from "@/assets/fleet/suv-limo.jpg";
import sedan from "@/assets/fleet/sedan.jpg";
import sprinterVan from "@/assets/fleet/sprinter-van.jpg";

const fleetCategories = [
  {
    id: "party-buses",
    title: "Party Buses",
    passengers: "20-50 passengers",
    image: partyBusHero,
    description: "Ultimate party experience on wheels with premium sound and lighting.",
  },
  {
    id: "limousines",
    title: "Stretch Limousines",
    passengers: "6-18 passengers",
    image: limousine,
    description: "Classic elegance for special occasions and executive travel.",
  },
  {
    id: "coach-buses",
    title: "Coach Buses",
    passengers: "40-56 passengers",
    image: coachBus,
    description: "Comfortable long-distance travel for large groups.",
  },
  {
    id: "suv-limos",
    title: "SUV Limousines",
    passengers: "8-14 passengers",
    image: suvLimo,
    description: "Spacious luxury with the style of an SUV.",
  },
  {
    id: "executive-sedans",
    title: "Executive Sedans",
    passengers: "3-4 passengers",
    image: sedan,
    description: "Professional transportation for business executives.",
  },
  {
    id: "sprinter-vans",
    title: "Sprinter Vans",
    passengers: "10-16 passengers",
    image: sprinterVan,
    description: "Versatile luxury vans for medium-sized groups.",
  },
];

const FleetCards = () => {
  return (
    <section id="fleet" className="py-24 lg:py-32">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Our <span className="text-gradient-gold">Fleet</span>
          </h2>
          <div className="section-divider mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From intimate limousines to full-size coach buses, we have the perfect vehicle for every occasion.
          </p>
        </div>

        {/* Fleet Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fleetCategories.map((vehicle) => (
            <Link
              key={vehicle.id}
              to={`/fleet/${vehicle.id}`}
              className="group card-luxury overflow-hidden hover:border-gold/30 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={vehicle.image}
                  alt={vehicle.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-serif text-xl font-bold text-foreground mb-2 group-hover:text-gold transition-colors">
                  {vehicle.title}
                </h3>
                <div className="flex items-center gap-2 text-gold text-sm mb-3">
                  <Users className="w-4 h-4" />
                  {vehicle.passengers}
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  {vehicle.description}
                </p>
                <div className="flex items-center gap-2 text-gold text-sm font-medium group-hover:gap-3 transition-all">
                  View Details
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link to="/fleet">
              View All Vehicles
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FleetCards;
