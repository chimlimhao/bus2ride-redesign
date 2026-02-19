import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Index from "@/pages/Index";
import Fleet from "@/pages/Fleet";
import FleetDetail from "@/pages/FleetDetail";
import Services from "@/pages/Services";
import Events from "@/pages/Events";
import EventDetail from "@/pages/EventDetail";
import Pricing from "@/pages/Pricing";
import Contact from "@/pages/Contact";
import About from "@/pages/About";
import NotFound from "@/pages/NotFound";
import PageTransition from "./PageTransition";
import ScrollToTop from "./ScrollToTop";

// Admin imports
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminFleet from "@/pages/admin/AdminFleet";
import AdminEvents from "@/pages/admin/AdminEvents";
import AdminTestimonials from "@/pages/admin/AdminTestimonials";
import AdminFAQ from "@/pages/admin/AdminFAQ";
import AdminContent from "@/pages/admin/AdminContent";
import AdminMedia from "@/pages/admin/AdminMedia";
import AdminPricing from "@/pages/admin/AdminPricing";
import AdminInquiries from "@/pages/admin/AdminInquiries";
import AdminSettings from "@/pages/admin/AdminSettings";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Public routes */}
          <Route path="/" element={<PageTransition><Index /></PageTransition>} />
          <Route path="/fleet" element={<PageTransition><Fleet /></PageTransition>} />
          <Route path="/fleet/:id" element={<PageTransition><FleetDetail /></PageTransition>} />
          <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
          <Route path="/events" element={<PageTransition><Events /></PageTransition>} />
          <Route path="/events/:id" element={<PageTransition><EventDetail /></PageTransition>} />
          <Route path="/pricing" element={<PageTransition><Pricing /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
          <Route path="/about" element={<PageTransition><About /></PageTransition>} />

          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="fleet" element={<AdminFleet />} />
            <Route path="events" element={<AdminEvents />} />
            <Route path="testimonials" element={<AdminTestimonials />} />
            <Route path="faq" element={<AdminFAQ />} />
            <Route path="content" element={<AdminContent />} />
            <Route path="media" element={<AdminMedia />} />
            <Route path="pricing" element={<AdminPricing />} />
            <Route path="inquiries" element={<AdminInquiries />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default AnimatedRoutes;
