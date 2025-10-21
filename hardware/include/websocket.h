#pragma once

#include <Arduino.h>

// #include <WiFi.h>
// #include <WiFiMulti.h>

// #include <ESP8266WiFi.h>
// #include <ESP8266WiFiMulti.h>
// #include <WiFiClientSecure.h>


#include <WebSocketsClient.h>
#include <SocketIOclient.h>
#include <ArduinoJson.h>
#include <Hash.h>

#include <WiFiClientSecure.h>

#include "env.h"
#include "wifi.h"
#include "serverHandlers.h"


void websocketSetup();

void socketLoop();