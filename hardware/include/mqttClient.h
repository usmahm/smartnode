#pragma once

#include "wifi.h"
#include <AsyncMqttClient.h>
#include <Ticker.h>
#include "env.h"

// #define MQTT_HOST IPAddress(192, 168, 1, 10)

// TimerHandle_t mqttReconnectTimer;
// TimerHandle_t wifiReconnectTimer;

// extern AsyncMqttClient mqttClient;
// extern TimerHandle_t mqttReconnectTimer;
// extern TimerHandle_t wifiReconnectTimer;

namespace MQTTClient {
  void connectToMqtt();

  void WiFiEvent(WiFiEvent_t event);

  // To subscribe to topics
  void onMqttConnect(bool sessionPresent);

  void onMqttDisconnect(AsyncMqttClientDisconnectReason reason);

  void onMqttSubscribe(uint16_t packetId, uint8_t qos);

  void onMqttUnsubscribe(uint16_t packetId);

  void onMqttMessage(char* topic, char* payload, AsyncMqttClientMessageProperties properties, size_t len, size_t index, size_t total);

  void initializeMqtt();
}