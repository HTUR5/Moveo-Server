import dotenv from 'dotenv'
dotenv.config();

import express from 'express'
import cors from 'cors'
import http from 'http'
import {Server} from 'socket.io'

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Database Connection
import db from './DL/db.js';
db.connect();

// HTTP and WebSocket Server Setup
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"]
    }
});

// Socket Event Handlers
import socketFn from './socket.js';
io.on('connection', socketFn(io)); 

// Routes
import userRouter from './routers/user.router.js';
import songRouter from './routers/song.router.js';
app.use('/', userRouter);
app.use('/songs', songRouter);

server.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`);
});