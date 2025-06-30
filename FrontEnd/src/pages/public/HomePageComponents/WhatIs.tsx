import { useLocation } from "react-router-dom";
import "./../HomePage.css";
import data from "./../HomePageContent/WhatIsContent.json";
import { useEffect } from "react";

export default function WhatIs() {
  const location = useLocation();
  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const id = hash.replace("#", "");

      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      // Espera un poco para asegurar que el DOM está renderizado
    }
  }, [location]);

  return (
    <section id="whatis" className="what-is__section">
      <div className="what-is__wrapper max-width">
        {data.map((element) => (
          <div key={element.id} className="what-is__box">
            <h3 className="what-is__title">{element.name}</h3>
            <p className="what-is__desc">{element.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
