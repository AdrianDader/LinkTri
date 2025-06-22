import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div className="navbar__wrapper">
      <nav className="navbar__list">
        <Link to="/" className="navbar__logo">LinkTri</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/#whatis">¿Qué es?</Link>
        <Link to="/#howitworks">¿Cómo funciona?</Link>
        <Link to="/#aboutme">About me</Link>
        <Link to="/#faq">FAQ</Link>
        
      </nav>
      <nav className="navbar__list">
        <Link to="/register">Registro</Link>
      </nav>
    </div>
  );
}
