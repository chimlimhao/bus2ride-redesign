import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const events = [
  {
    id: "weddings",
    title: "Weddings",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800",
    description: "Make your special day unforgettable with elegant transportation.",
  },
  {
    id: "corporate",
    title: "Corporate Events",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800",
    description: "Professional transportation for meetings and conferences.",
  },
  {
    id: "prom",
    title: "Prom & Homecoming",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800",
    description: "Safe and stylish rides for your special school events.",
  },
  {
    id: "bachelor-bachelorette",
    title: "Bachelor & Bachelorette",
    image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=800",
    description: "Party buses and limos for your celebration.",
  },
  {
    id: "sports-games",
    title: "Sports & Game Day",
    image: "https://images.unsplash.com/photo-1471295253337-3ceaaedca402?q=80&w=800",
    description: "Group transportation for tailgates and sporting events.",
  },
  {
    id: "concerts",
    title: "Concerts & Festivals",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=800",
    description: "Ride in style to your favorite live events.",
  },
];

const EventCards = () => {
  return (
    <section id="events" className="py-24 lg:py-32 bg-card">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Events We <span className="text-gradient-gold">Serve</span>
          </h2>
          <div className="section-divider mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Whatever the occasion, we have the perfect transportation solution.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Link
              key={event.id}
              to={`/events/${event.id}`}
              className="group relative h-72 rounded-lg overflow-hidden"
            >
              {/* Background Image */}
              <img
                src={event.image}
                alt={event.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

              {/* Badge */}
              <div className="absolute top-4 left-4">
                <span className="badge-gold text-xs">EVENT</span>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-serif text-xl font-bold text-foreground mb-2 group-hover:text-gold transition-colors">
                  {event.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
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
