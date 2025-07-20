import { useAuth } from "./../../context/useAuth";
import "./../../pages/private/Profile.css"

import { randomImage } from "./ProfileContent/avatars";

export default function UserProfile() {

  //* Aqui estamos usando UseContext dentro de useAuth
  //* Estamos conectandonos con el useState que nos da AuthProvider.tsx
  const { userLogged, setUserLogged } = useAuth();

  return (
    <>
      <section className="profile__section">
        <div className="profile__wrapper">
          <img src={randomImage} alt="img-perfil" className="profile__img"/>
          <h2 className="profile__title">{userLogged.name}</h2>
          <p className="profile__desc">{userLogged.email}</p>
        </div>
      </section>
    </>
  );
}
