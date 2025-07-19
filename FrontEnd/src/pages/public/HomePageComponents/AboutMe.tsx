import {ButtonPrimary} from "../../../components/shared/button";
export default function AboutMe() {

  return (
    <section id="aboutme" className="about-me__section">
      <div className="about-me__wrapper max-width">
        <div className="about-me__box">
          <img className="about-me__img" src="./../../../../public/autor.svg" alt="autor" width="80%"/>
          dddddddd
          </div>
        <div className="about-me__box">
          <h3 className="about-me__title">Adrian Dader Laguna</h3>
          <p className="about-me__desc">
            Profesional multidisciplinar radicado en Oviedo, Asturias, con una sólida trayectoria como Digital Designer, experto en UX/UI, motion graphics, modelado 3D, realización audiovisual, y apasionado guitarrista. Además, es Instructor de Esgrima Histórica (HEMA) en la Escuela Gaudiosa de Esgrima Histórica.
          </p>
          <p className="about-me__desc" style={{marginTop: "1rem"}}>
          Con formación tanto en diseño gráfico y tecnologías digitales como en artes marciales históricas, Adrián integra la innovación tecnológica con el rigor académico, aportando una visión única que combina cultura, deporte y estética visual 
          </p>
          
          <div className="about-me-buttons__wrapper" style={{marginTop:"1rem"}}>
            <ButtonPrimary
              onClick={() => {
                window.open("https://github.com/AdrianDader/LinkTri", "_blank");
              }}
            >
              Github
            </ButtonPrimary>

            <ButtonPrimary
              onClick={() => {
                window.open("https://www.linkedin.com/in/adriandader/", "_blank");
              }}
            >
              LinkedIn
            </ButtonPrimary>
          </div>
        </div>
      </div>
    </section>
  );
}
