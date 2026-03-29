const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Backend běží");
});

app.get("/nhl", async (req, res) => {
  try {
    const response = await fetch("https://api-web.nhle.com/v1/schedule/now");
    const data = await response.json();

    // 🔥 vytáhne zápasy z gameWeek
    const games =
      data?.gameWeek?.flatMap((day) => day.games) || [];

    res.json({ games });
  } catch (e) {
    console.log("CHYBA:", e);
    res.status(500).json({ error: "Chyba NHL API" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server běží na portu " + PORT));      if (d?.dates?.[0]?.games) return d.dates[0].games;
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
