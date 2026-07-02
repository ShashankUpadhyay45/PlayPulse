# 🏏 PlayPulse: Multi-Sport Live Aggregator & Stats Hub

PlayPulse is a premium, full-stack multi-sport live dashboard and athlete statistics hub. It aggregates real-time matches (live scores, upcoming fixtures, completed results) and global player performance logs directly from public feeds (ESPN, ESPN Cricinfo, and ScoresPro) and Wikipedia.

Developed using a state-of-the-art **React frontend** and an **Express.js backend**, PlayPulse is styled with a gorgeous, high-fidelity dark glassmorphic interface, micro-animations, and full mobile responsiveness.

---

## 🚀 Core Features

### 1. 📡 Live Global Match Aggregator (Multi-Sport Feed)
* Queries the official, public **ESPN Scoreboard APIs** for Soccer (Premier League, La Liga, MLS) and Basketball (NBA) concurrently.
* Scrapes live RSS feeds from **ESPN Cricinfo** for Cricket and **ScoresPro** for Tennis.
* Automatically resolves dates, times, and stadium venues in local timezones.

### 2. 📊 Player Match Performance Scorecards
* Renders a sport-specific, detailed scorecard grid for every match:
  * **Cricket 🏏**: Complete batting figures (runs, balls, 4s, 6s, strike rates) and bowling tables (overs, maidens, runs, wickets, economy rates) for both innings.
  * **Football ⚽**: Goals, assists, shots on target, pass accuracy, cards, and match ratings.
  * **Basketball 🏀**: Points, rebounds, assists, and field goals made/attempted.
  * **Tennis 🎾 / Kabaddi 🤼 / Athletics 🏃**: Aces, raid/tackle points, and competition medals.

### 3. 🏁 Match Officials & Referee Panels
* Displays assigned field umpires, crew chiefs, and VAR referees deterministically for every match (e.g. *Richard Kettleborough (ENG)*, *Michael Oliver (ENG)*, etc.).

### 4. 🌍 Infinite Athlete Directory (Wikipedia Integration)
* **Spotlight cards** for top stars (e.g. *Virat Kohli*, *Lionel Messi*, *Rohit Sharma*).
* **See All Players**: Dynamically scrapes live Wikipedia Category archives (e.g. *Grand Slam tennis champions*, *Indian cricketers*, *NBA players*) to expand sport rosters on demand.
* **Global OpenSearch**: Allows searching and generating profile summaries, bios, and seeded career stats tables for *any* historical athlete.

### 5. 🩹 Self-Healing API Port Listener
* Automatically scans local ports (`4000-4004`) to establish connections between the React client and the API server, preventing failures due to port conflicts (`EADDRINUSE`).

---

## 🛠️ Tech Stack
* **Frontend**: React.js (Create React App), React Icons, Framer Motion, Vanilla CSS.
* **Backend**: Node.js, Express, Axios, Node-Fetch (ESM modules), dotenv.
* **Data Sources**: ESPN APIs, Wikipedia Summary API, Cricinfo XML feeds, ScoresPro XML feeds.

---

## ⚙️ Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/ShashankUpadhyay45/PlayPulse.git
cd PlayPulse
```

### 2. Launch the Development Environment
We have created a double-click launcher batch file to clean node caches and start both servers concurrently in separate command logs:
```bash
# Simply run the bat launcher on Windows:
.\run.bat
```
* **Express Backend**: Running on [http://localhost:4000](http://localhost:4000) (auto-incrementing if busy).
* **React Frontend**: Running on [http://localhost:3001](http://localhost:3001).

---

## 📦 Deployment Setup
* **Backend (Render)**: Set root directory to `server`, runtime to `Node`, build command to `npm install`, and start command to `node index.js`.
* **Frontend (Vercel)**: Set root directory to `client`, framework to `Create React App`, and configure `REACT_APP_API_URL` pointing to your backend service URL.
