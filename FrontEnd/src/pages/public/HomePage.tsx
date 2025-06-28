import "./HomePage.css";
import AboutMe from "./HomePageComponents/AboutMe";
import Hero from "./HomePageComponents/Hero";
import HowItWorks from "./HomePageComponents/HowItWorks";
import WhatIs from "./HomePageComponents/WhatIs";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";



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

{
  /* <section id="whatis">
  <h2>What is it?</h2>
  <p>Explicación aquí...</p>
</section> */
}
