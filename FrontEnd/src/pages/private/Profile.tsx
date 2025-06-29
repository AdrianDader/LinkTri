import { useAuth } from "./../../context/useAuth";

export default function UserProfile() {
  //* Aqui estamos usando UseContext dentro de useAuth
  //* Estamos conectandonos con el useState que nos da AuthProvider.tsx
  const { userLogged, setUserLogged } = useAuth();

  return (
    <div>
      <h1>Perfil</h1>
      <p>{userLogged.id ? (<><p>ID de Usuario: {userLogged.id} </p><p>{userLogged.name} - {userLogged.password}</p></>):( "No logueado")}</p>
      <button
        onClick={() =>
          setUserLogged({
            id: 1,
            name: "Juan Pérez",
            email: "juan@example.com",
            password: "agadfgdag",
            password_confirmation: "agadfgdag",
          })
        }
      >
        Loguear
      </button>
     <button
  onClick={() =>
    setUserLogged({
      id: null,
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    })
  }
>
  Logout
</button>
    </div>
  );
}
