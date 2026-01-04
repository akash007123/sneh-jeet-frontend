import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Heart, Scale, Stethoscope, Users, Sparkles, GraduationCap, ArrowRight, Home, PawPrint } from "lucide-react";
import { Link } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { programs } from "@/data/mockData";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Heart,
  Scale,
  Stethoscope,
  Users,
  Sparkles,
  GraduationCap,
  Home,
  PawPrint,
};

const colorMap: Record<string, { bg: string; text: string }> = {
  primary: { bg: "bg-primary/10", text: "text-primary" },
  secondary: { bg: "bg-secondary/20", text: "text-secondary" },
  accent: { bg: "bg-accent/10", text: "text-accent" },
};

const detailedPrograms = [
  {
    ...programs[0],
    details: [
      "One-on-one counseling with LGBTQIA+ affirming therapists",
      "Weekly peer support groups",
      "24/7 crisis intervention hotline",
      "Trauma-informed care",
      "Online therapy options",
    ],
  },
  {
    ...programs[1],
    details: [
      "Free legal consultations",
      "Name and gender marker change assistance",
      "Discrimination case support",
      "Family law guidance",
      "Know Your Rights workshops",
    ],
  },
  {
    ...programs[2],
    details: [
      "Affirming provider directory",
      "Gender-affirming care navigation",
      "Insurance advocacy",
      "Sexual health resources",
      "HIV/AIDS support services",
    ],
  },
  {
    ...programs[3],
    details: [
      "Annual Pride celebrations",
      "Monthly social gatherings",
      "Networking events",
      "Cultural celebrations",
      "Community forums",
    ],
  },
  {
    ...programs[4],
    details: [
      "Safe space drop-in center",
      "Mentorship program",
      "College prep assistance",
      "Family acceptance resources",
      "Youth leadership development",
    ],
  },
  {
    ...programs[5],
    details: [
      "Workplace diversity training",
      "School inclusion programs",
      "Community education workshops",
      "Ally development courses",
      "Professional certifications",
    ],
  },
  {
    ...programs[6],
    details: [
      "Companionship visits for elderly",
      "Healthcare coordination and assistance",
      "Social activity programs",
      "Emergency response support",
      "Dignity and respect initiatives",
    ],
  },
  {
    ...programs[7],
    details: [
      "Daily feeding programs for animals",
      "Animal rescue operations",
      "Adoption facilitation services",
      "Veterinary care support",
      "Animal welfare advocacy",
    ],
  },
];

const Programs = () => {
  return (
    <MainLayout>
      <Helmet>
        <title>Programs - Sneh Jeet NGO</title>
        <meta name="description" content="Explore our comprehensive programs for LGBTQIA+ support, including mental health services, legal aid, healthcare navigation, community events, youth programs, and education initiatives." />
        <meta name="keywords" content="programs, LGBTQIA+, mental health, legal aid, healthcare, community events, youth support, education" />
        <link rel="canonical" href="/programs" />
        <meta property="og:title" content="Programs - Sneh Jeet NGO" />
        <meta property="og:description" content="Explore our comprehensive programs for LGBTQIA+ support, including mental health services, legal aid, healthcare navigation, community events, youth programs, and education initiatives." />
        <meta property="og:image" content="/logo.png" />
        <meta property="og:url" content="/programs" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Programs - Sneh Jeet NGO" />
        <meta name="twitter:description" content="Explore our comprehensive programs for LGBTQIA+ support, including mental health services, legal aid, healthcare navigation, community events, youth programs, and education initiatives." />
        <meta name="twitter:image" content="/logo.png" />
      </Helmet>
      <PageHero
        badge="Our Programs"
        title="Comprehensive Support Services"
        subtitle="We offer a wide range of programs designed to meet the unique needs of the LGBTQIA+ community."
      />

      <section className="section-padding bg-background relative overflow-hidden">
        {/* Decorative background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[5%] w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-[10%] right-[5%] w-96 h-96 bg-secondary/5 rounded-full blur-[120px]" />
        </div>

        <div className="container-padding mx-auto max-w-7xl relative z-10">
          <div className="space-y-24 md:space-y-32">
            {detailedPrograms.map((program, index) => {
              const Icon = iconMap[program.icon] || Heart;
              const colors = colorMap[program.color] || colorMap.primary;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${!isEven ? "lg:flex-row-reverse" : ""
                    }`}
                >
                  {/* Content Side */}
                  <div className={!isEven ? "lg:order-2" : ""}>
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-14 h-14 rounded-2xl ${colors.bg} ${colors.text} flex items-center justify-center shadow-sm`}>
                        <Icon className="w-7 h-7" />
                      </div>
                      <span className={`text-sm font-bold uppercase tracking-wider ${colors.text} bg-background px-3 py-1 rounded-full border border-border`}>
                        Program
                      </span>
                    </div>

                    <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                      {program.title}
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                      {program.description}
                    </p>

                    <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border/50 shadow-sm mb-8 hover:shadow-md transition-shadow duration-300">
                      <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-primary" />
                        Key Offerings
                      </h4>
                      <ul className="grid sm:grid-cols-2 gap-3">
                        {program.details.map((detail, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-muted-foreground text-sm">
                            <div className={`w-1.5 h-1.5 rounded-full ${colors.bg.replace('/10', '')} mt-2 shrink-0`} />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button asChild variant="outline" className="group border-foreground/10 hover:border-foreground/20 hover:bg-foreground/5">
                      <Link to="/contact">
                        Get Started
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </div>

                  {/* Visual Side */}
                  <div className={`${!isEven ? "lg:order-1" : ""} relative group`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-[2.5rem] -rotate-3 group-hover:rotate-0 transition-transform duration-500" />
                    <div className={`aspect-[4/3] rounded-[2.5rem] ${colors.bg} border border-white/20 dark:border-black/20 flex items-center justify-center relative overflow-hidden backdrop-blur-xl shadow-2xl transition-transform duration-500 group-hover:-translate-y-2`}>
                      {/* Abstract Shapes overlay */}
                      <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 dark:bg-black/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                      <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/5 dark:bg-white/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

                      <Icon className={`w-32 h-32 ${colors.text} drop-shadow-2xl relative z-10 transition-transform duration-500 group-hover:scale-110`} strokeWidth={1} />

                      <div className="absolute bottom-8 left-8 right-8 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-xl p-4 border border-white/20 dark:border-white/10 shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                        <p className="font-display font-bold text-center text-foreground">
                          Transforming Lives Together
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-foreground to-foreground/90 z-0" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay z-0" />

        {/* Animated shapes */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] mix-blend-overlay animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[120px] mix-blend-overlay animate-pulse" style={{ animationDuration: '12s' }} />

        <div className="container-padding mx-auto max-w-4xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-3xl rounded-[3rem] p-12 md:p-20 border border-white/10 shadow-2xl"
          >
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Ready to find the support <br />
              <span className="text-primary-foreground">that's right for you?</span>
            </h2>
            <p className="text-white/70 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
              Our compassionate team is standing by to help you navigate our services, answer your questions, and welcome you to our community.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="h-14 px-8 text-base rounded-full bg-white text-foreground hover:bg-white/90 font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                <Link to="/contact">Generic Inquiry</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-14 px-8 text-base rounded-full border-white/20 text-white hover:bg-white/10 hover:text-white backdrop-blur-sm">
                <Link to="/resources">Browse Resources</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Programs;
