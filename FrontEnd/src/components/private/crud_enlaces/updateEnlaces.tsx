import { useState, useContext, useEffect } from "react";
import { useFetchingData } from "../../../hooks/useFetchingData";
import AuthContext from "../../../context/AuthContext";
import { ButtonPrimary, ButtonSecondary } from "../../shared/button";
import "./../../../pages/private/DashboardPageOverlay.css";

interface UpdateEnlaceProps {
  onCancel: () => void;
  onSuccess: () => void;
  repoId: number;
  enlaceId: number;
  initialData: {
    url: string;
    name: string;
    visibility: string;
    shared: boolean;
  };
}

export default function UpdateEnlace({
  onCancel,
  onSuccess,
  repoId,
  enlaceId,
  initialData,
}: UpdateEnlaceProps) {
  const { accessToken } = useContext<any>(AuthContext);
  const { loading, error, fetchData } = useFetchingData();

  const [formData, setFormData] = useState(initialData);

  const RefreshPage = () => window.location.reload();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = { ...formData };

    await fetchData({
      url: `http://localhost:8000/api/repository/${repoId}/enlaces/${enlaceId}`,
      method: "PUT",
      payload,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    RefreshPage();
  };

  return (
    <section className="create-repo__section">
      <div className="create-repo__wrapper">
        <form className="create-repo__form" onSubmit={handleSubmit}>
          <h2 style={{ margin: 0 }}>Editar Enlace</h2>
          <input
            type="text"
            name="name"
            placeholder="Nombre del enlace"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="url"
            placeholder="URL del enlace"
            value={formData.url}
            onChange={handleChange}
            required
          />

          <select
            name="visibility"
            value={formData.visibility}
            onChange={handleChange}
          >
            <option value="private">Privado</option>
            <option value="public">Público</option>
          </select>

          <label>
            <input
              type="checkbox"
              name="shared"
              checked={formData.shared}
              onChange={handleChange}
            />
            Compartido
          </label>

          <ButtonPrimary onClick="submit">
            {loading ? "Actualizando..." : "Actualizar Enlace"}
          </ButtonPrimary>
          <ButtonSecondary onClick={onCancel}>Cancelar</ButtonSecondary>

          {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
        </form>
      </div>
    </section>
  );
}
