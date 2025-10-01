import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

// --- CORRECCIÓN AQUÍ ---
// Lista de orígenes permitidos para Socket.IO.
// Asegúrate de que esta IP es la correcta y añade localhost por si acaso.
const allowedOrigins = [
    "http://192.168.100.16:5173", // La IP de tu frontend
    "http://localhost:5173"       // Para desarrollo local
];

const io = new Server(server, {
  cors: {
    // Puedes pasar la lista directamente
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