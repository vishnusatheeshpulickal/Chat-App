const path = require("path");
const http = require("http");
const express = require("express");
const app = express();
const socketio = require("socket.io");

const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {
  socket.emit("message", "Welcome to FreeChat!");

  socket.broadcast.emit("message", "A user has joined in the chat!");

  socket.on("disconnect", () => {
    io.emit("A user has left in the chat!");
  });

  socket.on("chatMessage", (msg) => {
    io.emit("message", msg);
  });
});

app.use(express.static(path.join(__dirname, "public")));

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Listening port ${port}..`));
