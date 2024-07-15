#include <Arduino.h>
#include "customLogger.h"
#include "webServer.h"
#include "wifi.h"
#include "httpFunctions.h"
#include "timeFunctions.h"

// Relay
unsigned long on_millis;
unsigned long on_duration = 18000000;
bool is_on = false;
const uint8_t on_hour = 8;
const uint8_t on_minute = 3;

void setup() {
  Serial.begin(115200);
  pinMode(RELAY_PIN, OUTPUT);
  
  initializeWifi();
  
  initializeWebServer();
  
  CustomLogger::initializeCustomLogger();
  // initializeTimeClient();
}

void loop() {
  CustomLogger::println("---------");
  CustomLogger::println(on_millis);
  CustomLogger::println(millis());
  CustomLogger::println("---------");
  
  int hour = timeClient.getHours();
  int minute = timeClient.getMinutes();

  String formatted = timeClient.getFormattedTime();

  CustomLogger::println(hour);
  CustomLogger::println(minute);
  CustomLogger::print(formatted);
  // CustomLogger::print(minute);

  if (hour == on_hour && minute == on_minute && !is_on) {
    digitalWrite(RELAY_PIN, HIGH);
    
    on_millis = millis();
    is_on = true;

    CustomLogger::println(hour);
    CustomLogger::println(minute);
    CustomLogger::print("Current Flowing for: ");
    CustomLogger::println(on_duration);

    postRelayStatus("on");
  }

  if (is_on && (millis() - on_millis >= on_duration)) {
    digitalWrite(RELAY_PIN, LOW);
    CustomLogger::println("Current turned off");
    is_on = false;
    postRelayStatus("off");
  }
  
  delay(5000);
}
