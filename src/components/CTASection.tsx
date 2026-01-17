import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

      <div className="container relative px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Ready to Book Your
            <span className="text-gradient"> Premium Ride?</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            Get an instant quote in under 60 seconds. No obligation, no hidden fees.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero" size="xl">
              Get Instant Quote
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="xl">
              <Phone className="w-5 h-5" />
              Call 888-535-2566
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mt-8">
            Available 24/7 · Response within 1 hour · Free cancellation up to 48 hours before
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
