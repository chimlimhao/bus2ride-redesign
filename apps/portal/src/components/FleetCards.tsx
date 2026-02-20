import { Button } from "@/components/ui/button";
import { ArrowRight, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@bus2ride/shared/supabase";
import type { Tables } from "@bus2ride/shared/supabase/types";
import { usePageContent } from "@/hooks/usePageContent";


type Vehicle = Tables<"fleet_vehicles">;

const FleetCards = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [vehiclesLoading, setVehiclesLoading] = useState(true);
  const { content, loading: contentLoading } = usePageContent('home', 'fleet-showcase');

  useEffect(() => {
    async function fetchFleet() {
      try {
        setVehiclesLoading(true);
        const { data, error } = await supabase
          .from("fleet_vehicles")
          .select("*")
          .eq("status", "Published")
          .order("sort_order", { ascending: true })
          .limit(6);

        if (error) throw error;
        setVehicles(data || []);
      } catch (err) {
        console.error("Error fetching fleet:", err);
      } finally {
        setVehiclesLoading(false);
      }
    }

    fetchFleet();
  }, []);

  if (vehiclesLoading || contentLoading) {
    return (
      <section id="fleet" className="py-24 lg:py-32">
        <div className="container text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
        </div>
      </section>
    );
  }

  const title = content?.title || "Our Fleet";
  const subtitle = content?.subtitle || "From intimate limousines to full-size coach buses, we have the perfect vehicle for every occasion.";

  return (
    <section id="fleet" className="py-24 lg:py-32">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {title.split(' ').map((word: string, i: number, arr: string[]) =>
              i === 1 ? <span key={i} className="text-gradient-gold"> {word}</span> : word + (i < arr.length - 1 ? " " : "")
            )}
          </h2>
          <div className="section-divider mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Fleet Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((vehicle) => (
            <Link
              key={vehicle.id}
              to={`/fleet/${vehicle.slug}`}
              className="group card-luxury overflow-hidden hover:border-gold/30 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={vehicle.image_url || ""}
                  alt={vehicle.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-serif text-xl font-bold text-foreground mb-2 group-hover:text-gold transition-colors">
                  {vehicle.name}
                </h3>
                <div className="flex items-center gap-2 text-gold text-sm mb-3">
                  <Users className="w-4 h-4" />
                  {vehicle.capacity}
                </div>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
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
