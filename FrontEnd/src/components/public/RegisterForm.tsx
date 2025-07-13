import React, { useState, useContext } from "react";
import { useFetchingDataRegister } from "../../hooks/useFetchingData-copy";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { ButtonPrimary } from "../shared/button";
import AuthContext from "../../context/AuthContext"; // 👈 Importa el contexto
import "./../../pages/public/RegisterPage/RegisterPage.css";
import { useNavigate } from "react-router-dom";

type RegisterUser = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export default function RegisterForm() {
  const [form, setForm] = useState<RegisterUser>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [isSubmited, setIsSubmited] = useState(false);
  const [registeredName, setRegisteredName] = useState<string>("");
  const [errors, setErrors] = useState<string | null>(null);

  const { data, loading, error, fetchData } = useFetchingDataRegister(
    "http://localhost:8000/api/register"
  );

  const auth = useContext(AuthContext); // 👈 Usa el contexto
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

      if (value === "") {
        setErrors(null);
      } else if (!emailRegex.test(value)) {
        setErrors("Por favor, ingresa un email válido.");
      } else {
        setErrors(null);
      }
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (name === "password") {
      if (value.length == 0) {
        setErrors(null);
      } else if (!passwordRegex.test(value)) {
        setErrors(
          "La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas y un número."
        );
      } else {
        setErrors(null);
      }
    }

    if (name === "password_confirmation") {
      if (value.length === 0) {
        setErrors(null);
      } else if (value !== form.password) {
        setErrors("Las contraseñas no son iguales");
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

    // ✅ Esperamos directamente la respuesta de la API
    const response = await fetchData(form);

    // ⛔️ Si hubo error o la respuesta vino vacía
    if (!response || !response.user) {
      setErrors("No se han podido registrar los datos");
      return;
    }

    // ✅ Guardamos usuario y token directamente
    setUserLogged(response.user);
    localStorage.setItem("userLogged", JSON.stringify(response.user));
    setAccessToken(response.access_token);
    localStorage.setItem("accessToken", response.access_token);

    // ✅ Confirmación visual
    setIsSubmited(true);
    setRegisteredName(response.user.name);

    // ✅ Limpiamos el formulario
    setForm({
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    });

    // ✅ Redirección inmediata tras éxito
    console.log(response.user);
    navigate("/dashboard");
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
            <h2 className="register-form__title">Nuevo registro de usuario</h2>
            <form onSubmit={handleSubmit} className="register-form">
              <div className="form-label__wrapper">
                <label htmlFor="name">Nombre:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  maxLength={35}
                />
              </div>
              <div className="form-label__wrapper">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  minLength={6}
                  maxLength={100}
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
                  maxLength={20}
                  style={
                    errors
                      ? { border: "solid, 2px , #d4390f", color: "#d4390f" }
                      : {}
                  }
                />
              </div>
              <div className="form-label__wrapper">
                <label htmlFor="password_confirmation">Confirm password:</label>
                <input
                  type="password"
                  id="password_confirmation"
                  name="password_confirmation"
                  value={form.password_confirmation}
                  onChange={handleChange}
                  maxLength={20}
                  style={
                    errors
                      ? { border: "solid, 2px , #d4390f", color: "#d4390f" }
                      : {}
                  }
                />
              </div>
              <ButtonPrimary style={{marginTop: '.5rem'}} disabled={errors ? true : false}>
                Registrarse
              </ButtonPrimary>

              {loading && <p>Registrando usuario...</p>}
              {errors && <p className="error">{errors}</p>}
            </form>

            {isSubmited && (
              <div className="isSubmited__wrapper">
                <h2 className="isSubmited__title">Hola {registeredName}</h2>
                <p className="isSubmited__desc">Has sido registrado</p>

                {/* ✅ Muestra los datos de la respuesta */}
                <p style={{ fontSize: "0.85rem", color: "#555" }}>
                  <strong>Debug respuesta:</strong> {JSON.stringify(userLogged)}
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
