export type Learning = {
  concept: string;
  steps: [string, string, string];
  takeaway: string;
  connection: string;
};
const recaps: Record<string, Learning> = {
  "half-inner": {
    concept: "La mitad de n sigue dependiendo de n",
    steps: [
      "Con n = 4, el ciclo interno hace 2 vueltas por cada una de las 4 externas: 8 comparaciones.",
      "Con n = 8, hace 4 vueltas por cada una de las 8 externas: 32 comparaciones.",
      "La entrada se duplicó, pero el trabajo se multiplicó por 4. La expresión es n²/2.",
    ],
    takeaway:
      "Un límite fijo como 3 produce 3n; un límite como n/2 sigue creciendo con n y aquí produce n²/2. Observa de qué depende cada límite.",
    connection:
      "Lleva esta distinción al laboratorio final: cambiar el recorrido y recordar valores puede cambiar el crecimiento.",
  },
  "predict-5": {
    concept: "Construir la cuenta desde una fila",
    steps: [
      "Un dato se compara con los 5 datos: 5 operaciones.",
      "Repite ese trabajo para los otros 4 datos: hay 5 filas iguales.",
      "5 + 5 + 5 + 5 + 5 = 25; la multiplicación 5 × 5 abrevia esa suma.",
    ],
    takeaway:
      "En un recorrido completo de todos con todos, la cuenta representativa es n².",
    connection:
      "Ahora mantén el algoritmo, pero duplica la cantidad de datos. ¿Crece solo una dimensión?",
  },
  "predict-10": {
    concept: "Usar el crecimiento en vez de empezar de cero",
    steps: [
      "Antes había 5 filas y 5 columnas: 25 celdas.",
      "Ahora hay el doble de filas y el doble de columnas: 10 por 10.",
      "Multiplica el trabajo anterior por 2 × 2: 25 × 4 = 100.",
    ],
    takeaway:
      "Duplicar n en el modelo n² cuadruplica el trabajo, en lugar de duplicarlo.",
    connection:
      "En el próximo reto cambiará el algoritmo: el recorrido interno será más corto. Lee sus límites.",
  },
  "predict-20": {
    concept: "Contar un rectángulo, no asumir un cuadrado",
    steps: [
      "Hay 20 datos que inician una comparación: 20 filas.",
      "Cada fila revisa solo los primeros 10 datos: 10 comparaciones por fila.",
      "Multiplica los límites reales: 20 × 10 = 200, no 20 × 20.",
    ],
    takeaway:
      "La cuenta depende de los recorridos concretos. Un ciclo interno no siempre visita los n datos.",
    connection:
      "Ahora combinarás un recorrido de todos con todos y otro recorrido simple. Las tareas consecutivas se suman.",
  },
  "predict-50": {
    concept: "Separar y sumar tareas consecutivas",
    steps: [
      "La primera tarea compara todos con todos: 50 × 50 = 2500 operaciones.",
      "Cuando termina, se hacen dos visitas completas: 50 + 50 = 100 operaciones más.",
      "El total es 2500 + 50 + 50 = 2600, no 2500 × 50.",
    ],
    takeaway:
      "La cuenta exacta de este modelo es n² + 2n. Su crecimiento sigue siendo cuadrático porque n² domina al aumentar n.",
    connection:
      "Ya puedes comparar expresiones distintas: calcula cuánto trabajo hace cada estrategia con la misma entrada.",
  },
  "predict-100": {
    concept: "Comparar dos estrategias con el mismo tamaño",
    steps: [
      "Sustituye n = 100 en A: 100² = 10000 operaciones.",
      "Sustituye el mismo n en B: 3 × 100 = 300 operaciones.",
      "En este modelo de igual costo por operación, 300 es menor que 10000.",
    ],
    takeaway:
      "Compara con la misma entrada y supuestos explícitos. Las cuentas representativas no son segundos reales.",
    connection:
      "Ahora busca estos patrones en código: el siguiente nivel te pedirá reconocer accesos, sumas y anidamientos.",
  },

  intro: {
    concept: "Contar todos con todos",
    steps: [
      "Fija un estudiante: compara su tarjeta con 4 tarjetas.",
      "Repite esas 4 comparaciones para cada uno de los 4 estudiantes.",
      "Suma 4 + 4 + 4 + 4 = 16; es lo mismo que 4 × 4.",
    ],
    takeaway:
      "n² aparece cuando cada uno de los n elementos recorre otros n. Aquí incluimos la tarjeta del propio estudiante.",
    connection:
      "En el simulador, cada estudiante será una fila y cada tarjeta una columna. Verás una celda por comparación.",
  },
  sim: {
    concept: "Duplicar la entrada cuadruplica el trabajo",
    steps: [
      "Con n = 3 hay 3 filas de 3 celdas: 9 operaciones.",
      "Con n = 6 hay el doble de filas y el doble de columnas: 36 operaciones.",
      "Compara: 36 ÷ 9 = 4. El trabajo se multiplicó por 2 × 2.",
    ],
    takeaway:
      "Para el modelo n², multiplicar la entrada por un factor k multiplica las operaciones por k².",
    connection:
      "Usa esa cuadrícula mental para predecir cantidades sin tener que ejecutar el algoritmo.",
  },
  index: {
    concept: "Acceder no es recorrer",
    steps: [
      "El índice 3 señala directamente una posición válida del arreglo.",
      "El código lee esa posición, sin visitar una por una las anteriores.",
      "Bajo el modelo habitual, aumentar el tamaño del arreglo no aumenta el trabajo de ese acceso.",
    ],
    takeaway:
      "O(1) significa crecimiento constante respecto a n; no significa exactamente una instrucción ni un segundo.",
    connection:
      "Ahora compara ese acceso directo con un ciclo que sí visita todos los elementos.",
  },
  single: {
    concept: "Un recorrido crece con la entrada",
    steps: [
      "i empieza en 0 y termina después de visitar n−1.",
      "Hay n llamadas a visitar; suponemos costo constante para cada una.",
      "Si n pasa de 5 a 10, las visitas pasan de 5 a 10.",
    ],
    takeaway:
      "Un recorrido completo con trabajo constante por elemento tiene crecimiento lineal: O(n).",
    connection:
      "Observa qué cambia cuando dentro de cada vuelta colocamos otro recorrido completo.",
  },
  nested: {
    concept: "Multiplicar recorridos anidados",
    steps: [
      "Elige un valor de i: j visita las n posiciones.",
      "Al cambiar i, j vuelve a empezar desde 0 y recorre otra vez las n posiciones.",
      "Con n = 4 son 4 grupos de 4 comparaciones: 16 en total.",
    ],
    takeaway:
      "En este código, los dos límites dependen de n: n × n produce crecimiento cuadrático.",
    connection:
      "En el siguiente caso los ciclos estarán uno después del otro. Decide si sus trabajos se suman o se multiplican.",
  },
  adjacent: {
    concept: "Sumar ciclos consecutivos",
    steps: [
      "El primer ciclo termina sus n visitas.",
      "Después, el segundo ciclo realiza n revisiones; no se repite por cada visita del primero.",
      "Para n = 5 son 5 + 5 = 10 operaciones; para n = 10 son 20.",
    ],
    takeaway:
      "2n sigue creciendo linealmente: al duplicar n, duplicas el trabajo. Por eso el orden ajustado es O(n).",
    connection:
      "Ahora verás ciclos anidados que evitan comparar una pareja dos veces: cuenta sus vueltas reales.",
  },
  triangle: {
    concept: "Menos comparaciones, mismo orden de crecimiento",
    steps: [
      "Con n = 4, i = 0 se compara con las otras 3 posiciones.",
      "Las siguientes filas hacen 2, 1 y 0 comparaciones: 3 + 2 + 1 = 6.",
      "En general son n(n−1)/2 = (n²−n)/2; el término cuadrático domina cuando n crece.",
    ],
    takeaway:
      "Dividir aproximadamente a la mitad reduce el trabajo, pero no cambia su crecimiento cuadrático.",
    connection:
      "Que haya ciclos anidados no basta: en el próximo caso el límite interno será constante.",
  },
  "constant-inner": {
    concept: "Un ciclo interno constante cambia el resultado",
    steps: [
      "Por cada valor de i, j solo toma 0, 1 y 2: tres vueltas.",
      "Con n = 5 hay 15 operaciones y con n = 10 hay 30.",
      "La cuenta es n × 3, no n × n; duplicar n duplica el trabajo.",
    ],
    takeaway:
      "Mira los límites de los ciclos, no solo cuántos hay. Este anidamiento tiene orden ajustado O(n).",
    connection:
      "Aplica esta forma de contar a la misión de repetidos: revisa tanto el trabajo como la memoria de cada solución.",
  },
  "final-growth": {
    concept: "Aplicar el factor de crecimiento",
    steps: [
      "La entrada pasa de 10 a 30: se multiplica por 3.",
      "En el modelo n² el factor del trabajo es 3² = 9.",
      "Multiplica las 100 operaciones iniciales por 9: obtienes 900, igual que 30 × 30.",
    ],
    takeaway:
      "Puedes predecir el cambio relativo sin ejecutar: para n², usa el cuadrado del factor de entrada.",
    connection:
      "Ahora separa ese recorrido completo del que solo compara parejas distintas.",
  },
  "final-pairs": {
    concept: "Contar cada pareja una sola vez",
    steps: [
      "El primer número se compara con 9 números posteriores; el siguiente, con 8.",
      "Continúa hasta sumar 9 + 8 + … + 1 = 45.",
      "La fórmula 10 × 9 / 2 evita comparar un número consigo mismo y repetir la pareja al revés.",
    ],
    takeaway:
      "La cuenta triangular n(n−1)/2 es exacta para este recorrido sin salida temprana; su crecimiento sigue siendo cuadrático.",
    connection:
      "Para evitar recorrer tantas parejas, Set recuerda valores. Descubre qué recurso usa para lograrlo.",
  },
  "final-memory": {
    concept: "Cambiar memoria por tiempo esperado",
    steps: [
      "Para cada número, consulta si ya está en vistos.",
      "Si no aparece, guárdalo. Suponemos consultas e inserciones de costo promedio constante.",
      "Con n números distintos hay n consultas y n inserciones; el conjunto guarda hasta n valores.",
    ],
    takeaway:
      "Set permite tiempo esperado O(n) usando espacio adicional O(n). No elimina el recorrido ni la necesidad de memoria.",
    connection:
      "Si aparece un repetido puedes terminar antes. Distingue ese caso favorable del peor caso.",
  },
  "final-early": {
    concept: "Una entrada fácil no define el peor caso",
    steps: [
      "Si los dos primeros números coinciden, la solución por parejas encuentra pronto el repetido.",
      "Pero con todos los números distintos no se activa ningún return true.",
      "Entonces debe revisar las n(n−1)/2 parejas antes de devolver false.",
    ],
    takeaway:
      "La salida temprana mejora algunas entradas; el peor caso de la solución por parejas sigue siendo cuadrático.",
    connection:
      "Ya puedes decidir usando tamaño de entrada, crecimiento y memoria, sin confundir Big O con un cronómetro.",
  },
  "final-choice": {
    concept: "Elegir una solución que cumpla dos límites",
    steps: [
      "Parejas hace 1000 × 999 / 2 = 499500 comparaciones: supera el límite de 20000.",
      "Set hace 1000 consultas + 1000 inserciones = 2000 operaciones en el modelo promedio supuesto.",
      "Set puede guardar 1000 valores; esa memoria cabe justo en el presupuesto adicional disponible.",
    ],
    takeaway:
      "Elige considerando tanto trabajo como memoria. Cumplir uno de los límites no basta, y las operaciones modeladas no indican segundos exactos.",
    connection:
      "Completaste la ruta: ya puedes justificar una elección con cálculos, supuestos y recursos. Revisa la explicación antes de ver tu victoria.",
  },
};
export function learningFor(id: string): Learning {
  const learning = recaps[id];
  if (!learning) throw new Error(`Missing learning content: ${id}`);
  return learning;
}
