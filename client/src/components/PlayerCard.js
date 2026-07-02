// client/src/components/PlayerCard.js
import React from "react";
import { FaTrophy, FaShieldAlt } from "react-icons/fa";

export default function PlayerCard({ data }) {
  if (!data || !data.stats) return null;

  // Extract keys for dynamic mapping
  const statsKeys = Object.keys(data.stats);
  const headersKey = statsKeys[0]; // e.g., "Format", "Season", "Competition"
  const headers = data.stats[headersKey] || [];
  const rowNames = statsKeys.slice(1);

  const getSportEmoji = (sport) => {
    switch (sport.toLowerCase()) {
      case "cricket": return "🏏";
      case "football": return "⚽";
      case "basketball": return "🏀";
      case "tennis": return "🎾";
      case "kabaddi": return "🤼";
      case "athletics": return "🥇";
      default: return "🏆";
    }
  };

  return (
    <div className="player-card" style={{ position: "relative", overflow: "hidden" }}>
      {/* Player Header with Wikipedia Image */}
      <div style={{ display: "flex", gap: "24px", alignItems: "center", flexWrap: "wrap", marginBottom: "24px", borderBottom: "1px solid rgba(255, 255, 255, 0.05)", paddingBottom: "24px" }}>
        
        {/* Real-time Dynamic Wikipedia Profile Picture */}
        {data.imageUrl ? (
          <img 
            src={data.imageUrl} 
            alt={data.name} 
            style={{ 
              width: "100px", 
              height: "100px", 
              borderRadius: "50%", 
              objectFit: "cover", 
              border: "3px solid #6366f1", 
              boxShadow: "0 0 25px rgba(99, 102, 241, 0.4)",
              background: "rgba(255, 255, 255, 0.02)"
            }} 
          />
        ) : (
          <div style={{ 
            width: "100px", 
            height: "100px", 
            borderRadius: "50%", 
            background: "rgba(255, 255, 255, 0.03)", 
            border: "2px dashed rgba(255, 255, 255, 0.1)", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            fontSize: "36px"
          }}>
            👤
          </div>
        )}

        <div style={{ flex: 1, minWidth: "200px" }}>
          <span style={{ fontSize: "12px", background: "rgba(99, 102, 241, 0.15)", color: "#a5b4fc", padding: "4px 12px", borderRadius: "99px", fontWeight: "700", textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: "6px" }}>
            {getSportEmoji(data.sport)} {data.sport}
          </span>
          
          <h2 style={{ margin: "10px 0 6px 0", fontSize: "32px", fontWeight: "900", color: "#fff", letterSpacing: "-0.5px" }}>
            {data.name}
          </h2>
          
          <p style={{ margin: 0, fontSize: "15px", color: "#94a3b8", display: "flex", alignItems: "center", gap: "8px", fontWeight: "500" }}>
            <FaShieldAlt style={{ color: "#6366f1" }} /> {data.team}
          </p>
        </div>

        {/* Info Grid */}
        <div style={{ display: "flex", gap: "12px" }}>
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", padding: "10px 18px", borderRadius: "14px", textAlign: "center", minWidth: "80px" }}>
            <span style={{ display: "block", fontSize: "10px", color: "#64748b", textTransform: "uppercase", fontWeight: "700" }}>Age</span>
            <strong style={{ fontSize: "18px", color: "#fff" }}>{data.age}</strong>
          </div>
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", padding: "10px 18px", borderRadius: "14px", textAlign: "center", minWidth: "100px" }}>
            <span style={{ display: "block", fontSize: "10px", color: "#64748b", textTransform: "uppercase", fontWeight: "700" }}>Nationality</span>
            <strong style={{ fontSize: "16px", color: "#fff" }}>{data.nationality}</strong>
          </div>
        </div>
      </div>

      {/* Role */}
      <div style={{ marginBottom: "20px", fontSize: "15px", color: "#94a3b8" }}>
        Field Role Position: <strong style={{ color: "#fff" }}>{data.role}</strong>
      </div>

      {/* Dynamic Wikipedia Live Biography Summary */}
      {data.bio && (
        <div style={{ 
          marginBottom: "28px", 
          padding: "16px 20px", 
          background: "rgba(255, 255, 255, 0.01)", 
          borderLeft: "4px solid #ec4899", 
          borderRadius: "0 16px 16px 0",
          boxShadow: "inset 10px 0 20px rgba(0,0,0,0.15)"
        }}>
          <h4 style={{ margin: "0 0 6px 0", fontSize: "11px", color: "#f472b6", textTransform: "uppercase", fontWeight: "700", letterSpacing: "1px" }}>
            Biography Summary (Live Wikipedia Feed)
          </h4>
          <p style={{ margin: 0, fontSize: "14px", color: "#94a3b8", lineHeight: "1.6" }}>
            {data.bio}
          </p>
        </div>
      )}

      {/* Dynamic Statistics Table */}
      <h3 style={{ fontSize: "18px", borderLeft: "4px solid #6366f1", paddingLeft: "10px", margin: "30px 0 14px 0", color: "#fff", fontWeight: "800" }}>
        Performance Metrics
      </h3>
      
      <div className="stats-table-wrapper" style={{ overflowX: "auto" }}>
        <table className="stats-table">
          <thead>
            <tr>
              <th>{headersKey}</th>
              {headers.map((h, i) => (
                <th key={i}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rowNames.map((rowName) => (
              <tr key={rowName}>
                <td><strong>{rowName}</strong></td>
                {data.stats[rowName].map((val, idx) => (
                  <td key={idx} style={{ color: "#fff", fontWeight: "600" }}>{val}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Spotlight Highlights Summary */}
      <div style={{ marginTop: "32px", padding: "20px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "18px" }}>
        <h4 style={{ margin: "0 0 10px 0", color: "#ec4899", fontSize: "14px", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "8px" }}>
          <FaTrophy /> Career Achievements Spotlight
        </h4>
        <p style={{ margin: 0, fontSize: "13px", color: "#94a3b8", lineHeight: "1.6" }}>
          This archive displays validated performance records logged across official leagues, Grand Slams, Olympic runs, and international series. Past data represents lifetime averages, while present metrics represent the most recently completed matches.
        </p>
      </div>
    </div>
  );
}
