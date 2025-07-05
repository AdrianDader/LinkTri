import { useEffect, useContext } from "react";
import { useFetchingDataGetRepository } from "../../hooks/useFetchingGetRepository";
import AuthContext from "../../context/AuthContext";

interface Props {
  category: string; // 👈 nombre del repositorio a mostrar (ej: "Música")
}

export default function EnlaceListByCategory({ category }: Props) {
  const { accessToken } = useContext<any>(AuthContext);

  const { data, loading, error, fetchData } = useFetchingDataGetRepository(
    "http://localhost:8000/api/repository-content",
    accessToken
  );

  useEffect(() => {
    if (accessToken) fetchData();
  }, [accessToken]);

  if (loading) return <p>Cargando enlaces...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data || !data.repositories[category]) return <p>No se encontró el repositorio.</p>;

  const enlaces = data.repositories[category].enlaces;

  return (
    <div>
      {enlaces.map((enlace) => (
        <div key={enlace.id} style={{ padding: "0.5rem", borderBottom: "1px solid #ddd" }}>
          {enlace.name}
        </div>
      ))}
    </div>
  );
}
