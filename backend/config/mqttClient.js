const mqtt = require("mqtt");

const mqttClient = mqtt.connect(
  `mqtt://${process.env.MQTT_IP}:${process.env.MQTT_PORT}`,
  {
    clean: true,
    connectTimeout: 4000,
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD,
    reconnectPeriod: 1000,
  }
);

module.exports = mqttClient;
