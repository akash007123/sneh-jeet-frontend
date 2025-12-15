import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const AboutPreview = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-padding mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Visual side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="relative">
              {/* Main image placeholder */}
              <div className="aspect-[4/3] bg-gradient-to-br from-warm via-safe to-hope rounded-3xl overflow-hidden shadow-medium">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <Heart className="w-16 h-16 text-primary mx-auto mb-4" />
                    <p className="font-display text-xl font-semibold text-foreground">
                      Empowering Community
                    </p>
                  </div>
                </div>
              </div>

              {/* Accent card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute -bottom-6 -right-6 bg-card rounded-2xl p-6 shadow-medium border border-border max-w-[200px]"
              >
                <div className="font-display text-3xl font-bold text-primary mb-1">15+</div>
                <div className="text-sm text-muted-foreground">Years serving our community</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              About Us
            </span>
            
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              A Community Built on{" "}
              <span className="text-primary">Love & Acceptance</span>
            </h2>
            
            <p className="text-muted-foreground text-lg mb-6">
              Since 2010, PrideConnect has been a beacon of hope and support for the 
              LGBTQIA+ community. We believe every person deserves to live authentically, 
              free from discrimination and fear.
            </p>
            
            <p className="text-muted-foreground mb-8">
              Our team of dedicated advocates, counselors, and volunteers work tirelessly 
              to provide mental health support, legal aid, healthcare access, and 
              community programs that make a real difference in people's lives.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button asChild variant="default" size="lg">
                <Link to="/about">
                  Our Story
                  <ArrowRight className="w-5 h-5 ml-1" />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="lg">
                <Link to="/programs">View Programs</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
