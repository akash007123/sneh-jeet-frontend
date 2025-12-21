import { motion } from "framer-motion";
import { Target, Eye, Heart, Users, Shield, Sparkles } from "lucide-react";
import { Helmet } from "react-helmet-async";
import MainLayout from "@/layouts/MainLayout";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { teamMembers, timeline } from "@/data/mockData";

const values = [
  {
    icon: Heart,
    title: "Compassion",
    description: "We approach every interaction with empathy, understanding, and genuine care.",
  },
  {
    icon: Shield,
    title: "Safety",
    description: "Creating secure spaces where everyone can be their authentic selves.",
  },
  {
    icon: Users,
    title: "Community",
    description: "Building connections and fostering a sense of belonging for all.",
  },
  {
    icon: Sparkles,
    title: "Empowerment",
    description: "Supporting individuals to advocate for themselves and others.",
  },
];

const About = () => {
  return (
    <MainLayout>
      <Helmet>
        <title>About Us - Sneh Jeet NGO</title>
        <meta name="description" content="Discover Sneh Jeet NGO's mission to support and advocate for the LGBTQIA+ community. Learn about our values, team, and 15 years of impact." />
        <meta name="keywords" content="LGBTQIA+, NGO, support, advocacy, community, compassion, safety, empowerment" />
        <link rel="canonical" href="/about" />
        <meta property="og:title" content="About Us - Sneh Jeet NGO" />
        <meta property="og:description" content="Discover Sneh Jeet NGO's mission to support and advocate for the LGBTQIA+ community. Learn about our values, team, and 15 years of impact." />
        <meta property="og:image" content="/logo.png" />
        <meta property="og:url" content="/about" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Us - Sneh Jeet NGO" />
        <meta name="twitter:description" content="Discover Sneh Jeet NGO's mission to support and advocate for the LGBTQIA+ community. Learn about our values, team, and 15 years of impact." />
        <meta name="twitter:image" content="/logo.png" />
      </Helmet>
      <PageHero
        badge="About Us"
        title="Our Story & Mission"
        subtitle="For over a decade, we've been dedicated to creating a world where every LGBTQIA+ individual can thrive."
      />

      {/* Mission & Vision */}
      <section className="section-padding bg-background">
        <div className="container-padding mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-warm rounded-3xl p-8 md:p-10"
            >
              <div className="w-14 h-14 rounded-xl bg-warm-foreground/10 flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-warm-foreground" />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To provide comprehensive support, resources, and advocacy for LGBTQIA+ 
                individuals and communities, fostering environments where everyone can 
                live authentically and with dignity.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-safe rounded-3xl p-8 md:p-10"
            >
              <div className="w-14 h-14 rounded-xl bg-safe-foreground/10 flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-safe-foreground" />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                A world where LGBTQIA+ people are fully accepted, celebrated, and 
                protected—where identity is honored, and every person has equal access 
                to opportunity and justice.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-muted/30">
        <div className="container-padding mx-auto max-w-7xl">
          <SectionHeading
            badge="What We Stand For"
            title="Our Core Values"
            subtitle="The principles that guide everything we do"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 text-center border border-border card-hover"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-background">
        <div className="container-padding mx-auto max-w-7xl">
          <SectionHeading
            badge="Our People"
            title="Meet Our Team"
            subtitle="Dedicated advocates working for our community"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 text-center border border-border"
              >
                <div className="w-20 h-20 rounded-full pride-gradient flex items-center justify-center text-2xl font-bold text-primary-foreground mx-auto mb-4">
                  {member.avatar}
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {member.name}
                </h3>
                <p className="text-primary text-sm font-medium mb-2">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-muted/30">
        <div className="container-padding mx-auto max-w-7xl">
          <SectionHeading
            badge="Our Journey"
            title="15 Years of Impact"
            subtitle="Milestones in our mission to serve the LGBTQIA+ community"
          />

          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-1/2" />

              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex items-center gap-4 mb-8 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-primary md:-translate-x-1/2 z-10" />

                  {/* Content */}
                  <div className={`flex-1 ml-12 md:ml-0 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <div className="bg-card rounded-xl p-4 border border-border inline-block">
                      <span className="font-display font-bold text-primary">{item.year}</span>
                      <p className="text-muted-foreground text-sm mt-1">{item.event}</p>
                    </div>
                  </div>

                  {/* Spacer */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default About;
