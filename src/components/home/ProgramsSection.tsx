import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Heart, Scale, Stethoscope, Users, Sparkles, GraduationCap, ChevronRight, Star, Target, Calendar, CheckCircle } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import { programs } from "@/data/mockData";
import { useState } from "react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Heart,
  Scale,
  Stethoscope,
  Users,
  Sparkles,
  GraduationCap,
};

const colorMap: Record<string, { bg: string; text: string; gradient: string }> = {
  primary: {
    bg: "bg-gradient-to-br from-primary/10 via-primary/5 to-transparent",
    text: "text-primary",
    gradient: "from-primary to-primary/60"
  },
  secondary: {
    bg: "bg-gradient-to-br from-secondary/10 via-secondary/5 to-transparent",
    text: "text-secondary",
    gradient: "from-secondary to-secondary/60"
  },
  accent: {
    bg: "bg-gradient-to-br from-accent/10 via-accent/5 to-transparent",
    text: "text-accent",
    gradient: "from-accent to-accent/60"
  },
};

const ProgramsSection = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        stiffness: 100,
        damping: 15
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        stiffness: 400,
        damping: 25
      }
    }
  };

  const iconVariants = {
    initial: { rotate: 0 },
    hover: { rotate: 360, transition: { duration: 0.6, ease: "easeInOut" } }
  };

  return (
    <>
      <Helmet>
        <title>Programs & Services - Sneh Jeet NGO</title>
        <meta name="description" content="Comprehensive support tailored to the unique needs of our community" />
        <meta name="keywords" content="programs, services, support, LGBTQIA+, community" />
        <link rel="canonical" href="/#programs" />
        <meta property="og:title" content="Programs & Services - Sneh Jeet NGO" />
        <meta property="og:description" content="Comprehensive support tailored to the unique needs of our community" />
        <meta property="og:image" content="/logo.png" />
        <meta property="og:url" content="/#programs" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Programs & Services - Sneh Jeet NGO" />
        <meta name="twitter:description" content="Comprehensive support tailored to the unique needs of our community" />
        <meta name="twitter:image" content="/logo.png" />
      </Helmet>
      
      <section className="section-padding relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl"
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"
            animate={{
              x: [0, -40, 0],
              y: [0, 40, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(120,119,198,0.05)_1px,transparent_0)] bg-[size:40px_40px]" />
        </div>

        <div className="container-padding mx-auto max-w-7xl relative">
          {/* Enhanced Section Heading */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-white/10 backdrop-blur-sm mb-4"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full"
              />
              <span className="text-sm font-medium text-primary">What We Do</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4"
            >
              Programs &{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Services
                </span>
                <motion.span
                  className="absolute -bottom-2 left-0 w-full h-1.5 bg-gradient-to-r from-primary to-secondary"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                />
              </span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            >
              Comprehensive support tailored to the unique needs of our community
            </motion.p>
          </div>

          {/* Stats Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-card/80 to-card/40 backdrop-blur-sm rounded-2xl p-6 border border-white/10 shadow-lg mb-12"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: "50+", label: "Active Programs", icon: Target },
                { value: "1000+", label: "Monthly Participants", icon: Users },
                { value: "95%", label: "Satisfaction Rate", icon: Star },
                { value: "24/7", label: "Support Available", icon: Calendar }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ y: -4 }}
                  className="text-center p-4"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 mb-3">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="font-display text-3xl font-bold text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Programs Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {programs.map((program, index) => {
              const Icon = iconMap[program.icon] || Heart;
              const colors = colorMap[program.color] || colorMap.primary;
              
              return (
                <motion.div
                  key={program.id}
                  variants={cardVariants}
                  whileHover="hover"
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="relative group"
                >
                  {/* Animated border */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 p-[1.5px] opacity-0 group-hover:opacity-100"
                    animate={{
                      background: hoveredCard === index 
                        ? ["linear-gradient(45deg, var(--primary) 0%, var(--secondary) 50%, var(--accent) 100%)"]
                        : ["linear-gradient(45deg, transparent 0%, transparent 50%, transparent 100%)"]
                    }}
                    transition={{ duration: 0.5 }}
                  />
                  
                  {/* Main card */}
                  <div className={`relative rounded-3xl ${colors.bg} p-8 h-full border border-white/10 backdrop-blur-sm transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-primary/20 overflow-hidden`}>
                    {/* Floating background icon */}
                    <motion.div
                      animate={{ 
                        y: [0, -10, 0],
                        opacity: [0.05, 0.1, 0.05]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="absolute -right-4 -top-4 opacity-10"
                    >
                      <Icon className="w-32 h-32" />
                    </motion.div>
                    
                    {/* Icon container */}
                    <motion.div
                      variants={iconVariants}
                      whileHover="hover"
                      className={`relative w-16 h-16 rounded-2xl ${colors.bg} flex items-center justify-center mb-6 group-hover:shadow-lg transition-shadow duration-300`}
                    >
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <Icon className={`w-8 h-8 ${colors.text} relative z-10`} />
                      
                      {/* Animated ring */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl border-2 border-transparent"
                        animate={{
                          borderColor: hoveredCard === index 
                            ? [colors.text, "transparent", colors.text]
                            : "transparent"
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity
                        }}
                      />
                    </motion.div>
                    
                    {/* Title */}
                    <h3 className="font-display text-2xl font-bold text-foreground mb-4 relative">
                      {program.title}
                      <motion.div
                        className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-primary to-secondary"
                        initial={{ width: 0 }}
                        whileInView={{ width: 32 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                      />
                    </h3>
                    
                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {program.description}
                    </p>
                    
                    {/* Features list */}
                    <div className="space-y-2 mb-8">
                      {program.features?.slice(0, 3).map((feature, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 * i }}
                          className="flex items-center gap-2"
                        >
                          <CheckCircle className="w-4 h-4 text-safe" />
                          <span className="text-sm">{feature}</span>
                        </motion.div>
                      )) || (
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-safe" />
                          <span className="text-sm">Comprehensive support services</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 text-center"
          >
            <div className="relative">
              {/* Decorative elements */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -left-8 top-1/2 w-16 h-16 border-2 border-dashed border-primary/20 rounded-full"
              />
              
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -right-8 top-1/2 w-4 h-4 bg-gradient-to-r from-primary to-secondary rounded-full"
              />
              
              <Button
                asChild
                size="lg"
                className="relative overflow-hidden group bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg shadow-primary/20"
              >
                <Link to="/programs" className="flex items-center gap-2 px-8">
                  <span className="relative z-10">Explore All Programs</span>
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="relative z-10"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.span>
                  
                  {/* Button shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                </Link>
              </Button>
            </div>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-sm text-muted-foreground mt-4"
            >
              Join thousands who have found support through our programs
            </motion.p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ProgramsSection;