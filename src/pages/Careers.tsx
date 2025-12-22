import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  Heart,
  Users,
  Building,
  MapPin,
  Clock,
  Briefcase,
  CheckCircle,
  Star,
  Award,
  ArrowRight,
  Calendar,
  Shield,
  Target,
  Quote,
  HelpCircle,
  Download
} from "lucide-react";
import MainLayout from "@/layouts/MainLayout";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { careersData } from "@/data/mockData";

const Careers = () => {
  return (
    <MainLayout>
      <Helmet>
        <title>Careers - Sneh Jeet NGO</title>
        <meta name="description" content="Join our mission-driven team working for LGBTQIA+ rights and inclusion. View open positions, internships, and career opportunities in social impact." />
        <meta name="keywords" content="LGBTQ NGO careers, inclusive jobs India, NGO jobs LGBTQ, social impact careers" />
        <link rel="canonical" href="/careers" />
        <meta property="og:title" content="Careers - Sneh Jeet NGO" />
        <meta property="og:description" content="Join our mission-driven team working for LGBTQIA+ rights and inclusion. View open positions, internships, and career opportunities in social impact." />
        <meta property="og:image" content="/logo.png" />
        <meta property="og:url" content="/careers" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Careers - Sneh Jeet NGO" />
        <meta name="twitter:description" content="Join our mission-driven team working for LGBTQIA+ rights and inclusion. View open positions, internships, and career opportunities in social impact." />
        <meta name="twitter:image" content="/logo.png" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 py-20">
        <div className="container-padding mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              {careersData.hero.headline}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {careersData.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {careersData.hero.primaryCTAs.map((cta, index) => (
                <Button
                  key={index}
                  size="lg"
                  variant={cta.variant as "default" | "outline"}
                  className="text-lg px-8 py-3"
                >
                  {cta.text}
                </Button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="section-padding bg-background">
        <div className="container-padding mx-auto max-w-7xl">
          <SectionHeading
            badge="Why Work With Us"
            title="A Career That Makes a Difference"
            subtitle="Join a team where your values drive your work and your impact matters"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {careersData.whyWorkWithUs.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3 p-4 bg-primary/5 rounded-lg"
              >
                <CheckCircle className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-foreground">{reason}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Work Culture & Values */}
      <section className="section-padding bg-muted/30">
        <div className="container-padding mx-auto max-w-7xl">
          <SectionHeading
            badge="Our Culture"
            title="Our Work Culture & Values"
            subtitle="The principles that guide everything we do"
          />

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Core Values</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {careersData.workCulture.values.map((value, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-2 p-3 bg-background rounded-lg"
                      >
                        <Heart className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-sm font-medium">{value}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Alert>
                <Users className="h-4 w-4" />
                <AlertDescription className="text-sm font-medium">
                  {careersData.workCulture.note}
                </AlertDescription>
              </Alert>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Current Openings */}
      <section id="openings" className="section-padding bg-background">
        <div className="container-padding mx-auto max-w-7xl">
          <SectionHeading
            badge="Open Positions"
            title="Current Openings"
            subtitle="Join our team and help create lasting change"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {careersData.openings.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{job.title}</CardTitle>
                        <CardDescription>{job.department}</CardDescription>
                      </div>
                      <Badge variant="secondary">{job.type}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        {job.workMode}
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground">{job.description}</p>

                    <div>
                      <h5 className="font-medium text-foreground mb-2 text-sm">Requirements:</h5>
                      <ul className="space-y-1">
                        {job.requirements.map((req, reqIndex) => (
                          <li key={reqIndex} className="flex items-start gap-2 text-xs">
                            <div className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                            <span className="text-muted-foreground">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs text-muted-foreground">
                        Posted: {new Date(job.postedDate).toLocaleDateString()}
                      </span>
                      <Button size="sm">
                        Apply Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Internship & Fellowship Programs */}
      <section className="section-padding bg-muted/30">
        <div className="container-padding mx-auto max-w-7xl">
          <SectionHeading
            badge="Learning Opportunities"
            title={careersData.internships.title}
            subtitle="Gain valuable experience while contributing to our mission"
          />

          <div className="grid md:grid-cols-2 gap-6">
            {careersData.internships.programs.map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{program.title}</CardTitle>
                      <Badge variant="outline">{program.type}</Badge>
                    </div>
                    <CardDescription>{program.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <h5 className="font-medium text-foreground mb-2">Benefits:</h5>
                      <ul className="space-y-2">
                        {program.benefits.map((benefit, benefitIndex) => (
                          <li key={benefitIndex} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                            <span className="text-muted-foreground">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Should Apply */}
      <section className="section-padding bg-background">
        <div className="container-padding mx-auto max-w-7xl">
          <SectionHeading
            badge="Eligibility"
            title="Who Should Apply?"
            subtitle="We're looking for passionate individuals committed to our mission"
          />

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>We're Looking For:</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {careersData.eligibility.whoShouldApply.map((criteria, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{criteria}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Alert>
                <Heart className="h-4 w-4" />
                <AlertDescription className="text-sm font-medium">
                  {careersData.eligibility.note}
                </AlertDescription>
              </Alert>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Hiring Process */}
      <section className="section-padding bg-muted/30">
        <div className="container-padding mx-auto max-w-7xl">
          <SectionHeading
            badge="Hiring Process"
            title="Our Hiring Process"
            subtitle="Transparent and fair recruitment for all candidates"
          />

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
              {careersData.hiringProcess.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <span className="text-lg font-bold text-primary">{index + 1}</span>
                  </div>
                  <h4 className="font-semibold text-foreground mb-1">{step.step}</h4>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Workplace Safety & Inclusion Policies */}
      <section className="section-padding bg-background">
        <div className="container-padding mx-auto max-w-7xl">
          <SectionHeading
            badge="Workplace Policies"
            title="Workplace Safety & Inclusion Policies"
            subtitle="Creating a safe and respectful environment for everyone"
          />

          <div className="grid md:grid-cols-2 gap-6">
            {careersData.workplacePolicies.map((policy, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800"
              >
                <Shield className="w-6 h-6 text-red-600 mt-0.5 flex-shrink-0" />
                <span className="text-red-900 dark:text-red-100">{policy}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits & Support */}
      <section className="section-padding bg-muted/30">
        <div className="container-padding mx-auto max-w-7xl">
          <SectionHeading
            badge="Benefits"
            title="Benefits & Support"
            subtitle="We invest in our team's well-being and professional growth"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {careersData.benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg"
              >
                <Star className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-foreground">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Employee Voices */}
      <section className="section-padding bg-background">
        <div className="container-padding mx-auto max-w-7xl">
          <SectionHeading
            badge="Team Voices"
            title="Hear From Our Team"
            subtitle="Real experiences from our diverse and passionate team"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {careersData.testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="pt-8 pb-8">
                    <Quote className="w-8 h-8 text-primary mb-4" />
                    <blockquote className="text-foreground mb-4 italic leading-relaxed">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="space-y-1">
                      <div className="font-semibold text-foreground">{testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                      <Badge variant="outline" className="text-xs">{testimonial.tenure}</Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding bg-muted/30">
        <div className="container-padding mx-auto max-w-7xl">
          <SectionHeading
            badge="Questions"
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about working with us"
          />

          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <Accordion type="single" collapsible className="space-y-4">
                  {careersData.faqs.map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <AccordionItem value={`faq-${index}`} className="border border-border rounded-lg px-4">
                        <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    </motion.div>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section id="apply" className="section-padding bg-background">
        <div className="container-padding mx-auto max-w-4xl">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Join Our Talent Pool</CardTitle>
              <CardDescription>
                Submit your information to be considered for future opportunities that match your skills and interests.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <input type="text" className="w-full p-3 border border-border rounded-md" placeholder="Your full name" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <input type="email" className="w-full p-3 border border-border rounded-md" placeholder="your.email@example.com" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone Number</label>
                  <input type="tel" className="w-full p-3 border border-border rounded-md" placeholder="+91 XXXXX XXXXX" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Preferred Location</label>
                  <select className="w-full p-3 border border-border rounded-md">
                    <option>Select location...</option>
                    <option>Delhi NCR</option>
                    <option>Mumbai</option>
                    <option>Bangalore</option>
                    <option>Remote</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Areas of Interest</label>
                <select className="w-full p-3 border border-border rounded-md">
                  <option>Select areas...</option>
                  <option>Program Management</option>
                  <option>Community Outreach</option>
                  <option>Mental Health</option>
                  <option>Legal & Advocacy</option>
                  <option>Communications</option>
                  <option>Digital & Creative</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Tell us about your experience and why you want to work with us</label>
                <textarea
                  className="w-full p-3 border border-border rounded-md h-32"
                  placeholder="Share your relevant experience, skills, and what motivates you to work for LGBTQIA+ rights..."
                ></textarea>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Resume/CV (Optional)</label>
                <input type="file" className="w-full p-3 border border-border rounded-md" accept=".pdf,.doc,.docx" />
              </div>

              <Button className="w-full" size="lg">
                Submit Application
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-primary/5 border-y border-primary/10">
        <div className="container-padding mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <Target className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {careersData.finalCTA.headline}
              </h2>
              <p className="text-xl text-muted-foreground">
                {careersData.finalCTA.description}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {careersData.finalCTA.actions.map((action, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Button
                    size="lg"
                    variant={action.variant as "default" | "outline"}
                    className="w-full"
                  >
                    {action.text}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Careers;