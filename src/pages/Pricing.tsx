import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import FAQ from "@/components/FAQ";
import ComparisonTable from "@/components/ComparisonTable";
import { Button } from "@/components/ui/button";
import { Check, Phone } from "lucide-react";
import QuoteModal from "@/components/QuoteModal";

const pricingTiers = [
  {
    name: "Luxury Sedan",
    description: "Perfect for airport transfers and executive travel",
    priceRange: "$75 - $150",
    unit: "per hour",
    passengers: "Up to 3 passengers",
    features: [
      "Professional chauffeur",
      "Leather interior",
      "Complimentary water",
      "Flight tracking for airport pickups",
      "Meet & greet service",
    ],
    popular: false,
  },
  {
    name: "Limousine",
    description: "Ideal for weddings, proms, and special occasions",
    priceRange: "$150 - $300",
    unit: "per hour",
    passengers: "Up to 10 passengers",
    features: [
      "Professional chauffeur",
      "Premium sound system",
      "LED lighting",
      "Champagne service available",
      "Red carpet service",
      "Complimentary decorations",
    ],
    popular: true,
  },
  {
    name: "Party Bus",
    description: "The ultimate party experience on wheels",
    priceRange: "$200 - $500",
    unit: "per hour",
    passengers: "Up to 40 passengers",
    features: [
      "Professional chauffeur",
      "Dance floor & poles",
      "Premium sound system",
      "LED & laser lighting",
      "Multiple TV screens",
      "Bar area with coolers",
      "Restroom on board",
    ],
    popular: false,
  },
  {
    name: "Coach Bus",
    description: "Comfortable group transportation for any distance",
    priceRange: "$150 - $400",
    unit: "per hour",
    passengers: "Up to 56 passengers",
    features: [
      "Professional driver",
      "Reclining seats",
      "Climate control",
      "Overhead storage",
      "Restroom on board",
      "WiFi available",
      "Power outlets",
    ],
    popular: false,
  },
];

const faqItems = [
  {
    question: "How are prices calculated?",
    answer: "Our pricing is based on several factors including vehicle type, duration of rental, distance traveled, and time of year. We offer both hourly rates and package pricing for events. Contact us for a personalized quote tailored to your specific needs.",
  },
  {
    question: "Is there a minimum rental time?",
    answer: "Yes, most of our vehicles have a minimum rental time of 3-4 hours, depending on the vehicle type and day of the week. Weekend minimums may be higher, especially during peak season.",
  },
  {
    question: "What's included in the price?",
    answer: "Our prices typically include the vehicle, professional chauffeur, fuel, and standard amenities. Gratuity (15-20%) is customary but not included in the quoted price. Additional services like decorations or bar packages may incur extra charges.",
  },
  {
    question: "Do you offer package deals?",
    answer: "Yes! We offer special packages for weddings, proms, and corporate events that can save you money compared to hourly rates. Ask about our multi-vehicle discounts for large events.",
  },
  {
    question: "What is your cancellation policy?",
    answer: "Cancellations made 14+ days before the event receive a full refund minus the deposit. Cancellations 7-14 days out receive a 50% refund. Cancellations within 7 days are non-refundable. We recommend event insurance for large bookings.",
  },
  {
    question: "Are there any additional fees?",
    answer: "Additional fees may apply for overtime, extra stops, out-of-area pickups, tolls, and parking. We're transparent about all costs upfront in your quote so there are no surprises.",
  },
];

const Pricing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageHero
        title="Transparent"
        highlightedWord="Pricing"
        subtitle="No hidden fees. Get a clear quote for your luxury transportation needs."
        backgroundImage="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070"
      />

      {/* Pricing Cards */}
      <section className="py-24 lg:py-32">
        <div className="container">
          <div className="text-center mb-16">
            <span className="text-gold font-semibold tracking-wider uppercase text-sm">
              Our Rates
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-4">
              Vehicle <span className="text-gradient-gold">Pricing</span>
            </h2>
            <div className="section-divider mb-6" />
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Prices vary based on date, time, and specific requirements. Contact us for an accurate quote.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingTiers.map((tier, index) => (
              <div
                key={index}
                className={`card-luxury p-6 relative flex flex-col ${
                  tier.popular ? "ring-2 ring-gold" : ""
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
                  <div className="text-3xl font-bold text-gold">{tier.priceRange}</div>
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

                <QuoteModal>
                  <Button variant={tier.popular ? "gold" : "outline"} className="w-full">
                    Get a Quote
                  </Button>
                </QuoteModal>
              </div>
            ))}
          </div>
        </div>
      </section>

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
                <a href="tel:888-535-2566" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Call 888-535-2566
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <FAQ items={faqItems} title="Pricing FAQs" />

      <Footer />
    </div>
  );
};

export default Pricing;
