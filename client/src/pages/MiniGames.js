// client/src/pages/MiniGames.js
import React, { useState, useEffect } from "react";
import { FaHeart, FaKeyboard, FaTrophy, FaArrowLeft } from "react-icons/fa";

export default function MiniGames() {
  const [selected, setSelected] = useState(null);

  return (
    <section className="container" style={{ position: "relative", zIndex: 10 }}>
      <div className="hero-box" style={{ padding: "30px 20px", marginBottom: "24px" }}>
        <h1>🎮 PlayPulse FunZone</h1>
        <p className="subtitle">Take a quick break and challenge yourself with our mini-games!</p>
      </div>

      {selected && (
        <button
          className="tab-btn"
          onClick={() => setSelected(null)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "20px",
            background: "rgba(255, 255, 255, 0.05)"
          }}
        >
          <FaArrowLeft /> Back to Games List
        </button>
      )}

      {!selected && (
        <div className="mini-grid">
          <div className="mini-card" style={{ cursor: "pointer" }} onClick={() => setSelected("wordle")}>
            <div className="game-icon">🔠</div>
            <h3>Wordle Guess</h3>
            <p style={{ fontSize: "12px", color: "#64748b", margin: "6px 0 0 0" }}>Guess the 5-letter sports word in 6 attempts.</p>
          </div>

          <div className="mini-card" style={{ cursor: "pointer" }} onClick={() => setSelected("mole")}>
            <div className="game-icon">🔨</div>
            <h3>Whack-a-Mole</h3>
            <p style={{ fontSize: "12px", color: "#64748b", margin: "6px 0 0 0" }}>Test your reflexes! Hit the moles before time runs out.</p>
          </div>

          <div className="mini-card" style={{ cursor: "pointer" }} onClick={() => setSelected("rps")}>
            <div className="game-icon">✊</div>
            <h3>Rock-Paper-Scissors</h3>
            <p style={{ fontSize: "12px", color: "#64748b", margin: "6px 0 0 0" }}>Classic hand game. Build up a winning streak!</p>
          </div>

          <div className="mini-card" style={{ cursor: "pointer" }} onClick={() => setSelected("2048")}>
            <div className="game-icon">🔢</div>
            <h3>2048 Puzzle</h3>
            <p style={{ fontSize: "12px", color: "#64748b", margin: "6px 0 0 0" }}>Slide matching number tiles to reach 2048.</p>
          </div>

          <div className="mini-card" style={{ cursor: "pointer" }} onClick={() => setSelected("tictactoe")}>
            <div className="game-icon">❌</div>
            <h3>Tic Tac Toe</h3>
            <p style={{ fontSize: "12px", color: "#64748b", margin: "6px 0 0 0" }}>Two player classic game on a 3x3 board.</p>
          </div>

          <div className="mini-card" style={{ cursor: "pointer" }} onClick={() => setSelected("memory")}>
            <div className="game-icon">🧠</div>
            <h3>Memory Match</h3>
            <p style={{ fontSize: "12px", color: "#64748b", margin: "6px 0 0 0" }}>Flip cards and match identical emoji pairs.</p>
          </div>
        </div>
      )}

      {selected === "wordle" && <WordleGame />}
      {selected === "mole" && <WhackAMoleGame />}
      {selected === "rps" && <RockPaperScissors />}
      {selected === "2048" && <Game2048 />}
      {selected === "tictactoe" && <TicTacToe />}
      {selected === "memory" && <MemoryMatch />}
    </section>
  );
}

