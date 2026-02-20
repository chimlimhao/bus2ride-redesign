import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import { Shield, Award, Clock, Users, CheckCircle } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { usePageContent } from "@/hooks/usePageContent";

interface AboutHero {
  title: string;
  highlighted: string;
  subtitle: string;
  image: string;
}

interface AboutStory {
  badge: string;
  title: string;
  highlighted: string;
  paragraphs: string[];
  image: string;
  exp_value: string;
  exp_label: string;
}

interface AboutStats {
  items: { value: string; label: string }[];
}

interface AboutValues {
  badge: string;
  title: string;
  highlighted: string;
  items: { title: string; description: string; icon?: string }[];
}

interface AboutJourney {
  badge: string;
  title: string;
  highlighted: string;
  milestones: { year: string; event: string }[];
}

const About = () => {
  const { content: hero, loading: heroLoading } = usePageContent<AboutHero>('about', 'hero');
  const { content: story, loading: storyLoading } = usePageContent<AboutStory>('about', 'story');
  const { content: statsContent, loading: statsLoading } = usePageContent<AboutStats>('about', 'stats');
  const { content: valuesContent, loading: valuesLoading } = usePageContent<AboutValues>('about', 'values');
  const { content: journey, loading: journeyLoading } = usePageContent<AboutJourney>('about', 'journey');

  const isLoading = heroLoading || storyLoading || statsLoading || valuesLoading || journeyLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  const ValueIconMap: Record<string, any> = {
    "Safety First": Shield,
    "Premium Quality": Award,
    "Punctuality": Clock,
    "Customer Focus": Users,
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {hero && (
        <PageHero
          title={hero.title}
          highlightedWord={hero.highlighted}
          subtitle={hero.subtitle}
          backgroundImage={hero.image}
        />
      )}

      {/* Our Story */}
      {story && (
        <section className="py-24 lg:py-32">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-gold font-semibold tracking-wider uppercase text-sm">
                  {story.badge}
                </span>
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6">
                  {story.title} <span className="text-gradient-gold">{story.highlighted}</span>
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  {(story.paragraphs || []).map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>

              <div className="relative">
                <img
                  src={story.image}
                  alt="Luxury Mercedes fleet"
                  className="rounded-2xl w-full object-cover aspect-[4/3]"
                />
                <div className="absolute -bottom-8 -left-8 bg-gold text-gold-foreground p-6 rounded-xl">
                  <div className="text-4xl font-bold">{story.exp_value}</div>
                  <div className="text-sm">{story.exp_label}</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Stats */}
      {statsContent && (
        <section className="py-16 bg-card">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {(statsContent.items || []).map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-gold mb-2">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Our Values */}
      {valuesContent && (
        <section className="py-24 lg:py-32">
          <div className="container">
            <div className="text-center mb-16">
              <span className="text-gold font-semibold tracking-wider uppercase text-sm">
                {valuesContent.badge || "Our Values"}
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-4">
                {valuesContent.title} <span className="text-gradient-gold">{valuesContent.highlighted}</span>
              </h2>
              <div className="section-divider mb-6 mx-auto" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {(valuesContent.items || []).map((value, index) => {
                const Icon = (value.icon && (LucideIcons as any)[value.icon])
                  ? (LucideIcons as any)[value.icon]
                  : (ValueIconMap as any)[value.title] || Shield;

                return (
                  <div key={index} className="card-luxury p-8 text-center">
                    <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
                      <Icon className="w-8 h-8 text-gold" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Timeline */}
      {journey && (
        <section className="py-24 lg:py-32 bg-card">
          <div className="container">
            <div className="text-center mb-16">
              <span className="text-gold font-semibold tracking-wider uppercase text-sm">
                {journey.badge || "Our Journey"}
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-4">
                {journey.title} <span className="text-gradient-gold">{journey.highlighted}</span>
              </h2>
              <div className="section-divider mb-6 mx-auto" />
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="space-y-8">
                {(journey.milestones || []).map((milestone, index) => (
                  <div key={index} className="flex gap-6 items-start">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-gold/10 border-2 border-gold flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-gold" />
                      </div>
                      {index < journey.milestones.length - 1 && (
                        <div className="w-0.5 h-16 bg-border mt-2" />
                      )}
                    </div>
                    <div className="pt-2">
                      <div className="text-gold font-bold text-lg">{milestone.year}</div>
                      <div className="text-foreground">{milestone.event}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <Testimonials />
      <CTASection />
      <Footer />
    </div>
  );
};

export default About;
