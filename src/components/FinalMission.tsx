import { useState } from "react";
import { DuplicateLab } from "./DuplicateLab";
import { pairs } from "../domain/model";
export function FinalMission() {
  const [n, setN] = useState(10);
  return (
    <>
      <DuplicateLab />
      <section className="panel mission">
        <span className="eyebrow cyan">MISIÓN · DETECTAR REPETIDOS</span>
        <h2>
          Mismo problema.
          <br />
          <em>Otra estrategia.</em>
        </h2>
        <p>
          ¿Hay un número que aparece dos veces? Comparamos el peor caso: un
          arreglo con todos los valores distintos. Así ningún algoritmo termina
          antes.
        </p>
        <label className="range-label" htmlFor="comparison">
          Tamaño del arreglo <strong>n = {n}</strong>
        </label>
        <select
          id="comparison"
          value={n}
          onChange={(e) => setN(+e.target.value)}
        >
          {[5, 10, 20, 50, 100, 1000].map((v) => (
            <option key={v} value={v}>
              {v} números
            </option>
          ))}
        </select>
        <div className="comparison">
          <article>
            <span className="eyebrow">BUSCAR EN PAREJAS</span>
            <h3>O(n²)</h3>
            <strong className="big-number">
              {pairs(n).toLocaleString("es")}
            </strong>
            <p>comparaciones de valores · n(n−1)/2</p>
            <div className="bar quadratic" />
            <details className="code-disclosure">
              <summary>Ver código de la estrategia</summary>
              <pre>
                <code>{`function repetidos(numbers) {\n  for (let i = 0; i < numbers.length; i++) {\n    for (let j = i + 1; j < numbers.length; j++) {\n      if (numbers[i] === numbers[j]) return true;\n    }\n  }\n  return false;\n}`}</code>
              </pre>
            </details>
            <p>Espacio adicional O(1). Revisa cada pareja distinta una vez.</p>
          </article>
          <article>
            <span className="eyebrow cyan">RECORDAR CON SET</span>
            <h3>O(n) esperado</h3>
            <strong className="big-number cyan">
              {(2 * n).toLocaleString("es")}
            </strong>
            <p>operaciones de Set · n consultas + n inserciones</p>
            <div
              className="bar linear"
              style={{
                width: `${Math.max(2, Math.min(100, ((2 * n) / Math.max(pairs(n), 2 * n)) * 100))}%`,
              }}
            />
            <details className="code-disclosure">
              <summary>Ver código de la estrategia</summary>
              <pre>
                <code>{`function repetidos(numbers) {\n  const vistos = new Set();\n  for (const number of numbers) {\n    if (vistos.has(number)) return true;\n    vistos.add(number);\n  }\n  return false;\n}`}</code>
              </pre>
            </details>
            <p>Espacio adicional O(n). Guarda hasta n valores ya vistos.</p>
          </article>
        </div>
      </section>
      <aside className="insight">
        <span>≈</span>
        <p>
          <strong>Comparar modelos, con cuidado.</strong> Suponemos consultas e
          inserciones de Set de costo promedio constante. Son operaciones
          diferentes a comparar dos valores; las barras muestran cuentas
          representativas, no mediciones de velocidad. Con repetidos, ambas
          soluciones pueden terminar antes.
        </p>
      </aside>
    </>
  );
}
