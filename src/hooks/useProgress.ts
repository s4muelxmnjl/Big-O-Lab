import { useEffect, useState } from "react";
import {
  award,
  emptyProgress,
  parseProgress,
  STORAGE_KEY,
} from "../domain/model";
export function useProgress() {
  const [progress, setProgress] = useState(() => {
    try {
      return parseProgress(localStorage.getItem(STORAGE_KEY));
    } catch {
      return emptyProgress();
    }
  });
  const [storageError, setStorageError] = useState(false);
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
      setStorageError(false);
    } catch {
      setStorageError(true);
    }
  }, [progress]);
  return {
    progress,
    storageError,
    solve: (id: string, answer: number) =>
      setProgress((p) => award(p, id, answer)),
    reset: () => setProgress(emptyProgress()),
  };
}
