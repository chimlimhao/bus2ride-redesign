import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import FAQ from "@/components/FAQ";
import ComparisonTable from "@/components/ComparisonTable";
import { Button } from "@/components/ui/button";
import { Check, Phone } from "lucide-react";
import QuoteModal from "@/components/QuoteModal";
import { usePageContent, useSiteSettings } from "@/hooks/usePageContent";

interface PricingHero {
  title: string;
  highlighted: string;
  subtitle: string;
  image: string;
}

interface PricingTier {
  name: string;
  description: string;
  price: string;
  unit: string;
  passengers: string;
  popular: boolean;
  features: string[];
}

interface PricingTiersContent {
  title: string;
  highlighted: string;
  subtitle: string;
  items: PricingTier[];
}

interface PricingFAQs {
  items: { question: string; answer: string }[];
}

const Pricing = () => {
  const { content: hero, loading: heroLoading } = usePageContent<PricingHero>('pricing', 'hero');
  const { content: tiersContent, loading: tiersLoading } = usePageContent<PricingTiersContent>('pricing', 'tiers');
  const { content: faqs, loading: faqsLoading } = usePageContent<PricingFAQs>('pricing', 'faqs');
  const { settings } = useSiteSettings();

  const isLoading = heroLoading || tiersLoading || faqsLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  const phone = settings.contact_phone || "888-535-2566";

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

      {/* Pricing Cards */}
      {tiersContent && (
        <section className="py-24 lg:py-32">
          <div className="container">
            <div className="text-center mb-16">
              <span className="text-gold font-semibold tracking-wider uppercase text-sm">
                Our Rates
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-4">
                {tiersContent.title} <span className="text-gradient-gold">{tiersContent.highlighted}</span>
              </h2>
              <div className="section-divider mb-6" />
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {tiersContent.subtitle}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tiersContent.items.map((tier, index) => (
                <div
                  key={index}
                  className={`card-luxury p-6 relative flex flex-col ${tier.popular ? "ring-2 ring-gold" : ""
                    }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-gold-foreground text-xs font-bold px-4 py-1">
                      Most Popular
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                      {tier.name}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {tier.description}
                    </p>
                  </div>

                  <div className="mb-6">
                    <div className="text-3xl font-bold text-gold">{tier.price}</div>
                    <div className="text-muted-foreground text-sm">{tier.unit}</div>
                    <div className="text-foreground text-sm mt-2">{tier.passengers}</div>
                  </div>

                  <ul className="space-y-3 mb-8 flex-grow">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <QuoteModal vehicleType={tier.name}>
                    <Button variant={tier.popular ? "gold" : "outline"} className="w-full">
                      Get a Quote
                    </Button>
                  </QuoteModal>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Comparison Table */}
      <ComparisonTable />

      {/* Custom Quote CTA */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
              Need a Custom Quote?
            </h2>
            <p className="text-muted-foreground mb-8">
              Every event is unique. Let us create a tailored package that fits your specific needs and budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <QuoteModal>
                <Button variant="gold" size="lg">
                  Request Custom Quote
                </Button>
              </QuoteModal>
              <Button variant="outline" size="lg" asChild>
                <a href={`tel:${phone}`} className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Call {phone}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {faqs && (
        <FAQ items={faqs.items} title="Pricing FAQs" />
      )}

      <Footer />
    </div>
  );
};

export default Pricing;

