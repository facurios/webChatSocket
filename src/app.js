import express from "express";
import { Server } from "socket.io";
import __dirname from "./utils.js";

const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.static(__dirname+'/public'))

const server = app.listen(PORT, ()=>{
    console.log(`listening PORT ${PORT}`)
});
const io = new Server(server);
const log = [];
io.on('connection', socket =>{
    socket.emit('log', log)
    socket.on('message', data=>{
        console.log(data)
        log.push(data)
        io.emit('log', log)
    })
});

