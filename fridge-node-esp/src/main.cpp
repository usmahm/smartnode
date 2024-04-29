#include <Arduino.h>

#include <ThreeWire.h>  
#include <RtcDS1302.h>

ThreeWire myWire(4, 5, 2); // IO, SCLK, CE
RtcDS1302<ThreeWire> Rtc(myWire);

#define countof(a) (sizeof(a) / sizeof(a[0]))

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
    Serial.print(datestring);
}

const int relay = 13;
unsigned long on_millis;
bool is_on = false;

uint8_t on_hour = 8;
uint8_t on_minute = 55;

unsigned long on_duration = 60000;


void setup() {
  Serial.begin(115200);
  pinMode(relay, OUTPUT);

  Serial.print(__DATE__);
  Serial.println(__TIME__);

  Rtc.Begin();

  RtcDateTime compiled = RtcDateTime(__DATE__, __TIME__);
  printDateTime(compiled);
  Serial.println();

  if (!Rtc.IsDateTimeValid()) 
    {
        // Common Causes:
        //    1) first time you ran and the device wasn't running yet
        //    2) the battery on the device is low or even missing

        Serial.println("RTC lost confidence in the DateTime!");
        Rtc.SetDateTime(compiled);
    }

    if (Rtc.GetIsWriteProtected())
    {
        Serial.println("RTC was write protected, enabling writing now");
        Rtc.SetIsWriteProtected(false);
    }

    if (!Rtc.GetIsRunning())
    {
        Serial.println("RTC was not actively running, starting now");
        Rtc.SetIsRunning(true);
    }

    RtcDateTime now = Rtc.GetDateTime();
    if (now < compiled) 
    {
        Serial.println("RTC is older than compile time!  (Updating DateTime)");
        Rtc.SetDateTime(compiled);
    }
    else if (now > compiled) 
    {
        Serial.println("RTC is newer than compile time. (this is expected)");
    }
    else if (now == compiled) 
    {
        Serial.println("RTC is the same as compile time! (not expected but all is fine)");
    }
}

void loop() {
  RtcDateTime datetime = Rtc.GetDateTime();
  printDateTime(datetime);

  Serial.println("---------");
  Serial.println(on_millis);
  Serial.println(millis());
  Serial.println("---------");
  
  if (datetime.Hour() == on_hour && datetime.Minute() == on_minute && !is_on) {
    digitalWrite(relay, HIGH);
    
    Serial.println(datetime.Hour());
    Serial.println(datetime.Minute());
    Serial.print("Current Flowing for: ");
    Serial.println(on_duration);

    on_millis = millis();
    is_on = true;
  }

  if (is_on && (millis() - on_millis >= on_duration)) {
    digitalWrite(relay, LOW);
    Serial.println("Current turned off");
    is_on = false;

    on_hour = 10;
    on_minute = 0;

    on_duration = 14400000;
  }
  
  delay(5000);
}