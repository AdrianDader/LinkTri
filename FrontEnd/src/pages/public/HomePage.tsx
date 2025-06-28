import "./HomePage.css";
import AboutMe from "./HomePageComponents/AboutMe";
import Hero from "./HomePageComponents/Hero";
import HowItWorks from "./HomePageComponents/HowItWorks";
import WhatIs from "./HomePageComponents/WhatIs";


export default function HomePage() {
  return (
    <>
      {/* <h1>HomePage</h1> */}

      <Hero />
      <WhatIs />
      <HowItWorks />
      <AboutMe />

      {/* <section className="height-viewport">aaaaaaa</section> */}
    </>
  );
}


