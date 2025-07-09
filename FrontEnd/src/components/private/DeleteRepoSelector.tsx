import { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useFetchingData } from "../../hooks/useFetchingData";
import { ButtonPrimary, ButtonSecondary } from "../shared/button";

interface Repo {
  id: number;
  name: string;
  description: string;
  visibility: string;
  shared: boolean;
  tags: string[];
}

interface DeleteRepoSelectorProps {
  onCancel: () => void;
}

export default function DeleteRepoSelector({
  onCancel,
}: DeleteRepoSelectorProps) {
  const { accessToken } = useContext<any>(AuthContext);
  const { loading, error, fetchData } = useFetchingData();

  const [repos, setRepos] = useState<Repo[]>([]);
  const [selectedRepoId, setSelectedRepoId] = useState<number | null>(null);
  const [selectedRepo, setSelectedRepo] = useState<Repo | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      const data = await fetchData({
        url: "http://localhost:8000/api/repository/",
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (Array.isArray(data)) {
        setRepos(data);
      }
    };

    fetchRepos();
  }, []);

  useEffect(() => {
    if (selectedRepoId !== null) {
      const repo = repos.find((r) => r.id === selectedRepoId);
      if (repo) {
        setSelectedRepo(repo);
      }
    } else {
      setSelectedRepo(null);
    }
  }, [selectedRepoId]);

  const handleDelete = async () => {
    if (!selectedRepoId) return;

    await fetchData({
      url: `http://localhost:8000/api/repository/${selectedRepoId}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    setSelectedRepoId(null);
    setSelectedRepo(null);
    window.location.reload(); // o podrías hacer onCancel()
  };

  return (
    <section className="create-repo__section">
      <div className="create-repo__wrapper">
        <form
          className="create-repo__form"
          onSubmit={(e) => e.preventDefault()}
        >
          <h2 style={{ margin: 0 }}>Eliminar Repositorio</h2>

          <label>
            Selecciona un repositorio:
            <select
              value={selectedRepoId ?? ""}
              onChange={(e) => setSelectedRepoId(Number(e.target.value))}
              required
            >
              <option value="" disabled>
                -- Selecciona --
              </option>
              {repos.map((repo) => (
                <option key={repo.id} value={repo.id}>
                  {repo.name}
                </option>
              ))}
            </select>
          </label>

          {selectedRepo && (
            <div style={{ marginTop: "1rem" }}>
              <p>
                <strong>Nombre:</strong> {selectedRepo.name}
              </p>
              <p
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 8,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                <strong>Descripción:</strong> {selectedRepo.description}
              </p>

              <p>
                <strong>Visibilidad:</strong> {selectedRepo.visibility}
              </p>
              <p>
                <strong>Compartido:</strong> {selectedRepo.shared ? "Sí" : "No"}
              </p>
              <p>
                <strong>Tags:</strong>{" "}
                {selectedRepo.tags.join(", ") || "Ninguna"}
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  marginTop: "1rem",
                }}
              >
                <ButtonPrimary onClick={handleDelete}>
                  {loading ? "Eliminando..." : "Eliminar Repositorio"}
                </ButtonPrimary>
                <ButtonSecondary onClick={onCancel}>Cancelar</ButtonSecondary>
              </div>
            </div>
          )}

          {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
        </form>
      </div>
    </section>
  );
}
