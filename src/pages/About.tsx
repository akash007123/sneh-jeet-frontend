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

      {/* Mission & Vision - Split Layout with floating visuals */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-muted/20 skew-x-12 translate-x-1/4 -z-10" />

        <div className="container-padding mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative z-10"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-warm/20 text-warm-foreground text-sm font-medium mb-6">
                <Target className="w-4 h-4" />
                <span>Our Mission</span>
              </div>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                Empowering authenticity, <br />
                <span className="text-primary">one life at a time.</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                To provide comprehensive support, resources, and advocacy for LGBTQIA+
                individuals and communities, fostering environments where everyone can
                live authentically and with dignity.
              </p>

              <div className="pl-6 border-l-4 border-primary/20">
                <p className="text-foreground font-medium italic">
                  "We believe that every person deserves the freedom to be themselves without fear."
                </p>
              </div>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white dark:bg-card border border-border p-8 md:p-12 rounded-[2rem] shadow-xl relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
                <div className="absolute top-0 right-0 w-64 h-64 bg-safe/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-hope/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                <div className="w-16 h-16 rounded-2xl bg-safe/20 flex items-center justify-center mb-8 rotate-3 group-hover:rotate-0 transition-transform duration-500">
                  <Eye className="w-8 h-8 text-safe-foreground" />
                </div>

                <h3 className="font-display text-2xl font-bold text-foreground mb-4">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  A world where LGBTQIA+ people are fully accepted, celebrated, and
                  protected—where identity is honored, and every person has equal access
                  to opportunity and justice.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Long-term Vision for LGBT - Premium Grid */}
      <section className="section-padding bg-muted/30">
        <div className="container-padding mx-auto max-w-7xl">
          <SectionHeading
            badge="Our Long-term Vision"
            title="Building a Future of Equality"
            subtitle="Ambitious goals for LGBTQIA+ rights and inclusion in the coming decade"
            align="center"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-background rounded-2xl p-8 border border-border/50 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                Legal Equality Nationwide
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Achieve comprehensive legal protections for LGBTQIA+ individuals across all states,
                including marriage equality and anti-discrimination laws.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-background rounded-2xl p-8 border border-border/50 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                Zero Violence & Discrimination
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Create environments where LGBTQIA+ individuals can live free from violence
                harassment, and discrimination in schools and workplaces.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-background rounded-2xl p-8 border border-border/50 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                Mental Health Revolution
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Transform mental health support through culturally competent care, reduced stigma,
                and accessible affirming services.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-background rounded-2xl p-8 border border-border/50 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                Inclusive Education System
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Implement comprehensive LGBTQIA+ education in schools and teacher training
                to foster understanding from an early age.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-background rounded-2xl p-8 border border-border/50 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                Economic Empowerment
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Close the economic gap for LGBTQIA+ individuals through workplace equality,
                entrepreneurship support, and financial inclusion.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="bg-background rounded-2xl p-8 border border-border/50 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Eye className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                Global LGBTQIA+ Leadership
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Position LGBTQIA+ voices at the forefront of social justice movements,
                policy development, and human rights advocacy.
              </p>
            </motion.div>

          </div>

          {/* Vision 2035 Statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-16 bg-gradient-to-r from-background to-muted border border-border rounded-3xl p-8 md:p-16 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3" />

            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary p-0.5 mx-auto mb-8 relative z-10">
              <div className="w-full h-full bg-background rounded-full flex items-center justify-center">
                <Eye className="w-10 h-10 text-primary" />
              </div>
            </div>

            <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6 relative z-10">
              Our 2035 Vision
            </h3>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-4xl mx-auto relative z-10">
              By 2035, we envision a world where LGBTQIA+ individuals are not just tolerated, but truly celebrated.
              Where coming out is met with joy, where love is love in every sense, and where
              identity is never a barrier to opportunity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values - Glassmorphism Cards */}
      <section className="section-padding bg-background">
        <div className="container-padding mx-auto max-w-7xl">
          <SectionHeading
            badge="What We Stand For"
            title="Our Core Values"
            subtitle="The principles that guide everything we do"
            align="left"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative p-8 rounded-2xl bg-muted/20 border border-transparent hover:border-primary/20 hover:bg-primary/5 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <value.icon className="w-24 h-24 text-primary/5 -rotate-12" />
                </div>

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-background shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <value.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team - Modern Profiles */}
      <section className="section-padding bg-muted/30">
        <div className="container-padding mx-auto max-w-7xl">
          <SectionHeading
            badge="Our People"
            title="Meet Our Team"
            subtitle="Dedicated advocates working for our community"
            align="center"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-background rounded-3xl p-6 text-center border border-border/50 hover:border-primary/30 transition-all duration-300 shadow-sm"
              >
                <div className="w-24 h-24 rounded-full pride-gradient p-1 mx-auto mb-6">
                  <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden">
                    <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-primary to-secondary">
                      {member.avatar}
                    </span>
                  </div>
                </div>

                <h3 className="font-display text-lg font-bold text-foreground mb-1">
                  {member.name}
                </h3>
                <p className="text-primary font-medium text-sm mb-4 bg-primary/5 inline-block px-3 py-1 rounded-full">
                  {member.role}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline - Elegant Vertical Line */}
      <section className="section-padding bg-background relative overflow-hidden">
        {/* Decorative background number */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40rem] font-bold text-muted/5 select-none pointer-events-none">
          15
        </div>

        <div className="container-padding mx-auto max-w-4xl relative z-10">
          <SectionHeading
            badge="Our Journey"
            title="15 Years of Impact"
            subtitle="Milestones in our mission to serve the LGBTQIA+ community"
            align="center"
          />

          <div className="relative mt-16 text-sm md:text-base">
            {/* Timeline line */}
            <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/80 via-secondary/80 to-muted md:-translate-x-1/2" />

            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex items-start md:items-center gap-8 mb-12 last:mb-0 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
              >
                {/* Dot */}
                <div className="absolute left-0 md:left-1/2 w-10 h-10 rounded-full bg-background border-4 border-primary flex items-center justify-center md:-translate-x-1/2 z-10 shrink-0 shadow-lg">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                </div>

                {/* Content */}
                <div className={`flex-1 pl-16 md:pl-0 ${index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                  <div className="group relative">
                    <span className="font-display text-4xl font-bold text-foreground/10 absolute -top-4 -left-4 z-0 group-hover:text-primary/10 transition-colors duration-300 select-none">
                      {item.year}
                    </span>
                    <div className="relative z-10 bg-card/80 backdrop-blur-sm p-5 rounded-2xl border border-border shadow-sm group-hover:shadow-md transition-all duration-300">
                      <span className="font-display font-bold text-primary block mb-1 text-lg">{item.year}</span>
                      <p className="text-muted-foreground">{item.event}</p>
                    </div>
                  </div>
                </div>

                {/* Spacer */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default About;
