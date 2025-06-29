import { ReactNode, useEffect, useState } from "react";
import AuthContext from "./AuthContext";

interface AuthProviderProps {
  children: ReactNode;
}

export type TypeUserRegister = {
  id?: number | null;
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export type TypeUserLogged = {
  id: number | null;
  name: string;
  email: string;
};

export function AuthProvider({ children }: AuthProviderProps) {
  //* Guarda los datos del usuario logueado
  const [userLogged, setUserLogged] = useState<TypeUserLogged | null>({
    id: null,
    name: "",
    email: "",
  });

  //* Guarda el token de acceso y se almacena en localStorage
  const [accessToken, setAccessToken] = useState(() =>
    localStorage.getItem("access_token")
  );

   useEffect(() => {
    // Al cargar, lee lo que haya en localStorage
    const token = localStorage.getItem('accessToken');
    const user = localStorage.getItem('userLogged');

    if (token) setAccessToken(token);
    if (user) setUserLogged(JSON.parse(user));
  }, []);


  const logout = () => {
  setUserLogged({
    id: null,
    name: "",
    email: "",
  });
  setAccessToken(null);
  localStorage.removeItem('accessToken');
  localStorage.removeItem('userLogged');
};


  return (
    <AuthContext.Provider
      value={{
        userLogged,
        setUserLogged,
        accessToken,
        setAccessToken,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
