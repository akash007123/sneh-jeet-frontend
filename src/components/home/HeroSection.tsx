import { Link } from "react-router-dom";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { ArrowRight, Heart, Shield, Users, Sparkles, ChevronRight, Star, Globe, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const HeroSection = () => {
  const [counter, setCounter] = useState(0);
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    const controls = animate(count, 50000, {
      duration: 2.5,
      ease: "easeOut",
    });
    return controls.stop;
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => (prev >= 3 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const rotatingWords = ["Community", "Hope", "Equality", "Pride"];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 80%, rgba(120, 219, 255, 0.15) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-primary/5" />
        
        {/* Animated floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            initial={{
              x: Math.random() * 100 + "vw",
              y: Math.random() * 100 + "vh",
            }}
            animate={{
              x: Math.random() * 100 + "vw",
              y: Math.random() * 100 + "vh",
            }}
            transition={{
              duration: 20 + Math.random() * 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Animated Pride Gradient Bars */}
      <div className="absolute top-0 left-0 right-0 h-1 overflow-hidden">
        <motion.div
          className="h-full pride-gradient"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 2, ease: "linear", repeat: Infinity }}
        />
      </div>

      {/* Geometric Background Elements */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 -right-48 w-96 h-96 border border-primary/10 rounded-full"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/4 -left-48 w-96 h-96 border border-secondary/10 rounded-full"
      />

      {/* Glowing Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-20 right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        className="absolute bottom-20 left-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
      />

      <div className="container-padding mx-auto max-w-7xl relative z-10 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Animated Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-safe/10 backdrop-blur-sm border border-safe/20 text-safe-foreground text-sm font-medium mb-6"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Shield className="w-4 h-4" />
              </motion.div>
              <span>A Safe Space For Everyone</span>
              <motion.div
                animate={{ x: [0, 2, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Sparkles className="w-3 h-3 ml-1" />
              </motion.div>
            </motion.div>

            {/* Animated Headline */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              Together, We Build{" "}
              <motion.span
                key={counter}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="pride-text bg-clip-text text-transparent bg-gradient-to-r from-pride-red via-pride-yellow to-pride-blue"
              >
                {rotatingWords[counter]}
              </motion.span>
            </h1>

            {/* Animated Paragraph */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl leading-relaxed"
            >
              PrideConnect is dedicated to creating a world where every LGBTQIA+
              individual lives with dignity, respect, and full equality.
              <motion.span
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block ml-1"
              >
                ✨
              </motion.span>
            </motion.p>

            {/* Animated Buttons */}
            <div className="flex flex-wrap gap-4 mb-12">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button asChild variant="hero" size="xl" className="group">
                  <Link to="/donate">
                    <motion.span
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Heart className="w-5 h-5 mr-2" />
                    </motion.span>
                    Donate Now
                    <motion.div
                      initial={{ x: 0 }}
                      animate={{ x: 5 }}
                      transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                    >
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </motion.div>
                  </Link>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button asChild variant="outline" size="xl" className="group backdrop-blur-sm">
                  <Link to="/resources">
                    Get Help
                    <motion.div
                      className="ml-2"
                      animate={{ rotate: 0 }}
                      whileHover={{ rotate: 90 }}
                      transition={{ type: "spring" }}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </motion.div>
                  </Link>
                </Button>
              </motion.div>
            </div>

            {/* Animated Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground"
            >
              {[
                {
                  icon: Shield,
                  label: "100% Confidential",
                  bg: "bg-safe/20",
                  iconColor: "text-safe",
                  delay: 0,
                },
                {
                  icon: Users,
                  label: "50,000+ Helped",
                  bg: "bg-warm/20",
                  iconColor: "text-warm",
                  delay: 0.1,
                },
                {
                  icon: Sparkles,
                  label: "24/7 Support",
                  bg: "bg-hope/20",
                  iconColor: "text-hope",
                  delay: 0.2,
                },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-3 p-3 rounded-2xl backdrop-blur-sm border border-border/50"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className={`w-10 h-10 rounded-full ${item.bg} flex items-center justify-center`}
                  >
                    <item.icon className={`w-5 h-5 ${item.iconColor}`} />
                  </motion.div>
                  <div>
                    {item.label === "50,000+ Helped" ? (
                      <div className="font-semibold text-foreground">
                        <motion.span>{rounded}</motion.span>+ Helped
                      </div>
                    ) : (
                      <div className="font-semibold text-foreground">{item.label}</div>
                    )}
                    <div className="text-xs text-muted-foreground">Trusted Service</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Visual Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block relative"
          >
            {/* Floating 3D Card */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              {/* Main Card with Glass Morphism */}
              <div className="bg-card/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/10 relative overflow-hidden">
                {/* Card Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30" />
                </div>
                
                <div className="grid grid-cols-2 gap-4 relative z-10">
                  {[
                    { 
                      icon: Heart, 
                      label: "Mental Health", 
                      color: "bg-warm/20", 
                      borderColor: "border-warm/30",
                      delay: 0.4 
                    },
                    { 
                      icon: Shield, 
                      label: "Legal Aid", 
                      color: "bg-safe/20", 
                      borderColor: "border-safe/30",
                      delay: 0.5 
                    },
                    { 
                      icon: Users, 
                      label: "Community", 
                      color: "bg-hope/20", 
                      borderColor: "border-hope/30",
                      delay: 0.6 
                    },
                    { 
                      icon: Globe, 
                      label: "Youth Support", 
                      color: "bg-primary/10", 
                      borderColor: "border-primary/20",
                      delay: 0.7 
                    },
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: item.delay }}
                      whileHover={{ 
                        scale: 1.05, 
                        y: -5,
                        transition: { type: "spring", stiffness: 300 }
                      }}
                      className={`${item.color} ${item.borderColor} border rounded-2xl p-6 text-center backdrop-blur-sm`}
                    >
                      <motion.div
                        animate={{ rotate: [0, 5, 0] }}
                        transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                      >
                        <item.icon className="w-8 h-8 mx-auto mb-3 text-foreground/80" />
                      </motion.div>
                      <span className="text-sm font-medium text-foreground">{item.label}</span>
                      <motion.div
                        className="mt-2 w-4 h-0.5 bg-current mx-auto rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: 16 }}
                        transition={{ delay: item.delay + 0.2 }}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Floating Badge 1 */}
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 bg-primary text-primary-foreground rounded-2xl px-6 py-4 shadow-2xl shadow-primary/25"
              >
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Star className="w-4 h-4" />
                  </motion.div>
                  <span className="text-sm font-medium">🏳️‍🌈 You belong here</span>
                </div>
              </motion.div>

              {/* Floating Badge 2 */}
              <motion.div
                animate={{ 
                  y: [0, 15, 0],
                  rotate: [0, -3, 0]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-4 -left-4 bg-secondary text-secondary-foreground rounded-2xl px-6 py-4 shadow-2xl shadow-secondary/25"
              >
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  <span className="text-sm font-medium">💜 24/7 Crisis Support</span>
                </div>
              </motion.div>

              {/* Pulse Effect */}
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 border-2 border-primary/30 rounded-3xl"
              />
            </motion.div>

            {/* Stats Counter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mt-8 flex items-center justify-center gap-8"
            >
              <div className="text-center">
                <div className="text-3xl font-bold pride-text">98%</div>
                <div className="text-sm text-muted-foreground">Satisfaction</div>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="text-center">
                <div className="text-3xl font-bold pride-text">500+</div>
                <div className="text-sm text-muted-foreground">Volunteers</div>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="text-center">
                <div className="text-3xl font-bold pride-text">24/7</div>
                <div className="text-sm text-muted-foreground">Available</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-border rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-primary rounded-full mt-2"
          />
        </div>
      </motion.div>

      {/* Add these styles to your global CSS */}
      <style>{`
        .pride-text {
          background: linear-gradient(
            90deg,
            #ff0018 0%,
            #ffa52c 20%,
            #ffff41 40%,
            #008018 60%,
            #0000f9 80%,
            #86007d 100%
          );
          background-size: 200% auto;
          animation: shine 3s linear infinite;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        @keyframes shine {
          to {
            background-position: 200% center;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;