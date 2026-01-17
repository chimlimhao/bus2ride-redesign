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
    <section className="py-24 lg:py-32 bg-card">
      <div className="container px-4">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            How It <span className="text-gradient-gold">Works</span>
          </h2>
          <div className="section-divider mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            No hidden fees, no complicated process. Just simple, transparent booking.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-12 lg:gap-20">
          {steps.map((step, index) => (
            <div key={index} className="relative text-center group">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-1/2 w-full h-px bg-border" />
              )}

              {/* Icon */}
              <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-full bg-background border border-border mb-8 group-hover:border-gold/50 transition-colors">
                <step.icon className="w-10 h-10 text-gold" />
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gold flex items-center justify-center text-sm font-bold text-gold-foreground">
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