// client/src/components/LiveWidget.js
import React, { useEffect, useRef } from "react";

export default function LiveWidget({ title, matches = [], loading, error }) {
  const prevScores = useRef({});

  return (
    <div className="widget widget-v2">
      <h3 className="widget-title">{title}</h3>

      {loading && <div className="empty">⏳ Loading...</div>}
      {error && <div className="empty">❌ Could not load data</div>}

      {!loading && !error && matches.length === 0 && (
        <div className="empty">No live matches.</div>
      )}

      {matches?.slice(0, 10).map((m, i) => {
        // NORMALIZED FIELDS
        const league =
          m?.league?.name || m?.competition?.title || "League";

        const left =
          m?.teams?.home?.name ||
          m?.teama?.name ||
          "Team A";

        const right =
          m?.teams?.away?.name ||
          m?.teamb?.name ||
          "Team B";

        const leftScore =
          m?.goals?.home ??
          m?.teama?.scores_full ??
          "-";

        const rightScore =
          m?.goals?.away ??
          m?.teamb?.scores_full ??
          "-";

        const leftLogo =
          m?.teams?.home?.logo || m?.teama?.logo || "";
        const rightLogo =
          m?.teams?.away?.logo || m?.teamb?.logo || "";

        const leagueFlag =
          m?.league?.flag ||
          m?.teams?.home?.logo ||
          m?.teama?.logo ||
          "";

        // ⬇️ ANIMATION CHECK
        const prev = prevScores.current[i];
        const scoreChanged =
          prev &&
          (prev.left !== leftScore || prev.right !== rightScore);

        prevScores.current[i] = { left: leftScore, right: rightScore };

        return (
          <div className="match-card" key={i}>
            {/* LEAGUE ROW */}
            <div className="league-row">
              {leagueFlag && <img src={leagueFlag} className="flag" alt="flag" />}
              <span className="league-text">{league}</span>
              <span className="live-dot"></span>
            </div>

            {/* TEAMS ROW */}
            <div className="teams-row">
              <div className="team team-left">
                {leftLogo && <img src={leftLogo} className="team-logo" alt="" />}
                <span>{left}</span>
              </div>

              <div className={`score-box ${scoreChanged ? "score-animate" : ""}`}>
                {leftScore} - {rightScore}
              </div>

              <div className="team team-right">
                <span>{right}</span>
                {rightLogo && <img src={rightLogo} className="team-logo" alt="" />}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
