import React, { useState, useEffect } from "react";
import "./GameStyles.css";

const GRID_SIZE = 4;

function randomEmptyCell(grid) {
  const empty = [];
  grid.forEach((row, r) =>
    row.forEach((cell, c) => {
      if (!cell) empty.push([r, c]);
    })
  );
  return empty.length ? empty[Math.floor(Math.random() * empty.length)] : null;
}

export default function Game2048() {
  const [grid, setGrid] = useState(Array(GRID_SIZE).fill().map(() => Array(GRID_SIZE).fill(0)));
  const [score, setScore] = useState(0);

  const addRandomTile = (g) => {
    const cell = randomEmptyCell(g);
    if (!cell) return g;
    const [r, c] = cell;
    g[r][c] = Math.random() < 0.9 ? 2 : 4;
    return [...g];
  };

  const restart = () => {
    const newGrid = Array(GRID_SIZE).fill().map(() => Array(GRID_SIZE).fill(0));
    addRandomTile(addRandomTile(newGrid));
    setGrid(newGrid);
    setScore(0);
  };

  useEffect(() => restart(), []);

  const slide = (row) => {
    const arr = row.filter((v) => v);
    while (arr.length < GRID_SIZE) arr.push(0);
    return arr;
  };

  const combine = (row) => {
    for (let i = 0; i < GRID_SIZE - 1; i++) {
      if (row[i] && row[i] === row[i + 1]) {
        row[i] *= 2;
        row[i + 1] = 0;
        setScore((s) => s + row[i]);
      }
    }
    return row;
  };

  const move = (dir) => {
    let newGrid = grid.map((row) => [...row]);
    const rotate = () => newGrid[0].map((_, i) => newGrid.map((r) => r[i]).reverse());

    for (let i = 0; i < dir; i++) newGrid = rotate();

    newGrid = newGrid.map((row) => combine(slide(row)));
    newGrid = newGrid.map((row) => slide(row));
    for (let i = 0; i < (4 - dir) % 4; i++) newGrid = rotate();

    addRandomTile(newGrid);
    setGrid([...newGrid]);
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") move(0);
      if (e.key === "ArrowUp") move(1);
      if (e.key === "ArrowRight") move(2);
      if (e.key === "ArrowDown") move(3);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  return (
    <div className="game-container">
      <h2>2048 🔢</h2>
      <p>Score: {score}</p>
      <div className="grid2048">
        {grid.map((row, r) =>
          row.map((v, c) => (
            <div key={`${r}-${c}`} className={`tile ${v ? "t" + v : ""}`}>
              {v || ""}
            </div>
          ))
        )}
      </div>
      <button className="reset-btn" onClick={restart}>Restart</button>

      <div className="rules">
        <h3>Rules</h3>
        <ul>
          <li>Use arrow keys to move tiles.</li>
          <li>Merge equal tiles to form higher numbers.</li>
          <li>Try to reach 2048!</li>
        </ul>
      </div>
    </div>
  );
}
