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
