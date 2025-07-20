import { useEffect, useState } from "react";
import axios from "axios";

const ApiRequest = ({ url, method = "GET", data = null, headers = {}, onSuccess, onError }) => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios({
          url,
          method: method.toUpperCase(),
          data,
          headers,
        });
        setResponse(res.data);
        setError(null);
        if (onSuccess) onSuccess(res.data);
      } catch (err) {
        setError(err);
        if (onError) onError(err);
      } finally {
        setLoading(false);
      }
    };

    if (url) fetchData();
  }, [url, method, data, headers]);

  return (
    <div>
      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
      {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
    </div>
  );
};

export default ApiRequest;
