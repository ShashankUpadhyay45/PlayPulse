// client/src/pages/GameDetails.js
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosLib from "axios";
import { FaRegClock, FaUsers, FaMapMarkerAlt, FaRegCalendarAlt, FaStar, FaChevronRight } from "react-icons/fa";
import { mockMatches, mockCommentaries, mockSquads } from "../utils/mockData";
import { getAPIUrl } from "../utils/resolveApi";

export default function GameDetails() {
  const { id: matchId } = useParams();

  const [match, setMatch] = useState(null);
  const [commentary, setCommentary] = useState([]);
  const [squads, setSquads] = useState(null);
  const [scorecard, setScorecard] = useState(null);
  
  const [activeTab, setActiveTab] = useState("commentary"); // commentary, scorecard, squads
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const API = await getAPIUrl();
        
        // 1. Fetch match info
        let currentMatch = null;
        try {
          const matchesRes = await axiosLib.get(`${API}/api/matches`);
          currentMatch = matchesRes.data.find((m) => m.id === matchId);
        } catch (e) {
          console.warn("API matches failed, using local mock fallback");
          currentMatch = mockMatches.find((m) => m.id === matchId);
        }
        
        // Check if mock match is live and set to completed or upcoming if requested, but keep mock consistency
        setMatch(currentMatch);

        if (currentMatch) {
          // If match is upcoming, default tab to squads since there is no commentary or scorecard yet
          if (currentMatch.status === "upcoming") {
            setActiveTab("squads");
          } else {
            setActiveTab("commentary");
          }

          // 2. Fetch commentary
          try {
            const commRes = await axiosLib.get(`${API}/api/commentary/${matchId}`);
            setCommentary(commRes.data.data || []);
          } catch (e) {
            console.warn("API commentary failed, using local mock fallback");
            setCommentary(mockCommentaries[matchId] || []);
          }

          // 3. Fetch squads & referee
          try {
            const squadsRes = await axiosLib.get(`${API}/api/squads/${matchId}`);
            setSquads(squadsRes.data.data || null);
          } catch (e) {
            console.warn("API squads failed, using local mock fallback");
            setSquads(mockSquads[matchId] || null);
          }

          // 4. Fetch scorecard data
          try {
            const scorecardRes = await axiosLib.get(`${API}/api/scorecard/${matchId}`);
            if (scorecardRes.data && scorecardRes.data.ok) {
              setScorecard(scorecardRes.data.data);
            }
          } catch (e) {
            console.warn("API scorecard failed:", e);
          }
        } else {
          setError(true);
        }
        setLoading(false);
      } catch (e) {
        console.error("Error loading Match Center data:", e);
        setError(true);
        setLoading(false);
      }
    }
    loadData();
  }, [matchId]);

  const getEventBadgeStyle = (event) => {
    switch (event) {
      case "WICKET":
        return { background: "rgba(244, 63, 94, 0.15)", color: "#f43f5e", borderColor: "rgba(244, 63, 94, 0.3)" };
      case "GOAL":
        return { background: "rgba(34, 197, 94, 0.15)", color: "#22c55e", borderColor: "rgba(34, 197, 94, 0.3)" };
      case "SIX":
      case "FOUR":
        return { background: "rgba(168, 85, 247, 0.15)", color: "#a855f7", borderColor: "rgba(168, 85, 247, 0.3)" };
      case "DUNK":
        return { background: "rgba(249, 115, 22, 0.15)", color: "#f97316", borderColor: "rgba(249, 115, 22, 0.3)" };
      case "ACE":
        return { background: "rgba(59, 130, 246, 0.15)", color: "#3b82f6", borderColor: "rgba(59, 130, 246, 0.3)" };
      case "SUPER_RAID":
        return { background: "rgba(234, 179, 8, 0.15)", color: "#eab308", borderColor: "rgba(234, 179, 8, 0.3)" };
      default:
        return { background: "rgba(255, 255, 255, 0.05)", color: "#94a3b8", borderColor: "rgba(255, 255, 255, 0.05)" };
    }
  };

  const getPlayerId = (name) => {
    return name.toLowerCase().trim().replace(/ /g, "-").replace(/[^a-z0-9-]/g, "");
  };

  if (loading) {
    return <div className="container"><div className="empty">⏳ Loading Match Center...</div></div>;
  }

  if (error || !match) {
    return (
      <div className="container">
        <div className="empty">
          ❌ Match not found or connection failed.
          <br />
          <Link to="/" className="tab-btn active" style={{ marginTop: "16px", display: "inline-block", textDecoration: "none" }}>
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const isUpcoming = match.status === "upcoming";

  return (
    <div className="container" style={{ position: "relative", zIndex: 10 }}>
      
      {/* Back Button */}
      <div style={{ marginBottom: "20px" }}>
        <Link to="/" className="tab-btn" style={{ textDecoration: "none", display: "inline-block", background: "rgba(255, 255, 255, 0.05)" }}>
          ⬅ Back to Feed
        </Link>
      </div>

      {/* Match Header Glass Card */}
      <div className="hero-box" style={{ padding: "30px 20px", marginBottom: "30px" }}>
        <span style={{ fontSize: "11px", background: match.status === "live" ? "rgba(244, 63, 94, 0.15)" : match.status === "upcoming" ? "rgba(59, 130, 246, 0.15)" : "rgba(99, 102, 241, 0.15)", color: match.status === "live" ? "#fda4af" : match.status === "upcoming" ? "#93c5fd" : "#a5b4fc", padding: "4px 12px", borderRadius: "99px", textTransform: "uppercase", fontWeight: "700" }}>
          {match.status} • {match.sport} Match Center
        </span>

        <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", margin: "24px 0", flexWrap: "wrap", gap: "16px" }}>
          <div style={{ textAlign: "center" }}>
            <h2 style={{ margin: 0, fontSize: "28px" }}>{match.team1}</h2>
            {!isUpcoming && <h3 style={{ margin: "10px 0 0 0", color: "#a5b4fc" }}>{match.score1}</h3>}
          </div>
          <div style={{ fontSize: "20px", color: "#64748b", fontWeight: "700" }}>VS</div>
          <div style={{ textAlign: "center" }}>
            <h2 style={{ margin: 0, fontSize: "28px" }}>{match.team2}</h2>
            {!isUpcoming && <h3 style={{ margin: "10px 0 0 0", color: "#a5b4fc" }}>{match.score2}</h3>}
          </div>
        </div>

        {isUpcoming && (
          <p style={{ color: "#93c5fd", fontSize: "15px", fontWeight: "700", margin: "0 0 10px 0" }}>
            📅 Match Scheduled to Start: {match.time}
          </p>
        )}
        
        {!isUpcoming && (
          <p style={{ color: match.status === "live" ? "#f43f5e" : "#fda4af", fontSize: "14px", fontWeight: "600", margin: "0 0 10px 0" }}>
            {match.time}
          </p>
        )}

        <span style={{ fontSize: "12px", color: "#64748b", display: "inline-flex", alignItems: "center", gap: "6px" }}>
          <FaMapMarkerAlt /> {match.venue}
        </span>
      </div>

      {/* Tabs Menu */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "12px" }}>
        {!isUpcoming && (
          <>
            <button className={`tab-btn ${activeTab === "commentary" ? "active" : ""}`} onClick={() => setActiveTab("commentary")}>
              💬 Commentary
            </button>
            <button className={`tab-btn ${activeTab === "scorecard" ? "active" : ""}`} onClick={() => setActiveTab("scorecard")}>
              📊 Scorecard
            </button>
          </>
        )}
        <button className={`tab-btn ${activeTab === "squads" ? "active" : ""}`} onClick={() => setActiveTab("squads")}>
          👥 Squads & Officials
        </button>
      </div>

      {/* Tab Contents */}
      <div className="widget" style={{ minHeight: "300px", padding: "24px" }}>
        
        {/* TAB 1: COMMENTARY */}
        {activeTab === "commentary" && !isUpcoming && (
          <div>
            <h3 style={{ marginBottom: "20px" }}>Commentary Timeline</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {commentary.map((comm, idx) => {
                const badgeStyle = getEventBadgeStyle(comm.event);
                return (
                  <div key={idx} style={{ display: "flex", gap: "16px", paddingBottom: "16px", borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                    <div style={{ minWidth: "50px", textAlign: "right" }}>
                      <strong style={{ color: "#64748b", fontSize: "13px" }}>{comm.time}</strong>
                    </div>
                    <div style={{ flex: 1 }}>
                      {comm.event !== "NORMAL" && (
                        <span style={{ display: "inline-block", fontSize: "10px", padding: "2px 8px", borderRadius: "4px", border: "1px solid", fontWeight: "700", marginBottom: "6px", ...badgeStyle }}>
                          {comm.event}
                        </span>
                      )}
                      <p style={{ margin: 0, fontSize: "14px", color: "#e2e8f0", lineHeight: "1.5" }}>{comm.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: SCORECARD GRID (DYNAMIC PLAYERS SCORES) */}
        {activeTab === "scorecard" && !isUpcoming && (
          <div>
            <h3 style={{ marginBottom: "20px" }}>Player Performance scorecard</h3>
            
            {scorecard ? (
              <div>
                {/* 🏏 CRICKET SCORECARD LAYOUT */}
                {match.sport === "cricket" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
                    
                    {/* Innings 1 Batting */}
                    <div>
                      <h4 style={{ color: "#a5b4fc", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "8px", marginBottom: "12px" }}>
                        {match.team1} Batting
                      </h4>
                      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px", textAlign: "left" }}>
                        <thead>
                          <tr style={{ color: "#64748b", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                            <th style={{ padding: "8px 0" }}>Batsman</th>
                            <th>Status</th>
                            <th>Runs</th>
                            <th>Balls</th>
                            <th>4s</th>
                            <th>6s</th>
                            <th>SR</th>
                          </tr>
                        </thead>
                        <tbody>
                          {scorecard.innings1.map((b, i) => (
                            <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                              <td style={{ padding: "10px 0", fontWeight: "600" }}>{b.name}</td>
                              <td style={{ color: "#94a3b8" }}>{b.status}</td>
                              <td style={{ fontWeight: "700", color: "#fff" }}>{b.runs}</td>
                              <td>{b.balls}</td>
                              <td>{b.fours}</td>
                              <td>{b.sixes}</td>
                              <td style={{ color: "#fda4af" }}>{b.sr}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Innings 1 Bowling */}
                    <div>
                      <h4 style={{ color: "#a5b4fc", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "8px", marginBottom: "12px" }}>
                        {match.team2} Bowling
                      </h4>
                      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px", textAlign: "left" }}>
                        <thead>
                          <tr style={{ color: "#64748b", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                            <th style={{ padding: "8px 0" }}>Bowler</th>
                            <th>Overs</th>
                            <th>Maidens</th>
                            <th>Runs</th>
                            <th>Wickets</th>
                            <th>Economy</th>
                          </tr>
                        </thead>
                        <tbody>
                          {scorecard.innings1Bowling.map((b, i) => (
                            <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                              <td style={{ padding: "10px 0", fontWeight: "600" }}>{b.name}</td>
                              <td>{b.overs}</td>
                              <td>{b.maidens}</td>
                              <td>{b.runs}</td>
                              <td style={{ fontWeight: "700", color: "#22c55e" }}>{b.wickets}</td>
                              <td style={{ color: "#fda4af" }}>{b.economy}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Innings 2 Batting */}
                    <div>
                      <h4 style={{ color: "#a5b4fc", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "8px", marginBottom: "12px" }}>
                        {match.team2} Batting
                      </h4>
                      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px", textAlign: "left" }}>
                        <thead>
                          <tr style={{ color: "#64748b", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                            <th style={{ padding: "8px 0" }}>Batsman</th>
                            <th>Status</th>
                            <th>Runs</th>
                            <th>Balls</th>
                            <th>4s</th>
                            <th>6s</th>
                            <th>SR</th>
                          </tr>
                        </thead>
                        <tbody>
                          {scorecard.innings2.map((b, i) => (
                            <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                              <td style={{ padding: "10px 0", fontWeight: "600" }}>{b.name}</td>
                              <td style={{ color: "#94a3b8" }}>{b.status}</td>
                              <td style={{ fontWeight: "700", color: "#fff" }}>{b.runs}</td>
                              <td>{b.balls}</td>
                              <td>{b.fours}</td>
                              <td>{b.sixes}</td>
                              <td style={{ color: "#fda4af" }}>{b.sr}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Innings 2 Bowling */}
                    <div>
                      <h4 style={{ color: "#a5b4fc", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "8px", marginBottom: "12px" }}>
                        {match.team1} Bowling
                      </h4>
                      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px", textAlign: "left" }}>
                        <thead>
                          <tr style={{ color: "#64748b", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                            <th style={{ padding: "8px 0" }}>Bowler</th>
                            <th>Overs</th>
                            <th>Maidens</th>
                            <th>Runs</th>
                            <th>Wickets</th>
                            <th>Economy</th>
                          </tr>
                        </thead>
                        <tbody>
                          {scorecard.innings2Bowling.map((b, i) => (
                            <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                              <td style={{ padding: "10px 0", fontWeight: "600" }}>{b.name}</td>
                              <td>{b.overs}</td>
                              <td>{b.maidens}</td>
                              <td>{b.runs}</td>
                              <td style={{ fontWeight: "700", color: "#22c55e" }}>{b.wickets}</td>
                              <td style={{ color: "#fda4af" }}>{b.economy}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                  </div>
                )}

                {/* ⚽ FOOTBALL SCORECARD LAYOUT */}
                {match.sport === "football" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                    {/* Team 1 stats */}
                    <div>
                      <h4 style={{ color: "#a5b4fc", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "8px", marginBottom: "12px" }}>
                        {match.team1} Player Stats
                      </h4>
                      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px", textAlign: "left" }}>
                        <thead>
                          <tr style={{ color: "#64748b", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                            <th style={{ padding: "8px 0" }}>Player</th>
                            <th>Goals</th>
                            <th>Assists</th>
                            <th>Shots (On Target)</th>
                            <th>Passes</th>
                            <th>Cards</th>
                            <th>Rating</th>
                          </tr>
                        </thead>
                        <tbody>
                          {scorecard.team1.map((p, i) => (
                            <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                              <td style={{ padding: "10px 0", fontWeight: "600" }}>{p.name}</td>
                              <td style={{ color: p.goals > 0 ? "#22c55e" : "#fff" }}>{p.goals}</td>
                              <td>{p.assists}</td>
                              <td>{p.shots}</td>
                              <td>{p.passes}</td>
                              <td style={{ color: p.cards === "Yellow" ? "#eab308" : "#94a3b8" }}>{p.cards}</td>
                              <td style={{ fontWeight: "700", color: "#f472b6" }}>{p.rating}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Team 2 stats */}
                    <div>
                      <h4 style={{ color: "#a5b4fc", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "8px", marginBottom: "12px" }}>
                        {match.team2} Player Stats
                      </h4>
                      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px", textAlign: "left" }}>
                        <thead>
                          <tr style={{ color: "#64748b", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                            <th style={{ padding: "8px 0" }}>Player</th>
                            <th>Goals</th>
                            <th>Assists</th>
                            <th>Shots (On Target)</th>
                            <th>Passes</th>
                            <th>Cards</th>
                            <th>Rating</th>
                          </tr>
                        </thead>
                        <tbody>
                          {scorecard.team2.map((p, i) => (
                            <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                              <td style={{ padding: "10px 0", fontWeight: "600" }}>{p.name}</td>
                              <td style={{ color: p.goals > 0 ? "#22c55e" : "#fff" }}>{p.goals}</td>
                              <td>{p.assists}</td>
                              <td>{p.shots}</td>
                              <td>{p.passes}</td>
                              <td style={{ color: p.cards === "Yellow" ? "#eab308" : "#94a3b8" }}>{p.cards}</td>
                              <td style={{ fontWeight: "700", color: "#f472b6" }}>{p.rating}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* 🏀 BASKETBALL SCORECARD LAYOUT */}
                {match.sport === "basketball" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                    <div>
                      <h4 style={{ color: "#a5b4fc", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "8px", marginBottom: "12px" }}>
                        {match.team1} Player Stats
                      </h4>
                      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px", textAlign: "left" }}>
                        <thead>
                          <tr style={{ color: "#64748b", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                            <th style={{ padding: "8px 0" }}>Player</th>
                            <th>PTS</th>
                            <th>REB</th>
                            <th>AST</th>
                            <th>FG M/A</th>
                          </tr>
                        </thead>
                        <tbody>
                          {scorecard.team1.map((p, i) => (
                            <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                              <td style={{ padding: "10px 0", fontWeight: "600" }}>{p.name}</td>
                              <td style={{ fontWeight: "700", color: "#fff" }}>{p.points}</td>
                              <td>{p.rebounds}</td>
                              <td>{p.assists}</td>
                              <td>{p.fg}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div>
                      <h4 style={{ color: "#a5b4fc", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "8px", marginBottom: "12px" }}>
                        {match.team2} Player Stats
                      </h4>
                      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px", textAlign: "left" }}>
                        <thead>
                          <tr style={{ color: "#64748b", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                            <th style={{ padding: "8px 0" }}>Player</th>
                            <th>PTS</th>
                            <th>REB</th>
                            <th>AST</th>
                            <th>FG M/A</th>
                          </tr>
                        </thead>
                        <tbody>
                          {scorecard.team2.map((p, i) => (
                            <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                              <td style={{ padding: "10px 0", fontWeight: "600" }}>{p.name}</td>
                              <td style={{ fontWeight: "700", color: "#fff" }}>{p.points}</td>
                              <td>{p.rebounds}</td>
                              <td>{p.assists}</td>
                              <td>{p.fg}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* 🎾 TENNIS MATCH STATS */}
                {match.sport === "tennis" && (
                  <div>
                    <h4 style={{ color: "#a5b4fc", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "8px", marginBottom: "16px" }}>
                      Match Stats
                    </h4>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
                      <thead>
                        <tr style={{ color: "#64748b", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                          <th style={{ padding: "8px 0", textAlign: "left" }}>{match.team1}</th>
                          <th style={{ textAlign: "center" }}>Metric</th>
                          <th style={{ textAlign: "right" }}>{match.team2}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {scorecard.map((s, i) => (
                          <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                            <td style={{ padding: "12px 0", fontWeight: "700", color: "#fff", textAlign: "left" }}>{s.val1}</td>
                            <td style={{ color: "#a5b4fc", textAlign: "center" }}>{s.stat}</td>
                            <td style={{ fontWeight: "700", color: "#fff", textAlign: "right" }}>{s.val2}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* 🤼 KABADDI STATS */}
                {match.sport === "kabaddi" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                    <div>
                      <h4 style={{ color: "#a5b4fc", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "8px", marginBottom: "12px" }}>
                        {match.team1} Raiders & Defenders
                      </h4>
                      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px", textAlign: "left" }}>
                        <thead>
                          <tr style={{ color: "#64748b", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                            <th style={{ padding: "8px 0" }}>Player</th>
                            <th>Raid Points</th>
                            <th>Tackle Points</th>
                            <th>Super Raids</th>
                          </tr>
                        </thead>
                        <tbody>
                          {scorecard.team1.map((p, i) => (
                            <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                              <td style={{ padding: "10px 0", fontWeight: "600" }}>{p.name}</td>
                              <td style={{ fontWeight: "700", color: "#fff" }}>{p.raidPoints}</td>
                              <td>{p.tacklePoints}</td>
                              <td>{p.superRaids}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div>
                      <h4 style={{ color: "#a5b4fc", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "8px", marginBottom: "12px" }}>
                        {match.team2} Raiders & Defenders
                      </h4>
                      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px", textAlign: "left" }}>
                        <thead>
                          <tr style={{ color: "#64748b", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                            <th style={{ padding: "8px 0" }}>Player</th>
                            <th>Raid Points</th>
                            <th>Tackle Points</th>
                            <th>Super Raids</th>
                          </tr>
                        </thead>
                        <tbody>
                          {scorecard.team2.map((p, i) => (
                            <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                              <td style={{ padding: "10px 0", fontWeight: "600" }}>{p.name}</td>
                              <td style={{ fontWeight: "700", color: "#fff" }}>{p.raidPoints}</td>
                              <td>{p.tacklePoints}</td>
                              <td>{p.superRaids}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* 🏃 ATHLETICS RANKINGS */}
                {match.sport === "athletics" && (
                  <div>
                    <h4 style={{ color: "#a5b4fc", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "8px", marginBottom: "12px" }}>
                      Athlete Results
                    </h4>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px", textAlign: "left" }}>
                      <thead>
                        <tr style={{ color: "#64748b", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                          <th style={{ padding: "8px 0" }}>Rank</th>
                          <th>Athlete Name</th>
                          <th>Performance Result</th>
                          <th>Representing</th>
                        </tr>
                      </thead>
                      <tbody>
                        {scorecard.map((r, i) => (
                          <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                            <td style={{ padding: "12px 0", fontWeight: "700" }}>#{i+1}</td>
                            <td style={{ fontWeight: "600", color: "#fff" }}>{r.name}</td>
                            <td style={{ color: "#fda4af", fontWeight: "700" }}>{r.result}</td>
                            <td style={{ color: "#94a3b8" }}>{r.country}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

              </div>
            ) : (
              <div className="empty">Detailed scorecard loading or not available.</div>
            )}
          </div>
        )}

        {/* TAB 3: SQUADS & OFFICIALS */}
        {activeTab === "squads" && (
          <div>
            <h3>Squad Lineups</h3>
            <p style={{ fontSize: "12px", color: "#64748b", marginTop: "-10px", marginBottom: "20px" }}>
              Click any player name to view their complete stats comparison card.
            </p>

            {squads && squads.referee && (
              <div style={{ padding: "12px 16px", background: "rgba(99, 102, 241, 0.05)", border: "1px solid rgba(99, 102, 241, 0.15)", borderRadius: "10px", marginBottom: "24px", fontSize: "13px", color: "#a5b4fc", fontWeight: "600", display: "flex", alignItems: "center", gap: "8px" }}>
                🏁 {squads.referee}
              </div>
            )}

            {squads ? (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
                <div>
                  <h4 style={{ color: "#a5b4fc", margin: "0 0 12px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "4px" }}>
                    {match.team1} Squad
                  </h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {squads.team1Players.map((p, idx) => (
                      <Link to={`/game/player/${getPlayerId(p.name)}/${match.sport}`} key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "8px", textDecoration: "none", color: "#fff" }} className="squad-link">
                        <span style={{ fontSize: "13px", fontWeight: "600" }}>{p.name}</span>
                        <span style={{ fontSize: "11px", color: "#64748b" }}>{p.role}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 style={{ color: "#a5b4fc", margin: "0 0 12px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "4px" }}>
                    {match.team2} Squad
                  </h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {squads.team2Players.map((p, idx) => (
                      <Link to={`/game/player/${getPlayerId(p.name)}/${match.sport}`} key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "8px", textDecoration: "none", color: "#fff" }} className="squad-link">
                        <span style={{ fontSize: "13px", fontWeight: "600" }}>{p.name}</span>
                        <span style={{ fontSize: "11px", color: "#64748b" }}>{p.role}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="empty">Squad details not available.</div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
