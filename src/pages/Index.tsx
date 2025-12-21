import { Helmet } from "react-helmet-async";
import MainLayout from "@/layouts/MainLayout";
import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import AboutPreview from "@/components/home/AboutPreview";
import ProgramsSection from "@/components/home/ProgramsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import PartnersSection from "@/components/home/PartnersSection";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <MainLayout>
      <Helmet>
        <title>Sneh Jeet NGO - Supporting LGBTQIA+ Community</title>
        <meta name="description" content="Sneh Jeet NGO is dedicated to supporting and advocating for the LGBTQIA+ community. Join our programs, events, and initiatives for a more inclusive world." />
        <meta name="keywords" content="LGBTQIA+, NGO, support, advocacy, community, inclusion, programs, events" />
        <link rel="canonical" href="/" />
        <meta property="og:title" content="Sneh Jeet NGO - Supporting LGBTQIA+ Community" />
        <meta property="og:description" content="Sneh Jeet NGO is dedicated to supporting and advocating for the LGBTQIA+ community. Join our programs, events, and initiatives for a more inclusive world." />
        <meta property="og:image" content="/logo.png" />
        <meta property="og:url" content="/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sneh Jeet NGO - Supporting LGBTQIA+ Community" />
        <meta name="twitter:description" content="Sneh Jeet NGO is dedicated to supporting and advocating for the LGBTQIA+ community. Join our programs, events, and initiatives for a more inclusive world." />
        <meta name="twitter:image" content="/logo.png" />
      </Helmet>
      <HeroSection />
      <StatsSection />
      <AboutPreview />
      <ProgramsSection />
      <TestimonialsSection />
      <PartnersSection />
      <CTASection />
    </MainLayout>
  );
};

export default Index;
