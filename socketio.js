const socketio = require("socket.io");

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

const socketHandler = (server) => {
  const io = socketio(server, {
    cors: {
      origin: ["https://health-and-fitness-ashy.vercel.app", "http://localhost:5173"],
    },
  });

  io.on("connection", (socket) => {
    console.log("user connected");

    socket.on("addUser", (userId) => {
      addUser(userId, socket.id);
      io.emit("getUsers", users);
    });

    socket.on("sendCommunityMessage", ({ senderId, text }) => {
      io.emit("getCommunityMessage", {
        sender: senderId,
        text,
      });
    });

    // Handle typing events
    socket.on("typing", ({ senderId }) => {
      socket.broadcast.emit("getTyping", { sender: senderId });
    });

    socket.on("typingEnd", ({ senderId }) => {
      socket.broadcast.emit("getTypingEnd", { sender: senderId });
    });

    socket.on("disconnect", () => {
      console.log("a user disconnected!");
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  });
};

module.exports = socketHandler;
