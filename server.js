const express = require("express");
const app = express();
const socket = require("socket.io");

app.use(express.static("public"));

const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

const io = socket(server);

io.on("connection", (socket) => {
  // console log on server side:
  console.log(`
Successfully made socket.io connection! 
  It has this socket id: 
    ${socket.id}

You can now freely pass data between client and server. 
`);

  // get "message" from client:
  socket.on("message", (data) => {
    console.log("message", data);
    // send message data to all clients:
    io.sockets.emit("message", data);
  });

  // get "typing" from client:
  socket.on("typing", (data) => {
    console.log("typing", data);
    // send typing data to all clients except sender client that triggered this listener:
    socket.broadcast.emit("typing", data);
  });

  socket.on("disconnect", (socket) => {
    console.log(`A client socket disconnected.`);
  });
});
