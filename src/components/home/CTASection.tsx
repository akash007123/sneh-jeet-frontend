import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="section-padding bg-foreground text-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 pride-gradient rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 pride-gradient rounded-full blur-3xl" />
      </div>

      <div className="container-padding mx-auto max-w-7xl relative">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-background/10 text-background/90 text-sm font-medium mb-6">
              Make a Difference
            </span>
            
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Your Support{" "}
              <span className="pride-text">Changes Lives</span>
            </h2>
            
            <p className="text-background/70 text-lg mb-10 max-w-2xl mx-auto">
              Every donation helps us provide crisis support, mental health services, 
              legal aid, and community programs. Together, we can create a more 
              inclusive world.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild variant="default" size="xl" className="bg-primary hover:bg-primary/90">
                <Link to="/donate">
                  Donate Now
                  <Heart className="w-5 h-5 ml-1" />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="xl" className="text-background hover:bg-background/10">
                <Link to="/get-involved">
                  Get Involved
                  <ArrowRight className="w-5 h-5 ml-1" />
                </Link>
              </Button>
            </div>

            <div className="mt-12 pt-8 border-t border-background/10">
              <p className="text-background/60 mb-2">Need immediate help?</p>
              <a 
                href="tel:1-800-PRIDE-HELP" 
                className="inline-flex items-center gap-2 text-xl font-semibold text-background hover:text-primary transition-colors"
              >
                <Phone className="w-5 h-5" />
                1-800-PRIDE-HELP
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
