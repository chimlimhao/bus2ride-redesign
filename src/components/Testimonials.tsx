import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";

const testimonials = [
  {
    text: "Bus2Ride made our wedding day absolutely perfect. The limousine was immaculate, and our chauffeur was professional and punctual. Highly recommend!",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    name: "Jennifer Martinez",
    role: "Wedding Client",
  },
  {
    text: "We've used Bus2Ride for multiple corporate events. Their coach buses are always clean, drivers are professional, and they're incredibly reliable.",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "Michael Chen",
    role: "Corporate Event Planner",
  },
  {
    text: "As a parent, safety was my top priority. Bus2Ride exceeded all expectations. The kids had a blast and I had complete peace of mind.",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    name: "Sarah Johnson",
    role: "Prom Parent",
  },
  {
    text: "The party bus was a hit at my bachelor party! Great sound system, comfortable seating, and the driver was super accommodating.",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "David Thompson",
    role: "Bachelor Party",
  },
  {
    text: "Professional service from start to finish. The booking process was seamless and the vehicle exceeded our expectations.",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    name: "Amanda Roberts",
    role: "Corporate Client",
  },
  {
    text: "We used Bus2Ride for our company retreat and it was fantastic. The coach was spacious and comfortable for the long drive.",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    name: "Lisa Williams",
    role: "HR Director",
  },
  {
    text: "Outstanding experience for our wine tour! The chauffeur was knowledgeable and made the trip even more memorable.",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    name: "Robert Garcia",
    role: "Wine Tour Guest",
  },
  {
    text: "Used their airport transfer service and it was impeccable. On-time pickup, clean vehicle, and courteous driver.",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    name: "Emily Davis",
    role: "Business Traveler",
  },
  {
    text: "Bus2Ride made our quinceañera extra special. The limo was beautiful and the service was top-notch!",
    image: "https://randomuser.me/api/portraits/women/9.jpg",
    name: "Maria Gonzalez",
    role: "Quinceañera Client",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const Testimonials = () => {
  return (
    <section className="py-24 lg:py-32 bg-card overflow-hidden">
      <div className="container px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-gold font-semibold tracking-wider uppercase text-sm">
            Testimonials
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-4">
            What Our <span className="text-gradient-gold">Clients Say</span>
          </h2>
          <div className="section-divider mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See what our customers have to say about their experience with Bus2Ride.
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
