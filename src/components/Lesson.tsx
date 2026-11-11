import { ArrowUpRight, Users, Layers, TrendingUp } from "lucide-react";
export function Lesson() {
  return (
    <>
      <section className="lesson-hero panel">
        <div className="hero-copy">
          <div className="eyebrow cyan">MENOS MEMORIZAR. MÁS ENTENDER.</div>
          <h2>
            Cuando todos
            <br />
            se comparan
            <br />
            con <em>todos.</em>
          </h2>
          <p>
            Imagina un salón con <strong>5 estudiantes</strong>. Cada uno
            compara su tarjeta con las de los 5, incluida la suya.
          </p>
          <div className="formula">
            <span>5 estudiantes</span>
            <b>×</b>
            <span>5 tarjetas</span>
            <b>=</b>
            <strong>
              25<small>comparaciones</small>
            </strong>
          </div>
        </div>
        <div
          className="hero-art"
          aria-label="Cinco filas y cinco columnas equivalen a 25 comparaciones"
        >
          <div className="orbit-label">
            <span className="dot" /> EL PATRÓN ES LA CLAVE
          </div>
          <div className="mini-axis">cada tarjeta →</div>
          <div className="demo-grid">
            {Array.from({ length: 25 }, (_, i) => (
              <div
                key={i}
                className={i === 12 ? "focus-cell" : i < 12 ? "done-cell" : ""}
              >
                {i === 12 ? <ArrowUpRight size={22} /> : i < 12 ? "•" : "+"}
              </div>
            ))}
          </div>
          <div className="art-caption">
            <span>n × n</span>
            <strong>n²</strong>
          </div>
        </div>
      </section>
      <div className="concepts">
        <article className="panel">
          <Users size={21} />
          <span className="eyebrow">01 / LA ENTRADA</span>
          <h3>¿Qué es n?</h3>
          <p>
            Es la cantidad de datos: estudiantes, tarjetas o números. Si entran
            5 datos, n vale 5.
          </p>
        </article>
        <article className="panel">
          <Layers size={21} />
          <span className="eyebrow">02 / EL TRABAJO</span>
          <h3>¿Por qué al cuadrado?</h3>
          <p>
            Por cada uno de los n datos recorremos otros n. En este modelo
            completo, el total es n × n.
          </p>
        </article>
        <article className="panel">
          <TrendingUp size={21} />
          <span className="eyebrow">03 / EL CRECIMIENTO</span>
          <h3>¿Qué nos dice Big O?</h3>
          <p>
            Describe cómo crece el trabajo al aumentar n. O(n²) es una cota
            cuadrática de complejidad temporal.
          </p>
        </article>
      </div>
      <aside className="insight">
        <span>↗</span>
        <p>
          <strong>Crecer no es lo mismo que cronometrar.</strong> La complejidad
          temporal habla de cómo escala el trabajo. Big O no da segundos ni una
          cuenta exacta de instrucciones; aquí contamos una operación por
          comparación.
        </p>
      </aside>
    </>
  );
}
