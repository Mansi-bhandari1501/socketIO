import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import routes from './routes/index.js'
import cors from 'cors';
import path from "path";
import http from 'http';
import { Server } from "socket.io";
import { handleSocketEvents } from './socket/index.js';

dotenv.config()
connectDB();

const app = express();

const corsOptions = {
    origin: "http://localhost:3000",
    methods: ["GET", "POST","DELETE","PUT","PATCH"],
    credentials: true,
}

app.use(cors(corsOptions))
app.use(express.json())

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname + '/uploads')));

app.use('/', routes);

const PORT = process.env.PORT || 8080;

const server = http.createServer(app);
server.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`);
})

export const io = new Server(server, {cors: corsOptions});

io.on("connection", (socket) => {
    console.log(' User connected', socket.id);
    socket.emit("welcome", ` ${socket.id} joined the server`);

    handleSocketEvents(socket, io);
})
