import { useState } from "react";
import { X, Tag } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { usePageContent } from "@/hooks/usePageContent";

interface BannerItem {
  icon: string;
  text: string;
  link: string;
}

interface BannerContent {
  active: boolean;
  items: BannerItem[];
}

const TopBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const { content, loading } = usePageContent<BannerContent>('home', 'top-banner');

  if (!isVisible || loading || !content?.active) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 bg-gold text-gold-foreground"
      role="region"
      aria-label="Promotions"
    >
      <div className="container h-10 md:h-12">
        <div className="flex h-full items-center justify-center gap-4 md:gap-8 text-sm md:text-base font-semibold">
          {(content.items || []).map((item, index) => {
            const Icon = (item.icon && (LucideIcons as any)[item.icon])
              ? (LucideIcons as any)[item.icon]
              : Tag;

            return (
              <div key={index} className="flex items-center gap-4 md:gap-8">
                <a
                  href={item.link}
                  className={`flex items-center gap-2 hover:opacity-80 transition-opacity ${index > 0 ? 'hidden md:flex' : ''} ${index > 1 ? 'hidden lg:flex' : ''}`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.text}</span>
                </a>
                {index < content.items.length - 1 && (
                  <span className={`text-gold-foreground/40 ${index === 0 ? 'hidden md:inline' : 'hidden lg:inline'}`}>|</span>
                )}
              </div>
            );
          })}
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
