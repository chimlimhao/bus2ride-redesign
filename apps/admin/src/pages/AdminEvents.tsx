import AdminHeader from "@/components/admin/AdminHeader";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2, Eye, Upload, X, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useState, useRef, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@bus2ride/shared/supabase";
import { uploadImage } from "@/lib/supabase-storage";
import type { Tables } from "@bus2ride/shared/supabase/types";

type DbEvent = Tables<"events">;

interface PopularVehicle {
  title: string;
  passengers: string;
  id: string;
}

// Working form data shape (maps DB fields to friendlier names for the form)
interface EventFormData {
  id: string;
  title: string;
  slug: string;
  event_type: string;
  status: string;
  image_url: string;
  subtitle: string;
  description: string;
  features: string[];
  popular_vehicles: PopularVehicle[];
  tips: string[];
  feature_image_url: string;
  sort_order: number;
}

const emptyForm: EventFormData = {
  id: "",
  title: "",
  slug: "",
  event_type: "Event",
  status: "Draft",
  image_url: "",
  subtitle: "",
  description: "",
  feature_image_url: "",
  features: [],
  popular_vehicles: [],
  tips: [],
  sort_order: 0,
};

function dbToForm(e: DbEvent): EventFormData {
  return {
    id: e.id,
    title: e.title,
    slug: e.slug,
    event_type: e.event_type || "Event",
    status: e.status,
    image_url: e.image_url || "",
    subtitle: e.subtitle || "",
    description: e.description || "",
    feature_image_url: e.feature_image_url || "",
    features: e.features || [],
    popular_vehicles: (e.popular_vehicles as unknown as PopularVehicle[]) || [],
    tips: e.tips || [],
    sort_order: e.sort_order || 0,
  };
}

