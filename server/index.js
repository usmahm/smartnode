const express = require("express");
var morgan = require("morgan");
var ip = require("ip");

const app = express();
const port = 3001;

app.use(morgan("tiny"));
app.use(express.json());

app.get("/status", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.post("/relay_status", (req, res) => {
  console.log(req.body);
  console.log("fridge_relay_status: ", req.body["fridge_relay_status"]);

  res.status(200).send("Relay status updated.");
});

// app.post("/test", (req, res) => {
//   // const fridge_relay_status = req.query.fridge_relay_status;
//   const api_key = req.query.api_key;

//   console.log(req.body);

//   console.log("api_key: ", api_key);

//   res.status(200).send("Relay status updated.");
// });

app.listen(port, () => {
  console.log(ip.address());

  console.log(`Listening on port ${port}`);
});
