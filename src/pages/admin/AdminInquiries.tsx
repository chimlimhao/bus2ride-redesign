import AdminHeader from "@/components/admin/AdminHeader";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, MessageSquare, Archive } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const inquiriesData = [
  { id: 1, name: "John D.", email: "john@email.com", event: "Wedding", date: "Mar 15, 2026", status: "New", message: "Looking for a limo for our wedding..." },
  { id: 2, name: "Sarah M.", email: "sarah@email.com", event: "Prom", date: "Mar 12, 2026", status: "Replied", message: "Need a party bus for 20 students..." },
  { id: 3, name: "Mike R.", email: "mike@email.com", event: "Corporate", date: "Mar 10, 2026", status: "New", message: "Corporate event for 30 people..." },
  { id: 4, name: "Emily K.", email: "emily@email.com", event: "Birthday", date: "Mar 8, 2026", status: "Closed", message: "Planning a surprise 30th birthday..." },
  { id: 5, name: "David L.", email: "david@email.com", event: "Bachelor Party", date: "Mar 5, 2026", status: "Replied", message: "Bachelor party next month for 15..." },
];

const AdminInquiries = () => {
  return (
    <div>
      <AdminHeader title="Inquiries" description="View and respond to customer inquiries and quote requests." />

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <p className="text-sm text-muted-foreground">{inquiriesData.length} inquiries</p>
            <Badge className="bg-primary/10 text-primary border-primary/20">
              {inquiriesData.filter(i => i.status === "New").length} new
            </Badge>
          </div>
        </div>

        <div className="card-luxury overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">Customer</TableHead>
                <TableHead className="text-muted-foreground">Event Type</TableHead>
                <TableHead className="text-muted-foreground">Date</TableHead>
                <TableHead className="text-muted-foreground">Preview</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inquiriesData.map((inquiry) => (
                <TableRow key={inquiry.id} className="border-border hover:bg-secondary/30">
                  <TableCell>
                    <div>
                      <p className="font-medium text-foreground text-sm">{inquiry.name}</p>
                      <p className="text-xs text-muted-foreground">{inquiry.email}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{inquiry.event}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{inquiry.date}</TableCell>
                  <TableCell className="text-muted-foreground text-xs max-w-[200px] truncate">{inquiry.message}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        inquiry.status === "New" ? "bg-primary/10 text-primary border-primary/20" :
                        inquiry.status === "Replied" ? "bg-green-500/10 text-green-400 border-green-500/20" :
                        "bg-muted text-muted-foreground border-border"
                      }
                    >
                      {inquiry.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="w-3.5 h-3.5" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8"><MessageSquare className="w-3.5 h-3.5" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground"><Archive className="w-3.5 h-3.5" /></Button>
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

export default AdminInquiries;
