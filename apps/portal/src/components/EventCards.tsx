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

const EventCards = () => {
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
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {title} <span className="text-gradient-gold">{highlighted}</span>
          </h2>
          <div className="section-divider mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Link
              key={event.id}
              to={`/events/${event.slug}`}
              className="group relative h-72 rounded-lg overflow-hidden"
            >
              {/* Background Image */}
              <img
                src={event.image_url || ""}
                alt={event.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

              {/* Badge */}
              <div className="absolute top-4 left-4">
                <span className="badge-gold text-xs">{event.event_type || 'EVENT'}</span>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-serif text-xl font-bold text-foreground mb-2 group-hover:text-gold transition-colors">
                  {event.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {event.description}
                </p>
                <div className="flex items-center gap-2 text-gold text-sm font-medium group-hover:gap-3 transition-all">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
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

export default EventCards;
