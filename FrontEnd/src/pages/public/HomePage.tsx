import "./HomePage.css";
import AboutMe from "./HomePageComponents/AboutMe";
import Hero from "./HomePageComponents/Hero";
import HowItWorks from "./HomePageComponents/HowItWorks";
import WhatIs from "./HomePageComponents/WhatIs";


export default function HomePage() {
  return (
    <>
      <Hero />
      <WhatIs />
      <HowItWorks />
      <AboutMe />
    </>
  );
}


