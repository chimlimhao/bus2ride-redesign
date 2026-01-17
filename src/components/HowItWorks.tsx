import { FileText, Calendar, Bus } from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "Request a Quote",
    description: "Tell us your event details—date, location, group size—and get an instant estimate.",
  },
  {
    icon: Calendar,
    title: "Confirm Your Booking",
    description: "Review your options, select your vehicle, and lock in your reservation with a deposit.",
  },
  {
    icon: Bus,
    title: "Enjoy the Ride",
    description: "Your professional chauffeur arrives on time. Sit back, relax, and enjoy the experience.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 lg:py-32 bg-secondary/30">
      <div className="container px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">
            How It Works
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-4">
            Book in 3 Simple Steps
          </h2>
          <div className="section-divider" />
          <p className="text-muted-foreground max-w-2xl mx-auto mt-6">
            No hidden fees, no complicated process. Just simple, transparent booking.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="relative text-center group">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-1/2 w-full h-px bg-border" />
              )}

              {/* Icon */}
              <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-full bg-card border border-border mb-6 group-hover:border-primary transition-colors glow-primary">
                <step.icon className="w-10 h-10 text-primary" />
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-sm font-bold text-primary-foreground">
                  {index + 1}
                </div>
              </div>

              {/* Content */}
              <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-muted-foreground max-w-xs mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
