import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import PageHero from "@/components/PageHero";
import FAQ from "@/components/FAQ";
import Testimonials from "@/components/Testimonials";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@bus2ride/shared/supabase";
import type { Tables } from "@bus2ride/shared/supabase/types";
import { usePageContent } from "@/hooks/usePageContent";

type Vehicle = Tables<"fleet_vehicles">;

interface FleetHero {
  title: string;
  highlighted: string;
  subtitle: string;
  image: string;
}

interface FleetFAQs {
  subtitle: string;
  items: { question: string; answer: string }[];
}

const Fleet = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const { content: hero, loading: heroLoading } = usePageContent<FleetHero>('fleet', 'hero');
  const { content: faqs, loading: faqsLoading } = usePageContent<FleetFAQs>('fleet', 'faqs');
  const [vehiclesLoading, setVehiclesLoading] = useState(true);

  useEffect(() => {
    async function fetchVehicles() {
      try {
        const { data, error } = await supabase
          .from("fleet_vehicles")
          .select("*")
          .eq("status", "Published")
          .order("sort_order", { ascending: true });

        if (error) throw error;
        setVehicles(data || []);
      } catch (err) {
        console.error("Error fetching vehicles:", err);
      } finally {
        setVehiclesLoading(false);
      }
    }

    fetchVehicles();
  }, []);

  const isLoading = heroLoading || faqsLoading || vehiclesLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {hero && (
        <PageHero
          title={hero.title}
          highlightedWord={hero.highlighted}
          subtitle={hero.subtitle}
          backgroundImage={hero.image}
        />
      )}

      {/* Vehicles List - Alternating Layout */}
      <section className="pb-24 pt-12">
        <div className="container">
          <div className="space-y-24 lg:space-y-32">
            {vehicles.map((vehicle, index) => (
              <div
                key={vehicle.id}
                className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  } items-center gap-12 lg:gap-20`}
              >
                {/* Image */}
                <div className="w-full lg:w-1/2">
                  <img
                    src={vehicle.image_url || ""}
                    alt={vehicle.name}
                    className="w-full h-auto object-cover rounded-lg aspect-[4/3]"
                  />
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2 space-y-6">
                  <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                    {vehicle.name}
                  </h2>
                  <p className="text-gold text-lg font-medium">
                    Accommodates {vehicle.capacity} passengers
                  </p>
                  <ul className="space-y-3">
                    {Array.isArray(vehicle.features) && (vehicle.features as string[]).map((feature, featureIndex) => (
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
                    <Link to={`/fleet/${vehicle.slug}`}>
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
      {faqs && (
        <FAQ
          items={faqs.items}
          subtitle={faqs.subtitle}
        />
      )}
      <CTASection />
      <Footer />
    </div>
  );
};

export default Fleet;

