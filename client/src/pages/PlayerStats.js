// client/src/pages/PlayerStats.js
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import PlayerCard from "../components/PlayerCard";
import { getPlayerStats } from "../utils/fetchPlayer";

export default function PlayerStats() {
  const { pid, sport } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await getPlayerStats(sport, pid);
      setData(res);
      setLoading(false);
    }
    load();
  }, [pid, sport]);

  return (
    <div className="container" style={{ position: "relative", zIndex: 10 }}>
      <div style={{ marginBottom: "20px" }}>
        <Link to="/" className="tab-btn" style={{ textDecoration: "none", display: "inline-block", background: "rgba(255, 255, 255, 0.05)" }}>
          ⬅ Back to Dashboard
        </Link>
      </div>

      {loading && <div className="empty">⏳ Loading player profile data...</div>}
      
      {!loading && !data && (
        <div className="empty">❌ Profile data not found for this player.</div>
      )}

      {!loading && data && (
        <PlayerCard data={data} />
      )}
    </div>
  );
}
