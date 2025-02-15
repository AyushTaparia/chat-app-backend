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

    let connectedSockets = new Map();

    io.on("connection", (socket) => {
      console.log("A user connected", socket.id);

      socket.on("chat message", (message) => {
        console.log("Received message:", message);

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
