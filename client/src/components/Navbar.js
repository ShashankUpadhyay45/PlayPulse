// client/src/components/Navbar.js
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../logo.png";
import { FaBars, FaTimes, FaGamepad, FaHome, FaRunning, FaEnvelope, FaMoon, FaSun } from "react-icons/fa";

export default function Navbar({ dark, setDark }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleExit = () => {
    if (window.confirm("Exit the app? This will attempt to close the window.")) {
      window.close();
      setTimeout(() => {
        alert("If the window didn't close automatically, please close this tab manually.");
      }, 500);
    }
  };

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <header className="navbar">
      <Link to="/" className="brand" onClick={() => setOpen(false)}>
        <img src={logo} alt="PlayPulse logo" className="logo" />
        <div className="brand-text">PlayPulse</div>
      </Link>

      <nav className="navlinks">
        <Link to="/" className={isActive("/")}>Home</Link>
        <Link to="/stats" className={isActive("/stats")}>Stats</Link>
        <Link to="/minigames" className={isActive("/minigames")}>FunZone</Link>
        <Link to="/contact" className={isActive("/contact")}>Contact</Link>
      </nav>

      <div className="menu">
        <button
          className="menu-btn"
          onClick={() => setOpen((v) => !v)}
          aria-label="menu"
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>

        {open && (
          <div className="menu-pop">
            <button onClick={() => { navigate("/"); setOpen(false); }}>
              <FaHome /> Home Feed
            </button>
            <button onClick={() => { navigate("/stats"); setOpen(false); }}>
              <FaRunning /> Player Stats
            </button>
            <button onClick={() => { navigate("/minigames"); setOpen(false); }}>
              <FaGamepad /> FunZone Games
            </button>
            <button onClick={() => { navigate("/contact"); setOpen(false); }}>
              <FaEnvelope /> Contact & Info
            </button>
            <button onClick={() => { setDark(!dark); setOpen(false); }}>
              {dark ? <FaSun style={{ color: "#fbbf24" }} /> : <FaMoon style={{ color: "#a5b4fc" }} />}
              {dark ? "Light Theme" : "Dark Theme"}
            </button>
            <button style={{ color: "#f43f5e", borderTop: "1px solid rgba(255,255,255,0.05)", marginTop: "6px", paddingTop: "12px" }} onClick={handleExit}>
              ⏻ Close App
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
