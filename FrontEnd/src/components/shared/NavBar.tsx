import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div className="navbar__wrapper">
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/register">Registro</Link> |{" "}
        <Link to="/dashboard">Dashboad</Link>
      </nav>
    </div>
  );
}
