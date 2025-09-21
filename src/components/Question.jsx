import React from "react";

export default function Pregunta({ pregunta, usuarioRespuesta, manejarRespuesta }) {
  const wasAnswered = usuarioRespuesta != null;

  return (
    <div>

      <p className="prompt" style={{ textAlign: "center", fontSize:"large" }} >{pregunta.prompt}</p>

      {/* Bandera centrada */}
      {pregunta.mediaFlag && (
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <img src={pregunta.mediaFlag} alt="Bandera" className="flag" />
        </div>
      )}

      <div className="options two-cols">
        {pregunta.options.map((opt, i) => {
          const chosen = usuarioRespuesta?.choice === opt;
          const isCorrect = pregunta.correct === opt;

          
          const stateClass = chosen ? "opt-selected" : "";

          
          const showCheck = wasAnswered && isCorrect;                
          const showCross = wasAnswered && chosen && !isCorrect;      

          return (
            <button
              key={i}
              className={`opt ${stateClass}`}
              disabled={wasAnswered}
              onClick={() => manejarRespuesta(opt)}
              aria-pressed={chosen ? "true" : "false"}
            >
              <span className="opt-label">{opt}</span>

              {showCheck && (
                <span className="opt-mark ok" aria-hidden="true">
                  <img src="/Check_round_fill.svg" alt="Correcto" />
                </span>
              )}
              {showCross && (
                <span className="opt-mark bad" aria-hidden="true">
                  <img src="/Close_round_fill.svg" alt="Incorrecto" />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}



