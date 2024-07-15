#include "serverHandlers.h"

void postRelayStatusHandler(AsyncWebServerRequest *request) {
  CustomLogger::println("In postRelayStatusHandler");

  String status;
  unsigned long duration = 0; // In minutes

  if (request->hasParam("relay_status")) {
    status = request->getParam("relay_status")->value();
  }

  if (request->hasParam("duration")) {
    duration = request->getParam("duration")->value().toInt() * 60000;
  }

  auto state_to_write = (status == "0") ? HIGH : LOW;

  toggleRelayStatus(state_to_write, duration);

  request->send(200, "text/plain", "Success!");
}