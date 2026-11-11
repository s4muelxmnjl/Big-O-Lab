import { useEffect, useMemo, useState } from "react";
import { Pause, Play, RotateCcw, SkipForward } from "lucide-react";
import {
  parseNumbers,
  tracePairs,
  traceSet,
  type Trace,
} from "../domain/traces";
function TraceView({
  name,
  trace,
  step,
  values,
  isSet,
}: {
  name: string;
  trace: Trace;
  step: number;
  values: number[];
  isSet: boolean;
}) {
  const count = Math.min(step, trace.steps.length);
  const current = count ? trace.steps[count - 1] : null;
  const finished = count === trace.steps.length;
  return (
    <article className="trace-card">
      <h4>{name}</h4>
      <div className="array-chips">
        {values.map((value, i) => (
          <span
            key={i}
            className={current?.indices.includes(i) ? "highlighted" : ""}
          >
            <small>índice {i}</small>
            {value}
          </span>
        ))}
      </div>
      <strong className="trace-count">
        {count} {count === 1 ? "operación" : "operaciones"}
      </strong>
      <p>
        {current?.text ??
          "Listo: pulsa un paso para observar qué hace el algoritmo."}
      </p>
      {isSet && (
        <div className="seen-values">
          vistos = {"{"}
          {current?.seen.join(", ") || "vacío"}
          {"}"}
        </div>
      )}
      <div className="trace-result">
        {finished
          ? trace.duplicate
            ? "Resultado: hay repetidos."
            : "Resultado: todos son distintos."
          : "Resultado: todavía sin determinar."}
      </div>
    </article>
  );
}
export function DuplicateLab() {
  const [values, setValues] = useState([7, 2, 9, 4, 6]);
  const [raw, setRaw] = useState("7, 2, 9, 4, 6");
  const [error, setError] = useState("");
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const a = useMemo(() => tracePairs(values), [values]);
  const b = useMemo(() => traceSet(values), [values]);
  const total = Math.max(a.steps.length, b.steps.length);
  useEffect(() => {
    if (!playing || step >= total) return;
    const timer = setTimeout(() => setStep((s) => Math.min(s + 1, total)), 550);
    return () => clearTimeout(timer);
  }, [playing, step, total]);
  useEffect(() => {
    if (step === total) setPlaying(false);
  }, [step, total]);
  function apply(next: number[]) {
    setValues(next);
    setRaw(next.join(", "));
    setError("");
    setPlaying(false);
    setStep(0);
  }
  return (
    <section
      className="panel duplicate-lab"
      aria-label="Laboratorio de datos reales"
    >
      <div className="eyebrow cyan">PRUEBA TUS PROPIOS DATOS</div>
      <h3>¿Dónde cambia la historia?</h3>
      <p>
        Coloca un repetido al principio o al final y observa la salida temprana.
        Cada pulso avanza una operación representativa de cada algoritmo; no es
        una carrera de velocidad real.
      </p>
      <div className="scenario-buttons">
        <button className="secondary" onClick={() => apply([7, 2, 9, 4, 6])}>
          Todos distintos
        </button>
        <button className="secondary" onClick={() => apply([7, 7, 9, 4, 6])}>
          Repetido al principio
        </button>
        <button className="secondary" onClick={() => apply([7, 2, 9, 4, 7])}>
          Repetido al final
        </button>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const parsed = parseNumbers(raw);
          if (!parsed) {
            setError(
              "Escribe entre 2 y 12 enteros de −999 a 999, separados por comas.",
            );
            return;
          }
          apply(parsed);
        }}
      >
        <label htmlFor="custom-array">Tu arreglo · de 2 a 12 enteros</label>
        <div className="array-input">
          <input
            id="custom-array"
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
            aria-invalid={!!error}
            aria-describedby={error ? "array-error" : undefined}
          />
          <button className="primary">Aplicar datos</button>
        </div>
        {error && (
          <p role="alert" id="array-error">
            {error}
          </p>
        )}
      </form>
      <div className="trace-columns">
        <TraceView
          name="Parejas · comparación por paso"
          trace={a}
          step={step}
          values={values}
          isSet={false}
        />
        <TraceView
          name="Set · consulta o inserción por paso"
          trace={b}
          step={step}
          values={values}
          isSet
        />
      </div>
      <div className="sim-controls">
        <button
          className="primary"
          onClick={() => setPlaying((p) => !p)}
          disabled={step === total}
        >
          {playing ? <Pause size={16} /> : <Play size={16} />}{" "}
          {playing ? "Pausar comparación" : "Ejecutar comparación"}
        </button>
        <button
          className="secondary"
          onClick={() => {
            setPlaying(false);
            setStep((s) => Math.min(s + 1, total));
          }}
          disabled={step === total}
        >
          <SkipForward size={16} />
          Un paso en ambos
        </button>
        <button
          className="icon-button"
          aria-label="Reiniciar comparación"
          onClick={() => {
            setStep(0);
            setPlaying(false);
          }}
        >
          <RotateCcw size={17} />
        </button>
      </div>
      <p role="status" className="microcopy">
        {step === total
          ? `Exploración completa: parejas hizo ${a.steps.length} ${a.steps.length === 1 ? "comparación" : "comparaciones"}; Set hizo ${b.steps.length} consultas e inserciones. Prueba otra ubicación del repetido.`
          : "Una comparación y una llamada a Set son operaciones distintas. Supuesto: consultas e inserciones de costo promedio constante."}
      </p>
    </section>
  );
}
