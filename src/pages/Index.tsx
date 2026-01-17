import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FleetSection from "@/components/FleetSection";
import HowItWorks from "@/components/HowItWorks";
import EventsSection from "@/components/EventsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <FleetSection />
      <HowItWorks />
      <EventsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
