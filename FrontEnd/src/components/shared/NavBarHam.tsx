// components/NavBarHam.jsx

import { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

export default function NavBarHam() {
  const { userLogged, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setMenuOpen(false);
  };

  const getNavLinkClass = (to) => {
    const url = new URL(to, window.location.origin);
    const toPath = url.pathname;
    const toHash = url.hash;

    if (toHash) {
      return location.hash === toHash ? "active" : "";
    } else {
      return location.pathname === toPath ? "active" : "";
    }
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar-ham">
      <div className="navbar-ham__wrapper">
        <NavLink to="/#home" className="navbar__logo" onClick={closeMenu}>
          LinkTri
        </NavLink>

        <button className="hamburger-button" onClick={toggleMenu}>
          ☰
        </button>

        {menuOpen && (
          <nav className="hamburger-menu">
            <NavLink to="/#whatis" className={() => getNavLinkClass("/#whatis")} onClick={closeMenu}>
              ¿Qué es?
            </NavLink>
            <NavLink to="/#howitworks" className={() => getNavLinkClass("/#howitworks")} onClick={closeMenu}>
              ¿Cómo funciona?
            </NavLink>
            <NavLink to="/#aboutme" className={() => getNavLinkClass("/#aboutme")} onClick={closeMenu}>
              About me
            </NavLink>

            {userLogged.id ? (
              <>
                <NavLink to="/dashboard" onClick={closeMenu}>
                  Dashboard
                </NavLink>
                <NavLink to="/profile" onClick={closeMenu}>
                  Hola {userLogged.name}!
                </NavLink>
                <a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }}>
                  Cerrar sesión
                </a>
              </>
            ) : (
              <>
                <NavLink to="/register" onClick={closeMenu}>
                  Crear cuenta
                </NavLink>
                <NavLink to="/login" onClick={closeMenu}>
                  Iniciar sesión
                </NavLink>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
