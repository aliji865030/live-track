const express=require("express");
const app=express();
const http = require("http");
const path = require("path");

const socketio = require("socket.io");

const server = http.createServer(app);

const io = socketio(server);

app.use(express.static('public'));
app.set("view engine","ejs");
app.set(express.static(path.join(__dirname,"public")));

io.on("connection",(socket)=>{
    socket.on("send-location",(data)=>{
        io.emit("receive-location",{id:socket.id,...data})
    })
    
    socket.on("disconnect",()=>{
        io.emit("user-disconnected",socket.id)
    })
    
})

app.get("/", (req,res)=>{
    res.render("index");
})

server.listen(4000,()=>console.log("app is up and running on port number 4000"));