import React, { useState, useContext } from "react";
import { useFetchingData } from "../../hooks/useFetchingData";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { ButtonPrimary } from "../shared/button";
import AuthContext from "../../context/AuthContext";
import "./../../pages/public/RegisterPage/RegisterPage.css";
import { useNavigate } from "react-router-dom";

type LoginUser = {
  email: string;
  password: string;
};

type LoginFormProps = {
  url: string;
  method?: "POST" | "GET" | "PUT" | "DELETE";
  headers?: Record<string, string>;
};

export default function LoginForm({
  url,
  method = "POST",
  headers = {
    "Content-Type": "application/json",
  },
}: LoginFormProps) {
  const [form, setForm] = useState<LoginUser>({
    email: "",
    password: "",
  });

  const [isSubmited, setIsSubmited] = useState(false);
  const [registeredName, setRegisteredName] = useState<string>("");
  const [errors, setErrors] = useState<string | null>(null);

  const { loading, fetchData } = useFetchingData();

  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("RegisterForm debe estar dentro de un AuthProvider");
  }

  const { userLogged, setUserLogged, setAccessToken } = auth;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Validación simple
    if (name === "email") {
      // Regex email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setErrors("Por favor, ingresa un email válido.");
      } else {
        setErrors(null);
      }
    }

    if (name === "password") {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
      if (value.length == 0) {
        setErrors(null);
      } else if (!passwordRegex.test(value)) {
      setErrors("La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas y un número.");
      } else {
        setErrors(null);
      }
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors(null);

    try {
      // 1. Login: peticion para obtener token
      const loginResponse = await fetchData({
        url,
        method,
        payload: form,
        headers,
      });

      if (!loginResponse || !loginResponse.access_token) {
        setErrors("Datos incorrectos");
        return;
      }

      // Guardar token en contexto
      setAccessToken(loginResponse.access_token);
      localStorage.setItem("accessToken", loginResponse.access_token);

      // 2. Obtener datos usuario con token recibido
      const userResponse = await fetchData({
        url: "http://localhost:8000/api/user",
        method: "GET",
        headers: {
          Authorization: `Bearer ${loginResponse.access_token}`,
        },
      });

      if (!userResponse) {
        setErrors("No se pudieron obtener los datos del usuario");
        return;
      }

      // Guardar datos usuario en contexto
      setUserLogged(userResponse.user);
      localStorage.setItem("userLogged", JSON.stringify(userResponse.user));
      console.log(userLogged);
      console.log("UserResponse:", userResponse);
      console.log("UserResponse.name:", userResponse.user.name);
      console.log(loginResponse.access_token);

      setIsSubmited(true);
      setRegisteredName(userResponse.name);
      setForm({ email: "", password: "" });

      navigate("/dashboard");
    } catch (err: any) {
      if (err.status === 401) {
        setErrors("Credenciales incorrectas.");
      } else {
        setErrors("Ocurrió un error. Intenta nuevamente.");
      }
    }
  };

  return (
    <section className="hero__background">
      <section className="hero__section max-width">
        <div className="hero__wrapper">
          <h1>
            <span style={{ color: "#66A21B", fontSize: "3rem" }}>Link</span>
            <span style={{ color: "#363636", fontSize: "3rem" }}>Tri</span>
          </h1>
          <div className="register-form__wrapper">
            <h2 className="register-form__title">¡Bienvenido de nuevo!</h2>
            <form onSubmit={handleSubmit} className="register-form">
              <div className="form-label__wrapper">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  style={
                    errors
                      ? { border: "solid, 2px , #d4390f", color: "#d4390f" }
                      : {}
                  }
                />
              </div>
              <div className="form-label__wrapper">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  style={
                    errors
                      ? { border: "solid, 2px , #d4390f", color: "#d4390f" }
                      : {}
                  }
                />
              </div>
              <ButtonPrimary onClick="submit">Iniciar sesión</ButtonPrimary>
              {loading && <p>Iniciando sesión...</p>}
              {errors && <p className="error">{errors}</p>}
            </form>

            {isSubmited && (
              <div className="isSubmited__wrapper">
                <h2 className="isSubmited__title">Hola {registeredName}</h2>
                <p className="isSubmited__desc">Has iniciado sesión</p>
                <p style={{ fontSize: "0.85rem", color: "#555" }}>
                  <strong>Debug respuesta:</strong> {JSON.stringify(form.email)}
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="hero__wrapper hero-vector">
          <DotLottieReact
            src="https://lottie.host/e8a91934-3750-40d0-9ec9-3c9b027d0e6d/h9ILFIhCip.lottie"
            loop
            autoplay
          />
        </div>
      </section>
    </section>
  );
}
