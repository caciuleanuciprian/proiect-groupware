const express = require('express');
const cors = require('cors');
const compression = require('compression');

const connectDB = require('./connection');
connectDB();

const server = express();
server.use(cors(), compression(), express.json());

const port = process.env.port || 6000;

server.listen(port, function(error){
    if(error){
        console.log(`error opening server`)
    }else
        console.log(`Server has started on port: ${port}`);
});






