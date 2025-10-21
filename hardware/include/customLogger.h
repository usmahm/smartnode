#pragma once

#include <Arduino.h>
namespace CustomLogger {
  template <typename T>
  void print(T data) {
    Serial.print(data);

  };

  template <typename T>
  void println(T data) {
    Serial.println(data);

  };
  
  void initializeCustomLogger();
}
