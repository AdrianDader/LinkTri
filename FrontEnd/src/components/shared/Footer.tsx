import { Link } from "react-router-dom";
// dependency social icons
import { SocialIcon } from "react-social-icons";
import socialUrls from "./FooterSocialIcons";

export default function Footer() {
  function SocialIcons() {
    const allUrls = socialUrls.map((url: string, index: number) => (
      <div className={"footer__icons"}>
        <SocialIcon
          key={index}
          bgColor="none"
          fgColor="currentColor"
          url={url}
        />
      </div>
    ));

    return <div style={{ display: "flex", gap: "10px" }}>{allUrls}</div>;
  }

  return (
    <section className="footer__section">
      <div className="footer__wrapper max-width">
        <div className="footer__box">
          <h2 className="footer__title">LinkTri</h2>
          <p className="footer__desc">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero
            iste laudantium ab voluptatem porro similique doloremque
            voluptatibus quasi reiciendis deserunt earum quos, omnis eos
            voluptas enim assumenda accusamus cumque suscipit.
          </p>
          <p className="footer__desc">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero
            iste laudantium ab voluptatem porro similique doloremque
            voluptatibus quasi reiciendis deserunt earum quos, omnis eos
            voluptas enim assumenda accusamus cumque suscipit.
          </p>
        </div>
        <div className="footer__box">
          <ul className="footer-icons__list">
            {SocialIcons()}
            <li>
              <Link to="/dashboard">Link 1</Link>
            </li>
            <li>
              <Link to="/dashboard">Link 2</Link>
            </li>
            <li>
              <Link to="/dashboard">Link 3</Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
