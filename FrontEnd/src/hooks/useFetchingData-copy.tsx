import { useState } from "react";
import axios, { AxiosError } from "axios";

export function useFetchingDataRegister(url: string) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
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
      return response.data; // Devuelve la respuesta para que puedas usarla
    } catch (err) {
      const axiosError = err as AxiosError;
      setError(axiosError.response?.data?.message || axiosError.message || "Error inesperado");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
}
