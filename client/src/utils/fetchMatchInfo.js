import axios from "axios";

const API = process.env.REACT_APP_API_URL;

export async function getCricketSquads(id) {
  const { data } = await axios.get(`${API}/api/cricket/squads/${id}`);
  return data.response || {};
}

export async function getFootballLineups(id) {
  const { data } = await axios.get(`${API}/api/football/lineups/${id}`);
  return data.response || [];
}
