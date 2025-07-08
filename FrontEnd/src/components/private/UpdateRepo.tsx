import { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useFetchingData } from "../../hooks/useFetchingData";
import { TAG_OPTIONS } from "./tags";
import { ButtonPrimary, ButtonSecondary } from "../shared/button";

interface Repo {
  id: number;
  name: string;
  description: string;
  visibility: string;
  shared: boolean;
  tags: string[];
}

interface UpdateRepoSelectorProps {
  onCancel: () => void;
}

//componente que actualiza los repositorios
export default function UpdateRepoSelector({ onCancel }: UpdateRepoSelectorProps) {
  // declarar variables desde AuthContext, useState, fetching y seteo de formulario
  const { accessToken } = useContext<any>(AuthContext);
  const { loading, error, fetchData } = useFetchingData();

  const [repos, setRepos] = useState<Repo[]>([]);
  const [selectedRepoId, setSelectedRepoId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Omit<Repo, "id">>({
    name: "",
    description: "",
    visibility: "private",
    shared: false,
    tags: [],
  });
  const [tagSearch, setTagSearch] = useState("");

  // Cargar todos los repositorios
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

  // Cuando seleccionamos un repo, rellenamos los inputs
  useEffect(() => {
    if (selectedRepoId !== null) {
      const repo = repos.find((r) => r.id === selectedRepoId);
      if (repo) {
        setFormData({
          name: repo.name,
          description: repo.description,
          visibility: repo.visibility,
          shared: repo.shared,
          tags: repo.tags,
        });
      }
    }
  }, [selectedRepoId]);

  // metodo que captura el estado de los imput / textarea / select
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // metodo que añade las tags seleccionadas al array de tags
  const handleTagCheckbox = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const RefreshPage = () => {
    window.location.reload();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedRepoId === null) return;

    await fetchData({
      url: `http://localhost:8000/api/repository/${selectedRepoId}`,
      method: "PUT",
      payload: formData,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    // resetear todo
    setSelectedRepoId(null);
    setFormData({
      name: "",
      description: "",
      visibility: "private",
      shared: false,
      tags: [],
    });
    setTagSearch("");
    RefreshPage();
    
  };

  const filteredTags = TAG_OPTIONS.filter((tag) =>
    tag.toLowerCase().includes(tagSearch.toLowerCase())
  );

  return (
    <section className="create-repo__section">
      <div className="create-repo__wrapper">
        <form className="create-repo__form" onSubmit={handleSubmit}>
          <h2 style={{ margin: 0 }}>Editar Repositorio</h2>

          {/* SELECT REPO */}
          <label>
            Selecciona un repositorio:
            <select
              value={selectedRepoId ?? ""}
              onChange={(e) => setSelectedRepoId(Number(e.target.value))}
              required
            >
              <option value="" disabled>-- Selecciona --</option>
              {repos.map((repo) => (
                <option key={repo.id} value={repo.id}>
                  {repo.name}
                </option>
              ))}
            </select>
          </label>

          {selectedRepoId && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Nombre del repositorio"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <textarea
                name="description"
                placeholder="Descripción"
                value={formData.description}
                onChange={handleChange}
                required
                style={{ resize: "none", height: "100px" }}
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

              {/* TAGS */}
              <div>
                <p><strong>Selecciona etiquetas:</strong></p>
                <input
                  type="text"
                  placeholder="Buscar tags..."
                  value={tagSearch}
                  onChange={(e) => setTagSearch(e.target.value)}
                  style={{
                    width: "96%",
                    padding: "0.5rem",
                    marginBottom: "0.5rem",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                  }}
                />

                <div
                  style={{
                    maxHeight: "7rem",
                    overflowY: "auto",
                    border: "1px solid #ccc",
                    padding: "0.5rem",
                    borderRadius: "0.5rem",
                  }}
                >
                  {filteredTags.length > 0 ? (
                    filteredTags.map((tag) => (
                      <label key={tag} style={{ display: "block", marginBottom: "0.25rem" }}>
                        <input
                          type="checkbox"
                          value={tag}
                          checked={formData.tags.includes(tag)}
                          onChange={() => handleTagCheckbox(tag)}
                        />{" "}
                        {tag}
                      </label>
                    ))
                  ) : (
                    <p style={{ fontStyle: "italic" }}>No se encontraron tags...</p>
                  )}
                </div>
              </div>

              <ButtonPrimary onClick="submit">
                {loading ? "Actualizando..." : "Guardar Cambios"}
              </ButtonPrimary>
              <ButtonSecondary onClick={onCancel}>Cancelar</ButtonSecondary>
            </>
          )}

          {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
        </form>
      </div>
    </section>
  );
}
