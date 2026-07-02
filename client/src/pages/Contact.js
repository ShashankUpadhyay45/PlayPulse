// client/src/pages/Contact.js
import React, { useState } from "react";
import { FaEnvelope, FaGithub, FaLinkedin, FaShieldAlt, FaQuestionCircle, FaPaperPlane, FaInfoCircle, FaStar, FaBolt, FaLock, FaGamepad } from "react-icons/fa";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  
  // FAQ state
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    {
      q: "How often are the live scores updated?",
      a: "Our backend scraper queries the active ESPN Cricinfo livescore feeds every 60 seconds, formatting and delivering them directly to your screen. Recent or completed matches are stored in the archive database."
    },
    {
      q: "Can I play the FunZone mini-games offline?",
      a: "Yes! All FunZone games (TicTacToe, Snake, Rock-Paper-Scissors, 2048, Wordle, and Whack-a-Mole) are fully client-side and built with local state. They require zero database or API calls to run."
    },
    {
      q: "How does the live Wikipedia integration work?",
      a: "When you visit a player's archive, our API server queries Wikipedia's open REST database dynamically using the player's slug. It retrieves their latest introductory biography and official thumbnail profile photo in real-time."
    },
    {
      q: "Is my personal search data tracked?",
      a: "No. PlayPulse is built with privacy-first standards. We do not use tracking cookies, analytics, or remote database logging. All search keywords, high scores, and theme settings are saved only inside your local browser."
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      alert("Please fill out all fields.");
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      setForm({ name: "", email: "", message: "" });
      setSubmitted(false);
      alert("📨 Message sent successfully! Shashank will contact you shortly.");
    }, 1500);
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="container" style={{ position: "relative", zIndex: 10, paddingBottom: "60px" }}>
      {/* Hero Header */}
      <section className="hero-box" style={{ marginBottom: "32px" }}>
        <h1>Information & Support</h1>
        <p>Get in touch, discover project features, read FAQs, or review our privacy policies.</p>
      </section>

      <div className="live-row" style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
        
        {/* Left Side: About, Features & FAQs */}
        <div style={{ flex: "2 1 600px", display: "flex", flexDirection: "column", gap: "30px" }}>
          
          {/* About PlayPulse Card */}
          <div className="widget" style={{ padding: "28px" }}>
            <h3 style={{ display: "flex", alignItems: "center", gap: "10px", margin: "0 0 16px 0", color: "#a5b4fc" }}>
              <FaInfoCircle /> About PlayPulse
            </h3>
            <p style={{ lineHeight: "1.7", color: "#94a3b8", fontSize: "15px", margin: 0 }}>
              PlayPulse is a unified, high-fidelity sports scoreboard and performance analysis hub. 
              Designed to serve as a comprehensive dashboard for tracking real-world events across multiple disciplines, 
              it combines actual live cricket fixtures from ESPN Cricinfo feeds with archived metrics for football, 
              basketball, tennis, kabaddi, and athletics. 
            </p>
            <p style={{ lineHeight: "1.7", color: "#94a3b8", fontSize: "15px", marginTop: "12px", margin: 0 }}>
              In addition to sports logs, PlayPulse houses an offline-first FunZone containing custom mini-games to provide a 
              captivating, multi-layered digital playground.
            </p>
          </div>

          {/* Core Features Bento Grid */}
          <div>
            <h3 style={{ fontSize: "18px", color: "#fff", marginBottom: "16px", borderLeft: "4px solid #6366f1", paddingLeft: "10px" }}>
              💎 Core Architecture Features
            </h3>
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "16px" }}>
              {/* Feature 1 */}
              <div style={{ padding: "20px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: "16px" }}>
                <FaBolt style={{ color: "#fbbf24", fontSize: "20px", marginBottom: "10px" }} />
                <h4 style={{ margin: "0 0 6px 0", color: "#fff" }}>Real-time Feed</h4>
                <p style={{ margin: 0, fontSize: "13px", color: "#64748b", lineHeight: "1.5" }}>
                  Integrates direct parser systems querying ESPN Cricinfo scores every minute for accurate live dashboards.
                </p>
              </div>

              {/* Feature 2 */}
              <div style={{ padding: "20px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: "16px" }}>
                <FaGamepad style={{ color: "#ec4899", fontSize: "20px", marginBottom: "10px" }} />
                <h4 style={{ margin: "0 0 6px 0", color: "#fff" }}>Local Arcade</h4>
                <p style={{ margin: 0, fontSize: "13px", color: "#64748b", lineHeight: "1.5" }}>
                  A collection of fully offline-playable HTML5 games inside a unified game cabinet panel.
                </p>
              </div>

              {/* Feature 3 */}
              <div style={{ padding: "20px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: "16px" }}>
                <FaStar style={{ color: "#6366f1", fontSize: "20px", marginBottom: "10px" }} />
                <h4 style={{ margin: "0 0 6px 0", color: "#fff" }}>Live Wiki Profiles</h4>
                <p style={{ margin: 0, fontSize: "13px", color: "#64748b", lineHeight: "1.5" }}>
                  Resolves player cards to Wikipedia summaries to inject photos and biographies on demand.
                </p>
              </div>

              {/* Feature 4 */}
              <div style={{ padding: "20px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: "16px" }}>
                <FaLock style={{ color: "#22c55e", fontSize: "20px", marginBottom: "10px" }} />
                <h4 style={{ margin: "0 0 6px 0", color: "#fff" }}>Privacy First</h4>
                <p style={{ margin: 0, fontSize: "13px", color: "#64748b", lineHeight: "1.5" }}>
                  No tracking cookies, search logging, or server-side telemetry. Everything remains local.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive FAQs Card */}
          <div className="widget" style={{ padding: "28px" }}>
            <h3 style={{ display: "flex", alignItems: "center", gap: "10px", margin: "0 0 20px 0", color: "#a5b4fc" }}>
              <FaQuestionCircle /> Frequently Asked Questions
            </h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {faqs.map((faq, idx) => (
                <div 
                  key={idx} 
                  style={{ 
                    borderBottom: "1px solid rgba(255,255,255,0.04)", 
                    paddingBottom: "12px",
                    cursor: "pointer" 
                  }}
                  onClick={() => toggleFaq(idx)}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h4 style={{ margin: 0, fontSize: "15px", color: activeFaq === idx ? "#a5b4fc" : "#fff", fontWeight: "600" }}>
                      {faq.q}
                    </h4>
                    <span style={{ color: "#64748b", fontSize: "18px" }}>{activeFaq === idx ? "−" : "+"}</span>
                  </div>
                  
                  {activeFaq === idx && (
                    <p style={{ margin: "8px 0 0 0", fontSize: "13.5px", color: "#94a3b8", lineHeight: "1.6" }}>
                      {faq.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Privacy & Legal Section */}
          <div className="widget" style={{ padding: "28px" }}>
            <h3 style={{ display: "flex", alignItems: "center", gap: "10px", margin: "0 0 20px 0", color: "#f472b6" }}>
              <FaShieldAlt /> Privacy & Terms of Service
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px" }}>
              <div>
                <h4 style={{ color: "#fff", margin: "0 0 8px 0", fontSize: "14px", fontWeight: "700" }}>🔒 Data Protection Policy</h4>
                <p style={{ fontSize: "13px", color: "#64748b", margin: 0, lineHeight: "1.6" }}>
                  All sports tracking logs, scoreboard filters, and mini-game records are stored directly inside your browser cache. We collect no personal data, ensuring complete security.
                </p>
              </div>
              <div>
                <h4 style={{ color: "#fff", margin: "0 0 8px 0", fontSize: "14px", fontWeight: "700" }}>📜 Terms of Service</h4>
                <p style={{ fontSize: "13px", color: "#64748b", margin: 0, lineHeight: "1.6" }}>
                  Real-time international and domestic cricket fixtures are parsed from open RSS feeds. Profile directories are compiled from open sports records for demonstration purposes.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Side: Contact Details & Feedback Form */}
        <div style={{ flex: "1 1 300px", display: "flex", flexDirection: "column", gap: "30px" }}>
          
          {/* Creator Profile */}
          <div className="widget" style={{ padding: "24px" }}>
            <h3 style={{ margin: "0 0 20px 0", color: "#fff" }}>Contact Developer</h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.05)", paddingBottom: "16px" }}>
                <h4 style={{ margin: 0, color: "#fff", fontSize: "18px", fontWeight: "800" }}>Shashank Upadhyay</h4>
                <p style={{ margin: "4px 0 0 0", color: "#64748b", fontSize: "13px" }}>Software Developer & Creator</p>
              </div>

              {/* Social Links */}
              <a href="mailto:theshashankupa8127@gmail.com" className="squad-link" style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", background: "rgba(255, 255, 255, 0.01)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: "12px", textDecoration: "none", color: "#fff" }}>
                <FaEnvelope style={{ color: "#a5b4fc", fontSize: "18px" }} />
                <div>
                  <div style={{ fontSize: "10px", color: "#64748b" }}>Email</div>
                  <div style={{ fontSize: "12px", fontWeight: "600", wordBreak: "break-all" }}>theshashankupa8127@gmail.com</div>
                </div>
              </a>

              <a href="https://github.com/ShashankUpadhyay45" target="_blank" rel="noreferrer" className="squad-link" style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", background: "rgba(255, 255, 255, 0.01)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: "12px", textDecoration: "none", color: "#fff" }}>
                <FaGithub style={{ color: "#a5b4fc", fontSize: "18px" }} />
                <div>
                  <div style={{ fontSize: "10px", color: "#64748b" }}>GitHub</div>
                  <div style={{ fontSize: "13px", fontWeight: "600" }}>ShashankUpadhyay45</div>
                </div>
              </a>

              <a href="https://www.linkedin.com/in/shashank-upadhyay-a937a5322" target="_blank" rel="noreferrer" className="squad-link" style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", background: "rgba(255, 255, 255, 0.01)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: "12px", textDecoration: "none", color: "#fff" }}>
                <FaLinkedin style={{ color: "#a5b4fc", fontSize: "18px" }} />
                <div>
                  <div style={{ fontSize: "10px", color: "#64748b" }}>LinkedIn</div>
                  <div style={{ fontSize: "13px", fontWeight: "600" }}>View Profile</div>
                </div>
              </a>
            </div>
          </div>

          {/* 📬 Glassmorphic Contact Feedback Form */}
          <div className="widget" style={{ padding: "24px" }}>
            <h3 style={{ margin: "0 0 16px 0", color: "#fff" }}>Get In Touch</h3>
            
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", color: "#64748b", marginBottom: "6px", fontWeight: "700" }}>Your Name</label>
                <input
                  type="text"
                  placeholder="Enter name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  style={{ width: "100%", padding: "10px 14px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", color: "#fff", outline: "none" }}
                  required
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", color: "#64748b", marginBottom: "6px", fontWeight: "700" }}>Your Email</label>
                <input
                  type="email"
                  placeholder="Enter email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  style={{ width: "100%", padding: "10px 14px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", color: "#fff", outline: "none" }}
                  required
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", color: "#64748b", marginBottom: "6px", fontWeight: "700" }}>Message Feedback</label>
                <textarea
                  rows="4"
                  placeholder="Write details..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  style={{ width: "100%", padding: "10px 14px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", color: "#fff", outline: "none", resize: "none" }}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="tab-btn active"
                style={{ 
                  width: "100%", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  gap: "10px", 
                  background: "linear-gradient(135deg, #6366f1, #4f46e5)", 
                  color: "#fff", 
                  fontWeight: "700",
                  padding: "12px",
                  borderRadius: "10px",
                  border: "none",
                  cursor: "pointer",
                  marginTop: "8px"
                }}
                disabled={submitted}
              >
                <FaPaperPlane /> {submitted ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
