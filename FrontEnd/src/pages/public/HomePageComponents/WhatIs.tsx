import "./../HomePage.css";
import data from "./../HomePageContent/WhatIsContent.json";

export default function WhatIs() {
  return (
    <section className="what-is__section ">
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
