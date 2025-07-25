import { Link } from "react-router-dom";
// dependency social icons
import { SocialIcon } from "react-social-icons";
import socialUrls from "./FooterSocialIcons";

export default function Footer() {
  const data = new Date();
  const year = data.getFullYear();
  function SocialIcons() {
    const allUrls = socialUrls.map((url: string, index: number) => (
      <div className={"footer__icons"} key={index} >
        <SocialIcon
          
          bgColor="none"
          fgColor="currentColor"
          url={url}
        />
      </div>
    ));

    return <div style={{ display: "flex", flexWrap: 'wrap', gap: "0.4rem" }}>{allUrls}</div>;
  }

  return (
    <section className="footer__section">
      <div className="footer__wrapper max-width">
        <div className="footer__box">
          <h2 className="footer__title">LinkTri</h2>
          <p className="footer__desc">
            Una plataforma para gestionar y compartir múltiples enlaces de forma organizada, con categorías, visibilidad personalizada y funciones colaborativas.
          </p>
          <p className="footer__desc">
            Proyecto full-stack inspirado en Linktree, desarrollado con React (frontend) y Laravel (backend), que permite a los usuarios gestionar enlaces, personalizar sus perfiles y compartir contenido fácilmente.
          </p>
        </div>
        <div className="footer__box">
          <ul className="footer-icons__list">
            {SocialIcons()}
            <li>
              <a href="https://www.ebiseducation.com/" target="_blank" rel="noopener noreferrer">Ebis Education {year}</a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
