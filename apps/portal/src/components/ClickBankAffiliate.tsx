import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Star, TrendingUp } from "lucide-react";
import { usePageContent } from "@/hooks/usePageContent";

interface AffiliateProduct {
  id: string;
  title: string;
  description: string;
  commission: string;
  category: string;
  link: string;
  rating: number;
}

interface AffiliateContent {
  badge: string;
  title: string;
  highlighted: string;
  subtitle: string;
  items: any[];
}

const ClickBankAffiliate = () => {
  const { content, loading } = usePageContent<AffiliateContent>('home', 'affiliate');

  if (loading || !content) {
    return (
      <section className="py-20 lg:py-28 bg-muted/30">
        <div className="container text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
        </div>
      </section>
    );
  }

  const products = (content.items || []).map((p, idx) => ({
    id: String(idx),
    title: p.title || "Product Title",
    description: p.description || "Product description goes here.",
    commission: p.commission || "Up to 50%",
    category: p.category || "General",
    link: p.link || "#",
    rating: Number(p.rating) || 5
  }));

  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <span className="text-gold text-sm font-medium tracking-wider uppercase mb-4 block">
            {content.badge || "Recommended Resources"}
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            {content.title} <span className="text-gradient-gold">{content.highlighted}</span>
          </h2>
          <div className="section-divider mb-6 mx-auto" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {content.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
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
                  {product.commission && (
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <TrendingUp className="w-4 h-4 text-gold" />
                      <span>{product.commission} commission</span>
                    </div>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gold/30 text-gold hover:bg-gold/10 ml-auto"
                    asChild
                  >
                    <a href={product.link} target="_blank" rel="noopener noreferrer">
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
