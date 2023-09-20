const express = require("express");

const app = express();

const http = require("http");

const server = http.createServer(app);

const {Server} = require("socket.io");


const io = new Server(server);

const PORT = 8887;

io.on("connection",(socket) =>{
    socket.on("secrete message",(data)=>{
        io.emit("secrete message",data);
    })
})


app.use(express.static("public"));


server.listen(PORT);