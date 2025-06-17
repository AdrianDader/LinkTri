import React, { useState } from "react";
import { useFetchingData } from "../../hooks/useFetchingData";

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

  const { data, loading, error, fetchData } = useFetchingData(
    "http://localhost:8000/api/register"
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors(null);

    await fetchData(form);

    if (error) {
      setErrors("No se han podido registrar los datos");
      return;
    }

    setIsSubmited(true);
    setRegisteredName(form.name);
    setForm({
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    });
  };

  return (
    <div className="form__wrapper">
      <h2 className="form__title">Nuevo registro de usuario</h2>
      <form onSubmit={handleSubmit}>
        <div className="label__wrapper">
          <label htmlFor="name">
            Nombre:
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="label__wrapper">
          <label htmlFor="email">
            Email:
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="label__wrapper">
          <label htmlFor="password">
            Password:
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="label__wrapper">
          <label htmlFor="password_confirmation">
            Confirm password:
            <input
              type="password"
              id="password_confirmation"
              name="password_confirmation"
              value={form.password_confirmation}
              onChange={handleChange}
            />
          </label>
        </div>
        <button type="submit">Registrarse</button>

        {loading && <p>Registrando usuario...</p>}
        {errors && <p className="error">{errors}</p>}
      </form>

      {isSubmited && (
        <div className="isSubmited__wrapper">
          <h2 className="isSubmited__title">Hola {registeredName}</h2>
          <p className="isSubmited__desc">Has sido registrado</p>
        </div>
      )}
    </div>
  );
}
