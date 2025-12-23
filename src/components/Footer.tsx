import { Link } from "react-router-dom";
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/subscriptions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        setEmail("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const footerLinks = {
    organization: [
      { name: "About Us", path: "/about" },
      { name: "Our Programs", path: "/programs" },
      { name: "Events", path: "/events" },
      { name: "Stories", path: "/stories" },
    ],
    resources: [
      { name: "Get Help", path: "/resources" },
      { name: "Mental Health", path: "/resources#mental-health" },
      { name: "Legal Aid", path: "/resources#legal" },
      { name: "FAQs", path: "/resources#faq" },
    ],
    getInvolved: [
      { name: "Volunteer", path: "/get-involved" },
      { name: "Donate", path: "/donate" },
      { name: "Partner With Us", path: "/get-involved#partner" },
      { name: "Contact", path: "/contact" },
    ],
    legal: [
      { name: "Privacy Policy", path: "/privacy" },
      { name: "Terms & Conditions", path: "/terms" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="bg-foreground text-background relative overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-background/20 to-transparent" />

      {/* Newsletter Section */}
      <div className="relative">
        <div className="container-padding mx-auto max-w-7xl py-16 md:py-20">
          <div className="bg-background/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-background/10 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">

            {/* Decorative blob in newsletter */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="text-center md:text-left relative z-10 max-w-lg">
              <h3 className="font-display text-2xl md:text-3xl font-bold mb-3">
                Join our community of changemakers
              </h3>
              <p className="text-background/60 text-lg leading-relaxed">
                Get the latest updates on our impact, events, and ways to support the cause.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row w-full md:w-auto gap-3 relative z-10">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background/10 border-background/10 text-background placeholder:text-background/40 w-full md:w-80 h-12 rounded-xl focus:border-primary/50 focus:ring-primary/20 transition-all font-medium"
                required
              />
              <Button
                type="submit"
                variant="default"
                className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 px-8 rounded-xl font-semibold shadow-lg shadow-primary/20 transition-all hover:scale-105"
                disabled={isLoading}
              >
                {isLoading ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-padding mx-auto max-w-7xl pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-8">
            <Link to="/" className="flex items-center gap-3 w-fit">
              <div className="w-12 h-12 rounded-2xl pride-gradient flex items-center justify-center shadow-lg shadow-white/5">
                <Heart className="w-6 h-6 text-white fill-white/20" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-2xl tracking-tight">
                  Sneh<span className="text-primary"> Jeet</span>
                </span>
                <span className="text-xs font-bold tracking-widest uppercase text-background/40">
                  Social Welfare Society
                </span>
              </div>
            </Link>

            <p className="text-background/60 text-lg leading-relaxed max-w-md">
              Creating a world where every LGBTQIA+ individual lives with dignity,
              respect, and full equality. Together, we build community, fight for rights, and change lives.
            </p>

            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full border border-background/10 flex items-center justify-center text-background/60 hover:text-background hover:bg-background/10 hover:border-background/20 transition-all duration-300"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            <div className="space-y-4 pt-4">
              <a href="#" className="flex items-center gap-3 text-background/60 hover:text-primary transition-colors group w-fit">
                <div className="w-8 h-8 rounded-full bg-background/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <MapPin className="w-4 h-4" />
                </div>
                <span>123 Rainbow Street, Pride City, PC 12345</span>
              </a>
              <a href="tel:1-800-PRIDE-HELP" className="flex items-center gap-3 text-background/60 hover:text-primary transition-colors group w-fit">
                <div className="w-8 h-8 rounded-full bg-background/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <span>1-800-PRIDE-HELP</span>
              </a>
              <a href="mailto:hello@prideconnect.org" className="flex items-center gap-3 text-background/60 hover:text-primary transition-colors group w-fit">
                <div className="w-8 h-8 rounded-full bg-background/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <span>hello@prideconnect.org</span>
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-2 lg:col-start-7">
            <h4 className="font-display font-bold text-lg mb-6">Organization</h4>
            <ul className="space-y-4">
              {footerLinks.organization.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-background/60 hover:text-primary hover:translate-x-1 transition-all duration-200 inline-block font-medium"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-display font-bold text-lg mb-6">Resources</h4>
            <ul className="space-y-4">
              {footerLinks.resources.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-background/60 hover:text-primary hover:translate-x-1 transition-all duration-200 inline-block font-medium"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-display font-bold text-lg mb-6">Get Involved</h4>
            <ul className="space-y-4">
              {footerLinks.getInvolved.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-background/60 hover:text-primary hover:translate-x-1 transition-all duration-200 inline-block font-medium"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/5 bg-black/20 backdrop-blur-sm">
        <div className="container-padding mx-auto max-w-7xl py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="text-sm text-background/40 font-medium">
              © {currentYear} Sneh Jeet Social Welfare Society. All rights reserved.
            </span>
            <div className="flex flex-wrap items-center gap-6 text-sm text-background/40">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="hover:text-background transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
