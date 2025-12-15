import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, Users, Handshake, ArrowRight, Clock, CheckCircle } from "lucide-react";
import MainLayout from "@/layouts/MainLayout";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { volunteerOpportunities } from "@/data/mockData";

const GetInvolved = () => {
  return (
    <MainLayout>
      <PageHero
        badge="Get Involved"
        title="Join Our Mission"
        subtitle="There are many ways to support our community. Find the opportunity that's right for you."
      />

      {/* Ways to Help */}
      <section className="section-padding bg-background">
        <div className="container-padding mx-auto max-w-7xl">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-warm rounded-2xl p-8 text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-warm-foreground/10 flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-warm-foreground" />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-4">Volunteer</h3>
              <p className="text-muted-foreground mb-6">
                Share your time and talents to make a real difference in people's lives.
              </p>
              <Button asChild variant="outline">
                <a href="#volunteer">Learn More</a>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-safe rounded-2xl p-8 text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-safe-foreground/10 flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-safe-foreground" />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-4">Donate</h3>
              <p className="text-muted-foreground mb-6">
                Your financial support funds critical programs and services for our community.
              </p>
              <Button asChild variant="hero">
                <Link to="/donate">Donate Now</Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-hope rounded-2xl p-8 text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-hope-foreground/10 flex items-center justify-center mx-auto mb-6">
                <Handshake className="w-8 h-8 text-hope-foreground" />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-4">Partner</h3>
              <p className="text-muted-foreground mb-6">
                Organizations can partner with us to expand our reach and impact.
              </p>
              <Button asChild variant="outline">
                <a href="#partner">Partner With Us</a>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Volunteer Opportunities */}
      <section id="volunteer" className="section-padding bg-muted/30">
        <div className="container-padding mx-auto max-w-7xl">
          <SectionHeading
            badge="Volunteer"
            title="Volunteer Opportunities"
            subtitle="Find the perfect way to contribute your skills and time"
          />

          <div className="grid md:grid-cols-2 gap-6">
            {volunteerOpportunities.map((opportunity, index) => (
              <motion.div
                key={opportunity.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 border border-border"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    {opportunity.title}
                  </h3>
                  <span className="flex items-center gap-1 text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                    <Clock className="w-4 h-4" />
                    {opportunity.commitment}
                  </span>
                </div>
                <p className="text-muted-foreground mb-4">{opportunity.description}</p>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">Requirements:</p>
                  <ul className="space-y-1">
                    {opportunity.requirements.map((req, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-accent" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Form */}
      <section className="section-padding bg-background">
        <div className="container-padding mx-auto max-w-3xl">
          <SectionHeading
            badge="Join Us"
            title="Become a Member"
            subtitle="Join our community and stay connected with events, resources, and opportunities."
          />

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-2xl p-8 border border-border space-y-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">
                  First Name
                </label>
                <Input id="firstName" placeholder="Your first name" />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2">
                  Last Name
                </label>
                <Input id="lastName" placeholder="Your last name" />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email
              </label>
              <Input id="email" type="email" placeholder="your@email.com" />
            </div>

            <div>
              <label htmlFor="interest" className="block text-sm font-medium text-foreground mb-2">
                I'm interested in...
              </label>
              <Textarea 
                id="interest" 
                placeholder="Tell us how you'd like to get involved or what programs interest you"
                rows={4}
              />
            </div>

            <Button type="submit" variant="hero" size="lg" className="w-full">
              Submit Application
              <ArrowRight className="w-5 h-5 ml-1" />
            </Button>
          </motion.form>
        </div>
      </section>

      {/* Partner Section */}
      <section id="partner" className="section-padding bg-foreground text-background">
        <div className="container-padding mx-auto max-w-7xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-background/10 text-sm font-medium mb-6">
              Partnership
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Partner With Us
            </h2>
            <p className="text-background/70 text-lg max-w-2xl mx-auto mb-8">
              We partner with businesses, foundations, and organizations who share our 
              commitment to LGBTQIA+ equality. Together, we can create lasting change.
            </p>
            <Button asChild variant="default" size="lg" className="bg-primary hover:bg-primary/90">
              <Link to="/contact">Contact for Partnership</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
};

export default GetInvolved;
