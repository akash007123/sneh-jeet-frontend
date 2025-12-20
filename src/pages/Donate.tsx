import { motion } from "framer-motion";
import type { RepeatType, AnimationGeneratorType } from "framer-motion";
import MainLayout from "@/layouts/MainLayout";
import PageHero from "@/components/PageHero";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, Mail, Clock, CheckCircle, ChevronRight } from "lucide-react";

const Donate = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(65);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const futureFeatures = [
    {
      title: "Secure Payment Gateway",
      description: "Multiple payment methods including cards, UPI, and crypto",
      icon: "🔒",
      color: "from-blue-500/10 to-blue-600/10",
      delay: 0.1
    },
    {
      title: "Recurring Donations",
      description: "Set up monthly contributions to support ongoing projects",
      icon: "🔄",
      color: "from-green-500/10 to-green-600/10",
      delay: 0.2
    },
    {
      title: "Transparent Tracking",
      description: "See exactly how your donation makes an impact",
      icon: "📊",
      color: "from-purple-500/10 to-purple-600/10",
      delay: 0.3
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as AnimationGeneratorType,
        stiffness: 100
      }
    }
  };

  const pulseVariants = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse" as RepeatType
      }
    }
  };

  return (
    <MainLayout>
      <PageHero
        badge={
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2"
          >
            <Heart className="w-4 h-4 fill-current" />
            Support Us
          </motion.div>
        }
        title="Donations Coming Soon"
        subtitle="We're building a secure donation system to better serve our community"
      />

      <section className="section-padding bg-gradient-to-b from-background to-background/80">
        <div className="container-padding mx-auto max-w-6xl">
          {/* Main Card with Progress */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden"
          >
            {/* Background decoration */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-full blur-3xl"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-24 -left-24 w-48 h-48 bg-gradient-to-r from-secondary/5 to-primary/5 rounded-full blur-3xl"
            />

            <div className="relative bg-card/80 backdrop-blur-sm rounded-3xl border border-border/50 shadow-2xl p-8 md:p-12">
              <div className="text-center mb-10">
                <motion.div
                  variants={pulseVariants}
                  initial="initial"
                  animate="animate"
                  className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl mb-6 border border-primary/20"
                >
                  <Clock className="w-10 h-10 text-primary" />
                </motion.div>
                
                <h2 className="text-4xl font-bold text-foreground mb-4">
                  Donation System in Progress
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  We're currently developing a secure and transparent donation platform. 
                  Implementation is planned for the near future.
                </p>
              </div>

              {/* Progress Bar */}
              <div className="max-w-2xl mx-auto mb-10">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-foreground">Development Progress</span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm font-bold text-primary"
                  >
                    {progress}%
                  </motion.span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full"
                  />
                </div>
              </div>

              {/* Contact Card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20 rounded-2xl p-6 mb-10"
              >
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-foreground">Need immediate assistance?</h3>
                      <p className="text-muted-foreground">Contact us for partnership or sponsorship inquiries</p>
                    </div>
                  </div>
                  <motion.a
                    whileHover={{ x: 5 }}
                    href="mailto:akashraikwar763@gmail.com"
                    className="group inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors"
                  >
                    <Link to="/contact">
                    Contact Now
                    </Link>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.a>
                </div>
              </motion.div>

              {/* Future Features */}
              <div className="mb-10">
                <h3 className="text-2xl font-bold text-center text-foreground mb-8">
                  Future Features
                </h3>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                  {futureFeatures.map((feature, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      onMouseEnter={() => setHoveredCard(index)}
                      onMouseLeave={() => setHoveredCard(null)}
                      className={`relative bg-gradient-to-br ${feature.color} border border-border/50 rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
                        hoveredCard === index ? "shadow-lg" : "shadow-md"
                      }`}
                    >
                      <motion.div
                        animate={{
                          scale: hoveredCard === index ? 1.1 : 1,
                          rotate: hoveredCard === index ? 5 : 0
                        }}
                        className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl mb-4 border border-white/20"
                      >
                        {feature.icon}
                      </motion.div>
                      <h4 className="text-xl font-semibold text-foreground mb-2">
                        {feature.title}
                      </h4>
                      <p className="text-muted-foreground">{feature.description}</p>
                      
                      {/* Hover indicator */}
                      {hoveredCard === index && (
                        <motion.div
                          layoutId="hoverBackground"
                          className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl -z-10"
                          transition={{ type: "spring", bounce: 0.2 }}
                        />
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* CTA Section */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full px-6 py-3 mb-6">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="text-foreground font-medium">
                    Subscribe to get notified when donations open
                  </span>
                </div>
                <p className="text-muted-foreground">
                  We appreciate your interest in supporting our mission. Stay tuned for updates!
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Floating Elements */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="fixed bottom-10 right-10 w-8 h-8 bg-primary/20 rounded-full hidden lg:block"
          />
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
            className="fixed top-1/4 left-10 w-6 h-6 bg-secondary/20 rounded-full hidden lg:block"
          />
        </div>
      </section>
    </MainLayout>
  );
};

export default Donate;