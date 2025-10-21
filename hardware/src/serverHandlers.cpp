#include "serverHandlers.h"

unsigned long cur_state_duration; // millis
unsigned long l_stat_changed_time; // millis

bool tracking = false;
int cur_state;

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
    // postRelayStatus(cur_state);
    tracking = false;
  }
}
