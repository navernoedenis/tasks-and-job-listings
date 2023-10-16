import { useState, useEffect, useCallback } from 'react';

interface UseFetchProps<T> {
  fetcher: () => Promise<T>;
  initialValue: T;
  autoFetch?: boolean;
}

export function useFetch<T>(props: UseFetchProps<T>) {
  const { fetcher, initialValue, autoFetch = true } = props;

  const [isRunning, setRunning] = useState(autoFetch);
  const [data, setData] = useState<T>(() => initialValue);
  const [isLoading, setLoading] = useState(true);
  const [isFetching, setFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isRunning) return;
    setFetching(true);

    fetcher()
      .then(setData)
      .catch(setError)
      .finally(() => {
        setFetching(false);
        setLoading(false);
      });
  }, [fetcher, isRunning]);

  const runFetcher = useCallback(() => {
    setRunning(true);
  }, []);

  return {
    data,
    error,
    isFetching,
    isLoading,
    runFetcher,
  };
}
