import { Button } from "@/components/ui/button";
import { Users, ArrowRight } from "lucide-react";

interface FleetCategory {
  title: string;
  description: string;
  image: string;
  passengerRange: string;
  vehicles: { name: string; capacity: number }[];
}

const fleetCategories: FleetCategory[] = [
  {
    title: "Party Buses",
    description: "Sound systems, LED lighting, and space to celebrate",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800",
    passengerRange: "20-50",
    vehicles: [
      { name: "20 Passenger Party Bus", capacity: 20 },
      { name: "40 Passenger Party Bus", capacity: 40 },
      { name: "38 Passenger Party Bus", capacity: 38 },
    ],
  },
  {
    title: "Luxury Limousines",
    description: "Classic elegance for weddings and VIP events",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=800",
    passengerRange: "6-18",
    vehicles: [
      { name: "Lincoln Town Car Stretch", capacity: 10 },
      { name: "Chrysler 300 Limo", capacity: 10 },
      { name: "Hummer H2 Stretch", capacity: 18 },
    ],
  },
  {
    title: "Coach Buses",
    description: "Comfortable long-distance travel for large groups",
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=800",
    passengerRange: "40-56",
    vehicles: [
      { name: "54 Passenger Coach", capacity: 54 },
      { name: "56 Passenger Coach", capacity: 56 },
      { name: "52 Passenger Coach", capacity: 52 },
    ],
  },
];

const FleetCard = ({ category }: { category: FleetCategory }) => {
  return (
    <div className="card-luxury group overflow-hidden">
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={category.image}
          alt={category.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
        <div className="absolute top-4 left-4">
          <span className="badge-gold">{category.title.split(" ")[0]}</span>
        </div>
        <div className="absolute top-4 right-4 flex items-center gap-1 bg-secondary/80 backdrop-blur-sm rounded-full px-3 py-1">
          <Users className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-foreground">{category.passengerRange}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
          {category.title}
        </h3>
        <p className="text-muted-foreground mb-4">{category.description}</p>

        {/* Vehicle List */}
        <div className="space-y-2 mb-6">
          {category.vehicles.map((vehicle, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-2 border-b border-border last:border-0"
            >
              <span className="text-sm text-foreground">{vehicle.name}</span>
              <span className="text-sm text-muted-foreground">
                {vehicle.capacity} passengers
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Button variant="hero" className="w-full">
          View {category.title}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

const FleetSection = () => {
  return (
    <section id="fleet" className="py-20 lg:py-32">
      <div className="container px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">
            Our Fleet
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-4">
            Choose Your Perfect Ride
          </h2>
          <div className="section-divider" />
          <p className="text-muted-foreground max-w-2xl mx-auto mt-6">
            From intimate limousines to full-size coach buses, we have the perfect vehicle for every occasion.
          </p>
        </div>

        {/* Fleet Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {fleetCategories.map((category, index) => (
            <FleetCard key={index} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FleetSection;
