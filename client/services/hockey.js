import express from "express";
import axios from "axios";
const router = express.Router();
const KEY = process.env.HOCKEY_API_KEY;

router.get("/live", async (req, res) => {
  try {
    const url = "https://v1.hockey.api-sports.io/games?live=all";
    const r = await axios.get(url, { headers: { "x-apisports-key": KEY } });
    res.json(r.data);
  } catch {
    res.status(500).json({ error: "Hockey API error" });
  }
});

export default router;
