import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <div className="navbar__wrapper max-width">
      <nav className="navbar__list">
        <NavLink to="/" className="navbar__logo">LinkTri</NavLink>
        <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active" : "")}>Dashboard</NavLink>
        <NavLink to="/#howitworks">¿Cómo funciona?</NavLink>
        <NavLink to="/#aboutme">About me</NavLink>
        <NavLink to="/#faq">FAQ</NavLink>
        <NavLink to="/#what-is">¿Qué es?</NavLink>
      </nav>
      <nav className="navbar__list">
        <NavLink to="/register">Registro</NavLink>
      </nav>
    </div>
  );
}
