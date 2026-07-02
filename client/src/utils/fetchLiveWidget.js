// client/src/utils/fetchLiveWidget.js
import { mockMatches } from "./mockData";
import { getAPIUrl } from "./resolveApi";

export async function getMatches(sport) {
  try {
    const API = await getAPIUrl();
    const url = sport ? `${API}/api/matches?sport=${sport}` : `${API}/api/matches`;
    const r = await fetch(url);
    const j = await r.json();
    return { data: j || [], error: false };
  } catch (e) {
    console.warn("API matches failed, using local mock fallback:", e);
    const filtered = sport 
      ? mockMatches.filter(m => m.sport.toLowerCase() === sport.toLowerCase()) 
      : mockMatches;
    return { data: filtered, error: false };
  }
}
