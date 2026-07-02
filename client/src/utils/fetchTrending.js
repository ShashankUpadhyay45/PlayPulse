// client/src/utils/fetchTrending.js
const API = process.env.REACT_APP_API_URL || "http://localhost:4000";

export async function getTrending() {
  try {
    const r = await fetch(`${API}/api/trending`);
    const j = await r.json();
    return { data: j || [], error: false };
  } catch (e) {
    console.error("Fetch trending error:", e);
    return { data: [], error: true };
  }
}
