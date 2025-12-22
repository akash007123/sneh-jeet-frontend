import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  Calendar,
  Users,
  BookOpen,
  Award,
  GraduationCap,
  Building,
  Shield,
  Clock,
  MapPin,
  CheckCircle,
  Download,
  Play,
  FileText,
  HelpCircle,
  Lightbulb,
  Target,
  ArrowRight
} from "lucide-react";
import MainLayout from "@/layouts/MainLayout";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { educationTraining } from "@/data/mockData";

const Education = () => {
  return (
    <MainLayout>
      <Helmet>
        <title>Education & Training - Sneh Jeet NGO</title>
        <meta name="description" content="Comprehensive education and training programs for schools, corporates, and professionals. LGBTQIA+ learning hub with resources and workshops." />
        <meta name="keywords" content="education, training, workshops, LGBTQIA+, learning hub, pronouns, gender, sexuality, schools, corporates, police, healthcare" />
        <link rel="canonical" href="/education" />
        <meta property="og:title" content="Education & Training - Sneh Jeet NGO" />
        <meta property="og:description" content="Comprehensive education and training programs for schools, corporates, and professionals. LGBTQIA+ learning hub with resources and workshops." />
        <meta property="og:image" content="/logo.png" />
        <meta property="og:url" content="/education" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Education & Training - Sneh Jeet NGO" />
        <meta name="twitter:description" content="Comprehensive education and training programs for schools, corporates, and professionals. LGBTQIA+ learning hub with resources and workshops." />
        <meta name="twitter:image" content="/logo.png" />
      </Helmet>

      <PageHero
        badge="Education & Training"
        title="Building Knowledge & Understanding"
        subtitle="Comprehensive training programs and learning resources for schools, corporates, and professionals"
      />

      {/* Workshops & Training Section */}
      <section className="section-padding bg-background">
        <div className="container-padding mx-auto max-w-7xl">
          <SectionHeading
            badge="Workshops & Training"
            title="Professional Development Programs"
            subtitle="Tailored training for different audiences and professional contexts"
          />

          {/* Audience Categories */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {educationTraining.workshops.audiences.map((audience, index) => (
              <motion.div
                key={audience.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      {audience.icon === "GraduationCap" && <GraduationCap className="w-6 h-6 text-primary" />}
                      {audience.icon === "Building" && <Building className="w-6 h-6 text-primary" />}
                      {audience.icon === "Shield" && <Shield className="w-6 h-6 text-primary" />}
                    </div>
                    <CardTitle className="text-xl">{audience.title}</CardTitle>
                    <CardDescription>{audience.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {audience.workshops.map((workshop, workshopIndex) => (
                        <div key={workshopIndex} className="border-l-2 border-primary/20 pl-4">
                          <h4 className="font-semibold text-foreground mb-1">{workshop.title}</h4>
                          <div className="text-sm text-muted-foreground space-y-1">
                            <div className="flex items-center gap-2">
                              <Clock className="w-3 h-3" />
                              <span>{workshop.duration}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="w-3 h-3" />
                              <span>{workshop.targetAudience}</span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {workshop.topics.slice(0, 2).map((topic, topicIndex) => (
                              <Badge key={topicIndex} variant="outline" className="text-xs">
                                {topic}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Training Calendar */}
          <div className="mb-12">
            <h3 className="font-display text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-primary" />
              Upcoming Training Sessions
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {educationTraining.trainingCalendar.map((session, index) => (
                <motion.div
                  key={session.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{session.title}</CardTitle>
                          <Badge variant="secondary" className="mt-1">
                            {session.audience}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-foreground">
                            {new Date(session.date).toLocaleDateString()}
                          </div>
                          <div className="text-xs text-muted-foreground">{session.time}</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>{session.location}</span>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Instructor:</span> {session.instructor}
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Enrolled: {session.enrolled}/{session.capacity}</span>
                          <span>{Math.round((session.enrolled / session.capacity) * 100)}%</span>
                        </div>
                        <Progress value={(session.enrolled / session.capacity) * 100} className="h-2" />
                      </div>
                      <Button className="w-full" size="sm">
                        Book Session
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Booking Form & Certificates */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Booking Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Book Training Session
                </CardTitle>
                <CardDescription>
                  Reserve your spot in our upcoming training programs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Select Training Type</label>
                  <select className="w-full p-2 border border-border rounded-md">
                    <option>Schools & Colleges Workshop</option>
                    <option>Corporate Training</option>
                    <option>Professional Development</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Preferred Date</label>
                  <input type="date" className="w-full p-2 border border-border rounded-md" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Organization/Institution</label>
                  <input type="text" placeholder="Enter organization name" className="w-full p-2 border border-border rounded-md" />
                </div>
                <Button className="w-full">
                  Submit Booking Request
                </Button>
              </CardContent>
            </Card>

            {/* Certificates */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" />
                    {educationTraining.certificates.completion.title}
                  </CardTitle>
                  <CardDescription>
                    {educationTraining.certificates.completion.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    {educationTraining.certificates.completion.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    View Sample Certificate
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" />
                    {educationTraining.certificates.advanced.title}
                  </CardTitle>
                  <CardDescription>
                    {educationTraining.certificates.advanced.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    {educationTraining.certificates.advanced.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Custom Training Request */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-8 pb-8">
              <div className="text-center space-y-4">
                <Target className="w-12 h-12 text-primary mx-auto" />
                <h3 className="font-display text-xl font-semibold text-foreground">
                  Custom Training Request
                </h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Need training tailored to your organization's specific needs? We offer customized programs
                  designed for your audience, schedule, and learning objectives.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg">
                    Request Custom Training
                  </Button>
                  <Button variant="outline" size="lg">
                    View Training Options
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* LGBTQIA+ Learning Hub */}
      <section className="section-padding bg-muted/30">
        <div className="container-padding mx-auto max-w-7xl">
          <SectionHeading
            badge="LGBTQIA+ Learning Hub"
            title="Educational Resources & Guides"
            subtitle="Comprehensive learning materials to build understanding and awareness"
          />

          {/* Main Resources Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Pronouns Guide */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    {educationTraining.learningHub.pronounsGuide.title}
                  </CardTitle>
                  <CardDescription>
                    {educationTraining.learningHub.pronounsGuide.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {educationTraining.learningHub.pronounsGuide.content.introduction}
                  </p>

                  <div>
                    <h5 className="font-medium text-foreground mb-3">Common Pronouns:</h5>
                    <div className="space-y-2">
                      {educationTraining.learningHub.pronounsGuide.content.commonPronouns.map((pronoun, index) => (
                        <div key={index} className="bg-muted/50 p-3 rounded-lg">
                          <div className="font-medium text-sm">
                            {pronoun.subject}/{pronoun.object}/{pronoun.possessive}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {pronoun.example}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium text-foreground mb-2">Tips:</h5>
                    <ul className="space-y-1">
                      {educationTraining.learningHub.pronounsGuide.content.tips.map((tip, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download Full Guide
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Gender vs Sexuality */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-primary" />
                    {educationTraining.learningHub.genderVsSexuality.title}
                  </CardTitle>
                  <CardDescription>
                    {educationTraining.learningHub.genderVsSexuality.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                      <h5 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                        {educationTraining.learningHub.genderVsSexuality.content.gender.title}
                      </h5>
                      <p className="text-sm text-blue-800 dark:text-blue-200 mb-2">
                        {educationTraining.learningHub.genderVsSexuality.content.gender.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {educationTraining.learningHub.genderVsSexuality.content.gender.examples.map((example, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {example}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg">
                      <h5 className="font-medium text-purple-900 dark:text-purple-100 mb-2">
                        {educationTraining.learningHub.genderVsSexuality.content.sexuality.title}
                      </h5>
                      <p className="text-sm text-purple-800 dark:text-purple-200 mb-2">
                        {educationTraining.learningHub.genderVsSexuality.content.sexuality.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {educationTraining.learningHub.genderVsSexuality.content.sexuality.examples.map((example, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {example}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg">
                    <h5 className="font-medium text-yellow-900 dark:text-yellow-100 mb-2">Key Difference:</h5>
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                      {educationTraining.learningHub.genderVsSexuality.content.keyDifference}
                    </p>
                  </div>

                  <Button variant="outline" className="w-full">
                    <FileText className="w-4 h-4 mr-2" />
                    Read Full Article
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Myths & Facts */}
          <div className="mb-12">
            <h3 className="font-display text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-primary" />
              Myths & Facts
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {educationTraining.learningHub.mythsAndFacts.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-lg border-l-4 border-red-500">
                          <h5 className="font-medium text-red-900 dark:text-red-100 mb-2">Myth:</h5>
                          <p className="text-sm text-red-800 dark:text-red-200">{item.myth}</p>
                        </div>
                        <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border-l-4 border-green-500">
                          <h5 className="font-medium text-green-900 dark:text-green-100 mb-2">Fact:</h5>
                          <p className="text-sm text-green-800 dark:text-green-200">{item.fact}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* FAQs for Parents */}
          <div>
            <h3 className="font-display text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-primary" />
              FAQs for Parents
            </h3>
            <Card>
              <CardContent className="pt-6">
                <Accordion type="single" collapsible className="space-y-4">
                  {educationTraining.learningHub.parentFAQs.map((faq, index) => (
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

      {/* Call to Action */}
      <section className="py-12 bg-primary/5 border-y border-primary/10">
        <div className="container-padding mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
                Start Learning Today
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Join thousands of individuals and organizations who have enhanced their understanding
                and created more inclusive environments through our education programs.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                Browse Training Programs
              </Button>
              <Button variant="outline" size="lg">
                Download Resources
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Education;