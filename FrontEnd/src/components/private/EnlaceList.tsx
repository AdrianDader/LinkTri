import { useEffect, useContext, useState } from "react";
import { useFetchingDataGetRepository } from "../../hooks/useFetchingGetRepository";
import AuthContext from "../../context/AuthContext";
import "./../../components/private/EnlaceList.css";

interface Props {
  category: string | null;
}

export default function EnlaceListByCategory({ category }: Props) {
  const { accessToken } = useContext<any>(AuthContext);
  const { data, loading, error, fetchData } = useFetchingDataGetRepository(
    "http://localhost:8000/api/repository-content",
    accessToken
  );

  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    if (accessToken) fetchData();
  }, [accessToken]);

  if (loading) return <p>Cargando enlaces...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data || !data.repositories[category])
    return <p>No hay repositorio seleccionado.</p>;

  const enlaces = data.repositories[category].enlaces;

  const toggleAccordion = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
        rel="stylesheet"
      />
      <div>
        {enlaces.map((enlace) => (
          <div key={enlace.id} onClick={() => toggleAccordion(enlace.id)}>
            <div
              className="enlace-list__item"
              style={{
                padding: "0.5rem",
                borderBottom: "1px solid #ddd",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p>{enlace.name}</p>
              <div
                className="icons__wrapper"
                style={{ cursor: "pointer", display: "flex", gap: "0.5rem" }}
              >
                <span className="material-symbols-outlined">
                  <a>qr_code</a>
                </span>
                <span className="material-symbols-outlined">
                  <a>content_copy</a>
                </span>
                <span
                  className="material-symbols-outlined"
                  style={{
                    transform:
                      expandedId === enlace.id
                        ? "rotate(90deg)"
                        : "rotate(0deg)",
                    transition: "transform 0.2s ease",
                  }}
                >
                  <a>chevron_forward</a>
                </span>
              </div>
            </div>
            {expandedId === enlace.id && (
              <div
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: "#00000015",
                  borderBottom: "1px solid #ddd",
                }}
              >
                <p>
                  <strong>URL:</strong>{" "}
                  <a
                    href={enlace.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {enlace.url}
                  </a>
                </p>
                <p>
                  <strong>Fecha de creación: </strong>
                  {new Date(enlace.created_at).toLocaleString("es-ES", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <p>
                  <strong>Enlace público: </strong>
                  {enlace.public_link}
                </p>
                <p>
                  <strong>Enlace privado: </strong>
                  {enlace.private_link}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
