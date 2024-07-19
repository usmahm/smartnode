#pragma once

#include <Arduino.h>
// #include <WebSerial.h>
#include "webServer.h"

// extern boolean initialized;
namespace CustomLogger {
  template <typename T>
  void print(T data) {
    Serial.print(data);

    // if (initialized)
      // WebSerial.print(data);
  };

  template <typename T>
  void println(T data) {
    Serial.println(data);

    // if (initialized)
      // WebSerial.println(data);
  };
  
  void initializeCustomLogger();
  // void parseReceivedMsg(uint8_t *data, size_t len);
}
