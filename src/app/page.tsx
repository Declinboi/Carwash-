import { Button } from "@/components/ui/button";
import Image from "next/image";
import HeroSection from "./components/home/HeroSection";
import Header from "./components/navigation/Header";
import { ServicesSection } from "./components/home/Services";
import { FeaturesSection } from "./components/home/FeaturesSection";
import { CTASection } from "./components/home/cta/CTASection";
import { ProjectGallery } from "./components/home/ProjectGallary";
import { Footer } from "./components/navigation/Footer";
import { GetStartedCTA } from "./components/home/cta/GetStartedCTA";
import { DashboardFeature } from "./components/home/DashboardFeatures";


export default function Home() {
  return (
   <div className="overflow-x-hidden max-w-[100vw]" >
   
    <HeroSection/>
    <ServicesSection/>
    <DashboardFeature/>
    <FeaturesSection/>
    <CTASection/>
    <ProjectGallery/>
    <GetStartedCTA/>
    <Footer/>
   </div>
  );
}
