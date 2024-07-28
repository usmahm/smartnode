#pragma once

#include <NTPClient.h>
#include <ESP8266WiFi.h>
#include <WiFiUdp.h>
#include "env.h"


extern NTPClient timeClient;

void initializeTimeClient();