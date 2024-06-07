#pragma once

#include <ESP8266HTTPClient.h>
#include "customLogger.h"
#include "env.h"

void sendUrlEncodedPostRequest(String path, String request_body);

void postRelayStatus(const bool status);