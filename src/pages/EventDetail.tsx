import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import FAQ from "@/components/FAQ";
import Testimonials from "@/components/Testimonials";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Users, Phone } from "lucide-react";

const eventData: Record<string, {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  features: string[];
  popularVehicles: { title: string; passengers: string; id: string }[];
  tips: string[];
}> = {
  "weddings": {
    title: "Wedding Transportation",
    subtitle: "Make your special day unforgettable",
    description: "Your wedding day deserves nothing but the best. Our elegant fleet ensures you and your wedding party travel in comfort and luxury, creating memories that last a lifetime.",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200",
    features: [
      "Bride & Groom Transportation",
      "Wedding Party Shuttles",
      "Guest Transportation",
      "Red Carpet Service",
      "Just Married Decorations",
      "Champagne Toast Ready",
      "Multiple Vehicle Coordination",
      "Day-of Coordinator Communication",
    ],
    popularVehicles: [
      { title: "Stretch Limousine", passengers: "6-18", id: "limousines" },
      { title: "Party Bus", passengers: "20-50", id: "party-buses" },
      { title: "Coach Bus", passengers: "40-56", id: "coach-buses" },
    ],
    tips: [
      "Book 2-3 months in advance for peak wedding season",
      "Coordinate pickup times with your photographer",
      "Consider a party bus for the bridal party",
      "Ask about 'Just Married' decorations",
    ],
  },
  "bachelor-bachelorette": {
    title: "Bachelor & Bachelorette Parties",
    subtitle: "Celebrate in style with your crew",
    description: "Send off the bride or groom with an unforgettable celebration. Our party buses are equipped with premium sound systems, LED lighting, and everything you need for the ultimate party on wheels.",
    image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=1200",
    features: [
      "Party Bus with Dance Floor",
      "Premium Sound System",
      "LED Lighting & Lasers",
      "Multiple Destination Stops",
      "Flexible Itineraries",
      "BYOB Friendly (21+)",
      "Ice & Cups Provided",
      "VIP Nightclub Access (select cities)",
    ],
    popularVehicles: [
      { title: "Party Bus", passengers: "20-50", id: "party-buses" },
      { title: "SUV Limousine", passengers: "8-14", id: "suv-limos" },
      { title: "Stretch Limousine", passengers: "6-18", id: "limousines" },
    ],
    tips: [
      "Plan your route in advance for multiple stops",
      "Designate someone to coordinate with the driver",
      "Check venue parking for large vehicles",
      "Book early for weekend availability",
    ],
  },
  "prom": {
    title: "Prom & Homecoming",
    subtitle: "Safe, stylish student transportation",
    description: "Give students a memorable night with safe and stylish transportation. Parents trust us for responsible service, and students love arriving in style.",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200",
    features: [
      "Trained Professional Chauffeurs",
      "Parent Communication",
      "On-Time Guarantee",
      "Photo Opportunities",
      "Safe Transportation",
      "Group Discounts Available",
      "No Alcohol Policy Strictly Enforced",
      "GPS Tracking for Parents",
    ],
    popularVehicles: [
      { title: "Stretch Limousine", passengers: "6-18", id: "limousines" },
      { title: "Party Bus", passengers: "20-50", id: "party-buses" },
      { title: "SUV Limousine", passengers: "8-14", id: "suv-limos" },
    ],
    tips: [
      "Book 4-6 weeks in advance - prom dates fill fast!",
      "Coordinate photo location and timing",
      "Share parent contact info with us",
      "Plan the route to avoid delays",
    ],
  },
  "corporate": {
    title: "Corporate Event Transportation",
    subtitle: "Professional solutions for business",
    description: "Impress clients and keep your team moving efficiently. From executive airport transfers to conference shuttles, we handle all your corporate transportation needs with professionalism.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200",
    features: [
      "Executive Airport Transfers",
      "Conference & Convention Shuttles",
      "Team Building Outings",
      "Client Entertainment",
      "Roadshow Services",
      "Corporate Accounts Available",
      "Dedicated Account Manager",
      "Consolidated Billing",
    ],
    popularVehicles: [
      { title: "Executive Sedan", passengers: "3-4", id: "executive-sedans" },
      { title: "Sprinter Van", passengers: "10-16", id: "sprinter-vans" },
      { title: "Coach Bus", passengers: "40-56", id: "coach-buses" },
    ],
    tips: [
      "Set up a corporate account for volume discounts",
      "Provide detailed schedules for multi-stop events",
      "Book executives well in advance",
      "Ask about on-site coordinators for large events",
    ],
  },
  "sports-games": {
    title: "Game Day Transportation",
    subtitle: "Tailgate and cheer in style",
    description: "Don't worry about parking or designated drivers. Our group transportation gets you to the game safely and comfortably, with plenty of room for tailgating gear.",
    image: "https://images.unsplash.com/photo-1471295253337-3ceaaedca402?q=80&w=1200",
    features: [
      "Stadium Drop-off & Pickup",
      "Tailgate Transportation",
      "Cooler Storage Available",
      "Multiple Game Packages",
      "Season Ticket Holder Discounts",
      "Post-Game Bar Hopping",
      "TV for Pre-Game Entertainment",
      "Group Rates Available",
    ],
    popularVehicles: [
      { title: "Party Bus", passengers: "20-50", id: "party-buses" },
      { title: "Sprinter Van", passengers: "10-16", id: "sprinter-vans" },
      { title: "Coach Bus", passengers: "40-56", id: "coach-buses" },
    ],
    tips: [
      "Book early for playoff games",
      "Confirm pickup location after the game",
      "Allow extra time for stadium traffic",
      "Bring your tailgate supplies onboard",
    ],
  },
  "concerts": {
    title: "Concert & Festival Transportation",
    subtitle: "Ride to your favorite live events",
    description: "Skip the parking hassles and enjoy the show. We'll get you there and back safely, so you can focus on the music.",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1200",
    features: [
      "Venue Drop-off & Pickup",
      "Pre-Show Party on the Bus",
      "Post-Concert Transportation",
      "Festival Shuttle Services",
      "Multiple Stop Coordination",
      "Late Night Availability",
      "Sound System for Pre-Gaming",
      "Cooler Storage",
    ],
    popularVehicles: [
      { title: "Party Bus", passengers: "20-50", id: "party-buses" },
      { title: "Sprinter Van", passengers: "10-16", id: "sprinter-vans" },
      { title: "SUV Limousine", passengers: "8-14", id: "suv-limos" },
    ],
    tips: [
      "Confirm set times to plan pickup",
      "Designate a meeting spot after the show",
      "Book extra time for traffic",
      "Pre-party on the ride there!",
    ],
  },
};

