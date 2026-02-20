import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import PageHero from "@/components/PageHero";
import FAQ from "@/components/FAQ";
import Testimonials from "@/components/Testimonials";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@bus2ride/shared/supabase";
import type { Tables } from "@bus2ride/shared/supabase/types";
import { usePageContent, useSiteSettings } from "@/hooks/usePageContent";

type Event = Tables<"events">;

interface EventsHero {
  title: string;
  highlighted: string;
  subtitle: string;
  image: string;
}

interface EventsFAQs {
  subtitle: string;
  items: { question: string; answer: string }[];
}

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const { content: hero, loading: heroLoading } = usePageContent<EventsHero>('events', 'hero');
  const { content: faqs, loading: faqsLoading } = usePageContent<EventsFAQs>('events', 'faqs');
  const { settings } = useSiteSettings();
  const [eventsLoading, setEventsLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const { data, error } = await supabase
          .from("events")
          .select("*")
          .eq("status", "Published")
          .order("sort_order", { ascending: true });

        if (error) throw error;
        setEvents(data || []);
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setEventsLoading(false);
      }
    }

    fetchEvents();
  }, []);

  const categories = [
    { id: "all", label: "Browse All", count: events.length },
    ...Array.from(new Set(events.map(e => e.event_type))).filter(Boolean).map(type => ({
      id: type?.toLowerCase() || "",
      label: type || "",
      count: events.filter(e => e.event_type === type).length
    }))
  ];

  const filteredEvents = activeCategory === "all"
    ? events
    : events.filter(e => e.event_type?.toLowerCase() === activeCategory);

  const isLoading = heroLoading || faqsLoading || eventsLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  const phone = settings.contact_phone || "888-535-2566";

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

      {/* Category Filters */}
      <section className="py-8 border-b border-border">
        <div className="container">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-sm font-medium transition-colors ${cat.id === activeCategory
                    ? "bg-gold text-gold-foreground"
                    : "bg-card border border-border text-muted-foreground hover:border-gold/50 hover:text-foreground"
                  }`}
              >
                {cat.label} <span className="opacity-60">{cat.count}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-20">
        <div className="container">
          <p className="text-muted-foreground mb-8">
            Showing {filteredEvents.length} event guide{filteredEvents.length !== 1 ? 's' : ''}
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="group card-luxury overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={event.image_url || "/placeholder.svg"}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="badge-gold text-xs">{event.event_type?.toUpperCase() || "EVENT"}</span>
                  </div>

                  {/* Title on image */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-serif text-xl font-bold text-foreground">
                      {event.title}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {event.description}
                  </p>
                  <div className="flex gap-3">
                    <Button variant="gold" size="sm" className="flex-1" asChild>
                      <Link to={`/events/${event.slug}`}>
                        Learn More
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                    <a href={`tel:${phone}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        <Phone className="w-4 h-4" />
                        Call
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      {faqs && (
        <FAQ items={faqs.items} subtitle={faqs.subtitle} />
      )}
      <CTASection />
      <Footer />
    </div>
  );
};

export default Events;

