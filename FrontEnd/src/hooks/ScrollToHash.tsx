import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToHash() {
  const hash = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const elemento = document.getElementById(id);
      if (elemento) {
        elemento.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [hash]);

  return null;
}
