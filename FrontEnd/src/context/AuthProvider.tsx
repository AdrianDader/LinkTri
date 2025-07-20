import { ReactNode, useEffect, useState, useCallback } from "react";
import AuthContext from "./AuthContext";
import Loader from "../components/shared/loader";

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
  const [userLogged, setUserLogged] = useState<TypeUserLogged | null>({
    id: null,
    name: "",
    email: "",
  });

  const [accessToken, setAccessToken] = useState(() =>
    localStorage.getItem("access_token")
  );

  const [isLoading, setIsLoading] = useState(false);

  const showLoader = useCallback(() => setIsLoading(true), []);
  const hideLoader = useCallback(() => setIsLoading(false), []);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const user = localStorage.getItem("userLogged");

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
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userLogged");
  };

  return (
    <AuthContext.Provider
      value={{
        userLogged,
        setUserLogged,
        accessToken,
        setAccessToken,
        logout,
        isLoading,
        showLoader,
        hideLoader,
      }}
    >
      {isLoading && ( < Loader />
      )}

      {children}
    </AuthContext.Provider>
  );
}
