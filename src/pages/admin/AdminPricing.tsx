import AdminHeader from "@/components/admin/AdminHeader";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const pricingData = [
  { id: 1, vehicle: "Party Bus", hourly: "$250", minimum: "3 hrs", deposit: "$200", status: "Active" },
  { id: 2, vehicle: "Stretch Limousine", hourly: "$175", minimum: "2 hrs", deposit: "$150", status: "Active" },
  { id: 3, vehicle: "Sprinter Van", hourly: "$150", minimum: "2 hrs", deposit: "$100", status: "Active" },
  { id: 4, vehicle: "SUV Limousine", hourly: "$200", minimum: "2 hrs", deposit: "$150", status: "Active" },
  { id: 5, vehicle: "Luxury Sedan", hourly: "$95", minimum: "1 hr", deposit: "$75", status: "Active" },
  { id: 6, vehicle: "Coach Bus", hourly: "$350", minimum: "4 hrs", deposit: "$300", status: "Active" },
];

const AdminPricing = () => {
  return (
    <div>
      <AdminHeader title="Pricing Management" description="Set and update pricing for all vehicles and packages." />

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">{pricingData.length} pricing entries</p>
          <Button variant="hero" size="sm" className="gap-2">
            <Plus className="w-4 h-4" /> Add Pricing
          </Button>
        </div>

        <div className="card-luxury overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">Vehicle</TableHead>
                <TableHead className="text-muted-foreground">Hourly Rate</TableHead>
                <TableHead className="text-muted-foreground">Minimum</TableHead>
                <TableHead className="text-muted-foreground">Deposit</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pricingData.map((item) => (
                <TableRow key={item.id} className="border-border hover:bg-secondary/30">
                  <TableCell className="font-medium text-foreground">{item.vehicle}</TableCell>
                  <TableCell className="text-gold font-semibold">{item.hourly}</TableCell>
                  <TableCell className="text-muted-foreground">{item.minimum}</TableCell>
                  <TableCell className="text-muted-foreground">{item.deposit}</TableCell>
                  <TableCell>
                    <Badge className="bg-green-500/10 text-green-400 border-green-500/20">{item.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
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

export default AdminPricing;
