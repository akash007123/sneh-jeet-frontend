import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Heart, ChevronDown, UserPlus, BookOpen, Image, Mail, Megaphone, IdCard, Users, Target, Shield, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import MemberFormModal from "./MemberFormModal";

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
  { name: "Members", path: "/members" },
  { name: "Partners", path: "/partners" },
  { name: "Health", path: "/health" },
  { name: "Ally", path: "/ally" },
  { name: "Education", path: "/education" },
  { name: "Impact", path: "/impact" },
  { name: "Rights", path: "/rights" },
  { name: "Volunteer", path: "/volunteer" },
  { name: "Careers", path: "/careers" },
];

const moreLinks = [
  { name: "Get Involved", path: "/get-involved" },
  { name: "Stories", path: "/stories" },
  { name: "Gallery", path: "/gallery" },
  { name: "Contact", path: "/contact" },
  { name: "Health", path: "/health" },
  { name: "Impact", path: "/impact" },
  { name: "Careers", path: "/careers" },
  { name: "Members", path: "/members" },
  { name: "Ally", path: "/ally" },
  { name: "Rights", path: "/rights" },
  { name: "Partners", path: "/partners" },
  { name: "Education", path: "/education" },
  { name: "Volunteer", path: "/volunteer" },
];

// Map readable link names to contextual icons
const iconMap: Record<string, JSX.Element> = {
  "Get Involved": <UserPlus className="h-4 w-4" />,
  Stories: <BookOpen className="h-4 w-4" />,
  Gallery: <Image className="h-4 w-4" />,
  Contact: <Mail className="h-4 w-4" />,
  Members: <IdCard className="h-4 w-4" />,
  Partners: <Heart className="h-4 w-4" />,
  Health: <Heart className="h-4 w-4" />,
  Ally: <Users className="h-4 w-4" />,
  Education: <BookOpen className="h-4 w-4" />,
  Impact: <Target className="h-4 w-4" />,
  Rights: <Shield className="h-4 w-4" />,
  Volunteer: <UserPlus className="h-4 w-4" />,
  Careers: <Briefcase className="h-4 w-4" />,
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
                <div className="bg-card rounded-2xl shadow-medium border border-border w-[800px] p-4">
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      {moreLinks.slice(0, 1).map((link) => (
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
                      {moreLinks.slice(3, 7).map((link) => (
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
                    <div className="flex gap-4">
                      {moreLinks.slice(1, 2).map((link) => (
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
                      {moreLinks.slice(7, 10).map((link) => (
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
                    <div className="flex gap-4">
                      {moreLinks.slice(2, 3).map((link) => (
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
                      {moreLinks.slice(10).map((link) => (
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
            <MemberFormModal />
            {/* <Button asChild variant="hero" size="sm">
              <Link to="/donate">Donate</Link>
            </Button> */}
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
                <div className="w-full">
                  <MemberFormModal />
                </div>
                {/* <Button asChild variant="hero" className="w-full">
                  <Link to="/donate">Donate Now</Link>
                </Button> */}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
