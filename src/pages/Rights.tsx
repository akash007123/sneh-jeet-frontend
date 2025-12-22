import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  Shield,
  AlertTriangle,
  Users,
  Building,
  Heart,
  Home,
  Stethoscope,
  Smartphone,
  FileText,
  Download,
  HelpCircle,
  CheckCircle,
  ArrowRight,
  Scale,
  Gavel,
  Eye
} from "lucide-react";
import MainLayout from "@/layouts/MainLayout";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { rightsData } from "@/data/mockData";

const Rights = () => {
  return (
    <MainLayout>
      <Helmet>
        <title>Know Your Rights - Sneh Jeet NGO</title>
        <meta name="description" content="Understanding LGBTQIA+ legal rights in India. Comprehensive guide to transgender rights, workplace protections, police interactions, and legal support." />
        <meta name="keywords" content="LGBTQ rights in India, transgender rights India, LGBTQ legal help India, know your rights LGBTQ" />
        <link rel="canonical" href="/rights" />
        <meta property="og:title" content="Know Your Rights - Sneh Jeet NGO" />
        <meta property="og:description" content="Understanding LGBTQIA+ legal rights in India. Comprehensive guide to transgender rights, workplace protections, police interactions, and legal support." />
        <meta property="og:image" content="/logo.png" />
        <meta property="og:url" content="/rights" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Know Your Rights - Sneh Jeet NGO" />
        <meta name="twitter:description" content="Understanding LGBTQIA+ legal rights in India. Comprehensive guide to transgender rights, workplace protections, police interactions, and legal support." />
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
              {rightsData.hero.headline}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {rightsData.hero.subtitle}
            </p>

            <Alert className="mb-8 max-w-2xl mx-auto">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="text-sm">
                {rightsData.hero.disclaimer}
              </AlertDescription>
            </Alert>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {rightsData.hero.primaryCTAs.map((cta, index) => (
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

      {/* Legal Status Overview */}
      <section className="section-padding bg-background">
        <div className="container-padding mx-auto max-w-7xl">
          <SectionHeading
            badge="Legal Overview"
            title={rightsData.legalStatus.title}
            subtitle="Fundamental rights and protections for LGBTQIA+ individuals in India"
          />

          <div className="grid md:grid-cols-2 gap-6">
            {rightsData.legalStatus.overview.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3 p-4 bg-primary/5 rounded-lg"
              >
                <CheckCircle className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-foreground">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 377 */}
      <section className="section-padding bg-muted/30">
        <div className="container-padding mx-auto max-w-7xl">
          <SectionHeading
            badge="Historical Victory"
            title="Section 377 – What Changed?"
            subtitle="The decriminalization of same-sex relationships"
          />

          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="w-6 h-6 text-primary" />
                  {rightsData.section377.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {rightsData.section377.content}
                </p>
                <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border-l-4 border-green-500">
                  <p className="text-green-900 dark:text-green-100 font-medium">
                    {rightsData.section377.keyTakeaway}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Transgender Rights */}
      <section className="section-padding bg-background">
        <div className="container-padding mx-auto max-w-7xl">
          <SectionHeading
            badge="Transgender Rights"
            title={rightsData.transgenderRights.title}
            subtitle="Comprehensive legal protections for transgender individuals"
          />

          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Your Rights Include:</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {rightsData.transgenderRights.rights.map((right, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{right}</span>
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
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    {rightsData.transgenderRights.certificate.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {rightsData.transgenderRights.certificate.process}
                  </p>
                  <Button variant="outline" className="w-full">
                    Learn About the Process
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Workplace Rights */}
      <section className="section-padding bg-muted/30">
        <div className="container-padding mx-auto max-w-7xl">
          <SectionHeading
            badge="Workplace Rights"
            title={rightsData.workplaceRights.title}
            subtitle="Protection and equality in professional environments"
          />

          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground leading-relaxed">
                    {rightsData.workplaceRights.content}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>If Facing Discrimination:</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {rightsData.workplaceRights.ifDiscriminated.map((step, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                          <span className="text-xs font-bold text-primary">{index + 1}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{step}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Police & Legal Interaction Rights */}
      <section className="section-padding bg-background">
        <div className="container-padding mx-auto max-w-7xl">
          <SectionHeading
            badge="Police Interactions"
            title={rightsData.policeRights.title}
            subtitle="Your rights when dealing with law enforcement"
          />

          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>You Have the Right To:</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {rightsData.policeRights.rights.map((right, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{right}</span>
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
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-orange-500" />
                    Emergency Advice
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {rightsData.policeRights.emergency}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Housing & Public Spaces */}
      <section className="section-padding bg-muted/30">
        <div className="container-padding mx-auto max-w-7xl">
          <SectionHeading
            badge="Housing Rights"
            title={rightsData.housingRights.title}
            subtitle="Protection in housing and public spaces"
          />

          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <ul className="space-y-4">
                  {rightsData.housingRights.rights.map((right, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 p-4 bg-background rounded-lg"
                    >
                      <Home className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{right}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Healthcare Rights */}
      <section className="section-padding bg-background">
        <div className="container-padding mx-auto max-w-7xl">
          <SectionHeading
            badge="Healthcare Rights"
            title={rightsData.healthcareRights.title}
            subtitle="Access to respectful and inclusive medical care"
          />

          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <ul className="space-y-4">
                  {rightsData.healthcareRights.rights.map((right, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 p-4 bg-primary/5 rounded-lg"
                    >
                      <Stethoscope className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{right}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Relationship & Family Rights */}
      <section className="section-padding bg-muted/30">
        <div className="container-padding mx-auto max-w-7xl">
          <SectionHeading
            badge="Relationship Rights"
            title={rightsData.relationshipRights.title}
            subtitle="Legal protections for relationships and family"
          />

          <div className="max-w-4xl mx-auto space-y-6">
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground leading-relaxed">
                  {rightsData.relationshipRights.content}
                </p>
              </CardContent>
            </Card>

            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="font-medium">
                {rightsData.relationshipRights.important}
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </section>

      {/* Online Safety & Digital Rights */}
      <section className="section-padding bg-background">
        <div className="container-padding mx-auto max-w-7xl">
          <SectionHeading
            badge="Online Safety"
            title={rightsData.onlineRights.title}
            subtitle="Protection in the digital space"
          />

          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Your Rights Include:</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {rightsData.onlineRights.rights.map((right, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Smartphone className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{right}</span>
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
              <Card>
                <CardHeader>
                  <CardTitle>Steps to Take:</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {rightsData.onlineRights.steps.map((step, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                          <span className="text-xs font-bold text-primary">{index + 1}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{step}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What To Do If Rights Are Violated */}
      <section className="section-padding bg-muted/30">
        <div className="container-padding mx-auto max-w-7xl">
          <SectionHeading
            badge="Rights Violation"
            title={rightsData.violationSteps.title}
            subtitle="Step-by-step guidance when your rights are violated"
          />

          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <ul className="space-y-4 mb-8">
                  {rightsData.violationSteps.steps.map((step, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-4 p-4 bg-background rounded-lg"
                    >
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold">{index + 1}</span>
                      </div>
                      <span className="text-muted-foreground">{step}</span>
                    </motion.li>
                  ))}
                </ul>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {rightsData.violationSteps.ctas.map((cta, index) => (
                    <Button
                      key={index}
                      variant={cta.variant as "default" | "outline"}
                      className="flex-1"
                    >
                      {cta.text}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Downloadable Resources */}
      <section className="section-padding bg-background">
        <div className="container-padding mx-auto max-w-7xl">
          <SectionHeading
            badge="Resources"
            title="Downloadable Resources"
            subtitle="Free guides and materials to help you understand and protect your rights"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {rightsData.resources.map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                    <Badge variant="outline">{resource.type}</Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-4">{resource.description}</p>
                    <Button variant="outline" className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
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
            badge="Frequently Asked"
            title="FAQs"
            subtitle="Common questions about LGBTQIA+ rights in India"
          />

          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <Accordion type="single" collapsible className="space-y-4">
                  {rightsData.faqs.map((faq, index) => (
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
              <Eye className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {rightsData.finalCTA.headline}
              </h2>
              <p className="text-xl text-muted-foreground">
                {rightsData.finalCTA.description}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {rightsData.finalCTA.actions.map((action, index) => (
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

export default Rights;