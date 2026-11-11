export type TraceStep = {
  indices: number[];
  kind: "compare" | "has" | "add";
  text: string;
  seen: number[];
};
export type Trace = { steps: TraceStep[]; duplicate: boolean };
export function parseNumbers(raw: string): number[] | null {
  const parts = raw.split(",").map((s) => s.trim());
  if (
    parts.length < 2 ||
    parts.length > 12 ||
    parts.some((s) => !/^-?\d+$/.test(s))
  )
    return null;
  const values = parts.map(Number);
  return values.every((n) => Number.isSafeInteger(n) && Math.abs(n) <= 999)
    ? values
    : null;
}
export function tracePairs(values: number[]): Trace {
  const steps: TraceStep[] = [];
  for (let i = 0; i < values.length; i++)
    for (let j = i + 1; j < values.length; j++) {
      const match = values[i] === values[j];
      steps.push({
        indices: [i, j],
        kind: "compare",
        seen: [],
        text: `Compara posiciones ${i} y ${j}: ${values[i]} ${match ? "=" : "≠"} ${values[j]}.${match ? " ¡Repetido! El algoritmo termina." : ""}`,
      });
      if (match) return { steps, duplicate: true };
    }
  return { steps, duplicate: false };
}
export function traceSet(values: number[]): Trace {
  const seen = new Set<number>();
  const steps: TraceStep[] = [];
  for (let i = 0; i < values.length; i++) {
    const match = seen.has(values[i]);
    steps.push({
      indices: [i],
      kind: "has",
      seen: [...seen],
      text: `Consulta ${values[i]} en vistos: ${match ? "ya estaba. ¡Repetido! El algoritmo termina." : "no estaba. El siguiente paso lo guardará."}`,
    });
    if (match) return { steps, duplicate: true };
    seen.add(values[i]);
    steps.push({
      indices: [i],
      kind: "add",
      seen: [...seen],
      text: `Guarda ${values[i]} en vistos. Ahora recuerda ${seen.size} valores.`,
    });
  }
  return { steps, duplicate: false };
}
