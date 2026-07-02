// server/utils/mockData.js

export const mockMatches = [
  // CRICKET
  {
    id: "cricket-1",
    sport: "cricket",
    team1: "India",
    team2: "Australia",
    score1: "352/5 (50.0 overs)",
    score2: "210/4 (34.2 overs)",
    status: "live",
    time: "Live - Aus needs 143 runs in 94 balls",
    venue: "Narendra Modi Stadium, Ahmedabad",
    summary: "India posted a massive 352/5. Australia currently chasing with Travis Head batting on 82*."
  },
  {
    id: "cricket-2",
    sport: "cricket",
    team1: "Mumbai Indians",
    team2: "Chennai Super Kings",
    score1: "182/7 (20.0 overs)",
    score2: "185/4 (19.3 overs)",
    status: "completed",
    time: "CSK won by 6 wickets",
    venue: "Wankhede Stadium, Mumbai",
    summary: "CSK chased down 182 with 3 balls to spare. MS Dhoni finished it off with a classic six."
  },
  
  // FOOTBALL
  {
    id: "football-1",
    sport: "football",
    team1: "Real Madrid",
    team2: "Barcelona",
    score1: "2",
    score2: "1",
    status: "live",
    time: "Live - 78'",
    venue: "Santiago Bernabeu, Madrid",
    summary: "El Clasico: Vinicius Jr scored in 12' and Bellingham in 62'. Lewandowski pulled one back in 71'."
  },
  {
    id: "football-2",
    sport: "football",
    team1: "Manchester City",
    team2: "Arsenal",
    score1: "0",
    score2: "0",
    status: "upcoming",
    time: "Tomorrow 9:00 PM",
    venue: "Etihad Stadium, Manchester",
    summary: "Top of the table clash. Both teams fighting for the Premier League crown."
  },

  // BASKETBALL
  {
    id: "basketball-1",
    sport: "basketball",
    team1: "LA Lakers",
    team2: "Golden State Warriors",
    score1: "102",
    score2: "108",
    status: "live",
    time: "Live - Q4 2:15",
    venue: "Crypto.com Arena, Los Angeles",
    summary: "Stephen Curry leading the Warriors with 34 points. LeBron James has 28 points and 11 assists."
  },

  // TENNIS
  {
    id: "tennis-1",
    sport: "tennis",
    team1: "Carlos Alcaraz",
    team2: "Novak Djokovic",
    score1: "6 | 3 | 4",
    score2: "4 | 6 | 5",
    status: "live",
    time: "Live - Set 3, Djokovic serving 30-40",
    venue: "Centre Court, Wimbledon",
    summary: "Wimbledon Final remake. Extremely close match with high intensity rallies."
  },

  // KABADDI
  {
    id: "kabaddi-1",
    sport: "kabaddi",
    team1: "Patna Pirates",
    team2: "Jaipur Pink Panthers",
    score1: "38",
    score2: "35",
    status: "live",
    time: "Live - 2nd Half 35:10",
    venue: "Kanteerava Stadium, Bengaluru",
    summary: "Patna Pirates leading by 3 points thanks to a Super Raid by their lead raider."
  },

  // ATHLETICS
  {
    id: "athletics-1",
    sport: "athletics",
    team1: "Men's 100m Sprint Final",
    team2: "Olympics 2024",
    score1: "Gold: USA (9.79s)",
    score2: "Silver: JAM (9.81s)",
    status: "completed",
    time: "Completed",
    venue: "Stade de France, Paris",
    summary: "USA clinches Gold in a photo-finish sprint. Jamaica takes Silver, Italy takes Bronze."
  },
  {
    id: "athletics-2",
    sport: "athletics",
    team1: "Men's Javelin Throw Final",
    team2: "Asian Games 2026",
    score1: "Gold: India (88.88m)",
    score2: "Silver: Pakistan (87.15m)",
    status: "completed",
    time: "Completed",
    venue: "Hangzhou Olympic Center",
    summary: "Neeraj Chopra secures Gold with a magnificent 88.88m throw in his second attempt."
  }
];

