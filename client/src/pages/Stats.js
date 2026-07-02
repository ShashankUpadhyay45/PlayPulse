// client/src/pages/Stats.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaRunning, FaChevronRight, FaGlobe, FaSpinner, FaPlus, FaMinus } from "react-icons/fa";
import { getAPIUrl } from "../utils/resolveApi";

// Comprehensive offline player backup roster to guarantee "See All" always populates
const localSportPlayersDb = {
  cricket: [
    { id: "virat-kohli", name: "Virat Kohli", role: "Right-Handed Batsman", country: "India", avatar: "🏏" },
    { id: "ms-dhoni", name: "MS Dhoni", role: "Wicketkeeper Batsman", country: "India", avatar: "🧤" },
    { id: "rohit-sharma", name: "Rohit Sharma", role: "Opening Batsman", country: "India", avatar: "🏏" },
    { id: "sachin-tendulkar", name: "Sachin Tendulkar", role: "Legendary Batsman", country: "India", avatar: "🏏" },
    { id: "babar-azam", name: "Babar Azam", role: "Batsman", country: "Pakistan", avatar: "🏏" },
    { id: "kane-williamson", name: "Kane Williamson", role: "Batsman", country: "New Zealand", avatar: "🏏" },
    { id: "steve-smith", name: "Steve Smith", role: "Batsman", country: "Australia", avatar: "🏏" },
    { id: "joe-root", name: "Joe Root", role: "Batsman", country: "England", avatar: "🏏" },
    { id: "jasprit-bumrah", name: "Jasprit Bumrah", role: "Bowler", country: "India", avatar: "🏏" },
    { id: "hardik-pandya", name: "Hardik Pandya", role: "All-rounder", country: "India", avatar: "🏏" },
    { id: "ravindra-jadeja", name: "Ravindra Jadeja", role: "All-rounder", country: "India", avatar: "🏏" },
    { id: "mitchell-starc", name: "Mitchell Starc", role: "Bowler", country: "Australia", avatar: "🏏" },
    { id: "pat-cummins", name: "Pat Cummins", role: "Bowler / Captain", country: "Australia", avatar: "🏏" },
    { id: "glenn-maxwell", name: "Glenn Maxwell", role: "All-rounder", country: "Australia", avatar: "🏏" },
    { id: "travis-head", name: "Travis Head", role: "Batsman", country: "Australia", avatar: "🏏" }
  ],
  football: [
    { id: "lionel-messi", name: "Lionel Messi", role: "Forward / Playmaker", country: "Argentina", avatar: "⚽" },
    { id: "cristiano-ronaldo", name: "Cristiano Ronaldo", role: "Forward", country: "Portugal", avatar: "⚽" },
    { id: "kylian-mbappe", name: "Kylian Mbappe", role: "Forward", country: "France", avatar: "⚽" },
    { id: "erling-haaland", name: "Erling Haaland", role: "Striker", country: "Norway", avatar: "⚽" },
    { id: "neymar-jr", name: "Neymar", role: "Forward", country: "Brazil", avatar: "⚽" },
    { id: "kevin-de-bruyne", name: "Kevin De Bruyne", role: "Midfielder", country: "Belgium", avatar: "⚽" },
    { id: "jude-bellingham", name: "Jude Bellingham", role: "Midfielder", country: "England", avatar: "⚽" },
    { id: "vinicius-jr", name: "Vinicius Junior", role: "Winger", country: "Brazil", avatar: "⚽" },
    { id: "robert-lewandowski", name: "Robert Lewandowski", role: "Striker", country: "Poland", avatar: "⚽" },
    { id: "luka-modric", name: "Luka Modric", role: "Midfielder", country: "Croatia", avatar: "⚽" },
    { id: "mohamed-salah", name: "Mohamed Salah", role: "Winger", country: "Egypt", avatar: "⚽" },
    { id: "sunil-chhetri", name: "Sunil Chhetri", role: "Forward / Captain", country: "India", avatar: "⚽" }
  ],
  basketball: [
    { id: "lebron-james", name: "LeBron James", role: "Small Forward", country: "USA", avatar: "🏀" },
    { id: "stephen-curry", name: "Stephen Curry", role: "Point Guard", country: "USA", avatar: "🏀" },
    { id: "kevin-durant", name: "Kevin Durant", role: "Power Forward", country: "USA", avatar: "🏀" },
    { id: "giannis-antetokounmpo", name: "Giannis Antetokounmpo", role: "Power Forward", country: "Greece", avatar: "🏀" },
    { id: "nikola-jokic", name: "Nikola Jokic", role: "Center", country: "Serbia", avatar: "🏀" },
    { id: "luka-doncic", name: "Luka Doncic", role: "Point Guard", country: "Slovenia", avatar: "🏀" },
    { id: "joel-embiid", name: "Joel Embiid", role: "Center", country: "Cameroon" , avatar: "🏀" },
    { id: "jayson-tatum", name: "Jayson Tatum", role: "Small Forward", country: "USA" , avatar: "🏀" },
    { id: "michael-jordan", name: "Michael Jordan", role: "Legendary Guard", country: "USA" , avatar: "🏀" },
    { id: "kobe-bryant", name: "Kobe Bryant", role: "Legendary Guard", country: "USA" , avatar: "🏀" }
  ],
  tennis: [
    { id: "novak-djokovic", name: "Novak Djokovic", role: "Singles Player", country: "Serbia", avatar: "🎾" },
    { id: "rafael-nadal", name: "Rafael Nadal", role: "Singles Player", country: "Spain", avatar: "🎾" },
    { id: "roger-federer", name: "Roger Federer", role: "Legendary Singles Player", country: "Switzerland", avatar: "🎾" },
    { id: "carlos-alcaraz", name: "Carlos Alcaraz", role: "Singles Player", country: "Spain", avatar: "🎾" },
    { id: "jannik-sinner", name: "Jannik Sinner", role: "Singles Player", country: "Italy", avatar: "🎾" },
    { id: "daniil-medvedev", name: "Daniil Medvedev", role: "Singles Player", country: "Russia", avatar: "🎾" },
    { id: "serena-williams", name: "Serena Williams", role: "Legendary Women's Singles", country: "USA", avatar: "🎾" },
    { id: "iga-swiatek", name: "Iga Swiatek", role: "Singles Player", country: "Poland", avatar: "🎾" }
  ],
  kabaddi: [
    { id: "pardeep-narwal", name: "Pardeep Narwal", role: "Raider", country: "India", avatar: "🤼" },
    { id: "pawan-sehrawat", name: "Pawan Sehrawat", role: "Raider", country: "India", avatar: "🤼" },
    { id: "naveen-kumar", name: "Naveen Kumar", role: "Raider", country: "India", avatar: "🤼" },
    { id: "maninder-singh", name: "Maninder Singh", role: "Raider", country: "India", avatar: "🤼" },
    { id: "fazel-atrachali", name: "Fazel Atrachali", role: "Defender", country: "Iran", avatar: "🤼" },
    { id: "rahul-chaudhari", name: "Rahul Chaudhari", role: "Raider", country: "India", avatar: "🤼" },
    { id: "anup-kumar", name: "Anup Kumar", role: "Legendary Raider", country: "India", avatar: "🤼" }
  ],
  athletics: [
    { id: "neeraj-chopra", name: "Neeraj Chopra", role: "Javelin Thrower", country: "India", avatar: "🥇" },
    { id: "pv-sindhu", name: "PV Sindhu", role: "Badminton Player", country: "India", avatar: "🏸" },
    { id: "usain-bolt", name: "Usain Bolt", role: "Legendary Sprinter", country: "Jamaica", avatar: "🥇" },
    { id: "abhinav-bindra", name: "Abhinav Bindra", role: "Shooter", country: "India", avatar: "🥇" },
    { id: "mary-kom", name: "Mary Kom", role: "Boxer", country: "India", avatar: "🥇" },
    { id: "milkha-singh", name: "Milkha Singh", role: "Legendary Runner", country: "India", avatar: "🥇" },
    { id: "pt-usha", name: "PT Usha", role: "Legendary Track Athlete", country: "India", avatar: "🥇" },
    { id: "mirabai-chanu", name: "Mirabai Chanu", role: "Weightlifter", country: "India", avatar: "🥇" }
  ]
};

