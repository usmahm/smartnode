#include "timeFunctions.h"

// unsigned long utcOffsetMs = 1*60*60*1000;
unsigned long updateInterval = 1 * 3600000;

// Define NTP Client to get time
WiFiUDP ntpUDP;

// server pool, time offset to adjust for timezone, update interval
NTPClient timeClient(ntpUDP, "pool.ntp.org", UTC_OFFSET*3600, updateInterval);

void initializeTimeClient() {
  timeClient.begin();

  timeClient.update();
}
