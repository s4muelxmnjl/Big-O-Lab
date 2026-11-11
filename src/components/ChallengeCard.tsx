import { useState } from "react";
import { ArrowRight, Check, Lightbulb, RotateCcw } from "lucide-react";
import { PracticalAnswer, isNumericChallenge } from "./PracticalAnswer";
import { SolveGuide } from "./SolveGuide";
import { isStarterChallenge } from "../domain/guides";
import { LearningRecap } from "./LearningRecap";
import type { Challenge } from "../domain/challenges";
export function ChallengeCard({
  challenge: q,
  solved,
  onAnswer,
}: {
  challenge: Challenge;
  solved: boolean;
  onAnswer: (id: string, answer: number) => void;
}) {
  const [answer, setAnswer] = useState<number | null>(null);
  const [hint, setHint] = useState(false);
  const correct = answer === q.answer;
  return (
    <section className="challenge panel">
      <div className="eyebrow">
        <span className="dot" />
        {q.title}
        <span className="xp-tag">{solved ? "COMPLETADO" : "+100 XP"}</span>
      </div>
      <h3>{q.question}</h3>
      <SolveGuide id={q.id} />
      {q.code && (
        <pre className="code-block">
          <code>{q.code}</code>
        </pre>
      )}
      {q.id === "intro" ||
      (isNumericChallenge(q) && !isStarterChallenge(q.id)) ? (
        <PracticalAnswer
          challenge={q}
          onSubmit={(index) => {
            setAnswer(index);
            onAnswer(q.id, index);
          }}
        />
      ) : (
        <div className="answers">
          {q.options.map((option, i) => (
            <button
              key={option}
              className={`answer ${answer === i ? (correct ? "correct" : "incorrect") : ""}`}
              aria-pressed={answer === i}
              onClick={() => {
                setAnswer(i);
                onAnswer(q.id, i);
              }}
            >
              <span className="answer-letter">
                {String.fromCharCode(65 + i)}
              </span>
              {option}
              {answer === i && correct ? (
                <Check size={18} />
              ) : (
                <ArrowRight size={17} />
              )}
            </button>
          ))}
        </div>
      )}
      <div role="status">
        {answer !== null && (
          <div className={`feedback ${correct ? "success" : ""}`}>
            <strong>
              {correct
                ? solved
                  ? "¡Bien razonado!"
                  : "¡Correcto!"
                : "Todavía no. Probemos otra vez."}
            </strong>
            <p>{q.explanation}</p>
            {!correct && (
              <button className="text-button" onClick={() => setAnswer(null)}>
                <RotateCcw size={14} /> Volver a intentar
              </button>
            )}
          </div>
        )}
      </div>
      {solved && <LearningRecap learning={q.learning} />}
      <button
        className="text-button hint"
        aria-expanded={hint}
        onClick={() => setHint(!hint)}
      >
        <Lightbulb size={15} />
        {hint ? "Ocultar pista" : "Necesito una pista"}
      </button>
      {hint && <p className="hint-text">{q.hint}</p>}
    </section>
  );
}
