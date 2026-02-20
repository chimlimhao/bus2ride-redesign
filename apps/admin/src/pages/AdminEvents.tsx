import AdminHeader from "@/components/admin/AdminHeader";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2, Eye, Upload, X, ImageIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

interface PopularVehicle {
  title: string;
  passengers: string;
  id: string;
}

interface EventItem {
  id: number;
  name: string;
  slug: string;
  type: string;
  status: string;
  bookings: number;
  image: string;
  subtitle: string;
  description: string;
  features: string[];
  popularVehicles: PopularVehicle[];
  tips: string[];
  featureImage: string;
}

const initialEvents: EventItem[] = [
  {
    id: 1, name: "Wedding Transportation", slug: "weddings", type: "Service", status: "Published", bookings: 18,
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800",
    subtitle: "Make your special day unforgettable",
    description: "Your wedding day deserves nothing but the best. Our elegant fleet ensures you and your wedding party travel in comfort and luxury, creating memories that last a lifetime.",
    featureImage: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800",
    features: ["Bride & Groom Transportation", "Wedding Party Shuttles", "Guest Transportation", "Red Carpet Service", "Just Married Decorations", "Champagne Toast Ready", "Multiple Vehicle Coordination", "Day-of Coordinator Communication"],
    popularVehicles: [{ title: "Stretch Limousine", passengers: "6-18", id: "limousines" }, { title: "Party Bus", passengers: "20-50", id: "party-buses" }, { title: "Coach Bus", passengers: "40-56", id: "coach-buses" }],
    tips: ["Book 2-3 months in advance for peak wedding season", "Coordinate pickup times with your photographer", "Consider a party bus for the bridal party", "Ask about 'Just Married' decorations"],
  },
  {
    id: 2, name: "Prom Night", slug: "prom", type: "Event", status: "Published", bookings: 32,
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800",
    subtitle: "Safe, stylish student transportation",
    description: "Give students a memorable night with safe and stylish transportation.",
    featureImage: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800",
    features: ["Trained Professional Chauffeurs", "Parent Communication", "On-Time Guarantee", "Photo Opportunities", "Safe Transportation", "Group Discounts Available", "No Alcohol Policy Strictly Enforced", "GPS Tracking for Parents"],
    popularVehicles: [{ title: "Stretch Limousine", passengers: "6-18", id: "limousines" }, { title: "Party Bus", passengers: "20-50", id: "party-buses" }],
    tips: ["Book 4-6 weeks in advance", "Coordinate photo location and timing", "Share parent contact info with us"],
  },
  {
    id: 3, name: "Corporate Events", slug: "corporate", type: "Service", status: "Published", bookings: 14,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800",
    subtitle: "Professional solutions for business",
    description: "Professional transportation for business events.",
    featureImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800",
    features: ["Executive Airport Transfers", "Conference Shuttles", "Team Building Outings", "Client Entertainment", "Corporate Accounts Available", "Dedicated Account Manager"],
    popularVehicles: [{ title: "Executive Sedan", passengers: "3-4", id: "executive-sedans" }, { title: "Sprinter Van", passengers: "10-16", id: "sprinter-vans" }],
    tips: ["Set up a corporate account for volume discounts", "Provide detailed schedules for multi-stop events"],
  },
  {
    id: 4, name: "Birthday Celebrations", slug: "birthdays", type: "Event", status: "Draft", bookings: 0,
    image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=800",
    subtitle: "Celebrate in style", description: "Party buses for birthday celebrations.",
    featureImage: "", features: [], popularVehicles: [], tips: [],
  },
  {
    id: 5, name: "Airport Transfers", slug: "airport", type: "Service", status: "Published", bookings: 45,
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800",
    subtitle: "Reliable pickup and drop-off", description: "Reliable airport pickup and drop-off.",
    featureImage: "", features: ["On-Time Guarantee", "Flight Tracking", "Meet & Greet Service"], popularVehicles: [], tips: [],
  },
  {
    id: 6, name: "Bachelor/Bachelorette", slug: "bachelor-bachelorette", type: "Event", status: "Published", bookings: 22,
    image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=800",
    subtitle: "Celebrate in style with your crew",
    description: "Party buses and limos for celebrations.",
    featureImage: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=800",
    features: ["Party Bus with Dance Floor", "Premium Sound System", "LED Lighting & Lasers", "Multiple Destination Stops", "BYOB Friendly (21+)", "Ice & Cups Provided"],
    popularVehicles: [{ title: "Party Bus", passengers: "20-50", id: "party-buses" }, { title: "SUV Limousine", passengers: "8-14", id: "suv-limos" }],
    tips: ["Plan your route in advance for multiple stops", "Designate someone to coordinate with the driver"],
  },
  {
    id: 7, name: "Wine Tours", slug: "wine-tours", type: "Event", status: "Published", bookings: 9,
    image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=800",
    subtitle: "Luxury vineyard experiences", description: "Tour vineyards in luxury and comfort.",
    featureImage: "", features: [], popularVehicles: [], tips: [],
  },
];