export default function Stats() {
  const [search, setSearch] = useState("");
  const [globalSearch, setGlobalSearch] = useState(false);
  const [globalResults, setGlobalResults] = useState([]);
  const [searching, setSearching] = useState(false);

  const [expandedSports, setExpandedSports] = useState({});
  const [sportPlayersCache, setSportPlayersCache] = useState({});
  const [loadingSport, setLoadingSport] = useState({});

  const localPlayers = [
    { id: "virat-kohli", name: "Virat Kohli", sport: "cricket", role: "Right-Handed Batsman", country: "India", avatar: "🏏" },
    { id: "ms-dhoni", name: "MS Dhoni", sport: "cricket", role: "Wicketkeeper Batsman", country: "India", avatar: "🧤" },
    { id: "rohit-sharma", name: "Rohit Sharma", sport: "cricket", role: "Right-Handed Opening Batsman", country: "India", avatar: "🏏" },
    { id: "lionel-messi", name: "Lionel Messi", sport: "football", role: "Forward / Playmaker", country: "Argentina", avatar: "⚽" },
    { id: "cristiano-ronaldo", name: "Cristiano Ronaldo", sport: "football", role: "Forward", country: "Portugal", avatar: "⚡" },
    { id: "lebron-james", name: "LeBron James", sport: "basketball", role: "Small Forward", country: "USA", avatar: "🏀" },
    { id: "novak-djokovic", name: "Novak Djokovic", sport: "tennis", role: "Singles Player", country: "Serbia", avatar: "🎾" },
    { id: "pardeep-narwal", name: "Pardeep Narwal", sport: "kabaddi", role: "Raider", country: "India", avatar: "🤼" },
    { id: "neeraj-chopra", name: "Neeraj Chopra", sport: "athletics", role: "Javelin Thrower", country: "India", avatar: "🥇" },
    { id: "pv-sindhu", name: "PV Sindhu", sport: "athletics", role: "Badminton Player", country: "India", avatar: "🏸" }
  ];

  const handleGlobalSearch = async () => {
    if (!search.trim()) return;
    setSearching(true);
    try {
      const API = await getAPIUrl();
      const res = await fetch(`${API}/api/search/player?query=${encodeURIComponent(search)}`);
      const data = await res.json();
      setGlobalResults(data);
      setGlobalSearch(true);
    } catch (e) {
      console.warn("Global search connection failed, attempting local categories:", e);
      // Fallback: search our comprehensive offline databases
      const localMatches = [];
      Object.keys(localSportPlayersDb).forEach(sportKey => {
        const matches = localSportPlayersDb[sportKey].filter(p =>
          p.name.toLowerCase().includes(search.toLowerCase())
        );
        localMatches.push(...matches);
      });
      setGlobalResults(localMatches);
      setGlobalSearch(true);
    }
    setSearching(false);
  };

  const toggleSeeAll = async (sportName) => {
    const isExpanded = !!expandedSports[sportName];
    
    // Toggle state
    setExpandedSports(prev => ({
      ...prev,
      [sportName]: !isExpanded
    }));

    // If expanding and not in cache, fetch from API
    if (!isExpanded && !sportPlayersCache[sportName]) {
      setLoadingSport(prev => ({ ...prev, [sportName]: true }));
      try {
        const API = await getAPIUrl();
        const res = await fetch(`${API}/api/${sportName}/players`);
        const result = await res.json();
        if (result.ok && result.data && result.data.length > 0) {
          setSportPlayersCache(prev => ({
            ...prev,
            [sportName]: result.data
          }));
        } else {
          // Empty or fail API, use client backup
          setSportPlayersCache(prev => ({
            ...prev,
            [sportName]: localSportPlayersDb[sportName]
          }));
        }
      } catch (e) {
        console.warn(`Failed API fetch for ${sportName}, loading client fallback:`, e);
        setSportPlayersCache(prev => ({
          ...prev,
          [sportName]: localSportPlayersDb[sportName]
        }));
      }
      setLoadingSport(prev => ({ ...prev, [sportName]: false }));
    }
  };

  const handleClearSearch = () => {
    setSearch("");
    setGlobalSearch(false);
    setGlobalResults([]);
  };

  // Filter local players by search query
  const filteredLocalPlayers = localPlayers.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.sport.toLowerCase().includes(search.toLowerCase()) ||
    p.role.toLowerCase().includes(search.toLowerCase())
  );

  const sports = ["cricket", "football", "basketball", "tennis", "kabaddi", "athletics"];

  return (
    <div className="container" style={{ position: "relative", zIndex: 10, paddingBottom: "60px" }}>
      {/* Page Title */}
      <section className="hero-box">
        <h1>Athlete Stats Repository</h1>
        <p>Explore real-time statistics, biographies, and historical logs of world-class athletes.</p>
      </section>

      {/* 🔍 Search Input Container */}
      <div style={{
        position: "relative",
        maxWidth: "680px",
        margin: "0 auto 32px auto",
        display: "flex",
        gap: "10px"
      }}>
        <div style={{ position: "relative", flex: 1 }}>
          <input
            type="text"
            placeholder="Search players (e.g. Tendulkar, Curry, Chhetri, Ronaldo)..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              if (!e.target.value.trim()) {
                setGlobalSearch(false);
                setGlobalResults([]);
              }
            }}
            style={{
              width: "100%",
              padding: "16px 20px 16px 50px",
              background: "rgba(15, 23, 42, 0.6)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "16px",
              color: "#fff",
              fontSize: "16px",
              outline: "none",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.25)"
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleGlobalSearch();
            }}
          />
          <FaSearch style={{
            position: "absolute",
            left: "18px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#64748b",
            fontSize: "18px"
          }} />
        </div>

        <button
          onClick={handleGlobalSearch}
          disabled={searching || !search.trim()}
          className="tab-btn active"
          style={{
            padding: "0 24px",
            borderRadius: "16px",
            background: "linear-gradient(135deg, #6366f1, #4f46e5)",
            border: "none",
            color: "#fff",
            fontSize: "15px",
            fontWeight: "700",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            minWidth: "120px",
            justifyContent: "center"
          }}
        >
          {searching ? <FaSpinner className="spin" /> : <FaGlobe />}
          Search
        </button>
      </div>

      {/* Global Results Section */}
      {globalSearch && (
        <div style={{ marginBottom: "40px" }}>
          <h2 style={{ 
            fontSize: "20px", 
            color: "#fda4af", 
            borderLeft: "4px solid #f43f5e", 
            paddingLeft: "10px",
            marginBottom: "16px",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}>
            🌍 Global Athlete Database Results
          </h2>
          
          {globalResults.length === 0 ? (
            <div className="empty" style={{ padding: "30px" }}>
              ❌ No players found matching "{search}" in the global database.
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
              {globalResults.map(p => (
                <Link
                  to={`/game/player/${p.id}/${p.sport}`}
                  key={p.id}
                  style={{ textDecoration: "none" }}
                  className="match-card"
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      {p.imageUrl ? (
                        <img 
                          src={p.imageUrl} 
                          alt={p.name} 
                          style={{ width: "48px", height: "48px", borderRadius: "8px", objectFit: "cover", border: "1.5px solid #fda4af" }}
                        />
                      ) : (
                        <div style={{ 
                          width: "48px", 
                          height: "48px", 
                          borderRadius: "8px", 
                          background: "rgba(255, 255, 255, 0.02)", 
                          border: "1px solid rgba(255, 255, 255, 0.05)", 
                          display: "flex", 
                          alignItems: "center", 
                          justifyContent: "center", 
                          fontSize: "22px" 
                        }}>
                          {p.avatar}
                        </div>
                      )}
                      <div>
                        <h4 style={{ margin: 0, fontSize: "16px", color: "#fff" }}>{p.name}</h4>
                        <p style={{ margin: "2px 0 0 0", fontSize: "12px", color: "#f472b6", textTransform: "capitalize", fontWeight: "600" }}>{p.sport}</p>
                        <p style={{ margin: "2px 0 0 0", fontSize: "11px", color: "#64748b" }}>{p.role.length > 30 ? p.role.substring(0, 30) + "..." : p.role}</p>
                      </div>
                    </div>
                    <FaChevronRight style={{ color: "#64748b", fontSize: "12px" }} />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Local Spotlight Section */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <h2 style={{ 
          fontSize: "20px", 
          textTransform: "uppercase", 
          letterSpacing: "1px", 
          color: "#fff",
          margin: 0
        }}>
          {globalSearch ? "📚 Featured Spotlight Directory" : "🏆 Spotlight Athlete Cards"}
        </h2>
        {search && (
          <button 
            onClick={handleClearSearch}
            style={{ background: "transparent", border: "none", color: "#a5b4fc", cursor: "pointer", fontSize: "14px", fontWeight: "600" }}
          >
            Clear Search
          </button>
        )}
      </div>

      {sports.map(sportName => {
        const showAll = !!expandedSports[sportName];
        let displayList = showAll && sportPlayersCache[sportName]
          ? sportPlayersCache[sportName]
          : filteredLocalPlayers.filter(p => p.sport === sportName);

        if (showAll && search.trim() && sportPlayersCache[sportName]) {
          displayList = sportPlayersCache[sportName].filter(p =>
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.role.toLowerCase().includes(search.toLowerCase())
          );
        }

        const hasLocalItems = filteredLocalPlayers.filter(p => p.sport === sportName).length > 0;
        if (!hasLocalItems && !showAll) return null;

        return (
          <div key={sportName} style={{ marginBottom: "36px" }}>
            
            {/* Header Row with See All Trigger */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ 
                fontSize: "16px", 
                textTransform: "uppercase", 
                letterSpacing: "1px", 
                color: "#a5b4fc", 
                borderLeft: "4px solid #6366f1", 
                paddingLeft: "10px",
                margin: 0,
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}>
                <FaRunning /> {sportName} Cards
              </h3>

              <button
                onClick={() => toggleSeeAll(sportName)}
                style={{
                  background: "rgba(99, 102, 241, 0.1)",
                  border: "1px solid rgba(99, 102, 241, 0.2)",
                  borderRadius: "8px",
                  padding: "6px 14px",
                  color: "#a5b4fc",
                  fontSize: "12px",
                  fontWeight: "700",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px"
                }}
              >
                {loadingSport[sportName] ? (
                  <FaSpinner className="spin" />
                ) : showAll ? (
                  <>
                    <FaMinus style={{ fontSize: "9px" }} /> Featured Only
                  </>
                ) : (
                  <>
                    <FaPlus style={{ fontSize: "9px" }} /> See All Players
                  </>
                )}
              </button>
            </div>

            {/* Display list grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
              {displayList.map(p => (
                <Link
                  to={`/game/player/${p.id}/${p.sport}`}
                  key={p.id}
                  style={{ textDecoration: "none" }}
                  className="match-card"
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <div style={{ 
                        width: "48px", 
                        height: "48px", 
                        borderRadius: "12px", 
                        background: "rgba(255, 255, 255, 0.02)", 
                        border: "1px solid rgba(255, 255, 255, 0.05)", 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center", 
                        fontSize: "22px" 
                      }}>
                        {p.avatar}
                      </div>
                      <div>
                        <h4 style={{ margin: 0, fontSize: "16px", color: "#fff" }}>{p.name}</h4>
                        <p style={{ margin: "2px 0 0 0", fontSize: "12px", color: "#64748b" }}>{p.role}</p>
                        <p style={{ margin: "2px 0 0 0", fontSize: "11px", color: "#475569" }}>{p.country}</p>
                      </div>
                    </div>
                    <FaChevronRight style={{ color: "#475569", fontSize: "12px" }} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        );
      })}

      {!globalSearch && filteredLocalPlayers.length === 0 && search.trim() && (
        <div style={{ padding: "40px", textAlign: "center", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: "16px" }}>
          <p style={{ color: "#94a3b8", fontSize: "15px", marginBottom: "16px" }}>
            ❌ No featured spotlight players found matching "{search}".
          </p>
          <button
            onClick={handleGlobalSearch}
            className="tab-btn active"
            style={{ background: "linear-gradient(135deg, #6366f1, #4f46e5)", border: "none" }}
          >
            🔍 Search Global Wikipedia Athlete database for "{search}"
          </button>
        </div>
      )}
    </div>
  );
}
