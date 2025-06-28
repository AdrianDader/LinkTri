
import { useAuth } from "./../../context/useAuth";

export default function UserProfile() {
  const { user, setUser } = useAuth();

  return (
 
    <div>
      <h1>Perfil</h1>
      <p>{user ? `Usuario: ${user}` : "No logueado"}</p>
      <button onClick={() => setUser("NuevoUsuario")}>Loguear</button>
      <button onClick={() => setUser(null)}>Logout</button>
    </div>

  );
}
