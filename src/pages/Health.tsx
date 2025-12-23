import { useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  Heart,
  Users,
  Calendar,
  Download,
  Phone,
  MapPin,
  Clock,
  Shield,
  TestTube,
  Pill,
  BookOpen,
  ExternalLink,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import MainLayout from "@/layouts/MainLayout";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { healthServices } from "@/data/mockData";
import AppointmentFormModal from "@/components/AppointmentFormModal";

const Health = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <MainLayout>
      <Helmet>
        <title>Health & Well-Being - Sneh Jeet NGO</title>
        <meta name="description" content="Comprehensive health services for the LGBTQIA+ community including mental health support, sexual health care, and HIV services." />
        <meta name="keywords" content="mental health, sexual health, HIV care, LGBTQIA+, therapy, counseling, PrEP, PEP, STI testing" />
        <link rel="canonical" href="/health" />
        <meta property="og:title" content="Health & Well-Being - Sneh Jeet NGO" />
        <meta property="og:description" content="Comprehensive health services for the LGBTQIA+ community including mental health support, sexual health care, and HIV services." />
        <meta property="og:image" content="/logo.png" />
        <meta property="og:url" content="/health" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Health & Well-Being - Sneh Jeet NGO" />
        <meta name="twitter:description" content="Comprehensive health services for the LGBTQIA+ community including mental health support, sexual health care, and HIV services." />
        <meta name="twitter:image" content="/logo.png" />
      </Helmet>

      <PageHero
        badge="Health & Well-Being"
        title="Comprehensive Care for Our Community"
        subtitle="Mental health support, sexual health services, and HIV care tailored for LGBTQIA+ individuals"
      />

      {/* Mental Health Support Section */}
      <section className="section-padding bg-background">
        <div className="container-padding mx-auto max-w-7xl">
          <SectionHeading
            badge="Mental Health Support"
            title="Professional Care & Community Support"
            subtitle="LGBTQIA+-affirming mental health services and resources"
          />

          {/* Therapists Directory */}
          <div className="mb-12">
            <h3 className="font-display text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <Heart className="w-6 h-6 text-primary" />
              LGBTQ-Friendly Therapists Directory
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {healthServices.mentalHealth.therapists.map((therapist, index) => (
                <motion.div
                  key={therapist.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{therapist.name}</CardTitle>
                          <CardDescription>{therapist.specialty}</CardDescription>
                        </div>
                        <Badge variant={therapist.accepting ? "default" : "secondary"}>
                          {therapist.accepting ? "Accepting New Patients" : "Waitlist"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>{therapist.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <a href={`tel:${therapist.phone}`} className="text-primary hover:underline">
                          {therapist.phone}
                        </a>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm font-medium">Insurance:</div>
                        <div className="flex flex-wrap gap-1">
                          {therapist.insurance.map((ins) => (
                            <Badge key={ins} variant="outline" className="text-xs">
                              {ins}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm font-medium">Languages:</div>
                        <div className="flex flex-wrap gap-1">
                          {therapist.languages.map((lang) => (
                            <Badge key={lang} variant="secondary" className="text-xs">
                              {lang}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Online Counseling Booking */}
          <div className="mb-12">
            <h3 className="font-display text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-primary" />
              Online Counseling Booking
            </h3>
            <div className="bg-card rounded-2xl p-8 border border-border">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Calendar className="w-8 h-8 text-primary" />
                </div>
                <h4 className="font-display text-xl font-semibold">Schedule Your Session</h4>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Book confidential online counseling sessions with our LGBTQIA+-affirming therapists.
                  Sessions are available in multiple languages and can be conducted via video or phone.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" onClick={() => setIsModalOpen(true)}>
                    Book Appointment
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Self-Help Resources */}
          <div className="mb-12">
            <h3 className="font-display text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-primary" />
              Self-Help Resources
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {healthServices.mentalHealth.selfHelpResources.map((resource, index) => (
                <motion.div
                  key={resource.title}
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
                      <p className="text-muted-foreground mb-4">{resource.description}</p>
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

          {/* Anxiety/Depression Screening */}
          <div className="mb-12">
            <h3 className="font-display text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              Mental Health Screening Tools
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Anxiety Screening</CardTitle>
                  <CardDescription>
                    Take our confidential anxiety assessment to understand your symptoms and get personalized recommendations.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    Start Anxiety Screening
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Depression Screening</CardTitle>
                  <CardDescription>
                    Complete our depression questionnaire to assess your mental health and access appropriate support.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    Start Depression Screening
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Support Group Schedule */}
          <div>
            <h3 className="font-display text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <Users className="w-6 h-6 text-primary" />
              Support Group Schedule
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {healthServices.mentalHealth.supportGroups.map((group, index) => (
                <motion.div
                  key={group.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="text-lg">{group.name}</CardTitle>
                      <Badge variant="secondary">{group.type}</Badge>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>{group.schedule}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>{group.location}</span>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Facilitator:</span> {group.facilitator}
                      </div>
                      <p className="text-muted-foreground text-sm">{group.description}</p>
                      <Button variant="outline" className="w-full">
                        Join Group
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sexual Health & HIV Care Section */}
      <section className="section-padding bg-muted/30">
        <div className="container-padding mx-auto max-w-7xl">
          <SectionHeading
            badge="Sexual Health & HIV Care"
            title="Comprehensive Sexual Health Services"
            subtitle="HIV testing, PrEP/PEP, STI education, and affirming sexual health care"
          />

          {/* HIV Testing Centers */}
          <div className="mb-12">
            <h3 className="font-display text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <TestTube className="w-6 h-6 text-primary" />
              HIV Testing Centers
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {healthServices.sexualHealth.testingCenters.map((center, index) => (
                <motion.div
                  key={center.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="text-lg">{center.name}</CardTitle>
                      <CardDescription>{center.location}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        <div className="text-sm font-medium">Services:</div>
                        <div className="flex flex-wrap gap-1">
                          {center.services.map((service) => (
                            <Badge key={service} variant="outline" className="text-xs">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>{center.hours}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <a href={`tel:${center.phone}`} className="text-primary hover:underline">
                          {center.phone}
                        </a>
                      </div>
                      <Button variant="outline" className="w-full">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Visit Website
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* PrEP/PEP Information */}
          <div className="mb-12">
            <h3 className="font-display text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <Pill className="w-6 h-6 text-primary" />
              PrEP & PEP Information
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    {healthServices.sexualHealth.prepPepInfo.prep.title}
                  </CardTitle>
                  <CardDescription>
                    {healthServices.sexualHealth.prepPepInfo.prep.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="font-medium text-sm">Eligibility:</div>
                    <div className="text-sm text-muted-foreground">
                      {healthServices.sexualHealth.prepPepInfo.prep.eligibility}
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-sm">Cost:</div>
                    <div className="text-sm text-muted-foreground">
                      {healthServices.sexualHealth.prepPepInfo.prep.cost}
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-sm">How to Get:</div>
                    <div className="text-sm text-muted-foreground">
                      {healthServices.sexualHealth.prepPepInfo.prep.howToGet}
                    </div>
                  </div>
                  <Button className="w-full">
                    Learn More About PrEP
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-orange-500" />
                    {healthServices.sexualHealth.prepPepInfo.pep.title}
                  </CardTitle>
                  <CardDescription>
                    {healthServices.sexualHealth.prepPepInfo.pep.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="font-medium text-sm">Eligibility:</div>
                    <div className="text-sm text-muted-foreground">
                      {healthServices.sexualHealth.prepPepInfo.pep.eligibility}
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-sm">Cost:</div>
                    <div className="text-sm text-muted-foreground">
                      {healthServices.sexualHealth.prepPepInfo.pep.cost}
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-sm">How to Get:</div>
                    <div className="text-sm text-muted-foreground">
                      {healthServices.sexualHealth.prepPepInfo.pep.howToGet}
                    </div>
                  </div>
                  <Button className="w-full">
                    Emergency PEP Info
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* STI Education */}
          <div className="mb-12">
            <h3 className="font-display text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-primary" />
              STI Education Resources
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {healthServices.sexualHealth.stiEducation.map((resource, index) => (
                <motion.div
                  key={resource.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="text-lg">{resource.name}</CardTitle>
                      <Badge variant="outline">{resource.resource}</Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{resource.description}</p>
                      <Button variant="outline" className="w-full">
                        <Download className="w-4 h-4 mr-2" />
                        Download Guide
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Safe Sex Guides */}
          <div className="mb-12">
            <h3 className="font-display text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              Safe Sex Guides
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {healthServices.sexualHealth.safeSexGuides.map((guide, index) => (
                <motion.div
                  key={guide.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="text-lg">{guide.title}</CardTitle>
                      <Badge variant="secondary">{guide.type}</Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{guide.description}</p>
                      <Button variant="outline" className="w-full">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Guide
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Partner Clinics */}
          <div>
            <h3 className="font-display text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <MapPin className="w-6 h-6 text-primary" />
              Partner Clinics
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {healthServices.sexualHealth.partnerClinics.map((clinic, index) => (
                <motion.div
                  key={clinic.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="text-lg">{clinic.name}</CardTitle>
                      <CardDescription>{clinic.location}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        <div className="text-sm font-medium">Services:</div>
                        <div className="flex flex-wrap gap-1">
                          {clinic.services.map((service) => (
                            <Badge key={service} variant="outline" className="text-xs">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <a href={`tel:${clinic.phone}`} className="text-primary hover:underline">
                          {clinic.phone}
                        </a>
                      </div>
                      <Button variant="outline" className="w-full">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Visit Clinic
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
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
              <Heart className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
                Your Health Matters
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Access confidential, affirming healthcare services designed specifically for our community.
                All services are provided with respect, dignity, and without judgment.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                Schedule Consultation
              </Button>
              <Button variant="outline" size="lg">
                Contact Health Team
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      <AppointmentFormModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </MainLayout>
  );
};

export default Health;