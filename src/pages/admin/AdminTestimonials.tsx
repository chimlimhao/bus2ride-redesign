import AdminHeader from "@/components/admin/AdminHeader";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2, Star, Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const testimonials = [
  { id: 1, name: "Sarah M.", event: "Wedding", rating: 5, status: "Approved", excerpt: "Absolutely incredible service! The limo was pristine..." },
  { id: 2, name: "John D.", event: "Prom", rating: 5, status: "Pending", excerpt: "Our kids had the best prom night ever thanks to..." },
  { id: 3, name: "Mike R.", event: "Corporate", rating: 4, status: "Approved", excerpt: "Professional and punctual. Will definitely use again..." },
  { id: 4, name: "Emily K.", event: "Birthday", rating: 5, status: "Approved", excerpt: "The party bus was amazing! Everyone had a blast..." },
  { id: 5, name: "David L.", event: "Bachelor Party", rating: 5, status: "Pending", excerpt: "Best bachelor party ever! The driver was awesome..." },
];

const AdminTestimonials = () => {
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
          <Button variant="hero" size="sm" className="gap-2">
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
                  <TableCell className="font-medium text-foreground">{t.name}</TableCell>
                  <TableCell className="text-muted-foreground">{t.event}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-xs max-w-[200px] truncate">{t.excerpt}</TableCell>
                  <TableCell>
                    <Badge
                      className={t.status === "Approved" ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-gold/10 text-gold border-gold/20"}
                    >
                      {t.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      {t.status === "Pending" && (
                        <>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-green-400 hover:text-green-400"><Check className="w-3.5 h-3.5" /></Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive"><X className="w-3.5 h-3.5" /></Button>
                        </>
                      )}
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

export default AdminTestimonials;
