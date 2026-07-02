import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StandingsTable from "../components/StandingsTable";
import { getCricketStandings, getFootballStandings } from "../utils/fetchStandings";

export default function Standings() {
  const { leagueId, sport } = useParams();
  const [table, setTable] = useState([]);

  useEffect(() => {
    async function load() {
      const data =
        sport === "cricket"
          ? await getCricketStandings(leagueId)
          : await getFootballStandings(leagueId);

      setTable(data);
    }
    load();
  }, [leagueId, sport]);

  return (
    <div className="container">
      <h1>Standings</h1>
      <StandingsTable table={table} />
    </div>
  );
}
