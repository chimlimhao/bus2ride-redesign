import { ReactNode } from "react";

interface PageHeroProps {
  title: string;
  highlightedWord: string;
  subtitle: string;
  backgroundImage?: string;
  children?: ReactNode;
}

const PageHero = ({ title, highlightedWord, subtitle, backgroundImage, children }: PageHeroProps) => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
      {/* Background Image with Overlay */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <img
            src={backgroundImage}
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/90 to-background" />
        </div>
      )}
      
      <div className="container relative z-10 px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            {title} <span className="text-gradient-gold">{highlightedWord}</span>
          </h1>
          <div className="section-divider mb-6" />
          <p className="text-lg text-muted-foreground">
            {subtitle}
          </p>
          {children}
        </div>
      </div>
    </section>
  );
};

export default PageHero;
