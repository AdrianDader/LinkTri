// hooks/useFetchingData.ts
import { useState } from "react";
import axios from "axios";

export const useFetchingData = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const fetchData = async ({
    url,
    method = "POST",
    payload = null,
    headers = {},
  }: {
    url: string;
    method?: string;
    payload?: any;
    headers?: any;
  }) => {
    setLoading(true);
    try {
      const response = await axios({
        url,
        method,
        data: payload,
        headers,
      });
      setData(response.data);
      return response.data;
    } catch (err) {
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
};
