import React, { useEffect, useMemo, useState } from "react";
import Pregunta from "./Question.jsx";
import Felicitaciones from "./Congrats.jsx";
import { API, buildQuizQuestions } from "../utils.js";

export default function Quiz() {
  const [preguntas, setQuestions] = useState([]);
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]); 
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  // Cargar preguntas
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

  // Puntaje
  const score = useMemo(
    () =>
      userAnswers.reduce(
        (acc, a, i) => (a && preguntas[i] && a.choice === preguntas[i].correct ? acc + 1 : acc),
        0
      ),
    [userAnswers, preguntas]
  );

  // Cuando todas estén contestadas -> resultados
  useEffect(() => {
    if (preguntas.length && userAnswers.every(a => a !== undefined)) {
      setShowResult(true);
    }
  }, [userAnswers, preguntas]);

  // Responder (solo marca y muestra feedback; NO avanza)
  const handleAnswer = (choice) => {
    if (userAnswers[preguntaActual]) return; // ya respondida
    const q = preguntas[preguntaActual];
    const next = [...userAnswers];
    next[preguntaActual] = { choice, correct: q.correct };
    setUserAnswers(next);
  };

  // Navegación por círculos
  const jumpTo = (i) => setPreguntaActual(i);

  // Rejugar
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
    <div className="container">
      {/* Header con título + puntos */}
        <header className="quiz-header">
          <h1>Country Quiz</h1>
          <div className="points">🏆 {score}/{preguntas.length} Points</div>
        </header>


      <div className="wrap">
        {/* Pregunta actual */}
        <div className="card">

        <div className="nav" style={{justifyContent:"center" }}>
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

        {preguntas[preguntaActual] && (
            <Pregunta
              pregunta={preguntas[preguntaActual]}
              usuarioRespuesta={userAnswers[preguntaActual]}
              manejarRespuesta={handleAnswer}
              index={preguntaActual}
              total={preguntas.length}
            />
        )}

        </div>

      </div>
    </div>
  );
}
