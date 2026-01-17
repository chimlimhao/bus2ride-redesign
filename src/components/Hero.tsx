import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import QuoteModal from "@/components/QuoteModal";
import AnimatedSection from "@/components/AnimatedSection";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Video Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-40"
          poster="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2048"
        >
          <source 
            src="https://videos.pexels.com/video-files/2711809/2711809-uhd_2560_1440_30fps.mp4" 
            type="video/mp4" 
          />
          {/* Fallback image if video doesn't load */}
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2048"
            alt="Luxury vehicle"
            className="w-full h-full object-cover"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background/50" />
      </div>

      {/* Content */}
      <div className="container relative z-10 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <AnimatedSection delay={0}>
            <div className="inline-flex items-center gap-2 badge-gold mb-8">
              <Star className="w-4 h-4" />
              Premium Fleet Rentals
            </div>
          </AnimatedSection>

          {/* Heading */}
          <AnimatedSection delay={0.1}>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl font-bold text-foreground mb-6">
              Group Transport
              <span className="block text-gradient-gold">Made Easy</span>
            </h1>
          </AnimatedSection>

          {/* Subheading */}
          <AnimatedSection delay={0.2}>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Instant quotes, transparent pricing, and meticulously maintained vehicles for weddings, proms, corporate events, and more.
            </p>
          </AnimatedSection>

          {/* CTA Buttons */}
          <AnimatedSection delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <QuoteModal>
                <Button variant="gold" size="xl" className="w-full sm:w-auto">
                  Get Instant Quote
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </QuoteModal>
              <Button variant="outline" size="xl" className="w-full sm:w-auto" asChild>
                <Link to="/fleet">View Our Fleet</Link>
              </Button>
            </div>
          </AnimatedSection>

          {/* Trust Indicators */}
          <AnimatedSection delay={0.4}>
            <div className="flex flex-wrap items-center justify-center gap-8 mt-16">
              <div className="text-center">
                <div className="text-3xl font-bold text-gold">98%</div>
                <div className="text-sm text-muted-foreground">On-Time Rate</div>
              </div>
              <div className="w-px h-10 bg-border hidden sm:block" />
              <div className="text-center">
                <div className="text-3xl font-bold text-gold">15K+</div>
                <div className="text-sm text-muted-foreground">Happy Customers</div>
              </div>
              <div className="w-px h-10 bg-border hidden sm:block" />
              <div className="text-center">
                <div className="text-3xl font-bold text-gold">150+</div>
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
          </AnimatedSection>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-gold/50 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-gold animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
