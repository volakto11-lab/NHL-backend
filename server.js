const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Backend běží");
});

app.get("/nhl", async (req, res) => {
  try {
    const formatDate = (d) => d.toISOString().split("T")[0];

    const today = new Date();

    // 🔥 vytvoří -7 až +7 dní
    const dates = [];
    for (let i = -7; i <= 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      dates.push(formatDate(d));
    }

    // 🔥 fetch všech dnů
    const responses = await Promise.all(
      dates.map((date) =>
        fetch(`https://api-web.nhle.com/v1/scoreboard/${date}`)
      )
    );

    const datas = await Promise.all(responses.map((r) => r.json()));

    // 🔥 parsování (univerzální)
    const allGames = datas.flatMap((d) => {
      if (d?.games) return d.games;
      if (d?.dates?.[0]?.games) return d.dates[0].games;
      return [];
    });

    res.json({ games: allGames });
  } catch (e) {
    console.log("CHYBA:", e);
    res.status(500).json({ error: "Chyba NHL API" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server běží na portu " + PORT));
