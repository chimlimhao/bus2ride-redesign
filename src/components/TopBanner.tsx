import { useState } from "react";
import { X, Gift, Truck, Tag } from "lucide-react";

const TopBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 bg-gold text-gold-foreground"
      role="region"
      aria-label="Promotions"
    >
      <div className="container h-10 md:h-12">
        <div className="flex h-full items-center justify-center gap-4 md:gap-8 text-sm md:text-base font-semibold">
          <a 
            href="/fleet" 
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Truck className="w-4 h-4" />
            <span>🚌 Free Quote on Party Buses</span>
          </a>
          
          <span className="hidden md:inline text-gold-foreground/40">|</span>
          
          <a 
            href="/services" 
            className="hidden md:flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Gift className="w-4 h-4" />
            <span>🎉 15% OFF Wedding Packages</span>
          </a>
          
          <span className="hidden lg:inline text-gold-foreground/40">|</span>
          
          <a 
            href="/contact" 
            className="hidden lg:flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Tag className="w-4 h-4" />
            <span>✨ Book Today & Get VIP Treatment</span>
          </a>
        </div>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-gold-foreground/70 hover:text-gold-foreground transition-colors"
        aria-label="Close banner"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};

export default TopBanner;
