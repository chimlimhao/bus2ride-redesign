import AdminHeader from "@/components/admin/AdminHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Plus, Pencil, Trash2, GripVertical, ChevronUp, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
  status: string;
}

const initialFAQ: FAQItem[] = [
  { id: 1, question: "What areas do you serve?", answer: "We operate across all 50 states with a nationwide network of premium vehicles.", category: "General", status: "Published" },
  { id: 2, question: "How far in advance should I book?", answer: "We recommend booking at least 2-4 weeks in advance, especially during peak seasons.", category: "Booking", status: "Published" },
  { id: 3, question: "What is your cancellation policy?", answer: "Free cancellation up to 48 hours before your event. After that, a 50% fee applies.", category: "Booking", status: "Published" },
  { id: 4, question: "Do you provide alcohol on the party bus?", answer: "We provide a BYOB policy. You're welcome to bring your own beverages.", category: "Party Bus", status: "Published" },
  { id: 5, question: "Can I decorate the vehicle?", answer: "Yes! You're welcome to decorate with non-damaging materials. No confetti or glitter please.", category: "General", status: "Draft" },
  { id: 6, question: "What payment methods do you accept?", answer: "We accept all major credit cards, bank transfers, and digital wallets.", category: "Billing", status: "Published" },
  { id: 7, question: "Is there a minimum rental time?", answer: "Minimum rental varies by vehicle: 1 hour for sedans, 2 hours for limos, 3 hours for party buses.", category: "Booking", status: "Published" },
];

const AdminFAQ = () => {
  const { toast } = useToast();
  const [faqs, setFaqs] = useState<FAQItem[]>(initialFAQ);
  const [editingItem, setEditingItem] = useState<FAQItem | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const handleAdd = () => {
    setEditingItem({ id: Date.now(), question: "", answer: "", category: "General", status: "Draft" });
    setIsAdding(true);
  };

  const handleSave = () => {
    if (!editingItem) return;
    if (isAdding) {
      setFaqs((prev) => [...prev, editingItem]);
      toast({ title: "FAQ added" });
    } else {
      setFaqs((prev) => prev.map((f) => f.id === editingItem.id ? editingItem : f));
      toast({ title: "FAQ updated" });
    }
    setEditingItem(null);
    setIsAdding(false);
  };

  const handleDelete = (id: number) => {
    setFaqs((prev) => prev.filter((f) => f.id !== id));
    toast({ title: "FAQ removed" });
    setDeleteConfirm(null);
  };

  const moveItem = (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= faqs.length) return;
    const updated = [...faqs];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    setFaqs(updated);
    toast({ title: `Moved ${direction}` });
  };

  return (
    <div>
      <AdminHeader title="FAQ Management" description="Manage frequently asked questions displayed on your site." />

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">{faqs.length} questions</p>
          <Button className="gap-2 bg-gold text-gold-foreground hover:bg-gold/90" size="sm" onClick={handleAdd}>
            <Plus className="w-4 h-4" /> Add Question
          </Button>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              className="card-luxury px-4 py-3.5 flex items-center gap-3 group hover:border-gold/30 transition-all duration-200"
            >
              <div className="flex flex-col gap-0.5">
                <Button
                  variant="ghost" size="icon"
                  className="h-5 w-5 text-muted-foreground/40 hover:text-gold"
                  onClick={() => moveItem(index, "up")}
                  disabled={index === 0}
                >
                  <ChevronUp className="w-3 h-3" />
                </Button>
                <GripVertical className="w-4 h-4 text-muted-foreground/40 mx-auto" />
                <Button
                  variant="ghost" size="icon"
                  className="h-5 w-5 text-muted-foreground/40 hover:text-gold"
                  onClick={() => moveItem(index, "down")}
                  disabled={index === faqs.length - 1}
                >
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{faq.question}</p>
                <p className="text-xs text-muted-foreground truncate mt-0.5">{faq.answer}</p>
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
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => { setEditingItem({ ...faq }); setIsAdding(false); }}><Pencil className="w-3 h-3" /></Button>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive" onClick={() => setDeleteConfirm(faq.id)}><Trash2 className="w-3 h-3" /></Button>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-muted-foreground mt-4 text-center">
          Use arrows to reorder • Hover to edit or delete
        </p>
      </div>

      {/* Edit/Add Sheet */}
      <Sheet open={!!editingItem} onOpenChange={() => { setEditingItem(null); setIsAdding(false); }}>
        <SheetContent className="bg-card border-border sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="font-serif text-foreground">{isAdding ? "Add FAQ" : "Edit FAQ"}</SheetTitle>
          </SheetHeader>
          {editingItem && (
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label className="text-foreground">Question</Label>
                <Input value={editingItem.question} onChange={(e) => setEditingItem({ ...editingItem, question: e.target.value })} className="bg-secondary border-border" />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Answer</Label>
                <Textarea value={editingItem.answer} onChange={(e) => setEditingItem({ ...editingItem, answer: e.target.value })} className="bg-secondary border-border" rows={5} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-foreground">Category</Label>
                  <Select value={editingItem.category} onValueChange={(val) => setEditingItem({ ...editingItem, category: val })}>
                    <SelectTrigger className="bg-secondary border-border"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="General">General</SelectItem>
                      <SelectItem value="Booking">Booking</SelectItem>
                      <SelectItem value="Billing">Billing</SelectItem>
                      <SelectItem value="Party Bus">Party Bus</SelectItem>
                      <SelectItem value="Safety">Safety</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-foreground">Status</Label>
                  <Select value={editingItem.status} onValueChange={(val) => setEditingItem({ ...editingItem, status: val })}>
                    <SelectTrigger className="bg-secondary border-border"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Published">Published</SelectItem>
                      <SelectItem value="Draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={() => { setEditingItem(null); setIsAdding(false); }}>Cancel</Button>
                <Button className="bg-gold text-gold-foreground hover:bg-gold/90" onClick={handleSave}>{isAdding ? "Add FAQ" : "Save Changes"}</Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation Sheet */}
      <Sheet open={deleteConfirm !== null} onOpenChange={() => setDeleteConfirm(null)}>
        <SheetContent className="bg-card border-border sm:max-w-sm">
          <SheetHeader>
            <SheetTitle className="font-serif text-foreground">Delete FAQ</SheetTitle>
          </SheetHeader>
          <div className="mt-4 space-y-4">
            <p className="text-sm text-muted-foreground">Are you sure you want to remove this question? This action cannot be undone.</p>
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

export default AdminFAQ;
