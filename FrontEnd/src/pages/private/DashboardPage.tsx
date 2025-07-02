import { useContext } from "react";
import "./../private/DashboardPage.css";
import AuthContext from "./../../context/AuthContext";
import Accordion from "../../components/private/Accordion";
import { ButtonPrimary } from "../../components/shared/button";
import RepositoryList from "../../components/private/RepositoryList";
export default function DashboardPage() {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("DashboardPage debe estar dentro de un AuthProvider");
  }

  const { userLogged } = auth;
  console.log("desde dashboard:", userLogged.id);

  return (
    <>
      <section className="dashboard__section">
        <div className="dashboard-sidebar-left__wrapper">
          {/* //todo hacer esta logica cuando haya datos */}
          {/* //todo Si no existen repos = aparece esta frase */}
          {/* <p>No existen repositorios...</p> */}

          <div className="dashboard-aside__box">
            {/* //todo scroll bar */}
            <h2>Repositorios</h2>
            {/* //todo aplicar useMemo al repo */}
            < RepositoryList />
          </div>
          {/* //todo añadir metodo del button -> Post('http://localhost:8000/api/repository') */}
          <ButtonPrimary children={"Crear repositorio"} />
        </div>
        <div className="dashboard-center__wrapper">
          <h2>Repository.name</h2>
          <div className="dashboard-sidebar-left__box">
            
          </div>
        </div>
        <div className="dashboard-sidebar-right__wrapper">
          <div className="dashboard-aside__box">
            <h2>Repository.name</h2>
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
