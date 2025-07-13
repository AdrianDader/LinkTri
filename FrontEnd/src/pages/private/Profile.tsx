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
          <h1 className="profile__title">Nombre usuario</h1>
          <p className="profile__desc">Email@email.com</p>
          <p className="profile__desc"><span style={{fontWeight:'600'}}>Total de repositorios:</span> 50</p>
          <p className="profile__desc"><span style={{fontWeight:'600'}}>Total de enlaces:</span> 100</p>
        </div>
      </section>
    </>
  );
}
