import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Star, TrendingUp } from "lucide-react";

interface AffiliateProduct {
  id: string;
  title: string;
  description: string;
  commission: string;
  category: string;
  affiliateLink: string;
  rating: number;
}

const affiliateProducts: AffiliateProduct[] = [
  {
    id: "1",
    title: "Ultimate Road Trip Planner",
    description: "Complete guide to planning unforgettable group road trips with itineraries, budgeting tips, and hidden gems.",
    commission: "75%",
    category: "Travel Guides",
    affiliateLink: "#", // Replace with your ClickBank affiliate link
    rating: 4.8,
  },
  {
    id: "2",
    title: "Event Planning Masterclass",
    description: "Professional event planning course covering everything from corporate events to destination weddings.",
    commission: "50%",
    category: "Events",
    affiliateLink: "#", // Replace with your ClickBank affiliate link
    rating: 4.9,
  },
  {
    id: "3",
    title: "Party on Wheels Guide",
    description: "Expert tips for hosting unforgettable mobile celebrations, from bachelor parties to birthday bashes.",
    commission: "60%",
    category: "Entertainment",
    affiliateLink: "#", // Replace with your ClickBank affiliate link
    rating: 4.7,
  },
];

const ClickBankAffiliate = () => {
  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <span className="text-gold text-sm font-medium tracking-wider uppercase mb-4 block">
            Recommended Resources
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Enhance Your <span className="text-gradient-gold">Travel Experience</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover handpicked guides and resources to help you plan the perfect group trip or celebration.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {affiliateProducts.map((product) => (
            <Card key={product.id} className="bg-card border-border/50 hover:border-gold/30 transition-all duration-300 hover:shadow-lg hover:shadow-gold/5">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gold bg-gold/10 px-2 py-1 rounded-full">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1 text-gold">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium">{product.rating}</span>
                  </div>
                </div>
                <CardTitle className="text-lg text-foreground">{product.title}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {product.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <TrendingUp className="w-4 h-4 text-gold" />
                    <span>{product.commission} commission</span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-gold/30 text-gold hover:bg-gold/10"
                    asChild
                  >
                    <a href={product.affiliateLink} target="_blank" rel="noopener noreferrer">
                      Learn More
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8">
          <em>Affiliate Disclosure: We may earn a commission from qualifying purchases at no extra cost to you.</em>
        </p>
      </div>
    </section>
  );
};

export default ClickBankAffiliate;
