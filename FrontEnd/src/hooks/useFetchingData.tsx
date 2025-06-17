// hooks/useFetchingData.ts
import { useState } from "react";
import axios from "axios";

export function useFetchingData(url: string) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const fetchData = async (body: Record<string, any>) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(url, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setData(response.data);
    } catch (err: any) {
      setError(err.message || "Error inesperado");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
}
