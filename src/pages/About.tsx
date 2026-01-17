import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import { Shield, Award, Clock, Users, CheckCircle } from "lucide-react";

const stats = [
  { value: "15+", label: "Years of Experience" },
  { value: "50K+", label: "Happy Customers" },
  { value: "98%", label: "On-Time Rate" },
  { value: "500+", label: "Vehicles Nationwide" },
];

const values = [
  {
    icon: Shield,
    title: "Safety First",
    description: "All our vehicles undergo rigorous safety inspections and our drivers are fully licensed, insured, and background-checked.",
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "We maintain the highest standards for our fleet, ensuring every vehicle is immaculate and equipped with luxury amenities.",
  },
  {
    icon: Clock,
    title: "Punctuality",
    description: "With a 98% on-time rate, you can trust us to get you where you need to be, exactly when you need to be there.",
  },
  {
    icon: Users,
    title: "Customer Focus",
    description: "Your satisfaction is our priority. Our team goes above and beyond to make every journey memorable.",
  },
];

const milestones = [
  { year: "2008", event: "Bus2Ride founded with a single party bus" },
  { year: "2012", event: "Expanded fleet to include luxury limousines" },
  { year: "2015", event: "Launched nationwide service coverage" },
  { year: "2018", event: "Reached 25,000 satisfied customers" },
  { year: "2021", event: "Introduced eco-friendly vehicle options" },
  { year: "2024", event: "Serving over 50,000 happy customers" },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageHero
        title="About"
        highlightedWord="Bus2Ride"
        subtitle="Premium group transportation trusted by thousands since 2008."
        backgroundImage="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069"
      />

      {/* Our Story */}
      <section className="py-24 lg:py-32">
        <div className="container px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-gold font-semibold tracking-wider uppercase text-sm">
                Our Story
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6">
                Redefining <span className="text-gradient-gold">Luxury Transportation</span>
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded in 2008, Bus2Ride began with a simple vision: to provide exceptional group transportation that combines luxury, reliability, and outstanding service.
                </p>
                <p>
                  What started as a single party bus operation has grown into a nationwide network of premium vehicles, serving everything from intimate wedding parties to large corporate events.
                </p>
                <p>
                  Today, we're proud to have transported over 50,000 satisfied customers across all 50 states, maintaining a 98% on-time rate and earning countless five-star reviews along the way.
                </p>
              </div>
            </div>

            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?q=80&w=2070"
                alt="Luxury fleet"
                className="rounded-2xl w-full object-cover aspect-[4/3]"
              />
              <div className="absolute -bottom-8 -left-8 bg-gold text-gold-foreground p-6 rounded-xl">
                <div className="text-4xl font-bold">15+</div>
                <div className="text-sm">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-card">
        <div className="container px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-gold mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24 lg:py-32">
        <div className="container px-4">
          <div className="text-center mb-16">
            <span className="text-gold font-semibold tracking-wider uppercase text-sm">
              Our Values
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-4">
              What Sets Us <span className="text-gradient-gold">Apart</span>
            </h2>
            <div className="section-divider mb-6" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="card-luxury p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-gold" />
                </div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 lg:py-32 bg-card">
        <div className="container px-4">
          <div className="text-center mb-16">
            <span className="text-gold font-semibold tracking-wider uppercase text-sm">
              Our Journey
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-4">
              Company <span className="text-gradient-gold">Milestones</span>
            </h2>
            <div className="section-divider mb-6" />
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex gap-6 items-start">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-gold/10 border-2 border-gold flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-gold" />
                    </div>
                    {index < milestones.length - 1 && (
                      <div className="w-0.5 h-16 bg-border mt-2" />
                    )}
                  </div>
                  <div className="pt-2">
                    <div className="text-gold font-bold text-lg">{milestone.year}</div>
                    <div className="text-foreground">{milestone.event}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Testimonials />
      <CTASection />
      <Footer />
    </div>
  );
};

export default About;
