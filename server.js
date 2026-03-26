const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Backend běží 🚀");
});

app.listen(PORT, () => {
  console.log("Server běží na portu " + PORT);
});
const axios = require("axios");

app.get("/nhl", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api-web.nhle.com/v1/scoreboard/now"
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Chyba při načítání NHL dat");
  }
});
