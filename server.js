const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

// Fake data (zatím)
let matches = [
  { id: 1, home: "Sparta", away: "Slavia", score: "2:1", time: "65'" },
  { id: 2, home: "Plzeň", away: "Baník", score: "0:0", time: "30'" },
];

let chats = {};

// API – zápasy
app.get("/matches", (req, res) => {
  res.json(matches);
});

// SOCKET.IO CHAT
io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("joinMatch", (matchId) => {
    socket.join(matchId);
  });

  socket.on("sendMessage", ({ matchId, message }) => {
    if (!chats[matchId]) chats[matchId] = [];

    const msg = {
      id: Date.now(),
      text: message,
    };

    chats[matchId].push(msg);

    io.to(matchId).emit("newMessage", msg);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
