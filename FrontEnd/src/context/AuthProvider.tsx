import { ReactNode, useState } from "react";
import AuthContext from "./AuthContext";

interface AuthProviderProps {
  children: ReactNode;
}

export type TypeUserLogged = {
  id: null | number;
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export function AuthProvider({ children }: AuthProviderProps) {
  //*Guarda si el usuario existe, por lo tanto está logueado
  const [user, setUser] = useState<string | null>(null);

  //*Guarda los datos del usuario logueado
  const [userLogged, setUserLogged] = useState<TypeUserLogged>({
    id: null,
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  //*Guarda el token de acceso y se almacena en localStorage
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
        user,
        setUser,
      }}
    >
      {/* Esta prop children es toda la App */}
      {children}
    </AuthContext.Provider>
  );
}
