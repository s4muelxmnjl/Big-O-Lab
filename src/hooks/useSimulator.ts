import { useEffect, useState } from "react";
import { advance, gridSize, square } from "../domain/model";
export function useSimulator() {
  const [n, setN] = useState(3);
  const [completed, setCompleted] = useState(0);
  const [speed, setSpeed] = useState(500);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    if (!playing || completed >= square(n)) return;
    const timer = window.setTimeout(
      () => setCompleted((c) => advance(c, n)),
      speed,
    );
    return () => clearTimeout(timer);
  }, [playing, completed, n, speed]);
  useEffect(() => {
    if (completed === square(n)) setPlaying(false);
  }, [completed, n]);
  return {
    n,
    speed,
    setSpeed,
    seek: (value: number) => {
      setPlaying(false);
      setCompleted(Math.max(0, Math.min(square(n), Math.round(value))));
    },
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
