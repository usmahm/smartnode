#include <Arduino.h>
#include "customLogger.h"
#include "webServer.h"
#include "wifi.h"
#include "functions.h"
#include "timeFunctions.h"
#include "mqttClient.h"

// Relay
// unsigned long on_millis;
// unsigned long on_duration = 18000000;
// unsigned long on_duration = 300000;
// bool is_on = false;
// const uint8_t on_hour = 12;
// const uint8_t on_minute = 40;

void setup() {
  Serial.begin(115200);
  pinMode(RELAY_PIN, OUTPUT);
  
  MQTTClient::initializeMqtt();

  // initializeWifi();
  
  initializeWebServer();
  
  CustomLogger::initializeCustomLogger();
  initializeTimeClient();

  // getCurrentStatus();
}

void loop() {
  String formatted = timeClient.getFormattedTime();
  CustomLogger::println(formatted);

  if (tracking) {
    pastDurationCheck();
  }
  
  delay(5000);
}
