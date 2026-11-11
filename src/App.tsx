import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Award,
  Beaker,
  BookOpen,
  Check,
  ChevronRight,
  Code2,
  Flag,
  FlaskConical,
  LockKeyhole,
  RotateCcw,
  Sparkles,
  Target,
  Trophy,
  Zap,
} from "lucide-react";
import { levels, challenges } from "./domain/challenges";
import { isUnlocked, levelComplete, xp } from "./domain/model";
import { useProgress } from "./hooks/useProgress";
import { ChallengeCard } from "./components/ChallengeCard";
import { Simulator } from "./components/Simulator";
import { Lesson } from "./components/Lesson";
import { FinalMission } from "./components/FinalMission";
const icons = [BookOpen, Beaker, Target, Code2, Flag];
export default function App() {
  const { progress, storageError, solve, reset } = useProgress();
  const [level, setLevel] = useState(1);
  const [resetOpen, setResetOpen] = useState(false);
  const [victoryOpen, setVictoryOpen] = useState(true);
  const dialogRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!resetOpen) return;
    const previous = document.activeElement as HTMLElement;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setResetOpen(false);
      if (e.key === "Tab") {
        const buttons =
          dialogRef.current?.querySelectorAll<HTMLButtonElement>("button");
        if (!buttons?.length) return;
        const first = buttons[0],
          last = buttons[buttons.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      previous?.focus();
    };
  }, [resetOpen]);
  const complete = levelComplete(progress, level);
  const won = levels.every((_, i) => levelComplete(progress, i + 1));
  const done = levels.filter((_, i) => levelComplete(progress, i + 1)).length;
  const questions = challenges.filter((q) => q.level === level);
  const [questionIndex, setQuestionIndex] = useState(0);
  const q = questions[Math.min(questionIndex, questions.length - 1)];
  function go(next: number) {
    setLevel(next);
    setQuestionIndex(0);
    window.scrollTo({ top: 0, behavior: "instant" });
  }
  return (
    <div className="app-shell">
      <a href="#main" className="skip-link">
        Saltar al contenido
      </a>
      <aside className="sidebar">
        <a
          className="brand"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            go(1);
          }}
        >
          <span className="brand-icon">
            <FlaskConical size={24} />
          </span>
          <span>
            big o<span className="brand-light"> lab</span>
            <small>APRENDE. EXPERIMENTA. CRECE.</small>
          </span>
        </a>
        <div className="course-label">TU RUTA DE APRENDIZAJE</div>
        <nav aria-label="Niveles del juego">
          {levels.map((item, i) => {
            const Icon = icons[i];
            const unlocked = isUnlocked(progress, i + 1);
            const passed = levelComplete(progress, i + 1);
            return (
              <button
                key={item.short}
                disabled={!unlocked}
                aria-current={level === i + 1 ? "step" : undefined}
                className={`nav-level ${level === i + 1 ? "selected" : ""}`}
                onClick={() => go(i + 1)}
              >
                <span className="nav-icon">
                  {passed ? (
                    <Check size={19} />
                  ) : unlocked ? (
                    <Icon size={19} />
                  ) : (
                    <LockKeyhole size={17} />
                  )}
                </span>
                <span>
                  <small>NIVEL 0{i + 1}</small>
                  <strong>{item.short}</strong>
                </span>
                {level === i + 1 && <span className="nav-dot" />}
              </button>
            );
          })}
        </nav>
        <div className="sidebar-bottom">
          <div className="badge-preview">
            <Award size={27} />
            <h3>
              Pequeños pasos.
              <br />
              Grandes descubrimientos.
            </h3>
            <p>Cada desafío resuelto es una nueva forma de pensar.</p>
          </div>
          <button
            className="text-button reset-progress"
            onClick={() => setResetOpen(true)}
          >
            <RotateCcw size={14} /> Reiniciar mi progreso
          </button>
          <span className="version">
            BIG O LAB <span>v1.0 · Hecho para explorar</span>
          </span>
        </div>
      </aside>
      <div className="main-shell">
        <header className="topbar">
          <span>
            Laboratorio <ChevronRight size={14} />{" "}
            <strong>Nivel 0{level}</strong>
          </span>
          <div className="top-right">
            <span className="save-state">
              <span className="dot" />
              {storageError ? "Sesión sin guardar" : "Progreso local"}
            </span>
            <span className="xp-display">
              <Zap size={16} fill="currentColor" /> {xp(progress)} XP
            </span>
            <span className="avatar" aria-label="Perfil explorador">
              EX
            </span>
          </div>
        </header>
        <main id="main">
          <div className="page-heading">
            <div>
              <div className="eyebrow">
                <span className="level-tag">NIVEL 0{level}</span>
                {levels[level - 1].tag}
              </div>
              <h1>{levels[level - 1].title}</h1>
              <p>{levels[level - 1].description}</p>
            </div>
            <span className="heading-mark" aria-hidden="true">
              {level === 1
                ? "n²"
                : level === 2
                  ? "ƒ"
                  : level === 3
                    ? "?"
                    : level === 4
                      ? "{ }"
                      : "↗"}
            </span>
          </div>
          <div className="journey-progress">
            <div>
              <span>Tu camino al pensamiento algorítmico</span>
              <strong>{done} de 5 niveles</strong>
            </div>
            <div className="segments">
              {levels.map((_, i) => (
                <span
                  key={i}
                  className={
                    levelComplete(progress, i + 1)
                      ? "finished"
                      : i + 1 === level
                        ? "current"
                        : ""
                  }
                />
              ))}
            </div>
          </div>
          {storageError && (
            <p role="alert" className="feedback">
              El navegador no permite guardar el progreso. Puedes jugar, pero se
              perderá al cerrar esta sesión.
            </p>
          )}
          {won && victoryOpen ? (
            <section className="panel victory">
              <Trophy size={58} />
              <span className="eyebrow cyan">MISIÓN COMPLETADA</span>
              <h2>Ya piensas en grande.</h2>
              <p>
                Completaste los cinco niveles. Ahora puedes visualizar O(n²),
                reconocer sus límites y comparar estrategias.
              </p>
              <strong>{xp(progress)} XP · 5 insignias</strong>
              <div className="medals">
                {levels.map((l, i) => (
                  <span key={l.short}>
                    <Award size={24} /> {i + 1}. {l.short}
                  </span>
                ))}
              </div>
              <button className="primary" onClick={() => setVictoryOpen(false)}>
                Volver a explorar <ArrowRight size={17} />
              </button>
            </section>
          ) : (
            <>
              {level === 1 && <Lesson />}
              {level === 2 && <Simulator />}
              {level === 3 && (
                <div className="panel compact-intro">
                  <Sparkles size={25} />
                  <p>
                    <strong>Primero imagina. Después calcula.</strong>
                    <br />
                    Cada recorrido completo tiene n filas y n columnas. Piensa
                    en el área de la cuadrícula, incluso cuando sea demasiado
                    grande para dibujarla.
                  </p>
                </div>
              )}
              {level === 4 && (
                <aside className="insight">
                  <Code2 size={24} />
                  <p>
                    <strong>No cuentes solo los ciclos.</strong> Observa sus
                    límites y si están dentro de otros. Suponemos arreglos e
                    índices válidos y operaciones simples de costo constante.
                  </p>
                </aside>
              )}
              {level === 5 && <FinalMission />}
              <div className="section-title">
                <div>
                  <span className="eyebrow">COMPRUEBA TU INTUICIÓN</span>
                  <h2>
                    {level <= 2
                      ? "Un pequeño reto, antes de seguir."
                      : "Tu turno de resolver."}
                  </h2>
                </div>
                <span>
                  {questionIndex + 1} / {questions.length}
                </span>
              </div>
              {questions.length > 1 && (
                <div className="question-tabs" aria-label="Desafíos del nivel">
                  {questions.map((item, i) => {
                    const unlocked =
                      i === 0 || progress.solved.includes(questions[i - 1].id);
                    return (
                      <button
                        key={item.id}
                        aria-label={`Desafío ${i + 1}`}
                        aria-pressed={questionIndex === i}
                        disabled={!unlocked}
                        className={questionIndex === i ? "active" : ""}
                        onClick={() => setQuestionIndex(i)}
                      >
                        {progress.solved.includes(item.id) ? (
                          <Check size={15} />
                        ) : (
                          i + 1
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
              <ChallengeCard
                key={q.id}
                challenge={q}
                solved={progress.solved.includes(q.id)}
                onAnswer={solve}
              />
              {progress.solved.includes(q.id) &&
                questionIndex < questions.length - 1 && (
                  <div className="next-question">
                    <button
                      className="primary"
                      onClick={() => setQuestionIndex((i) => i + 1)}
                    >
                      Siguiente desafío <ArrowRight size={17} />
                    </button>
                  </div>
                )}
              {complete && (
                <section className="level-complete" role="status">
                  <span className="completion-icon">
                    <Award size={25} />
                  </span>
                  <div>
                    <strong>
                      Insignia obtenida: {levels[level - 1].short}
                    </strong>
                    <p>
                      {level < 5
                        ? "¡Nivel completado! Tu siguiente experimento está listo."
                        : "¡Completaste toda la ruta de aprendizaje!"}
                    </p>
                  </div>
                  <button
                    className="primary"
                    onClick={() => {
                      if (level < 5) go(level + 1);
                      else {
                        setVictoryOpen(true);
                        window.scrollTo({ top: 0 });
                      }
                    }}
                  >
                    {level < 5 ? "Siguiente nivel" : "Ver mi victoria"}
                    <ArrowRight size={17} />
                  </button>
                </section>
              )}
            </>
          )}
          <footer>
            <span>
              <FlaskConical size={15} /> La curiosidad es tu mejor algoritmo.
            </span>
            <span>Sin prisa. A tu ritmo.</span>
          </footer>
        </main>
      </div>
      {resetOpen && (
        <div className="modal-backdrop" ref={dialogRef}>
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="reset-title"
            className="panel reset-dialog"
          >
            <h2 id="reset-title">¿Empezar desde cero?</h2>
            <p>
              Se borrarán los XP, las insignias y los niveles desbloqueados de
              este navegador.
            </p>
            <div>
              <button
                autoFocus
                className="secondary"
                onClick={() => setResetOpen(false)}
              >
                Conservar progreso
              </button>
              <button
                className="primary"
                onClick={() => {
                  reset();
                  go(1);
                  setVictoryOpen(true);
                  setResetOpen(false);
                }}
              >
                Borrar progreso
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
