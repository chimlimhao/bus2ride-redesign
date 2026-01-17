import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import PageHero from "@/components/PageHero";
import FAQ from "@/components/FAQ";
import Testimonials from "@/components/Testimonials";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const eventCategories = [
  { id: "all", label: "Browse All", count: 24 },
  { id: "celebrations", label: "Celebrations", count: 6 },
  { id: "parties", label: "Parties", count: 7 },
  { id: "school", label: "School Events", count: 5 },
  { id: "nightlife", label: "Nightlife", count: 5 },
  { id: "corporate", label: "Corporate", count: 5 },
  { id: "sports", label: "Sports & Games", count: 8 },
];

const events = [
  {
    id: "weddings",
    title: "Weddings",
    category: "celebrations",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800",
    description: "Elegant transportation for your special day.",
  },
  {
    id: "bachelor-bachelorette",
    title: "Bachelor & Bachelorette",
    category: "parties",
    image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=800",
    description: "Party buses and limos for your celebration.",
  },
  {
    id: "prom",
    title: "Prom & Homecoming",
    category: "school",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800",
    description: "Safe, stylish student transportation.",
  },
  {
    id: "corporate",
    title: "Corporate Events",
    category: "corporate",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800",
    description: "Professional transportation for business.",
  },
  {
    id: "birthday-parties",
    title: "Birthday Parties",
    category: "parties",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=800",
    description: "Make their special day unforgettable.",
  },
  {
    id: "graduations",
    title: "Graduations",
    category: "school",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800",
    description: "Celebrate academic achievements in style.",
  },
  {
    id: "sports-games",
    title: "Game Day",
    category: "sports",
    image: "https://images.unsplash.com/photo-1471295253337-3ceaaedca402?q=80&w=800",
    description: "Tailgate and game day transportation.",
  },
  {
    id: "concerts",
    title: "Concerts & Festivals",
    category: "nightlife",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=800",
    description: "Ride to your favorite live events.",
  },
  {
    id: "new-years-eve",
    title: "New Year's Eve",
    category: "celebrations",
    image: "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?q=80&w=800",
    description: "Ring in the new year safely.",
  },
  {
    id: "nightclub-crawls",
    title: "Nightclub Crawls",
    category: "nightlife",
    image: "https://images.unsplash.com/photo-1571204829887-3b8d69e4094d?q=80&w=800",
    description: "VIP nightlife experiences.",
  },
  {
    id: "destination-weekends",
    title: "Destination Weekends",
    category: "parties",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800",
    description: "Weekend getaway transportation.",
  },
  {
    id: "company-parties",
    title: "Company Parties",
    category: "corporate",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800",
    description: "Holiday and team celebration transportation.",
  },
];

const faqItems = [
  {
    question: "How many passengers can you accommodate?",
    answer: "We can accommodate groups from 4 to 56 passengers in a single vehicle, and can coordinate multiple vehicles for larger events. Our fleet includes sedans, SUVs, limousines, party buses, and coach buses.",
  },
  {
    question: "Do you provide decorations for special events?",
    answer: "Yes! For weddings, we offer 'Just Married' signs and can accommodate decorations. For proms and birthdays, we can add balloons and banners. Let us know your preferences when booking.",
  },
  {
    question: "What about alcohol on the vehicles?",
    answer: "Adults 21+ may bring their own alcohol on party buses and limousines. We provide ice, cups, and glassware. We never serve alcohol to minors under any circumstances.",
  },
  {
    question: "Can you handle multiple pickup locations?",
    answer: "Absolutely! We regularly coordinate pickups from multiple locations for weddings, proms, and group events. We'll work with you to plan the most efficient route.",
  },
  {
    question: "What safety measures do you have in place?",
    answer: "All our drivers are licensed, background-checked, and drug-tested. Vehicles are inspected regularly and meet all safety requirements. We carry full commercial insurance for your protection.",
  },
];

const Events = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageHero
        title="Events We"
        highlightedWord="Serve"
        subtitle="From intimate gatherings to large corporate events, we provide premium transportation tailored to your occasion."
        backgroundImage="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2048"
      />

      {/* Category Filters */}
      <section className="py-8 border-b border-border">
        <div className="container px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {eventCategories.map((cat) => (
              <button
                key={cat.id}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  cat.id === "all"
                    ? "bg-gold text-gold-foreground"
                    : "bg-card border border-border text-muted-foreground hover:border-gold/50 hover:text-foreground"
                }`}
              >
                {cat.label} <span className="opacity-60">{cat.count}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-20">
        <div className="container px-4">
          <p className="text-muted-foreground mb-8">Showing all {events.length} event guides</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div
                key={event.id}
                className="group card-luxury overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                  
                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="badge-gold text-xs">EVENT</span>
                  </div>
                  
                  {/* Title on image */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-serif text-xl font-bold text-foreground">
                      {event.title}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-muted-foreground text-sm mb-4">
                    {event.description}
                  </p>
                  <div className="flex gap-3">
                    <Button variant="gold" size="sm" className="flex-1" asChild>
                      <Link to={`/events/${event.id}`}>
                        Learn More
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm">
                      <Phone className="w-4 h-4" />
                      Call
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      <FAQ items={faqItems} subtitle="Get answers to common questions about event transportation." />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Events;
