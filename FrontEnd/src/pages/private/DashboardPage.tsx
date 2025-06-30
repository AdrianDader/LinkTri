import { useContext } from "react";
import "./../private/DashboardPage.css";
import AuthContext from "./../../context/AuthContext";
import Accordion from "../../components/private/Accordion";
import { ButtonPrimary } from "../../components/shared/button";
export default function DashboardPage() {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("DashboardPage debe estar dentro de un AuthProvider");
  }

  const { userLogged } = auth;
  console.log("desde dashboard:", userLogged.id);

  return (
    <>
      {/* <h1>Dashboard</h1> */}
      <section className="dashboard__section">
        <div className="dashboard-sidebar-left__wrapper">
          <h2>Repositorios</h2>

          {/* //todo hacer esta logica cuando haya datos */}
          {/* //todo Si no existen repos = aparece esta frase */}
          {/* <p>No existen repositorios...</p> */}

          <div className="dashboard-sidebar-left__box">
            <Accordion />
            <ButtonPrimary children={"Crear repositorio"} />
          </div>
        </div>
        <div className="dashboard-center__wrapper">
          <h2>Repositorio seleccionado</h2>
        </div>
        <div className="dashboard-sidebar-right__wrapper">
          <h2>Información</h2>
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
