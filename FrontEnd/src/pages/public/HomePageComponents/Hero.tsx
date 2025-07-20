import { useNavigate } from "react-router-dom";
import {
  ButtonPrimary,
  ButtonSecondary,
} from "./../../../components/shared/button";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
export default function Hero() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };
  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <>
      <section className="hero__background" id="home">
        <section className="hero__section max-width">
          <div className="hero__wrapper">
            <h1>
              <span style={{ color: "#66A21B", fontSize: "3rem" }}>Link</span>
              <span style={{ color: "#363636", fontSize: "3rem" }}>Tri</span>
            </h1>
            <p>
              <span style={{fontWeight:'800' , color: 'var(--text-green)'}}>
                Organiza, comparte y colabora con tu propio hub de enlaces
                personalizado.{" "}  
              </span>
              Crea tu perfil, agrupa todos tus enlaces bajo categorías, controla
              quién ve qué y trabaja en conjunto con tu equipo. Un sistema
              potente, flexible y moderno, desarrollado con React y Laravel.
            </p>
            <div className="hero-buttons__wrapper">
              <ButtonPrimary onClick={handleLogin}>Login</ButtonPrimary>
              <ButtonSecondary onClick={handleRegister}>
                Crear cuenta
              </ButtonSecondary>
            </div>
          </div>
          <div className="hero__wrapper hero-vector">
            <DotLottieReact
              src="https://lottie.host/e8a91934-3750-40d0-9ec9-3c9b027d0e6d/h9ILFIhCip.lottie"
              loop
              autoplay
              style={{ width: "400px", height: "400px" }}
            />
          </div>
          <div className="prueba"></div>
        </section>
      </section>
    </>
  );
}
