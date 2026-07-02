// client/src/components/TrendingMatches.js
import React from "react";

export default function TrendingMatches({ items = [], loading }) {
  if (loading) return <div className="widget">⏳ Loading...</div>;

  // Sort: live → upcoming → others
  const sorted = [...items].sort((a, b) => {
    const aLive = a?.live ? 1 : 0;
    const bLive = b?.live ? 1 : 0;
    return bLive - aLive;
  });

  return (
    <div className="widget">
      <h3>🔥 Trending Matches</h3>

      {sorted.length === 0 && <div className="empty">No trending matches.</div>}

      {sorted.slice(0, 10).map((m, i) => {
        const league = m?.league?.name || m?.competition?.title || "League";
        const country = m?.league?.country || "INT";
        const sport = m.__sport || "Sport";

        const flag =
          m?.league?.flag || m?.teams?.home?.logo || m?.teama?.logo || "";

        const left =
          m?.teams?.home?.name || m?.teama?.name || "Team A";
        const right =
          m?.teams?.away?.name || m?.teamb?.name || "Team B";

        const scoreLeft =
          m?.goals?.home ?? m?.teama?.scores_full ?? "-";
        const scoreRight =
          m?.goals?.away ?? m?.teamb?.scores_full ?? "-";

        return (
          <div className="match" key={i}>
            <div className="match-league">
              {flag && <img src={flag} alt="flag" className="flag" />}
              <span>{sport} • {league} • {country}</span>
            </div>

            <div className="match-rows">
              <span className="team">{left}</span>
              <span className="score">
                <b>{scoreLeft}</b> – <b>{scoreRight}</b>
              </span>
              <span className="team">{right}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
