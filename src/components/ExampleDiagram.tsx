import {
  diagramFor,
  isMarked,
  markedCount,
  type GridExample,
} from "../domain/diagrams";
function GridImage({ panel }: { panel: GridExample }) {
  const cell = 28,
    gap = 5,
    offset = 24;
  const width = offset + panel.columns * (cell + gap),
    height = offset + panel.rows * (cell + gap);
  const total = markedCount(panel);
  const caption =
    panel.caption ??
    `${panel.rows} filas × ${panel.columns} columnas = ${total} celdas`;
  return (
    <figure className="example-grid-panel">
      <figcaption>
        <strong>{panel.title}</strong>
      </figcaption>
      <svg
        className="example-grid-image"
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={`${panel.title}. ${caption}`}
        style={{ maxWidth: width }}
      >
        <title>
          {panel.title}. {caption}
        </title>
        {Array.from({ length: panel.columns }, (_, col) => (
          <text
            key={`col-${col}`}
            x={offset + col * (cell + gap) + cell / 2}
            y={12}
            textAnchor="middle"
            className="grid-axis-label"
          >
            {col + (panel.mode === "index" ? 0 : 1)}
          </text>
        ))}
        {Array.from({ length: panel.rows }, (_, row) => (
          <g key={row}>
            <text
              x={10}
              y={offset + row * (cell + gap) + 18}
              textAnchor="middle"
              className="grid-axis-label"
            >
              {row + 1}
            </text>
            {Array.from({ length: panel.columns }, (_, col) => {
              const marked = isMarked(panel, row, col);
              const value = panel.values?.[row * panel.columns + col];
              return (
                <g key={col}>
                  <rect
                    x={offset + col * (cell + gap)}
                    y={offset + row * (cell + gap)}
                    width={cell}
                    height={cell}
                    rx={5}
                    className={
                      marked ? "grid-example-filled" : "grid-example-empty"
                    }
                    data-marked={marked}
                  />
                  {value !== undefined && (
                    <text
                      x={offset + col * (cell + gap) + cell / 2}
                      y={offset + row * (cell + gap) + 19}
                      textAnchor="middle"
                      className={marked ? "grid-cell-text" : "grid-cell-muted"}
                    >
                      {value}
                    </text>
                  )}
                </g>
              );
            })}
          </g>
        ))}
      </svg>
      <p>{caption}</p>
    </figure>
  );
}
export function ExampleDiagram({ id }: { id: string }) {
  const diagram = diagramFor(id);
  return (
    <section className="example-diagram" aria-label="Ilustración del ejemplo">
      <div className="eyebrow">MÍRALO EN CUADRÍCULAS</div>
      <div className="example-diagram-panels">
        {diagram.panels.map((panel, i) => (
          <div className="example-diagram-part" key={`${panel.title}-${i}`}>
            {i > 0 && (
              <span className="diagram-connector" aria-hidden="true">
                {diagram.connector}
              </span>
            )}
            <GridImage panel={panel} />
          </div>
        ))}
      </div>
      <p className="diagram-conclusion">{diagram.conclusion}</p>
    </section>
  );
}
