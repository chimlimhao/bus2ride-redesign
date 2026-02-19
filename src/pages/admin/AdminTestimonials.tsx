import AdminHeader from "@/components/admin/AdminHeader";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2, Star, Check, X, Upload } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

interface Testimonial {
  id: number;
  name: string;
  event: string;
  rating: number;
  status: string;
  text: string;
  image: string;
  role: string;
}

const initialTestimonials: Testimonial[] = [
  { id: 1, name: "Jennifer Martinez", event: "Wedding", rating: 5, status: "Approved", text: "Bus2Ride made our wedding day absolutely perfect. The limousine was immaculate, and our chauffeur was professional and punctual.", image: "https://randomuser.me/api/portraits/women/1.jpg", role: "Wedding Client" },
  { id: 2, name: "Michael Chen", event: "Corporate", rating: 5, status: "Pending", text: "We've used Bus2Ride for multiple corporate events. Their coach buses are always clean, drivers are professional.", image: "https://randomuser.me/api/portraits/men/2.jpg", role: "Corporate Event Planner" },
  { id: 3, name: "Sarah Johnson", event: "Prom", rating: 5, status: "Approved", text: "As a parent, safety was my top priority. Bus2Ride exceeded all expectations.", image: "https://randomuser.me/api/portraits/women/3.jpg", role: "Prom Parent" },
  { id: 4, name: "David Thompson", event: "Bachelor Party", rating: 5, status: "Approved", text: "The party bus was a hit at my bachelor party! Great sound system, comfortable seating.", image: "https://randomuser.me/api/portraits/men/4.jpg", role: "Bachelor Party" },
  { id: 5, name: "Amanda Roberts", event: "Corporate", rating: 5, status: "Pending", text: "Professional service from start to finish. The booking process was seamless.", image: "https://randomuser.me/api/portraits/women/5.jpg", role: "Corporate Client" },
];

