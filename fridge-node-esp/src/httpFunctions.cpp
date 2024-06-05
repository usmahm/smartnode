#include "httpFunctions.h"


void sendUrlEncodedPostRequest(String path, String request_body) {
    String endpoint = API_BASE_URL + path;

    WiFiClient client;
    HTTPClient http;

    http.begin(client, endpoint);

    CustomLogger::println(request_body);

    http.addHeader("Content-Type", "application/json");

    // Data to send with HTTP POST
    int httpResponseCode = http.POST(request_body);

    CustomLogger::print("HTTP Response code: ");
    CustomLogger::println(httpResponseCode);

    http.end();
}

void postRelayStatus(const bool status) {
  if (WiFi.status() == WL_CONNECTED) {
    String request_body;

    request_body = "{\"relay_status\":\"" + String(status) + "\"}";

    sendUrlEncodedPostRequest("/relay_status", request_body);
  } else {
    CustomLogger::println("WiFi Disconnected");
  }
}