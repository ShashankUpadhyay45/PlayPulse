// server/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import fetch from "node-fetch";
import { mockMatches, mockPlayers, mockCommentaries, mockSquads } from "./utils/mockData.js";

dotenv.config();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

/* =======================
   MIDDLEWARE
======================= */
app.use(
  cors({
    origin: [FRONTEND_URL, "http://localhost:3000", "http://localhost:3001", "http://localhost:5173"],
    credentials: true,
  })
);

app.use(express.json());

/* =======================
   REAL-TIME RSS SPORTS PARSER (CRICINFO & SCORESPRO FALLBACK)
======================= */
async function getRealMatchesFromRSS(sport) {
  let url = "";
  if (sport === "cricket") {
    url = "http://static.cricinfo.com/rss/livescores.xml";
  } else if (sport === "football") {
    url = "https://www.scorespro.com/rss2/livescore-soccer.xml";
  } else if (sport === "basketball") {
    url = "https://www.scorespro.com/rss2/livescore-basketball.xml";
  } else if (sport === "tennis") {
    url = "https://www.scorespro.com/rss2/livescore-tennis.xml";
  } else {
    return [];
  }

  try {
    const res = await fetch(url);
    const xml = await res.text();
    
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match;
    const matches = [];
    
    while ((match = itemRegex.exec(xml)) !== null) {
      const itemContent = match[1];
      const title = itemContent.match(/<title>([\s\S]*?)<\/title>/)?.[1] || "";
      const desc = itemContent.match(/<description>([\s\S]*?)<\/description>/)?.[1] || "";
      const guid = itemContent.match(/<guid>([\s\S]*?)<\/guid>/)?.[1] || "";
      const id = guid.split("/").pop()?.split(".html")[0] || `${sport}-${matches.length}`;
      
      let team1 = "Team A";
      let team2 = "Team B";
      let score1 = "-";
      let score2 = "-";
      
      let cleanTitle = title;
      if (sport !== "cricket") {
        const titleParts = title.split(" - ");
        if (titleParts.length >= 2) {
          cleanTitle = titleParts[titleParts.length - 1];
        }
      }
      
      const vSplit = cleanTitle.split(/ v | vs /i);
      if (vSplit.length === 2) {
        team1 = vSplit[0].trim();
        team2 = vSplit[1].trim();
        
        const scoreRegex = /(.*?) (\d+\/\d+|\d+.*)/;
        const match1 = team1.match(scoreRegex);
        if (match1) {
          team1 = match1[1].trim();
          score1 = match1[2].trim();
        }
        const match2 = team2.match(scoreRegex);
        if (match2) {
          team2 = match2[1].trim();
          score2 = match2[2].trim();
        }
      } else {
        team1 = cleanTitle;
      }

      if (score1 === "-" && score2 === "-") {
        const descScoreRegex = /(\d+)\s*-\s*(\d+)/;
        const descMatch = desc.match(descScoreRegex);
        if (descMatch) {
          score1 = descMatch[1].trim();
          score2 = descMatch[2].trim();
        }
      }

      const isLive = desc.toLowerCase().includes("live") || 
                     desc.toLowerCase().includes("playing") || 
                     desc.toLowerCase().includes("batting") ||
                     desc.match(/\d+'/);
      
      matches.push({
        id: `real-${sport}-${id}`,
        sport: sport,
        team1,
        team2,
        score1,
        score2,
        status: isLive ? "live" : "completed",
        time: desc,
        venue: "International Ground",
        summary: title
      });
    }
    return matches;
  } catch (e) {
    console.error(`Failed to fetch livescore RSS for ${sport}:`, e);
    return [];
  }
}

/* =======================
   ESPN PUBLIC API SCOREBOARD CRAWLER (REAL GLOBAL SCHEDULES)
======================= */
async function getESPNMatches(sport) {
  let urls = [];
  if (sport === "football") {
    urls = [
      "https://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/scoreboard",
      "https://site.api.espn.com/apis/site/v2/sports/soccer/esp.1/scoreboard",
      "https://site.api.espn.com/apis/site/v2/sports/soccer/usa.1/scoreboard"
    ];
  } else if (sport === "basketball") {
    urls = [
      "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard"
    ];
  } else {
    return [];
  }

  const matches = [];
  for (const url of urls) {
    try {
      const res = await fetch(url);
      const data = await res.json();
      
      const events = data.events || [];
      for (const event of events) {
        const comp = event.competitions?.[0];
        if (!comp) continue;
        
        const home = comp.competitors?.find(c => c.homeAway === "home");
        const away = comp.competitors?.find(c => c.homeAway === "away");
        if (!home || !away) continue;
        
        const team1 = home.team?.displayName || "Home Team";
        const team2 = away.team?.displayName || "Away Team";
        const score1 = home.score !== undefined ? String(home.score) : "-";
        const score2 = away.score !== undefined ? String(away.score) : "-";
        
        // Status mapping: live, upcoming, completed
        let status = "upcoming";
        const statusType = event.status?.type?.name; // STATUS_SCHEDULED, STATUS_IN_PROGRESS, STATUS_FINAL
        if (statusType === "STATUS_IN_PROGRESS") {
          status = "live";
        } else if (statusType === "STATUS_FINAL") {
          status = "completed";
        }
        
        // Format date and time beautifully
        const matchDate = new Date(event.date);
        const formattedTime = matchDate.toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit"
        });
        
        const venue = comp.venue?.fullName || "International Arena";
        const id = `espn-${sport}-${event.id}`;
        
        matches.push({
          id,
          sport,
          team1,
          team2,
          score1: status === "upcoming" ? "-" : score1,
          score2: status === "upcoming" ? "-" : score2,
          status,
          time: status === "live" ? `Live - ${event.status?.type?.detail}` : formattedTime,
          venue,
          summary: event.name || `${team1} vs ${team2}`
        });
      }
    } catch (e) {
      console.error(`ESPN API fetch failed for ${url}:`, e);
    }
  }
  return matches;
}

