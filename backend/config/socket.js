const express = require("express");
const { Server } = require("socket.io");
const { createServer } = require("http");
const { getNodeById } = require("../models/nodeModel");

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

const sendCurrentNodeState = async (nodeId) => {
  try {
    const node = await getNodeById(nodeId);

    if (!node) {
      const error = new Error();
      throw error;
    }

    io.to(nodeId).emit("state", { state: node.state });
  } catch (err) {
    console.log("ERR", err);
  }
};

io.on("connection", (socket) => {
  const nodeId = socket.handshake.query && socket.handshake.query.nodeId;

  if (nodeId) {
    console.log("Node connected:", nodeId, "socket.id=", socket.id);

    // assign socket to a room named after the nodeid
    socket.join(nodeId);

    socketClientsNodes[nodeId] = socket.id;

    sendCurrentNodeState(nodeId);
  } else {
    console.log("Connected socket without nodeId:", socket.id);
  }

  console.log("New client connected");

  socket.on("disconnect", (reason) => {
    console.log("Disconnected", nodeId || socket.id, reason);

    delete socketClientsNodes[nodeId];
  });
});

module.exports = {
  io,
  app,
  httpServer,
  socketClientsNodes,
};
