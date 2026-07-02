// client/src/api.js

const BASE_URL = process.env.REACT_APP_API_URL;

export async function getLiveMatches(sport) {
  try {
    const res = await fetch(`${BASE_URL}/api/${sport}/live-matches`);
    return await res.json();
  } catch (e) {
    console.error("Live API error:", e);
    return { error: true };
  }
}

export async function getPastMatches(sport) {
  try {
    const res = await fetch(`${BASE_URL}/api/${sport}/past-matches`);
    return await res.json();
  } catch (e) {
    console.error("Past API error:", e);
    return { error: true };
  }
}
