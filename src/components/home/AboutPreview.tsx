import { Link } from "react-router-dom";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { ArrowRight, Heart, Users, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const AboutPreview = () => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const controls = animate(count, 15, { duration: 2, delay: 0.5 });
    return controls.stop;
  }, [count]);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
    transition: { staggerChildren: 0.2 }
  };

  const floatingAnimation = {
    animate: { y: [0, -10, 0] },
    transition: {
      duration: 3,
      repeat: Infinity
    }
  };

  const pulseAnimation = {
    animate: { scale: [1, 1.05, 1] },
    transition: {
      duration: 2,
      repeat: Infinity
    }
  };

  const iconVariants = {
    hover: {
      rotate: [0, 10, -10, 10, 0],
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="section-padding bg-gradient-to-b from-background to-background/80 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-10 w-96 h-96 bg-safe/5 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="container-padding mx-auto max-w-7xl relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Visual side - Enhanced */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
            className="relative"
          >
            {/* Main container with layered cards effect */}
            <div className="relative">
              {/* Main image card with gradient border */}
              <motion.div
                {...floatingAnimation}
                className="relative z-10"
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-warm/20 via-safe/20 to-hope/20 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-sm border border-white/10">
                  {/* Animated gradient overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <motion.div
                      variants={iconVariants}
                      animate={isHovered ? "hover" : "initial"}
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                      className="text-center"
                    >
                      <Heart className="w-20 h-20 text-primary mx-auto mb-6 drop-shadow-lg" />
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="font-display text-2xl font-bold bg-gradient-to-r from-primary to-safe bg-clip-text text-transparent"
                      >
                        Empowering Community
                      </motion.p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Floating decorative elements */}
              <motion.div
                {...floatingAnimation}
                className="absolute -top-6 -left-6 z-0"
              >
                <div className="w-32 h-32 bg-gradient-to-br from-warm/30 to-transparent rounded-2xl rotate-12" />
              </motion.div>

              <motion.div
                animate={{
                  rotate: 360,
                  transition: {
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }
                }}
                className="absolute -bottom-4 -right-4 z-0"
              >
                <div className="w-24 h-24 border-2 border-dashed border-primary/30 rounded-full" />
              </motion.div>

              {/* Stats card with counter animation */}
              <motion.div
                {...fadeInUp}
                transition={{ delay: 0.4 }}
                className="absolute -bottom-8 -right-4 bg-card/90 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/20 max-w-[220px] z-20"
              >
                <div className="flex items-center gap-3 mb-3">
                  <motion.div
                    {...pulseAnimation}
                    className="p-2 bg-primary/10 rounded-lg"
                  >
                    <Sparkles className="w-5 h-5 text-primary" />
                  </motion.div>
                  <div className="font-display text-4xl font-bold text-primary">
                    <motion.span>{rounded}</motion.span>+
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">Years serving our community</div>
              </motion.div>

              {/* Additional stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="absolute -left-6 top-1/3 bg-card/90 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/20 max-w-[180px] z-20"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-safe" />
                  <div className="font-display text-2xl font-bold text-foreground">50,000+</div>
                </div>
                <div className="text-xs text-muted-foreground">Lives impacted</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content side - Enhanced */}
          <motion.div
            {...staggerChildren}
            className="relative"
          >
            {/* Tag with animation */}
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-safe/10 text-primary text-sm font-medium mb-6 border border-white/10"
            >
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-2 h-2 bg-primary rounded-full"
              />
              About Us
            </motion.span>
            
            {/* Animated heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 leading-tight"
            >
              A Community Built on{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-primary via-safe to-hope bg-clip-text text-transparent">
                  Love & Acceptance
                </span>
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-safe"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
              </span>
            </motion.h2>
            
            {/* Content with staggered animation */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ staggerChildren: 0.1 }}
            >
              <motion.p
                variants={fadeInUp}
                className="text-muted-foreground text-lg md:text-xl mb-6 leading-relaxed"
              >
                Since 2010, <span className="font-semibold text-foreground">Sneh Jeet Social Welfare Society</span> has been a beacon of hope and support for the 
                LGBTQIA+ community. We believe every person deserves to live authentically, 
                free from discrimination and fear.
              </motion.p>
              
              <motion.p
                variants={fadeInUp}
                className="text-muted-foreground mb-8 leading-relaxed"
              >
                Our team of dedicated advocates, counselors, and volunteers work tirelessly 
                to provide mental health support, legal aid, healthcare access, and 
                community programs that make a real difference in people's lives.
              </motion.p>
            </motion.div>

            {/* Values showcase */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              {[
                { icon: Shield, label: "Safe Space", color: "text-safe" },
                { icon: Heart, label: "Compassion", color: "text-warm" },
                { icon: Users, label: "Inclusion", color: "text-hope" }
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="flex items-center gap-2 px-4 py-2 bg-card/50 rounded-lg backdrop-blur-sm border border-white/10"
                >
                  <item.icon className={`w-4 h-4 ${item.color}`} />
                  <span className="text-sm font-medium">{item.label}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Buttons with enhanced animations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  asChild
                  variant="default"
                  size="lg"
                  className="relative overflow-hidden group bg-gradient-to-r from-primary to-safe hover:from-primary/90 hover:to-safe/90"
                >
                  <Link to="/about" className="flex items-center gap-2">
                    <span className="relative z-10">Our Story</span>
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="relative z-10"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/20 to-primary/0"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                  </Link>
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  asChild
                  variant="ghost"
                  size="lg"
                  className="border-2 border-white/10 hover:border-primary/30 hover:bg-primary/5"
                >
                  <Link to="/programs">View Programs</Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative bottom element */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 pt-8 border-t border-white/10"
        >
          <div className="flex justify-center">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-1 h-8 bg-gradient-to-b from-primary to-transparent rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutPreview;