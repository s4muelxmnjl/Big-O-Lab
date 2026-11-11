import { challenges } from "./challenges";
export const STORAGE_KEY = "big-o-lab.progress.v1";
export type Progress = { version: 1; solved: string[] };
export const emptyProgress = (): Progress => ({ version: 1, solved: [] });
export function parseProgress(raw: string | null): Progress {
  try {
    const p = JSON.parse(raw ?? "null");
    if (p?.version !== 1 || !Array.isArray(p.solved)) return emptyProgress();
    return {
      version: 1,
      solved: [
        ...new Set<string>(
          p.solved.filter(
            (id: unknown): id is string =>
              typeof id === "string" && challenges.some((q) => q.id === id),
          ),
        ),
      ],
    };
  } catch {
    return emptyProgress();
  }
}
export const isCorrect = (id: string, answer: number) =>
  challenges.some((q) => q.id === id && q.answer === answer);
export function award(p: Progress, id: string, answer: number): Progress {
  const q = challenges.find((q) => q.id === id);
  if (
    !q ||
    !isCorrect(id, answer) ||
    p.solved.includes(id) ||
    !isUnlocked(p, q.level)
  )
    return p;
  return { ...p, solved: [...p.solved, id] };
}
export const levelComplete = (p: Progress, level: number) =>
  challenges
    .filter((q) => q.level === level)
    .every((q) => p.solved.includes(q.id));
export const isUnlocked = (p: Progress, level: number): boolean =>
  level === 1 || (isUnlocked(p, level - 1) && levelComplete(p, level - 1));
export const xp = (p: Progress) => p.solved.length * 100;
export function gridSize(n: number) {
  return Number.isFinite(n) ? Math.max(1, Math.min(20, Math.round(n))) : 1;
}
export const square = (n: number) => n * n;
export const pairs = (n: number) => (n * (n - 1)) / 2;
export const advance = (completed: number, n: number) =>
  Math.min(completed + 1, square(gridSize(n)));
export const coordinates = (completed: number, n: number) =>
  completed === 0
    ? null
    : { i: Math.floor((completed - 1) / n), j: (completed - 1) % n };
