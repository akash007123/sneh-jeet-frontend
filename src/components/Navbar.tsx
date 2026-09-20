import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Heart, ChevronDown, UserPlus, BookOpen, Image, Mail, IdCard, Users, Target, Shield, Briefcase, HeartPulse, GraduationCap, Handshake, HandHeart, ArrowRight, Sparkles, type LucideIcon } from "lucide-react";
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

interface MoreLink {
  name: string;
  path: string;
  desc: string;
  icon: LucideIcon;
}

interface MoreGroup {
  label: string;
  chip: string;
  links: MoreLink[];
}

// Themed groups powering the "More" mega-menu
const moreGroups: MoreGroup[] = [
  {
    label: "Community",
    chip: "bg-warm text-warm-foreground group-hover/item:bg-primary group-hover/item:text-primary-foreground",
    links: [
      { name: "Get Involved", path: "/get-involved", desc: "Join events & take action", icon: UserPlus },
      { name: "Stories", path: "/stories", desc: "Voices from our community", icon: BookOpen },
      { name: "Gallery", path: "/gallery", desc: "Moments captured in photos", icon: Image },
      { name: "Members", path: "/members", desc: "Meet our member family", icon: IdCard },
      { name: "Partners", path: "/partners", desc: "Organisations walking with us", icon: Handshake },
    ],
  },
  {
    label: "Support",
    chip: "bg-safe text-safe-foreground group-hover/item:bg-accent group-hover/item:text-accent-foreground",
    links: [
      { name: "Health", path: "/health", desc: "Care & wellness resources", icon: HeartPulse },
      { name: "Ally", path: "/ally", desc: "Learn to stand with us", icon: Users },
      { name: "Education", path: "/education", desc: "Workshops & learning", icon: GraduationCap },
      { name: "Rights", path: "/rights", desc: "Know your legal rights", icon: Shield },
      { name: "Volunteer", path: "/volunteer", desc: "Give your time & skills", icon: HandHeart },
    ],
  },
  {
    label: "Organisation",
    chip: "bg-hope text-hope-foreground group-hover/item:bg-secondary group-hover/item:text-secondary-foreground",
    links: [
      { name: "Impact", path: "/impact", desc: "The change we've made", icon: Target },
      { name: "Careers", path: "/careers", desc: "Come work with our team", icon: Briefcase },
      { name: "Contact", path: "/contact", desc: "Get in touch with us", icon: Mail },
    ],
  },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreCloseTimer = useRef<number | null>(null);
  const location = useLocation();

  const openMore = () => {
    if (moreCloseTimer.current) window.clearTimeout(moreCloseTimer.current);
    setMoreOpen(true);
  };

  const scheduleMoreClose = () => {
    if (moreCloseTimer.current) window.clearTimeout(moreCloseTimer.current);
    moreCloseTimer.current = window.setTimeout(() => setMoreOpen(false), 140);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMoreOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setMoreOpen(false);
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
            
            {/* More mega-menu */}
            <div
              className="relative"
              onMouseEnter={openMore}
              onMouseLeave={scheduleMoreClose}
            >
              <button
                aria-expanded={moreOpen}
                aria-haspopup="true"
                onClick={() => setMoreOpen((v) => !v)}
                onFocus={openMore}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1",
                  moreOpen
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                More
                <ChevronDown
                  className={cn(
                    "w-4 h-4 transition-transform duration-300",
                    moreOpen && "rotate-180"
                  )}
                />
              </button>
              <AnimatePresence>
                {moreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, x: "-50%", scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
                    exit={{ opacity: 0, y: 8, x: "-50%", scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    className="absolute left-1/2 top-full z-50 w-[760px] max-w-[calc(100vw-2rem)] pt-3"
                  >
                    <div className="overflow-hidden rounded-2xl border border-border bg-card/95 shadow-medium backdrop-blur-xl">
                      <div className="h-1 pride-gradient" />
                      <div className="grid grid-cols-3 gap-2 p-4">
                        {moreGroups.map((group) => (
                          <div key={group.label} className="rounded-xl p-2">
                            <p className="px-3 pb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                              {group.label}
                            </p>
                            <div className="space-y-1">
                              {group.links.map((link) => {
                                const Icon = link.icon;
                                const active = location.pathname === link.path;
                                return (
                                  <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setMoreOpen(false)}
                                    className={cn(
                                      "group/item relative flex items-start gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 hover:-translate-y-px",
                                      active ? "bg-primary/10" : "hover:bg-muted"
                                    )}
                                  >
                                    {active && (
                                      <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-full pride-gradient" />
                                    )}
                                    <span
                                      className={cn(
                                        "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl shadow-soft transition-all duration-200 group-hover/item:scale-110 group-hover/item:shadow-glow",
                                        group.chip
                                      )}
                                    >
                                      <Icon className="h-4 w-4" />
                                    </span>
                                    <span className="flex min-w-0 flex-col">
                                      <span
                                        className={cn(
                                          "text-sm font-semibold",
                                          active ? "text-primary" : "text-foreground"
                                        )}
                                      >
                                        {link.name}
                                      </span>
                                      <span className="truncate text-xs text-muted-foreground">
                                        {link.desc}
                                      </span>
                                    </span>
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                      <Link
                        to="/get-involved"
                        onClick={() => setMoreOpen(false)}
                        className="group/cta flex items-center justify-between gap-3 border-t border-border bg-muted/50 px-6 py-3.5 transition-colors hover:bg-muted"
                      >
                        <span className="flex items-center gap-2 text-sm">
                          <Sparkles className="h-4 w-4 text-primary" />
                          <span className="font-semibold text-foreground">
                            Ready to make a difference?
                          </span>
                          <span className="hidden text-muted-foreground sm:inline">
                            Explore ways to contribute
                          </span>
                        </span>
                        <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
                          Get started
                          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/cta:translate-x-1" />
                        </span>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
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
