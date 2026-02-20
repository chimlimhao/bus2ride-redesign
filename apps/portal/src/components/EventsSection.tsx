import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@bus2ride/shared/supabase";
import type { Tables } from "@bus2ride/shared/supabase/types";
import { usePageContent } from "@/hooks/usePageContent";

type Event = Tables<"events">;

interface EventShowcaseContent {
  title: string;
  highlighted: string;
  subtitle: string;
}

const EventsSection = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const { content, loading: contentLoading } = usePageContent<EventShowcaseContent>('home', 'events-showcase');

  useEffect(() => {
    async function fetchEvents() {
      try {
        const { data, error } = await supabase
          .from("events")
          .select("*")
          .eq("status", "Published")
          .order("sort_order", { ascending: true })
          .limit(6);

        if (error) throw error;
        setEvents(data || []);
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  if (loading || contentLoading) {
    return (
      <section id="events" className="py-24 lg:py-32 bg-card">
        <div className="container text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
        </div>
      </section>
    );
  }

  const title = content?.title || "Events We";
  const highlighted = content?.highlighted || "Serve";
  const subtitle = content?.subtitle || "Whatever the occasion, we have the perfect transportation solution.";

  return (
    <section id="events" className="py-24 lg:py-32 bg-card">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {title} <span className="text-gradient-gold">{highlighted}</span>
          </h2>
          <div className="section-divider mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Events List - Alternating Layout */}
        <div className="space-y-24 lg:space-y-32">
          {events.map((event, index) => (
            <div
              key={event.id}
              className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } items-center gap-12 lg:gap-20`}
            >
              {/* Image */}
              <div className="w-full lg:w-1/2">
                <img
                  src={event.image_url || ""}
                  alt={event.title}
                  className="w-full h-auto rounded-lg object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-500 shadow-xl"
                />
              </div>

              {/* Content */}
              <div className="w-full lg:w-1/2 space-y-6">
                <h3 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                  {event.title}
                </h3>
                <p className="text-gold text-lg font-medium">
                  {event.subtitle || `${event.title} Transportation Solutions`}
                </p>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    {event.description}
                  </p>
                  {event.features && event.features.length > 0 && (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {event.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-center gap-3 text-muted-foreground text-sm"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <Button variant="gold" size="lg" asChild>
                  <Link to={`/events/${event.slug}`}>
                    Plan This Event
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
            <Link to="/events">
              View All Events
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;