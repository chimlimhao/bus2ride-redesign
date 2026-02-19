import AdminHeader from "@/components/admin/AdminHeader";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Archive, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Inquiry {
  id: number;
  name: string;
  email: string;
  event: string;
  date: string;
  status: string;
  message: string;
  phone?: string;
  guests?: number;
}

const initialInquiries: Inquiry[] = [
  { id: 1, name: "John D.", email: "john@email.com", event: "Wedding", date: "Mar 15, 2026", status: "New", message: "Looking for a limo for our wedding day. We need transportation for the bridal party of 12 people.", phone: "(555) 123-4567", guests: 12 },
  { id: 2, name: "Sarah M.", email: "sarah@email.com", event: "Prom", date: "Mar 12, 2026", status: "Replied", message: "Need a party bus for 20 students going to prom. Looking for a safe and fun experience.", phone: "(555) 234-5678", guests: 20 },
  { id: 3, name: "Mike R.", email: "mike@email.com", event: "Corporate", date: "Mar 10, 2026", status: "New", message: "Corporate event for 30 people. Need shuttle service between hotel and convention center.", phone: "(555) 345-6789", guests: 30 },
  { id: 4, name: "Emily K.", email: "emily@email.com", event: "Birthday", date: "Mar 8, 2026", status: "Closed", message: "Planning a surprise 30th birthday party. Would love a party bus for 15 people.", phone: "(555) 456-7890", guests: 15 },
  { id: 5, name: "David L.", email: "david@email.com", event: "Bachelor Party", date: "Mar 5, 2026", status: "Replied", message: "Bachelor party next month for 15 guys. Looking at party bus options with a good sound system.", phone: "(555) 567-8901", guests: 15 },
];

const AdminInquiries = () => {
  const { toast } = useToast();
  const [inquiries, setInquiries] = useState<Inquiry[]>(initialInquiries);
  const [viewingInquiry, setViewingInquiry] = useState<Inquiry | null>(null);
  const [replyText, setReplyText] = useState("");

  const handleArchive = (id: number) => {
    setInquiries((prev) => prev.map((i) => i.id === id ? { ...i, status: "Closed" } : i));
    toast({ title: "Inquiry archived" });
  };

  const handleReply = () => {
    if (!viewingInquiry || !replyText.trim()) return;
    setInquiries((prev) => prev.map((i) => i.id === viewingInquiry.id ? { ...i, status: "Replied" } : i));
    toast({ title: "Reply sent", description: `Response sent to ${viewingInquiry.email}` });
    setReplyText("");
    setViewingInquiry(null);
  };

  return (
    <div>
      <AdminHeader title="Inquiries" description="View and respond to customer inquiries and quote requests." />

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <p className="text-sm text-muted-foreground">{inquiries.length} inquiries</p>
            <Badge className="bg-gold/10 text-gold border-gold/20">
              {inquiries.filter(i => i.status === "New").length} new
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
              {inquiries.map((inquiry) => (
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
                        inquiry.status === "New" ? "bg-gold/10 text-gold border-gold/20" :
                        inquiry.status === "Replied" ? "bg-green-500/10 text-green-400 border-green-500/20" :
                        "bg-muted text-muted-foreground border-border"
                      }
                    >
                      {inquiry.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setViewingInquiry(inquiry); setReplyText(""); }}><Eye className="w-3.5 h-3.5" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" onClick={() => handleArchive(inquiry.id)}><Archive className="w-3.5 h-3.5" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* View / Reply Sheet */}
      <Sheet open={!!viewingInquiry} onOpenChange={() => setViewingInquiry(null)}>
        <SheetContent className="bg-card border-border sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="font-serif text-foreground">Inquiry from {viewingInquiry?.name}</SheetTitle>
          </SheetHeader>
          {viewingInquiry && (
            <div className="space-y-5 mt-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted-foreground">Email:</span> <span className="text-foreground ml-1">{viewingInquiry.email}</span></div>
                <div><span className="text-muted-foreground">Phone:</span> <span className="text-foreground ml-1">{viewingInquiry.phone || "N/A"}</span></div>
                <div><span className="text-muted-foreground">Event:</span> <span className="text-foreground ml-1">{viewingInquiry.event}</span></div>
                <div><span className="text-muted-foreground">Guests:</span> <span className="text-foreground ml-1">{viewingInquiry.guests || "N/A"}</span></div>
                <div><span className="text-muted-foreground">Date:</span> <span className="text-foreground ml-1">{viewingInquiry.date}</span></div>
                <div><span className="text-muted-foreground">Status:</span> <Badge className={viewingInquiry.status === "New" ? "bg-gold/10 text-gold border-gold/20 ml-1" : viewingInquiry.status === "Replied" ? "bg-green-500/10 text-green-400 border-green-500/20 ml-1" : "bg-muted text-muted-foreground border-border ml-1"}>{viewingInquiry.status}</Badge></div>
              </div>

              <div className="p-4 bg-secondary/50 border border-border">
                <p className="text-xs font-semibold text-gold mb-2">Message</p>
                <p className="text-sm text-foreground">{viewingInquiry.message}</p>
              </div>

              {viewingInquiry.status !== "Closed" && (
                <div className="space-y-3">
                  <Label className="text-foreground">Quick Reply</Label>
                  <Textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your response..."
                    className="bg-secondary border-border"
                    rows={4}
                  />
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => handleArchive(viewingInquiry.id)}>
                      <Archive className="w-4 h-4 mr-2" /> Archive
                    </Button>
                    <Button className="bg-gold text-gold-foreground hover:bg-gold/90 gap-2" onClick={handleReply} disabled={!replyText.trim()}>
                      <Mail className="w-4 h-4" /> Send Reply
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AdminInquiries;
