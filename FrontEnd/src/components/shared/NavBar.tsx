//navLink detecta por defecto que el link está activo
import { NavLink as Link } from "react-router-dom";
//todo Revisar esto, es lo que hay que aplicar en register / login
import { useAuth } from "../../context/useAuth";

export default function NavBar() {
  const { userLogged } = useAuth();


  return (
    <>
      <div className="navbar__wrapper max-width">
        <nav className="navbar__list">
          <Link to="/" className="navbar__logo">
            LinkTri
          </Link>
          {userLogged.id && <Link to="/dashboard"> Dashboard </Link>}

          <Link to="/#howitworks">¿Cómo funciona?</Link>
          <Link to="/#aboutme">About me</Link>
          <Link to="/#faq">FAQ</Link>
          <Link to="/#what-is">¿Qué es?</Link>
        </nav>
        <nav className="navbar__list">
          {userLogged.id ? (
            <>
              <Link to="/profile">Hola {userLogged.name}!</Link>
              <Link to="/">Cerrar sesión</Link>
            </>
          ) : (
            <>
              <Link to="/register">Crear cuenta</Link>
              <Link to="/login">Iniciar sesión</Link>
            </>
          )}
        </nav>
      </div>
      {/* <UserProfile /> */}
    </>
  );
}
