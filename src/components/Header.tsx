import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import QuoteModal from "@/components/QuoteModal";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Fleet", href: "/fleet" },
  { label: "Services", href: "/services" },
  { label: "Events", href: "/events" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo - Left */}
          <Link to="/" className="flex items-center gap-2">
            <span className="font-serif text-2xl font-bold text-foreground">
              Bus<span className="text-gold">2</span>Ride
            </span>
          </Link>

          {/* Desktop Navigation + CTA - Right */}
          <div className="hidden lg:flex items-center gap-8">
            <nav className="flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`text-sm font-medium transition-colors ${
                    location.pathname === link.href
                      ? "text-gold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <a
                href="tel:888-535-2566"
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors border border-border px-4 py-2"
              >
                <Phone className="w-4 h-4" />
                888-535-2566
              </a>
              <QuoteModal>
                <Button variant="gold" size="default">
                  Get a Quote
                </Button>
              </QuoteModal>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-foreground"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`text-sm font-medium transition-colors ${
                    location.pathname === link.href
                      ? "text-gold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-border flex flex-col gap-3">
                <a
                  href="tel:888-535-2566"
                  className="flex items-center gap-2 text-sm font-medium text-muted-foreground"
                >
                  <Phone className="w-4 h-4" />
                  888-535-2566
                </a>
                <QuoteModal>
                  <Button variant="gold" className="w-full">
                    Get a Quote
                  </Button>
                </QuoteModal>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
