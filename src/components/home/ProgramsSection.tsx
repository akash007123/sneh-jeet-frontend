import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Scale, Stethoscope, Users, Sparkles, GraduationCap } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import { programs } from "@/data/mockData";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Heart,
  Scale,
  Stethoscope,
  Users,
  Sparkles,
  GraduationCap,
};

const colorMap: Record<string, string> = {
  primary: "bg-primary/10 text-primary",
  secondary: "bg-secondary/20 text-secondary",
  accent: "bg-accent/10 text-accent",
};

const ProgramsSection = () => {
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
      <section className="section-padding bg-muted/30">
        <div className="container-padding mx-auto max-w-7xl">
          <SectionHeading
            badge="What We Do"
            title="Programs & Services"
            subtitle="Comprehensive support tailored to the unique needs of our community"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program, index) => {
              const Icon = iconMap[program.icon] || Heart;
              return (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="bg-card rounded-2xl p-6 h-full border border-border card-hover">
                    <div className={`w-14 h-14 rounded-xl ${colorMap[program.color]} flex items-center justify-center mb-4`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                      {program.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {program.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button asChild variant="outline" size="lg">
              <Link to="/programs">
                Explore All Programs
                <ArrowRight className="w-5 h-5 ml-1" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ProgramsSection;
