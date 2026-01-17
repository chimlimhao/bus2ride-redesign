import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, GraduationCap, Briefcase, PartyPopper, Plane, Users } from "lucide-react";

const events = [
  {
    icon: Heart,
    title: "Weddings",
    description: "Make your special day unforgettable with elegant transportation for the wedding party and guests.",
  },
  {
    icon: GraduationCap,
    title: "Prom & School Events",
    description: "Safe, stylish rides for students to celebrate their milestone moments.",
  },
  {
    icon: Briefcase,
    title: "Corporate Events",
    description: "Professional shuttle services for conferences, team outings, and executive travel.",
  },
  {
    icon: PartyPopper,
    title: "Bachelor & Bachelorette",
    description: "Party buses equipped for the ultimate celebration with your closest friends.",
  },
  {
    icon: Plane,
    title: "Airport Transfers",
    description: "Reliable pickup and drop-off for groups traveling together.",
  },
  {
    icon: Users,
    title: "Group Outings",
    description: "Wine tours, sporting events, concerts—travel together in comfort.",
  },
];

const EventsSection = () => {
  return (
    <section id="events" className="py-20 lg:py-32">
      <div className="container px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">
            Events We Serve
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-4">
            Perfect for Any Occasion
          </h2>
          <div className="section-divider" />
          <p className="text-muted-foreground max-w-2xl mx-auto mt-6">
            From intimate gatherings to large corporate events, we provide premium transportation tailored to your needs.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <div
              key={index}
              className="card-luxury p-6 group hover:border-primary/50 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <event.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                {event.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                {event.description}
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Learn More
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button variant="hero" size="lg">
            Plan Your Event
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
