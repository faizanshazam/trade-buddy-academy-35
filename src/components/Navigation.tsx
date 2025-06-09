
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlignJustify, Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <nav className="bg-background border-b border-border shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <Link to="/" className="font-bold text-xl">
          StockSensei
        </Link>

        {/* Mobile Menu Button */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={toggleMenu}
            >
              <AlignJustify className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:w-64">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>
                Navigate through StockSensei
              </SheetDescription>
            </SheetHeader>
            <div className="py-4">
              <Button variant="ghost" className="w-full justify-start">
                <Link to="/">Home</Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Link to="/explore">Explore</Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Link to="/courses">Courses</Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Link to="/about">About</Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Link to="/contact">Contact</Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-6">
          <Link to="/explore" className="hover:text-primary">
            Explore
          </Link>
          <Link to="/courses" className="hover:text-primary">
            Courses
          </Link>
          <Link to="/about" className="hover:text-primary">
            About
          </Link>
          <Link to="/contact" className="hover:text-primary">
            Contact
          </Link>
        </div>

        {/* Right Side Buttons */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={toggleTheme}>
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </Button>
          <Link to="/login">
            <Button variant="outline" size="sm">
              Log In
            </Button>
          </Link>
          <Link to="/signup">
            <Button size="sm">Sign Up</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
