#pragma once

#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>
#include "customLogger.h"
#include "env.h"

extern unsigned long cur_state_duration; // millis
extern unsigned long l_stat_changed_time; // millis

extern bool tracking;
extern int cur_state;

struct GetReqRes {
  int httpResponseCode;
  String payload;
};

int sendUrlEncodedPostRequest(String path, String request_body);

void postRelayStatus(const bool status);

void toggleRelayStatus(int state, unsigned long duration);

void pastDurationCheck();

void getCurrentStatus();

GetReqRes sendGetRequest(String path);