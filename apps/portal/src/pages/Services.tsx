import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import PageHero from "@/components/PageHero";
import FAQ from "@/components/FAQ";
import Testimonials from "@/components/Testimonials";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Shield, MapPin, Headphones } from "lucide-react";
import * as LucideIcons from "lucide-react";
import QuoteModal from "@/components/QuoteModal";
import { useState, useEffect } from "react";
import { supabase } from "@bus2ride/shared/supabase";
import type { Tables } from "@bus2ride/shared/supabase/types";
import { usePageContent } from "@/hooks/usePageContent";

type Service = Tables<"services">;

interface ServicesHero {
  title: string;
  highlighted: string;
  subtitle: string;
  image: string;
}

interface ServicesFeatures {
  items: { title: string; description: string }[];
}

interface ServicesFAQs {
  subtitle: string;
  items: { question: string; answer: string }[];
}

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const { content: hero, loading: heroLoading } = usePageContent<ServicesHero>('services', 'hero');
  const { content: featuresContent, loading: featuresLoading } = usePageContent<ServicesFeatures>('services', 'features');
  const { content: faqs, loading: faqsLoading } = usePageContent<ServicesFAQs>('services', 'faqs');
  const [servicesLoading, setServicesLoading] = useState(true);

  useEffect(() => {
    async function fetchServices() {
      try {
        const { data, error } = await supabase
          .from("services")
          .select("*")
          .eq("status", "Published")
          .order("sort_order", { ascending: true });

        if (error) throw error;
        setServices(data || []);
      } catch (err) {
        console.error("Error fetching services:", err);
      } finally {
        setServicesLoading(false);
      }
    }

    fetchServices();
  }, []);

  const isLoading = heroLoading || featuresLoading || faqsLoading || servicesLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  const FeatureIconMap: Record<string, any> = {
    "24/7 Availability": Clock,
    "Safety First": Shield,
    "GPS Tracking": MapPin,
    "Dedicated Support": Headphones,
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {hero && (
        <PageHero
          title={hero.title}
          highlightedWord={hero.highlighted}
          subtitle={hero.subtitle}
          backgroundImage={hero.image}
        />
      )}

      {/* Features Bar */}
      {featuresContent && (
        <section className="py-16 bg-card border-y border-border">
          <div className="container">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {(featuresContent.items || []).map((feature: any, index: number) => {
                const Icon = (feature.icon && (LucideIcons as any)[feature.icon])
                  ? (LucideIcons as any)[feature.icon]
                  : FeatureIconMap[feature.title] || Shield;

                return (
                  <div key={index} className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-gold/10">
                      <Icon className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Services List - Alternating Layout */}
      <section className="py-24">
        <div className="container">
          <div className="space-y-24 lg:space-y-32">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  } items-center gap-12 lg:gap-20`}
              >
                {/* Image */}
                <div className="w-full lg:w-1/2">
                  <img
                    src={service.image_url || ""}
                    alt={service.title}
                    className="w-full h-auto rounded-lg object-cover aspect-[4/3]"
                  />
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2 space-y-6">
                  <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                    {service.title}
                  </h2>
                  <p className="text-gold text-lg font-medium">
                    {service.title} Solutions
                  </p>
                  <p className="text-muted-foreground">
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {service.features?.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center gap-3 text-muted-foreground"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <QuoteModal vehicleType={service.title}>
                    <Button variant="gold" size="lg">
                      Get a Quote
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </QuoteModal>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      {faqs && (
        <FAQ
          items={faqs.items}
          subtitle={faqs.subtitle}
        />
      )}
      <CTASection />
      <Footer />
    </div>
  );
};

export default Services;

