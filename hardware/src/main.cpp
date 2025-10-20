#include <Arduino.h>
#include "customLogger.h"
#include "wifi.h"
#include "api.h"
#include "websocket.h"
// #include "webServer.h"
// #include "timeFunctions.h"
// #include "mqttClient.h"

void setup() {
  Serial.begin(115200);
  Serial.setDebugOutput(true);

  for(uint8_t t = 4; t > 0; t--) {
      Serial.printf("[SETUP] BOOT WAIT %d...\n", t);
      Serial.flush();
      delay(1000);
  }

  pinMode(RELAY_PIN, OUTPUT);
  digitalWrite(RELAY_PIN, HIGH);
  
  CustomLogger::initializeCustomLogger();
  // initializeWebServer();
  // initializeTimeClient();

  websocketSetup();
  getCurrentStatus();
}

void loop() {
  socketLoop();
}
