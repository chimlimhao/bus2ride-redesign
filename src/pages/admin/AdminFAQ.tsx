import AdminHeader from "@/components/admin/AdminHeader";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, GripVertical } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const faqData = [
  { id: 1, question: "What areas do you serve?", category: "General", status: "Published" },
  { id: 2, question: "How far in advance should I book?", category: "Booking", status: "Published" },
  { id: 3, question: "What is your cancellation policy?", category: "Booking", status: "Published" },
  { id: 4, question: "Do you provide alcohol on the party bus?", category: "Party Bus", status: "Published" },
  { id: 5, question: "Can I decorate the vehicle?", category: "General", status: "Draft" },
  { id: 6, question: "What payment methods do you accept?", category: "Billing", status: "Published" },
  { id: 7, question: "Is there a minimum rental time?", category: "Booking", status: "Published" },
];

const AdminFAQ = () => {
  return (
    <div>
      <AdminHeader title="FAQ Management" description="Manage frequently asked questions displayed on your site." />

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">{faqData.length} questions</p>
          <Button variant="hero" size="sm" className="gap-2">
            <Plus className="w-4 h-4" /> Add Question
          </Button>
        </div>

        <div className="space-y-2">
          {faqData.map((faq) => (
            <div
              key={faq.id}
              className="card-luxury px-4 py-3.5 flex items-center gap-3 group hover:border-primary/30 transition-all duration-200"
            >
              <GripVertical className="w-4 h-4 text-muted-foreground/40 cursor-grab shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{faq.question}</p>
              </div>
              <Badge variant="outline" className="border-border text-muted-foreground text-[10px] shrink-0">
                {faq.category}
              </Badge>
              <Badge
                className={faq.status === "Published" ? "bg-green-500/10 text-green-400 border-green-500/20 text-[10px]" : "bg-gold/10 text-gold border-gold/20 text-[10px]"}
              >
                {faq.status}
              </Badge>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon" className="h-7 w-7"><Pencil className="w-3 h-3" /></Button>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive"><Trash2 className="w-3 h-3" /></Button>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-muted-foreground mt-4 text-center">
          Drag items to reorder • Changes auto-save
        </p>
      </div>
    </div>
  );
};

export default AdminFAQ;
