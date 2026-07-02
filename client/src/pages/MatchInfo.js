import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SquadCard from "../components/SquadCard";
import { getCricketSquads, getFootballLineups } from "../utils/fetchMatchInfo";

export default function MatchInfo() {
  const { matchId, sport } = useParams();
  const [info, setInfo] = useState(null);

  useEffect(() => {
    async function load() {
      const data =
        sport === "cricket"
          ? await getCricketSquads(matchId)
          : await getFootballLineups(matchId);

      setInfo(data);
    }
    load();
  }, [matchId, sport]);

  if (!info) return <p>Loading team info...</p>;

  return (
    <div className="container">
      <h1>Match Info</h1>
      <SquadCard data={info} />
    </div>
  );
}