const AdminTestimonials = () => {
  const { toast } = useToast();
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAdd = () => {
    setEditingItem({ id: Date.now(), name: "", event: "", rating: 5, status: "Pending", text: "", image: "", role: "" });
    setIsAdding(true);
  };

  const handleSave = () => {
    if (!editingItem) return;
    if (isAdding) {
      setTestimonials((prev) => [...prev, editingItem]);
      toast({ title: "Testimonial added" });
    } else {
      setTestimonials((prev) => prev.map((t) => t.id === editingItem.id ? editingItem : t));
      toast({ title: "Testimonial updated" });
    }
    setEditingItem(null);
    setIsAdding(false);
  };

  const handleDelete = (id: number) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
    toast({ title: "Testimonial removed" });
    setDeleteConfirm(null);
  };

  const handleApprove = (id: number) => {
    setTestimonials((prev) => prev.map((t) => t.id === id ? { ...t, status: "Approved" } : t));
    toast({ title: "Testimonial approved" });
  };

  const handleReject = (id: number) => {
    setTestimonials((prev) => prev.map((t) => t.id === id ? { ...t, status: "Rejected" } : t));
    toast({ title: "Testimonial rejected" });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingItem) {
      const url = URL.createObjectURL(file);
      setEditingItem({ ...editingItem, image: url });
    }
  };

  return (
    <div>
      <AdminHeader title="Testimonials" description="Review and manage customer testimonials." />

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <p className="text-sm text-muted-foreground">{testimonials.length} total</p>
            <Badge className="bg-gold/10 text-gold border-gold/20">
              {testimonials.filter(t => t.status === "Pending").length} pending
            </Badge>
          </div>
          <Button className="gap-2 bg-gold text-gold-foreground hover:bg-gold/90" size="sm" onClick={handleAdd}>
            <Plus className="w-4 h-4" /> Add Testimonial
          </Button>
        </div>

        <div className="card-luxury overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">Customer</TableHead>
                <TableHead className="text-muted-foreground">Event</TableHead>
                <TableHead className="text-muted-foreground">Rating</TableHead>
                <TableHead className="text-muted-foreground">Excerpt</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {testimonials.map((t) => (
                <TableRow key={t.id} className="border-border hover:bg-secondary/30">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-secondary border border-border shrink-0">
                        {t.image ? <img src={t.image} alt={t.name} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gold/20" />}
                      </div>
                      <div>
                        <span className="font-medium text-foreground text-sm">{t.name}</span>
                        <p className="text-xs text-muted-foreground">{t.role}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{t.event}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-xs max-w-[200px] truncate">{t.text}</TableCell>
                  <TableCell>
                    <Badge className={t.status === "Approved" ? "bg-green-500/10 text-green-400 border-green-500/20" : t.status === "Rejected" ? "bg-destructive/10 text-destructive border-destructive/20" : "bg-gold/10 text-gold border-gold/20"}>
                      {t.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      {t.status === "Pending" && (
                        <>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-green-400 hover:text-green-400" onClick={() => handleApprove(t.id)}><Check className="w-3.5 h-3.5" /></Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => handleReject(t.id)}><X className="w-3.5 h-3.5" /></Button>
                        </>
                      )}
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setEditingItem({ ...t }); setIsAdding(false); }}><Pencil className="w-3.5 h-3.5" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => setDeleteConfirm(t.id)}><Trash2 className="w-3.5 h-3.5" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Edit/Add Sheet */}
      <Sheet open={!!editingItem} onOpenChange={() => { setEditingItem(null); setIsAdding(false); }}>
        <SheetContent className="bg-card border-border sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="font-serif text-foreground">{isAdding ? "Add Testimonial" : "Edit Testimonial"}</SheetTitle>
          </SheetHeader>
          {editingItem && (
            <div className="space-y-4 mt-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-secondary border border-border shrink-0 relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                  {editingItem.image ? <img src={editingItem.image} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-muted-foreground"><Upload className="w-5 h-5" /></div>}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-full">
                    <Upload className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="flex-1 grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label className="text-foreground">Name</Label>
                    <Input value={editingItem.name} onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })} className="bg-secondary border-border" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-foreground">Role</Label>
                    <Input value={editingItem.role} onChange={(e) => setEditingItem({ ...editingItem, role: e.target.value })} className="bg-secondary border-border" />
                  </div>
                </div>
              </div>
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-2">
                  <Label className="text-foreground">Event</Label>
                  <Input value={editingItem.event} onChange={(e) => setEditingItem({ ...editingItem, event: e.target.value })} className="bg-secondary border-border" />
                </div>
                <div className="space-y-2">
                  <Label className="text-foreground">Rating</Label>
                  <Select value={String(editingItem.rating)} onValueChange={(val) => setEditingItem({ ...editingItem, rating: parseInt(val) })}>
                    <SelectTrigger className="bg-secondary border-border"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {[1,2,3,4,5].map(n => <SelectItem key={n} value={String(n)}>{n} Star{n > 1 ? "s" : ""}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-foreground">Status</Label>
                  <Select value={editingItem.status} onValueChange={(val) => setEditingItem({ ...editingItem, status: val })}>
                    <SelectTrigger className="bg-secondary border-border"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Approved">Approved</SelectItem>
                      <SelectItem value="Rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Testimonial Text</Label>
                <Textarea value={editingItem.text} onChange={(e) => setEditingItem({ ...editingItem, text: e.target.value })} className="bg-secondary border-border" rows={4} />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={() => { setEditingItem(null); setIsAdding(false); }}>Cancel</Button>
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
            <SheetTitle className="font-serif text-foreground">Delete Testimonial</SheetTitle>
          </SheetHeader>
          <div className="mt-4 space-y-4">
            <p className="text-sm text-muted-foreground">Are you sure? This action cannot be undone.</p>
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

export default AdminTestimonials;
