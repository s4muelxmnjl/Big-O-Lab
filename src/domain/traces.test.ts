import { describe, expect, it } from "vitest";
import { parseNumbers, tracePairs, traceSet } from "./traces";
import { pairs } from "./model";
describe("trazas reales de repetidos", () => {
  it("cuenta exactamente el peor caso de parejas y las llamadas de Set", () => {
    for (let n = 2; n <= 12; n++) {
      const values = Array.from({ length: n }, (_, i) => i);
      expect(tracePairs(values).steps).toHaveLength(pairs(n));
      expect(traceSet(values).steps).toHaveLength(2 * n);
      expect(tracePairs(values).duplicate).toBe(false);
      expect(traceSet(values).duplicate).toBe(false);
    }
  });
  it("se detiene al encontrar el primer repetido y conserva la memoria de Set", () => {
    expect(tracePairs([7, 7, 9, 4, 6]).steps).toHaveLength(1);
    expect(traceSet([7, 7, 9, 4, 6]).steps).toHaveLength(3);
    const a = tracePairs([1, 2, 3, 1]),
      b = traceSet([1, 2, 3, 1]);
    expect(a.duplicate).toBe(true);
    expect(b.duplicate).toBe(true);
    expect(a.steps).toHaveLength(3);
    expect(b.steps).toHaveLength(7);
    expect(a.steps.at(-1)?.indices).toEqual([0, 3]);
    expect(b.steps.at(-1)?.seen).toEqual([1, 2, 3]);
    expect(b.steps.filter((s) => s.kind === "add")).toHaveLength(3);
  });
  it("acepta enteros acotados y rechaza entradas vacías, ambiguas o excesivas", () => {
    expect(parseNumbers(" -2, 0, 999, -2 ")).toEqual([-2, 0, 999, -2]);
    for (const raw of [
      "",
      "1",
      "1,,2",
      "1,2,",
      "1.5,2",
      "a,2",
      "1000,1",
      "1e2,2",
      Array(13).fill("1").join(","),
    ])
      expect(parseNumbers(raw)).toBeNull();
  });
});
