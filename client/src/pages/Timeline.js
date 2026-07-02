import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TimelineEvent from "../components/TimelineEvent";
import { getCricketTimeline, getFootballTimeline } from "../utils/fetchTimeline";

export default function Timeline() {
  const { matchId, sport } = useParams();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function load() {
      const data =
        sport === "cricket"
          ? await getCricketTimeline(matchId)
          : await getFootballTimeline(matchId);

      setEvents(data);
    }
    load();
  }, []);

  return (
    <div className="container">
      <h1>Match Timeline</h1>
      <div className="timeline-list">
        {events.map((e, i) => (
          <TimelineEvent key={i} event={e} />
        ))}
      </div>
    </div>
  );
}
