import { motion } from "framer-motion";
import { Phone, Heart, Scale, Stethoscope, ExternalLink, Download, ChevronDown, Users } from "lucide-react";
import MainLayout from "@/layouts/MainLayout";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { resources, faqs } from "@/data/mockData";
import MemberFormModal from "@/components/MemberFormModal";

const Resources = () => {
  return (
    <MainLayout>
      <PageHero
        badge="Get Help"
        title="Resources & Support"
        subtitle="Access the help you need. All services are confidential and judgment-free."
      />

      {/* Emergency Hotlines */}
      <section className="py-12 bg-destructive/5 border-y border-destructive/10">
        <div className="container-padding mx-auto max-w-7xl">
          <div className="flex items-center gap-3 mb-6">
            <Phone className="w-6 h-6 text-destructive" />
            <h2 className="font-display text-xl font-semibold text-foreground">
              Crisis Support Lines
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {resources.emergency.map((hotline, index) => (
              <motion.div
                key={hotline.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-xl p-5 border border-border"
              >
                <h3 className="font-semibold text-foreground mb-1">{hotline.name}</h3>
                <a 
                  href={`tel:${hotline.phone.replace(/\D/g, '')}`}
                  className="text-lg font-bold text-primary hover:underline"
                >
                  {hotline.phone}
                </a>
                <p className="text-sm text-muted-foreground mt-2">{hotline.description}</p>
                <span className="inline-block mt-2 text-xs bg-safe text-safe-foreground px-2 py-1 rounded-full">
                  {hotline.available}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="section-padding bg-background">
        <div className="container-padding mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Mental Health */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-warm rounded-2xl p-6"
            >
              <div className="w-12 h-12 rounded-xl bg-warm-foreground/10 flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-warm-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                Mental Health
              </h3>
              <ul className="space-y-4">
                {resources.mentalHealth.map((resource) => (
                  <li key={resource.name}>
                    <a href={resource.link} className="group block">
                      <span className="font-medium text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                        {resource.name}
                        <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </span>
                      <span className="text-sm text-muted-foreground">{resource.description}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Legal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-safe rounded-2xl p-6"
            >
              <div className="w-12 h-12 rounded-xl bg-safe-foreground/10 flex items-center justify-center mb-4">
                <Scale className="w-6 h-6 text-safe-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                Legal Resources
              </h3>
              <ul className="space-y-4">
                {resources.legal.map((resource) => (
                  <li key={resource.name}>
                    <a href={resource.link} className="group block">
                      <span className="font-medium text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                        {resource.name}
                        <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </span>
                      <span className="text-sm text-muted-foreground">{resource.description}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Healthcare */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-hope rounded-2xl p-6"
            >
              <div className="w-12 h-12 rounded-xl bg-hope-foreground/10 flex items-center justify-center mb-4">
                <Stethoscope className="w-6 h-6 text-hope-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                Healthcare
              </h3>
              <ul className="space-y-4">
                {resources.healthcare.map((resource) => (
                  <li key={resource.name}>
                    <a href={resource.link} className="group block">
                      <span className="font-medium text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                        {resource.name}
                        <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </span>
                      <span className="text-sm text-muted-foreground">{resource.description}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Downloadable Guides */}
      <section className="py-12 bg-muted/30">
        <div className="container-padding mx-auto max-w-7xl">
          <SectionHeading
            badge="Downloads"
            title="Helpful Guides"
            subtitle="Free resources you can download and keep"
          />
          <div className="grid md:grid-cols-3 gap-4">
            {[
              "Coming Out Guide",
              "Finding Affirming Care",
              "Know Your Rights Handbook",
            ].map((guide, index) => (
              <motion.div
                key={guide}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-xl p-5 border border-border flex items-center justify-between"
              >
                <span className="font-medium text-foreground">{guide}</span>
                <Button variant="ghost" size="icon">
                  <Download className="w-5 h-5" />
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section id="faq" className="section-padding bg-background">
        <div className="container-padding mx-auto max-w-3xl">
          <SectionHeading
            badge="FAQs"
            title="Frequently Asked Questions"
            subtitle="Find answers to common questions about our services"
          />

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <AccordionItem 
                  value={`item-${index}`} 
                  className="bg-card rounded-xl border border-border px-6"
                >
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
        </div>
      </section>

      {/* Become a Member */}
      <section className="py-12 bg-primary/5 border-y border-primary/10">
        <div className="container-padding mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
                Join Our Community
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Become a member of Sneh Jeet NGO and help us create a more inclusive and supportive environment for the LGBTQ+ community. Your involvement makes a difference.
              </p>
            </div>
            <MemberFormModal />
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Resources;
