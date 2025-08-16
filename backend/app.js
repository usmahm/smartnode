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
const mqttClient = require("./config/mqttClient");

const file = fs.readFileSync("./apiSpec.yaml", "utf8");
const swaggerDocument = YAML.parse(file);

const app = express();

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

// app.get("/relay_status", (req, res) => {
//   // console.log("Relay id -", req.params);
//   // console.log("Relay id --", req.query);
//   res.status(200).json({ state: 1 });
// });

// app.post("/relay_status", (req, res) => {
//   // console.log(req.body);
//   // console.log("fridge_relay_status: ", req.body["fridge_relay_status"]);

//   res.status(200).send("Relay status updated.");
// });

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

mqttClient.on("connect", () => {
  // console.log("MQTT Connection Extablished");
});

sequelize
  .authenticate()
  .then(() => {
    // // console.log("Connected to DB.");
    return sequelize.sync();
  })
  .then(() => {
    app.listen(process.env.PORT || 3001, () => {
      // // console.log(
      //   `Listening on port ${
      //     process.env.PORT || 3001
      //   }. IP Address - ${ip.address()}`
      // );
    });
  });
