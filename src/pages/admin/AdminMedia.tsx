import AdminHeader from "@/components/admin/AdminHeader";
import { Button } from "@/components/ui/button";
import { Upload, Trash2, Image, FolderOpen, Eye } from "lucide-react";

const mediaItems = [
  { id: 1, name: "party-bus-hero.jpg", size: "2.4 MB", type: "image/jpeg" },
  { id: 2, name: "limousine.jpg", size: "1.8 MB", type: "image/jpeg" },
  { id: 3, name: "sprinter-van.jpg", size: "1.5 MB", type: "image/jpeg" },
  { id: 4, name: "suv-limo.jpg", size: "2.1 MB", type: "image/jpeg" },
  { id: 5, name: "sedan.jpg", size: "1.2 MB", type: "image/jpeg" },
  { id: 6, name: "coach-bus.jpg", size: "2.8 MB", type: "image/jpeg" },
  { id: 7, name: "party-bus-interior.jpg", size: "1.9 MB", type: "image/jpeg" },
];

const AdminMedia = () => {
  return (
    <div>
      <AdminHeader title="Media Gallery" description="Upload and manage images used across your website." />

      <div className="p-6 space-y-6">
        {/* Upload Zone */}
        <div className="card-luxury border-dashed border-2 border-border hover:border-primary/40 transition-colors cursor-pointer">
          <div className="p-10 flex flex-col items-center justify-center text-center">
            <div className="w-14 h-14 bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
              <Upload className="w-6 h-6 text-primary" />
            </div>
            <p className="text-sm font-medium text-foreground">Drop files here or click to upload</p>
            <p className="text-xs text-muted-foreground mt-1">JPG, PNG, WebP up to 10MB</p>
          </div>
        </div>

        {/* Folder Navigation */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2 text-xs">
            <FolderOpen className="w-3.5 h-3.5" /> All Files
          </Button>
          <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">Fleet</Button>
          <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">Events</Button>
          <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">Banners</Button>
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {mediaItems.map((item) => (
            <div key={item.id} className="group card-luxury overflow-hidden hover:border-primary/30 transition-all duration-200">
              <div className="aspect-[4/3] bg-secondary flex items-center justify-center relative">
                <Image className="w-8 h-8 text-muted-foreground/30" />
                <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8 bg-secondary/80">
                    <Eye className="w-3.5 h-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 bg-secondary/80 text-destructive hover:text-destructive">
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
              <div className="p-2.5">
                <p className="text-xs font-medium text-foreground truncate">{item.name}</p>
                <p className="text-[10px] text-muted-foreground">{item.size}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminMedia;