/* =======================
   WIKIPEDIA CATEGORY MEMBER SCRAPER (INFINITE LIVE SPORT PLAYERS)
======================= */
async function getPlayersFromWikipediaCategory(sport) {
  let category = "";
  let role = "Professional Athlete";
  if (sport === "cricket") {
    category = "Category:Indian_cricketers";
    role = "Professional Cricketer";
  } else if (sport === "football") {
    category = "Category:Premier_League_players";
    role = "Professional Footballer";
  } else if (sport === "basketball") {
    category = "Category:National_Basketball_Association_players";
    role = "NBA Basketball Player";
  } else if (sport === "tennis") {
    category = "Category:Grand_Slam_tennis_champions";
    role = "Tennis Player";
  } else if (sport === "kabaddi") {
    category = "Category:Pro_Kabaddi_League_players";
    role = "Kabaddi Player";
  } else {
    category = "Category:Olympic_medalists_for_India";
    role = "Olympic Athlete";
  }

  try {
    const url = `https://en.wikipedia.org/w/api.php?action=query&list=categorymembers&cmtitle=${encodeURIComponent(category)}&cmlimit=30&format=json&origin=*`;
    const res = await fetch(url);
    const data = await res.json();
    
    const members = data.query?.categorymembers || [];
    
    const players = members
      .filter(m => m.ns === 0 && !m.title.includes("List of") && m.title.trim().length > 3)
      .map(m => {
        const id = m.title.toLowerCase().replace(/ /g, "-").replace(/[^a-z0-9-]/g, "");
        return {
          id,
          name: m.title,
          sport: sport,
          role: role,
          country: sport === "cricket" || sport === "athletics" ? "India" : "International"
        };
      });
      
    return players;
  } catch (e) {
    console.error(`Failed to fetch Wikipedia category members for ${sport}:`, e);
    return [];
  }
}

/* =======================
   UNIFIED MATCH AGGREGATOR (ESPN + FEED CRAWLER)
======================= */
async function getUnifiedMatches() {
  const [cricket, football, basketball, tennis] = await Promise.all([
    getRealMatchesFromRSS("cricket"),
    getRealMatchesFromRSS("football"),
    getRealMatchesFromRSS("basketball"),
    getRealMatchesFromRSS("tennis")
  ]);

  const [espnFootball, espnBasketball] = await Promise.all([
    getESPNMatches("football"),
    getESPNMatches("basketball")
  ]);

  let combined = [
    ...cricket,
    ...espnFootball,
    ...espnBasketball,
    ...tennis,
    ...mockMatches.filter(m => m.sport === "kabaddi" || m.sport === "athletics")
  ];

  const seenIds = new Set();
  const deduped = [];
  for (const m of combined) {
    if (!seenIds.has(m.id)) {
      seenIds.add(m.id);
      deduped.push(m);
    }
  }

  return deduped;
}

