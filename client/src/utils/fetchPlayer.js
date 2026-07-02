// client/src/utils/fetchPlayer.js
import axios from "axios";
import { mockPlayers } from "./mockData";
import { getAPIUrl } from "./resolveApi";

export async function getPlayerStats(sport, pid) {
  try {
    const API = await getAPIUrl();
    const { data } = await axios.get(`${API}/api/${sport}/player/${pid}`);
    return data.data || mockPlayers[pid] || null;
  } catch (e) {
    console.warn("API player stats failed, using local mock fallback:", e);
    return mockPlayers[pid] || null;
  }
}