/* ================================
   1. WORDLE GUESS GAME
================================ */
function WordleGame() {
  const words = ["SPORT", "MATCH", "SCORE", "PULSE", "BOARD", "COURT", "TRACK", "FIELD"];
  const [target, setTarget] = useState(() => words[Math.floor(Math.random() * words.length)]);
  const [guesses, setGuesses] = useState(Array(6).fill(""));
  const [current, setCurrent] = useState("");
  const [row, setRow] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  useEffect(() => {
    if (gameOver) return;
    const handleKey = (e) => {
      if (e.key === "Enter") {
        if (current.length === 5) {
          const newGuesses = [...guesses];
          newGuesses[row] = current.toUpperCase();
          setGuesses(newGuesses);
          if (current.toUpperCase() === target) {
            setWon(true);
            setGameOver(true);
          } else if (row === 5) {
            setGameOver(true);
          } else {
            setRow(row + 1);
            setCurrent("");
          }
        }
      } else if (e.key === "Backspace") {
        setCurrent(current.slice(0, -1));
      } else if (/^[a-zA-Z]$/.test(e.key) && current.length < 5) {
        setCurrent(current + e.key.toUpperCase());
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [current, row, gameOver]);

  const restart = () => {
    setTarget(words[Math.floor(Math.random() * words.length)]);
    setGuesses(Array(6).fill(""));
    setCurrent("");
    setRow(0);
    setGameOver(false);
    setWon(false);
  };

  const getLetterClass = (gWord, letter, index) => {
    if (!gWord) return "";
    if (gWord[index] === target[index]) return "correct"; // Green
    if (target.includes(gWord[index])) return "present"; // Yellow
    return "absent"; // Gray
  };

  return (
    <div className="player-card" style={{ maxWidth: "500px", margin: "auto", textAlign: "center" }}>
      <h2>🔠 Wordle Guess</h2>
      <p style={{ color: "#94a3b8" }}>Type letters and press <strong>Enter</strong> to submit guesses</p>

      <div style={{ display: "grid", gap: "6px", margin: "20px 0" }}>
        {guesses.map((g, rIndex) => {
          const word = rIndex === row ? current.padEnd(5, " ") : g.padEnd(5, " ");
          return (
            <div key={rIndex} style={{ display: "flex", justifyContent: "center", gap: "6px" }}>
              {Array.from(word).map((char, cIndex) => {
                const isSubmitted = rIndex < row;
                const statusClass = isSubmitted ? getLetterClass(g, char, cIndex) : "";
                return (
                  <div
                    key={cIndex}
                    className={`wordle-cell ${statusClass}`}
                    style={{
                      width: "48px",
                      height: "48px",
                      border: "2px solid rgba(255, 255, 255, 0.15)",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "20px",
                      fontWeight: "800",
                      textTransform: "uppercase",
                      color: "#fff",
                      background: statusClass === "correct" ? "#22c55e" : statusClass === "present" ? "#eab308" : statusClass === "absent" ? "#334155" : "transparent"
                    }}
                  >
                    {char.trim()}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {gameOver && (
        <div style={{ margin: "20px 0" }}>
          <h3>{won ? "🎉 Correct! You guessed the word!" : `😢 Game Over! The word was ${target}`}</h3>
          <button className="tab-btn active" onClick={restart} style={{ marginTop: "10px" }}>Play Again</button>
        </div>
      )}
    </div>
  );
}

/* ================================
   2. WHACK-A-MOLE GAME
================================ */
function WhackAMoleGame() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [activeMole, setActiveMole] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [highScore, setHighScore] = useState(() => Number(localStorage.getItem("mole_best")) || 0);

  useEffect(() => {
    if (!playing) return;
    if (timeLeft === 0) {
      setPlaying(false);
      setActiveMole(null);
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem("mole_best", score);
      }
      return;
    }

    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, playing]);

  useEffect(() => {
    if (!playing) return;
    const moleTimer = setInterval(() => {
      const randomMole = Math.floor(Math.random() * 9);
      setActiveMole(randomMole);
    }, 900);

    return () => clearInterval(moleTimer);
  }, [playing]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setPlaying(true);
  };

  const handleWhack = (index) => {
    if (index === activeMole) {
      setScore(score + 10);
      setActiveMole(null); // hide mole
    }
  };

  return (
    <div className="player-card" style={{ maxWidth: "500px", margin: "auto", textAlign: "center" }}>
      <h2>🔨 Whack-a-Mole</h2>
      <div style={{ display: "flex", justifyContent: "space-around", margin: "16px 0", color: "#94a3b8" }}>
        <span>Score: <strong style={{ color: "#fff" }}>{score}</strong></span>
        <span>Time Left: <strong style={{ color: "#f43f5e" }}>{timeLeft}s</strong></span>
        <span>Best: <strong style={{ color: "#ec4899" }}>{highScore}</strong></span>
      </div>

      {!playing ? (
        <div style={{ padding: "40px 0" }}>
          <h3>{timeLeft === 0 ? `Finished! Final Score: ${score}` : "Hit the glowing moles when they pop up!"}</h3>
          <button className="tab-btn active" onClick={startGame} style={{ marginTop: "16px" }}>Start Game</button>
        </div>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "12px",
          maxWidth: "300px",
          margin: "20px auto"
        }}>
          {Array(9).fill(null).map((_, i) => (
            <div
              key={i}
              onClick={() => handleWhack(i)}
              style={{
                aspectRatio: "1",
                background: "rgba(15, 23, 42, 0.4)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "36px",
                cursor: "pointer",
                boxShadow: i === activeMole ? "0 0 20px rgba(99, 102, 241, 0.6)" : "none",
                background: i === activeMole ? "linear-gradient(135deg, #6366f1, #4f46e5)" : "rgba(15, 23, 42, 0.4)"
              }}
            >
              {i === activeMole ? "🐹" : ""}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ================================
   3. ROCK PAPER SCISSORS
================================ */
function RockPaperScissors() {
  const choices = ["rock", "paper", "scissors"];
  const [user, setUser] = useState(null);
  const [computer, setComputer] = useState(null);
  const [result, setResult] = useState("");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => Number(localStorage.getItem("rps_best")) || 0);

  const play = (choice) => {
    const comp = choices[Math.floor(Math.random() * 3)];
    setUser(choice);
    setComputer(comp);

    if (choice === comp) setResult("It's a draw!");
    else if (
      (choice === "rock" && comp === "scissors") ||
      (choice === "paper" && comp === "rock") ||
      (choice === "scissors" && comp === "paper")
    ) {
      setResult("You win! 🎉");
      const newScore = score + 1;
      setScore(newScore);
      if (newScore > best) {
        setBest(newScore);
        localStorage.setItem("rps_best", newScore);
      }
    } else {
      setResult("You lose 😢");
      setScore(0);
    }
  };

  return (
    <div className="player-card" style={{ maxWidth: "500px", margin: "auto", textAlign: "center" }}>
      <h2>✊ Rock–Paper–Scissors</h2>
      <p style={{ color: "#94a3b8" }}>Streak: {score} | Best Streak: {best}</p>
      <div style={{ display: "flex", justifyContent: "center", gap: "10px", margin: "20px 0" }}>
        {choices.map((c) => (
          <button className="tab-btn" key={c} onClick={() => play(c)}>
            {c.toUpperCase()}
          </button>
        ))}
      </div>
      {user && (
        <div style={{ margin: "20px 0", padding: "16px", background: "rgba(255,255,255,0.03)", borderRadius: "16px" }}>
          <p>You chose: <strong>{user.toUpperCase()}</strong></p>
          <p>Computer chose: <strong>{computer.toUpperCase()}</strong></p>
          <h3 style={{ color: result.includes("win") ? "#22c55e" : result.includes("lose") ? "#f43f5e" : "#94a3b8" }}>{result}</h3>
        </div>
      )}
    </div>
  );
}

/* ================================
   4. 2048 GAME
================================ */
function Game2048() {
  const [board, setBoard] = useState(createEmptyBoard());
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => Number(localStorage.getItem("2048_best")) || 0);

  useEffect(() => {
    addRandomTile(board);
    addRandomTile(board);
    setBoard([...board]);
    const handleKey = (e) => {
      let moved = false;
      switch (e.key) {
        case "ArrowLeft":
          moved = moveLeft(board, updateScore);
          break;
        case "ArrowRight":
          moved = moveRight(board, updateScore);
          break;
        case "ArrowUp":
          moved = moveUp(board, updateScore);
          break;
        case "ArrowDown":
          moved = moveDown(board, updateScore);
          break;
        default:
          break;
      }
      if (moved) addRandomTile(board);
      setBoard([...board]);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const updateScore = (val) => {
    setScore((prev) => {
      const newScore = prev + val;
      if (newScore > best) {
        setBest(newScore);
        localStorage.setItem("2048_best", newScore);
      }
      return newScore;
    });
  };

  return (
    <div className="player-card" style={{ maxWidth: "450px", margin: "auto", textAlign: "center" }}>
      <h2>🔢 2048 Puzzle</h2>
      <p style={{ color: "#94a3b8" }}>Use <strong>arrow keys</strong> to slide matching tiles together</p>
      <p>Score: {score} | Best: {best}</p>
      
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "8px",
        background: "rgba(15, 23, 42, 0.4)",
        padding: "10px",
        borderRadius: "16px",
        margin: "20px auto",
        maxWidth: "300px"
      }}>
        {board.flat().map((cell, i) => (
          <div
            key={i}
            style={{
              aspectRatio: "1",
              background: cell ? "linear-gradient(135deg, #6366f1, #4f46e5)" : "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.05)",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
              fontWeight: "800",
              color: "#fff"
            }}
          >
            {cell || ""}
          </div>
        ))}
      </div>
    </div>
  );
}

function createEmptyBoard() {
  return Array(4).fill().map(() => Array(4).fill(0));
}
function addRandomTile(board) {
  const empty = [];
  for (let r = 0; r < 4; r++)
    for (let c = 0; c < 4; c++)
      if (!board[r][c]) empty.push([r, c]);
  if (empty.length) {
    const [r, c] = empty[Math.floor(Math.random() * empty.length)];
    board[r][c] = Math.random() < 0.9 ? 2 : 4;
  }
}
function compress(row) {
  const arr = row.filter((x) => x);
  while (arr.length < 4) arr.push(0);
  return arr;
}
function merge(row, setScore) {
  for (let i = 0; i < 3; i++) {
    if (row[i] && row[i] === row[i + 1]) {
      row[i] *= 2;
      setScore(row[i]);
      row[i + 1] = 0;
    }
  }
  return row;
}
function moveLeft(board, setScore) {
  let moved = false;
  for (let r = 0; r < 4; r++) {
    let row = compress(board[r]);
    const merged = merge(row, setScore);
    row = compress(merged);
    if (row.toString() !== board[r].toString()) moved = true;
    board[r] = row;
  }
  return moved;
}
function moveRight(board, setScore) {
  let moved = false;
  for (let r = 0; r < 4; r++) {
    let row = compress([...board[r]].reverse());
    const merged = merge(row, setScore);
    row = compress(merged).reverse();
    if (row.toString() !== board[r].toString()) moved = true;
    board[r] = row;
  }
  return moved;
}
function moveUp(board, setScore) {
  let moved = false;
  for (let c = 0; c < 4; c++) {
    const col = [board[0][c], board[1][c], board[2][c], board[3][c]];
    let compressed = compress(col);
    const merged = merge(compressed, setScore);
    compressed = compress(merged);
    for (let r = 0; r < 4; r++)
      if (board[r][c] !== compressed[r]) {
        board[r][c] = compressed[r];
        moved = true;
      }
  }
  return moved;
}
function moveDown(board, setScore) {
  let moved = false;
  for (let c = 0; c < 4; c++) {
    const col = [board[3][c], board[2][c], board[1][c], board[0][c]];
    let compressed = compress(col);
    const merged = merge(compressed, setScore);
    compressed = compress(merged).reverse();
    for (let r = 0; r < 4; r++)
      if (board[r][c] !== compressed[r]) {
        board[r][c] = compressed[r];
        moved = true;
      }
  }
  return moved;
}

/* ================================
   5. TIC TAC TOE
================================ */
function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const winner = calculateWinner(board);

  const handleClick = (i) => {
    if (board[i] || winner) return;
    const newBoard = [...board];
    newBoard[i] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <div className="player-card" style={{ maxWidth: "450px", margin: "auto", textAlign: "center" }}>
      <h2>❌ Tic Tac Toe</h2>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "10px",
        maxWidth: "240px",
        margin: "20px auto"
      }}>
        {board.map((cell, i) => (
          <div
            key={i}
            onClick={() => handleClick(i)}
            style={{
              aspectRatio: "1",
              background: "rgba(15, 23, 42, 0.4)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
              fontWeight: "800",
              color: cell === "X" ? "#6366f1" : "#ec4899",
              cursor: "pointer"
            }}
          >
            {cell}
          </div>
        ))}
      </div>
      <p style={{ color: "#94a3b8" }}>{winner ? `Winner: ${winner} 🎉` : `Next player: ${xIsNext ? "X" : "O"}`}</p>
      <button onClick={resetGame} className="tab-btn active" style={{ marginTop: "10px" }}>Restart</button>
    </div>
  );
}
function calculateWinner(b) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  for (let [a, b1, c] of lines)
    if (b[a] && b[a] === b[b1] && b[a] === b[c]) return b[a];
  return null;
}

/* ================================
   6. MEMORY MATCH
================================ */
function MemoryMatch() {
  const emojis = ["🍎", "🍌", "🍇", "🍒", "🍎", "🍌", "🍇", "🍒"];
  const [cards, setCards] = useState(shuffle(emojis.map((e, i) => ({ id: i, emoji: e, flipped: false, matched: false }))));
  const [first, setFirst] = useState(null);
  const [second, setSecond] = useState(null);

  useEffect(() => {
    if (first && second) {
      if (first.emoji === second.emoji) {
        setCards((prev) =>
          prev.map((c) =>
            c.emoji === first.emoji ? { ...c, matched: true } : c
          )
        );
      }
      setTimeout(() => {
        setCards((prev) =>
          prev.map((c) =>
            c.id === first.id || c.id === second.id
              ? { ...c, flipped: false }
              : c
          )
        );
        setFirst(null);
        setSecond(null);
      }, 1000);
    }
  }, [second]);

  const flipCard = (card) => {
    if (first && second || card.flipped || card.matched) return;
    setCards((prev) =>
      prev.map((c) =>
        c.id === card.id ? { ...c, flipped: true } : c
      )
    );
    if (!first) setFirst(card);
    else setSecond(card);
  };

  return (
    <div className="player-card" style={{ maxWidth: "450px", margin: "auto", textAlign: "center" }}>
      <h2>🧠 Memory Match</h2>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "10px",
        maxWidth: "300px",
        margin: "20px auto"
      }}>
        {cards.map((c) => (
          <div
            key={c.id}
            onClick={() => flipCard(c)}
            style={{
              aspectRatio: "1",
              background: c.flipped || c.matched ? "linear-gradient(135deg, #6366f1, #4f46e5)" : "rgba(15, 23, 42, 0.4)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              cursor: "pointer"
            }}
          >
            {c.flipped || c.matched ? c.emoji : "?"}
          </div>
        ))}
      </div>
    </div>
  );
}
function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}
