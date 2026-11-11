export type GridExample = {
  title: string;
  rows: number;
  columns: number;
  mode?: "triangle" | "index" | "first-pair";
  values?: number[];
  caption?: string;
};
export type ExampleDiagram = {
  panels: GridExample[];
  connector?: "+" | "→" | "frente a";
  conclusion: string;
};
export function isMarked(panel: GridExample, row: number, column: number) {
  if (panel.mode === "triangle") return column > row;
  if (panel.mode === "first-pair") return row === 0 && column === 1;
  if (panel.mode === "index") return column === 3;
  return true;
}
export function markedCount(panel: GridExample) {
  let count = 0;
  for (let row = 0; row < panel.rows; row++)
    for (let col = 0; col < panel.columns; col++)
      if (isMarked(panel, row, col)) count++;
  return count;
}
const square = (n: number, title: string): GridExample => ({
  title,
  rows: n,
  columns: n,
});
const growth: ExampleDiagram = {
  panels: [square(2, "Antes · n = 2"), square(4, "Después · n = 4")],
  connector: "→",
  conclusion:
    "El doble de filas y columnas: 4 → 16 celdas. El trabajo se multiplica por 4.",
};
const triangle: ExampleDiagram = {
  panels: [
    {
      title: "Parejas distintas · n = 4",
      rows: 4,
      columns: 4,
      mode: "triangle",
      caption: "3 + 2 + 1 = 6 comparaciones",
    },
  ],
  conclusion:
    "Cada casilla coloreada es una pareja. Las grises no se visitan: evitamos la diagonal y las parejas al revés.",
};
const diagrams: Record<string, ExampleDiagram> = {
  intro: {
    panels: [square(2, "Dos estudiantes, dos tarjetas")],
    conclusion:
      "2 filas × 2 columnas = 4 encuentros, incluidas las tarjetas propias.",
  },
  sim: growth,
  "predict-5": {
    panels: [square(2, "Cuenta una fila y repítela")],
    conclusion: "2 celdas en cada fila: 2 + 2 = 4.",
  },
  "predict-10": {
    panels: [square(1, "Antes · 1 × 1"), square(2, "Después · 2 × 2")],
    connector: "→",
    conclusion:
      "1 → 4 celdas: al duplicar los dos lados, el total se cuadruplica.",
  },
  "predict-20": {
    panels: [{ title: "Tres filas de dos celdas", rows: 3, columns: 2 }],
    conclusion:
      "2 + 2 + 2 = 6. Un recorrido también puede formar un rectángulo.",
  },
  "predict-50": {
    panels: [
      square(3, "Todos con todos"),
      { title: "Primer recorrido simple", rows: 1, columns: 3 },
      { title: "Segundo recorrido simple", rows: 1, columns: 3 },
    ],
    connector: "+",
    conclusion:
      "9 + 3 + 3 = 15 operaciones. Las tres tareas van una después de otra.",
  },
  "predict-100": {
    panels: [
      square(5, "A · n²"),
      { title: "B · tres recorridos de n", rows: 3, columns: 5 },
    ],
    connector: "frente a",
    conclusion:
      "Con n = 5: A cuenta 25 operaciones; B cuenta 15. En B, el número de recorridos siempre es 3.",
  },
  index: {
    panels: [
      {
        title: "Leer la posición con índice 3",
        rows: 1,
        columns: 5,
        mode: "index",
        values: [0, 1, 2, 3, 4],
        caption: "5 posiciones disponibles · solo 1 lectura",
      },
    ],
    conclusion:
      "Los números son índices. Solo se lee la casilla marcada; no se recorren las anteriores.",
  },
  single: {
    panels: [
      { title: "Antes · n = 3", rows: 1, columns: 3 },
      { title: "Después · n = 6", rows: 1, columns: 6 },
    ],
    connector: "→",
    conclusion:
      "Un recorrido: 3 → 6 visitas. El doble de datos produce el doble de trabajo.",
  },
  nested: {
    panels: [square(3, "Tres vueltas de tres operaciones")],
    conclusion: "Cada fila es una vuelta externa: 3 × 3 = 9 comparaciones.",
  },
  adjacent: {
    panels: [
      { title: "Primer ciclo", rows: 1, columns: 3 },
      { title: "Segundo ciclo", rows: 1, columns: 3 },
    ],
    connector: "+",
    conclusion:
      "3 + 3 = 6 visitas. Son dos recorridos consecutivos, no una cuadrícula de 3 × 3.",
  },
  triangle,
  "constant-inner": {
    panels: [
      { title: "Cuatro vueltas de tres operaciones", rows: 4, columns: 3 },
    ],
    conclusion:
      "4 × 3 = 12 operaciones. Al crecer n se añaden filas, pero las columnas siguen siendo 3.",
  },
  "half-inner": {
    panels: [
      { title: "n = 2 · una columna", rows: 2, columns: 1 },
      { title: "n = 4 · dos columnas", rows: 4, columns: 2 },
    ],
    connector: "→",
    conclusion:
      "2 → 8 comparaciones. El límite interno n/2 también aumenta al crecer n.",
  },
  "final-growth": growth,
  "final-pairs": triangle,
  "final-memory": {
    panels: [
      {
        title: "Entrada · [4, 8, 4]",
        rows: 1,
        columns: 3,
        values: [4, 8, 4],
        caption: "3 datos de entrada",
      },
      {
        title: "Lo que Set recuerda",
        rows: 1,
        columns: 2,
        values: [4, 8],
        caption: "2 valores distintos guardados",
      },
    ],
    connector: "→",
    conclusion:
      "El último 4 ya está en el conjunto. Estas casillas representan datos y memoria, no una cuenta de operaciones.",
  },
  "final-early": {
    panels: [
      {
        title: "[2, 2, 7] · repetido al principio",
        rows: 3,
        columns: 3,
        mode: "first-pair",
        caption: "1 comparación antes de terminar",
      },
      {
        title: "[2, 5, 7] · todos distintos",
        rows: 3,
        columns: 3,
        mode: "triangle",
        caption: "3 comparaciones para revisar todo",
      },
    ],
    connector: "frente a",
    conclusion:
      "Los dos arreglos tienen 3 números, pero la salida temprana evita visitar algunas parejas en el primero.",
  },
  "final-choice": {
    panels: [
      {
        title: "Solución A · cabe en el límite",
        rows: 2,
        columns: 5,
        caption: "10 operaciones ≤ 15 permitidas",
      },
      {
        title: "Solución B · supera el límite",
        rows: 4,
        columns: 5,
        caption: "20 operaciones > 15 permitidas",
      },
    ],
    connector: "frente a",
    conclusion:
      "Los bloques solo ilustran las cuentas de este ejemplo. Después de comparar el trabajo, también hay que comprobar la memoria.",
  },
};
export function diagramFor(id: string): ExampleDiagram {
  const diagram = diagrams[id];
  if (!diagram) throw new Error(`Missing example diagram: ${id}`);
  return diagram;
}