/* =======================
   COMPREHENSIVE LOCAL SQUAD HELPER (IMMUNE TO RECURSIONS)
======================= */
function getSquadsHelper(match, matchId) {
  const sport = match.sport.toLowerCase();
  const team1 = match.team1;
  const team2 = match.team2;
  
  let referee = "Official Referee";
  if (sport === "cricket") {
    const umpires = ["Richard Kettleborough (ENG)", "Nitin Menon (IND)", "Michael Gough (ENG)", "Rod Tucker (AUS)", "Kumar Dharmasena (SL)"];
    referee = `Umpires: ${umpires[matchId.charCodeAt(0) % umpires.length]} & ${umpires[matchId.charCodeAt(matchId.length - 1) % umpires.length]} (Match Referee: Javagal Srinath)`;
  } else if (sport === "football") {
    const refs = ["Michael Oliver (ENG)", "Szymon Marciniak (POL)", "Jesús Gil Manzano (ESP)", "Anthony Taylor (ENG)", "Clement Turpin (FRA)"];
    referee = `Referee: ${refs[matchId.charCodeAt(0) % refs.length]} (VAR Assistant: Stuart Attwell)`;
  } else if (sport === "basketball") {
    const refs = ["Scott Foster", "Tony Brothers", "Marc Davis", "Zach Zarba"];
    referee = `Crew Chief: ${refs[matchId.charCodeAt(0) % refs.length]}`;
  } else if (sport === "tennis") {
    referee = `Chair Umpire: Mohamed Lahyani (SWE)`;
  } else if (sport === "kabaddi") {
    referee = `Referees: Ravinder Singh & Jagdish Prasad`;
  }
  
  const getPlayersForTeam = (teamName, sportName) => {
    const db = sportPlayersDb[sportName] || [];
    let list = db.filter(p => teamName.toLowerCase().includes(p.country.toLowerCase()));
    if (list.length < 5) {
      list = db.slice(0, 5);
    }
    return list.map(p => ({ name: p.name, role: p.role }));
  };

  const team1Players = getPlayersForTeam(team1, sport);
  const team2Players = getPlayersForTeam(team2, sport);

  return { referee, team1Players, team2Players };
}

