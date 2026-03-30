const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

// TEST
app.get("/", (req, res) => {
  res.send("Backend běží");
});

// NHL endpoint
app.get("/nhl", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api-web.nhle.com/v1/schedule/now"
    );

    const data = response.data;

    const games =
      data?.gameWeek?.flatMap((day) => day.games) || [];

    res.json({ games });
  } catch (e) {
    console.log("CHYBA:", e.message);
    res.status(500).json({ error: "Chyba NHL API" });
  }
});

// START SERVERU
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server běží na portu " + PORT);
});
