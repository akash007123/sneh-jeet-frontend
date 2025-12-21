import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Heart, Scale, Stethoscope, Users, Sparkles, GraduationCap, ArrowRight } from "lucide-react";
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

      <section className="section-padding bg-background">
        <div className="container-padding mx-auto max-w-7xl">
          <div className="space-y-16">
            {detailedPrograms.map((program, index) => {
              const Icon = iconMap[program.icon] || Heart;
              const colors = colorMap[program.color] || colorMap.primary;
              
              return (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className={`grid lg:grid-cols-2 gap-8 items-center ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    <div className={`w-16 h-16 rounded-2xl ${colors.bg} ${colors.text} flex items-center justify-center mb-6`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                      {program.title}
                    </h2>
                    <p className="text-lg text-muted-foreground mb-6">
                      {program.description}
                    </p>
                    <ul className="space-y-3 mb-8">
                      {program.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-3 text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                    <Button asChild variant="outline">
                      <Link to="/contact">
                        Get Started
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </Button>
                  </div>

                  <div className={`${index % 2 === 1 ? "lg:order-1" : ""}`}>
                    <div className={`aspect-[4/3] rounded-3xl ${colors.bg} flex items-center justify-center`}>
                      <Icon className={`w-24 h-24 ${colors.text} opacity-50`} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-muted/30">
        <div className="container-padding mx-auto max-w-7xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Need Help Finding the Right Program?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Our team is here to help you navigate our services and find the support that's right for you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild variant="hero" size="lg">
                <Link to="/contact">Contact Us</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/resources">View Resources</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Programs;
