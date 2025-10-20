#include "api.h"

unsigned long cur_state_duration; // millis
unsigned long l_stat_changed_time; // millis

bool tracking = false;
int cur_state;

int sendUrlEncodedPostRequest(String path, String request_body) {
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
    return httpResponseCode;
}

GetReqRes sendGetRequest(String path) {
  CustomLogger::println("Sending get request " + path);

  String endpoint = API_BASE_URL + path;

  WiFiClient client;
  HTTPClient http;

  GetReqRes res;
  
  // String payload;
  // int httpResponseCode
  
  http.begin(client, endpoint);

  res.httpResponseCode = http.GET();

  if (res.httpResponseCode > 0) {
    Serial.print("HTTP Response code: ");
    Serial.println(res.httpResponseCode);
    
    String payload = http.getString();
    res.payload = payload;
    Serial.println(payload);
  } else {
    Serial.print("Error when sending GET: ");
    Serial.println(res.httpResponseCode);
  }

  http.end();
  return res;
}

void postRelayStatus(const bool status) {
  if (WiFi.status() == WL_CONNECTED) {
    String request_body;

    request_body = "{\"relay_status\":\"" + String(status) + "\"}";

    int res = sendUrlEncodedPostRequest("/relay_status", request_body);
    
    CustomLogger::println(String("response") + String(res));

    if (!res) {
      CustomLogger::println("An error occured when posting relay status");
    }
  } else {
    CustomLogger::println("WiFi Disconnected");
  }
}

void toggleRelayStatus(int state, unsigned long duration) {
  CustomLogger::print("Toggling Relay: ");
  CustomLogger::print(RELAY_PIN);
  CustomLogger::print(" -- ");
  CustomLogger::print(state);
  CustomLogger::print(" for ");
  CustomLogger::print(duration);
  CustomLogger::print(" milliseconds ");

  
  cur_state_duration = duration;
  l_stat_changed_time = millis();

  digitalWrite(RELAY_PIN, state);
  cur_state = state;
  
  if (duration > 0) {
    tracking = true;
  }
}

void pastDurationCheck() {
  if (millis() - l_stat_changed_time > cur_state_duration) {
    cur_state = cur_state == LOW ? HIGH : LOW;

    digitalWrite(RELAY_PIN, cur_state);
    
    CustomLogger::println(String("Current turned ") + String(cur_state));
    postRelayStatus(cur_state);
    tracking = false;
  }
}

void getCurrentStatus() {
  GetReqRes res = sendGetRequest("/nodes/" + String(NODE_ID) + "/state");
  
  JsonDocument doc;
  deserializeJson(doc, res.payload);
  
  if (doc["success"]) {
    Serial.println("HEHEHEH");
    String newState = doc["data"]["state"];
    auto state_to_write = (newState == "0") ? HIGH : LOW;

    toggleRelayStatus(state_to_write, 0);
  }
}