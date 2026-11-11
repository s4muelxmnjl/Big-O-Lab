import { Pause, Play, RotateCcw, SkipForward } from "lucide-react";
import { useSimulator } from "../hooks/useSimulator";
import { coordinates } from "../domain/model";
export function Simulator() {
  const s = useSimulator();
  const current = coordinates(s.completed, s.n);
  return (
    <section className="panel simulator">
      <div className="panel-heading">
        <div>
          <span className="eyebrow">EXPERIMENTO EN VIVO</span>
          <h3>Un ciclo dentro de otro.</h3>
        </div>
        <span className="pill">O(n²)</span>
      </div>
      <label className="range-label" htmlFor="size">
        Tamaño de entrada <strong>n = {s.n}</strong>
      </label>
      <input
        id="size"
        type="range"
        min="1"
        max="20"
        value={s.n}
        onChange={(e) => s.changeN(+e.target.value)}
      />
      <div className="range-ends">
        <span>1 elemento</span>
        <span>20 elementos</span>
      </div>
      <div className="sim-layout">
        <div>
          <div className="grid-meta">
            <span>i = {current?.i ?? "—"}</span>
            <span>j = {current?.j ?? "—"}</span>
            <span>
              {s.n} × {s.n}
            </span>
          </div>
          <div
            className="operation-grid"
            style={{ gridTemplateColumns: `repeat(${s.n},1fr)` }}
            aria-label={`Cuadrícula de ${s.n} por ${s.n}; ${s.completed} operaciones realizadas`}
          >
            {Array.from({ length: s.total }, (_, i) => (
              <div
                key={i}
                className={`cell ${i < s.completed ? "visited" : ""} ${i === s.completed - 1 ? "active" : ""}`}
                aria-hidden="true"
              >
                {s.n <= 6 ? (i < s.completed ? "✓" : "·") : ""}
              </div>
            ))}
          </div>
        </div>
        <div className="code-side">
          <div className="code-title">
            <span className="dot" /> nested-loops.js
          </div>
          <pre>
            <code>
              <span className={current ? "line line-lit" : "line"}>
                for (let i = 0; i &lt; n; i++) {"{"}
              </span>
              <span className={current ? "line line-lit" : "line"}>
                {" "}
                for (let j = 0; j &lt; n; j++) {"{"}
              </span>
              <span className={current ? "line operation-line" : "line"}>
                {" "}
                operaciones++;
              </span>
              <span className="line"> {"}"}</span>
              <span className="line">{"}"}</span>
            </code>
          </pre>
          <p>
            La celda iluminada representa la última operación. Los índices
            empiezan en 0.
          </p>
        </div>
      </div>
      <div className="sim-stats">
        <div>
          <span>OPERACIONES</span>
          <strong data-testid="counter">
            {s.completed} <small>/ {s.total}</small>
          </strong>
        </div>
        <div>
          <span>MODELO TEÓRICO</span>
          <strong>
            {s.n}² = {s.total}
          </strong>
        </div>
        <div>
          <span>ESTADO</span>
          <strong className="state">
            {s.completed === s.total
              ? "Completado"
              : s.playing
                ? "En ejecución"
                : s.completed
                  ? "En pausa"
                  : "Listo para iniciar"}
          </strong>
        </div>
      </div>
      <progress
        value={s.completed}
        max={s.total}
        aria-label="Progreso de simulación"
      />
      <div className="sim-controls">
        <button
          className="primary"
          disabled={s.completed === s.total}
          onClick={s.playing ? s.pause : s.play}
        >
          {s.playing ? <Pause size={17} /> : <Play size={17} />}{" "}
          {s.playing ? "Pausar" : "Iniciar"}
        </button>
        <button
          className="secondary"
          onClick={s.step}
          disabled={s.completed === s.total}
        >
          <SkipForward size={17} /> Siguiente paso
        </button>
        <button
          className="icon-button"
          aria-label="Reiniciar simulación"
          onClick={s.reset}
        >
          <RotateCcw size={18} />
        </button>
      </div>
      <p className="microcopy" role="status">
        {s.completed === s.total
          ? "Recorrido completo. Cada celda se visitó una vez."
          : "Una celda = una operación representativa. La velocidad de animación no mide tiempo de CPU."}
      </p>
    </section>
  );
}
