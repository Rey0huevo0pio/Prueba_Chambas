import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

// --- CAMBIO CLAVE AQUÍ ---
// Lista de orígenes permitidos para Socket.IO
const allowedOrigins = [
    "http://127.0.0.1:5173",
    "http://localhost:5173",
    "http://192.168.106.102:5173"
];

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("User connected: " + socket.id);

  const userId = socket.handshake.query.userId;
  console.log("User ID:", userId);

  // Puedes manejar eventos aquí
  socket.on("disconnect", () => {
    console.log("User disconnected: " + socket.id);
  });
});

export { app, server };
