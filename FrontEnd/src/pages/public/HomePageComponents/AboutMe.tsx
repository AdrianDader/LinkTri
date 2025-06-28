import { ButtonPrimary, ButtonSecondary } from "../../../components/shared/button";

export default function AboutMe() {
  return (
    <section className="about-me__section">
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
            <ButtonPrimary>GitHub</ButtonPrimary>
            <ButtonPrimary>LinkeId</ButtonPrimary>

          </div>
        </div>
      </div>
    </section>
  );
}
