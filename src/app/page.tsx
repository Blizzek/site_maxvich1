import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AdvantagesSection } from "@/components/sections/AdvantagesSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { CalculatorSection } from "@/components/sections/CalculatorSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { FloatingActionButton } from "@/components/ui/FloatingActionButton";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <AdvantagesSection />
      <ServicesSection />
      <CalculatorSection />
      <PortfolioSection />
      <ContactSection />
      <FloatingActionButton />
      <Footer />
    </main>
  );
}
