#pragma once

#include "customLogger.h"
#include "env.h"

extern unsigned long cur_state_duration; // millis
extern unsigned long l_stat_changed_time; // millis

extern bool tracking;
extern int cur_state;

void toggleRelayStatus(int state, unsigned long duration);
void pastDurationCheck();
