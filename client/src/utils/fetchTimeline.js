import axios from "axios";

const API = process.env.REACT_APP_API_URL;

export async function getCricketTimeline(id) {
  const { data } = await axios.get(`${API}/api/cricket/timeline/${id}`);
  return data.response?.timeline || [];
}

export async function getFootballTimeline(id) {
  const { data } = await axios.get(`${API}/api/football/timeline/${id}`);
  return data.response || [];
}
