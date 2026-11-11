import { BookOpen, ArrowRight } from "lucide-react";
import type { Learning } from "../domain/learning";
export function LearningRecap({ learning }: { learning: Learning }) {
  return (
    <section
      className="learning-recap"
      aria-label="Explicación del punto resuelto"
    >
      <div className="eyebrow">
        <BookOpen size={16} /> LO QUE ACABAS DE APRENDER
      </div>
      <h4>{learning.concept}</h4>
      <ol>
        {learning.steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      <div className="learning-takeaway">
        <strong>Quédate con esta idea</strong>
        <p>{learning.takeaway}</p>
      </div>
      <div className="learning-connection">
        <ArrowRight size={16} />
        <p>
          <strong>Conecta con lo que sigue.</strong> {learning.connection}
        </p>
      </div>
    </section>
  );
}
