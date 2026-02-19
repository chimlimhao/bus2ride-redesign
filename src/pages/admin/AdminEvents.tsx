import AdminHeader from "@/components/admin/AdminHeader";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const eventsData = [
  { id: 1, name: "Wedding Transportation", type: "Service", status: "Published", bookings: 18 },
  { id: 2, name: "Prom Night", type: "Event", status: "Published", bookings: 32 },
  { id: 3, name: "Corporate Events", type: "Service", status: "Published", bookings: 14 },
  { id: 4, name: "Birthday Celebrations", type: "Event", status: "Draft", bookings: 0 },
  { id: 5, name: "Airport Transfers", type: "Service", status: "Published", bookings: 45 },
  { id: 6, name: "Bachelor/Bachelorette", type: "Event", status: "Published", bookings: 22 },
  { id: 7, name: "Wine Tours", type: "Event", status: "Published", bookings: 9 },
];

const AdminEvents = () => {
  return (
    <div>
      <AdminHeader title="Events & Services" description="Manage your event types and service offerings." />

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">{eventsData.length} items total</p>
          <Button variant="hero" size="sm" className="gap-2">
            <Plus className="w-4 h-4" /> Add Event / Service
          </Button>
        </div>

        <div className="card-luxury overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">Name</TableHead>
                <TableHead className="text-muted-foreground">Type</TableHead>
                <TableHead className="text-muted-foreground">Bookings</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {eventsData.map((event) => (
                <TableRow key={event.id} className="border-border hover:bg-secondary/30">
                  <TableCell className="font-medium text-foreground">{event.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-border text-muted-foreground">{event.type}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{event.bookings}</TableCell>
                  <TableCell>
                    <Badge
                      className={event.status === "Published" ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-gold/10 text-gold border-gold/20"}
                    >
                      {event.status}
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

export default AdminEvents;
