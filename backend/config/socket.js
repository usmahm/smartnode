const express = require("express");
const { Server } = require("socket.io");
const { createServer } = require("http");

const socketClientsNodes = {};

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
  path: "/socket.io",
  cors: { origin: "*" },
});

module.exports = {
  io,
  app,
  httpServer,
  socketClientsNodes,
};
