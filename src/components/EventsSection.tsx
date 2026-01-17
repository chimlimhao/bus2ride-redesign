import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const events = [
  {
    title: "Weddings",
    subtitle: "Make your special day unforgettable",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800",
    features: [
      "Bride & Groom Transportation",
      "Wedding Party Shuttles",
      "Guest Transportation",
      "Red Carpet Service",
    ],
  },
  {
    title: "Corporate Events",
    subtitle: "Professional transportation solutions",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800",
    features: [
      "Executive Airport Transfers",
      "Conference Shuttles",
      "Team Building Outings",
      "Client Transportation",
    ],
  },
  {
    title: "Bachelor & Bachelorette",
    subtitle: "Party in style with your crew",
    image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=800",
    features: [
      "Party Bus Options",
      "Premium Sound Systems",
      "LED Lighting",
      "Multiple Stops",
    ],
  },
];

const EventsSection = () => {
  return (
    <section id="events" className="py-24 lg:py-32 bg-card">
      <div className="container px-4">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Events We <span className="text-gradient-gold">Serve</span>
          </h2>
          <div className="section-divider mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From intimate gatherings to large corporate events, we provide premium transportation tailored to your needs.
          </p>
        </div>

        {/* Events List - Alternating Layout */}
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
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-auto rounded-lg object-cover aspect-[4/3]"
                />
              </div>

              {/* Content */}
              <div className="w-full lg:w-1/2 space-y-6">
                <h3 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                  {event.title}
                </h3>
                <p className="text-gold text-lg font-medium">
                  {event.subtitle}
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
                <Button variant="gold" size="lg" asChild>
                  <Link to="/events">
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