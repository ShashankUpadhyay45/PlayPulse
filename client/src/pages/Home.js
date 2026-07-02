// client/src/pages/Home.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaRegCalendarAlt, FaRegClock, FaTrophy, FaArrowRight, FaSearch } from "react-icons/fa";
import { getMatches } from "../utils/fetchLiveWidget";

export default function Home() {
  const [activeTab, setActiveTab] = useState("all");
  const [statusFilter, setStatusFilter] = useState("live"); // live, upcoming, completed
  const [allMatches, setAllMatches] = useState([]);
  const [matches, setMatches] = useState([]);
  const [matchSearch, setMatchSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const sportFilter = activeTab === "all" ? null : activeTab;
      const res = await getMatches(sportFilter);
      setMatches(res.data);
      setError(res.error);
      setLoading(false);
    }
    load();
  }, [activeTab]);

  useEffect(() => {
    async function loadAll() {
      const res = await getMatches(null);
      setAllMatches(res.data);
    }
    loadAll();
  }, []);

  const tabs = [
    { id: "all", name: "All Sports" },
    { id: "cricket", name: "Cricket 🏏" },
    { id: "football", name: "Football ⚽" },
    { id: "basketball", name: "Basketball 🏀" },
    { id: "tennis", name: "Tennis 🎾" },
    { id: "kabaddi", name: "Kabaddi 🤼" },
    { id: "athletics", name: "Athletics 🏃" }
  ];

  const spotlightPlayers = [
    { id: "virat-kohli", name: "Virat Kohli", sport: "cricket", role: "Right-Handed Batsman", country: "India", avatar: "🏏" },
    { id: "ms-dhoni", name: "MS Dhoni", sport: "cricket", role: "Wicketkeeper Batsman", country: "India", avatar: "🧤" },
    { id: "rohit-sharma", name: "Rohit Sharma", sport: "cricket", role: "Right-Handed Opening Batsman", country: "India", avatar: "🏏" },
    { id: "lionel-messi", name: "Lionel Messi", sport: "football", role: "Forward / Playmaker", country: "Argentina", avatar: "⚽" },
    { id: "cristiano-ronaldo", name: "Cristiano Ronaldo", sport: "football", role: "Forward", country: "Portugal", avatar: "⚡" },
    { id: "lebron-james", name: "LeBron James", sport: "basketball", role: "Small Forward", country: "USA", avatar: "🏀" },
    { id: "novak-djokovic", name: "Novak Djokovic", sport: "tennis", role: "Singles Player", country: "Serbia", avatar: "🎾" },
    { id: "pardeep-narwal", name: "Pardeep Narwal", sport: "kabaddi", role: "Raider", country: "India", avatar: "🤼" },
    { id: "neeraj-chopra", name: "Neeraj Chopra", sport: "athletics", role: "Javelin Thrower", country: "India", avatar: "🥇" },
    { id: "pv-sindhu", name: "PV Sindhu", sport: "athletics", role: "Badminton Player", country: "India", avatar: "🏸" }
  ];

  const liveMatches = allMatches.filter(m => m.status === "live");

  // Dynamic filter for matches list based on tab, statusFilter, and search query
  const filteredMatches = matches.filter(m => {
    const matchesStatus = m.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesSearch = 
      m.team1.toLowerCase().includes(matchSearch.toLowerCase()) ||
      m.team2.toLowerCase().includes(matchSearch.toLowerCase()) ||
      m.venue.toLowerCase().includes(matchSearch.toLowerCase()) ||
      (m.summary && m.summary.toLowerCase().includes(matchSearch.toLowerCase()));
      
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="container" style={{ position: "relative", zIndex: 10 }}>
      {/* Hero Header */}
      <section className="hero-box">
        <h1>PlayPulse Sports Hub</h1>
        <p>Live matches, real-time commentary timelines, and detailed player performance logs.</p>
      </section>

      {/* 🚀 CRICBUZZ-STYLE ENHANCED LIVE MATCHES SLIDER CAROUSEL */}
      {liveMatches.length > 0 && (
        <div style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "20px", display: "flex", alignItems: "center", gap: "8px", color: "#fda4af", borderLeft: "4px solid #f43f5e", paddingLeft: "10px" }}>
            🔥 Live Matches Slider (Cricbuzz Enhanced Feed)
          </h2>
          
          <div style={{
            display: "flex",
            gap: "16px",
            overflowX: "auto",
            padding: "10px 4px 16px 4px",
            scrollbarWidth: "thin"
          }}>
            {liveMatches.map((m) => (
              <Link
                to={`/game/${m.id}`}
                key={m.id}
                style={{
                  minWidth: "300px",
                  maxWidth: "320px",
                  flex: "0 0 auto",
                  textDecoration: "none",
                  background: "rgba(244, 63, 94, 0.03)",
                  borderColor: "rgba(244, 63, 94, 0.15)",
                  boxShadow: "0 0 15px rgba(244, 63, 94, 0.1)"
                }}
                className="match-card"
              >
                <div className="league-row">
                  <span style={{ fontSize: "10px", background: "rgba(244, 63, 94, 0.15)", color: "#fda4af", padding: "2px 8px", borderRadius: "99px", textTransform: "uppercase", fontWeight: "700" }}>
                    LIVE • {m.sport}
                  </span>
                  <span className="live-dot" style={{ margin: "0 0 0 auto" }}></span>
                </div>

                <div style={{ margin: "14px 0", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "700", color: "#fff" }}>
                    <span>{m.team1}</span>
                    <span style={{ color: "#a5b4fc" }}>{m.score1.split(" ")[0]}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "700", color: "#fff" }}>
                    <span>{m.team2}</span>
                    <span style={{ color: "#a5b4fc" }}>{m.score2.split(" ")[0]}</span>
                  </div>
                </div>

                <div style={{ fontSize: "12px", color: "#fda4af", fontWeight: "600", borderTop: "1px solid rgba(255, 255, 255, 0.05)", paddingTop: "8px", display: "flex", alignItems: "center", gap: "6px" }}>
                  <FaRegClock /> {m.time}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Sports Category Tabs Row */}
      <div className="sports-tabs">
        {tabs.map((t) => (
          <button
            key={t.id}
            className={`tab-btn ${activeTab === t.id ? "active" : ""}`}
            onClick={() => {
              setActiveTab(t.id);
              setMatchSearch(""); 
            }}
          >
            {t.name}
          </button>
        ))}
      </div>

      {/* Matches Grid Widget */}
      <div className="widget" style={{ marginBottom: "40px" }}>
        
        {/* Search & Title Row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px", marginBottom: "20px", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "16px" }}>
          <div>
            <h3 style={{ margin: 0 }}>
              {activeTab === "all" ? "PlayPulse Unified Matches Feed" : `${activeTab.toUpperCase()} Match Feed`}
            </h3>
            
            {/* 🔴 / 📅 / ✅ Status Sub-Tabs */}
            <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
              <button 
                className={`tab-btn ${statusFilter === "live" ? "active" : ""}`} 
                onClick={() => setStatusFilter("live")} 
                style={{ padding: "6px 14px", fontSize: "12px", background: statusFilter === "live" ? "rgba(244, 63, 94, 0.15)" : "transparent" }}
              >
                🔴 Live Games
              </button>
              <button 
                className={`tab-btn ${statusFilter === "upcoming" ? "active" : ""}`} 
                onClick={() => setStatusFilter("upcoming")} 
                style={{ padding: "6px 14px", fontSize: "12px" }}
              >
                📅 Upcoming schedules
              </button>
              <button 
                className={`tab-btn ${statusFilter === "completed" ? "active" : ""}`} 
                onClick={() => setStatusFilter("completed")} 
                style={{ padding: "6px 14px", fontSize: "12px" }}
              >
                ✅ Completed Results
              </button>
            </div>
          </div>

          {/* 🔍 Match Search Input */}
          <div style={{ position: "relative", width: "100%", maxWidth: "320px" }}>
            <input
              type="text"
              placeholder="Search teams, venues, times..."
              value={matchSearch}
              onChange={(e) => setMatchSearch(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 14px 10px 38px",
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "12px",
                color: "#fff",
                fontSize: "14px",
                outline: "none"
              }}
            />
            <FaSearch style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#64748b",
              fontSize: "14px"
            }} />
          </div>
        </div>

        {loading && <div className="empty">⏳ Loading matches...</div>}
        {error && <div className="empty">❌ Could not load matches</div>}
        
        {!loading && !error && filteredMatches.length === 0 && (
          <div className="empty">
            {matchSearch ? "No matches match your search query." : `No ${statusFilter} matches found in this category.`}
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "16px" }}>
          {filteredMatches.map((m) => (
            <Link to={`/game/${m.id}`} key={m.id} className="match-card">
              <div className="league-row">
                <span style={{ fontSize: "11px", background: "rgba(99, 102, 241, 0.15)", color: "#a5b4fc", padding: "2px 8px", borderRadius: "99px", textTransform: "uppercase", fontWeight: "700" }}>
                  {m.sport}
                </span>
                <span className="venue-text" style={{ margin: 0, paddingLeft: "8px" }}>{m.venue.split(",")[0]}</span>
                {m.status === "live" && <span className="live-dot"></span>}
              </div>

              <div className="teams-row">
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <div className="team">
                    <span className="team-logo" style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px" }}>🏟️</span>
                    <span>{m.team1}</span>
                  </div>
                  <div className="team">
                    <span className="team-logo" style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px" }}>🏟️</span>
                    <span>{m.team2}</span>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px" }}>
                  <span className="score-box" style={{ background: m.status === "live" ? "rgba(244, 63, 94, 0.15)" : m.status === "upcoming" ? "rgba(255,255,255,0.02)" : "rgba(99, 102, 241, 0.15)", color: m.status === "live" ? "#fda4af" : m.status === "upcoming" ? "#64748b" : "#a5b4fc", borderColor: m.status === "live" ? "rgba(244,63,94,0.3)" : "rgba(255,255,255,0.08)" }}>
                    {m.score1.split(" ")[0]}
                  </span>
                  <span className="score-box" style={{ background: m.status === "live" ? "rgba(244, 63, 94, 0.15)" : m.status === "upcoming" ? "rgba(255,255,255,0.02)" : "rgba(99, 102, 241, 0.15)", color: m.status === "live" ? "#fda4af" : m.status === "upcoming" ? "#64748b" : "#a5b4fc", borderColor: m.status === "live" ? "rgba(244,63,94,0.3)" : "rgba(255,255,255,0.08)" }}>
                    {m.score2.split(" ")[0]}
                  </span>
                </div>
              </div>

              <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", marginTop: "12px", paddingTop: "8px", fontSize: "12px", color: m.status === "live" ? "#fda4af" : m.status === "upcoming" ? "#a5b4fc" : "#94a3b8", display: "flex", alignItems: "center", gap: "6px" }}>
                <FaRegCalendarAlt /> {m.time}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Players Spotlight Spotlight Grid */}
      <h2 style={{ fontSize: "22px", marginBottom: "16px", borderLeft: "4px solid #f472b6", paddingLeft: "10px" }}>
        🌟 Star Players Archive
      </h2>
      <p style={{ color: "#94a3b8", marginTop: "-10px", marginBottom: "20px", fontSize: "14px" }}>
        Select a player to inspect their past achievements, current metrics, and detailed performance comparison tables.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "16px", marginBottom: "40px" }}>
        {spotlightPlayers.map((p) => (
          <Link to={`/game/player/${p.id}/${p.sport}`} key={p.id} className="match-card" style={{ textDecoration: "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px" }}>
                {p.avatar}
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: "16px", color: "#fff" }}>{p.name}</h4>
                <p style={{ margin: "2px 0 0 0", fontSize: "12px", color: "#94a3b8" }}>{p.role}</p>
                <p style={{ margin: "2px 0 0 0", fontSize: "11px", color: "#64748b" }}>{p.country} • <span style={{ textTransform: "uppercase", fontWeight: "700" }}>{p.sport}</span></p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Mini Games Banner Call to Action */}
      <div className="hero-box" style={{ padding: "24px", background: "rgba(236, 72, 153, 0.05)", borderColor: "rgba(236, 72, 153, 0.15)", borderStyle: "solid", borderWidth: "1px" }}>
        <h3 style={{ margin: 0, color: "#f472b6" }}>🎮 Tired of tracking?</h3>
        <p style={{ margin: "6px 0 16px 0", color: "#94a3b8" }}>Head over to our FunZone to play Wordle Guess, Whack-a-Mole, 2048, or other mini-games!</p>
        <Link to="/minigames" className="tab-btn active" style={{ background: "linear-gradient(135deg, #ec4899, #db2777)" }}>
          Launch FunZone
        </Link>
      </div>
    </div>
  );
}
