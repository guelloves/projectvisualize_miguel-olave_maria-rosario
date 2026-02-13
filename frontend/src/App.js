import "@/App.css";
import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { ZenModeDemo } from "@/components/landing/ZenModeDemo";
import { VisualMagnetDemo } from "@/components/landing/VisualMagnetDemo";
import { AISightDemo } from "@/components/landing/AISightDemo";
import { EduHub } from "@/components/landing/EduHub";
import { Testimonials } from "@/components/landing/Testimonials";
import { CTAFooter } from "@/components/landing/CTAFooter";

function App() {
  return (
    <div className="grain-overlay bg-[#050505] min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <ZenModeDemo />
        <VisualMagnetDemo />
        <AISightDemo />
        <EduHub />
        <Testimonials />
        <CTAFooter />
      </main>
    </div>
  );
}

export default App;