/* =======================
   SEEDED STATS GENERATOR FOR ANY ATHLETE
======================= */
function generateSeededStats(pid, sport, role) {
  let hash = 0;
  for (let i = 0; i < pid.length; i++) {
    hash = pid.charCodeAt(i) + ((hash << 5) - hash);
  }
  const seed = Math.abs(hash);
  
  const stats = {};
  if (sport === "cricket") {
    const isBowler = role.toLowerCase().includes("bowler") || role.toLowerCase().includes("all-rounder");
    if (isBowler) {
      stats["Format"] = ["Test", "ODI", "T20I"];
      stats["Matches"] = [12 + (seed % 90), 25 + (seed % 200), 18 + (seed % 120)];
      stats["Wickets"] = stats["Matches"].map(m => Math.round(m * (1.1 + (seed % 2))));
      stats["Average"] = stats["Matches"].map(() => (21.5 + (seed % 100) / 10).toFixed(2));
      stats["Economy"] = [ (2.7 + (seed % 15) / 10).toFixed(2), (4.4 + (seed % 20) / 10).toFixed(2), (7.1 + (seed % 25) / 10).toFixed(2) ];
      stats["5w Hauls"] = stats["Wickets"].map(w => Math.round(w / 16));
    } else {
      stats["Format"] = ["Test", "ODI", "T20I"];
      stats["Matches"] = [18 + (seed % 110), 35 + (seed % 270), 22 + (seed % 140)];
      stats["Runs"] = stats["Matches"].map((m, idx) => m * (idx === 0 ? 46 : idx === 1 ? 39 : 29) + (seed % 600));
      stats["Average"] = stats["Matches"].map(() => (33.5 + (seed % 260) / 10).toFixed(2));
      stats["Strike Rate"] = [ (49.5 + (seed % 140) / 10).toFixed(2), (79.2 + (seed % 190) / 10).toFixed(2), (125.5 + (seed % 290) / 10).toFixed(2) ];
      stats["100s/50s"] = stats["Runs"].map(r => `${Math.round(r / 1100)}/${Math.round(r / 320)}`);
    }
  } else if (sport === "football") {
    stats["Season"] = ["2022-23", "2023-24", "Career Total"];
    stats["Appearances"] = [24 + (seed % 22), 27 + (seed % 18), 170 + (seed % 350)];
    const goalFactor = role.toLowerCase().includes("forward") || role.toLowerCase().includes("striker") || role.toLowerCase().includes("winger") ? 0.65 : role.toLowerCase().includes("midfield") ? 0.22 : 0.04;
    stats["Goals"] = stats["Appearances"].map(a => Math.round(a * goalFactor + (seed % 7)));
    stats["Assists"] = stats["Appearances"].map(a => Math.round(a * (goalFactor * 0.75) + (seed % 6)));
    stats["Pass Accuracy %"] = [ (79.1 + (seed % 14)).toFixed(1), (81.0 + (seed % 11)).toFixed(1), (82.5 + (seed % 7)).toFixed(1) ];
  } else if (sport === "basketball") {
    stats["Season"] = ["2022-23", "2023-24", "Career Average"];
    stats["Games Played"] = [48 + (seed % 27), 58 + (seed % 22), 420 + (seed % 450)];
    stats["Points Per Game"] = [ (11.8 + (seed % 190) / 10).toFixed(1), (13.5 + (seed % 170) / 10).toFixed(1), (14.8 + (seed % 130) / 10).toFixed(1) ];
    stats["Assists Per Game"] = [ (2.2 + (seed % 85) / 10).toFixed(1), (3.0 + (seed % 75) / 10).toFixed(1), (3.2 + (seed % 55) / 10).toFixed(1) ];
    stats["Rebounds Per Game"] = [ (3.2 + (seed % 105) / 10).toFixed(1), (4.0 + (seed % 95) / 10).toFixed(1), (4.2 + (seed % 85) / 10).toFixed(1) ];
  } else if (sport === "tennis") {
    stats["Category"] = ["2023 Season", "2024 Season", "Career Total"];
    stats["Aces"] = [110 + (seed % 420), 85 + (seed % 320), 1100 + (seed % 5200)];
    stats["Break Points Saved %"] = [ (54.8 + (seed % 19)).toFixed(1), (57.5 + (seed % 16)).toFixed(1), (59.6 + (seed % 11)).toFixed(1) ];
    stats["Win-Loss Record"] = [`${28 + (seed % 27)}-${11 + (seed % 13)}`, `${24 + (seed % 21)}-${9 + (seed % 11)}`, `${280 + (seed % 520)}-${115 + (seed % 210)}` ];
  } else if (sport === "kabaddi") {
    stats["Category"] = ["Recent Season", "Previous Season", "Career Total"];
    stats["Matches Played"] = [17 + (seed % 7), 19 + (seed % 5), 75 + (seed % 110)];
    stats["Raid Points"] = stats["Matches Played"].map(m => m * (3.8 + (seed % 9)));
    stats["Super Raids"] = stats["Matches Played"].map(m => Math.round(m / 6));
  } else {
    stats["Competition"] = ["Olympics", "Asian Games", "Commonwealth Games"];
    stats["Gold Medals"] = [seed % 4, seed % 5, seed % 4];
    stats["Silver Medals"] = [seed % 3, seed % 3, seed % 3];
    stats["Bronze Medals"] = [seed % 3, seed % 3, seed % 3];
    stats["Appearances"] = stats["Gold Medals"].map((g, idx) => g + stats["Silver Medals"][idx] + stats["Bronze Medals"][idx] + (seed % 4));
  }
  return stats;
}

