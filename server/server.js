const express = require("express");
const cors = require("cors");
const compression = require("compression");
const bodyParser = require("body-parser");
const usersRoute = require("./src/routes/users");
const imgRoute = require("./src/routes/img");

// import mongoDB connect
const connectDB = require("./connection");
connectDB();

// create Express application
const server = express();

server.use(cors(), compression(), express.json());
server.use(express.json({ limit: "50mb" }));
server.use(
  express.urlencoded({
    extended: true,
    limit: "50mb",
  })
);
server.set("view engine", "ejs");
server.use("/users", usersRoute);
server.use("/img", imgRoute);

const port = process.env.port || 8080;
const http = require("http").createServer(server);

const io = require("socket.io")(http);

const users = {};

io.on("connection", (socket) => {
  socket.on("new-user", (name) => {
    users[socket.id] = name;
    socket.broadcast.emit("user-connected", name);
  });
  socket.on("send-chat-message", (message) => {
    socket.broadcast.emit("chat-message", {
      message: message,
      name: users[socket.id],
    });
    socket.emit("chat-message", { message: message, name: users[socket.id] });
  });
  socket.on("disconnect", (name) => {
    socket.broadcast.emit("user-disconnected", users[socket.id]);
    delete users[socket.id];
  });
});

// Server has "started"
server.listen(port, function (error) {
  if (error) {
    console.log(`error opening server`);
  } else console.log(`Server has started on port: ${port}`);
});
