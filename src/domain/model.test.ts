import { describe, it, expect } from "vitest";
import {
  advance,
  challengeUnlocked,
  award,
  coordinates,
  emptyProgress,
  gridSize,
  isCorrect,
  isUnlocked,
  levelComplete,
  pairs,
  parseProgress,
  square,
  xp,
} from "./model";
import { challenges } from "./challenges";
describe("modelo de operaciones", () => {
  it("cuenta n², parejas e índices en ambos extremos", () => {
    expect(square(1)).toBe(1);
    expect(square(20)).toBe(400);
    expect(pairs(10)).toBe(45);
    expect(coordinates(0, 5)).toBeNull();
    expect(coordinates(1, 5)).toEqual({ i: 0, j: 0 });
    expect(coordinates(25, 5)).toEqual({ i: 4, j: 4 });
    expect(gridSize(100)).toBe(20);
    expect(gridSize(NaN)).toBe(1);
  });
  it("avanza una operación y se detiene al completar", () => {
    expect(advance(0, 5)).toBe(1);
    expect(advance(24, 5)).toBe(25);
    expect(advance(25, 5)).toBe(25);
    expect(advance(1, 1)).toBe(1);
  });
});
describe("desafíos y progreso", () => {
  it("cada pregunta tiene una única opción correcta", () => {
    expect(new Set(challenges.map((q) => q.id)).size).toBe(challenges.length);
    for (const q of challenges) {
      expect(q.options).toHaveLength(3);
      expect(q.answer).toBeGreaterThanOrEqual(0);
      expect(q.answer).toBeLessThan(3);
      q.options.forEach((_, i) =>
        expect(isCorrect(q.id, i)).toBe(q.answer === i),
      );
    }
  });
  it("no premia errores, preguntas inexistentes ni niveles bloqueados", () => {
    const p = emptyProgress();
    expect(award(p, "intro", 0)).toBe(p);
    expect(award(p, "invalid", 0)).toBe(p);
    expect(award(p, "sim", 2)).toBe(p);
    expect(xp(p)).toBe(0);
  });
  it("premia una vez, conserva al recargar y desbloquea en orden", () => {
    let p = emptyProgress();
    expect(isUnlocked(p, 2)).toBe(false);
    p = award(p, "intro", 1);
    expect(xp(p)).toBe(100);
    expect(award(p, "intro", 1)).toBe(p);
    p = parseProgress(JSON.stringify(p));
    expect(xp(award(p, "intro", 1))).toBe(100);
    expect(isUnlocked(p, 2)).toBe(true);
    expect(isUnlocked(p, 3)).toBe(false);
    for (const q of challenges) p = award(p, q.id, q.answer);
    expect(xp(p)).toBe(challenges.length * 100);
    expect([1, 2, 3, 4, 5].every((l) => levelComplete(p, l))).toBe(true);
  });
  it("restaura valores seguros para datos corruptos, duplicados y versiones desconocidas", () => {
    for (const raw of ["oops", "{}", "null", '{"version":2,"solved":[]}'])
      expect(parseProgress(raw)).toEqual(emptyProgress());
    expect(
      parseProgress('{"version":1,"solved":["intro","intro","fake",7]}'),
    ).toEqual({ version: 1, solved: ["intro"] });
  });
});

describe("progresión guiada", () => {
  it("exige resolver los retos previos incluso dentro de un nivel desbloqueado", () => {
    let p = award(emptyProgress(), "intro", 1);
    p = award(p, "sim", 2);
    expect(challengeUnlocked(p, "predict-5")).toBe(true);
    expect(challengeUnlocked(p, "predict-10")).toBe(false);
    expect(challengeUnlocked(p, "predict-20")).toBe(false);
    expect(award(p, "predict-20", 2)).toBe(p);
    p = award(p, "predict-5", 1);
    expect(challengeUnlocked(p, "predict-10")).toBe(true);
    expect(challengeUnlocked(p, "predict-20")).toBe(false);
    p = award(p, "predict-10", 1);
    expect(challengeUnlocked(p, "predict-20")).toBe(true);
    expect(challengeUnlocked(p, "invalid")).toBe(false);
    expect(isUnlocked(p, 4)).toBe(false);
  });
});
