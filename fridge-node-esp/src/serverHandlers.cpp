#include "serverHandlers.h"

void postRelayStatusHandler(AsyncWebServerRequest *request) {
  CustomLogger::println("In postRelayStatusHandler");

  String status;

  if (request->hasParam("relay_status")) {
    status = request->getParam("relay_status")->value();
  }

  auto state_to_write = (status == "on") ? HIGH : LOW;

  CustomLogger::print("Toggling Relay: ");
  CustomLogger::print(RELAY_PIN);
  CustomLogger::print(" -- ");
  CustomLogger::println(state_to_write);
  CustomLogger::println("   new.   ");
  digitalWrite(RELAY_PIN, state_to_write);

  request->send(200, "text/plain", "Success!");
}