import React from "react";

export default function Felicitaciones({ respuestascorrectas, preguntastotales, manejarReproducirDeNuevo }) {
  const pct = Math.round((respuestascorrectas / preguntastotales) * 100);
  return (
    <div className="result-card">
      <div>
        <img src="/congrats.png" alt="🎉" />
      </div>
      <h2 style={{ marginBottom: "5vh", fontWeight: "400"}}>Congrats! You completed the quiz.</h2>
      <div className="score" style={{ marginBottom: "5vh"}}>You answer {respuestascorrectas}/{preguntastotales}  correctly.</div>
      <button className="btn-fin" style={{ fontWeight: "400"}} onClick={manejarReproducirDeNuevo}>Play again</button>
    </div>
  );
}

