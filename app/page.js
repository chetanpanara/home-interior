import HeroSection from "@/components/HeroSection";
import Whychooseus from "@/components/Whychooseus";
import About from "./about/page";
import ContactSection from "./contact/page";
import Services from "./services/page";


export default function Home() {
  return (
    <>
      <HeroSection />
      <About/>
      <Whychooseus />
      <Services/>
      <ContactSection/>
    </>
  );
}
