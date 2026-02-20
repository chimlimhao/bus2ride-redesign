import { FileText, Calendar, Bus } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { usePageContent } from "@/hooks/usePageContent";

interface Step {
  title: string;
  description: string;
  icon?: string;
}

interface HowItWorksContent {
  title: string;
  highlighted: string;
  subtitle: string;
  steps: Step[];
}

const HowItWorks = () => {
  const { content, loading } = usePageContent<HowItWorksContent>('home', 'how-it-works');

  if (loading) {
    return (
      <section className="py-24 lg:py-32 bg-card">
        <div className="container text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
        </div>
      </section>
    );
  }

  const defaults: HowItWorksContent = {
    title: "How It",
    highlighted: "Works",
    subtitle: "Getting your luxury transportation booked is simple and straightforward with Bus2Ride.",
    steps: [
      { title: "Request a Quote", description: "Fill out our simple form with your trip details and preferences.", icon: "FileText" },
      { title: "Review & Book", description: "Receive a personalized quote and secure your reservation online.", icon: "Calendar" },
      { title: "Enjoy Your Ride", description: "Relax as our professional chauffeur takes care of everything.", icon: "Bus" }
    ]
  };

  const activeContent = content || defaults;
  const steps = (activeContent && activeContent.steps && activeContent.steps.length > 0)
    ? activeContent.steps
    : defaults.steps;

  const IconMap: Record<number, any> = {
    0: FileText,
    1: Calendar,
    2: Bus,
  };

  return (
    <section className="py-24 lg:py-32 bg-card">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {activeContent.title} <span className="text-gradient-gold">{activeContent.highlighted}</span>
          </h2>
          <div className="section-divider mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {activeContent.subtitle}
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-12 lg:gap-20">
          {steps.map((step, index) => {
            // Try to get icon from library if specified, otherwise fallback to index-based map
            let Icon = (step.icon && (LucideIcons as any)[step.icon])
              ? (LucideIcons as any)[step.icon]
              : IconMap[index] || Bus;

            return (
              <div key={index} className="relative text-center group">
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-1/2 w-full h-px bg-border" />
                )}

                {/* Icon */}
                <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-full bg-background border border-border mb-8 group-hover:border-gold/50 transition-colors">
                  <Icon className="w-10 h-10 text-gold" />
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
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;