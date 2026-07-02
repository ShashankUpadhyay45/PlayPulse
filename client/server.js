import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cricketRoutes from "./services/cricket.js";
import footballRoutes from "./services/football.js";
import basketballRoutes from "./services/basketball.js";
import tennisRoutes from "./services/tennis.js";
import baseballRoutes from "./services/baseball.js";
import hockeyRoutes from "./services/hockey.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// ✅ Register all sports routes
app.use("/api/cricket", cricketRoutes);
app.use("/api/football", footballRoutes);
app.use("/api/basketball", basketballRoutes);
app.use("/api/tennis", tennisRoutes);
app.use("/api/baseball", baseballRoutes);
app.use("/api/hockey", hockeyRoutes);

// ✅ Default
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Sports Score API Running ✅" });
});

// ✅ Start server on available port
function start(port = 4000) {
  const server = app.listen(port, () => {
    console.log(`✅ API running at http://localhost:${port}`);
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.log(`⚠ Port ${port} busy → trying ${port + 1}`);
      start(port + 1);
    }
  });
}
start();
