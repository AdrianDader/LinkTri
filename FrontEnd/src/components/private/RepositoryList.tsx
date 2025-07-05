import { useEffect, useState, useContext } from "react";
import { useFetchingDataGetRepository } from "../../hooks/useFetchingGetRepository";
import AuthContext from "../../context/AuthContext"; // 👈 usamos el contexto, no el Provider
import "./Accordion.css";

interface RepositoryListProps {
  repository: RepositoriesResponse;
  setRepository: React.Dispatch<React.SetStateAction<RepositoriesResponse>>;
  setSelectedLinkName: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedRepoName: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedRepoDesc: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedTags: React.Dispatch<React.SetStateAction<string[] | null>>;
  openIndex: number | null;
  setOpenIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

export type RepositoriesResponse = {
  repositories: {
    [category: string]: CategoryRepository;
  };
};

export type CategoryRepository = {
  repository: RepositoryMetadata;
  enlaces: RepositoryItem[];
};

export type RepositoryMetadata = {
  id: number;
  user_id: number;
  name: string;
  description: string;
  visibility: "public" | "private";
  shared: boolean;
  tags: string[];
  created_at: string;
  updated_at: string;
};

export type RepositoryItem = {
  id: number;
  repository_id: number;
  url: string;
  name: string;
  visibility: "public" | "private";
  shared: boolean;
  public_link: string;
  private_link: string;
  created_at: string;
  updated_at: string;
};

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
    <div>
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
                style={{ cursor: "pointer", userSelect: "none" }}
                className="accordion-header"
              >
                {category}

                <span className="accordion-icon" style={{ marginLeft: 8 }}>
                  {isOpen ? "▼" : "▶"}
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
                          )}
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setSelectedLinkName(enlace.name); // ✅ seleccionamos
                              setSelectedRepoName(category); // ✅ seleccionamos
                            }}
                          >
                            {" "}
                            {enlace.name}
                          </a>
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
