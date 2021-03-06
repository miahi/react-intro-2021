import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import debounceFactory from 'debounce';

export const useFetch = (
  url,
  {
    autoload = false,
    debounce = undefined,
  } = {},
) => {
  const [data, setData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(undefined);

  const update = useCallback(
    async () => {
      setIsLoading(true);
      setIsLoaded(false);
      setData(undefined);
      setError(undefined);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`${response.statusText} (${response.status})`);
        }
        setData(await response.json());
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
        setIsLoaded(true);
      }
    },
    [setData, setIsLoading, setIsLoaded, setError, url],
  );

  const debouncedUpdate = useMemo(
    () => (debounce
      ? debounceFactory(update, debounce)
      : update),
    [update],
  );

  const [hasAutoLoaded, setHasAutoLoaded] = useState(false);
  useEffect(
    () => {
      if (autoload) {
        setHasAutoLoaded(false);
      }
    },
    [autoload, setHasAutoLoaded, url],
  );
  useEffect(
    () => {
      if (autoload && !hasAutoLoaded) {
        setHasAutoLoaded(true);
        debouncedUpdate();
      }
    },
    [hasAutoLoaded, debouncedUpdate, setHasAutoLoaded, autoload],
  );

  return {
    update: debouncedUpdate,
    data,
    isLoading,
    isLoaded,
    error,
  };
};

export default useFetch;
