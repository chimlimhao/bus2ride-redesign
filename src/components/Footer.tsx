import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <a href="#" className="inline-block mb-6">
              <span className="font-serif text-2xl font-bold text-foreground">
                Bus<span className="text-primary">2</span>Ride
              </span>
            </a>
            <p className="text-muted-foreground text-sm mb-6">
              Premium group transportation for weddings, corporate events, parties, and more. Trusted by thousands.
            </p>
            <div className="space-y-3">
              <a
                href="tel:888-535-2566"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Phone className="w-4 h-4" />
                888-535-2566
              </a>
              <a
                href="mailto:info@bus2ride.com"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="w-4 h-4" />
                info@bus2ride.com
              </a>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
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
              {["Party Buses", "Limousines", "Coach Buses", "Sprinter Vans", "Luxury Sedans"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Events */}
          <div>
            <h4 className="font-serif text-lg font-bold text-foreground mb-6">
              Events
            </h4>
            <ul className="space-y-3">
              {[
                "Weddings",
                "Prom & School",
                "Corporate",
                "Bachelor/Bachelorette",
                "Airport Transfers",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item}
                  </a>
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
              {["About Us", "Pricing", "Locations", "Blog", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
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
