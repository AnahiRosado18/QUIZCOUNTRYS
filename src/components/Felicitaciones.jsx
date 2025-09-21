import React from "react";

export default function Felicitaciones({ respuestascorrectas, preguntastotales, manejarReproducirDeNuevo }) {
  const pct = Math.round((respuestascorrectas / preguntastotales) * 100);
  return (
    <div className="center">
      <div><img src="./assets/congrats.svg" alt="" />🎉</div>
      <h2>Congrats! You completed the quiz.</h2>
      <div className="score">You answer {respuestascorrectas}/{preguntastotales}  correctly.</div>
      <button className="btn primary" onClick={manejarReproducirDeNuevo}>Play again</button>
    </div>
  );
}
