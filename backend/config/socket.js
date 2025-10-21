const express = require("express");
const { Server } = require("socket.io");
const { createServer } = require("http");

const socketClientsNodes = {};

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
  path: "/socket.io",
  transports: ["websocket", "polling"],
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    transports: ["websocket", "polling"],
    credentials: true,
  },
});

module.exports = {
  io,
  app,
  httpServer,
  socketClientsNodes,
};
