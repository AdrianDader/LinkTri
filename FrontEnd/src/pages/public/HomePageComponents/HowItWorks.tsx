import data from "./../HomePageContent/HowItWorks.json";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import useIsMobile from "../../../hooks/useMobile";

export default function HowItWorks() {
  const isMobile = useIsMobile(768);
  return (
    <>
    <section id="howitworks"className="how-it-works__background">
      <section className="how-it-works_section">
        {data.map((element) =>
          (element.id % 2 === 0 && !isMobile) ? (
            <div key={element.id} className="how-it-works__wrapper max-width">
              <div className="how-it-works__img">
                <DotLottieReact src={element.svgImage} loop autoplay />
              </div>
              <div className="how-it-works__info">
                <h3 className="how-it-works__title">{element.name}</h3>
                <p className="how-it-works__desc">{element.description}</p>
              </div>
            </div>
          ) : (
            <div key={element.id} className="how-it-works__wrapper max-width">
              <div className="how-it-works__info">
                <h3 className="how-it-works__title">{element.name}</h3>
                <p className="how-it-works__desc">{element.description}</p>
              </div>
              <div className="how-it-works__img">

                <DotLottieReact src={element.svgImage} loop autoplay />
              </div>
            </div>
          )
        )}
      </section>
      </section>
    </>
  );
}
