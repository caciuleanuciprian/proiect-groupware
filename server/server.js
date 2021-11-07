const express = require('express');
const cors = require('cors');
const compression = require('compression');
const bodyParser = require('body-parser');



const usersRoute = require('./src/routes/users');
const imgRoute = require('./src/routes/img');

const connectDB = require('./connection');
connectDB();

const server = express();
server.use(cors(), compression(), express.json());
server.use(express.urlencoded({extended: true})); 
server.use(express.json());
server.set("view engine", "ejs");

server.use('/users', usersRoute);
server.use('/img', imgRoute);


const port = process.env.port || 8080;

server.listen(port, function(error){
    if(error){
        console.log(`error opening server`)
    }else
        console.log(`Server has started on port: ${port}`);
});






