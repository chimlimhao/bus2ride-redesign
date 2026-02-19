import AdminHeader from "@/components/admin/AdminHeader";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import partyBusImg from "@/assets/fleet/party-bus-hero.jpg";
import limousineImg from "@/assets/fleet/limousine.jpg";
import sprinterImg from "@/assets/fleet/sprinter-van.jpg";
import suvLimoImg from "@/assets/fleet/suv-limo.jpg";
import sedanImg from "@/assets/fleet/sedan.jpg";
import coachBusImg from "@/assets/fleet/coach-bus.jpg";

const fleetData = [
  { id: 1, name: "Party Bus", capacity: "20-40", status: "Active", price: "$250/hr", image: partyBusImg },
  { id: 2, name: "Stretch Limousine", capacity: "8-12", status: "Active", price: "$175/hr", image: limousineImg },
  { id: 3, name: "Sprinter Van", capacity: "12-15", status: "Active", price: "$150/hr", image: sprinterImg },
  { id: 4, name: "SUV Limousine", capacity: "6-8", status: "Maintenance", price: "$200/hr", image: suvLimoImg },
  { id: 5, name: "Luxury Sedan", capacity: "3-4", status: "Active", price: "$95/hr", image: sedanImg },
  { id: 6, name: "Coach Bus", capacity: "40-56", status: "Active", price: "$350/hr", image: coachBusImg },
];

const AdminFleet = () => {
  return (
    <div>
      <AdminHeader title="Fleet Management" description="Manage your vehicles, pricing, and availability." />

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">{fleetData.length} vehicles total</p>
          <Button variant="hero" size="sm" className="gap-2">
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
              {fleetData.map((vehicle) => (
                <TableRow key={vehicle.id} className="border-border hover:bg-secondary/30">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-8 bg-secondary border border-border overflow-hidden">
                        <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="font-medium text-foreground">{vehicle.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{vehicle.capacity}</TableCell>
                  <TableCell className="text-foreground font-medium">{vehicle.price}</TableCell>
                  <TableCell>
                    <Badge
                      variant={vehicle.status === "Active" ? "default" : "secondary"}
                      className={vehicle.status === "Active" ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-gold/10 text-gold border-gold/20"}
                    >
                      {vehicle.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="w-3.5 h-3.5" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8"><Pencil className="w-3.5 h-3.5" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive"><Trash2 className="w-3.5 h-3.5" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default AdminFleet;
