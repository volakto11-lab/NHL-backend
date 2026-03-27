const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🔥 DOČASNÁ "DB" (paměť)
let messages = {};
let tips = {};

// TEST
app.get("/", (req, res) => {
  res.send("Backend běží");
});

// NHL DATA (nech jak máš)
app.get("/nhl", async (req, res) => {
  try {
    const response = await fetch(
      "https://api-web.nhle.com/v1/scoreboard/now"
    );
    const data = await response.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: "Chyba NHL API" });
  }
});

// 💬 GET CHAT
app.get("/chat/:gameId", (req, res) => {
  const { gameId } = req.params;
  res.json(messages[gameId] || []);
});

// 💬 POST CHAT
app.post("/chat/:gameId", (req, res) => {
  const { gameId } = req.params;
  const msg = req.body;

  if (!messages[gameId]) messages[gameId] = [];
  messages[gameId].push(msg);

  res.json({ ok: true });
});

// 📊 GET TIPY
app.get("/tips/:gameId", (req, res) => {
  const { gameId } = req.params;
  res.json(tips[gameId] || []);
});

// 📊 POST TIP
app.post("/tips/:gameId", (req, res) => {
  const { gameId } = req.params;
  const tip = req.body;

  if (!tips[gameId]) tips[gameId] = [];
  tips[gameId].push(tip);

  res.json({ ok: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server běží na portu " + PORT));
