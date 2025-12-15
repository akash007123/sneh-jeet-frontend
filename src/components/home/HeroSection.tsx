import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Shield, Users, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-warm" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-pride-red rounded-full animate-float" />
      <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-pride-blue rounded-full animate-float" style={{ animationDelay: "0.5s" }} />
      <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-pride-yellow rounded-full animate-float" style={{ animationDelay: "1s" }} />

      {/* Pride stripe accent */}
      <div className="absolute top-0 left-0 right-0 h-1 pride-gradient" />

      <div className="container-padding mx-auto max-w-7xl relative pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-safe text-safe-foreground text-sm font-medium mb-6">
              <Shield className="w-4 h-4" />
              A Safe Space For Everyone
            </span>
            
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              Together, We Build{" "}
              <span className="pride-text">Community</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl">
              PrideConnect is dedicated to creating a world where every LGBTQIA+ 
              individual lives with dignity, respect, and full equality. 
              Your journey matters to us.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Button asChild variant="hero" size="xl">
                <Link to="/donate">
                  Donate Now
                  <Heart className="w-5 h-5 ml-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="xl">
                <Link to="/resources">
                  Get Help
                  <ArrowRight className="w-5 h-5 ml-1" />
                </Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-safe flex items-center justify-center">
                  <Shield className="w-5 h-5 text-safe-foreground" />
                </div>
                <span>100% Confidential</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-warm flex items-center justify-center">
                  <Users className="w-5 h-5 text-warm-foreground" />
                </div>
                <span>50,000+ Helped</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-hope flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-hope-foreground" />
                </div>
                <span>24/7 Support</span>
              </div>
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:block relative"
          >
            <div className="relative">
              {/* Main card */}
              <div className="bg-card rounded-3xl p-8 shadow-medium border border-border">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Heart, label: "Mental Health", color: "bg-warm" },
                    { icon: Shield, label: "Legal Aid", color: "bg-safe" },
                    { icon: Users, label: "Community", color: "bg-hope" },
                    { icon: Sparkles, label: "Youth Support", color: "bg-primary/10" },
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className={`${item.color} rounded-2xl p-6 text-center`}
                    >
                      <item.icon className="w-8 h-8 mx-auto mb-3 text-foreground/80" />
                      <span className="text-sm font-medium text-foreground">{item.label}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Floating accent cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 bg-primary text-primary-foreground rounded-2xl px-4 py-3 shadow-glow"
              >
                <span className="text-sm font-medium">🏳️‍🌈 You belong here</span>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 -left-4 bg-secondary text-secondary-foreground rounded-2xl px-4 py-3 shadow-medium"
              >
                <span className="text-sm font-medium">💜 24/7 Crisis Support</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
