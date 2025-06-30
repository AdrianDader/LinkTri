import { useContext } from "react";
import "./../private/DashboardPage.css";
import AuthContext from "./../../context/AuthContext";
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
