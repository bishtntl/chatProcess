const express = require("express");
const path = require('path');
const app = express();
const PORT = process.env.port || 4040;
const socket = require('socket.io')
app.use(express.static(path.join(__dirname,'public')))
app.get("/",(req,res)=>{
    res.send('Testing server');
})
const server = app.listen(PORT,()=>{
    try{
        console.log(`Server is Running ${PORT}`)
    }
    catch(err){
        console.log(`${PORT} Page Not Found  ${err}`)
    }
})
const io = socket(server,{
    cors :{
        origin:"*"
    }
 })
let socketsConnected = new Set()
io.on("connection",onConnected
 )
 function onConnected(socketClientID){
    console.log("user",socketClientID.id)
    socketsConnected.add(socketClientID.id);
    io.emit('clients',socketsConnected.size)
    socketClientID.on("disconnect",()=>{
       console.log("Dissconnected",socketClientID.id);
       socketsConnected.delete(socketClientID.id)
       io.emit('clients',socketsConnected.size)
    })
    socketClientID.on('message',(data)=>{
        console.log(data);
        socketClientID.broadcast.emit('chatMsg',data)
    })
}