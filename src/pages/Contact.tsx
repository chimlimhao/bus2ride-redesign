import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import FAQ from "@/components/FAQ";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    content: "888-535-2566",
    link: "tel:888-535-2566",
    description: "Available 24/7 for reservations",
  },
  {
    icon: Mail,
    title: "Email",
    content: "info@bus2ride.com",
    link: "mailto:info@bus2ride.com",
    description: "We respond within 2 hours",
  },
  {
    icon: MapPin,
    title: "Service Area",
    content: "Nationwide Service",
    link: null,
    description: "We operate across all 50 states",
  },
  {
    icon: Clock,
    title: "Hours",
    content: "24/7 Support",
    link: null,
    description: "Always here when you need us",
  },
];

const faqItems = [
  {
    question: "How quickly will I get a response?",
    answer: "We aim to respond to all inquiries within 2 hours during business hours. For urgent requests, please call us directly at 888-535-2566.",
  },
  {
    question: "Can I book same-day service?",
    answer: "Yes, we offer same-day bookings based on availability. Call us directly for the fastest response on last-minute requests.",
  },
  {
    question: "Do you service my area?",
    answer: "We provide nationwide service across all 50 states. Enter your location in the quote form or contact us to confirm availability in your specific area.",
  },
  {
    question: "What information do I need to get a quote?",
    answer: "To provide an accurate quote, we need: date and time of service, pickup and drop-off locations, number of passengers, type of event, and any special requirements.",
  },
];

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageHero
        title="Contact"
        highlightedWord="Us"
        subtitle="Get in touch with our team for bookings, questions, or custom quotes."
        backgroundImage="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=2074"
      />

      {/* Contact Section */}
      <section className="py-24 lg:py-32">
        <div className="container px-4">
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
                {contactInfo.map((info, index) => (
                  <div key={index} className="card-luxury p-6">
                    <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center mb-4">
                      <info.icon className="w-6 h-6 text-gold" />
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
                ))}
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

      <FAQ items={faqItems} title="Contact FAQs" />

      <Footer />
    </div>
  );
};

export default Contact;
