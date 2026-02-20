import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import FAQ from "@/components/FAQ";
import Testimonials from "@/components/Testimonials";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Users, Phone } from "lucide-react";
import { supabase } from "@bus2ride/shared/supabase";
import type { Tables } from "@bus2ride/shared/supabase/types";
import { usePageContent, useSiteSettings } from "@/hooks/usePageContent";

type Event = Tables<"events">;

interface PopularVehicle {
  id: string;
  title: string;
  passengers: string;
}

interface EventDetailFAQs {
  items: { question: string; answer: string }[];
}

const EventDetail = () => {
  const { id: slug } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const { settings } = useSiteSettings();
  const { content: faqs } = usePageContent<EventDetailFAQs>('events', 'detailFAQs');

  useEffect(() => {
    async function fetchEvent() {
      if (!slug) return;
      try {
        const { data, error } = await supabase
          .from("events")
          .select("*")
          .eq("slug", slug)
          .single();

        if (error) throw error;
        setEvent(data);
      } catch (err) {
        console.error("Error fetching event:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchEvent();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-32 text-center">
          <h1 className="font-serif text-4xl font-bold text-foreground mb-4">Event Not Found</h1>
          <p className="text-muted-foreground mb-8">The event you're looking for doesn't exist.</p>
          <Button variant="gold" asChild>
            <Link to="/events">View All Events</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const titleWords = event.title.split(" ");
  const heroTitle = titleWords[0];
  const highlightedWord = titleWords.slice(1).join(" ");
  const phone = settings.contact_phone || "888-535-2566";
  const popularVehicles = Array.isArray(event.popular_vehicles)
    ? (event.popular_vehicles as unknown as PopularVehicle[])
    : [];


  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageHero
        title={heroTitle}
        highlightedWord={highlightedWord}
        subtitle={event.subtitle || event.description || ""}
        backgroundImage={event.image_url || "/placeholder.svg"}
      >
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="gold" size="lg">
            Get a Quote
            <ArrowRight className="w-4 h-4" />
          </Button>
          <a href={`tel:${phone}`}>
            <Button variant="outline" size="lg">
              <Phone className="w-4 h-4" />
              Call {phone}
            </Button>
          </a>
        </div>
      </PageHero>

      {/* Features Section */}
      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
                What We <span className="text-gradient-gold">Offer</span>
              </h2>
              <ul className="space-y-4">
                {Array.isArray(event.features) && (event.features as string[]).map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-muted-foreground">
                    <Check className="w-5 h-5 text-gold flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <img
                src={event.image_url || "/placeholder.svg"}
                alt={event.title}
                className="w-full h-auto object-cover aspect-[4/3] rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Popular Vehicles */}
      {popularVehicles.length > 0 && (
        <section className="py-20 bg-card">
          <div className="container">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
              Popular Vehicles for <span className="text-gradient-gold">{event.title}</span>
            </h2>
            <div className="section-divider mb-12" />

            <div className="grid md:grid-cols-3 gap-6">
              {popularVehicles.map((vehicle) => (
                <Link
                  key={vehicle.id}
                  to={`/fleet/${vehicle.id}`}
                  className="card-luxury p-6 hover:border-gold/30 transition-colors group"
                >
                  <h3 className="font-serif text-xl font-bold text-foreground mb-2 group-hover:text-gold transition-colors">
                    {vehicle.title}
                  </h3>
                  <div className="flex items-center gap-2 text-gold text-sm mb-4">
                    <Users className="w-4 h-4" />
                    {vehicle.passengers} passengers
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm group-hover:text-gold group-hover:gap-3 transition-all">
                    View Details
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Tips Section */}
      {Array.isArray(event.tips) && (event.tips as string[]).length > 0 && (
        <section className="py-20">
          <div className="container">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
              Planning <span className="text-gradient-gold">Tips</span>
            </h2>
            <div className="section-divider mb-12" />

            <div className="max-w-2xl mx-auto">
              <ul className="space-y-4">
                {(event.tips as string[]).map((tip, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-gold text-gold-foreground flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <span className="text-muted-foreground">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      <Testimonials />
      {faqs && (
        <FAQ items={faqs.items} subtitle={`Common questions about ${event.title.toLowerCase()}.`} />
      )}
      <CTASection />
      <Footer />
    </div>
  );
};

export default EventDetail;

