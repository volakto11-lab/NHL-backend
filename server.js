const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

// 🧪 TEST
app.get("/", (req, res) => {
  res.send("Backend běží");
});

// 🏒 NHL zápasy (včera + dnes + zítra)
app.get("/nhl", async (req, res) => {
  try {
    const today = new Date();

    const formatDate = (d) => d.toISOString().split("T")[0];

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const urls = [
      `https://api-web.nhle.com/v1/scoreboard/${formatDate(yesterday)}`,
      `https://api-web.nhle.com/v1/scoreboard/${formatDate(today)}`,
      `https://api-web.nhle.com/v1/scoreboard/${formatDate(tomorrow)}`,
    ];

    const responses = await Promise.all(urls.map((url) => fetch(url)));
    const datas = await Promise.all(responses.map((r) => r.json()));

    const allGames = datas.flatMap((d) =>
      d?.gameWeek?.flatMap((day) => day.games) || []
    );

    res.json({ games: allGames });
  } catch (e) {
    console.log("CHYBA:", e);
    res.status(500).json({ error: "Chyba NHL API" });
  }
});

// 🚀 start serveru
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server běží na portu " + PORT));
