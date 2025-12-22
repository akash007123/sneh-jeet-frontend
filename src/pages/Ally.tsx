import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  Heart,
  Users,
  Award,
  BookOpen,
  CheckCircle,
  Star,
  Building,
  Target,
  Quote,
  Download,
  Play,
  Calendar,
  ArrowRight
} from "lucide-react";
import MainLayout from "@/layouts/MainLayout";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { allyProgram } from "@/data/mockData";

const Ally = () => {
  return (
    <MainLayout>
      <Helmet>
        <title>Ally Program - Sneh Jeet NGO</title>
        <meta name="description" content="Become an ally for LGBTQIA+ rights. Take the pledge, complete training modules, earn your ally badge, and join our corporate ally program." />
        <meta name="keywords" content="ally, LGBTQIA+, training, pledge, inclusion, diversity, corporate ally, badge, certificate" />
        <link rel="canonical" href="/ally" />
        <meta property="og:title" content="Ally Program - Sneh Jeet NGO" />
        <meta property="og:description" content="Become an ally for LGBTQIA+ rights. Take the pledge, complete training modules, earn your ally badge, and join our corporate ally program." />
        <meta property="og:image" content="/logo.png" />
        <meta property="og:url" content="/ally" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Ally Program - Sneh Jeet NGO" />
        <meta name="twitter:description" content="Become an ally for LGBTQIA+ rights. Take the pledge, complete training modules, earn your ally badge, and join our corporate ally program." />
        <meta name="twitter:image" content="/logo.png" />
      </Helmet>

      <PageHero
        badge="Ally Program"
        title="Expand Our Support Base"
        subtitle="Join thousands of allies working together to create a more inclusive world for the LGBTQIA+ community"
      />

      {/* Ally Pledge Section */}
      <section className="section-padding bg-background">
        <div className="container-padding mx-auto max-w-7xl">
          <SectionHeading
            badge="Take the Pledge"
            title="Become an Active Ally"
            subtitle="Commit to supporting LGBTQIA+ rights and inclusion in your daily life"
          />

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-6 h-6 text-primary" />
                    {allyProgram.pledge.title}
                  </CardTitle>
                  <CardDescription>
                    {allyProgram.pledge.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">My Commitments:</h4>
                    <ul className="space-y-2">
                      {allyProgram.pledge.commitments.map((commitment, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{commitment}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button className="w-full" size="lg">
                    Take the Ally Pledge
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <h3 className="font-display text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Award className="w-6 h-6 text-primary" />
                  Ally Benefits
                </h3>
                <div className="grid gap-3">
                  {allyProgram.pledge.benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"
                    >
                      <Star className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-sm text-foreground">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Training Modules Section */}
      <section className="section-padding bg-muted/30">
        <div className="container-padding mx-auto max-w-7xl">
          <SectionHeading
            badge="Education & Training"
            title="Comprehensive Training Modules"
            subtitle="Build your knowledge and skills to be an effective ally"
          />

          <div className="grid md:grid-cols-2 gap-6">
            {allyProgram.trainingModules.map((module, index) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{module.title}</CardTitle>
                        <CardDescription>{module.description}</CardDescription>
                      </div>
                      <Badge variant={
                        module.difficulty === 'Beginner' ? 'default' :
                        module.difficulty === 'Intermediate' ? 'secondary' : 'destructive'
                      }>
                        {module.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {module.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        {module.format}
                      </div>
                    </div>

                    <div>
                      <h5 className="font-medium text-foreground mb-2">Topics Covered:</h5>
                      <div className="flex flex-wrap gap-1">
                        {module.topics.map((topic, topicIndex) => (
                          <Badge key={topicIndex} variant="outline" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button className="w-full" variant="outline">
                      <Play className="w-4 h-4 mr-2" />
                      Start Module
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ally Badge & Certificate Section */}
      <section className="section-padding bg-background">
        <div className="container-padding mx-auto max-w-7xl">
          <SectionHeading
            badge="Recognition & Certification"
            title="Show Your Commitment"
            subtitle="Earn your ally badge and certificate to demonstrate your dedication"
          />

          <div className="grid md:grid-cols-2 gap-8">
            {/* Ally Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-6 h-6 text-primary" />
                    {allyProgram.badgeCertificate.badge.title}
                  </CardTitle>
                  <CardDescription>
                    {allyProgram.badgeCertificate.badge.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6 text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center mx-auto mb-3">
                      <Heart className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-sm text-muted-foreground">Preview of your ally badge</p>
                  </div>

                  <div className="space-y-3">
                    <h5 className="font-medium text-foreground">Badge Features:</h5>
                    <ul className="space-y-2">
                      {allyProgram.badgeCertificate.badge.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Earn Your Badge
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Certificate */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-6 h-6 text-primary" />
                    {allyProgram.badgeCertificate.certificate.title}
                  </CardTitle>
                  <CardDescription>
                    {allyProgram.badgeCertificate.certificate.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-primary/20 rounded-lg p-6 text-center">
                    <div className="text-4xl font-bold text-primary mb-2">ALLY</div>
                    <div className="text-sm text-muted-foreground">Certificate Preview</div>
                    <div className="text-xs text-muted-foreground mt-1">Valid for 2 years</div>
                  </div>

                  <div className="space-y-3">
                    <h5 className="font-medium text-foreground">Certificate Includes:</h5>
                    <ul className="space-y-2">
                      {allyProgram.badgeCertificate.certificate.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button className="w-full" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Get Certificate
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Corporate Ally Onboarding */}
      <section className="section-padding bg-muted/30">
        <div className="container-padding mx-auto max-w-7xl">
          <SectionHeading
            badge="Corporate Partnerships"
            title="Corporate Ally Onboarding Program"
            subtitle="Transform your organization into an LGBTQIA+ inclusive workplace"
          />

          {/* Program Overview */}
          <div className="mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="w-6 h-6 text-primary" />
                  {allyProgram.corporateOnboarding.title}
                </CardTitle>
                <CardDescription>
                  {allyProgram.corporateOnboarding.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  {allyProgram.corporateOnboarding.phases.map((phase, index) => (
                    <motion.div
                      key={phase.phase}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="text-center"
                    >
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                        <span className="text-lg font-bold text-primary">{index + 1}</span>
                      </div>
                      <h4 className="font-semibold text-foreground mb-1">{phase.title}</h4>
                      <p className="text-sm text-muted-foreground">{phase.description}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Phase Details */}
          <div className="mb-12">
            <h3 className="font-display text-2xl font-semibold text-foreground mb-8 text-center">
              Program Phases in Detail
            </h3>
            <div className="space-y-6">
              {allyProgram.corporateOnboarding.phases.map((phase, index) => (
                <motion.div
                  key={phase.phase}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold">
                          {index + 1}
                        </div>
                        {phase.title}
                      </CardTitle>
                      <CardDescription>{phase.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div>
                        <h5 className="font-medium text-foreground mb-2">Deliverables:</h5>
                        <ul className="space-y-1">
                          {phase.deliverables.map((deliverable, deliverableIndex) => (
                            <li key={deliverableIndex} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                              <span>{deliverable}</span>
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

          {/* Corporate Benefits */}
          <div className="mb-12">
            <h3 className="font-display text-2xl font-semibold text-foreground mb-6 text-center">
              Why Become a Corporate Ally?
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allyProgram.corporateOnboarding.benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="text-center h-full">
                    <CardContent className="pt-6">
                      <Target className="w-8 h-8 text-primary mx-auto mb-3" />
                      <p className="text-sm text-foreground">{benefit}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <div className="mb-12">
            <h3 className="font-display text-2xl font-semibold text-foreground mb-8 text-center">
              Success Stories
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {allyProgram.corporateOnboarding.testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent className="pt-6">
                      <Quote className="w-8 h-8 text-primary mb-4" />
                      <blockquote className="text-foreground mb-4 italic">
                        "{testimonial.quote}"
                      </blockquote>
                      <div className="text-sm">
                        <div className="font-semibold text-foreground">{testimonial.representative}</div>
                        <div className="text-muted-foreground">{testimonial.company}</div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Card className="max-w-2xl mx-auto">
              <CardContent className="pt-8 pb-8">
                <Building className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  Ready to Transform Your Organization?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Join leading companies in creating inclusive workplaces that attract and retain top talent.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg">
                    Start Corporate Ally Program
                  </Button>
                  <Button variant="outline" size="lg">
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Ally;