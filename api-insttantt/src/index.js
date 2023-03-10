import { Server } from "socket.io";
import http from "http";
import socketsUser from "./socketsUser";
import app from "./app";
import { connectDB } from "./db";
import { PORT } from "./config";

connectDB();
const server = http.createServer(app);
const httpServer = server.listen(PORT);
console.log("Server on http://localhost:", PORT);

const io = new Server(httpServer);

socketsUser(io);



