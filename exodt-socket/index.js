const io = require("socket.io")(8900, {
  cors: {
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const getUser = (recieverId) => {
  return users.find((user) => user.userId === recieverId);
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

io.on("connection", (socket) => {
  // When connected
  console.log("A user connected");

  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  // Send and get messages
  socket.on("sendMessage", ({ senderId, recieverId, message }) => {
    const user = getUser(recieverId);
    io.to(user?.socketId).emit("getMessage", {
      senderId,
      message,
    });
  });

  // When disconnected
  socket.on("disconnect", () => {
    console.log("A user disconnected");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
