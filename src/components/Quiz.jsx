import React, { useEffect, useMemo, useState } from "react";
import Pregunta from "./Pregunta.jsx";
import Felicitaciones from "./Felicitaciones.jsx";
import { API, buildQuizQuestions } from "../utils.js";

export default function Quiz() {
  const [preguntas, setQuestions] = useState([]);
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]); // [{choice, correct}] | undefined
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  // Obtener preguntas desde la API con fetch
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        setErr(null);
        const res = await fetch(API);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!alive) return;
        const qs = buildQuizQuestions(data, 10);
        setQuestions(qs);
        setUserAnswers(Array(qs.length).fill(undefined));
        setPreguntaActual(0);
      } catch (e) {
        if (!alive) return;
        setErr(e?.message || "Error");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  const score = useMemo(
    () =>
      userAnswers.reduce(
        (acc, a, i) => (a && preguntas[i] && a.choice === preguntas[i].correct ? acc + 1 : acc),
        0
      ),
    [userAnswers, preguntas]
  );

  const handleAnswer = (choice) => {
    if (userAnswers[preguntaActual]) return; // no permitir re-responder
    const q = preguntas[preguntaActual];
    const next = [...userAnswers];
    next[preguntaActual] = { choice, correct: q.correct };
    setUserAnswers(next);
  };

  const manejarSiguientePregunta = () =>
    setPreguntaActual((p) => Math.min(p + 1, preguntas.length - 1));

  const handlePrevQuestion = () =>
    setPreguntaActual((p) => Math.max(p - 1, 0));

  const handleFinishQuiz = () => setShowResult(true);

  const jumpTo = (i) => setPreguntaActual(i);

  const playAgain = async () => {
    try {
      setLoading(true);
      setErr(null);
      const res = await fetch(API);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const qs = buildQuizQuestions(data, 10);
      setQuestions(qs);
      setUserAnswers(Array(qs.length).fill(undefined));
      setPreguntaActual(0);
      setShowResult(false);
    } catch (e) {
      setErr(e?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="center">Cargando países…</div>;
  if (err) return <div className="center error">Error: {err}</div>;

  if (showResult) {
    return (
      <Felicitaciones
        respuestascorrectas={score}
        preguntastotales={preguntas.length}
        manejarReproducirDeNuevo={playAgain}
      />
    );
  }

  return (
    <div className="wrap">
      {/* Navegación libre por preguntas */}
      <div className="nav">
        {preguntas.map((_, i) => {
          const answered = userAnswers[i] != null;
          const curr = i === preguntaActual;
          return (
            <button
              key={i}
              className={`dot ${curr ? "dot-current" : answered ? "dot-answered" : ""}`}
              onClick={() => jumpTo(i)}
              title={answered ? "Contestada" : "Sin responder"}
            >
              {i + 1}
            </button>
          );
        })}
      </div>

      {/* La pregunta actual */}
      {preguntas[preguntaActual] && (
        <Pregunta
          pregunta={preguntas[preguntaActual]}
          usuarioRespuesta={userAnswers[preguntaActual]}
          manejarRespuesta={handleAnswer}
          index={preguntaActual}
          total={preguntas.length}
        />
      )}

      {/* Controles inferior */}
      <div className="row space-between mt">
        <button className="btn" onClick={handlePrevQuestion} disabled={preguntaActual === 0}>
          Anterior
        </button>
        {preguntaActual < preguntas.length - 1 ? (
          <button className="btn primary" onClick={manejarSiguientePregunta}>
            Siguiente
          </button>
        ) : (
          <button className="btn success" onClick={handleFinishQuiz}>
            Finalizar
          </button>
        )}
      </div>

      <div className="muted small center mt">
        Aciertos: <strong>{score}</strong> / {preguntas.length}
      </div>
    </div>
  );
}
