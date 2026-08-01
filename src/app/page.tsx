import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Metrics from "@/components/Metrics";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import ArchitectureSandbox from "@/components/ArchitectureSandbox";
import Timeline from "@/components/Timeline";
import Leadership from "@/components/Leadership";
import Contact from "@/components/Contact";
import HufflepuffStamp from "@/components/HufflepuffStamp";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import MascotAnimationOverlay from "@/components/MascotAnimationOverlay";
import TerminalLoaderWrapper from "@/components/TerminalLoaderWrapper";

export default function Home() {
  return (
    <main className="relative">
      <TerminalLoaderWrapper>
        <MascotAnimationOverlay />
        <ScrollProgress />
        <Navigation />
        <Hero />
        <Metrics />
        <Skills />
        <Projects />
        <ArchitectureSandbox />
        <Timeline />
        <Leadership />
        <Contact />
        <HufflepuffStamp />
        <Footer />
      </TerminalLoaderWrapper>
    </main>
  );
}
