"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";

const useQueryParams = (param: string) => {
  const router = useRouter();
  const [queryParam, setQueryParam] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlSearchParams = new URLSearchParams(window.location.search);
      setQueryParam(urlSearchParams.get(param) || undefined);
    }
  }, [param]);

  const updateQueryParam = useCallback(
    (value: string) => {
      if (typeof window !== "undefined") {
        const urlSearchParams = new URLSearchParams(window.location.search);
        urlSearchParams.set(param, value);
        const newUrl = `${window.location.pathname}?${urlSearchParams.toString()}`;
        router.push(newUrl);
      }
    },
    [param, router],
  );

  return [queryParam, updateQueryParam] as const;
};

export default useQueryParams;
