import { useState, useContext } from "react";
import { useFetchingData } from "../../hooks/useFetchingData";
import AuthContext from "../../context/AuthContext";
import { TAG_OPTIONS } from "./tags";
import "./../../pages/private/DashboardPageOverlay.css";
import { ButtonPrimary, ButtonSecondary } from "../shared/button";
interface CreateRepoProps {
  onCancel: () => void;
}

//función formulario para crear repositorios
export default function CreateRepo({ onCancel }: CreateRepoProps) {
  // declarar variables desde AuthContext y formData. inicializarlo vacio.
  const { accessToken } = useContext<any>(AuthContext);
  const auth = useContext(AuthContext);
  const { showLoader, hideLoader } = auth;
  
  const { loading, error, fetchData } = useFetchingData();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    visibility: "private",
    shared: false,
  });

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagSearch, setTagSearch] = useState("");

  //metodo para recargar la pagina
  const RefreshPage = () => {
    window.location.reload();
  };

  // metodo para validaciones y para manejar los datos del formulario
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // metodo que añade tags al array
  const handleTagCheckbox = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // metodo para enviar el formulario que:
  // añade los datos a payload -> cuerpo de la petición
  // hace la peticion post
  // setea el formulario a vacio
  // setea las tags
  // setea el buscador de tags
  //recarga la pagina
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      tags: selectedTags,
    };

    await fetchData({
      url: "http://localhost:8000/api/repository",
      payload,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    setFormData({
      name: "",
      description: "",
      visibility: "private",
      shared: false,
    });
    setSelectedTags([]);
    setTagSearch("");

    showLoader();
    await new Promise((r) => setTimeout(r, 3000));
    RefreshPage();
    hideLoader();
  };

  const filteredTags = TAG_OPTIONS.filter((tag) =>
    tag.toLowerCase().includes(tagSearch.toLowerCase())
  );

  return (
    <>
      <section className="create-repo__section">
        <div className="create-repo__wrapper">
          <form className="create-repo__form" onSubmit={handleSubmit}>
            <h2 style={{ margin: 0 }}>Crear Nuevo Repositorio</h2>

            <input
              type="text"
              name="name"
              placeholder="Nombre del repositorio"
              value={formData.name}
              onChange={handleChange}
              maxLength={20}
              required
            />

            <textarea
              name="description"
              placeholder="Descripción"
              value={formData.description}
              onChange={handleChange}
              required
              maxLength={200}
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

            <div>
              <p>
                <strong>Selecciona etiquetas:</strong>
              </p>
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
                    <label
                      key={tag}
                      style={{ display: "block", marginBottom: "0.25rem" }}
                    >
                      <input
                        type="checkbox"
                        value={tag}
                        checked={selectedTags.includes(tag)}
                        onChange={() => handleTagCheckbox(tag)}
                      />{" "}
                      {tag}
                    </label>
                  ))
                ) : (
                  <p style={{ fontStyle: "italic" }}>
                    No se encontraron tags...
                  </p>
                )}
              </div>
            </div>

            <ButtonPrimary onClick="submit">
              {loading ? "Creando..." : "Crear Repositorio"}
            </ButtonPrimary>
            <ButtonSecondary onClick={onCancel}>Cancelar</ButtonSecondary>

            {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
          </form>
        </div>
      </section>
    </>
  );
}
