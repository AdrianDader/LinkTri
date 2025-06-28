import { createContext, Dispatch, SetStateAction } from "react";

interface AuthContextType {
  user: string | null;
  setUser: Dispatch<SetStateAction<string | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;