export const mockPlayers = {
  // CRICKET
  "virat-kohli": {
    id: "virat-kohli",
    name: "Virat Kohli",
    sport: "cricket",
    team: "India",
    role: "Right-Handed Batsman",
    nationality: "Indian",
    age: "37",
    stats: {
      "Format": ["Test", "ODI", "T20I"],
      "Matches": [113, 292, 125],
      "Runs": [8848, 13848, 4188],
      "Average": [49.15, 58.67, 48.69],
      "Strike Rate": [55.56, 93.54, 137.04],
      "100s/50s": ["29/30", "50/72", "1/38"]
    }
  },
  "ms-dhoni": {
    id: "ms-dhoni",
    name: "MS Dhoni",
    sport: "cricket",
    team: "Chennai Super Kings",
    role: "Wicketkeeper Batsman",
    nationality: "Indian",
    age: "44",
    stats: {
      "Format": ["Test", "ODI", "T20I"],
      "Matches": [90, 350, 98],
      "Runs": [4876, 10773, 1617],
      "Average": [38.09, 50.57, 37.60],
      "Strike Rate": [59.11, 87.56, 126.13],
      "Catches/Stumpings": ["256/38", "321/123", "57/34"]
    }
  },

  // FOOTBALL
  "lionel-messi": {
    id: "lionel-messi",
    name: "Lionel Messi",
    sport: "football",
    team: "Inter Miami / Argentina",
    role: "Forward / Playmaker",
    nationality: "Argentinian",
    age: "38",
    stats: {
      "Season": ["2022-23", "2023-24", "Career Total"],
      "Appearances": [41, 32, 1045],
      "Goals": [21, 25, 821],
      "Assists": [20, 15, 361],
      "Pass Accuracy %": [89.2, 88.5, 86.9],
      "Chances Created": [115, 88, 1920]
    }
  },
  "cristiano-ronaldo": {
    id: "cristiano-ronaldo",
    name: "Cristiano Ronaldo",
    sport: "football",
    team: "Al Nassr / Portugal",
    role: "Forward",
    nationality: "Portuguese",
    age: "41",
    stats: {
      "Season": ["2022-23", "2023-24", "Career Total"],
      "Appearances": [35, 41, 1210],
      "Goals": [24, 42, 893],
      "Assists": [6, 11, 248],
      "Pass Accuracy %": [84.1, 83.5, 82.8],
      "Shots on Target": [92, 115, 2350]
    }
  },

  // BASKETBALL
  "lebron-james": {
    id: "lebron-james",
    name: "LeBron James",
    sport: "basketball",
    team: "LA Lakers",
    role: "Small Forward",
    nationality: "American",
    age: "41",
    stats: {
      "Season": ["2022-23", "2023-24", "Career Average"],
      "Games Played": [55, 71, 1492],
      "Points Per Game": [28.9, 25.7, 27.1],
      "Assists Per Game": [6.8, 8.3, 7.4],
      "Rebounds Per Game": [8.3, 7.3, 7.5],
      "Steals Per Game": [0.9, 1.3, 1.5]
    }
  },

  // TENNIS
  "novak-djokovic": {
    id: "novak-djokovic",
    name: "Novak Djokovic",
    sport: "tennis",
    team: "Serbia",
    role: "Right-Handed Singles Player",
    nationality: "Serbian",
    age: "38",
    stats: {
      "Category": ["2023 Season", "2024 Season", "Career Total"],
      "Aces": [382, 290, 6850],
      "Break Points Saved %": [68.5, 66.2, 65.4],
      "First Serve %": [64.8, 65.1, 64.9],
      "Grand Slam Titles": [3, 0, 24],
      "Win-Loss Record": ["56-7", "35-8", "1101-220"]
    }
  },

  // KABADDI
  "pardeep-narwal": {
    id: "pardeep-narwal",
    name: "Pardeep Narwal",
    sport: "kabaddi",
    team: "Patna Pirates",
    role: "Raider",
    nationality: "Indian",
    age: "29",
    stats: {
      "Category": ["Season 9", "Season 10", "Career Total"],
      "Matches Played": [22, 20, 170],
      "Raid Points": [220, 180, 1690],
      "Super Raids": [12, 8, 82],
      "Super 10s": [11, 7, 85],
      "Success Rate %": [58.2, 54.1, 56.9]
    }
  },

  // ATHLETICS / MULTI-SPORT GAMES
  "neeraj-chopra": {
    id: "neeraj-chopra",
    name: "Neeraj Chopra",
    sport: "athletics",
    team: "India",
    role: "Javelin Thrower",
    nationality: "Indian",
    age: "28",
    stats: {
      "Competition": ["Olympics", "Asian Games", "Commonwealth Games"],
      "Best Throw (m)": ["88.88m", "88.88m", "86.47m"],
      "Gold Medals": [1, 2, 1],
      "Silver Medals": [1, 0, 0],
      "Bronze Medals": [0, 0, 0],
      "Year of Gold": ["2020 (Tokyo)", "2018, 2022", "2018 (Gold Coast)"]
    }
  },
  "pv-sindhu": {
    id: "pv-sindhu",
    name: "PV Sindhu",
    sport: "athletics",
    team: "India",
    role: "Badminton Player",
    nationality: "Indian",
    age: "30",
    stats: {
      "Competition": ["Olympics", "Asian Games", "Commonwealth Games"],
      "Matches Won": [18, 12, 15],
      "Gold Medals": [0, 0, 1],
      "Silver Medals": [1, 1, 1],
      "Bronze Medals": [1, 1, 1],
      "Year of Gold": ["N/A", "N/A", "2022 (Birmingham)"]
    }
  }
};

