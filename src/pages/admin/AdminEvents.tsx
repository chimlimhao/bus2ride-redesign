import AdminHeader from "@/components/admin/AdminHeader";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2, Eye, Upload } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

interface EventItem {
  id: number;
  name: string;
  type: string;
  status: string;
  bookings: number;
  image: string;
  description: string;
}

const initialEvents: EventItem[] = [
  { id: 1, name: "Wedding Transportation", type: "Service", status: "Published", bookings: 18, image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800", description: "Elegant transportation for your special day." },
  { id: 2, name: "Prom Night", type: "Event", status: "Published", bookings: 32, image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800", description: "Safe and stylish rides for school events." },
  { id: 3, name: "Corporate Events", type: "Service", status: "Published", bookings: 14, image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800", description: "Professional transportation for business." },
  { id: 4, name: "Birthday Celebrations", type: "Event", status: "Draft", bookings: 0, image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=800", description: "Party buses for birthday celebrations." },
  { id: 5, name: "Airport Transfers", type: "Service", status: "Published", bookings: 45, image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800", description: "Reliable airport pickup and drop-off." },
  { id: 6, name: "Bachelor/Bachelorette", type: "Event", status: "Published", bookings: 22, image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=800", description: "Party buses and limos for celebrations." },
  { id: 7, name: "Wine Tours", type: "Event", status: "Published", bookings: 9, image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=800", description: "Tour vineyards in luxury and comfort." },
];

const AdminEvents = () => {
  const { toast } = useToast();
  const [events, setEvents] = useState<EventItem[]>(initialEvents);
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);
  const [viewingEvent, setViewingEvent] = useState<EventItem | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAdd = () => {
    setEditingEvent({ id: Date.now(), name: "", type: "Event", status: "Draft", bookings: 0, image: "", description: "" });
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingEvent) {
      const url = URL.createObjectURL(file);
      setEditingEvent({ ...editingEvent, image: url });
    }
  };

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
                <TableHead className="text-muted-foreground">Type</TableHead>
                <TableHead className="text-muted-foreground">Bookings</TableHead>
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
                  <TableCell>
                    <Badge variant="outline" className="border-border text-muted-foreground">{event.type}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{event.bookings}</TableCell>
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

      {/* View Dialog */}
      <Dialog open={!!viewingEvent} onOpenChange={() => setViewingEvent(null)}>
        <DialogContent className="bg-card border-border max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-foreground">{viewingEvent?.name}</DialogTitle>
          </DialogHeader>
          {viewingEvent && (
            <div className="space-y-4">
              {viewingEvent.image && <img src={viewingEvent.image} alt={viewingEvent.name} className="w-full h-48 object-cover border border-border" />}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted-foreground">Type:</span> <Badge variant="outline" className="ml-1">{viewingEvent.type}</Badge></div>
                <div><span className="text-muted-foreground">Bookings:</span> <span className="text-foreground ml-1">{viewingEvent.bookings}</span></div>
                <div><span className="text-muted-foreground">Status:</span> <Badge className={viewingEvent.status === "Published" ? "bg-green-500/10 text-green-400 border-green-500/20 ml-1" : "bg-gold/10 text-gold border-gold/20 ml-1"}>{viewingEvent.status}</Badge></div>
              </div>
              <p className="text-sm text-muted-foreground">{viewingEvent.description}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit/Add Dialog */}
      <Dialog open={!!editingEvent} onOpenChange={() => { setEditingEvent(null); setIsAdding(false); }}>
        <DialogContent className="bg-card border-border max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-serif text-foreground">{isAdding ? "Add Event / Service" : "Edit Event / Service"}</DialogTitle>
          </DialogHeader>
          {editingEvent && (
            <div className="space-y-4">
              <div className="w-full h-40 bg-secondary border border-border overflow-hidden relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                {editingEvent.image ? (
                  <img src={editingEvent.image} alt={editingEvent.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground gap-1">
                    <Upload className="w-6 h-6" /><span className="text-xs">Click to upload image</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-sm flex items-center gap-1"><Upload className="w-4 h-4" /> Change Image</span>
                </div>
              </div>
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-foreground">Name</Label>
                  <Input value={editingEvent.name} onChange={(e) => setEditingEvent({ ...editingEvent, name: e.target.value })} className="bg-secondary border-border" />
                </div>
                <div className="space-y-2">
                  <Label className="text-foreground">Type</Label>
                  <Select value={editingEvent.type} onValueChange={(val) => setEditingEvent({ ...editingEvent, type: val })}>
                    <SelectTrigger className="bg-secondary border-border"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Event">Event</SelectItem>
                      <SelectItem value="Service">Service</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-foreground">Status</Label>
                  <Select value={editingEvent.status} onValueChange={(val) => setEditingEvent({ ...editingEvent, status: val })}>
                    <SelectTrigger className="bg-secondary border-border"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Published">Published</SelectItem>
                      <SelectItem value="Draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-foreground">Bookings</Label>
                  <Input type="number" value={editingEvent.bookings} onChange={(e) => setEditingEvent({ ...editingEvent, bookings: parseInt(e.target.value) || 0 })} className="bg-secondary border-border" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Description</Label>
                <Textarea value={editingEvent.description} onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })} className="bg-secondary border-border" />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => { setEditingEvent(null); setIsAdding(false); }}>Cancel</Button>
                <Button className="bg-gold text-gold-foreground hover:bg-gold/90" onClick={handleSave}>{isAdding ? "Add" : "Save Changes"}</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={deleteConfirm !== null} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent className="bg-card border-border max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-serif text-foreground">Delete Event</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">Are you sure you want to remove this event? This action cannot be undone.</p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setDeleteConfirm(null)}>Cancel</Button>
            <Button variant="destructive" onClick={() => deleteConfirm !== null && handleDelete(deleteConfirm)}>Delete</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminEvents;
