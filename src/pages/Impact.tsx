import { motion, useInView } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useRef, useEffect, useState } from "react";
import {
  Target,
  Users,
  Heart,
  Megaphone,
  MapPin,
  UserCheck,
  Star,
  Download,
  Award,
  Calendar,
  TrendingUp,
  Quote,
  Building,
  GraduationCap,
  Shield,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import MainLayout from "@/layouts/MainLayout";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { impactData } from "@/data/mockData";

// Animated Counter Component
const AnimatedCounter = ({ value, suffix = "", prefix = "" }: { value: string; suffix?: string; prefix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const numericValue = parseInt(value.replace(/[^\d]/g, ''));

  useEffect(() => {
    if (isInView) {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const increment = numericValue / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
          setCount(numericValue);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, numericValue]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-bold text-primary">
      {prefix}{count.toLocaleString()}{suffix}
    </div>
  );
};

const Impact = () => {
  return (
    <MainLayout>
      <Helmet>
        <title>Our Impact - Sneh Jeet NGO</title>
        <meta name="description" content="Discover the measurable impact of Sneh Jeet NGO in supporting LGBTQIA+ communities through advocacy, health, education, and community programs." />
        <meta name="keywords" content="LGBTQIA NGO impact, LGBTQ support India, LGBTQ mental health NGO, LGBTQ rights organization India" />
        <link rel="canonical" href="/impact" />
        <meta property="og:title" content="Our Impact - Sneh Jeet NGO" />
        <meta property="og:description" content="Discover the measurable impact of Sneh Jeet NGO in supporting LGBTQIA+ communities through advocacy, health, education, and community programs." />
        <meta property="og:image" content="/logo.png" />
        <meta property="og:url" content="/impact" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Our Impact - Sneh Jeet NGO" />
        <meta name="twitter:description" content="Discover the measurable impact of Sneh Jeet NGO in supporting LGBTQIA+ communities through advocacy, health, education, and community programs." />
        <meta name="twitter:image" content="/logo.png" />
      </Helmet>

      {/* Impact Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 py-20">
        <div className="container-padding mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              {impactData.hero.headline}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {impactData.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {impactData.hero.primaryCTAs.map((cta, index) => (
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

      {/* Impact at a Glance - Key Numbers */}
      <section className="section-padding bg-background">
        <div className="container-padding mx-auto max-w-7xl">
          <SectionHeading
            badge="Impact at a Glance"
            title="Building Trust Through Transparency"
            subtitle="Measurable outcomes that demonstrate our commitment to creating lasting change"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {impactData.keyMetrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center h-full">
                  <CardContent className="pt-8 pb-8">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      {metric.icon === "Users" && <Users className="w-8 h-8 text-primary" />}
                      {metric.icon === "Heart" && <Heart className="w-8 h-8 text-primary" />}
                      {metric.icon === "Megaphone" && <Megaphone className="w-8 h-8 text-primary" />}
                      {metric.icon === "MapPin" && <MapPin className="w-8 h-8 text-primary" />}
                      {metric.icon === "UserCheck" && <UserCheck className="w-8 h-8 text-primary" />}
                      {metric.icon === "Star" && <Star className="w-8 h-8 text-primary" />}
                    </div>
                    <AnimatedCounter value={metric.value} />
                    <p className="text-muted-foreground mt-2">{metric.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Program-Wise Impact */}
      <section className="section-padding bg-muted/30">
        <div className="container-padding mx-auto max-w-7xl">
          <SectionHeading
            badge="Program Impact"
            title="Transforming Lives Through Targeted Programs"
            subtitle="Detailed outcomes from our core service areas"
          />

          <div className="grid md:grid-cols-2 gap-8">
            {Object.entries(impactData.programImpact).map(([key, program], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {key === 'mentalHealth' && <Heart className="w-5 h-5 text-primary" />}
                      {key === 'health' && <Shield className="w-5 h-5 text-primary" />}
                      {key === 'legal' && <Award className="w-5 h-5 text-primary" />}
                      {key === 'education' && <GraduationCap className="w-5 h-5 text-primary" />}
                      {program.title}
                    </CardTitle>
                    <CardDescription>{program.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {program.metrics.map((metric, metricIndex) => (
                        <li key={metricIndex} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{metric}</span>
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

      {/* Real Stories, Real Impact */}
      <section className="section-padding bg-background">
        <div className="container-padding mx-auto max-w-7xl">
          <SectionHeading
            badge="Real Stories"
            title="Real Impact on Real Lives"
            subtitle="Hear from the individuals whose lives have been transformed by our programs"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {impactData.stories.map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="pt-8 pb-8">
                    <Quote className="w-8 h-8 text-primary mb-4" />
                    <blockquote className="text-foreground mb-4 italic leading-relaxed">
                      "{story.story}"
                    </blockquote>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                        {story.avatar}
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">{story.author}</div>
                        <Badge variant="secondary" className="text-xs">{story.category}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Regional & Community Reach */}
      <section className="section-padding bg-muted/30">
        <div className="container-padding mx-auto max-w-7xl">
          <SectionHeading
            badge="Where We Work"
            title="National Reach, Local Impact"
            subtitle="Our programs span across India, bringing support to communities nationwide"
          />

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>{impactData.regionalReach.title}</CardTitle>
                  <CardDescription>{impactData.regionalReach.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {impactData.regionalReach.regions.map((region, index) => (
                      <motion.div
                        key={region}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-primary/5 rounded-lg p-3 text-center"
                      >
                        <MapPin className="w-5 h-5 text-primary mx-auto mb-1" />
                        <span className="text-sm font-medium">{region}</span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <div>
                        <div className="font-medium text-green-900 dark:text-green-100">Urban</div>
                        <div className="text-sm text-green-800 dark:text-green-200">{impactData.regionalReach.coverage.urban}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <div>
                        <div className="font-medium text-blue-900 dark:text-blue-100">Semi-Urban</div>
                        <div className="text-sm text-blue-800 dark:text-blue-200">{impactData.regionalReach.coverage.semiUrban}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                      <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                      <div>
                        <div className="font-medium text-purple-900 dark:text-purple-100">Online</div>
                        <div className="text-sm text-purple-800 dark:text-purple-200">{impactData.regionalReach.coverage.online}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-16 h-16 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Growing Nationwide</h3>
              <p className="text-muted-foreground">
                From our initial community programs to nationwide digital support,
                we're expanding our reach to serve more individuals across India.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Financial Transparency Snapshot */}
      <section className="section-padding bg-background">
        <div className="container-padding mx-auto max-w-7xl">
          <SectionHeading
            badge="Financial Transparency"
            title="How Your Donations Make Impact"
            subtitle="Complete transparency in how we allocate and utilize funds"
          />

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>{impactData.financialTransparency.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {impactData.financialTransparency.breakdown.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">{item.category}</span>
                        <span className="text-sm text-muted-foreground">{item.percentage}%</span>
                      </div>
                      <Progress value={item.percentage} className="h-3" />
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="text-center">
                <Download className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">Download Our Reports</h3>
                <p className="text-muted-foreground">
                  Access our annual reports and audited financial statements for complete transparency.
                </p>
              </div>

              <div className="space-y-3">
                {impactData.financialTransparency.downloads.map((download, index) => (
                  <Button key={index} variant="outline" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    {download.text}
                  </Button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partners & Collaborations */}
      <section className="section-padding bg-muted/30">
        <div className="container-padding mx-auto max-w-7xl">
          <SectionHeading
            badge="Partners & Collaborations"
            title="Stronger Together"
            subtitle="Our impact is amplified through strategic partnerships and collaborations"
          />

          <div className="mb-8">
            <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto">
              {impactData.partners.description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {impactData.partners.categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building className="w-5 h-5 text-primary" />
                      {category.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {category.organizations.map((org, orgIndex) => (
                        <li key={orgIndex} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                          <span>{org}</span>
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

      {/* Awards, Recognition & Media Mentions */}
      <section className="section-padding bg-background">
        <div className="container-padding mx-auto max-w-7xl">
          <SectionHeading
            badge="Recognition & Awards"
            title="Celebrating Our Achievements"
            subtitle="Recognition from government, NGOs, and media for our impactful work"
          />

          <div className="mb-8">
            <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto">
              {impactData.awards.description}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {impactData.awards.recognitions.map((recognition, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-primary" />
                      {recognition.type}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {recognition.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-2 text-sm">
                          <Star className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
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

      {/* Impact Timeline */}
      <section className="section-padding bg-muted/30">
        <div className="container-padding mx-auto max-w-7xl">
          <SectionHeading
            badge="Our Journey"
            title="Impact Timeline"
            subtitle="Key milestones in our growth and expanding impact"
          />

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/30"></div>

              {impactData.timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative flex items-start gap-6 mb-8"
                >
                  {/* Timeline dot */}
                  <div className="w-4 h-4 rounded-full bg-primary border-4 border-background relative z-10 mt-2"></div>

                  {/* Content */}
                  <div className="flex-1 bg-card rounded-xl p-6 border border-border">
                    <div className="flex items-center gap-3 mb-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      <span className="font-bold text-primary text-lg">{item.year}</span>
                    </div>
                    <p className="text-muted-foreground">{item.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary/5 border-y border-primary/10">
        <div className="container-padding mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {impactData.finalCTA.headline}
              </h2>
              <p className="text-xl text-muted-foreground">
                {impactData.finalCTA.description}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {impactData.finalCTA.actions.map((action, index) => (
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

export default Impact;