import AdminHeader from "@/components/admin/AdminHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useState, useRef, useEffect, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { uploadImage } from "@/lib/supabase-storage";
import { supabase } from "@bus2ride/shared/supabase";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Users,
  Search,
  Plus,
  Filter,
  Edit,
  Trash2,
  Eye,
  Upload,
  X,
  Loader2,
  ChevronRight,
  LayoutGrid,
  List
} from "lucide-react";

interface VehicleVariant {
  name: string;
  passengers: string;
  sweetSpot: string;
  type: string;
}

interface Vehicle {
  id: string;
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

const AdminFleet = () => {
  const { toast } = useToast();
  const [fleet, setFleet] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewingVehicle, setViewingVehicle] = useState<Vehicle | null>(null);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const fetchFleet = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("fleet_vehicles")
        .select("*")
        .order("sort_order", { ascending: true });

      if (error) throw error;

      const mapped: Vehicle[] = (data || []).map(v => ({
        id: v.id,
        name: v.name,
        slug: v.slug,
        capacity: v.capacity || "",
        status: v.status === "Published" ? "Active" : "Active",
        price: v.price_from || "",
        image: v.image_url || "",
        description: v.description || "",
        categoryLabel: v.category_label || "",
        gallery: v.gallery_urls || [],
        features: v.features || [],
        amenities: v.amenities || [],
        variants: (v.variants as any) || [],
      }));
      setFleet(mapped);
    } catch (err) {
      console.error("Error fetching fleet:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFleet();
  }, [fetchFleet]);

  const filteredFleet = fleet.filter(v =>
    v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.categoryLabel.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    setEditingVehicle({
      id: "", name: "", slug: "", capacity: "", status: "Active", price: "", image: "", description: "",
      categoryLabel: "", gallery: [], features: [""], amenities: [""], variants: [],
    });
    setIsAdding(true);
  };

  const handleSave = async () => {
    if (!editingVehicle) return;

    try {
      const vehicleData = {
        name: editingVehicle.name,
        slug: editingVehicle.slug,
        capacity: editingVehicle.capacity,
        price_from: editingVehicle.price,
        image_url: editingVehicle.image,
        description: editingVehicle.description,
        category_label: editingVehicle.categoryLabel,
        gallery_urls: editingVehicle.gallery,
        features: editingVehicle.features.filter((f: string) => f.trim()),
        amenities: editingVehicle.amenities.filter((a: string) => a.trim()),
        variants: editingVehicle.variants as any,
        status: editingVehicle.status === "Active" ? "Published" : "Draft",
        updated_at: new Date().toISOString()
      };

      let error;
      if (isAdding) {
        ({ error } = await supabase.from("fleet_vehicles").insert([vehicleData]));
      } else {
        ({ error } = await supabase.from("fleet_vehicles").update(vehicleData).eq("id", editingVehicle.id));
      }

      if (error) throw error;

      toast({ title: isAdding ? "Vehicle added" : "Vehicle updated", description: `${editingVehicle.name} has been processed.` });
      setEditingVehicle(null);
      setIsAdding(false);
      fetchFleet();
    } catch (err) {
      console.error("Error saving vehicle:", err);
      toast({ title: "Error", description: "Failed to save vehicle details.", variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from("fleet_vehicles").delete().eq("id", id);
      if (error) throw error;
      toast({ title: "Vehicle removed", description: "The vehicle was removed from the fleet." });
      setDeleteConfirm(null);
      fetchFleet();
    } catch (err) {
      console.error("Error deleting vehicle:", err);
      toast({ title: "Error", description: "Failed to delete vehicle.", variant: "destructive" });
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingVehicle) {
      try {
        const url = await uploadImage(file, "fleet-images");
        setEditingVehicle({ ...editingVehicle, image: url });
        toast({ title: "Image uploaded", description: "Main vehicle image updated." });
      } catch (err) {
        toast({ title: "Upload failed", variant: "destructive" });
      }
    }
  };

  const handleGalleryAdd = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingVehicle) {
      try {
        const url = await uploadImage(file, "fleet-images");
        setEditingVehicle({ ...editingVehicle, gallery: [...editingVehicle.gallery, url] });
        toast({ title: "Image added to gallery" });
      } catch (err) {
        toast({ title: "Upload failed", variant: "destructive" });
      }
    }
  };

  const removeGalleryImage = (index: number) => {
    if (editingVehicle) {
      const newGallery = [...editingVehicle.gallery];
      newGallery.splice(index, 1);
      setEditingVehicle({ ...editingVehicle, gallery: newGallery });
    }
  };

  const updateFeature = (index: number, value: string) => {
    if (editingVehicle) {
      const newFeatures = [...editingVehicle.features];
      newFeatures[index] = value;
      setEditingVehicle({ ...editingVehicle, features: newFeatures });
    }
  };

  const updateAmenity = (index: number, value: string) => {
    if (editingVehicle) {
      const newAmenities = [...editingVehicle.amenities];
      newAmenities[index] = value;
      setEditingVehicle({ ...editingVehicle, amenities: newAmenities });
    }
  };

  const addVariant = () => {
    if (editingVehicle) {
      setEditingVehicle({
        ...editingVehicle,
        variants: [...editingVehicle.variants, { name: "", type: "", passengers: "", sweetSpot: "" }]
      });
    }
  };

  const updateVariant = (index: number, field: keyof VehicleVariant, value: string) => {
    if (editingVehicle) {
      const newVariants = [...editingVehicle.variants];
      newVariants[index] = { ...newVariants[index], [field]: value };
      setEditingVehicle({ ...editingVehicle, variants: newVariants });
    }
  };

  const removeVariant = (index: number) => {
    if (editingVehicle) {
      const newVariants = [...editingVehicle.variants];
      newVariants.splice(index, 1);
      setEditingVehicle({ ...editingVehicle, variants: newVariants });
    }
  };

  return (
    <div className="min-h-screen bg-background pb-12">
      <AdminHeader title="Fleet Management" description="Manage your luxury vehicle inventory and details." />

      <main className="container pt-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search vehicles..."
              className="pl-10 bg-secondary border-border"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <div className="flex items-center bg-secondary rounded-lg p-1 mr-2 border border-border">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                className={`h-8 px-3 ${viewMode === "grid" ? "bg-gold text-gold-foreground hover:bg-gold/90" : "text-muted-foreground"}`}
                onClick={() => setViewMode("grid")}
              >
                <LayoutGrid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                className={`h-8 px-3 ${viewMode === "list" ? "bg-gold text-gold-foreground hover:bg-gold/90" : "text-muted-foreground"}`}
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
            <Button variant="outline" className="border-border">
              <Filter className="w-4 h-4 mr-2" /> Filter
            </Button>
            <Button className="bg-gold text-gold-foreground hover:bg-gold/90" onClick={handleAdd}>
              <Plus className="w-4 h-4 mr-2" /> Add Vehicle
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-gold" />
            <p className="text-sm text-muted-foreground">Loading fleet data...</p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFleet.map((vehicle) => (
              <Card key={vehicle.id} className="bg-card border-border overflow-hidden group">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2 flex gap-1.5">
                    <Badge className={vehicle.status === "Active" ? "bg-green-500 text-white" : "bg-gold text-gold-foreground"}>
                      {vehicle.status}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <p className="text-[10px] font-bold text-gold uppercase tracking-tighter mb-1">{vehicle.categoryLabel}</p>
                    <h3 className="font-serif text-xl font-bold text-foreground">{vehicle.name}</h3>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-6">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-gold" />
                      {vehicle.capacity} passengers
                    </div>
                    <div className="flex items-center gap-1.5">
                      <ChevronRight className="w-3.5 h-3.5 text-gold" />
                      {vehicle.price}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 border-border" onClick={() => setViewingVehicle(vehicle)}>
                      <Eye className="w-4 h-4 mr-2" /> View
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 border-border" onClick={() => { setEditingVehicle(vehicle); setIsAdding(false); }}>
                      <Edit className="w-4 h-4 mr-2" /> Edit
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" onClick={() => setDeleteConfirm(vehicle.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="bg-card border-border">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-border">
                  <TableHead className="w-[80px]">Image</TableHead>
                  <TableHead>Vehicle Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFleet.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                      No vehicles found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredFleet.map((vehicle) => (
                    <TableRow key={vehicle.id} className="border-border hover:bg-secondary/30">
                      <TableCell>
                        <img
                          src={vehicle.image}
                          alt={vehicle.name}
                          className="w-12 h-12 rounded object-cover border border-border"
                        />
                      </TableCell>
                      <TableCell className="font-medium text-foreground">
                        {vehicle.name}
                        <div className="text-[10px] text-muted-foreground font-mono">/{vehicle.slug}</div>
                      </TableCell>
                      <TableCell>
                        <span className="text-[10px] font-bold text-gold uppercase tracking-tighter">
                          {vehicle.categoryLabel}
                        </span>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {vehicle.capacity} Pax
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {vehicle.price}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={vehicle.status === "Active" ? "border-green-500/20 text-green-500 bg-green-500/5" : "border-gold/20 text-gold bg-gold/5"}>
                          {vehicle.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-gold" onClick={() => setViewingVehicle(vehicle)}>
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-gold" onClick={() => { setEditingVehicle(vehicle); setIsAdding(false); }}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => setDeleteConfirm(vehicle.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </Card>
        )}
      </main>

      {/* Viewing Sheet */}
      <Sheet open={!!viewingVehicle} onOpenChange={() => setViewingVehicle(null)}>
        <SheetContent className="bg-card border-border sm:max-w-md overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="font-serif text-foreground">Vehicle Details</SheetTitle>
          </SheetHeader>
          {viewingVehicle && (
            <div className="mt-6 space-y-6 pb-6">
              <img src={viewingVehicle.image} alt={viewingVehicle.name} className="w-full h-48 object-cover border border-border" />
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] font-bold text-gold uppercase tracking-tighter mb-1">{viewingVehicle.categoryLabel}</p>
                  <h3 className="text-2xl font-bold text-foreground">{viewingVehicle.name}</h3>
                </div>
                <div className="grid grid-cols-2 gap-y-2 text-xs">
                  <div><span className="text-muted-foreground">Capacity:</span> <span className="text-foreground ml-1">{viewingVehicle.capacity} Pax</span></div>
                  <div><span className="text-muted-foreground">Pricing:</span> <span className="text-foreground ml-1">{viewingVehicle.price}</span></div>
                  <div><span className="text-muted-foreground">Slug:</span> <span className="text-foreground ml-1">/fleet/{viewingVehicle.slug}</span></div>
                  <div><span className="text-muted-foreground">Status:</span> <Badge className={viewingVehicle.status === "Active" ? "bg-green-500/10 text-green-400 border-green-500/20 ml-1" : "bg-gold/10 text-gold border-gold/20 ml-1"}>{viewingVehicle.status}</Badge></div>
                </div>
                <p className="text-sm text-muted-foreground">{viewingVehicle.description}</p>

                {/* Gallery Preview */}
                <div>
                  <p className="text-xs font-semibold text-gold mb-2">Gallery ({viewingVehicle.gallery.length} images)</p>
                  <div className="grid grid-cols-4 gap-1">
                    {viewingVehicle.gallery.map((img: string, i: number) => (
                      <img key={i} src={img} alt={`Gallery ${i + 1}`} className="w-full h-16 object-cover border border-border" />
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div>
                  <p className="text-xs font-semibold text-gold mb-2">Features</p>
                  <div className="flex flex-wrap gap-1.5">
                    {viewingVehicle.features.map((f: string, i: number) => (
                      <Badge key={i} variant="outline" className="text-[10px] border-border text-muted-foreground">{f}</Badge>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <p className="text-xs font-semibold text-gold mb-2">Amenities</p>
                  <div className="flex flex-wrap gap-1.5">
                    {viewingVehicle.amenities.map((a: string, i: number) => (
                      <Badge key={i} variant="outline" className="text-[10px] border-border text-muted-foreground">{a}</Badge>
                    ))}
                  </div>
                </div>

                {/* Variants */}
                <div>
                  <p className="text-xs font-semibold text-gold mb-2">Variants ({viewingVehicle.variants.length})</p>
                  <div className="space-y-2">
                    {viewingVehicle.variants.map((v: any, i: number) => (
                      <div key={i} className="p-2.5 bg-secondary/50 border border-border text-xs">
                        <p className="font-medium text-foreground">{v.name}</p>
                        <p className="text-muted-foreground">{v.type} · {v.passengers} pax · Sweet spot: {v.sweetSpot}</p>
                      </div>
                    ))}
                  </div>
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
                  {editingVehicle.gallery.map((img: string, i: number) => (
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
                  {editingVehicle.features.map((f: string, i: number) => (
                    <div key={i} className="flex items-center gap-2">
                      <Input value={f} onChange={(e) => updateFeature(i, e.target.value)} className="bg-secondary border-border text-sm h-8" placeholder="Feature name" />
                      <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 text-destructive hover:text-destructive" onClick={() => setEditingVehicle({ ...editingVehicle, features: editingVehicle.features.filter((_: any, idx: number) => idx !== i) })}>
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
                  {editingVehicle.amenities.map((a: string, i: number) => (
                    <div key={i} className="flex items-center gap-2">
                      <Input value={a} onChange={(e) => updateAmenity(i, e.target.value)} className="bg-secondary border-border text-sm h-8" placeholder="Amenity name" />
                      <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 text-destructive hover:text-destructive" onClick={() => setEditingVehicle({ ...editingVehicle, amenities: editingVehicle.amenities.filter((_: any, idx: number) => idx !== i) })}>
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
                  {editingVehicle.variants.map((v: any, i: number) => (
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
