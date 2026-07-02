import express from "express";
import axios from "axios";

const router = express.Router();
const API_KEY = process.env.CRICKET_API_KEY;

// ✅ Live matches
router.get("/live", async (req, res) => {
  try {
    const url = `https://api.entitysport.com/v2/matches/?status=3&token=${API_KEY}`;
    const r = await axios.get(url);
    res.json(r.data);
  } catch (err) {
    res.status(500).json({ error: "Cricket API error", details: err.message });
  }
});

// ✅ Past matches
router.get("/past", async (req, res) => {
  try {
    const url = `https://api.entitysport.com/v2/matches/?status=2&token=${API_KEY}`;
    const r = await axios.get(url);
    res.json(r.data);
  } catch (err) {
    res.status(500).json({ error: "Cricket API error", details: err.message });
  }
});

export default router;
