import React, { useState, useEffect, useRef } from "react";
import "./GameStyles.css";

const gridSize = 20;

export default function SnakeGame() {
  const [snake, setSnake] = useState([[8,8]]);
  const [food, setFood] = useState([10,10]);
  const [dir, setDir] = useState([1,0]);
  const [gameOver, setGameOver] = useState(false);
  const boardRef = useRef(null);

  const move = () => {
    if (gameOver) return;
    const newSnake = [...snake];
    const head = [...newSnake[newSnake.length-1]];
    head[0] += dir[0];
    head[1] += dir[1];

    // collision
    if (
      head[0] < 0 || head[1] < 0 ||
      head[0] >= gridSize || head[1] >= gridSize ||
      newSnake.some((s) => s[0] === head[0] && s[1] === head[1])
    ) {
      setGameOver(true);
      return;
    }

    newSnake.push(head);
    if (head[0] === food[0] && head[1] === food[1]) {
      setFood([
        Math.floor(Math.random() * gridSize),
        Math.floor(Math.random() * gridSize)
      ]);
    } else {
      newSnake.shift();
    }
    setSnake(newSnake);
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowUp") setDir([0,-1]);
      if (e.key === "ArrowDown") setDir([0,1]);
      if (e.key === "ArrowLeft") setDir([-1,0]);
      if (e.key === "ArrowRight") setDir([1,0]);
    };
    window.addEventListener("keydown", handleKey);
    const timer = setInterval(move, 200);
    return () => {
      window.removeEventListener("keydown", handleKey);
      clearInterval(timer);
    };
  });

  const restart = () => {
    setSnake([[8,8]]);
    setFood([10,10]);
    setDir([1,0]);
    setGameOver(false);
  };

  return (
    <div className="game-container">
      <h2>Snake Game 🐍</h2>
      {gameOver ? <p>Game Over! Score: {snake.length - 1}</p> : <p>Use arrow keys to move!</p>}
      <div
        className="snake-board"
        ref={boardRef}
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${gridSize}, 20px)`,
          gap: "2px",
        }}
      >
        {[...Array(gridSize * gridSize)].map((_, i) => {
          const x = i % gridSize;
          const y = Math.floor(i / gridSize);
          const isSnake = snake.some((s) => s[0] === x && s[1] === y);
          const isFood = food[0] === x && food[1] === y;
          return (
            <div
              key={i}
              className={
                isSnake ? "cell snake" : isFood ? "cell food" : "cell"
              }
            />
          );
        })}
      </div>
      <button className="reset-btn" onClick={restart}>Restart</button>

      <div className="rules">
        <h3>Rules</h3>
        <ul>
          <li>Use arrow keys to move the snake.</li>
          <li>Eat the red food to grow.</li>
          <li>Don’t hit walls or yourself!</li>
          <li>Each food increases your score by 1.</li>
        </ul>
      </div>
    </div>
  );
}
