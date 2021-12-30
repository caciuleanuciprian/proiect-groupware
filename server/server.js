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

// Server has "started"
server.listen(port, function (error) {
  if (error) {
    console.log(`error opening server`);
  } else console.log(`Server has started on port: ${port}`);
});