const AdminEvents = () => {
  const { toast } = useToast();
  const [events, setEvents] = useState<DbEvent[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingHero, setUploadingHero] = useState(false);
  const [uploadingFeature, setUploadingFeature] = useState(false);

  const [editingEvent, setEditingEvent] = useState<EventFormData | null>(null);
  const [viewingEvent, setViewingEvent] = useState<DbEvent | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const heroInputRef = useRef<HTMLInputElement>(null);
  const featureInputRef = useRef<HTMLInputElement>(null);

  // ── Fetch ──────────────────────────────────────────────────────────────────
  async function fetchEvents() {
    setLoadingData(true);
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      toast({ title: "Error loading events", description: error.message, variant: "destructive" });
    } else {
      setEvents(data || []);
    }
    setLoadingData(false);
  }

  useEffect(() => { fetchEvents(); }, []);

  // ── Image upload ───────────────────────────────────────────────────────────
  const handleImageUpload = async (
    ref: React.RefObject<HTMLInputElement>,
    field: "image_url" | "feature_image_url",
    setUploading: (v: boolean) => void
  ) => {
    const file = ref.current?.files?.[0];
    if (!file || !editingEvent) return;
    setUploading(true);
    try {
      const url = await uploadImage(file, "event-images");
      setEditingEvent({ ...editingEvent, [field]: url });
    } catch (err: any) {
      toast({ title: "Upload failed", description: err.message, variant: "destructive" });
    } finally {
      setUploading(false);
      if (ref.current) ref.current.value = "";
    }
  };

  // ── Save (create or update) ────────────────────────────────────────────────
  const handleSave = async () => {
    if (!editingEvent) return;
    setSaving(true);

    const payload = {
      title: editingEvent.title,
      slug: editingEvent.slug,
      event_type: editingEvent.event_type,
      status: editingEvent.status,
      image_url: editingEvent.image_url || null,
      subtitle: editingEvent.subtitle || null,
      description: editingEvent.description || null,
      feature_image_url: editingEvent.feature_image_url || null,
      features: editingEvent.features,
      popular_vehicles: editingEvent.popular_vehicles as any,
      tips: editingEvent.tips,
      sort_order: editingEvent.sort_order,
    };

    let error;
    if (isAdding) {
      ({ error } = await supabase.from("events").insert(payload));
    } else {
      ({ error } = await supabase.from("events").update(payload).eq("id", editingEvent.id));
    }

    if (error) {
      toast({ title: "Save failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: isAdding ? "Event created" : "Event updated", description: `"${editingEvent.title}" saved successfully.` });
      setEditingEvent(null);
      setIsAdding(false);
      fetchEvents();
    }
    setSaving(false);
  };

  // ── Delete ─────────────────────────────────────────────────────────────────
  const handleDelete = async (id: string) => {
    const event = events.find(e => e.id === id);
    const { error } = await supabase.from("events").delete().eq("id", id);
    if (error) {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Event deleted", description: `"${event?.title}" has been removed.` });
      setDeleteConfirm(null);
      fetchEvents();
    }
  };

  // ── Feature / tip / vehicle helpers ──────────────────────────────────────
  const arrayHelper = (field: "features" | "tips") => ({
    add: () => editingEvent && setEditingEvent({ ...editingEvent, [field]: [...editingEvent[field], ""] }),
    update: (i: number, val: string) => {
      if (!editingEvent) return;
      const arr = [...editingEvent[field]];
      arr[i] = val;
      setEditingEvent({ ...editingEvent, [field]: arr });
    },
    remove: (i: number) => editingEvent && setEditingEvent({
      ...editingEvent,
      [field]: editingEvent[field].filter((_, idx) => idx !== i),
    }),
  });
  const feat = arrayHelper("features");
  const tip = arrayHelper("tips");

  const addVehicle = () => editingEvent && setEditingEvent({
    ...editingEvent,
    popular_vehicles: [...editingEvent.popular_vehicles, { title: "", passengers: "", id: "" }],
  });
  const updateVehicle = (i: number, field: keyof PopularVehicle, val: string) => {
    if (!editingEvent) return;
    const updated = [...editingEvent.popular_vehicles];
    updated[i] = { ...updated[i], [field]: val };
    setEditingEvent({ ...editingEvent, popular_vehicles: updated });
  };
  const removeVehicle = (i: number) => editingEvent && setEditingEvent({
    ...editingEvent,
    popular_vehicles: editingEvent.popular_vehicles.filter((_, idx) => idx !== i),
  });

  // ── Small image upload box ───────────────────────────────────────────────
  const ImageUploadBox = ({ src, onClick, label, loading: imgLoading }: {
    src: string; onClick: () => void; label: string; loading?: boolean;
  }) => (
    <div
      className="w-full h-36 bg-secondary border border-border overflow-hidden relative group cursor-pointer"
      onClick={onClick}
    >
      {src ? (
        <img src={src} alt={label} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground gap-1">
          <Upload className="w-5 h-5" />
          <span className="text-xs">{label}</span>
        </div>
      )}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        {imgLoading ? (
          <Loader2 className="w-5 h-5 text-white animate-spin" />
        ) : (
          <span className="text-white text-xs flex items-center gap-1">
            <Upload className="w-3 h-3" /> Change
          </span>
        )}
      </div>
    </div>
  );

  return (
    <div>
      <AdminHeader title="Events & Services" description="Manage your event types and service offerings." />

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            {loadingData ? "Loading..." : `${events.length} items total`}
          </p>
          <Button
            className="gap-2 bg-gold text-gold-foreground hover:bg-gold/90"
            size="sm"
            onClick={() => { setEditingEvent({ ...emptyForm }); setIsAdding(true); }}
          >
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
              {loadingData ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-12">
                    <Loader2 className="w-6 h-6 animate-spin text-gold mx-auto" />
                  </TableCell>
                </TableRow>
              ) : events.map((event) => (
                <TableRow key={event.id} className="border-border hover:bg-secondary/30">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-8 bg-secondary border border-border overflow-hidden flex-shrink-0">
                        {event.image_url && (
                          <img src={event.image_url} alt={event.title} className="w-full h-full object-cover" />
                        )}
                      </div>
                      <span className="font-medium text-foreground">{event.title}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-xs font-mono">/events/{event.slug}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-border text-muted-foreground">
                      {event.event_type || "Event"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{event.features?.length || 0}</TableCell>
                  <TableCell>
                    <Badge className={event.status === "Published"
                      ? "bg-green-500/10 text-green-400 border-green-500/20"
                      : "bg-gold/10 text-gold border-gold/20"}>
                      {event.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setViewingEvent(event)}>
                        <Eye className="w-3.5 h-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8"
                        onClick={() => { setEditingEvent(dbToForm(event)); setIsAdding(false); }}>
                        <Pencil className="w-3.5 h-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => setDeleteConfirm(event.id)}>
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* ── View Sheet ───────────────────────────────────────────────────────── */}
      <Sheet open={!!viewingEvent} onOpenChange={() => setViewingEvent(null)}>
        <SheetContent className="bg-card border-border sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="font-serif text-foreground">{viewingEvent?.title}</SheetTitle>
          </SheetHeader>
          {viewingEvent && (
            <div className="space-y-4 mt-4">
              {viewingEvent.image_url && (
                <img src={viewingEvent.image_url} alt={viewingEvent.title} className="w-full h-40 object-cover border border-border" />
              )}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted-foreground">Slug:</span>
                  <span className="text-foreground ml-1 font-mono text-xs">/events/{viewingEvent.slug}</span></div>
                <div><span className="text-muted-foreground">Type:</span>
                  <Badge variant="outline" className="ml-1">{viewingEvent.event_type || "Event"}</Badge></div>
                <div><span className="text-muted-foreground">Status:</span>
                  <Badge className={`ml-1 ${viewingEvent.status === "Published"
                    ? "bg-green-500/10 text-green-400 border-green-500/20"
                    : "bg-gold/10 text-gold border-gold/20"}`}>{viewingEvent.status}</Badge></div>
                <div><span className="text-muted-foreground">Sort Order:</span>
                  <span className="text-foreground ml-1">{viewingEvent.sort_order ?? "-"}</span></div>
              </div>
              {viewingEvent.subtitle && (
                <p className="text-sm text-muted-foreground italic">{viewingEvent.subtitle}</p>
              )}
              {viewingEvent.description && (
                <p className="text-sm text-muted-foreground">{viewingEvent.description}</p>
              )}
              {viewingEvent.feature_image_url && (
                <div>
                  <Label className="text-xs text-muted-foreground">Feature Section Image</Label>
                  <img src={viewingEvent.feature_image_url} alt="Feature" className="w-full h-32 object-cover border border-border mt-1" />
                </div>
              )}
              {(viewingEvent.features?.length ?? 0) > 0 && (
                <div>
                  <Label className="text-xs text-muted-foreground">What We Offer ({viewingEvent.features!.length})</Label>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {viewingEvent.features!.map((f, i) => (
                      <Badge key={i} variant="outline" className="border-gold/30 text-gold text-xs">{f}</Badge>
                    ))}
                  </div>
                </div>
              )}
              {((viewingEvent.popular_vehicles as unknown as PopularVehicle[])?.length ?? 0) > 0 && (
                <div>
                  <Label className="text-xs text-muted-foreground">
                    Popular Vehicles ({(viewingEvent.popular_vehicles as unknown as PopularVehicle[]).length})
                  </Label>
                  <div className="space-y-1 mt-1">
                    {(viewingEvent.popular_vehicles as unknown as PopularVehicle[]).map((v, i) => (
                      <div key={i} className="text-sm text-foreground flex justify-between">
                        <span>{v.title}</span>
                        <span className="text-muted-foreground text-xs">{v.passengers} pax → /fleet/{v.id}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {(viewingEvent.tips?.length ?? 0) > 0 && (
                <div>
                  <Label className="text-xs text-muted-foreground">Planning Tips ({viewingEvent.tips!.length})</Label>
                  <ul className="mt-1 space-y-1">
                    {viewingEvent.tips!.map((t, i) => (
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

      {/* ── Edit / Add Sheet ──────────────────────────────────────────────────  */}
      <Sheet open={!!editingEvent} onOpenChange={() => { setEditingEvent(null); setIsAdding(false); }}>
        <SheetContent className="bg-card border-border sm:max-w-xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="font-serif text-foreground">
              {isAdding ? "Add Event / Service" : "Edit Event / Service"}
            </SheetTitle>
          </SheetHeader>
          {editingEvent && (
            <div className="space-y-5 mt-4 pb-6">
              {/* Hero Image */}
              <div>
                <Label className="text-foreground text-xs mb-1 block">Hero Image</Label>
                <ImageUploadBox
                  src={editingEvent.image_url}
                  onClick={() => heroInputRef.current?.click()}
                  label="Click to upload hero image"
                  loading={uploadingHero}
                />
                <input
                  ref={heroInputRef} type="file" accept="image/*" className="hidden"
                  onChange={() => handleImageUpload(heroInputRef, "image_url", setUploadingHero)}
                />
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-foreground text-xs">Title</Label>
                  <Input value={editingEvent.title}
                    onChange={e => setEditingEvent({ ...editingEvent, title: e.target.value })}
                    className="bg-secondary border-border" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-foreground text-xs">URL Slug</Label>
                  <Input value={editingEvent.slug}
                    onChange={e => setEditingEvent({ ...editingEvent, slug: e.target.value })}
                    className="bg-secondary border-border font-mono text-xs" placeholder="e.g. weddings" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-foreground text-xs">Type</Label>
                  <Select value={editingEvent.event_type}
                    onValueChange={val => setEditingEvent({ ...editingEvent, event_type: val })}>
                    <SelectTrigger className="bg-secondary border-border"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Event">Event</SelectItem>
                      <SelectItem value="Service">Service</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-foreground text-xs">Status</Label>
                  <Select value={editingEvent.status}
                    onValueChange={val => setEditingEvent({ ...editingEvent, status: val })}>
                    <SelectTrigger className="bg-secondary border-border"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Published">Published</SelectItem>
                      <SelectItem value="Draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-foreground text-xs">Sort Order</Label>
                  <Input type="number" value={editingEvent.sort_order}
                    onChange={e => setEditingEvent({ ...editingEvent, sort_order: parseInt(e.target.value) || 0 })}
                    className="bg-secondary border-border" />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-foreground text-xs">Subtitle</Label>
                <Input value={editingEvent.subtitle}
                  onChange={e => setEditingEvent({ ...editingEvent, subtitle: e.target.value })}
                  className="bg-secondary border-border" placeholder="Short tagline for the hero" />
              </div>

              <div className="space-y-1.5">
                <Label className="text-foreground text-xs">Description</Label>
                <Textarea value={editingEvent.description}
                  onChange={e => setEditingEvent({ ...editingEvent, description: e.target.value })}
                  className="bg-secondary border-border" rows={3} />
              </div>

              <Separator className="border-border" />

              {/* Feature Section Image */}
              <div>
                <Label className="text-foreground text-xs mb-1 block">"What We Offer" Section Image</Label>
                <ImageUploadBox
                  src={editingEvent.feature_image_url}
                  onClick={() => featureInputRef.current?.click()}
                  label="Click to upload feature image"
                  loading={uploadingFeature}
                />
                <input
                  ref={featureInputRef} type="file" accept="image/*" className="hidden"
                  onChange={() => handleImageUpload(featureInputRef, "feature_image_url", setUploadingFeature)}
                />
              </div>

              {/* Features */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-foreground text-xs">What We Offer ({editingEvent.features.length})</Label>
                  <Button variant="outline" size="sm" className="h-7 text-xs gap-1" onClick={feat.add}>
                    <Plus className="w-3 h-3" /> Add
                  </Button>
                </div>
                <div className="space-y-2">
                  {editingEvent.features.map((f, i) => (
                    <div key={i} className="flex gap-2">
                      <Input value={f} onChange={e => feat.update(i, e.target.value)}
                        className="bg-secondary border-border text-sm" placeholder="Feature name" />
                      <Button variant="ghost" size="icon" className="h-9 w-9 text-destructive hover:text-destructive flex-shrink-0"
                        onClick={() => feat.remove(i)}><X className="w-3.5 h-3.5" /></Button>
                    </div>
                  ))}
                  {editingEvent.features.length === 0 && (
                    <p className="text-xs text-muted-foreground italic">No features added yet.</p>
                  )}
                </div>
              </div>

              <Separator className="border-border" />

              {/* Popular Vehicles */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-foreground text-xs">Popular Vehicles ({editingEvent.popular_vehicles.length})</Label>
                  <Button variant="outline" size="sm" className="h-7 text-xs gap-1" onClick={addVehicle}>
                    <Plus className="w-3 h-3" /> Add
                  </Button>
                </div>
                <div className="space-y-3">
                  {editingEvent.popular_vehicles.map((v, i) => (
                    <div key={i} className="bg-secondary/50 border border-border p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Vehicle {i + 1}</span>
                        <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive hover:text-destructive"
                          onClick={() => removeVehicle(i)}><X className="w-3 h-3" /></Button>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <Input value={v.title} onChange={e => updateVehicle(i, "title", e.target.value)}
                          className="bg-secondary border-border text-xs" placeholder="Title" />
                        <Input value={v.passengers} onChange={e => updateVehicle(i, "passengers", e.target.value)}
                          className="bg-secondary border-border text-xs" placeholder="e.g. 6-18" />
                        <Input value={v.id} onChange={e => updateVehicle(i, "id", e.target.value)}
                          className="bg-secondary border-border text-xs font-mono" placeholder="fleet slug" />
                      </div>
                    </div>
                  ))}
                  {editingEvent.popular_vehicles.length === 0 && (
                    <p className="text-xs text-muted-foreground italic">No vehicles linked yet.</p>
                  )}
                </div>
              </div>

              <Separator className="border-border" />

              {/* Tips */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-foreground text-xs">Planning Tips ({editingEvent.tips.length})</Label>
                  <Button variant="outline" size="sm" className="h-7 text-xs gap-1" onClick={tip.add}>
                    <Plus className="w-3 h-3" /> Add
                  </Button>
                </div>
                <div className="space-y-2">
                  {editingEvent.tips.map((t, i) => (
                    <div key={i} className="flex gap-2">
                      <span className="flex items-center justify-center w-6 h-9 text-xs text-gold font-bold flex-shrink-0">{i + 1}</span>
                      <Input value={t} onChange={e => tip.update(i, e.target.value)}
                        className="bg-secondary border-border text-sm" placeholder="Planning tip" />
                      <Button variant="ghost" size="icon" className="h-9 w-9 text-destructive hover:text-destructive flex-shrink-0"
                        onClick={() => tip.remove(i)}><X className="w-3.5 h-3.5" /></Button>
                    </div>
                  ))}
                  {editingEvent.tips.length === 0 && (
                    <p className="text-xs text-muted-foreground italic">No tips added yet.</p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={() => { setEditingEvent(null); setIsAdding(false); }}>
                  Cancel
                </Button>
                <Button
                  className="bg-gold text-gold-foreground hover:bg-gold/90"
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving…</> : isAdding ? "Add" : "Save Changes"}
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* ── Delete Confirmation ───────────────────────────────────────────────  */}
      <Sheet open={deleteConfirm !== null} onOpenChange={() => setDeleteConfirm(null)}>
        <SheetContent className="bg-card border-border sm:max-w-sm">
          <SheetHeader>
            <SheetTitle className="font-serif text-foreground">Delete Event</SheetTitle>
          </SheetHeader>
          <div className="mt-4 space-y-4">
            <p className="text-sm text-muted-foreground">
              Are you sure you want to remove this event? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setDeleteConfirm(null)}>Cancel</Button>
              <Button variant="destructive" onClick={() => deleteConfirm && handleDelete(deleteConfirm)}>
                Delete
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AdminEvents;