/* =======================
   DYNAMIC PLAYER MATCH PERFORMANCE SCORECARD API
======================= */
app.get("/api/scorecard/:matchId", async (req, res) => {
  const { matchId } = req.params;
  const allMatches = await getUnifiedMatches();
  const match = allMatches.find(m => m.id === matchId);
  
  if (!match) {
    return res.status(404).json({ ok: false, msg: "Match not found" });
  }

  const sport = match.sport.toLowerCase();
  const team1 = match.team1;
  const team2 = match.team2;
  const squads = getSquadsHelper(match, matchId);

  if (sport === "cricket") {
    const getRuns = (scoreStr) => {
      const match = scoreStr.match(/(\d+)\/(\d+)|(\d+)/);
      if (!match) return { runs: 120, wickets: 5 };
      if (match[1]) return { runs: parseInt(match[1]), wickets: parseInt(match[2]) };
      return { runs: parseInt(match[3]), wickets: 10 };
    };

    const s1 = getRuns(match.score1);
    const s2 = getRuns(match.score2);

    const t1Batsmen = squads.team1Players.map((p, idx) => {
      let status = "c & b Bowler";
      let runs = Math.round(s1.runs * (idx === 0 ? 0.15 : idx === 1 ? 0.35 : idx === 2 ? 0.20 : 0.08));
      if (idx === 0) status = "c Smith b Starc";
      else if (idx === 1) status = "c Warner b Cummins";
      else if (idx === 2) status = "not out";
      else if (idx >= s1.wickets) {
        status = "did not bat";
        runs = 0;
      }
      const balls = runs > 0 ? Math.round(runs * (0.8 + (idx % 4) / 10)) : 0;
      const fours = Math.round(runs * 0.08);
      const sixes = Math.round(runs * 0.02);
      const sr = balls > 0 ? ((runs / balls) * 100).toFixed(2) : "0.00";
      
      return { name: p.name, status, runs, balls, fours, sixes, sr };
    });

    const t2Bowlers = squads.team2Players.filter(p => p.role.toLowerCase().includes("bowler") || p.role.toLowerCase().includes("all-rounder")).map((p, idx) => {
      const overs = 10;
      const runs = Math.round(s1.runs / 4) + (idx * 5);
      const wickets = idx === 0 ? Math.min(2, s1.wickets) : idx === 1 ? Math.min(1, s1.wickets - 1) : 0;
      return { name: p.name, overs, maidens: idx === 0 ? 1 : 0, runs, wickets, economy: (runs / overs).toFixed(2) };
    });

    const t2Batsmen = squads.team2Players.map((p, idx) => {
      let status = "c & b Bowler";
      let runs = Math.round(s2.runs * (idx === 0 ? 0.25 : idx === 1 ? 0.40 : idx === 2 ? 0.15 : 0.05));
      if (idx === 0) status = "c Rahul b Bumrah";
      else if (idx === 1) status = "not out";
      else if (idx === 2) status = "b Jadeja";
      else if (idx >= s2.wickets) {
        status = "did not bat";
        runs = 0;
      }
      const balls = runs > 0 ? Math.round(runs * (0.95 + (idx % 3) / 10)) : 0;
      const fours = Math.round(runs * 0.08);
      const sixes = Math.round(runs * 0.03);
      const sr = balls > 0 ? ((runs / balls) * 100).toFixed(2) : "0.00";
      
      return { name: p.name, status, runs, balls, fours, sixes, sr };
    });

    const t1Bowlers = squads.team1Players.filter(p => p.role.toLowerCase().includes("bowler") || p.role.toLowerCase().includes("all-rounder")).map((p, idx) => {
      const overs = 8;
      const runs = Math.round(s2.runs / 3) + (idx * 4);
      const wickets = idx === 0 ? Math.min(2, s2.wickets) : idx === 1 ? Math.min(1, s2.wickets - 1) : 0;
      return { name: p.name, overs, maidens: idx === 0 ? 1 : 0, runs, wickets, economy: (runs / overs).toFixed(2) };
    });

    return res.json({
      ok: true,
      sport,
      data: { innings1: t1Batsmen, innings1Bowling: t2Bowlers, innings2: t2Batsmen, innings2Bowling: t1Bowlers }
    });
  }
  
  if (sport === "football") {
    const goals1 = parseInt(match.score1) || 0;
    const goals2 = parseInt(match.score2) || 0;

    const generatePlayerPerformance = (players, ownGoals, otherGoals) => {
      return players.map((p, idx) => {
        const goals = idx === 0 && ownGoals > 0 ? 1 : idx === 1 && ownGoals > 1 ? 1 : 0;
        const assists = idx === 1 && ownGoals > 0 ? 1 : idx === 2 && ownGoals > 1 ? 1 : 0;
        const shots = goals + (idx === 0 ? 2 : idx === 1 ? 1 : 0);
        const passes = `${30 + (idx * 5)}/${35 + (idx * 5)}`;
        const cards = idx === 2 && otherGoals > 0 ? "Yellow" : "None";
        const rating = (6.5 + goals * 1.5 + assists * 1.0 - (cards === "Yellow" ? 0.5 : 0)).toFixed(1);
        return { name: p.name, goals, assists, shots, passes, cards, rating };
      });
    };

    const team1Stats = generatePlayerPerformance(squads.team1Players, goals1, goals2);
    const team2Stats = generatePlayerPerformance(squads.team2Players, goals2, goals1);

    return res.json({
      ok: true,
      sport,
      data: { team1: team1Stats, team2: team2Stats }
    });
  }

  if (sport === "basketball") {
    const score1 = parseInt(match.score1) || 98;
    const score2 = parseInt(match.score2) || 95;

    const generatePerformance = (players, teamScore) => {
      return players.map((p, idx) => {
        const points = Math.round(teamScore * (idx === 0 ? 0.35 : idx === 1 ? 0.25 : idx === 2 ? 0.15 : 0.05));
        const rebounds = 3 + (idx * 2) + (teamScore % 4);
        const assists = 2 + (idx * 3) - (teamScore % 3);
        const fg = `${Math.round(points / 2)}/${Math.round(points / 2) + 6}`;
        return { name: p.name, points, rebounds, assists, fg };
      });
    };

    return res.json({
      ok: true,
      sport,
      data: { team1: generatePerformance(squads.team1Players, score1), team2: generatePerformance(squads.team2Players, score2) }
    });
  }

  if (sport === "tennis") {
    const stats = [
      { stat: "Aces", val1: 8 + (match.score1.length % 5), val2: 5 + (match.score2.length % 5) },
      { stat: "Double Faults", val1: 2, val2: 3 },
      { stat: "First Serve %", val1: "65%", val2: "62%" },
      { stat: "Winners", val1: 38, val2: 30 },
      { stat: "Break Points Saved %", val1: "70%", val2: "58%" }
    ];
    return res.json({
      ok: true,
      sport,
      data: stats
    });
  }

  if (sport === "kabaddi") {
    const score1 = parseInt(match.score1) || 35;
    const score2 = parseInt(match.score2) || 32;

    const generatePerformance = (players, score) => {
      return players.map((p, idx) => {
        const raidPoints = idx === 0 ? Math.round(score * 0.4) : idx === 1 ? Math.round(score * 0.2) : 0;
        const tacklePoints = idx === 2 ? Math.round(score * 0.15) : 1;
        const superRaids = idx === 0 && raidPoints > 10 ? 1 : 0;
        return { name: p.name, raidPoints, tacklePoints, superRaids };
      });
    };

    return res.json({
      ok: true,
      sport,
      data: { team1: generatePerformance(squads.team1Players, score1), team2: generatePerformance(squads.team2Players, score2) }
    });
  }

  const rankings = [
    { name: squads.team1Players[0]?.name || "Athlete A", result: match.score1 || "Winner", country: "India" },
    { name: squads.team2Players[0]?.name || "Athlete B", result: match.score2 || "Runner up", country: "International" }
  ];
  
  return res.json({
    ok: true,
    sport,
    data: rankings
  });
});

/* =======================
   SQUADS, REFEREE & UMPIRES API
====================== */
app.get("/api/squads/:matchId", async (req, res) => {
  const { matchId } = req.params;
  const allMatches = await getUnifiedMatches();
  const match = allMatches.find(m => m.id === matchId);
  
  if (match) {
    const squad = getSquadsHelper(match, matchId);
    res.json({ ok: true, data: squad });
  } else {
    res.json({
      ok: true,
      data: {
        referee: "Official Referee",
        team1Players: [
          { name: "Player 1", role: "Starter" },
          { name: "Player 2", role: "Starter" }
        ],
        team2Players: [
          { name: "Player 3", role: "Starter" },
          { name: "Player 4", role: "Starter" }
        ]
      }
    });
  }
});

/* =======================
   AUTO-INCREMENT PORT
======================= */
function startServer(port) {
  app.listen(port, () => {
    console.log(`✅ PlayPulse API server running on port ${port}`);
  })
  .on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.log(`⚠️ Port ${port} busy — trying ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error("Server Error:", err);
    }
  });
}

startServer(parseInt(process.env.PORT || "4000"));
