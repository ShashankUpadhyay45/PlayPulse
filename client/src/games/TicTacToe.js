import React, { useState, useEffect } from "react";
import "./GameStyles.css";

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [message, setMessage] = useState("Your turn (X)");

  const checkWinner = (b) => {
    const lines = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ];
    for (let [a,b_,c] of lines) {
      if (b[a] && b[a] === b[b_] && b[a] === b[c]) return b[a];
    }
    return null;
  };

  const handleClick = (i) => {
    if (!xIsNext || board[i] || checkWinner(board)) return;
    const newBoard = [...board];
    newBoard[i] = "X";
    setBoard(newBoard);
    setXIsNext(false);
  };

  const botMove = (b) => {
    const empty = b.map((v, i) => (v ? null : i)).filter((x) => x !== null);
    if (empty.length === 0) return b;
    const move = empty[Math.floor(Math.random() * empty.length)];
    const newBoard = [...b];
    newBoard[move] = "O";
    return newBoard;
  };

  useEffect(() => {
    const winner = checkWinner(board);
    if (winner) {
      setMessage(`${winner === "X" ? "You" : "Bot"} win!`);
      return;
    }
    if (board.every((b) => b)) {
      setMessage("Draw!");
      return;
    }
    if (!xIsNext) {
      setTimeout(() => {
        const botBoard = botMove(board);
        setBoard(botBoard);
        setXIsNext(true);
      }, 600);
    } else {
      setMessage("Your turn (X)");
    }
  }, [board, xIsNext]);

  const reset = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setMessage("Your turn (X)");
  };

  return (
    <div className="game-container">
      <h2>Tic Tac Toe 🤖</h2>
      <p>{message}</p>
      <div className="tictactoe-board">
        {board.map((v, i) => (
          <button key={i} onClick={() => handleClick(i)}>{v}</button>
        ))}
      </div>
      <button className="reset-btn" onClick={reset}>Restart</button>

      <div className="rules">
        <h3>Rules</h3>
        <ul>
          <li>You play as “X”, the bot plays as “O”.</li>
          <li>Take turns placing marks on a 3x3 grid.</li>
          <li>Get three in a row to win!</li>
          <li>The bot will make random valid moves.</li>
        </ul>
      </div>
    </div>
  );
}
