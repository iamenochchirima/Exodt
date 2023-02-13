const io = require("socket.io")(8900, {
  cors: {
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
  },
});

io.on("connection", (socket) => {
    console.log('A user connected')
    io.emit("Welcome", "this is socket server")
})