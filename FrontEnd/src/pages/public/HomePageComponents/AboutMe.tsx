import { useNavigate } from "react-router-dom";
import {
  ButtonPrimary,
  ButtonSecondary,
} from "../../../components/shared/button";

export default function AboutMe() {
  // const navigate = useNavigate();

  return (
    <section id="aboutme" className="about-me__section">
      <div className="about-me__wrapper max-width">
        <div className="about-me__box">Lottie siluet</div>
        <div className="about-me__box">
          <h3 className="about-me__title">Adrian Dader Laguna</h3>
          <p className="about-me__desc">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit
            ducimus sint libero? Magni distinctio nam non veritatis debitis
            earum exercitationem vitae dolorum illum. Aspernatur natus incidunt
            nam placeat ratione ipsa?
          </p>
          <p className="about-me__desc">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit
            ducimus sint libero? Magni distinctio nam non veritatis debitis
            earum exercitationem vitae dolorum illum. Aspernatur natus incidunt
            nam placeat ratione ipsa?
          </p>
          <p className="about-me__desc">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit
            ducimus sint libero? Magni distinctio nam non veritatis debitis
            earum exercitationem vitae dolorum illum. Aspernatur natus incidunt
            nam placeat ratione ipsa?
          </p>
          <div className="about-me-buttons__wrapper">
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
