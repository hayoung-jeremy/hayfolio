import { useEffect } from "react";
import { Cache } from "three";

export const useCleanupOnUnmount = () => {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") return;

    return () => {
      Cache.clear();
    };
  }, []);
};
