const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Backend běží 🚀");
});

// 👇 TOHLE TAM MUSÍ BÝT
app.get("/nhl", async (req, res) => {
  try {
    const today = new Date();

    const formatDate = (date) => {
      return date.toISOString().split("T")[0];
    };

    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const dates = [
      formatDate(yesterday),
      formatDate(today),
      formatDate(tomorrow),
    ];

    let allGames = [];

    for (let date of dates) {
      const response = await axios.get(
        `https://api-web.nhle.com/v1/scoreboard/${date}`
      );

      const games =
        response.data?.games ||
        response.data?.scoreboard?.games ||
        [];

      allGames = allGames.concat(games);
    }

    res.json({ games: allGames });
  } catch (error) {
    console.error(error);
    res.status(500).send("Chyba při načítání NHL dat");
  }
});

app.listen(PORT, () => {
  console.log("Server běží na portu " + PORT);
});
