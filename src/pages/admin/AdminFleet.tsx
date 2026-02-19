import AdminHeader from "@/components/admin/AdminHeader";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2, Eye, Upload, X, GripVertical } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

import partyBusImg from "@/assets/fleet/party-bus-hero.jpg";
import partyBusInterior from "@/assets/fleet/party-bus-interior.jpg";
import limousineImg from "@/assets/fleet/limousine.jpg";
import sprinterImg from "@/assets/fleet/sprinter-van.jpg";
import suvLimoImg from "@/assets/fleet/suv-limo.jpg";
import sedanImg from "@/assets/fleet/sedan.jpg";
import coachBusImg from "@/assets/fleet/coach-bus.jpg";

interface VehicleVariant {
  name: string;
  passengers: string;
  sweetSpot: string;
  type: string;
}

interface Vehicle {
  id: number;
  name: string;
  slug: string;
  capacity: string;
  status: string;
  price: string;
  image: string;
  description: string;
  categoryLabel: string;
  gallery: string[];
  features: string[];
  amenities: string[];
  variants: VehicleVariant[];
}

const initialFleet: Vehicle[] = [
  {
    id: 1, name: "Party Bus", slug: "party-buses", capacity: "20-50", status: "Active", price: "$250/hr",
    image: partyBusImg, description: "Spacious party buses designed for lively celebrations and group outings. Features premium sound systems, LED lighting, and all the amenities you need for an unforgettable experience.",
    categoryLabel: "FEATURED PARTY BUS • 24/7 BOOKING",
    gallery: [partyBusImg, partyBusInterior, coachBusImg, limousineImg],
    features: ["Premium Sound System", "LED Lighting & Lasers", "Leather Seating", "Climate Control", "On-board Restroom", "Mini Bar Area"],
    amenities: ["Dance Pole (select buses)", "Bluetooth Connectivity", "USB Charging Ports", "Tinted Windows", "Professional Chauffeur", "Ice & Cups Provided"],
    variants: [
      { name: "20 Passenger Party Bus", passengers: "15-20", sweetSpot: "18", type: "Ford E-450" },
      { name: "25 Passenger Party Bus", passengers: "20-25", sweetSpot: "22", type: "Freightliner" },
      { name: "30 Passenger Party Bus", passengers: "25-30", sweetSpot: "28", type: "Freightliner M2" },
      { name: "40 Passenger Party Bus", passengers: "35-40", sweetSpot: "38", type: "Prevost" },
      { name: "50 Passenger Party Bus", passengers: "45-50", sweetSpot: "48", type: "MCI Coach" },
    ],
  },
  {
    id: 2, name: "Stretch Limousine", slug: "limousines", capacity: "6-18", status: "Active", price: "$175/hr",
    image: limousineImg, description: "Classic elegance meets modern luxury. Our stretch limousines provide the perfect setting for weddings, proms, and executive travel.",
    categoryLabel: "FEATURED STRETCH LIMOUSINE • 24/7 BOOKING",
    gallery: [limousineImg, suvLimoImg, sedanImg, partyBusInterior],
    features: ["Leather Interior", "Mini Bar with Glassware", "Privacy Divider", "Premium Audio System", "Fiber Optic Lighting", "Sunroof (select models)"],
    amenities: ["Champagne Bucket", "Bluetooth Audio", "Phone Chargers", "Bottled Water", "Professional Chauffeur", "Red Carpet Service"],
    variants: [
      { name: "6 Passenger Stretch Limo", passengers: "4-6", sweetSpot: "6", type: "Lincoln Town Car" },
      { name: "8 Passenger Stretch Limo", passengers: "6-8", sweetSpot: "8", type: "Lincoln Navigator" },
      { name: "10 Passenger Stretch Limo", passengers: "8-10", sweetSpot: "10", type: "Chrysler 300" },
    ],
  },
  {
    id: 3, name: "Sprinter Van", slug: "sprinter-vans", capacity: "10-16", status: "Active", price: "$150/hr",
    image: sprinterImg, description: "Versatile luxury vans perfect for medium-sized groups. Ideal for corporate travel, wine tours, and group outings.",
    categoryLabel: "FEATURED SPRINTER VAN • 24/7 BOOKING",
    gallery: [sprinterImg, partyBusInterior, coachBusImg, limousineImg],
    features: ["Luggage Area", "Rear AC/Heating", "Custom Interior Lighting", "TV & DVD Capabilities", "Luxury Leather Interior", "High Roof for Standing"],
    amenities: ["WiFi Available", "Power Outlets", "Cooler Space", "Bluetooth Audio", "Professional Chauffeur", "Tinted Windows"],
    variants: [
      { name: "10 Passenger Sprinter", passengers: "8-10", sweetSpot: "10", type: "Mercedes Sprinter" },
      { name: "12 Passenger Sprinter", passengers: "10-12", sweetSpot: "12", type: "Mercedes Sprinter" },
      { name: "14 Passenger Sprinter", passengers: "12-14", sweetSpot: "14", type: "Mercedes Sprinter" },
    ],
  },
  {
    id: 4, name: "SUV Limousine", slug: "suv-limos", capacity: "8-14", status: "Maintenance", price: "$200/hr",
    image: suvLimoImg, description: "The perfect blend of rugged style and luxurious comfort. Our SUV limousines offer more headroom and a commanding presence.",
    categoryLabel: "FEATURED SUV LIMOUSINE • 24/7 BOOKING",
    gallery: [suvLimoImg, limousineImg, sedanImg, partyBusInterior],
    features: ["Spacious Interior", "Premium Sound System", "Custom LED Lighting", "Leather Seating", "Mini Bar", "Privacy Windows"],
    amenities: ["Fiber Optic Ceiling", "Flat Screen TV", "Bluetooth Audio", "Phone Chargers", "Professional Chauffeur", "Ice & Cups Provided"],
    variants: [
      { name: "8 Passenger SUV Limo", passengers: "6-8", sweetSpot: "8", type: "Cadillac Escalade" },
      { name: "12 Passenger SUV Limo", passengers: "10-12", sweetSpot: "12", type: "Lincoln Navigator" },
    ],
  },
  {
    id: 5, name: "Luxury Sedan", slug: "executive-sedans", capacity: "3-4", status: "Active", price: "$95/hr",
    image: sedanImg, description: "Professional, understated elegance for corporate executives and discerning travelers.",
    categoryLabel: "FEATURED EXECUTIVE SEDAN • 24/7 BOOKING",
    gallery: [sedanImg, suvLimoImg, limousineImg, partyBusInterior],
    features: ["Leather Interior", "Rear Climate Control", "Bluetooth Audio", "Tinted Windows", "Extra Legroom", "Trunk Space for Luggage"],
    amenities: ["Bottled Water", "Phone Chargers", "WiFi Available", "Newspapers/Magazines", "Professional Chauffeur", "Flight Tracking"],
    variants: [
      { name: "3 Passenger Sedan", passengers: "2-3", sweetSpot: "3", type: "Mercedes S-Class" },
      { name: "4 Passenger Sedan", passengers: "3-4", sweetSpot: "4", type: "BMW 7 Series" },
    ],
  },
  {
    id: 6, name: "Coach Bus", slug: "coach-buses", capacity: "36-56", status: "Active", price: "$350/hr",
    image: coachBusImg, description: "Perfect for large groups requiring comfortable long-distance travel with panoramic windows and ample storage.",
    categoryLabel: "FEATURED COACH BUS • 24/7 BOOKING",
    gallery: [coachBusImg, partyBusImg, partyBusInterior, limousineImg],
    features: ["Panoramic Windows", "Overhead Storage", "On-board Restroom", "WiFi Available", "Climate Control", "Reclining Seats"],
    amenities: ["Power Outlets", "Reading Lights", "PA System", "DVD Players", "Professional Chauffeur", "Luggage Compartment"],
    variants: [
      { name: "36 Passenger Coach Bus", passengers: "30-36", sweetSpot: "34", type: "MCI J4500" },
      { name: "45 Passenger Coach Bus", passengers: "40-45", sweetSpot: "42", type: "Prevost H3-45" },
      { name: "56 Passenger Coach Bus", passengers: "50-56", sweetSpot: "54", type: "MCI D4505" },
    ],
  },
];

