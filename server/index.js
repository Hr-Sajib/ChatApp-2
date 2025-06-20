const express = require('express');
const http = require('http');
const cors = require('cors');
const {Server} = require('socket.io');

// initializations 
const app = express();
const server = http.createServer(app) 
const io = new Server(server,{
    cors : {
        origin:["http://localhost:5173"],
        methods:["GET","POST"] 
    }
})

// middlewares 
app.use(cors())


// socket code 
io.on("connection", (socket)=> {
    console.log(`Connected user with ID ${socket.id}`)


    socket.on("joinRoom", (data)=> {
        socket.join(data.roomName)
        console.log(`User with ID : ${socket.id} with name : ${data.userName} has joined room : ${data.roomName}`)
    })

    socket.on("sendMessage", (data)=> {
        console.log("sendMessage data: ",data)

        socket.to(data.roomName).emit("receiveMessage", data)
    })

    socket.on("disconnect", ()=> {
        console.log(`Disconnected user with ID ${socket.id}`)
    })
})

server.listen(5100, ()=> {
    console.log("chat server listenning...")
})