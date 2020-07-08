import { useState, useEffect, useCallback } from 'react';

const useFetch = (url: string, options: RequestInit | undefined) => {
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setError(null);
    setIsFetching(true);

    try {
      const res = await fetch(url, options);
      const json = await res.json();

      setData(json);
    } catch (err) {
      setError(err);
    }

    setIsFetching(false);
  }, [options, url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { isFetching, data, error };
};

export default useFetch;
