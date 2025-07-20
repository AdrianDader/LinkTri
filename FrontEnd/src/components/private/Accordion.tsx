import { useState } from "react";
import "./Accordion.css";

const Accordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const items = [
    { title: "Sección 1", content: "Contenido de la sección 1." },
    { title: "Sección 2", content: "Contenido de la sección 2." },
    { title: "Sección 3", content: "Contenido de la sección 3." },
    // ... tus otros items
  ];

  return (
    <div>
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={index}>
            <div
              className="accordion-header"
              onClick={() => toggleAccordion(index)}
            >
              {item.title}
              <span className="accordion-icon">{isOpen ? "▼" : "▶"}</span>
            </div>
            {isOpen && <div className="accordion-desc">{item.content}</div>}
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
