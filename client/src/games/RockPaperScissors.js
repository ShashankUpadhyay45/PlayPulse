import React, { useState } from "react";
import "./GameStyles.css";

const choices = ["Rock", "Paper", "Scissors"];

export default function RockPaperScissors() {
  const [player, setPlayer] = useState(null);
  const [bot, setBot] = useState(null);
  const [result, setResult] = useState("");

  const play = (choice) => {
    const botChoice = choices[Math.floor(Math.random() * 3)];
    setPlayer(choice);
    setBot(botChoice);

    if (choice === botChoice) setResult("It's a Draw!");
    else if (
      (choice === "Rock" && botChoice === "Scissors") ||
      (choice === "Paper" && botChoice === "Rock") ||
      (choice === "Scissors" && botChoice === "Paper")
    )
      setResult("You Win! 🎉");
    else setResult("Bot Wins! 🤖");
  };

  return (
    <div className="game-container">
      <h2>Rock Paper Scissors ✊📄✂️</h2>
      <p>Choose your move:</p>
      <div className="rps-buttons">
        {choices.map((c) => (
          <button key={c} onClick={() => play(c)}>
            {c}
          </button>
        ))}
      </div>
      {player && (
        <div>
          <p>You: {player}</p>
          <p>Bot: {bot}</p>
          <h3>{result}</h3>
        </div>
      )}
      <div className="rules">
        <h3>Rules</h3>
        <ul>
          <li>Rock beats Scissors.</li>
          <li>Scissors beat Paper.</li>
          <li>Paper beats Rock.</li>
          <li>Try to outsmart the bot!</li>
        </ul>
      </div>
    </div>
  );
}
