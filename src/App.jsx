import React from "react";
import Quiz from "./components/Quiz.jsx";
import "./style/index.css";

export default function App() {
  return (
    <main className="container">
      <header className="row space-between">
        <h1>Country Quiz</h1>
      </header>
      <Quiz />
      <footer className="footer muted small">Datos por restcountries.com</footer>
    </main>
  );
}
