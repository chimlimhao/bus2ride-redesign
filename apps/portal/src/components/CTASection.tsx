import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";

import { usePageContent } from "@/hooks/usePageContent";

interface CTAContent {
  title: string;
  highlighted: string;
  subtitle: string;
  primary_cta: string;
  secondary_cta: string;
  bottom_text: string;
}

const CTASection = () => {
  const { content, loading } = usePageContent<CTAContent>('global', 'cta');

  if (loading || !content) {
    return (
      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="container relative text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-card via-background to-background" />

      <div className="container relative">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {content.title}
            <span className="text-gradient-gold"> {content.highlighted}</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            {content.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="gold" size="xl">
              {content.primary_cta}
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="xl">
              <Phone className="w-5 h-5" />
              {content.secondary_cta}
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mt-8">
            {content.bottom_text}
          </p>
        </div>
      </div>

    </section>
  );
};

export default CTASection;