import HeroSection from "@/components/HeroSection";
import Whychooseus from "@/components/Whychooseus";
import About from "./about/page";
import ContactSection from "./contact/page";
import Services from "./services/page";
import EnvironmentalHero from "@/components/EnvironmentalHero";
import GalleryPage from "./gallary/page";


export default function Home() {
  return (
    <>
      <HeroSection />
      <About />
      <EnvironmentalHero />
      <Whychooseus />
      <Services />
      <GalleryPage/>
      <ContactSection />
    </>
  );
}
