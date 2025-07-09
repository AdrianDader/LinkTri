import { useContext, useState } from "react";
import { useFetchingData } from "../../../hooks/useFetchingData";
import AuthContext from "../../../context/AuthContext";
import { ButtonPrimary, ButtonSecondary } from "../../shared/button";
import "./../../../pages/private/DashboardPageOverlay.css";

interface DeleteEnlaceProps {
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

export default function DeleteEnlace({
  onCancel,
  onSuccess,
  repoId,
  enlaceId,
  initialData,
}: DeleteEnlaceProps) {
  const { accessToken } = useContext<any>(AuthContext);
  const { loading, error, fetchData } = useFetchingData();
  const RefreshPage = () => window.location.reload();

  const handleDelete = async () => {
    await fetchData({
      url: `http://localhost:8000/api/repository/${repoId}/enlaces/${enlaceId}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    onSuccess();
    RefreshPage();
  };

  return (
    <section className="create-repo__section">
      <div className="create-repo__wrapper">
        <form  onSubmit={(e) => e.preventDefault()}>
          <h2 style={{ margin: 0 }}>Eliminar Enlace</h2>

          <div style={{ marginTop: "1rem" }}>
            <p><strong>Nombre:</strong> {initialData.name}</p>
            <p><strong>URL:</strong> {initialData.url}</p>
            <p><strong>Visibilidad:</strong> {initialData.visibility}</p>
            <p><strong>Compartido:</strong> {initialData.shared ? "Sí" : "No"}</p>
            <div style={{display: 'flex', flexDirection:'column', gap: '1rem', marginTop:'1rem'}}>
            <ButtonPrimary onClick={handleDelete}>
              {loading ? "Eliminando..." : "Eliminar Enlace"}
            </ButtonPrimary>
            <ButtonSecondary onClick={onCancel}>Cancelar</ButtonSecondary></div>
          </div>

          {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
        </form>
      </div>
    </section>
  );
}
