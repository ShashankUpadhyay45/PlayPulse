import express from "express";
import axios from "axios";
const router = express.Router();
const KEY = process.env.BASKETBALL_API_KEY;

router.get("/live", async (req, res) => {
  try {
    const url = "https://v1.basketball.api-sports.io/games?live=all";
    const r = await axios.get(url, { headers: { "x-apisports-key": KEY } });
    res.json(r.data);
  } catch (e) {
    res.status(500).json({ error: "Basketball API error" });
  }
});

export default router;
