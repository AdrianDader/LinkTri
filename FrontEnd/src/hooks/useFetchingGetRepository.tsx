// hooks/useFetchingGetRepository.ts
import { useState } from "react";
import axios, { AxiosError } from "axios";

export function useFetchingDataGetRepository(url: string, token: string | null) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (!token) {
      setError("No hay token de autorización");
      return null;
    }

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData(response.data);
      return response.data;
    } catch (err) {
      const axiosError = err as AxiosError;
      setError(
        axiosError.response?.data?.message ||
        axiosError.message ||
        "Error inesperado"
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
}
