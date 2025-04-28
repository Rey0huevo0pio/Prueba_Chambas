import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://192.168.100.19:5173", // Cliente de React
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
