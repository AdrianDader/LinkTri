import { useEffect, useState, useContext } from "react";
import { useFetchingDataGetRepository } from "../../hooks/useFetchingGetRepository";
import AuthContext from "../../context/AuthContext"; // 👈 usamos el contexto, no el Provider
import "./Accordion.css";

interface RepositoryListProps {
  repository: RepositoriesResponse;
  setRepository: React.Dispatch<React.SetStateAction<RepositoriesResponse>>;
  setSelectedLinkName: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedRepoName: React.Dispatch<React.SetStateAction<string | null>>;
  openIndex: number | null;
  setOpenIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

export type RepositoriesResponse = {
  repositories: {
    [category: string]: RepositoryItem[];
  };
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
      {Object.entries(repository.repositories).map(
        ([category, data], index) => {
          const isOpen = openIndex === index;
          const { repository: repoData, enlaces } = data;

          return (
            <div key={category}>
              <div
                onClick={() => setOpenIndex(isOpen ? null : index)}
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
                  {/* <p>
              <strong>Descripción:</strong> {repoData.description}
            </p>
            <p>
              <strong>Visibilidad:</strong> {repoData.visibility}
            </p>
            <p>
              <strong>Etiquetas:</strong> {repoData.tags?.join(", ")}
            </p> */}
                  <ol style={{ marginTop: 10 }}>
                    {enlaces.map((enlace) => (
                      <li key={enlace.id}>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setSelectedLinkName(enlace.name); // ✅ seleccionamos
                            setSelectedRepoName(category); // ✅ seleccionamos
                          }}
                        >
                          {enlace.name}
                        </a>{" "}
                        - {enlace.visibility}
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          );
        }
      )}
    </div>
  );
}
