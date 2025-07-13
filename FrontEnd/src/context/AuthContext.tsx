import { createContext } from "react";
import { TypeUserLogged } from "./AuthProvider";

type AuthContextType = {
  userLogged: TypeUserLogged;
  setUserLogged: React.Dispatch<React.SetStateAction<TypeUserLogged>>;
  accessToken: string | null;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  logout: () => void;
   isLoading: boolean | null;
  showLoader: () => void;
  hideLoader: () => void;


};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;
