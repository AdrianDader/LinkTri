import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

export default function NavBar() {
  const { userLogged, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Función para calcular la clase activa en base a path y hash
  const getNavLinkClass = (to) => {
    // Extraemos hash y pathname del `to` y location
    const url = new URL(to, window.location.origin);
    const toPath = url.pathname;
    const toHash = url.hash;

    // Compara pathname y hash con location actual
    if (toHash) {
      // Si el link tiene hash, comparo hash actual
      return location.hash === toHash ? "active" : "";
    } else {
      // Si no tiene hash, comparo pathname
      return location.pathname === toPath ? "active" : "";
    }
  };

  const changeClassNavBar = location.pathname.startsWith('/dashboard');


  return (
    <>
    <section id="home" className={!changeClassNavBar ? "navbar__section" : "navbar-dashboard__section"}>
      <div className="navbar__wrapper max-width">
        <nav className="navbar__list">
          <NavLink
            to="/#home"
            end
            className={({ isActive }) =>
              isActive ? "active navbar__logo" : "navbar__logo"
            }
          >
            LinkTri
          </NavLink>
          {userLogged.id && (
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Dashboard
            </NavLink>
          )}
          <NavLink to="/#whatis" className={() => getNavLinkClass("/#whatis")}>
            ¿Qué es?
          </NavLink>
          <NavLink
            to="/#howitworks"
            className={() => getNavLinkClass("/#howitworks")}
          >
            ¿Cómo funciona?
          </NavLink>
          <NavLink
            to="/#aboutme"
            className={() => getNavLinkClass("/#aboutme")}
          >
            About me
          </NavLink>
        </nav>
        <nav className="navbar__list">
          {userLogged.id ? (
            <>
              <NavLink
                to="/profile"
                end
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Hola {userLogged.name}!
              </NavLink>
              <a href="#" onClick={handleLogout}>
                Cerrar sesión
              </a>
            </>
          ) : (
            <>
              <NavLink
                to="/register"
                end
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Crear cuenta
              </NavLink>
              <NavLink
                to="/login"
                end
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Iniciar sesión
              </NavLink>
            </>
          )}
        </nav>
      </div>
      </section>
    </>
  );
}
