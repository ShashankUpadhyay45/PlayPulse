import axios from "axios";

const API = process.env.REACT_APP_API_URL;

export async function getCricketStandings(id) {
  const { data } = await axios.get(`${API}/api/cricket/standings/${id}`);
  return data.response || [];
}

export async function getFootballStandings(id) {
  const { data } = await axios.get(`${API}/api/football/standings/${id}`);
  return data.response?.[0]?.league?.standings?.[0] || [];
}
