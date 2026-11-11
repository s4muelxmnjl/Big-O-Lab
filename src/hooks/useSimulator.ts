import { useEffect, useState } from "react";
import { advance, gridSize, square } from "../domain/model";
export function useSimulator() {
  const [n, setN] = useState(5);
  const [completed, setCompleted] = useState(0);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    if (!playing || completed >= square(n)) return;
    const timer = window.setTimeout(
      () => setCompleted((c) => advance(c, n)),
      180,
    );
    return () => clearTimeout(timer);
  }, [playing, completed, n]);
  useEffect(() => {
    if (completed === square(n)) setPlaying(false);
  }, [completed, n]);
  return {
    n,
    completed,
    playing,
    total: square(n),
    changeN: (value: number) => {
      setPlaying(false);
      setCompleted(0);
      setN(gridSize(value));
    },
    play: () => {
      if (completed < square(n)) setPlaying(true);
    },
    pause: () => setPlaying(false),
    step: () => {
      setPlaying(false);
      setCompleted((c) => advance(c, n));
    },
    reset: () => {
      setPlaying(false);
      setCompleted(0);
    },
  };
}
