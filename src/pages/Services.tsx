import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import PageHero from "@/components/PageHero";
import FAQ from "@/components/FAQ";
import Testimonials from "@/components/Testimonials";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Shield, MapPin, Headphones } from "lucide-react";
import QuoteModal from "@/components/QuoteModal";

const services = [
  {
    id: "airport-transfers",
    title: "Airport Transfers",
    subtitle: "Reliable pickup and drop-off service",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800",
    description: "Start and end your journey stress-free with our reliable airport transportation services. We track flights in real-time to ensure timely pickup, regardless of delays.",
    features: [
      "Real-time Flight Tracking",
      "Meet & Greet Service",
      "Luggage Assistance",
      "24/7 Availability",
      "All Major Airports",
      "Corporate Accounts",
    ],
  },
  {
    id: "corporate-transportation",
    title: "Corporate Transportation",
    subtitle: "Professional business travel solutions",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800",
    description: "Impress clients and keep your team moving efficiently with our executive fleet. From airport transfers to roadshows, we handle all your corporate transportation needs.",
    features: [
      "Executive Airport Transfers",
      "Conference Shuttles",
      "Roadshow Services",
      "Client Entertainment",
      "Corporate Accounts",
      "Dedicated Account Manager",
    ],
  },
  {
    id: "group-charters",
    title: "Group Charters",
    subtitle: "Custom transportation for any group size",
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=800",
    description: "Whether it's a school field trip, church outing, or sports team travel, we provide safe and comfortable transportation for groups of all sizes.",
    features: [
      "School & Church Groups",
      "Sports Team Travel",
      "Tour Groups",
      "Convention Shuttles",
      "Custom Itineraries",
      "Flexible Scheduling",
    ],
  },
  {
    id: "wine-tours",
    title: "Wine Tours & Tastings",
    subtitle: "Explore vineyards in style",
    image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=800",
    description: "Tour local wineries and enjoy tastings without worrying about driving. We create custom itineraries and handle all the logistics while you sip and savor.",
    features: [
      "Custom Winery Itineraries",
      "Knowledgeable Drivers",
      "Cooler Storage",
      "Multiple Winery Stops",
      "Lunch Reservations",
      "VIP Access",
    ],
  },
  {
    id: "casino-trips",
    title: "Casino Trips",
    subtitle: "Round-trip casino transportation",
    image: "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?q=80&w=800",
    description: "Enjoy a night at the casino without the hassle of driving. Our comfortable coaches take you there and back safely, so you can focus on having fun.",
    features: [
      "Round-Trip Service",
      "Multiple Casino Destinations",
      "Group Packages",
      "On-board Entertainment",
      "Refreshments Included",
      "Safe Return Home",
    ],
  },
  {
    id: "city-tours",
    title: "City Tours",
    subtitle: "Explore the city in comfort",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=800",
    description: "Discover the best sights and attractions with our guided city tours. Perfect for tourists, corporate groups, or anyone wanting to explore.",
    features: [
      "Professional Guides Available",
      "Custom Routes",
      "Photo Opportunities",
      "Historical Sites",
      "Restaurant Recommendations",
      "All-Day Packages",
    ],
  },
];

const features = [
  {
    icon: Clock,
    title: "24/7 Availability",
    description: "Round-the-clock service for all your transportation needs.",
  },
  {
    icon: Shield,
    title: "Safety First",
    description: "Licensed, insured, and rigorously maintained vehicles.",
  },
  {
    icon: MapPin,
    title: "GPS Tracking",
    description: "Real-time tracking for peace of mind.",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description: "Personal account managers for corporate clients.",
  },
];

const faqItems = [
  {
    question: "Do you offer corporate accounts?",
    answer: "Yes! We offer corporate accounts with dedicated account managers, consolidated billing, priority booking, and volume discounts. Contact us to set up a corporate account for your company.",
  },
  {
    question: "What areas do you service?",
    answer: "We provide service throughout the greater metropolitan area and can accommodate long-distance travel. Contact us with your specific route for availability and pricing.",
  },
  {
    question: "How do I get a quote?",
    answer: "You can get an instant quote through our website by providing your event details, or call us directly for personalized pricing. We offer transparent, all-inclusive pricing with no hidden fees.",
  },
  {
    question: "What happens if my flight is delayed?",
    answer: "We track all flights in real-time. If your flight is delayed, we automatically adjust your pickup time at no additional charge. Your driver will be waiting when you arrive.",
  },
  {
    question: "Can I make multiple stops?",
    answer: "Absolutely! Many of our services include multiple stops. Whether it's a wine tour with several wineries or a city tour with various attractions, we can customize your itinerary.",
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageHero
        title="Our"
        highlightedWord="Services"
        subtitle="Professional transportation solutions tailored to your needs. From airport transfers to wine tours, we've got you covered."
        backgroundImage="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2048"
      />

      {/* Features Bar */}
      <section className="py-16 bg-card border-y border-border">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-gold/10">
                  <feature.icon className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services List - Alternating Layout */}
      <section className="py-24">
        <div className="container">
          <div className="space-y-24 lg:space-y-32">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`flex flex-col ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } items-center gap-12 lg:gap-20`}
              >
                {/* Image */}
                <div className="w-full lg:w-1/2">
                  <img
                    src={service.image}
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
                    {service.subtitle}
                  </p>
                  <p className="text-muted-foreground">
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
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
      <FAQ items={faqItems} subtitle="Get answers to common questions about our services." />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Services;
