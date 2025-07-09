import { useEffect, useContext, useState } from "react";
import { useFetchingDataGetRepository } from "../../hooks/useFetchingGetRepository";
import AuthContext from "../../context/AuthContext";
import "./../../components/private/EnlaceList.css";
import ClipboardCopyButton from "../shared/ClipboardCopyButton";

interface Props {
  category: string | null;
  // createEnlace: boolean | null;
  onCreateEnlace: () => void;
  onEditEnlace: (enlace: {
    id: number;
    url: string;
    name: string;
    visibility: string;
    shared: boolean;
  }) => void;
  onDeleteEnlace: (enlace: {
    id: number;
    url: string;
    name: string;
    visibility: string;
    shared: boolean;
  }) => void;
}

export default function EnlaceListByCategory({
  category,
  onCreateEnlace,
  onEditEnlace,
  onDeleteEnlace,
}: Props) {
  const { accessToken } = useContext<any>(AuthContext);
  const { data, loading, error, fetchData } = useFetchingDataGetRepository(
    "http://localhost:8000/api/repository-content",
    accessToken
  );

  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);

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
      <div
        className="custom-scroll"
        style={{
          maxHeight: "44rem",
          overflowY: "auto",
        }}
      >
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
                {copiedId === enlace.id && (
                  <p
                    style={{
                      backgroundColor: "var(--text-green)",
                      color: "var(--text-white)",
                      padding: "0 1rem",
                      borderRadius: "2rem",
                    }}
                  >
                    Copiado
                  </p>
                )}

                <span
                  className="material-symbols-outlined"
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                >
                  <a>
                    <ClipboardCopyButton
                      text={enlace.url}
                      onCopied={() => {
                        setCopiedId(enlace.id);
                        setTimeout(() => setCopiedId(null), 2000);
                      }}
                    />
                  </a>
                </span>
                {/* //todo añadir botones de edit and delete */}
                <span
                  className="material-symbols-outlined"
                  onClick={(event) => {
                    event.stopPropagation();
                    onEditEnlace({
                      id: enlace.id,
                      url: enlace.url,
                      name: enlace.name,
                      visibility: enlace.visibility,
                      shared: enlace.shared,
                    });
                  }}
                >
                  <a>edit</a>
                </span>
                <span
                  className="material-symbols-outlined"
                  onClick={(event) => {
                    event.stopPropagation();
                    onDeleteEnlace({
                      id: enlace.id,
                      url: enlace.url,
                      name: enlace.name,
                      visibility: enlace.visibility,
                      shared: enlace.shared,
                    });
                  }}
                >
                  <a>delete</a>
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
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p>
                    <strong>Enlace público: </strong>
                    {enlace.public_link}
                  </p>
                  <div style={{ display: "flex", gap: ".5rem" }}>
                    <span className="material-symbols-outlined">
                      <a href={enlace.public_link} target="_blank">
                        qr_code
                      </a>
                    </span>
                  </div>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p>
                    <strong>Enlace privado: </strong>
                    {"•".repeat(enlace.private_link.length)}
                  </p>
                  <div style={{ display: "flex", gap: ".5rem" }}>
                    <span className="material-symbols-outlined">
                      <a href={enlace.private_link} target="_blank">
                        qr_code
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
        <div
          className="enlace-list__item"
          style={{
            padding: "1rem 0.5rem",
            borderBottom: "1px solid #ddd",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <a
            style={{ display: "flex", gap: ".2rem" }}
            onClick={(event) => {
              event.stopPropagation();
              onCreateEnlace();
            }}
          >
            <span className="material-symbols-outlined">add_circle</span>
            Crear enlace
          </a>
        </div>
      </div>
    </>
  );
}
