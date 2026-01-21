import { useState } from "react";
import { X, ExternalLink, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BannerAd {
  id: string;
  text: string;
  highlight: string;
  ctaText: string;
  link: string;
}

const bannerAds: BannerAd[] = [
  {
    id: "1",
    text: "🎉 Plan the Perfect Party!",
    highlight: "Get the Ultimate Event Planning Guide",
    ctaText: "Learn More",
    link: "#", // Replace with your ClickBank affiliate link
  },
];

const TopBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentAd] = useState(bannerAds[0]);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-gold/20 via-gold/10 to-gold/20 border-b border-gold/30 relative">
      <div className="container py-2.5">
        <div className="flex items-center justify-center gap-3 text-sm">
          <Sparkles className="w-4 h-4 text-gold hidden sm:block" />
          <span className="text-foreground/80">{currentAd.text}</span>
          <span className="font-semibold text-gold hidden sm:inline">
            {currentAd.highlight}
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-3 text-xs font-medium text-gold hover:text-gold hover:bg-gold/10 border border-gold/30"
            asChild
          >
            <a href={currentAd.link} target="_blank" rel="noopener noreferrer">
              {currentAd.ctaText}
              <ExternalLink className="w-3 h-3 ml-1" />
            </a>
          </Button>
        </div>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Close banner"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default TopBanner;
