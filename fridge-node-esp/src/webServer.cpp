#include "webServer.h"

AsyncWebServer server(80);

void initializeWebServer() {
  DefaultHeaders::Instance().addHeader("Access-Control-Allow-Origin", "*");

  server.begin();

  server.on("/relay_status", HTTP_POST, [](AsyncWebServerRequest *request) {
    postRelayStatusHandler(request);
  });
}