export const mockCommentaries = {
  "cricket-1": [
    { time: "34.2", event: "NORMAL", text: "Starc to Travis Head. 1 run. Guided to third man." },
    { time: "34.1", event: "FOUR", text: "Starc to Travis Head. FOUR! Short ball pulled brilliantly to deep midwicket boundary." },
    { time: "33.6", event: "WICKET", text: "Jadeja to Steven Smith. OUT! Caught by Kohli at slip! Smith tries to cut but gets a thick edge. HUGE WICKET!" },
    { time: "33.5", event: "NORMAL", text: "Jadeja to Steven Smith. No run. Defended forward." },
    { time: "33.4", event: "SIX", text: "Jadeja to Travis Head. SIX! Smashed straight down the ground into the sightscreen!" }
  ],
  "football-1": [
    { time: "78'", event: "NORMAL", text: "Real Madrid substitution: Luka Modric comes on for Toni Kroos." },
    { time: "75'", event: "YELLOW_CARD", text: "Yellow Card: Gavi (Barcelona) for a tactical foul on Bellingham." },
    { time: "71'", event: "GOAL", text: "GOAL! Real Madrid 2 - 1 Barcelona. Lewandowski scores! A headers from Gundogan's corner." },
    { time: "62'", event: "GOAL", text: "GOAL! Real Madrid 2 - 0 Barcelona. Jude Bellingham scores! A tap-in after Vinicius's low cross." }
  ],
  "basketball-1": [
    { time: "Q4 2:15", event: "DUNK", text: "LeBron James drives past Klay Thompson and crashes a thunderous one-handed DUNK!" },
    { time: "Q4 2:40", event: "NORMAL", text: "Stephen Curry dishes an assist to Draymond Green for an easy layup." },
    { time: "Q4 3:10", event: "SIX", text: "Stephen Curry sinks a deep 3-pointer from 30 feet out! Swish!" }
  ],
  "tennis-1": [
    { time: "Set 3 4-5", event: "ACE", text: "Carlos Alcaraz serves an Ace down the T! 120mph." },
    { time: "Set 3 4-5", event: "NORMAL", text: "Djokovic hits a deep crosscourt backhand forcing Alcaraz to hit long." }
  ],
  "kabaddi-1": [
    { time: "35:10", event: "SUPER_RAID", text: "SUPER RAID! Pardeep Narwal raids, touches 3 defenders, and successfully crosses the midline! Patna Pirates get 3 points!" },
    { time: "34:30", event: "NORMAL", text: "Jaipur Pink Panthers empty raid by Arjun Deshwal." }
  ]
};

export const mockSquads = {
  "cricket-1": {
    team1Players: [
      { name: "Rohit Sharma", role: "Captain / Batsman" },
      { name: "Virat Kohli", role: "Batsman" },
      { name: "KL Rahul", role: "Wicketkeeper" },
      { name: "Ravindra Jadeja", role: "All-rounder" },
      { name: "Jasprit Bumrah", role: "Bowler" }
    ],
    team2Players: [
      { name: "Pat Cummins", role: "Captain / Bowler" },
      { name: "Travis Head", role: "Batsman" },
      { name: "Steven Smith", role: "Batsman" },
      { name: "Glenn Maxwell", role: "All-rounder" },
      { name: "Mitchell Starc", role: "Bowler" }
    ]
  },
  "football-1": {
    team1Players: [
      { name: "Thibaut Courtois", role: "Goalkeeper" },
      { name: "Eder Militao", role: "Defender" },
      { name: "Jude Bellingham", role: "Midfielder" },
      { name: "Vinicius Jr", role: "Forward" }
    ],
    team2Players: [
      { name: "Marc-Andre ter Stegen", role: "Goalkeeper" },
      { name: "Jules Kounde", role: "Defender" },
      { name: "Gavi", role: "Midfielder" },
      { name: "Robert Lewandowski", role: "Forward" }
    ]
  }
};
