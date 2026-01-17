import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block mb-6">
              <span className="font-serif text-2xl font-bold text-foreground">
                Bus<span className="text-gold">2</span>Ride
              </span>
            </Link>
            <p className="text-muted-foreground text-sm mb-6">
              Premium group transportation for weddings, corporate events, parties, and more. Trusted by thousands.
            </p>
            <div className="space-y-3">
              <a
                href="tel:888-535-2566"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Phone className="w-4 h-4 text-gold" />
                888-535-2566
              </a>
              <a
                href="mailto:info@bus2ride.com"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="w-4 h-4 text-gold" />
                info@bus2ride.com
              </a>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-gold" />
                Nationwide Service
              </div>
            </div>
          </div>

          {/* Fleet */}
          <div>
            <h4 className="font-serif text-lg font-bold text-foreground mb-6">
              Our Fleet
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Party Buses", slug: "party-buses" },
                { label: "Limousines", slug: "limousines" },
                { label: "Coach Buses", slug: "coach-buses" },
                { label: "Sprinter Vans", slug: "sprinter-vans" },
                { label: "Executive Sedans", slug: "executive-sedans" },
              ].map((item) => (
                <li key={item.slug}>
                  <Link
                    to={`/fleet/${item.slug}`}
                    className="text-sm text-muted-foreground hover:text-gold transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Events */}
          <div>
            <h4 className="font-serif text-lg font-bold text-foreground mb-6">
              Events
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Weddings", slug: "weddings" },
                { label: "Prom & School", slug: "prom" },
                { label: "Corporate", slug: "corporate" },
                { label: "Bachelor/Bachelorette", slug: "bachelor-bachelorette" },
                { label: "Concerts & Festivals", slug: "concerts" },
              ].map((item) => (
                <li key={item.slug}>
                  <Link
                    to={`/events/${item.slug}`}
                    className="text-sm text-muted-foreground hover:text-gold transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-serif text-lg font-bold text-foreground mb-6">
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className="text-sm text-muted-foreground hover:text-gold transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="text-sm text-muted-foreground hover:text-gold transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-sm text-muted-foreground hover:text-gold transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-muted-foreground hover:text-gold transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 Bus2Ride. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