const AdminFleet = () => {
  const { toast } = useToast();
  const [fleet, setFleet] = useState<Vehicle[]>(initialFleet);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [viewingVehicle, setViewingVehicle] = useState<Vehicle | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const handleAdd = () => {
    setEditingVehicle({
      id: Date.now(), name: "", slug: "", capacity: "", status: "Active", price: "", image: "", description: "",
      categoryLabel: "", gallery: [], features: [""], amenities: [""], variants: [],
    });
    setIsAdding(true);
  };

  const handleSave = () => {
    if (!editingVehicle) return;
    const cleaned = {
      ...editingVehicle,
      features: editingVehicle.features.filter(f => f.trim()),
      amenities: editingVehicle.amenities.filter(a => a.trim()),
    };
    if (isAdding) {
      setFleet((prev) => [...prev, cleaned]);
      toast({ title: "Vehicle added", description: `${cleaned.name} has been added to the fleet.` });
    } else {
      setFleet((prev) => prev.map((v) => v.id === cleaned.id ? cleaned : v));
      toast({ title: "Vehicle updated", description: `${cleaned.name} has been updated.` });
    }
    setEditingVehicle(null);
    setIsAdding(false);
  };

  const handleDelete = (id: number) => {
    const vehicle = fleet.find((v) => v.id === id);
    setFleet((prev) => prev.filter((v) => v.id !== id));
    toast({ title: "Vehicle removed", description: `${vehicle?.name} has been removed.` });
    setDeleteConfirm(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingVehicle) {
      const url = URL.createObjectURL(file);
      setEditingVehicle({ ...editingVehicle, image: url });
    }
  };

  const handleGalleryAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingVehicle) {
      const url = URL.createObjectURL(file);
      setEditingVehicle({ ...editingVehicle, gallery: [...editingVehicle.gallery, url] });
    }
  };

  const removeGalleryImage = (index: number) => {
    if (!editingVehicle) return;
    setEditingVehicle({ ...editingVehicle, gallery: editingVehicle.gallery.filter((_, i) => i !== index) });
  };

  const updateFeature = (index: number, value: string) => {
    if (!editingVehicle) return;
    const updated = [...editingVehicle.features];
    updated[index] = value;
    setEditingVehicle({ ...editingVehicle, features: updated });
  };

  const updateAmenity = (index: number, value: string) => {
    if (!editingVehicle) return;
    const updated = [...editingVehicle.amenities];
    updated[index] = value;
    setEditingVehicle({ ...editingVehicle, amenities: updated });
  };

  const addVariant = () => {
    if (!editingVehicle) return;
    setEditingVehicle({
      ...editingVehicle,
      variants: [...editingVehicle.variants, { name: "", passengers: "", sweetSpot: "", type: "" }],
    });
  };

  const updateVariant = (index: number, field: keyof VehicleVariant, value: string) => {
    if (!editingVehicle) return;
    const updated = [...editingVehicle.variants];
    updated[index] = { ...updated[index], [field]: value };
    setEditingVehicle({ ...editingVehicle, variants: updated });
  };

  const removeVariant = (index: number) => {
    if (!editingVehicle) return;
    setEditingVehicle({ ...editingVehicle, variants: editingVehicle.variants.filter((_, i) => i !== index) });
  };

  return (
    <div>
      <AdminHeader title="Fleet Management" description="Manage your vehicles, detail pages, galleries, and variants." />

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">{fleet.length} vehicles total</p>
          <Button className="gap-2 bg-gold text-gold-foreground hover:bg-gold/90" size="sm" onClick={handleAdd}>
            <Plus className="w-4 h-4" /> Add Vehicle
          </Button>
        </div>

        <div className="card-luxury overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">Vehicle</TableHead>
                <TableHead className="text-muted-foreground">Capacity</TableHead>
                <TableHead className="text-muted-foreground">Price</TableHead>
                <TableHead className="text-muted-foreground">Gallery</TableHead>
                <TableHead className="text-muted-foreground">Variants</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fleet.map((vehicle) => (
                <TableRow key={vehicle.id} className="border-border hover:bg-secondary/30">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-8 bg-secondary border border-border overflow-hidden">
                        {vehicle.image && <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-cover" />}
                      </div>
                      <div>
                        <span className="font-medium text-foreground">{vehicle.name}</span>
                        <p className="text-[10px] text-muted-foreground">/fleet/{vehicle.slug}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{vehicle.capacity}</TableCell>
                  <TableCell className="text-foreground font-medium">{vehicle.price}</TableCell>
                  <TableCell className="text-muted-foreground">{vehicle.gallery.length} images</TableCell>
                  <TableCell className="text-muted-foreground">{vehicle.variants.length} sizes</TableCell>
                  <TableCell>
                    <Badge className={vehicle.status === "Active" ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-gold/10 text-gold border-gold/20"}>
                      {vehicle.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setViewingVehicle(vehicle)}><Eye className="w-3.5 h-3.5" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setEditingVehicle({ ...vehicle }); setIsAdding(false); }}><Pencil className="w-3.5 h-3.5" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => setDeleteConfirm(vehicle.id)}><Trash2 className="w-3.5 h-3.5" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* View Sheet */}
      <Sheet open={!!viewingVehicle} onOpenChange={() => setViewingVehicle(null)}>
        <SheetContent className="bg-card border-border sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="font-serif text-foreground">{viewingVehicle?.name}</SheetTitle>
          </SheetHeader>
          {viewingVehicle && (
            <div className="space-y-5 mt-4">
              {viewingVehicle.image && (
                <img src={viewingVehicle.image} alt={viewingVehicle.name} className="w-full h-48 object-cover border border-border" />
              )}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted-foreground">Capacity:</span> <span className="text-foreground ml-1">{viewingVehicle.capacity}</span></div>
                <div><span className="text-muted-foreground">Price:</span> <span className="text-foreground ml-1">{viewingVehicle.price}</span></div>
                <div><span className="text-muted-foreground">Slug:</span> <span className="text-foreground ml-1">/fleet/{viewingVehicle.slug}</span></div>
                <div><span className="text-muted-foreground">Status:</span> <Badge className={viewingVehicle.status === "Active" ? "bg-green-500/10 text-green-400 border-green-500/20 ml-1" : "bg-gold/10 text-gold border-gold/20 ml-1"}>{viewingVehicle.status}</Badge></div>
              </div>
              <p className="text-sm text-muted-foreground">{viewingVehicle.description}</p>

              {/* Gallery Preview */}
              <div>
                <p className="text-xs font-semibold text-gold mb-2">Gallery ({viewingVehicle.gallery.length} images)</p>
                <div className="grid grid-cols-4 gap-1">
                  {viewingVehicle.gallery.map((img, i) => (
                    <img key={i} src={img} alt={`Gallery ${i + 1}`} className="w-full h-16 object-cover border border-border" />
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <p className="text-xs font-semibold text-gold mb-2">Features</p>
                <div className="flex flex-wrap gap-1.5">
                  {viewingVehicle.features.map((f, i) => (
                    <Badge key={i} variant="outline" className="text-[10px] border-border text-muted-foreground">{f}</Badge>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div>
                <p className="text-xs font-semibold text-gold mb-2">Amenities</p>
                <div className="flex flex-wrap gap-1.5">
                  {viewingVehicle.amenities.map((a, i) => (
                    <Badge key={i} variant="outline" className="text-[10px] border-border text-muted-foreground">{a}</Badge>
                  ))}
                </div>
              </div>

              {/* Variants */}
              <div>
                <p className="text-xs font-semibold text-gold mb-2">Variants ({viewingVehicle.variants.length})</p>
                <div className="space-y-2">
                  {viewingVehicle.variants.map((v, i) => (
                    <div key={i} className="p-2.5 bg-secondary/50 border border-border text-xs">
                      <p className="font-medium text-foreground">{v.name}</p>
                      <p className="text-muted-foreground">{v.type} · {v.passengers} pax · Sweet spot: {v.sweetSpot}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Edit/Add Sheet */}
      <Sheet open={!!editingVehicle} onOpenChange={() => { setEditingVehicle(null); setIsAdding(false); }}>
        <SheetContent className="bg-card border-border sm:max-w-2xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="font-serif text-foreground">{isAdding ? "Add Vehicle" : "Edit Vehicle"}</SheetTitle>
          </SheetHeader>
          {editingVehicle && (
            <div className="space-y-6 mt-4 pb-6">
              {/* Main Image */}
              <div>
                <p className="text-xs font-semibold text-gold mb-2 uppercase tracking-wider">Main Image</p>
                <div
                  className="w-full h-40 bg-secondary border border-border overflow-hidden relative group cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {editingVehicle.image ? (
                    <img src={editingVehicle.image} alt={editingVehicle.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground gap-1">
                      <Upload className="w-6 h-6" />
                      <span className="text-xs">Click to upload image</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-sm flex items-center gap-1"><Upload className="w-4 h-4" /> Change Image</span>
                  </div>
                </div>
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              </div>

              {/* Basic Info */}
              <div>
                <p className="text-xs font-semibold text-gold mb-2 uppercase tracking-wider">Basic Info</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label className="text-foreground">Name</Label>
                    <Input value={editingVehicle.name} onChange={(e) => setEditingVehicle({ ...editingVehicle, name: e.target.value })} className="bg-secondary border-border" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-foreground">URL Slug</Label>
                    <Input value={editingVehicle.slug} onChange={(e) => setEditingVehicle({ ...editingVehicle, slug: e.target.value })} className="bg-secondary border-border" placeholder="party-buses" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-foreground">Capacity</Label>
                    <Input value={editingVehicle.capacity} onChange={(e) => setEditingVehicle({ ...editingVehicle, capacity: e.target.value })} className="bg-secondary border-border" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-foreground">Price</Label>
                    <Input value={editingVehicle.price} onChange={(e) => setEditingVehicle({ ...editingVehicle, price: e.target.value })} className="bg-secondary border-border" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-foreground">Status</Label>
                    <Select value={editingVehicle.status} onValueChange={(val) => setEditingVehicle({ ...editingVehicle, status: val })}>
                      <SelectTrigger className="bg-secondary border-border"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Maintenance">Maintenance</SelectItem>
                        <SelectItem value="Retired">Retired</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-foreground">Category Label</Label>
                    <Input value={editingVehicle.categoryLabel} onChange={(e) => setEditingVehicle({ ...editingVehicle, categoryLabel: e.target.value })} className="bg-secondary border-border" placeholder="FEATURED PARTY BUS • 24/7 BOOKING" />
                  </div>
                </div>
                <div className="space-y-2 mt-3">
                  <Label className="text-foreground">Description</Label>
                  <Textarea value={editingVehicle.description} onChange={(e) => setEditingVehicle({ ...editingVehicle, description: e.target.value })} className="bg-secondary border-border" rows={3} />
                </div>
              </div>

              {/* Gallery */}
              <div>
                <p className="text-xs font-semibold text-gold mb-2 uppercase tracking-wider">Image Gallery</p>
                <div className="grid grid-cols-4 gap-2 mb-2">
                  {editingVehicle.gallery.map((img, i) => (
                    <div key={i} className="relative group">
                      <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-20 object-cover border border-border" />
                      <button
                        onClick={() => removeGalleryImage(i)}
                        className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  <div
                    className="w-full h-20 border-2 border-dashed border-gold/30 flex flex-col items-center justify-center cursor-pointer hover:bg-gold/5 transition-colors"
                    onClick={() => galleryInputRef.current?.click()}
                  >
                    <Plus className="w-4 h-4 text-gold" />
                    <span className="text-[10px] text-gold">Add</span>
                  </div>
                </div>
                <input ref={galleryInputRef} type="file" accept="image/*" className="hidden" onChange={handleGalleryAdd} />
              </div>

              {/* Features */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-semibold text-gold uppercase tracking-wider">Features</p>
                  <Button variant="ghost" size="sm" className="h-6 text-[10px] text-gold" onClick={() => setEditingVehicle({ ...editingVehicle, features: [...editingVehicle.features, ""] })}>
                    <Plus className="w-3 h-3 mr-1" /> Add
                  </Button>
                </div>
                <div className="space-y-1.5">
                  {editingVehicle.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Input value={f} onChange={(e) => updateFeature(i, e.target.value)} className="bg-secondary border-border text-sm h-8" placeholder="Feature name" />
                      <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 text-destructive hover:text-destructive" onClick={() => setEditingVehicle({ ...editingVehicle, features: editingVehicle.features.filter((_, idx) => idx !== i) })}>
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-semibold text-gold uppercase tracking-wider">Amenities</p>
                  <Button variant="ghost" size="sm" className="h-6 text-[10px] text-gold" onClick={() => setEditingVehicle({ ...editingVehicle, amenities: [...editingVehicle.amenities, ""] })}>
                    <Plus className="w-3 h-3 mr-1" /> Add
                  </Button>
                </div>
                <div className="space-y-1.5">
                  {editingVehicle.amenities.map((a, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Input value={a} onChange={(e) => updateAmenity(i, e.target.value)} className="bg-secondary border-border text-sm h-8" placeholder="Amenity name" />
                      <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 text-destructive hover:text-destructive" onClick={() => setEditingVehicle({ ...editingVehicle, amenities: editingVehicle.amenities.filter((_, idx) => idx !== i) })}>
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Variants */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-semibold text-gold uppercase tracking-wider">Vehicle Variants / Sizes</p>
                  <Button variant="ghost" size="sm" className="h-6 text-[10px] text-gold" onClick={addVariant}>
                    <Plus className="w-3 h-3 mr-1" /> Add Variant
                  </Button>
                </div>
                <div className="space-y-3">
                  {editingVehicle.variants.map((v, i) => (
                    <div key={i} className="p-3 bg-secondary/50 border border-border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-foreground">Variant {i + 1}</span>
                        <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive hover:text-destructive" onClick={() => removeVariant(i)}>
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Input value={v.name} onChange={(e) => updateVariant(i, "name", e.target.value)} className="bg-background border-border text-sm h-8" placeholder="Name" />
                        <Input value={v.type} onChange={(e) => updateVariant(i, "type", e.target.value)} className="bg-background border-border text-sm h-8" placeholder="Vehicle type" />
                        <Input value={v.passengers} onChange={(e) => updateVariant(i, "passengers", e.target.value)} className="bg-background border-border text-sm h-8" placeholder="Passengers (e.g. 15-20)" />
                        <Input value={v.sweetSpot} onChange={(e) => updateVariant(i, "sweetSpot", e.target.value)} className="bg-background border-border text-sm h-8" placeholder="Sweet spot" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-2 pt-2 border-t border-border">
                <Button variant="outline" onClick={() => { setEditingVehicle(null); setIsAdding(false); }}>Cancel</Button>
                <Button className="bg-gold text-gold-foreground hover:bg-gold/90" onClick={handleSave}>{isAdding ? "Add Vehicle" : "Save Changes"}</Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation Sheet */}
      <Sheet open={deleteConfirm !== null} onOpenChange={() => setDeleteConfirm(null)}>
        <SheetContent className="bg-card border-border sm:max-w-sm">
          <SheetHeader>
            <SheetTitle className="font-serif text-foreground">Delete Vehicle</SheetTitle>
          </SheetHeader>
          <div className="mt-4 space-y-4">
            <p className="text-sm text-muted-foreground">Are you sure you want to remove this vehicle? This will also delete its detail page. This action cannot be undone.</p>
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

export default AdminFleet;
