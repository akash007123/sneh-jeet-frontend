import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight, Play, Heart, Sparkles, User } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { testimonials } from "@/data/mockData";
import { useState, useEffect } from "react";

// Placeholder image service - you can replace with your actual image URLs
const getImageUrl = (name: string, index: number) => {
  // Using a placeholder service - replace with actual image URLs from your data
  // You can modify this function to return actual image URLs when you have them
  return `https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?semt=ais_hybrid&w=740&q=80`;
};

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [imageError, setImageError] = useState<Record<number, boolean>>({});

  const testimonialsPerView = 3; // Default for desktop
  const totalGroups = Math.ceil(testimonials.length / testimonialsPerView);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % totalGroups);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalGroups]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + totalGroups) % totalGroups);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % totalGroups);
  };

  const handleDotClick = (index: number) => {
    setIsAutoPlaying(false);
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
      />
    ));
  };

  // Function to handle image loading errors
  const handleImageError = (id: number) => {
    setImageError(prev => ({ ...prev, [id]: true }));
  };

  return (
    <section className="section-padding relative overflow-hidden bg-gradient-to-b from-background via-background/95 to-muted/20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Floating hearts */}
        {[10, 50, 90].map((left, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: `${left}%`, top: `${10 + i * 20}%` }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360, 0],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.5
            }}
          >
            <Heart className="w-8 h-8 text-primary/20" />
          </motion.div>
        ))}
      </div>

      <div className="container-padding mx-auto max-w-7xl relative">
        {/* Enhanced Section Heading */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-white/10 backdrop-blur-sm mb-4"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full"
            />
            <span className="text-sm font-medium text-primary">Voices of Change</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4"
          >
            Stories From{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Our Community
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
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            Real experiences from the people whose lives we've touched
          </motion.p>
        </div>

        {/* Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-card/80 to-card/40 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-lg mb-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "4.9", label: "Average Rating", icon: Star, suffix: "/5" },
              { value: "500+", label: "Stories Shared", icon: Quote },
              { value: "98%", label: "Would Recommend", icon: Heart },
              { value: "100%", label: "Confidential", icon: Sparkles }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="text-center p-4"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 mb-3">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="font-display text-3xl font-bold text-foreground mb-1">
                  {stat.value}
                  {stat.suffix && <span className="text-lg text-muted-foreground">{stat.suffix}</span>}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative mb-12">
          {/* Navigation Buttons */}
          <motion.button
            onClick={handlePrev}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-gradient-to-r from-card/80 to-card/40 backdrop-blur-md border border-white/10 shadow-lg flex items-center justify-center hover:border-primary/30 transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>
          
          <motion.button
            onClick={handleNext}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-gradient-to-r from-card/80 to-card/40 backdrop-blur-md border border-white/10 shadow-lg flex items-center justify-center hover:border-primary/30 transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>

          {/* Auto-play toggle */}
          <motion.button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="absolute top-4 right-4 z-20 px-4 py-2 rounded-full bg-gradient-to-r from-card/80 to-card/40 backdrop-blur-md border border-white/10 shadow-lg flex items-center gap-2 hover:border-primary/30 transition-all"
          >
            <Play className={`w-4 h-4 ${isAutoPlaying ? "text-primary" : "text-muted-foreground"}`} />
            <span className="text-sm font-medium">
              {isAutoPlaying ? "Playing" : "Paused"}
            </span>
          </motion.button>

          {/* Carousel Container */}
          <div className="overflow-hidden py-4">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="grid md:grid-cols-3 gap-6"
              >
                {testimonials
                  .slice(
                    activeIndex * testimonialsPerView,
                    (activeIndex + 1) * testimonialsPerView
                  )
                  .map((testimonial, index) => {
                    const globalIndex = activeIndex * testimonialsPerView + index;
                    
                    return (
                      <motion.div
                        key={testimonial.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -8 }}
                        className="group relative"
                      >
                        {/* Animated border */}
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 p-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Main testimonial card */}
                        <div className="relative h-full bg-gradient-to-b from-card/80 to-card/40 backdrop-blur-sm rounded-3xl p-8 border border-white/10 overflow-hidden">
                          {/* Floating quote icon */}
                          <motion.div
                            animate={{ 
                              y: [0, -10, 0],
                              rotate: [0, 5, -5, 0]
                            }}
                            transition={{
                              duration: 4,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                            className="absolute top-6 right-6"
                          >
                            <Quote className="w-16 h-16 text-primary/10" />
                          </motion.div>
                          
                          {/* Rating stars */}
                          <div className="flex gap-1 mb-6">
                            {renderStars(testimonial.rating || 5)}
                          </div>
                          
                          {/* Quote text */}
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg text-foreground/90 italic leading-relaxed mb-8 relative z-10"
                          >
                            "{testimonial.quote}"
                          </motion.p>
                          
                          {/* Author info */}
                          <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                            {/* Profile image with gradient border */}
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              className="relative"
                            >
                              <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary p-[2px]">
                                {!imageError[testimonial.id] ? (
                                  <img
                                    src={getImageUrl(testimonial.name, globalIndex)}
                                    alt={testimonial.name}
                                    className="w-full h-full rounded-full object-cover bg-card"
                                    onError={() => handleImageError(testimonial.id)}
                                    loading="lazy"
                                  />
                                ) : (
                                  <div className="w-full h-full rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                                    <User className="w-6 h-6 text-primary" />
                                  </div>
                                )}
                              </div>
                              
                              {/* Animated ring */}
                              <motion.div
                                className="absolute -inset-2 rounded-full border-2 border-primary/30"
                                animate={{
                                  scale: [1, 1.2, 1],
                                  opacity: [0.5, 0, 0.5]
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity
                                }}
                              />
                            </motion.div>
                            
                            <div className="flex-1">
                              <div className="font-display text-lg font-semibold text-foreground">
                                {testimonial.name}
                              </div>
                              <div className="text-sm text-muted-foreground mb-1">
                                {testimonial.role}
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-safe" />
                                <span className="text-xs text-muted-foreground">
                                  Member since {testimonial.year || "2023"}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Hover overlay */}
                          <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </motion.div>
                    );
                  })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center items-center gap-2 mb-12">
          {Array.from({ length: totalGroups }).map((_, index) => (
            <motion.button
              key={index}
              onClick={() => handleDotClick(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="relative"
            >
              <motion.div
                className={`w-3 h-3 rounded-full transition-all ${index === activeIndex ? "bg-gradient-to-r from-primary to-secondary" : "bg-muted-foreground/30"}`}
                animate={
                  index === activeIndex && isAutoPlaying
                    ? { scale: [1, 1.2, 1] }
                    : {}
                }
                transition={{ duration: 2, repeat: Infinity }}
              />
              {index === activeIndex && (
                <motion.div
                  className="absolute -inset-2 rounded-full border-2 border-primary/30"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Testimonial Images Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h3 className="font-display text-2xl font-bold text-center text-foreground mb-8">
            Faces of Our Community
          </h3>
          
          <div className="flex flex-wrap justify-center gap-4">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, zIndex: 10 }}
                className="relative group cursor-pointer"
                onClick={() => {
                  setIsAutoPlaying(false);
                  const cardIndex = Math.floor(index / testimonialsPerView);
                  setActiveIndex(cardIndex);
                }}
              >
                <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border-2 border-transparent group-hover:border-primary transition-all duration-300">
                  {!imageError[testimonial.id] ? (
                    <img
                      src={getImageUrl(testimonial.name, index)}
                      alt={testimonial.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={() => handleImageError(testimonial.id)}
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <User className="w-8 h-8 text-primary" />
                    </div>
                  )}
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                    <span className="text-white text-xs font-medium truncate">
                      {testimonial.name}
                    </span>
                  </div>
                </div>
                
                {/* Active indicator */}
                {Math.floor(index / testimonialsPerView) === activeIndex && (
                  <motion.div
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-r from-primary to-secondary"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring" }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center bg-gradient-to-r from-card/50 to-card/20 backdrop-blur-sm rounded-3xl p-12 border border-white/10"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 mb-6"
          >
            <Heart className="w-10 h-10 text-primary" />
          </motion.div>
          
          <h3 className="font-display text-3xl font-bold text-foreground mb-4">
            Share Your Story
          </h3>
          
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Join our community of voices making a difference. Your experience could inspire others.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-primary-foreground font-medium shadow-lg shadow-primary/20"
            >
              Share Your Experience
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-full bg-card border border-white/10 font-medium hover:border-primary/30 transition-colors"
            >
              Read More Stories
            </motion.button>
          </div>
        </motion.div>

        {/* Decorative bottom element */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "80%" }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mx-auto mt-12 pt-8 border-t border-white/10 w-4/5"
        >
          <div className="flex justify-center">
            <motion.div
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-1 h-12 bg-gradient-to-b from-primary to-transparent rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;