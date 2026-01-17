import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2048"
          alt="Luxury vehicle interior"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background/50" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 badge-gold mb-8 animate-fade-up">
            <Star className="w-4 h-4" />
            Premium Fleet Rentals
          </div>

          {/* Heading */}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl font-bold text-foreground mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Group Transport
            <span className="block text-gradient">Made Easy</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Instant quotes, transparent pricing, and meticulously maintained vehicles for weddings, proms, corporate events, and more.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <Button variant="hero" size="xl" className="w-full sm:w-auto">
              Get Instant Quote
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="xl" className="w-full sm:w-auto">
              View Our Fleet
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-16 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">98%</div>
              <div className="text-sm text-muted-foreground">On-Time Rate</div>
            </div>
            <div className="w-px h-10 bg-border hidden sm:block" />
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">15K+</div>
              <div className="text-sm text-muted-foreground">Happy Customers</div>
            </div>
            <div className="w-px h-10 bg-border hidden sm:block" />
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">150+</div>
              <div className="text-sm text-muted-foreground">Premium Vehicles</div>
            </div>
            <div className="w-px h-10 bg-border hidden sm:block" />
            <div className="text-center flex items-center gap-1">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>
              <div className="text-sm text-muted-foreground ml-2">4.9 Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground flex items-start justify-center p-2">
          <div className="w-1 h-2 rounded-full bg-muted-foreground animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
