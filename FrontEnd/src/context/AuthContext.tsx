import { createContext } from "react";
import { TypeUserLogged } from "./AuthProvider";

type AuthContextType = {
  userLogged: TypeUserLogged;
  setUserLogged: React.Dispatch<React.SetStateAction<TypeUserLogged>>;
  accessToken: string | null;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  // Eliminamos user y setUser que no existen ya en el provider
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;
