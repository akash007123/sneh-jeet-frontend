import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Heart, ChevronDown, UserPlus, BookOpen, Image, Mail, Megaphone, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Programs", path: "/programs" },
  { name: "Resources", path: "/resources" },
  { name: "Events", path: "/events" },
  { name: "Blog", path: "/blog" },
  { name: "Media", path: "/media" },
  { name: "Get Involved", path: "/get-involved" },
  { name: "Stories", path: "/stories" },
  { name: "Gallery", path: "/gallery" },
  { name: "Contact", path: "/contact" },
];

// Map readable link names to contextual icons
const iconMap: Record<string, JSX.Element> = {
  "Get Involved": <UserPlus className="h-4 w-4" />,
  Stories: <BookOpen className="h-4 w-4" />,
  Gallery: <Image className="h-4 w-4" />,
  Contact: <Mail className="h-4 w-4" />,
  Blog: <Megaphone className="h-4 w-4" />,
  Events: <CalendarDays className="h-4 w-4" />,
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-lg shadow-soft"
          : "bg-transparent"
      )}
    >
      <nav className="container-padding mx-auto max-w-7xl">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl pride-gradient flex items-center justify-center shadow-soft group-hover:shadow-medium transition-shadow">
              <Heart className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg md:text-xl text-foreground">
              Sneh<span className="text-primary"> Jeet</span>
              <p className="text-sm">Social Welfare Society</p>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.slice(0, 7).map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  location.pathname === link.path
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {link.name}
              </Link>
            ))}
            
            {/* More dropdown for remaining links - mega menu with icons */}
            <div className="relative group">
              <button className="px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors flex items-center gap-1">
                More <ChevronDown className="w-4 h-4" />
              </button>
              {/* Hover card container */}
              <div className="absolute top-full right-0 mt-2 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200">
                <div className="bg-card rounded-2xl shadow-medium border border-border w-[560px] p-4">
                  {/* Grid content */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* Column 1: Primary shortcuts */}
                    <div className="space-y-2">
                      {navLinks.slice(7, 10).map((link) => (
                        <Link
                          key={link.path}
                          to={link.path}
                          className={cn(
                            "flex items-start gap-3 px-3 py-3 rounded-xl transition-colors",
                            location.pathname === link.path
                              ? "bg-primary/10 text-primary"
                              : "hover:bg-muted text-foreground/90"
                          )}
                        >
                          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted">
                            {iconMap[link.name] ?? (
                              <span className="text-[10px] font-semibold">{link.name.slice(0, 2)}</span>
                            )}
                          </span>
                          <span className="flex flex-col">
                            <span className="text-sm font-medium">{link.name}</span>
                            <span className="text-xs text-muted-foreground">Explore {link.name.toLowerCase()}</span>
                          </span>
                        </Link>
                      ))}
                    </div>

                    {/* Column 2: Secondary links */}
                    <div className="space-y-1">
                      <div className="px-2 pb-1 text-xs font-semibold tracking-wide text-muted-foreground">More</div>
                      {navLinks.slice(10).map((link) => (
                        <Link
                          key={link.path}
                          to={link.path}
                          className={cn(
                            "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                            location.pathname === link.path
                              ? "text-primary bg-primary/10"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted"
                          )}
                        >
                          <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted/70">
                            {iconMap[link.name] ?? (
                              <span className="text-[10px] font-semibold">{link.name.charAt(0)}</span>
                            )}
                          </span>
                          <span className="truncate">{link.name}</span>
                        </Link>
                      ))}
                      <div className="pt-2 px-2">
                        <Link
                          to="/resources"
                          className="inline-flex items-center text-xs font-medium text-muted-foreground hover:text-foreground"
                        >
                          See all links
                          <svg className="ml-1 h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L13.586 10H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <Button asChild variant="outline" size="sm">
              <Link to="/contact">Contact</Link>
            </Button>
            <Button asChild variant="hero" size="sm">
              <Link to="/donate">Donate</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-t border-border overflow-hidden"
          >
            <div className="container-padding py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "block px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                    location.pathname === link.path
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 flex flex-col gap-2">
                <Button asChild variant="outline" className="w-full">
                  <Link to="/contact">Contact Us</Link>
                </Button>
                <Button asChild variant="hero" className="w-full">
                  <Link to="/donate">Donate Now</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
