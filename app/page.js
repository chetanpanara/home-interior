import HeroSection from "@/components/HeroSection";
import PortfolioGrid from "@/components/PortfolioGrid";
import Whychooseus from "@/components/Whychooseus";
import About from "./about/page";


export default function Home() {
  return (
    <>
      <HeroSection />
      <About/>
      <Whychooseus />
      <PortfolioGrid/>
    </>
  );
}
