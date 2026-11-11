import { describe, it, expect } from "vitest";
import { diagramFor, markedCount } from "./diagrams";
import { challenges } from "./challenges";
describe("cuadrículas de los ejemplos", () => {
  it("cada ejemplo tiene ilustraciones pequeñas y coherentes con sus dimensiones", () => {
    for (const q of challenges) {
      const diagram = diagramFor(q.id);
      expect(diagram.panels.length).toBeGreaterThan(0);
      for (const panel of diagram.panels) {
        expect(panel.rows).toBeGreaterThan(0);
        expect(panel.columns).toBeGreaterThan(0);
        expect(panel.rows * panel.columns).toBeLessThanOrEqual(36);
        if (panel.values)
          expect(panel.values).toHaveLength(panel.rows * panel.columns);
      }
    }
  });
  it("muestra el crecimiento cuadrático, rectángulos y tareas consecutivas con cuentas correctas", () => {
    expect(diagramFor("sim").panels.map(markedCount)).toEqual([4, 16]);
    expect(diagramFor("predict-20").panels.map(markedCount)).toEqual([6]);
    expect(diagramFor("predict-50").panels.map(markedCount)).toEqual([9, 3, 3]);
    expect(diagramFor("adjacent").panels.map(markedCount)).toEqual([3, 3]);
    expect(diagramFor("half-inner").panels.map(markedCount)).toEqual([2, 8]);
  });
  it("cuenta solo las parejas visitadas y una lectura directa", () => {
    expect(diagramFor("triangle").panels.map(markedCount)).toEqual([6]);
    expect(diagramFor("final-early").panels.map(markedCount)).toEqual([1, 3]);
    expect(diagramFor("index").panels.map(markedCount)).toEqual([1]);
  });
});
