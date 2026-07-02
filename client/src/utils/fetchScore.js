// client/src/utils/fetchScore.js
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

// ✅ Fetch live matches
export async function fetchLiveScore(gameId) {
  try {
    const res = await axios.get(`${API_URL}/api/${gameId}/live-matches`);
    return res.data;
  } catch (e) {
    console.error("Live score error:", e);
    return null;
  }
}

// ✅ Fetch past matches
export async function fetchPastScore(gameId) {
  try {
    const res = await axios.get(`${API_URL}/api/${gameId}/past-matches`);
    return res.data;
  } catch (e) {
    console.error("Past score error:", e);
    return null;
  }
}
