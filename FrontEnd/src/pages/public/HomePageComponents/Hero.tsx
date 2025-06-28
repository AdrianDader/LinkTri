import {
  ButtonPrimary,
  ButtonSecondary,
} from "./../../../components/shared/button";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
export default function Hero() {
  return (
    <>
      <section className="hero__background">
        <section className="hero__section max-width">
          <div className="hero__wrapper">
            <h1>
              <span style={{ color: "#66A21B", fontSize: "3rem" }}>Link</span>
              <span style={{ color: "#363636", fontSize: "3rem" }}>Tri</span>
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti,
              id minus! Nostrum facere opfgFsdfio facilis cumque nisi, officiis,
              beatae porro aspernatur voluptatibus possimus ut laborum fugiat
              sit nulla tempore hic. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Distinctio quas dolorum quibusdam, fugit modi
              ullam magni. Unde assumenda distinctio quas facere odit
              praesentium qui beatae? Nulla adipisci officia enim tempore? Lorem
              ipsum, dolor sit amet consectetur adipisicing elit. Amet voluptate
              exercitationem tenetur nisi placeat commodi distinctio animi,
              provident eum, asperiores iure dolorem vero quas minus ducimus
              odio numquam dignissimos saepe.
            </p>
            <div className="hero-buttons__wrapper">
              <ButtonPrimary>Login</ButtonPrimary>
              <ButtonSecondary>Crear cuenta</ButtonSecondary>
            </div>
          </div>
          <div className="hero__wrapper hero-vector">
            <DotLottieReact
              src="https://lottie.host/e8a91934-3750-40d0-9ec9-3c9b027d0e6d/h9ILFIhCip.lottie"
              loop
              autoplay
            />
          </div>
        </section>
      </section>
    </>
  );
}
