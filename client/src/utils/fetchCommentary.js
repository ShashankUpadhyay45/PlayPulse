import axios from "axios";

const API = process.env.REACT_APP_API_URL;

export async function getCricketCommentary(id) {
  const { data } = await axios.get(`${API}/api/cricket/commentary/${id}`);
  return data.response?.commentary || [];
}

export async function getFootballCommentary(id) {
  const { data } = await axios.get(`${API}/api/football/commentary/${id}`);
  return data.response?.events || [];
}
