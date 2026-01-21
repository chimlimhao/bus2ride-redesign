import { useState } from "react";
import { X, Gift, Truck, Tag } from "lucide-react";

const TopBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gold text-gold-foreground relative z-50">
      <div className="container py-3">
        <div className="flex items-center justify-center gap-4 md:gap-8 text-sm md:text-base font-semibold">
          <a 
            href="#" 
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Gift className="w-4 h-4" />
            <span>🎉 Plan the Perfect Party!</span>
          </a>
          
          <span className="hidden md:inline text-gold-foreground/40">|</span>
          
          <a 
            href="#" 
            className="hidden md:flex items-center gap-2 hover:opacity-80 transition-opacity"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Tag className="w-4 h-4" />
            <span>📚 Get Event Planning Guide</span>
          </a>
          
          <span className="hidden lg:inline text-gold-foreground/40">|</span>
          
          <a 
            href="#" 
            className="hidden lg:flex items-center gap-2 hover:opacity-80 transition-opacity"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Truck className="w-4 h-4" />
            <span>🚌 Book Now & Save 10%</span>
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
