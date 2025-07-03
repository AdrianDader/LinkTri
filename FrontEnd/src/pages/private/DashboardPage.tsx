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


  useEffect(() => {
  const timeout = setTimeout(() => {
    const prensaRepo = repository.repositories["Prensa"];

    if (prensaRepo && prensaRepo.enlaces && prensaRepo.enlaces.length > 0) {
      console.log("Primer enlace:", prensaRepo.enlaces[0].name);
      console.log("ID:", prensaRepo.enlaces[0].id);
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
              openIndex={openIndex}
              setOpenIndex={setOpenIndex}
            />
          </div>
          {/* //todo añadir metodo del button -> Post('http://localhost:8000/api/repository') */}
          <ButtonPrimary children={"Crear repositorio"} />
        </div>
        <div className="dashboard-center__wrapper">
            <h2>{selectedLinkName  ? selectedRepoName + " / " + selectedLinkName : "Selecciona un repositorio"}</h2>

          <div className="dashboard-sidebar-left__box"></div>
        </div>
        <div className="dashboard-sidebar-right__wrapper">
          <div className="dashboard-aside__box">
            <h2></h2>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere
              qui ratione odio culpa nisi soluta, veritatis officiis vitae odit
              cupiditate beatae quasi itaque quos sit quidem rerum
              exercitationem ex est!
            </p>
          </div>
          <div className="dashboard-sidebar-left__box-buttons">
            <ButtonPrimary children={"Editar"} />
            <ButtonPrimary children={"Eliminar"} />
          </div>
        </div>
      </section>

      {/* <div>
        <h2>Datos del usuario logueado:</h2>
        <p>
          <strong>ID:</strong> {userLogged.id ?? "No disponible"}
        </p>
        <p>
          <strong>Nombre:</strong> {userLogged.name || "No disponible"}
        </p>
        <p>
          <strong>Email:</strong> {userLogged.email || "No disponible"}
        </p>
      </div> */}
    </>
  );
}
