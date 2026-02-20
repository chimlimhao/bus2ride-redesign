import { Bell, Search, User, Sun, Moon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";

interface AdminHeaderProps {
  title: string;
  description?: string;
}

const AdminHeader = ({ title, description }: AdminHeaderProps) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="border-b border-border bg-card/50 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-foreground">{title}</h1>
          {description && (
            <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="w-64 bg-secondary border-border pl-9 h-9 text-sm"
            />
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-muted-foreground hover:text-foreground"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-gold rounded-full" />
          </Button>

          <div className="w-8 h-8 bg-gold/10 border border-gold/20 flex items-center justify-center">
            <User className="w-4 h-4 text-gold" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
