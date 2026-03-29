const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Backend běží");
});

app.get("/nhl", async (req, res) => {
  try {
    const response = await fetch("https://api-web.nhle.com/v1/scoreboard/now");
    const data = await response.json();

    const games =
      data?.games ||
      data?.scoreboard?.games ||
      [];

    res.json({ games });
  } catch (e) {
    console.log("CHYBA:", e);
    res.status(500).json({ error: "Chyba NHL API" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server běží na portu " + PORT));
