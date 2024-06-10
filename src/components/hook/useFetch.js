import { useEffect, useState } from "react";

export function useFetch(initialValue, fnFetch, param) {
  const [data, setData] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchingData = async () => {
      const json = await fnFetch({ ...param });
      setData(json);
      setIsLoading(false);
    };
    fetchingData();
  }, [fnFetch, param]);

  return { data, isLoading, setData };
}