const defaultFaqItems = [
  {
    question: "How far in advance should I book?",
    answer: "We recommend booking 2-4 weeks in advance for standard events, and 2-3 months for peak season events.",
  },
  {
    question: "What is included in the rental?",
    answer: "All rentals include a professional chauffeur, fuel, standard gratuity, ice, cups, and bottled water.",
  },
  {
    question: "Can you accommodate multiple pickup locations?",
    answer: "Yes! We regularly coordinate pickups from multiple locations. We'll work with you to plan the most efficient route.",
  },
  {
    question: "What is your cancellation policy?",
    answer: "Cancellations made 7+ days before receive a full refund. Cancellations within 7 days may incur charges.",
  },
];

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const event = id ? eventData[id] : null;

  if (!event) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-32 text-center">
          <h1 className="font-serif text-4xl font-bold text-foreground mb-4">Event Not Found</h1>
          <p className="text-muted-foreground mb-8">The event you're looking for doesn't exist.</p>
          <Button variant="gold" asChild>
            <Link to="/events">View All Events</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageHero
        title={event.title.split(" ")[0]}
        highlightedWord={event.title.split(" ").slice(1).join(" ")}
        subtitle={event.description}
        backgroundImage={event.image}
      >
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="gold" size="lg">
            Get a Quote
            <ArrowRight className="w-4 h-4" />
          </Button>
          <a href="tel:888-535-2566">
            <Button variant="outline" size="lg">
              <Phone className="w-4 h-4" />
              Call (888) 535-2566
            </Button>
          </a>
        </div>
      </PageHero>

      {/* Features Section */}
      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
                What We <span className="text-gradient-gold">Offer</span>
              </h2>
              <ul className="space-y-4">
                {event.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-muted-foreground">
                    <Check className="w-5 h-5 text-gold flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-auto object-cover aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Popular Vehicles */}
      <section className="py-20 bg-card">
        <div className="container">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
            Popular Vehicles for <span className="text-gradient-gold">{event.title}</span>
          </h2>
          <div className="section-divider mb-12" />

          <div className="grid md:grid-cols-3 gap-6">
            {event.popularVehicles.map((vehicle) => (
              <Link
                key={vehicle.id}
                to={`/fleet/${vehicle.id}`}
                className="card-luxury p-6 hover:border-gold/30 transition-colors group"
              >
                <h3 className="font-serif text-xl font-bold text-foreground mb-2 group-hover:text-gold transition-colors">
                  {vehicle.title}
                </h3>
                <div className="flex items-center gap-2 text-gold text-sm mb-4">
                  <Users className="w-4 h-4" />
                  {vehicle.passengers} passengers
                </div>
                <div className="flex items-center gap-2 text-muted-foreground text-sm group-hover:text-gold group-hover:gap-3 transition-all">
                  View Details
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-20">
        <div className="container">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
            Planning <span className="text-gradient-gold">Tips</span>
          </h2>
          <div className="section-divider mb-12" />

          <div className="max-w-2xl mx-auto">
            <ul className="space-y-4">
              {event.tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-gold text-gold-foreground flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-muted-foreground">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Testimonials />
      <FAQ items={defaultFaqItems} subtitle={`Common questions about ${event.title.toLowerCase()}.`} />
      <CTASection />
      <Footer />
    </div>
  );
};

export default EventDetail;
