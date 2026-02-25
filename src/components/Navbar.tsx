import { Link, useLocation } from "react-router-dom";
import { Leaf, Home, Stethoscope, BookOpen, Settings, Info } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/diagnosis", label: "Diagnosis", icon: Stethoscope },
  { to: "/knowledge-base", label: "Knowledge Base", icon: BookOpen },
  { to: "/admin", label: "Admin Panel", icon: Settings },
  { to: "/about", label: "Architecture", icon: Info },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold text-primary">
          <Leaf className="h-6 w-6 animate-leaf-sway" />
          <span>PlantDoc AI</span>
        </Link>
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                location.pathname === item.to
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </div>
        {/* Mobile menu */}
        <div className="flex md:hidden items-center gap-1 overflow-x-auto">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex items-center gap-1 rounded-lg p-2 text-xs font-medium transition-colors",
                location.pathname === item.to
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary"
              )}
            >
              <item.icon className="h-4 w-4" />
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
