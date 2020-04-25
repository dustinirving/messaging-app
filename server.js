const express = require("express");
const path = require("path");
const fs = require("fs");
const uuid = require("uuid");
const http = require("http");

const app = express();

const PORT = process.env.PORT || 3000;

// Real time
const server = require("http").Server(app);
const io = require("socket.io")(server);

io.on("connection", (socket) => {
  // socket.emit("message", "A user has joined the chat");

  // socket.broadcast.emit("message", "A user has joined the chat");

  // socket.on("disconnect", () => {
  //   io.emit("message", "A user has left the chat");
  // });

  socket.on("chatMessage", (msg) => {
    io.emit("message", msg);
  });
});

// Allows the server to talk to the client
app.use(express.static(path.join(__dirname + "/public")));
// Fortmatting
app.use(express.urlencoded({ extended: true }));
// Use json format with express
app.use(express.json());

server.listen(PORT);

app.get("/chatroom", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/chatroom.html"));
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/api/messages", function (req, res) {
  res.sendFile(path.join(__dirname, "./db/db.json"));
});

app.post("/api/messages", function (req, res) {
  let allMessages;
  const newMessage = req.body;
  newMessage.id = uuid.v4();
  fs.readFile("./db/db.json", "utf8", function (err, data) {
    if (err) throw err;
    allMessages = JSON.parse(data);
    allMessages.push(newMessage);
    fs.writeFile("./db/db.json", JSON.stringify(allMessages), function (err) {
      if (err) throw err;
    });
  });
  res.json(newMessage);
});

app.delete("/api/messages", function (req, res) {
  console.log("hi");
  let data = "[]";
  fs.writeFile("./db/db.json", data, function (err) {
    if (err) throw err;
  });
  return res.json(data);
});
