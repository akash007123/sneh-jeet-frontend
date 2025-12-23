import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  Heart,
  Users,
  UserPlus,
  Calendar,
  Award,
  Shield,
  CheckCircle,
  Clock,
  MapPin,
  Star,
  ArrowRight,
  Monitor,
  GraduationCap,
  Scale,
  Quote,
  Download,
  HelpCircle,
  Mail,
  User
} from "lucide-react";
import MainLayout from "@/layouts/MainLayout";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { volunteerData } from "@/data/mockData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Volunteer = () => {
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const response = await fetch('/api/users/volunteers');
        console.log(response, 'response')
        if (response.ok) {
          const data = await response.json();
          setVolunteers(data);
        }
      } catch (error) {
        console.error('Error fetching volunteers:', error);
      }
    };

    fetchVolunteers();
  }, []);

  return (
    <MainLayout>
      <Helmet>
        <title>Volunteer With Us - Sneh Jeet NGO</title>
        <meta name="description" content="Join our volunteer community and help create safer, more inclusive spaces for LGBTQIA+ individuals. No experience required - training provided." />
        <meta name="keywords" content="LGBTQ volunteer India, volunteer for LGBTQ NGO, inclusive volunteering opportunities" />
        <link rel="canonical" href="/volunteer" />
        <meta property="og:title" content="Volunteer With Us - Sneh Jeet NGO" />
        <meta property="og:description" content="Join our volunteer community and help create safer, more inclusive spaces for LGBTQIA+ individuals. No experience required - training provided." />
        <meta property="og:image" content="/logo.png" />
        <meta property="og:url" content="/volunteer" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Volunteer With Us - Sneh Jeet NGO" />
        <meta name="twitter:description" content="Join our volunteer community and help create safer, more inclusive spaces for LGBTQIA+ individuals. No experience required - training provided." />
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
              {volunteerData.hero.headline}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {volunteerData.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {volunteerData.hero.primaryCTAs.map((cta, index) => (
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

      {/* Why Volunteer With Us */}
      <section className="section-padding bg-background">
        <div className="container-padding mx-auto max-w-7xl">
          <SectionHeading
            badge="Why Volunteer"
            title="Make a Meaningful Impact"
            subtitle="Join a community dedicated to creating positive change"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {volunteerData.whyVolunteer.map((reason, index) => (
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

      {/* Who Can Volunteer */}
      <section className="section-padding bg-muted/30">
        <div className="container-padding mx-auto max-w-7xl">
          <SectionHeading
            badge="Eligibility"
            title="Who Can Volunteer?"
            subtitle="We're looking for passionate individuals ready to make a difference"
          />

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {volunteerData.eligibility.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{req}</span>
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
                  {volunteerData.eligibility.inclusivityNote}
                </AlertDescription>
              </Alert>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Volunteer Opportunities */}
      <section id="opportunities" className="section-padding bg-background">
        <div className="container-padding mx-auto max-w-7xl">
          <SectionHeading
            badge="Opportunities"
            title="Volunteer Roles & Opportunities"
            subtitle="Find the perfect way to contribute your skills and passion"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {volunteerData.opportunities.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      {category.icon === "Users" && <Users className="w-6 h-6 text-primary" />}
                      {category.icon === "Heart" && <Heart className="w-6 h-6 text-primary" />}
                      {category.icon === "Scale" && <Scale className="w-6 h-6 text-primary" />}
                      {category.icon === "GraduationCap" && <GraduationCap className="w-6 h-6 text-primary" />}
                      {category.icon === "Monitor" && <Monitor className="w-6 h-6 text-primary" />}
                    </div>
                    <CardTitle className="text-xl">{category.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {category.roles.map((role, roleIndex) => (
                        <li key={roleIndex} className="flex items-start gap-2 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                          <span className="text-muted-foreground">{role}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer Commitment Types */}
      <section className="section-padding bg-muted/30">
        <div className="container-padding mx-auto max-w-7xl">
          <SectionHeading
            badge="Commitment"
            title="Choose Your Level of Involvement"
            subtitle="We offer flexible volunteering options to fit your schedule and availability"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {volunteerData.commitmentTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-lg">{type.type}</CardTitle>
                    <CardDescription>{type.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="secondary" className="text-xs">
                      {type.commitment}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Training & Support */}
      <section className="section-padding bg-background">
        <div className="container-padding mx-auto max-w-7xl">
          <SectionHeading
            badge="Support"
            title="Training & Support System"
            subtitle="We invest in your success with comprehensive training and ongoing support"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {volunteerData.trainingSupport.map((support, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg"
              >
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                <span className="text-foreground">{support}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer Journey */}
      <section className="section-padding bg-muted/30">
        <div className="container-padding mx-auto max-w-7xl">
          <SectionHeading
            badge="Your Journey"
            title="The Volunteer Journey"
            subtitle="From application to impact - your path to making a difference"
          />

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Journey line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/30"></div>

              {volunteerData.journey.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative flex items-start gap-6 mb-8"
                >
                  {/* Step number */}
                  <div className="w-4 h-4 rounded-full bg-primary border-4 border-background relative z-10 mt-2"></div>

                  {/* Content */}
                  <div className="flex-1 bg-card rounded-xl p-6 border border-border">
                    <h4 className="font-semibold text-foreground mb-2">{step.step}</h4>
                    <p className="text-muted-foreground text-sm">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Safety, Ethics & Confidentiality */}
      <section id="ethics" className="section-padding bg-background">
        <div className="container-padding mx-auto max-w-7xl">
          <SectionHeading
            badge="Our Standards"
            title="Safety, Ethics & Confidentiality"
            subtitle="Creating a safe and respectful environment for everyone"
          />

          <div className="grid md:grid-cols-2 gap-6">
            {volunteerData.safetyEthics.map((principle, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800"
              >
                <Shield className="w-6 h-6 text-red-600 mt-0.5 flex-shrink-0" />
                <span className="text-red-900 dark:text-red-100">{principle}</span>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              View Full Code of Conduct
            </Button>
          </div>
        </div>
      </section>

      {/* Volunteer Voices */}
      <section className="section-padding bg-muted/30">
        <div className="container-padding mx-auto max-w-7xl">
          <SectionHeading
            badge="Volunteer Stories"
            title="Hear From Our Volunteers"
            subtitle="Real experiences from our volunteer community"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {volunteers.map((volunteer, index) => (
              <motion.div
                key={volunteer._id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="pt-8 pb-8">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={volunteer.profilePic ? `${import.meta.env.VITE_API_BASE_URL}${volunteer.profilePic}` : undefined} alt={volunteer.name} />
                        <AvatarFallback>
                          <User className="w-8 h-8" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-2">
                        <div className="font-semibold text-foreground">{volunteer.name}</div>
                        <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                          <Mail className="w-4 h-4" />
                          {volunteer.email}
                        </div>
                        <Badge variant="secondary" className="text-xs">{volunteer.role}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recognition & Certification */}
      <section className="section-padding bg-background">
        <div className="container-padding mx-auto max-w-7xl">
          <SectionHeading
            badge="Recognition"
            title="Celebrating Your Contributions"
            subtitle="Your dedication deserves recognition and appreciation"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {volunteerData.recognition.map((recognition, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg"
              >
                <Award className="w-6 h-6 text-primary flex-shrink-0" />
                <span className="text-foreground">{recognition}</span>
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
            subtitle="Everything you need to know about volunteering with us"
          />

          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <Accordion type="single" collapsible className="space-y-4">
                  {volunteerData.faqs.map((faq, index) => (
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
              <CardTitle className="text-2xl">Apply to Volunteer</CardTitle>
              <CardDescription>
                Ready to join our community? Fill out this form and we'll get back to you within 48 hours.
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

              <div className="space-y-2">
                <label className="text-sm font-medium">Phone Number</label>
                <input type="tel" className="w-full p-3 border border-border rounded-md" placeholder="+91 XXXXX XXXXX" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Preferred Areas of Interest</label>
                <select className="w-full p-3 border border-border rounded-md">
                  <option>Select an area...</option>
                  <option>Community Support</option>
                  <option>Mental Health & Well-being</option>
                  <option>Legal & Advocacy</option>
                  <option>Education & Outreach</option>
                  <option>Digital & Creative</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Commitment Level</label>
                <select className="w-full p-3 border border-border rounded-md">
                  <option>Select commitment...</option>
                  <option>One-time volunteering</option>
                  <option>Short-term projects (2-3 months)</option>
                  <option>Long-term volunteering</option>
                  <option>Remote/online volunteering</option>
                  <option>On-ground volunteering</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Tell us about yourself</label>
                <textarea
                  className="w-full p-3 border border-border rounded-md h-32"
                  placeholder="Why do you want to volunteer? What skills or experiences do you bring?"
                ></textarea>
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
              <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {volunteerData.finalCTA.headline}
              </h2>
              <p className="text-xl text-muted-foreground">
                {volunteerData.finalCTA.description}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {volunteerData.finalCTA.actions.map((action, index) => (
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

export default Volunteer;