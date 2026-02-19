import AdminHeader from "@/components/admin/AdminHeader";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2, Eye, X, Upload } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

import partyBusImg from "@/assets/fleet/party-bus-hero.jpg";
import limousineImg from "@/assets/fleet/limousine.jpg";
import sprinterImg from "@/assets/fleet/sprinter-van.jpg";
import suvLimoImg from "@/assets/fleet/suv-limo.jpg";
import sedanImg from "@/assets/fleet/sedan.jpg";
import coachBusImg from "@/assets/fleet/coach-bus.jpg";

interface Vehicle {
  id: number;
  name: string;
  capacity: string;
  status: string;
  price: string;
  image: string;
  description: string;
}

const initialFleet: Vehicle[] = [
  { id: 1, name: "Party Bus", capacity: "20-40", status: "Active", price: "$250/hr", image: partyBusImg, description: "Ultimate party experience on wheels." },
  { id: 2, name: "Stretch Limousine", capacity: "8-12", status: "Active", price: "$175/hr", image: limousineImg, description: "Classic luxury for any occasion." },
  { id: 3, name: "Sprinter Van", capacity: "12-15", status: "Active", price: "$150/hr", image: sprinterImg, description: "Versatile group shuttle." },
  { id: 4, name: "SUV Limousine", capacity: "6-8", status: "Maintenance", price: "$200/hr", image: suvLimoImg, description: "Spacious premium SUV experience." },
  { id: 5, name: "Luxury Sedan", capacity: "3-4", status: "Active", price: "$95/hr", image: sedanImg, description: "Elegant executive travel." },
  { id: 6, name: "Coach Bus", capacity: "40-56", status: "Active", price: "$350/hr", image: coachBusImg, description: "Comfortable group transportation." },
];

const AdminFleet = () => {
  const { toast } = useToast();
  const [fleet, setFleet] = useState<Vehicle[]>(initialFleet);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [viewingVehicle, setViewingVehicle] = useState<Vehicle | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAdd = () => {
    setEditingVehicle({ id: Date.now(), name: "", capacity: "", status: "Active", price: "", image: "", description: "" });
    setIsAdding(true);
  };

  const handleSave = () => {
    if (!editingVehicle) return;
    if (isAdding) {
      setFleet((prev) => [...prev, editingVehicle]);
      toast({ title: "Vehicle added", description: `${editingVehicle.name} has been added to the fleet.` });
    } else {
      setFleet((prev) => prev.map((v) => v.id === editingVehicle.id ? editingVehicle : v));
      toast({ title: "Vehicle updated", description: `${editingVehicle.name} has been updated.` });
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

  return (
    <div>
      <AdminHeader title="Fleet Management" description="Manage your vehicles, pricing, and availability." />

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
                      <span className="font-medium text-foreground">{vehicle.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{vehicle.capacity}</TableCell>
                  <TableCell className="text-foreground font-medium">{vehicle.price}</TableCell>
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

      {/* View Dialog */}
      <Dialog open={!!viewingVehicle} onOpenChange={() => setViewingVehicle(null)}>
        <DialogContent className="bg-card border-border max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-foreground">{viewingVehicle?.name}</DialogTitle>
          </DialogHeader>
          {viewingVehicle && (
            <div className="space-y-4">
              {viewingVehicle.image && (
                <img src={viewingVehicle.image} alt={viewingVehicle.name} className="w-full h-48 object-cover border border-border" />
              )}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted-foreground">Capacity:</span> <span className="text-foreground ml-1">{viewingVehicle.capacity}</span></div>
                <div><span className="text-muted-foreground">Price:</span> <span className="text-foreground ml-1">{viewingVehicle.price}</span></div>
                <div><span className="text-muted-foreground">Status:</span> <Badge className={viewingVehicle.status === "Active" ? "bg-green-500/10 text-green-400 border-green-500/20 ml-1" : "bg-gold/10 text-gold border-gold/20 ml-1"}>{viewingVehicle.status}</Badge></div>
              </div>
              <p className="text-sm text-muted-foreground">{viewingVehicle.description}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit/Add Dialog */}
      <Dialog open={!!editingVehicle} onOpenChange={() => { setEditingVehicle(null); setIsAdding(false); }}>
        <DialogContent className="bg-card border-border max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-serif text-foreground">{isAdding ? "Add Vehicle" : "Edit Vehicle"}</DialogTitle>
          </DialogHeader>
          {editingVehicle && (
            <div className="space-y-4">
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
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-foreground">Name</Label>
                  <Input value={editingVehicle.name} onChange={(e) => setEditingVehicle({ ...editingVehicle, name: e.target.value })} className="bg-secondary border-border" />
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
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Description</Label>
                <Textarea value={editingVehicle.description} onChange={(e) => setEditingVehicle({ ...editingVehicle, description: e.target.value })} className="bg-secondary border-border" />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => { setEditingVehicle(null); setIsAdding(false); }}>Cancel</Button>
                <Button className="bg-gold text-gold-foreground hover:bg-gold/90" onClick={handleSave}>{isAdding ? "Add Vehicle" : "Save Changes"}</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={deleteConfirm !== null} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent className="bg-card border-border max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-serif text-foreground">Delete Vehicle</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">Are you sure you want to remove this vehicle? This action cannot be undone.</p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setDeleteConfirm(null)}>Cancel</Button>
            <Button variant="destructive" onClick={() => deleteConfirm !== null && handleDelete(deleteConfirm)}>Delete</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminFleet;
