let express = require("express");
let cors = require("cors");
let http = require("http");
let bodyParser = require("body-parser");
let path = require("path");

const PORT = 9000;

app = express();

const server = app.listen(PORT, () => {});

app.use(cors());

app.use(express.static(path.join(__dirname, "client")));

app.use(bodyParser.json());

app.post("/server", (req, res) => {
    io.emit("command", req.body);
    res.status(201).json({ status: "reached" });
  });

const io = require("socket.io")(server);

io.on("connection", (socket) => {
socket.on("command", function (data) {
    io.emit("command", data);
    console.log(data);
});
});