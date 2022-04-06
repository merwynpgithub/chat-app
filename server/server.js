console.log("Hello");
const port = 3000;

const io = require("socket.io")(port, {
  cors: {
    origin: ["http://localhost:8080"]
  }
});

io.on("connection", socket => {
  console.log(socket.id);
  
  socket.on("send-message", (message, room) => {
    if (room === "") {
      socket.broadcast.emit("receive-message", message);
    } else {
      socket.to(room).emit("receive-message", message);
    }

  })
})