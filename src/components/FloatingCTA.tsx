import { useState, useEffect } from "react";
import { Phone, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import QuoteModal from "@/components/QuoteModal";
import { motion, AnimatePresence } from "framer-motion";

const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-6 right-6 z-50 flex flex-col gap-3"
        >
          <a
            href="tel:888-535-2566"
            className="flex items-center justify-center gap-2 bg-background/95 backdrop-blur-md border border-border px-4 py-3 text-sm font-medium text-foreground hover:bg-card transition-colors shadow-lg"
          >
            <Phone className="w-4 h-4 text-gold" />
            <span className="hidden sm:inline">888-535-2566</span>
          </a>
          <QuoteModal>
            <Button variant="gold" size="lg" className="shadow-lg">
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Get a Quote</span>
            </Button>
          </QuoteModal>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingCTA;
