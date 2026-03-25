const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server běží na portu " + PORT);
});
app.get("/", (req, res) => {
  res.send("Backend běží 🚀");
});
