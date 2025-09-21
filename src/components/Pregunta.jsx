import React from "react";

export default function Pregunta({ pregunta, usuarioRespuesta, manejarRespuesta, index, total }) {
  return (
    <div className="card">
      <div className="row space-between">
        <h2>Pregunta {index + 1} de {total}</h2>
        <span className="muted">Tipo: {pregunta.type}</span>
      </div>

      {pregunta.mediaFlag && (
        <div className="row gap">
          <img src={pregunta.mediaFlag} alt="Bandera" className="flag" />
          <span className="muted">Bandera de referencia</span>
        </div>
      )}

      <p className="prompt">{pregunta.prompt}</p>

      <div className="options">
        {pregunta.options.map((opt, i) => {
          const chosen = usuarioRespuesta?.choice === opt;
          const isCorrect = pregunta.correct === opt;
          const wasAnswered = usuarioRespuesta != null;

          let extra = "";
          if (wasAnswered) {
            if (isCorrect) extra = "opt-correct";
            if (chosen && !isCorrect) extra = "opt-wrong";
          }

          return (
            <button
              key={i}
              className={`opt ${extra}`}
              disabled={wasAnswered}
              onClick={() => manejarRespuesta(opt)}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {usuarioRespuesta && (
        <div className="feedback">
          {usuarioRespuesta.choice === pregunta.correct ? (
            <span className="ok">¡Correcto!</span>
          ) : (
            <span className="bad">Incorrecto.</span>
          )}
          <span className="muted"> Respuesta: <strong>{pregunta.correct}</strong></span>
        </div>
      )}
    </div>
  );
}
