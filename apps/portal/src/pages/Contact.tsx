import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import FAQ from "@/components/FAQ";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, Shield } from "lucide-react";
import { usePageContent } from "@/hooks/usePageContent";

interface ContactHero {
  title: string;
  highlighted: string;
  subtitle: string;
  image: string;
}

interface ContactInfoItem {
  title: string;
  content: string;
  description: string;
  link: string | null;
}

interface ContactInfoContent {
  items: ContactInfoItem[];
}

interface ContactFAQs {
  items: { question: string; answer: string }[];
}

const Contact = () => {
  const { content: hero, loading: heroLoading } = usePageContent<ContactHero>('contact', 'hero');
  const { content: infoContent, loading: infoLoading } = usePageContent<ContactInfoContent>('contact', 'info');
  const { content: faqs, loading: faqsLoading } = usePageContent<ContactFAQs>('contact', 'faqItems');

  const isLoading = heroLoading || infoLoading || faqsLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  const ContactIconMap: Record<string, any> = {
    "Phone": Phone,
    "Email": Mail,
    "Service Area": MapPin,
    "Hours": Clock,
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

      {/* Contact Section */}
      <section className="py-24 lg:py-32">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <span className="text-gold font-semibold tracking-wider uppercase text-sm">
                Send a Message
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-4 mb-4">
                Get a <span className="text-gradient-gold">Free Quote</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Fill out the form below and we'll get back to you with a personalized quote within 2 hours.
              </p>

              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      First Name *
                    </label>
                    <Input placeholder="John" className="bg-card border-border" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Last Name *
                    </label>
                    <Input placeholder="Doe" className="bg-card border-border" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Email *
                    </label>
                    <Input type="email" placeholder="john@example.com" className="bg-card border-border" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Phone *
                    </label>
                    <Input type="tel" placeholder="(555) 123-4567" className="bg-card border-border" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Event Date
                    </label>
                    <Input type="date" className="bg-card border-border" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Number of Passengers
                    </label>
                    <Input type="number" placeholder="10" className="bg-card border-border" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Event Type
                  </label>
                  <Input placeholder="Wedding, Prom, Corporate, etc." className="bg-card border-border" />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Message
                  </label>
                  <Textarea
                    placeholder="Tell us about your event and any special requirements..."
                    rows={5}
                    className="bg-card border-border"
                  />
                </div>

                <Button variant="gold" size="lg" className="w-full">
                  Submit Request
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <span className="text-gold font-semibold tracking-wider uppercase text-sm">
                Contact Information
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-4 mb-4">
                Reach Out <span className="text-gradient-gold">Directly</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Prefer to speak with someone? Our team is available around the clock to assist you.
              </p>

              <div className="grid sm:grid-cols-2 gap-6 mb-12">
                {infoContent?.items.map((info, index) => {
                  const Icon = ContactIconMap[info.title] || Shield;
                  return (
                    <div key={index} className="card-luxury p-6">
                      <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-gold" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-1">{info.title}</h3>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-gold hover:underline block mb-1"
                        >
                          {info.content}
                        </a>
                      ) : (
                        <p className="text-foreground mb-1">{info.content}</p>
                      )}
                      <p className="text-sm text-muted-foreground">{info.description}</p>
                    </div>
                  );
                })}
              </div>

              {/* Map Placeholder */}
              <div className="card-luxury overflow-hidden">
                <div className="aspect-video bg-secondary flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-gold mx-auto mb-4" />
                    <p className="text-foreground font-semibold">Nationwide Service</p>
                    <p className="text-muted-foreground text-sm">Serving all 50 states</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {faqs && (
        <FAQ
          items={faqs.items}
          title="Contact FAQs"
        />
      )}

      <Footer />
    </div>
  );
};

export default Contact;

