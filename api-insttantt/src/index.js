import { Server } from "socket.io";
import http from "http";
import socketsUser from "./socketsUser";
import app from "./app";
import { connectDB } from "./db";
import { PORT } from "./config";
const cors = require('cors');

connectDB();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
      origin: "http://localhost:4200",
    },
 });

 app.use(cors());

 io.on("connection", (socket) => {
   console.log(socket.id);
   socket.on("message", (body) => {
     socket.broadcast.emit("message", {
       body,
       from: socket.id.slice(8),
     });
   });
 });
 
 server.listen(PORT);
 console.log(`server on port ${PORT}`);

socketsUser(io);



