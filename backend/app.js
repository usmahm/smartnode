require("dotenv").config();
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const ip = require("ip");
const swaggerUI = require("swagger-ui-express");
const fs = require("fs");
const YAML = require("yaml");

const sequelize = require("./config/dbConnection");
const sendResponse = require("./utils/sendResponse");

const authRoutes = require("./routes/authRoutes");
const nodeRoutes = require("./routes/nodeRoutes");
const groupRoutes = require("./routes/groupRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
// const mqttClient = require("./config/mqttClient");
const { socketClientsNodes, io, httpServer, app } = require("./config/socket");

const file = fs.readFileSync("./apiSpec.yaml", "utf8");
const swaggerDocument = YAML.parse(file);

// Adjust this to only allow some routes
app.use(cors());

app.use(morgan("tiny"));
app.use(express.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.get("/status", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/auth", authRoutes);
app.use("/nodes", nodeRoutes);
app.use("/users", userRoutes);
app.use("/groups", groupRoutes);
app.use("/admin", adminRoutes);

app.use((req, res) => {
  sendResponse(res, 404, {
    success: false,
    message: "Requested route doesn't exist!",
  });
});

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const body = error.body || {
    success: false,
    message: "An internal error occured",
  };
  // // console.log(
  //   `\nERROR - statusCode=${statusCode}, body=${JSON.stringify(body)}\n`
  // );
  sendResponse(res, statusCode, body);
});

// io.on("connection", (socket) => {
//   const nodeId = socket.handshake.query && socket.handshake.query.nodeId;

//   if (nodeId) {
//     console.log("Node connected:", nodeId, "socket.id=", socket.id);

//     // assign socket to a room named after the nodeid
//     socket.join(nodeId);

//     socketClientsNodes[nodeId] = socket.id;
//   } else {
//     console.log("Connected socket without nodeId:", socket.id);
//   }

//   console.log("New client connected");

//   socket.on("disconnect", (reason) => {
//     console.log("Disconnected", nodeId || socket.id, reason);

//     delete socketClientsNodes[nodeId];
//   });
// });

sequelize
  .authenticate()
  .then(() => {
    // // console.log("Connected to DB.");
    return sequelize.sync();
  })
  .then(() => {
    httpServer.listen(process.env.PORT || 3001, () => {
      console.log(
        `Listening on port ${
          process.env.PORT || 3001
        }. IP Address - ${ip.address()}`
      );
    });
  });

// function sendToNode(nodeId, eventName, payload) {
//   // Emit to the room that has the same name as nodeId.
//   io.to(nodeId).emit(eventName, payload);
// }

// // Example usage:
// setInterval(() => {
//   sendToNode("node-1122", "server_command", { hello: "device" });
// }, 5000);
