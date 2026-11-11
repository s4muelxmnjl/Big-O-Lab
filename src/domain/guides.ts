export type SolveGuide = { example: string; steps: [string, string, string] };
export const isStarterChallenge = (id: string) =>
  ["intro", "sim", "predict-5", "predict-10", "predict-20"].includes(id);
const guides: Record<string, SolveGuide> = {
  intro: {
    example:
      "Con 2 estudiantes habría 2 filas de 2 casillas: 2 + 2 = 4 encuentros.",
    steps: [
      "Elige un estudiante en el lado izquierdo del tablero.",
      "Compara su tarjeta con cada nombre de la parte superior, incluido él mismo. Cada casilla marcada es un encuentro.",
      "Haz lo mismo con las demás filas. El contador te ayuda; una casilla repetida no vuelve a contar.",
    ],
  },
  sim: {
    example:
      "Una cuadrícula de 2 × 2 tiene 4 celdas. Una de 4 × 4 tiene 16: es cuatro veces mayor.",
    steps: [
      "Usa el control de tamaño para probar la primera cuadrícula y anota su total.",
      "Cambia al segundo tamaño y observa que aumentan tanto las filas como las columnas.",
      "Compara los totales: pregunta cuántas veces cabe el primero en el segundo, no solo cuánto creció un lado.",
    ],
  },
  "predict-5": {
    example: "Para 2 filas de 2 celdas: 2 + 2 = 4, igual que 2 × 2.",
    steps: [
      "Cuenta las celdas de una sola fila.",
      "Observa cuántas filas iguales hay. Puedes dibujarlas con puntos.",
      "Suma las celdas fila por fila, o multiplica filas por columnas. Busca ese total entre las opciones.",
    ],
  },
  "predict-10": {
    example:
      "De 1 × 1 a 2 × 2: pasas de 1 celda a 4. Crecen las dos dimensiones.",
    steps: [
      "No necesitas memorizar una regla: dibuja la cuadrícula nueva.",
      "Cuenta cuántas filas y columnas tiene después del cambio.",
      "Multiplica las filas nuevas por las columnas nuevas. Compáralo con el total anterior para comprobarlo.",
    ],
  },
  "predict-20": {
    example:
      "Un rectángulo de 3 filas y 2 columnas tiene 2 + 2 + 2 = 6 celdas.",
    steps: [
      "Lee por separado el número de filas y el de columnas. No tienen por qué ser iguales.",
      "Imagina o dibuja una fila con el número de puntos indicado.",
      "Repite esa fila tantas veces como diga el reto. Multiplica filas por columnas, en lugar de elevar siempre al cuadrado.",
    ],
  },
  "predict-50": {
    example:
      "Con n = 3, una tarea de todos con todos y dos recorridos simples hacen 9 + 3 + 3 = 15 operaciones.",
    steps: [
      "Calcula primero el recorrido completo: n × n.",
      "Calcula los dos recorridos siguientes: n operaciones cada uno. Suceden después, no dentro del primero.",
      "Suma los tres resultados. Revisa que no hayas multiplicado tareas que van una después de otra.",
    ],
  },
  "predict-100": {
    example:
      "Con n = 5, A = n² da 25 y B = 3n da 15. En ese modelo, B cuenta menos operaciones.",
    steps: [
      "Sustituye n por el mismo tamaño en las dos estrategias.",
      "Calcula A multiplicando n por sí mismo y B multiplicando 3 por n.",
      "Compara los dos totales y elige la estrategia junto con su cantidad. Son operaciones del modelo, no segundos.",
    ],
  },
  index: {
    example:
      "Tomar el libro que ya sabes que está en la posición 3 no exige revisar toda la estantería.",
    steps: [
      "Busca si el código recorre todos los elementos o accede a una posición conocida.",
      "Imagina que el arreglo se hace mucho más grande. ¿Este acceso necesita nuevas vueltas?",
      "Si el trabajo no aumenta con n, el crecimiento es constante: O(1), bajo el modelo habitual de arreglo.",
    ],
  },
  single: {
    example:
      "Revisar 3 tarjetas una vez requiere 3 visitas; revisar 6 requiere 6.",
    steps: [
      "Cuenta cuántas vueltas hace el ciclo: desde 0 hasta n−1 hay n vueltas.",
      "Verifica que cada vuelta solo hace trabajo sencillo de costo constante.",
      "Si duplicar los datos duplica las visitas, el crecimiento es lineal, O(n).",
    ],
  },
  nested: {
    example:
      "Con n = 3, por cada una de las 3 vueltas externas hay 3 internas: 9 comparaciones.",
    steps: [
      "Fija una vuelta del ciclo externo y cuenta las vueltas del interno.",
      "Observa si el interno vuelve a empezar cada vez que avanza el externo.",
      "Multiplica las vueltas de ambos. Si los dos recorren n, la cuenta es n².",
    ],
  },
  adjacent: {
    example:
      "Con n = 3, un recorrido de 3 visitas y otro de 3 hacen 6 visitas, no 9.",
    steps: [
      "Observa las llaves: el segundo ciclo empieza cuando ya terminó el primero.",
      "Cuenta el trabajo de cada ciclo por separado.",
      "Suma los trabajos. Un total como 2n sigue siendo lineal; un factor fijo no convierte n en n².",
    ],
  },
  triangle: {
    example:
      "Para 4 datos, las filas de parejas tienen 3, 2, 1 y 0 comparaciones: 6 en total.",
    steps: [
      "Mira que j empieza en i + 1; no se compara un elemento consigo mismo ni se repite una pareja al revés.",
      "Suma las vueltas de cada fila: n−1, n−2, hasta 1. Puedes verificar un ejemplo pequeño a mano.",
      "La suma es n(n−1)/2. Al crecer n, domina su término cuadrático: el orden ajustado sigue siendo O(n²).",
    ],
  },
  "constant-inner": {
    example:
      "Si hay 4 vueltas externas y siempre 3 internas, se hacen 4 × 3 = 12 operaciones.",
    steps: [
      "Distingue un límite que cambia con n de un número fijo.",
      "El 3 del ciclo interno no aumenta aunque lleguen más datos.",
      "Multiplica n por ese número fijo: 3n crece linealmente, no al cuadrado.",
    ],
  },
  "half-inner": {
    example: "Con n = 2 hay 2 × 1 = 2 comparaciones. Con n = 4 hay 4 × 2 = 8.",
    steps: [
      "El límite n/2 cambia cuando cambia n; no es un límite fijo como 3.",
      "Multiplica n vueltas externas por n/2 internas: obtienes n²/2.",
      "Dividir por 2 reduce la cuenta, pero el crecimiento sigue siendo cuadrático. Comprueba que duplicar n cuadruplica el trabajo.",
    ],
  },
  "final-growth": {
    example:
      "Con n = 2 el modelo da 4 operaciones. Con n = 4 da 16: duplicar n multiplica por cuatro el trabajo.",
    steps: [
      "Compara el tamaño nuevo con el anterior para encontrar el factor de cambio.",
      "En un modelo n², multiplica ese factor por sí mismo.",
      "Multiplica las operaciones anteriores por ese resultado. Puedes verificarlo calculando también el cuadrado del tamaño nuevo.",
    ],
  },
  "final-pairs": {
    example: "Con 4 números distintos hay 3 + 2 + 1 = 6 parejas: 4 × 3 / 2.",
    steps: [
      "El primer número se compara con los n−1 posteriores, el segundo con n−2, y así sucesivamente.",
      "Suma esas cantidades o usa n × (n−1) / 2.",
      "No cuentes comparar un número consigo mismo ni una pareja dos veces. Como todos son distintos, no hay salida temprana.",
    ],
  },
  "final-memory": {
    example:
      "Al leer [4, 8, 4], Set recuerda primero 4, después 8 y detecta que el último 4 ya estaba.",
    steps: [
      "Separa dos preguntas: cuánto trabajo realiza y cuánta memoria extra necesita.",
      "Con operaciones de Set de costo promedio constante, recorrer n datos tiene tiempo esperado O(n).",
      "El conjunto puede guardar hasta n valores distintos: espacio adicional O(n). Elige la opción que incluya ambas cosas.",
    ],
  },
  "final-early": {
    example:
      "[2, 2, 7] permite detenerse pronto. [2, 5, 7] exige revisar todas las parejas.",
    steps: [
      "No confundas una entrada favorable con el caso que exige más trabajo.",
      "Para el peor caso, imagina que todos los valores son distintos y nunca se activa la salida temprana.",
      "Cuenta las parejas restantes: n(n−1)/2. El crecimiento cuadrático del peor caso se mantiene.",
    ],
  },
  "final-choice": {
    example:
      "Si un modelo permite 15 operaciones, una solución de 10 cabe y una de 20 no. Luego también debes comprobar la memoria.",
    steps: [
      "Anota por separado los dos límites del reto: operaciones y valores extra que puedes guardar.",
      "Para parejas, calcula n(n−1)/2; para Set, cuenta n consultas y n inserciones bajo el supuesto promedio indicado.",
      "Descarta lo que exceda el trabajo permitido. Comprueba también que la memoria de la opción restante cabe: Set puede guardar hasta n valores.",
    ],
  },
};
export function guideFor(id: string): SolveGuide {
  const guide = guides[id];
  if (!guide) throw new Error(`Missing solve guide: ${id}`);
  return guide;
}
