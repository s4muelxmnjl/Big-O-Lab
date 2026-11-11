import { useState } from "react";
import { Check, RotateCcw } from "lucide-react";
import type { Challenge } from "../domain/challenges";
export const isNumericChallenge = (q: Challenge) =>
  /^\d+$/.test(q.options[q.answer]);
export function PracticalAnswer({
  challenge: q,
  onSubmit,
}: {
  challenge: Challenge;
  onSubmit: (answer: number) => void;
}) {
  const [visited, setVisited] = useState<number[]>([]);
  const [value, setValue] = useState("");
  if (q.id === "intro")
    return (
      <div className="pair-task">
        <p>
          <strong>Construye el recorrido.</strong> Pulsa cada casilla para
          comparar una tarjeta de la fila con una de la columna. Incluye las de
          la misma persona.
        </p>
        <div
          className="pair-board"
          aria-label="Encuentros entre cuatro estudiantes"
        >
          <span aria-hidden="true">↘</span>
          {["Ana", "Leo", "Sol", "Max"].map((name) => (
            <strong key={name}>{name}</strong>
          ))}
          {["Ana", "Leo", "Sol", "Max"].map((name, i) => (
            <div className="pair-row" key={name}>
              <strong>{name}</strong>
              {["Ana", "Leo", "Sol", "Max"].map((other, j) => {
                const index = i * 4 + j;
                const active = visited.includes(index);
                return (
                  <button
                    key={other}
                    className={active ? "marked" : ""}
                    aria-label={`Comparar ${name} con ${other}`}
                    aria-pressed={active}
                    onClick={() =>
                      setVisited((c) =>
                        c.includes(index) ? c : c.concat(index),
                      )
                    }
                  >
                    {active ? <Check size={18} /> : "+"}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
        <div className="task-controls">
          <span role="status">{visited.length} de 16 encuentros</span>
          <button className="text-button" onClick={() => setVisited([])}>
            <RotateCcw size={14} />
            Limpiar tablero
          </button>
        </div>
        <button
          className="primary"
          disabled={visited.length !== 16}
          onClick={() => onSubmit(q.answer)}
        >
          Comprobar recorrido
        </button>
        <p className="microcopy">
          Cada encuentro cuenta una vez. Cuando completes el tablero, comprueba
          lo que construiste.
        </p>
      </div>
    );
  return (
    <form
      className="numeric-task"
      onSubmit={(e) => {
        e.preventDefault();
        if (!/^\d+$/.test(value.trim())) return;
        onSubmit(
          Number(value) === Number(q.options[q.answer])
            ? q.answer
            : (q.answer + 1) % q.options.length,
        );
      }}
    >
      <label htmlFor={`answer-${q.id}`}>
        Calcula tu respuesta{" "}
        <span>Escribe el número de operaciones, sin separadores.</span>
      </label>
      <div>
        <input
          id={`answer-${q.id}`}
          inputMode="numeric"
          pattern="[0-9]+"
          maxLength={9}
          required
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Tu cálculo"
          autoComplete="off"
        />
        <button className="primary" type="submit">
          Comprobar cálculo
        </button>
      </div>
    </form>
  );
}
