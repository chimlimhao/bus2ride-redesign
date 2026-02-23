import AdminHeader from "@/components/admin/AdminHeader";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2, Star, Check, X, Upload, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useState, useRef, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@bus2ride/shared/supabase";
import { uploadImage } from "@/lib/supabase-storage";
import type { Tables } from "@bus2ride/shared/supabase/types";

type DbTestimonial = Tables<"testimonials">;

interface TestimonialForm {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  status: string;
  avatar_url: string;
  sort_order: number;
}

const emptyForm: TestimonialForm = {
  id: "",
  name: "",
  role: "",
  content: "",
  rating: 5,
  status: "Draft",
  avatar_url: "",
  sort_order: 0,
};

function dbToForm(t: DbTestimonial): TestimonialForm {
  return {
    id: t.id,
    name: t.name,
    role: t.role || "",
    content: t.content,
    rating: t.rating || 5,
    status: t.status,
    avatar_url: t.avatar_url || "",
    sort_order: t.sort_order || 0,
  };
}

const AdminTestimonials = () => {
  const { toast } = useToast();
  const [testimonials, setTestimonials] = useState<DbTestimonial[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  const [editingItem, setEditingItem] = useState<TestimonialForm | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Fetch ──────────────────────────────────────────────────────────────────
  async function fetchTestimonials() {
    setLoadingData(true);
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      toast({ title: "Error loading testimonials", description: error.message, variant: "destructive" });
    } else {
      setTestimonials(data || []);
    }
    setLoadingData(false);
  }

  useEffect(() => { fetchTestimonials(); }, []);

  // ── Avatar upload ──────────────────────────────────────────────────────────
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingItem) return;
    setUploadingAvatar(true);
    try {
      const url = await uploadImage(file, "testimonial-avatars");
      setEditingItem({ ...editingItem, avatar_url: url });
    } catch (err: any) {
      toast({ title: "Upload failed", description: err.message, variant: "destructive" });
    } finally {
      setUploadingAvatar(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // ── Save ───────────────────────────────────────────────────────────────────
  const handleSave = async () => {
    if (!editingItem) return;
    setSaving(true);

    const payload = {
      name: editingItem.name,
      role: editingItem.role || null,
      content: editingItem.content,
      rating: editingItem.rating,
      status: editingItem.status,
      avatar_url: editingItem.avatar_url || null,
      sort_order: editingItem.sort_order,
    };

    let error;
    if (isAdding) {
      ({ error } = await supabase.from("testimonials").insert(payload));
    } else {
      ({ error } = await supabase.from("testimonials").update(payload).eq("id", editingItem.id));
    }

    if (error) {
      toast({ title: "Save failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: isAdding ? "Testimonial added" : "Testimonial updated", description: `"${editingItem.name}" saved successfully.` });
      setEditingItem(null);
      setIsAdding(false);
      fetchTestimonials();
    }
    setSaving(false);
  };

  // ── Delete ─────────────────────────────────────────────────────────────────
  const handleDelete = async (id: string) => {
    const item = testimonials.find(t => t.id === id);
    const { error } = await supabase.from("testimonials").delete().eq("id", id);
    if (error) {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Testimonial deleted", description: `"${item?.name}" has been removed.` });
      setDeleteConfirm(null);
      fetchTestimonials();
    }
  };

  // ── Quick status toggle ────────────────────────────────────────────────────
  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("testimonials").update({ status }).eq("id", id);
    if (error) {
      toast({ title: "Update failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: `Testimonial ${status === "Published" ? "published" : "unpublished"}` });
      fetchTestimonials();
    }
  };

  const pendingCount = testimonials.filter(t => t.status === "Draft").length;

  return (
    <div>
      <AdminHeader title="Testimonials" description="Review and manage customer testimonials." />

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <p className="text-sm text-muted-foreground">
              {loadingData ? "Loading..." : `${testimonials.length} total`}
            </p>
            {pendingCount > 0 && (
              <Badge className="bg-gold/10 text-gold border-gold/20">
                {pendingCount} draft
              </Badge>
            )}
          </div>
          <Button
            className="gap-2 bg-gold text-gold-foreground hover:bg-gold/90"
            size="sm"
            onClick={() => { setEditingItem({ ...emptyForm }); setIsAdding(true); }}
          >
            <Plus className="w-4 h-4" /> Add Testimonial
          </Button>
        </div>

        <div className="card-luxury overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">Customer</TableHead>
                <TableHead className="text-muted-foreground">Rating</TableHead>
                <TableHead className="text-muted-foreground">Excerpt</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loadingData ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-12">
                    <Loader2 className="w-6 h-6 animate-spin text-gold mx-auto" />
                  </TableCell>
                </TableRow>
              ) : testimonials.map((t) => (
                <TableRow key={t.id} className="border-border hover:bg-secondary/30">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-secondary border border-border shrink-0">
                        {t.avatar_url
                          ? <img src={t.avatar_url} alt={t.name} className="w-full h-full object-cover" />
                          : <div className="w-full h-full bg-gold/20 flex items-center justify-center text-gold text-xs font-bold">
                            {t.name.charAt(0)}
                          </div>
                        }
                      </div>
                      <div>
                        <span className="font-medium text-foreground text-sm">{t.name}</span>
                        <p className="text-xs text-muted-foreground">{t.role}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: t.rating || 5 }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-xs max-w-[200px] truncate">
                    {t.content}
                  </TableCell>
                  <TableCell>
                    <Badge className={
                      t.status === "Published"
                        ? "bg-green-500/10 text-green-400 border-green-500/20"
                        : "bg-gold/10 text-gold border-gold/20"
                    }>
                      {t.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      {t.status === "Draft" && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 text-xs gap-1.5 border-green-500/30 text-green-400 hover:bg-green-500/10 hover:text-green-400"
                          onClick={() => updateStatus(t.id, "Published")}
                        >
                          <Check className="w-3 h-3" /> Publish
                        </Button>
                      )}
                      {t.status === "Published" && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 text-xs gap-1.5 border-border text-muted-foreground hover:text-foreground"
                          onClick={() => updateStatus(t.id, "Draft")}
                        >
                          <X className="w-3 h-3" /> Unpublish
                        </Button>
                      )}
                      <Button
                        variant="ghost" size="icon" className="h-8 w-8"
                        onClick={() => { setEditingItem(dbToForm(t)); setIsAdding(false); }}
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => setDeleteConfirm(t.id)}
                      >
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

      {/* ── Edit / Add Sheet ──────────────────────────────────────────────────── */}
      <Sheet open={!!editingItem} onOpenChange={() => { setEditingItem(null); setIsAdding(false); }}>
        <SheetContent className="bg-card border-border sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="font-serif text-foreground">
              {isAdding ? "Add Testimonial" : "Edit Testimonial"}
            </SheetTitle>
          </SheetHeader>
          {editingItem && (
            <div className="space-y-4 mt-4">
              {/* Avatar + Name/Role */}
              <div className="flex items-center gap-4">
                <div
                  className="w-16 h-16 rounded-full overflow-hidden bg-secondary border border-border shrink-0 relative group cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {editingItem.avatar_url
                    ? <img src={editingItem.avatar_url} alt="" className="w-full h-full object-cover" />
                    : <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      {uploadingAvatar ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
                    </div>
                  }
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-full">
                    {uploadingAvatar
                      ? <Loader2 className="w-4 h-4 text-white animate-spin" />
                      : <Upload className="w-4 h-4 text-white" />
                    }
                  </div>
                </div>
                <div className="flex-1 grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label className="text-foreground">Name</Label>
                    <Input
                      value={editingItem.name}
                      onChange={e => setEditingItem({ ...editingItem, name: e.target.value })}
                      className="bg-secondary border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-foreground">Role / Event</Label>
                    <Input
                      value={editingItem.role}
                      onChange={e => setEditingItem({ ...editingItem, role: e.target.value })}
                      className="bg-secondary border-border"
                      placeholder="e.g. Wedding Client"
                    />
                  </div>
                </div>
              </div>
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />

              {/* Rating / Status / Sort */}
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-2">
                  <Label className="text-foreground">Rating</Label>
                  <Select
                    value={String(editingItem.rating)}
                    onValueChange={val => setEditingItem({ ...editingItem, rating: parseInt(val) })}
                  >
                    <SelectTrigger className="bg-secondary border-border"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map(n => (
                        <SelectItem key={n} value={String(n)}>{n} Star{n > 1 ? "s" : ""}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-foreground">Status</Label>
                  <Select
                    value={editingItem.status}
                    onValueChange={val => setEditingItem({ ...editingItem, status: val })}
                  >
                    <SelectTrigger className="bg-secondary border-border"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Published">Published</SelectItem>
                      <SelectItem value="Draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-foreground">Sort Order</Label>
                  <Input
                    type="number"
                    value={editingItem.sort_order}
                    onChange={e => setEditingItem({ ...editingItem, sort_order: parseInt(e.target.value) || 0 })}
                    className="bg-secondary border-border"
                  />
                </div>
              </div>

              {/* Testimonial Text */}
              <div className="space-y-2">
                <Label className="text-foreground">Testimonial Text</Label>
                <Textarea
                  value={editingItem.content}
                  onChange={e => setEditingItem({ ...editingItem, content: e.target.value })}
                  className="bg-secondary border-border"
                  rows={4}
                  placeholder="What did the customer say?"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={() => { setEditingItem(null); setIsAdding(false); }}>
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

      {/* ── Delete Confirmation ───────────────────────────────────────────────── */}
      <Sheet open={deleteConfirm !== null} onOpenChange={() => setDeleteConfirm(null)}>
        <SheetContent className="bg-card border-border sm:max-w-sm">
          <SheetHeader>
            <SheetTitle className="font-serif text-foreground">Delete Testimonial</SheetTitle>
          </SheetHeader>
          <div className="mt-4 space-y-4">
            <p className="text-sm text-muted-foreground">Are you sure? This action cannot be undone.</p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setDeleteConfirm(null)}>Cancel</Button>
              <Button
                variant="destructive"
                onClick={() => deleteConfirm !== null && handleDelete(deleteConfirm)}
              >
                Delete
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AdminTestimonials;
