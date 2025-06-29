import { createContext, Dispatch, SetStateAction } from "react";
import { TypeUserLogged } from "./AuthProvider";

type AuthContextType = {
  userLogged: TypeUserLogged;
  setUserLogged: (user: TypeUserLogged) => void;
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  user: string | null;
  setUser: (user: string | null) => void;
};

const AuthContext = createContext<AuthContextType>({
  userLogged: {
    id: null,
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  },
  setUserLogged: () => {},
  accessToken: null,
  setAccessToken: () => {},
  user: null,
  setUser: () => {},
});

export default AuthContext;
