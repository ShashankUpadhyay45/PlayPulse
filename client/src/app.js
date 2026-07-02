// client/src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SplashScreen from "./components/SplashScreen";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Stats from "./pages/Stats";
import Contact from "./pages/Contact";
import GameDetails from "./pages/GameDetails";
import PlayerStats from "./pages/PlayerStats";
import MiniGames from "./pages/MiniGames";

// ✅ Mini Games
import TicTacToe from "./games/TicTacToe";
import SnakeGame from "./games/SnakeGame";
import RockPaperScissors from "./games/RockPaperScissors";
import Game2048 from "./games/Game2048";

import "./styles.css";

export default function App() {
  const [dark, setDark] = useState(false);

  return (
    <>
      <SplashScreen />

      <div className={`app ${dark ? "dark" : ""}`}>
        <Router>
          <Navbar dark={dark} setDark={setDark} />

          <main className="main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/stats" element={<Stats />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/game/:id" element={<GameDetails />} />
              <Route path="/game/player/:pid/:sport" element={<PlayerStats />} />
              <Route path="/minigames" element={<MiniGames />} />

              {/* ✅ Mini Games */}
              <Route path="/mini/tictactoe" element={<TicTacToe />} />
              <Route path="/mini/snake" element={<SnakeGame />} />
              <Route path="/mini/rps" element={<RockPaperScissors />} />
              <Route path="/mini/2048" element={<Game2048 />} />
            </Routes>
          </main>

          <footer className="footer">
            © 2026 PlayPulse. All rights reserved.
          </footer>
        </Router>
      </div>
    </>
  );
}
