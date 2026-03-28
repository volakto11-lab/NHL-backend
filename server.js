const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

// TEST
app.get("/", (req, res) => {
  res.send("Backend běží");
});

// NHL DATA (jen fetch → žádné ukládání)
app.get("/nhl", async (req, res) => {
  try {
    const response = await fetch(
      "https://api-web.nhle.com/v1/scoreboard/now"
    );
    const data = await response.json();
    res.json(data);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Chyba
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server běží na portu " + PORT));
