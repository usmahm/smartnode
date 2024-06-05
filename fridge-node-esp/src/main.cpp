#include <Arduino.h>
#include "customLogger.h"
#include "webServer.h"
#include "wifi.h"
#include "httpFunctions.h"

// HTTP
const String server_url = "REPLACE";
enum RELAY_ID { FRIDGE };

// Relay
unsigned long on_millis;
unsigned long on_duration = 16200000;
bool is_on = false;
const uint8_t on_hour = 10;
const uint8_t on_minute = 5;

void setup() {
  Serial.begin(115200);
  pinMode(RELAY_PIN, OUTPUT);
  
  initializeWifi();
  
  initializeWebServer();
  
  CustomLogger::initializeCustomLogger();

  CustomLogger::print(__DATE__);
  CustomLogger::println(__TIME__);
}

void loop() {
  // RtcDateTime datetime = Rtc.GetDateTime();
  // printDateTime(datetime);

  CustomLogger::println("---------");
  CustomLogger::println(on_millis);
  CustomLogger::println(millis());
  CustomLogger::println("---------");
  
  // if (datetime.Hour() == on_hour && datetime.Minute() == on_minute && !is_on) {
  //   digitalWrite(RELAY_PIN, HIGH);
    
  //   on_millis = millis();
  //   is_on = true;

  //   CustomLogger::println(datetime.Hour());
  //   CustomLogger::println(datetime.Minute());
  //   CustomLogger::print("Current Flowing for: ");
  //   CustomLogger::println(on_duration);

  //   postRelayStatus("on");
  // }

  // if (is_on && (millis() - on_millis >= on_duration)) {
  //   digitalWrite(RELAY_PIN, LOW);
  //   CustomLogger::println("Current turned off");
  //   is_on = false;
  //   postRelayStatus("off");
  // }
  
  delay(5000);
}
