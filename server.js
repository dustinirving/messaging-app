const express = require("express");
const path = require("path");
const fs = require("fs");
const uuid = require("uuid");

const app = express();

const PORT = process.env.PORT || 3000;

// Allows the server to talk to the client
app.use(express.static(__dirname + "/public"));
// Fortmatting
app.use(express.urlencoded({ extended: true }));
// Use json format with express
app.use(express.json());

app.listen(PORT, () => console.log(`App is listening at PORT ${PORT}`));

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
