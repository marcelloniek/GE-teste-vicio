"use client";

import { useState } from 'react';

const perguntas = [
  "Ich habe Schwierigkeiten, Gewohnheiten oder Verhaltensweisen zu kontrollieren oder zu stoppen, die ich als schädlich für mein Leben wahrnehme.",
  "Wenn ich versuche, bestimmte Verhaltensweisen zu stoppen oder zu reduzieren, empfinde ich Angst, Reizbarkeit oder erhebliches emotionales Unwohlsein.",
  "Ich hatte bereits familiäre, soziale oder berufliche Probleme, die direkt mit meinen repetitiven Verhaltensweisen oder Abhängigkeiten zusammenhängen.",
  "Ich verbringe viel Zeit meines Tages damit, über bestimmte Verhaltensweisen nachzudenken oder sie zu planen, obwohl ich weiß, dass sie nicht gesund sind.",
  "Ich habe schon oft versucht, ein bestimmtes Verhalten zu beenden, aber ich kehre immer wieder zwanghaft zu dieser Gewohnheit zurück.",
  "In letzter Zeit führten meine zwanghaften Verhaltensweisen oder Abhängigkeiten dazu, dass ich ernsthaft daran dachte, mir das Leben zu nehmen oder mich selbst zu verletzen.", // FLAG
  "Ich empfinde erhebliche Scham oder Schuldgefühle wegen meiner zwanghaften oder abhängigen Verhaltensweisen.",
  "Ich habe körperliche oder finanzielle Schäden durch meine repetitiven Verhaltensweisen oder Abhängigkeiten erlitten.",
  "Ich lüge oft oder verheimliche meine Gewohnheiten oder Abhängigkeiten vor nahestehenden Menschen aus Angst vor Verurteilung oder Zurechtweisung.",
  "Obwohl ich weiß, dass ich Hilfe brauche, fällt es mir sehr schwer, um Unterstützung zu bitten oder mein Problem jemandem gegenüber einzugestehen."
];

export default function TesteVicio() {
  const [respostas, setRespostas] = useState(Array(10).fill(0));
  const [resultado, setResultado] = useState(null);
  const [indiceAtual, setIndiceAtual] = useState(0);

  const registrarResposta = (valor) => {
    const novasRespostas = [...respostas];
    novasRespostas[indiceAtual] = valor;
    setRespostas(novasRespostas);

    if (indiceAtual < perguntas.length - 1) {
      setIndiceAtual(indiceAtual + 1);
    } else {
      calcularResultado(novasRespostas);
    }
  };

  const calcularResultado = (respostas) => {
    if (respostas[5] >= 3) { // FLAG
      setResultado("ROT");
    } else {
      const soma = respostas.reduce((a, b) => a + b, 0);
      if (soma <= 20) setResultado("GRÜN");
      else if (soma <= 35) setResultado("GELB");
      else setResultado("ROT");
    }
  };

  const reiniciarTeste = () => {
    setRespostas(Array(10).fill(0));
    setResultado(null);
    setIndiceAtual(0);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md">
      {!resultado ? (
        <>
          <h2 className="text-xl font-semibold mb-4">Sucht-Test</h2>
          <p className="mb-4">{perguntas[indiceAtual]}</p>
          <div className="flex justify-between">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-700"
                onClick={() => registrarResposta(num)}
              >
                {num}
              </button>
            ))}
          </div>
          <p className="mt-4 text-sm">Frage {indiceAtual + 1} von {perguntas.length}</p>
        </>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-4">Ergebnis: {resultado}</h2>
          {resultado === "GRÜN" && <p>Sie kommen mit diesem Thema gut zurecht und sind emotional stabil. Sie könnten anderen Menschen, die Hilfe benötigen, eine große Unterstützung sein.</p>}
          {resultado === "GELB" && <p>Es gibt deutliche Anzeichen emotionaler Schwierigkeiten, die bearbeitet werden sollten und mit Entschlossenheit und Unterstützung überwunden werden können.</p>}
          {resultado === "ROT" && <p>Ihre emotionalen Schwierigkeiten in diesem Bereich erfordern unbedingt professionelle Hilfe. Bitte suchen Sie baldmöglichst einen Arzt oder Psychologen auf.</p>}
          <button
            className="mt-4 px-4 py-2 bg-green-500 dark:bg-green-600 text-white rounded hover:bg-green-600 dark:hover:bg-green-700"
            onClick={reiniciarTeste}
          >
            Test neu starten
          </button>
        </>
      )}
    </div>
  );
}
