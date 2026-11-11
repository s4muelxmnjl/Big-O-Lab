import { useState } from "react";
import { BookOpen, ChevronDown } from "lucide-react";
import { ExampleDiagram } from "./ExampleDiagram";
import { guideFor, isStarterChallenge } from "../domain/guides";
export function SolveGuide({ id }: { id: string }) {
  const [open, setOpen] = useState(isStarterChallenge(id));
  const guide = guideFor(id);
  return (
    <div className="solve-guide">
      <button
        className="guide-toggle"
        aria-expanded={open}
        aria-controls={`guide-${id}`}
        onClick={() => setOpen((v) => !v)}
      >
        <BookOpen size={17} />
        <span>Cómo resolver este reto</span>
        <ChevronDown size={17} />
      </button>
      {open && (
        <section id={`guide-${id}`} aria-label="Guía para resolver el reto">
          <ol>
            {guide.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <div className="guide-example">
            <strong>Un ejemplo parecido</strong>
            <p>{guide.example}</p>
            <ExampleDiagram id={id} />
          </div>
          <p className="microcopy">
            Ahora aplica el mismo método a los datos de tu reto. Puedes
            consultar esta guía cuantas veces necesites.
          </p>
        </section>
      )}
    </div>
  );
}
