import { useEffect, useState, useContext } from "react";
import { useFetchingDataGetRepository } from "../../hooks/useFetchingGetRepository";
import AuthContext from "../../context/AuthContext"; // 👈 usamos el contexto, no el Provider
import "./Accordion.css";
import { RepositoryListProps } from "./typesList";

export default function RepositoryList({
  repository,
  setRepository,
  setSelectedLinkName,
  setSelectedRepoName,
  openIndex,
  setOpenIndex,
  setSelectedRepoDesc,
  setSelectedTags,
}: RepositoryListProps) {
  const { accessToken } = useContext<any>(AuthContext); // ✅ correctamente accedido

  // const [repository, setRepository] = useState<RepositoriesResponse>({
  //   repositories: {},
  // });

  const { data, loading, error, fetchData } = useFetchingDataGetRepository(
    "http://localhost:8000/api/repository-content",
    accessToken
  );

  useEffect(() => {
    if (!accessToken) return;

    fetchData().then((res) => {
      if (res) setRepository(res);
      console.log(res);
    });
  }, [accessToken]);

  if (loading) return <p>Cargando repositorios...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{
      maxHeight: "38.875rem",
      overflowY: "auto" }}
      className="custom-scroll">
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
        rel="stylesheet"
      />

      {Object.entries(repository.repositories).map(
        ([category, data], index) => {
          const isOpen = openIndex === index;
          const { repository: repoData, enlaces } = data;

          return (
            <div key={category}>
              <div
                onClick={() => {
                  setOpenIndex(isOpen ? null : index); // ya existente
                  setSelectedRepoDesc(repoData.description); // movido desde <a>
                  setSelectedTags(repoData.tags);
                  setSelectedRepoName(category);
                }}
                style={{
                  cursor: "pointer",
                  userSelect: "none",
                }}
                className="accordion-header"
              >
                {category}

                <span
                  className="material-symbols-outlined"
                  style={{
                    display: "inline-block",
                    transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                    transition: "transform 0.2s ease",
                  }}
                >
                  chevron_forward
                </span>
              </div>
              {isOpen && (
                <div className="accordion-desc" style={{ paddingLeft: 20 }}>
                  <ul style={{ listStyle: "none", paddingLeft: "1rem" }}>
                    {enlaces.map((enlace) => (
                      <li key={enlace.id} style={{ marginBottom: ".5rem" }}>
                        <div style={{ display: "flex", gap: ".5rem" }}>
                          {enlace.visibility === "private" ? (
                            <span className="material-symbols-outlined ">
                              lock
                            </span>
                          ) : (
                            <span className="material-symbols-outlined">
                              visibility
                            </span>
                          )}{" "}
                          {enlace.name}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        }
      )}
    </div>
  );
}
