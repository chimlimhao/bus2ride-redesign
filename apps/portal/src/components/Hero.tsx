import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import QuoteModal from "@/components/QuoteModal";
import AnimatedSection from "@/components/AnimatedSection";

import { usePageContent } from "@/hooks/usePageContent";

interface HeroContent {
  badge: string;
  title: string;
  highlighted: string;
  subtitle: string;
  image_fallback: string;
  video_url: string;
  cta_primary: string;
  cta_secondary: string;
  stats: Array<{ value: string; label: string }>;
}

const Hero = () => {
  const { content, loading } = usePageContent<HeroContent>('home', 'hero');

  if (loading || !content) {
    return (
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={content.image_fallback}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/50 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/40" />
      </div>

      {/* Content */}
      <div className="container relative z-10 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <AnimatedSection delay={0}>
            <div className="inline-flex items-center gap-2 badge-gold mb-8">
              <Star className="w-4 h-4" />
              {content.badge}
            </div>
          </AnimatedSection>

          {/* Heading */}
          <AnimatedSection delay={0.1}>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl font-bold text-foreground mb-6">
              {content.title}
              <span className="block text-gradient-gold">{content.highlighted}</span>
            </h1>
          </AnimatedSection>

          {/* Subheading */}
          <AnimatedSection delay={0.2}>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              {content.subtitle}
            </p>
          </AnimatedSection>

          {/* CTA Buttons */}
          <AnimatedSection delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <QuoteModal>
                <Button variant="gold" size="xl" className="w-full sm:w-auto">
                  {content.cta_primary}
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </QuoteModal>
              <Button variant="outline" size="xl" className="w-full sm:w-auto" asChild>
                <Link to="/fleet">{content.cta_secondary}</Link>
              </Button>
            </div>
          </AnimatedSection>

          {/* Trust Indicators */}
          <AnimatedSection delay={0.4}>
            <div className="flex flex-wrap items-center justify-center gap-8 mt-16">
              {content.stats.map((stat, index) => (
                <div key={index} className="flex items-center gap-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gold">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                  {index < content.stats.length - 1 && (
                    <div className="w-px h-10 bg-border hidden sm:block" />
                  )}
                </div>
              ))}

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
