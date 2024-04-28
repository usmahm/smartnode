#include <Arduino.h>

#include <ThreeWire.h>  
#include <RtcDS1302.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>
#include <ESPAsyncWebServer.h>
#include <WebSerial.h>

ThreeWire myWire(D4,D5,D2); // IO, SCLK, CE
RtcDS1302<ThreeWire> Rtc(myWire);

#define countof(a) (sizeof(a) / sizeof(a[0]))

// HTTP
const char* ssid = "raspit";
const char* password = "raspit1ras";
const String server_url = "http://192.168.0.145:3001/";
enum RELAY_ID { FRIDGE };

// Relay
const int fridgeRelay = 5;
unsigned long on_millis;
unsigned long on_duration = 3.5 * 60 * 60 * 1000;
bool is_on = false;
const uint8_t on_hour = 12;
const uint8_t on_minute = 0;

// Server
AsyncWebServer server(80);

void print(auto data) {
  Serial.print(data);
  if (WiFi.status() == WL_CONNECTED) {
    WebSerial.print(data);
  }
}

void println(auto data) {
  Serial.println(data);
  if (WiFi.status() == WL_CONNECTED) {
    WebSerial.println(data);
  }
}

void printDateTime(const RtcDateTime& dt)
{
    char datestring[20];

    snprintf_P(datestring, 
            countof(datestring),
            PSTR("%02u/%02u/%04u %02u:%02u:%02u"),
            dt.Month(),
            dt.Day(),
            dt.Year(),
            dt.Hour(),
            dt.Minute(),
            dt.Second() );
    println(datestring);
}

void sendUrlEncodedPostRequest(String path, String request_body) {
    String endpoint = server_url + path;

    WiFiClient client;
    HTTPClient http;

    http.begin(client, endpoint);

    println(request_body);

    http.addHeader("Content-Type", "application/json");

    // Data to send with HTTP POST
    int httpResponseCode = http.POST(request_body);

    print("HTTP Response code: ");
    println(httpResponseCode);

    http.end();
}

void sendRelayStatus(const RELAY_ID relay_id, const bool status) {
  if (WiFi.status() == WL_CONNECTED) {
    String request_body;

    switch (relay_id)
    {
    case RELAY_ID::FRIDGE:
      request_body = "{\"fridge_relay_status\":\"" + String(status) + "\"}";
      break;
    default:
      println("Relay id not handled in sendRelayStatus()");
      return;
      break;
    }

    sendUrlEncodedPostRequest("relay_status", request_body);
  } else {
    println("WiFi Disconnected");
  }
}

void postRelayStatusHandler(AsyncWebServerRequest *request) {
  println("In postRelayStatusHandler");

  RELAY_ID relay_id;
  String status;
  int relay_to_toggle;

  if (request->hasParam("fridge_relay_status")) {
    relay_id = RELAY_ID::FRIDGE;
    status = request->getParam("fridge_relay_status")->value();
  }

  auto state_to_write = (status == "on") ? HIGH : LOW;

  switch (relay_id)
  {
    case RELAY_ID::FRIDGE:
      println("Fridge toggled: ");
      relay_to_toggle = fridgeRelay;
      break;
    default:
      println("Relay id not handled in postRelayStatusHandler()");
      return;
      break;
  }

  print("Toggling Relay: ");
  print(relay_to_toggle);
  print(" -- ");
  println(state_to_write);
  println("   new.   ");
  digitalWrite(relay_to_toggle, state_to_write);

  request->send(200, "text/plain", "Success!");
}

void recvMsg(uint8_t *data, size_t len){
  WebSerial.println("Received Data...");
  String d = "";
  for(int i=0; i < len; i++){
    d += char(data[i]);
  }
  WebSerial.println(d);
  
  print("Received from remote: ");
  println(d);
}

void setup() {
  Serial.begin(115200);
  pinMode(fridgeRelay, OUTPUT);
  
  print(__DATE__);
  println(__TIME__);

  Rtc.Begin();

  RtcDateTime compiled = RtcDateTime(__DATE__, __TIME__);
  printDateTime(compiled);
  println("");

  WiFi.begin(ssid, password);
  println("Connecting to wifi");

  WebSerial.begin(&server);
  WebSerial.msgCallback(recvMsg);
  WebSerial.println("Connected to Remote Serial!");

  while(WiFi.status() != WL_CONNECTED) {
    delay(1000);
    print(".");
  }

  println("");
  print("Connected to WiFi network with IP Address: ");
  println(WiFi.localIP());
  
  DefaultHeaders::Instance().addHeader("Access-Control-Allow-Origin", "*");
  server.begin();

  server.on("/relay_status", HTTP_POST, [](AsyncWebServerRequest *request) {
    postRelayStatusHandler(request);
  });
}

void loop() {
  RtcDateTime datetime = Rtc.GetDateTime();
  printDateTime(datetime);

  println("---------");
  println(on_millis);
  println(millis());
  println("---------");
  
  if (datetime.Hour() == on_hour && datetime.Minute() == on_minute && !is_on) {
    digitalWrite(fridgeRelay, HIGH);
    
    on_millis = millis();
    is_on = true;

    println(datetime.Hour());
    println(datetime.Minute());
    print("Current Flowing for: ");
    println(on_duration);

    sendRelayStatus(RELAY_ID::FRIDGE, "on");
  }

  if (is_on && (millis() - on_millis >= on_duration)) {
    digitalWrite(fridgeRelay, LOW);
    println("Current turned off");
    is_on = false;
    sendRelayStatus(RELAY_ID::FRIDGE, "off");
  }
  
  delay(5000);
}