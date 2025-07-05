import { useContext, useEffect, useState } from "react";
import "./../private/DashboardPage.css";
import AuthContext from "./../../context/AuthContext";
import Accordion from "../../components/private/Accordion";
import { ButtonPrimary } from "../../components/shared/button";
import RepositoryList, {
  RepositoriesResponse,
} from "../../components/private/RepositoryList";

export default function DashboardPage() {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("DashboardPage debe estar dentro de un AuthProvider");
  }

  const { userLogged } = auth;

  const [repository, setRepository] = useState<RepositoriesResponse>({
    repositories: {},
  });

  const [selectedLinkName, setSelectedLinkName] = useState<string | null>(null);
  const [selectedRepoName, setSelectedRepoName] = useState<string | null>(null);
  const [selectedRepoDesc, setSelectedRepoDesc] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[] | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const prensaRepo = repository.repositories["Prensa"];

      if (prensaRepo && prensaRepo.enlaces && prensaRepo.enlaces.length > 0) {
        console.log("Primer enlace:", prensaRepo.enlaces[0].name);
        console.log("ID:", prensaRepo.enlaces[0].id);
        console.log(repository.repositories["Música"].repository.description);
        console.log(repository.repositories["Música"].repository.tags);
      } else {
        console.log("No se encontraron enlaces en 'Prensa'.");
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [repository]);

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <section className="dashboard__section">
        <div className="dashboard-sidebar-left__wrapper">
          {/* //todo hacer esta logica cuando haya datos_ */}
          {/* //todo Si no existen repos = aparece esta frase */}
          {/* <p>No existen repositorios...</p> */}

          <div className="dashboard-aside__box">
            {/* //todo scroll bar */}
            <h2>Repositorios</h2>
            {/* //todo aplicar useMemo al repo */}
            <RepositoryList
              repository={repository}
              setRepository={setRepository}
              setSelectedLinkName={setSelectedLinkName}
              setSelectedRepoName={setSelectedRepoName}
              setSelectedRepoDesc={setSelectedRepoDesc}
              setSelectedTags={setSelectedTags}
              openIndex={openIndex}
              setOpenIndex={setOpenIndex}
            />
          </div>
          {/* //todo añadir metodo del button -> Post('http://localhost:8000/api/repository') */}
          <ButtonPrimary children={"Crear repositorio"} />
        </div>
        <div className="dashboard-center__wrapper">
          <h2>
            {selectedLinkName
              ? selectedRepoName + " / " + selectedLinkName
              : "Selecciona un repositorio"}
          </h2>

          <div className="dashboard-sidebar-left__box"></div>
        </div>
        <div className="dashboard-sidebar-right__wrapper">
          <div className="dashboard-aside__box">
            <h2>{selectedRepoName}</h2>
            <p>{selectedRepoDesc}</p>
            <ul className="tags__list" style={{ padding: 0 }}>
              {selectedTags?.map((tag, index) => (
                <li
                  key={index}
                  style={{
                    color: "var(--text-white)",
                    display: "inline-block",
                    padding: ".2rem 1rem",
                    borderRadius: "2rem",
                    margin: " 0 .5rem .5rem 0",
                    listStyle: "none",
                    backgroundColor: "var(--text-green)",
                  }}
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
          <div className="dashboard-sidebar-left__box-buttons">
            <ButtonPrimary children={"Editar"} />
            <ButtonPrimary children={"Eliminar"} />
          </div>
        </div>
      </section>
    </>
  );
}
