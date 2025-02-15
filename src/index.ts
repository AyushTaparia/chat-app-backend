"use strict";

module.exports = {
  register({ strapi }) {
    const io = require("socket.io")(strapi.server.httpServer, {
      cors: {
        origin: process.env.FRONTEND_URL || "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true,
      },
    });

    // Store socket instances
    let connectedSockets = new Map();

    io.on("connection", (socket) => {
      console.log("A user connected", socket.id);

      socket.on("chat message", (message) => {
        console.log("Received message:", message);
        // Echo back the message to all clients
        io.emit("chat message", message);
      });

      socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
        connectedSockets.delete(socket.id);
      });
    });

    strapi.io = io;
  },
};
