import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FleetCards from "@/components/FleetCards";
import HowItWorks from "@/components/HowItWorks";
import EventCards from "@/components/EventCards";
import Testimonials from "@/components/Testimonials";
import ClickBankAffiliate from "@/components/ClickBankAffiliate";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <FleetCards />
      <HowItWorks />
      <EventCards />
      <Testimonials />
      <ClickBankAffiliate />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
