import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";

import { useState, useEffect } from "react";
import { supabase } from "@bus2ride/shared/supabase";
import type { Tables } from "@bus2ride/shared/supabase/types";
import { usePageContent } from "@/hooks/usePageContent";

type Testimonial = Tables<"testimonials">;

interface TestimonialHeaderContent {
  badge: string;
  title: string;
  highlighted: string;
  subtitle: string;
}

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const { content, loading: contentLoading } = usePageContent<TestimonialHeaderContent>('home', 'testimonials');

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const { data, error } = await supabase
          .from("testimonials")
          .select("*")
          .eq("status", "Published")
          .order("sort_order", { ascending: true });

        if (error) throw error;
        setTestimonials(data || []);
      } catch (err) {
        console.error("Error fetching testimonials:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchTestimonials();
  }, []);

  if (loading || contentLoading) {
    return (
      <section className="py-24 lg:py-32 bg-card overflow-hidden">
        <div className="container text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
        </div>
      </section>
    );
  }

  // Transform data to match TestimonialsColumn expected shape
  const mappedTestimonials = testimonials.map(t => ({
    text: t.content,
    image: t.avatar_url || "https://randomuser.me/api/portraits/lego/1.jpg",
    name: t.name,
    role: t.role || "Satisfied Client",
    rating: t.rating || 5
  }));

  const firstColumn = mappedTestimonials.slice(0, 3);
  const secondColumn = mappedTestimonials.slice(3, 6);
  const thirdColumn = mappedTestimonials.slice(6, 9);

  const title = content?.title || "What Our";
  const highlighted = content?.highlighted || "Clients Say";
  const badge = content?.badge || "Testimonials";
  const subtitle = content?.subtitle || "See what our customers have to say about their experience with Bus2Ride.";

  return (
    <section className="py-24 lg:py-32 bg-card overflow-hidden">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-gold font-semibold tracking-wider uppercase text-sm">
            {badge}
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-4">
            {title} <span className="text-gradient-gold">{highlighted}</span>
          </h2>
          <div className="section-divider mb-6 mx-auto" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Testimonials Columns */}
        <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[600px]">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={19}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={17}
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
