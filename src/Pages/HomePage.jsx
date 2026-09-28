import React from "react";
import HeroSection from "@/Components/HeroSection";
import Project from "@/Components/Project";
import Service from "@/Components/Service";
import { OurWorking } from "@/Components/OurWorking";
import AboutSection from "@/Components/AboutSection";
const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <Project />
      <Service />
      <OurWorking />
      <AboutSection/>
    </div>
  );
};

export default HomePage;
