import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Users, MapPin, PartyPopper, ArrowRight, Phone } from "lucide-react";
import { z } from "zod";

const quoteSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().min(10, "Phone number is required").max(20),
  date: z.string().min(1, "Date is required"),
  passengers: z.string().min(1, "Number of passengers is required"),
  pickupLocation: z.string().trim().min(1, "Pickup location is required").max(500),
  eventType: z.string().min(1, "Event type is required"),
  additionalInfo: z.string().max(1000).optional(),
});

interface QuoteModalProps {
  children: React.ReactNode;
  vehicleType?: string;
}

const eventTypes = [
  "Wedding",
  "Prom/Homecoming",
  "Bachelor/Bachelorette Party",
  "Corporate Event",
  "Birthday Party",
  "Concert/Festival",
  "Sporting Event",
  "Airport Transfer",
  "Wine Tour",
  "Other",
];

const passengerOptions = [
  "1-4 passengers",
  "5-10 passengers",
  "11-20 passengers",
  "21-30 passengers",
  "31-40 passengers",
  "41-50 passengers",
  "50+ passengers",
];

const QuoteModal = ({ children, vehicleType }: QuoteModalProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    passengers: "",
    pickupLocation: "",
    eventType: "",
    additionalInfo: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      quoteSchema.parse(formData);
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSuccess(true);
      setTimeout(() => {
        setOpen(false);
        setIsSuccess(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          date: "",
          passengers: "",
          pickupLocation: "",
          eventType: "",
          additionalInfo: "",
        });
      }, 2000);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl text-foreground">
            Get Your <span className="text-gold">Instant Quote</span>
          </DialogTitle>
          <p className="text-sm text-muted-foreground mt-2">
            {vehicleType
              ? `Request a quote for our ${vehicleType}`
              : "Fill out the form below and we'll get back to you within 2 hours"}
          </p>
        </DialogHeader>

        {isSuccess ? (
          <div className="py-12 text-center">
            <div className="w-16 h-16 bg-green-500/20 mx-auto mb-4 flex items-center justify-center">
              <ArrowRight className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="font-serif text-xl font-bold text-foreground mb-2">Quote Request Received!</h3>
            <p className="text-muted-foreground">We'll contact you within 2 hours with your personalized quote.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            {/* Name & Email */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  placeholder="John Smith"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className={errors.name ? "border-destructive" : ""}
                />
                {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@email.com"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
              </div>
            </div>

            {/* Phone & Date */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">
                  <Phone className="w-4 h-4 inline mr-1" />
                  Phone *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className={errors.phone ? "border-destructive" : ""}
                />
                {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Event Date *
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleChange("date", e.target.value)}
                  className={errors.date ? "border-destructive" : ""}
                />
                {errors.date && <p className="text-xs text-destructive">{errors.date}</p>}
              </div>
            </div>

            {/* Passengers & Event Type */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>
                  <Users className="w-4 h-4 inline mr-1" />
                  Passengers *
                </Label>
                <Select value={formData.passengers} onValueChange={(value) => handleChange("passengers", value)}>
                  <SelectTrigger className={errors.passengers ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {passengerOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.passengers && <p className="text-xs text-destructive">{errors.passengers}</p>}
              </div>
              <div className="space-y-2">
                <Label>
                  <PartyPopper className="w-4 h-4 inline mr-1" />
                  Event Type *
                </Label>
                <Select value={formData.eventType} onValueChange={(value) => handleChange("eventType", value)}>
                  <SelectTrigger className={errors.eventType ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {eventTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.eventType && <p className="text-xs text-destructive">{errors.eventType}</p>}
              </div>
            </div>

            {/* Pickup Location */}
            <div className="space-y-2">
              <Label htmlFor="pickupLocation">
                <MapPin className="w-4 h-4 inline mr-1" />
                Pickup Location *
              </Label>
              <Input
                id="pickupLocation"
                placeholder="123 Main St, City, State"
                value={formData.pickupLocation}
                onChange={(e) => handleChange("pickupLocation", e.target.value)}
                className={errors.pickupLocation ? "border-destructive" : ""}
              />
              {errors.pickupLocation && <p className="text-xs text-destructive">{errors.pickupLocation}</p>}
            </div>

            {/* Additional Info */}
            <div className="space-y-2">
              <Label htmlFor="additionalInfo">Additional Information</Label>
              <Textarea
                id="additionalInfo"
                placeholder="Tell us about your event, special requests, or questions..."
                rows={3}
                value={formData.additionalInfo}
                onChange={(e) => handleChange("additionalInfo", e.target.value)}
              />
            </div>

            {/* Submit */}
            <div className="flex gap-3 pt-4">
              <Button type="submit" variant="gold" size="lg" className="flex-1" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Get My Quote"}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            <p className="text-xs text-muted-foreground text-center">
              Or call us directly at{" "}
              <a href="tel:888-535-2566" className="text-gold hover:underline">
                (888) 535-2566
              </a>
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default QuoteModal;
