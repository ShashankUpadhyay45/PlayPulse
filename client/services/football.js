import express from "express";
import axios from "axios";

const router = express.Router();
const API_KEY = process.env.FOOTBALL_API_KEY;

router.get("/live", async (req, res) => {
  try {
    const r = await axios.get("https://v3.football.api-sports.io/fixtures?live=all", {
      headers: { "x-apisports-key": API_KEY }
    });
    res.json(r.data);
  } catch (err) {
    res.status(500).json({ error: "Football API error" });
  }
});

export default router;
