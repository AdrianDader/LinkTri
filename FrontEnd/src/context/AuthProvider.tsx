import { ReactNode, useState } from "react";
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
  const [userLogged, setUserLogged] = useState<TypeUserLogged>({
    id: null,
    name: "",
    email: "",
  });

  //* Guarda el token de acceso y se almacena en localStorage
  const [accessToken, setAccessToken] = useState(() =>
    localStorage.getItem("access_token")
  );

  return (
    <AuthContext.Provider
      value={{
        userLogged,
        setUserLogged,
        accessToken,
        setAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
