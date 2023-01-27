// let express = require("express");
// let cors = require("cors");
// let http = require("http");
// let bodyParser = require("body-parser");
// let path = require("path");

// const PORT = 9000;

// app = express();

// const server = app.listen(PORT, () => {});

// app.use(cors());

// app.use(express.static(path.join(__dirname, "client")));

// app.use(bodyParser.json());

// app.post("/server", (req, res) => {
//     io.emit("command", req.body);
//     console.log(req.body);
//     res.status(201).json({ status: "reached" });
//   });

// const io = require("socket.io")(server);

// io.on("connection", (socket) => {
// socket.on("command", function (data) {
//     io.emit("command", data);
// });
// });

const express = require('express');
const cors = require('cors');
const http = require('http');
const path = require('path');
const {Server} = require('socket.io');

const PORT = 9000;
const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.static(path.join(__dirname, 'client')));

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});


io.on('connection', (socket) => {
  socket.on('command', (data, ack) => {
    io.emit('command', data);
    ack({ status: "received" });
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});