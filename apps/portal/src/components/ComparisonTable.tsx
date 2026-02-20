import { Check, X, Minus } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

type FeatureValue = boolean | string | "partial";

interface VehicleCategory {
  name: string;
  priceRange: string;
  passengers: string;
}

interface ComparisonFeature {
  name: string;
  category: string;
  values: Record<string, FeatureValue>;
}

const vehicleCategories: VehicleCategory[] = [
  { name: "Sedan", priceRange: "$75-150/hr", passengers: "3-4" },
  { name: "SUV Limo", priceRange: "$125-200/hr", passengers: "6-14" },
  { name: "Stretch Limo", priceRange: "$150-300/hr", passengers: "6-18" },
  { name: "Party Bus", priceRange: "$200-500/hr", passengers: "20-50" },
  { name: "Coach Bus", priceRange: "$150-400/hr", passengers: "36-56" },
  { name: "Sprinter Van", priceRange: "$100-175/hr", passengers: "10-16" },
];

const comparisonFeatures: ComparisonFeature[] = [
  // Amenities
  { name: "Professional Chauffeur", category: "Service", values: { Sedan: true, "SUV Limo": true, "Stretch Limo": true, "Party Bus": true, "Coach Bus": true, "Sprinter Van": true } },
  { name: "Leather Interior", category: "Comfort", values: { Sedan: true, "SUV Limo": true, "Stretch Limo": true, "Party Bus": true, "Coach Bus": "partial", "Sprinter Van": true } },
  { name: "Climate Control", category: "Comfort", values: { Sedan: true, "SUV Limo": true, "Stretch Limo": true, "Party Bus": true, "Coach Bus": true, "Sprinter Van": true } },
  { name: "Premium Sound System", category: "Entertainment", values: { Sedan: "partial", "SUV Limo": true, "Stretch Limo": true, "Party Bus": true, "Coach Bus": "partial", "Sprinter Van": true } },
  { name: "LED/Fiber Optic Lighting", category: "Entertainment", values: { Sedan: false, "SUV Limo": true, "Stretch Limo": true, "Party Bus": true, "Coach Bus": false, "Sprinter Van": "partial" } },
  { name: "TV Screens", category: "Entertainment", values: { Sedan: false, "SUV Limo": "partial", "Stretch Limo": true, "Party Bus": true, "Coach Bus": true, "Sprinter Van": true } },
  { name: "Mini Bar Area", category: "Entertainment", values: { Sedan: false, "SUV Limo": true, "Stretch Limo": true, "Party Bus": true, "Coach Bus": false, "Sprinter Van": "partial" } },
  { name: "Dance Floor/Pole", category: "Entertainment", values: { Sedan: false, "SUV Limo": false, "Stretch Limo": false, "Party Bus": true, "Coach Bus": false, "Sprinter Van": false } },
  { name: "On-board Restroom", category: "Convenience", values: { Sedan: false, "SUV Limo": false, "Stretch Limo": false, "Party Bus": true, "Coach Bus": true, "Sprinter Van": false } },
  { name: "WiFi Available", category: "Convenience", values: { Sedan: true, "SUV Limo": true, "Stretch Limo": "partial", "Party Bus": true, "Coach Bus": true, "Sprinter Van": true } },
  { name: "USB/Power Outlets", category: "Convenience", values: { Sedan: true, "SUV Limo": true, "Stretch Limo": true, "Party Bus": true, "Coach Bus": true, "Sprinter Van": true } },
  { name: "Luggage Space", category: "Convenience", values: { Sedan: "partial", "SUV Limo": "partial", "Stretch Limo": "partial", "Party Bus": true, "Coach Bus": true, "Sprinter Van": true } },
  { name: "Red Carpet Service", category: "Service", values: { Sedan: "partial", "SUV Limo": true, "Stretch Limo": true, "Party Bus": true, "Coach Bus": false, "Sprinter Van": false } },
  { name: "Flight Tracking", category: "Service", values: { Sedan: true, "SUV Limo": true, "Stretch Limo": true, "Party Bus": true, "Coach Bus": true, "Sprinter Van": true } },
];

const FeatureCell = ({ value }: { value: FeatureValue }) => {
  if (value === true) {
    return <Check className="w-5 h-5 text-green-500 mx-auto" />;
  }
  if (value === false) {
    return <X className="w-5 h-5 text-muted-foreground/40 mx-auto" />;
  }
  if (value === "partial") {
    return <Minus className="w-5 h-5 text-gold mx-auto" />;
  }
  return <span className="text-sm text-muted-foreground">{value}</span>;
};

const ComparisonTable = () => {
  // Group features by category
  const categories = [...new Set(comparisonFeatures.map(f => f.category))];

  return (
    <section className="py-24 lg:py-32 bg-card">
      <div className="container">
        <AnimatedSection>
          <div className="text-center mb-16">
            <span className="text-gold font-semibold tracking-wider uppercase text-sm">
              Compare Options
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-4">
              Vehicle <span className="text-gradient-gold">Comparison</span>
            </h2>
            <div className="section-divider mb-6" />
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find the perfect vehicle for your needs with our detailed feature comparison.
            </p>
          </div>
        </AnimatedSection>

        {/* Legend */}
        <AnimatedSection delay={0.1}>
          <div className="flex flex-wrap items-center justify-center gap-6 mb-8 text-sm">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span className="text-muted-foreground">Included</span>
            </div>
            <div className="flex items-center gap-2">
              <Minus className="w-4 h-4 text-gold" />
              <span className="text-muted-foreground">Available on select models</span>
            </div>
            <div className="flex items-center gap-2">
              <X className="w-4 h-4 text-muted-foreground/40" />
              <span className="text-muted-foreground">Not available</span>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[900px]">
              {/* Header */}
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 font-medium text-muted-foreground w-48">
                    Features
                  </th>
                  {vehicleCategories.map((vehicle) => (
                    <th key={vehicle.name} className="text-center py-4 px-3 min-w-[120px]">
                      <div className="font-serif font-bold text-foreground text-lg">
                        {vehicle.name}
                      </div>
                      <div className="text-gold text-sm font-medium mt-1">
                        {vehicle.priceRange}
                      </div>
                      <div className="text-muted-foreground text-xs mt-1">
                        {vehicle.passengers} passengers
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Body - Grouped by Category */}
              <tbody>
                {categories.map((category) => (
                  <>
                    {/* Category Header */}
                    <tr key={`cat-${category}`} className="bg-background/50">
                      <td 
                        colSpan={vehicleCategories.length + 1} 
                        className="py-3 px-4 font-semibold text-gold uppercase text-xs tracking-wider"
                      >
                        {category}
                      </td>
                    </tr>
                    {/* Features in Category */}
                    {comparisonFeatures
                      .filter(f => f.category === category)
                      .map((feature, idx) => (
                        <tr 
                          key={feature.name} 
                          className={`border-b border-border/50 hover:bg-background/30 transition-colors ${
                            idx % 2 === 0 ? "" : "bg-background/20"
                          }`}
                        >
                          <td className="py-3 px-4 text-sm text-foreground">
                            {feature.name}
                          </td>
                          {vehicleCategories.map((vehicle) => (
                            <td key={vehicle.name} className="py-3 px-3 text-center">
                              <FeatureCell value={feature.values[vehicle.name]} />
                            </td>
                          ))}
                        </tr>
                      ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </AnimatedSection>

        {/* Mobile Note */}
        <p className="text-center text-muted-foreground text-sm mt-6 lg:hidden">
          ← Scroll horizontally to see all vehicles →
        </p>
      </div>
    </section>
  );
};

export default ComparisonTable;
