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
    const response = await axios.get(
      "https://api-web.nhle.com/v1/scoreboard/now"
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Chyba při načítání NHL dat");
  }
});

app.listen(PORT, () => {
  console.log("Server běží na portu " + PORT);
});