const emptyEvent: EventItem = {
  id: 0, name: "", slug: "", type: "Event", status: "Draft", bookings: 0,
  image: "", subtitle: "", description: "", featureImage: "",
  features: [], popularVehicles: [], tips: [],
};

const AdminEvents = () => {
  const { toast } = useToast();
  const [events, setEvents] = useState<EventItem[]>(initialEvents);
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);
  const [viewingEvent, setViewingEvent] = useState<EventItem | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const heroInputRef = useRef<HTMLInputElement>(null);
  const featureInputRef = useRef<HTMLInputElement>(null);

  const handleAdd = () => {
    setEditingEvent({ ...emptyEvent, id: Date.now() });
    setIsAdding(true);
  };

  const handleSave = () => {
    if (!editingEvent) return;
    if (isAdding) {
      setEvents((prev) => [...prev, editingEvent]);
      toast({ title: "Event added", description: `${editingEvent.name} has been created.` });
    } else {
      setEvents((prev) => prev.map((e) => e.id === editingEvent.id ? editingEvent : e));
      toast({ title: "Event updated", description: `${editingEvent.name} has been updated.` });
    }
    setEditingEvent(null);
    setIsAdding(false);
  };

  const handleDelete = (id: number) => {
    const event = events.find((e) => e.id === id);
    setEvents((prev) => prev.filter((e) => e.id !== id));
    toast({ title: "Event removed", description: `${event?.name} has been removed.` });
    setDeleteConfirm(null);
  };

  const handleImageUpload = (ref: React.RefObject<HTMLInputElement>, field: "image" | "featureImage") => {
    const file = ref.current?.files?.[0];
    if (file && editingEvent) {
      const url = URL.createObjectURL(file);
      setEditingEvent({ ...editingEvent, [field]: url });
    }
  };

  // Feature helpers
  const addFeature = () => {
    if (!editingEvent) return;
    setEditingEvent({ ...editingEvent, features: [...editingEvent.features, ""] });
  };
  const updateFeature = (index: number, value: string) => {
    if (!editingEvent) return;
    const updated = [...editingEvent.features];
    updated[index] = value;
    setEditingEvent({ ...editingEvent, features: updated });
  };
  const removeFeature = (index: number) => {
    if (!editingEvent) return;
    setEditingEvent({ ...editingEvent, features: editingEvent.features.filter((_, i) => i !== index) });
  };

  // Tip helpers
  const addTip = () => {
    if (!editingEvent) return;
    setEditingEvent({ ...editingEvent, tips: [...editingEvent.tips, ""] });
  };
  const updateTip = (index: number, value: string) => {
    if (!editingEvent) return;
    const updated = [...editingEvent.tips];
    updated[index] = value;
    setEditingEvent({ ...editingEvent, tips: updated });
  };
  const removeTip = (index: number) => {
    if (!editingEvent) return;
    setEditingEvent({ ...editingEvent, tips: editingEvent.tips.filter((_, i) => i !== index) });
  };

  // Vehicle helpers
  const addVehicle = () => {
    if (!editingEvent) return;
    setEditingEvent({ ...editingEvent, popularVehicles: [...editingEvent.popularVehicles, { title: "", passengers: "", id: "" }] });
  };
  const updateVehicle = (index: number, field: keyof PopularVehicle, value: string) => {
    if (!editingEvent) return;
    const updated = [...editingEvent.popularVehicles];
    updated[index] = { ...updated[index], [field]: value };
    setEditingEvent({ ...editingEvent, popularVehicles: updated });
  };
  const removeVehicle = (index: number) => {
    if (!editingEvent) return;
    setEditingEvent({ ...editingEvent, popularVehicles: editingEvent.popularVehicles.filter((_, i) => i !== index) });
  };

  const ImageUploadBox = ({ src, onClick, label }: { src: string; onClick: () => void; label: string }) => (
    <div className="w-full h-36 bg-secondary border border-border overflow-hidden relative group cursor-pointer" onClick={onClick}>
      {src ? (
        <img src={src} alt={label} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground gap-1">
          <Upload className="w-5 h-5" /><span className="text-xs">{label}</span>
        </div>
      )}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <span className="text-white text-xs flex items-center gap-1"><Upload className="w-3 h-3" /> Change</span>
      </div>
    </div>
  );

  return (
    <div>
      <AdminHeader title="Events & Services" description="Manage your event types and service offerings." />

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">{events.length} items total</p>
          <Button className="gap-2 bg-gold text-gold-foreground hover:bg-gold/90" size="sm" onClick={handleAdd}>
            <Plus className="w-4 h-4" /> Add Event / Service
          </Button>
        </div>

        <div className="card-luxury overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">Event</TableHead>
                <TableHead className="text-muted-foreground">Slug</TableHead>
                <TableHead className="text-muted-foreground">Type</TableHead>
                <TableHead className="text-muted-foreground">Features</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event.id} className="border-border hover:bg-secondary/30">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-8 bg-secondary border border-border overflow-hidden">
                        {event.image && <img src={event.image} alt={event.name} className="w-full h-full object-cover" />}
                      </div>
                      <span className="font-medium text-foreground">{event.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-xs font-mono">/events/{event.slug}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-border text-muted-foreground">{event.type}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{event.features.length}</TableCell>
                  <TableCell>
                    <Badge className={event.status === "Published" ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-gold/10 text-gold border-gold/20"}>
                      {event.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setViewingEvent(event)}><Eye className="w-3.5 h-3.5" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setEditingEvent({ ...event }); setIsAdding(false); }}><Pencil className="w-3.5 h-3.5" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => setDeleteConfirm(event.id)}><Trash2 className="w-3.5 h-3.5" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* View Sheet */}
      <Sheet open={!!viewingEvent} onOpenChange={() => setViewingEvent(null)}>
        <SheetContent className="bg-card border-border sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="font-serif text-foreground">{viewingEvent?.name}</SheetTitle>
          </SheetHeader>
          {viewingEvent && (
            <div className="space-y-4 mt-4">
              {viewingEvent.image && <img src={viewingEvent.image} alt={viewingEvent.name} className="w-full h-40 object-cover border border-border" />}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted-foreground">Slug:</span> <span className="text-foreground ml-1 font-mono text-xs">/events/{viewingEvent.slug}</span></div>
                <div><span className="text-muted-foreground">Type:</span> <Badge variant="outline" className="ml-1">{viewingEvent.type}</Badge></div>
                <div><span className="text-muted-foreground">Status:</span> <Badge className={viewingEvent.status === "Published" ? "bg-green-500/10 text-green-400 border-green-500/20 ml-1" : "bg-gold/10 text-gold border-gold/20 ml-1"}>{viewingEvent.status}</Badge></div>
                <div><span className="text-muted-foreground">Bookings:</span> <span className="text-foreground ml-1">{viewingEvent.bookings}</span></div>
              </div>
              <p className="text-sm text-muted-foreground italic">{viewingEvent.subtitle}</p>
              <p className="text-sm text-muted-foreground">{viewingEvent.description}</p>

              {viewingEvent.featureImage && (
                <div>
                  <Label className="text-xs text-muted-foreground">Feature Section Image</Label>
                  <img src={viewingEvent.featureImage} alt="Feature" className="w-full h-32 object-cover border border-border mt-1" />
                </div>
              )}

              {viewingEvent.features.length > 0 && (
                <div>
                  <Label className="text-xs text-muted-foreground">What We Offer ({viewingEvent.features.length})</Label>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {viewingEvent.features.map((f, i) => (
                      <Badge key={i} variant="outline" className="border-gold/30 text-gold text-xs">{f}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {viewingEvent.popularVehicles.length > 0 && (
                <div>
                  <Label className="text-xs text-muted-foreground">Popular Vehicles ({viewingEvent.popularVehicles.length})</Label>
                  <div className="space-y-1 mt-1">
                    {viewingEvent.popularVehicles.map((v, i) => (
                      <div key={i} className="text-sm text-foreground flex justify-between">
                        <span>{v.title}</span>
                        <span className="text-muted-foreground text-xs">{v.passengers} pax → /fleet/{v.id}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {viewingEvent.tips.length > 0 && (
                <div>
                  <Label className="text-xs text-muted-foreground">Planning Tips ({viewingEvent.tips.length})</Label>
                  <ul className="mt-1 space-y-1">
                    {viewingEvent.tips.map((t, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex gap-2">
                        <span className="text-gold font-bold text-xs mt-0.5">{i + 1}</span> {t}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Edit/Add Sheet */}
      <Sheet open={!!editingEvent} onOpenChange={() => { setEditingEvent(null); setIsAdding(false); }}>
        <SheetContent className="bg-card border-border sm:max-w-xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="font-serif text-foreground">{isAdding ? "Add Event / Service" : "Edit Event / Service"}</SheetTitle>
          </SheetHeader>
          {editingEvent && (
            <div className="space-y-5 mt-4 pb-6">
              {/* Hero Image */}
              <div>
                <Label className="text-foreground text-xs mb-1 block">Hero Image</Label>
                <ImageUploadBox src={editingEvent.image} onClick={() => heroInputRef.current?.click()} label="Click to upload hero image" />
                <input ref={heroInputRef} type="file" accept="image/*" className="hidden" onChange={() => handleImageUpload(heroInputRef, "image")} />
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-foreground text-xs">Name</Label>
                  <Input value={editingEvent.name} onChange={(e) => setEditingEvent({ ...editingEvent, name: e.target.value })} className="bg-secondary border-border" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-foreground text-xs">URL Slug</Label>
                  <Input value={editingEvent.slug} onChange={(e) => setEditingEvent({ ...editingEvent, slug: e.target.value })} className="bg-secondary border-border font-mono text-xs" placeholder="e.g. weddings" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-foreground text-xs">Type</Label>
                  <Select value={editingEvent.type} onValueChange={(val) => setEditingEvent({ ...editingEvent, type: val })}>
                    <SelectTrigger className="bg-secondary border-border"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Event">Event</SelectItem>
                      <SelectItem value="Service">Service</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-foreground text-xs">Status</Label>
                  <Select value={editingEvent.status} onValueChange={(val) => setEditingEvent({ ...editingEvent, status: val })}>
                    <SelectTrigger className="bg-secondary border-border"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Published">Published</SelectItem>
                      <SelectItem value="Draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-foreground text-xs">Subtitle</Label>
                <Input value={editingEvent.subtitle} onChange={(e) => setEditingEvent({ ...editingEvent, subtitle: e.target.value })} className="bg-secondary border-border" placeholder="Short tagline for the hero" />
              </div>

              <div className="space-y-1.5">
                <Label className="text-foreground text-xs">Description</Label>
                <Textarea value={editingEvent.description} onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })} className="bg-secondary border-border" rows={3} />
              </div>

              <Separator className="border-border" />

              {/* Feature Section Image */}
              <div>
                <Label className="text-foreground text-xs mb-1 block">"What We Offer" Section Image</Label>
                <ImageUploadBox src={editingEvent.featureImage} onClick={() => featureInputRef.current?.click()} label="Click to upload feature image" />
                <input ref={featureInputRef} type="file" accept="image/*" className="hidden" onChange={() => handleImageUpload(featureInputRef, "featureImage")} />
              </div>

              {/* Features */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-foreground text-xs">What We Offer ({editingEvent.features.length})</Label>
                  <Button variant="outline" size="sm" className="h-7 text-xs gap-1" onClick={addFeature}><Plus className="w-3 h-3" /> Add</Button>
                </div>
                <div className="space-y-2">
                  {editingEvent.features.map((feature, i) => (
                    <div key={i} className="flex gap-2">
                      <Input value={feature} onChange={(e) => updateFeature(i, e.target.value)} className="bg-secondary border-border text-sm" placeholder="Feature name" />
                      <Button variant="ghost" size="icon" className="h-9 w-9 text-destructive hover:text-destructive flex-shrink-0" onClick={() => removeFeature(i)}><X className="w-3.5 h-3.5" /></Button>
                    </div>
                  ))}
                  {editingEvent.features.length === 0 && <p className="text-xs text-muted-foreground italic">No features added yet.</p>}
                </div>
              </div>

              <Separator className="border-border" />

              {/* Popular Vehicles */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-foreground text-xs">Popular Vehicles ({editingEvent.popularVehicles.length})</Label>
                  <Button variant="outline" size="sm" className="h-7 text-xs gap-1" onClick={addVehicle}><Plus className="w-3 h-3" /> Add</Button>
                </div>
                <div className="space-y-3">
                  {editingEvent.popularVehicles.map((vehicle, i) => (
                    <div key={i} className="bg-secondary/50 border border-border p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Vehicle {i + 1}</span>
                        <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive hover:text-destructive" onClick={() => removeVehicle(i)}><X className="w-3 h-3" /></Button>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <Input value={vehicle.title} onChange={(e) => updateVehicle(i, "title", e.target.value)} className="bg-secondary border-border text-xs" placeholder="Title" />
                        <Input value={vehicle.passengers} onChange={(e) => updateVehicle(i, "passengers", e.target.value)} className="bg-secondary border-border text-xs" placeholder="e.g. 6-18" />
                        <Input value={vehicle.id} onChange={(e) => updateVehicle(i, "id", e.target.value)} className="bg-secondary border-border text-xs font-mono" placeholder="fleet slug" />
                      </div>
                    </div>
                  ))}
                  {editingEvent.popularVehicles.length === 0 && <p className="text-xs text-muted-foreground italic">No vehicles linked yet.</p>}
                </div>
              </div>

              <Separator className="border-border" />

              {/* Tips */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-foreground text-xs">Planning Tips ({editingEvent.tips.length})</Label>
                  <Button variant="outline" size="sm" className="h-7 text-xs gap-1" onClick={addTip}><Plus className="w-3 h-3" /> Add</Button>
                </div>
                <div className="space-y-2">
                  {editingEvent.tips.map((tip, i) => (
                    <div key={i} className="flex gap-2">
                      <span className="flex items-center justify-center w-6 h-9 text-xs text-gold font-bold flex-shrink-0">{i + 1}</span>
                      <Input value={tip} onChange={(e) => updateTip(i, e.target.value)} className="bg-secondary border-border text-sm" placeholder="Planning tip" />
                      <Button variant="ghost" size="icon" className="h-9 w-9 text-destructive hover:text-destructive flex-shrink-0" onClick={() => removeTip(i)}><X className="w-3.5 h-3.5" /></Button>
                    </div>
                  ))}
                  {editingEvent.tips.length === 0 && <p className="text-xs text-muted-foreground italic">No tips added yet.</p>}
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={() => { setEditingEvent(null); setIsAdding(false); }}>Cancel</Button>
                <Button className="bg-gold text-gold-foreground hover:bg-gold/90" onClick={handleSave}>{isAdding ? "Add" : "Save Changes"}</Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation Sheet */}
      <Sheet open={deleteConfirm !== null} onOpenChange={() => setDeleteConfirm(null)}>
        <SheetContent className="bg-card border-border sm:max-w-sm">
          <SheetHeader>
            <SheetTitle className="font-serif text-foreground">Delete Event</SheetTitle>
          </SheetHeader>
          <div className="mt-4 space-y-4">
            <p className="text-sm text-muted-foreground">Are you sure you want to remove this event? This action cannot be undone.</p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setDeleteConfirm(null)}>Cancel</Button>
              <Button variant="destructive" onClick={() => deleteConfirm !== null && handleDelete(deleteConfirm)}>Delete</Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AdminEvents;
