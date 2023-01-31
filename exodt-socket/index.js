const express = require('express');
const cors = require('cors');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const {Server} = require('socket.io');

const PORT = 9000;
const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.static(path.join(__dirname, 'client')));

const io = new Server(server, {
  cors: {
    origin: "http://127.0.0.1:3000",
    methods: ["GET", "POST"]
  }
});

app.use(bodyParser.json());

app.post("/server", (req, res) => {
  io.emit("command", req.body);
  console.log("received POST request:", req.body);
  res.status(201).json({ status: "received" });
});

io.on('connection', (socket) => {
  console.log("client connected");
  socket.on('command', (data) => {
    console.log("received command:", data);
    io.emit('command', data);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});