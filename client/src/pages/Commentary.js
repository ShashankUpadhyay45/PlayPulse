import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentaryBox from "../components/CommentaryBox";
import { getCricketCommentary, getFootballCommentary } from "../utils/fetchCommentary";

export default function CommentaryPage() {
  const { matchId, sport } = useParams();
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    async function load() {
      const data =
        sport === "cricket"
          ? await getCricketCommentary(matchId)
          : await getFootballCommentary(matchId);

      setFeed(data);
    }
    load();
  }, [matchId, sport]);

  return (
    <div className="container">
      <h1>Live Commentary</h1>
      <CommentaryBox feed={feed} />
    </div>
  );
}
