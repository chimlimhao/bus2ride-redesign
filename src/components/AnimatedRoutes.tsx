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

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/fleet" element={<PageTransition><Fleet /></PageTransition>} />
        <Route path="/fleet/:id" element={<PageTransition><FleetDetail /></PageTransition>} />
        <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
        <Route path="/events" element={<PageTransition><Events /></PageTransition>} />
        <Route path="/events/:id" element={<PageTransition><EventDetail /></PageTransition>} />
        <Route path="/pricing" element={<PageTransition><Pricing /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
