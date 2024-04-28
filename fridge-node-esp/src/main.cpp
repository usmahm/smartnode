#include <Arduino.h>

#include <ThreeWire.h>  
#include <RtcDS1302.h>

ThreeWire myWire(D4,D5,D2); // IO, SCLK, CE
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

const int relay = 5;
unsigned long on_millis;
bool is_on = false;

const uint8_t on_hour = 4;
const uint8_t on_minute = 40;

int on_duration = 1 * 60 * 1000;


void setup() {
  Serial.begin(115200);
  pinMode(relay, OUTPUT);

  Serial.print(__DATE__);
  Serial.println(__TIME__);

  Rtc.Begin();

  RtcDateTime compiled = RtcDateTime(__DATE__, __TIME__);
  printDateTime(compiled);
  Serial.println();
}

void loop() {
  RtcDateTime datetime = Rtc.GetDateTime();
  printDateTime(datetime);

  Serial.println("---------");
  Serial.println(on_millis);
  Serial.println(millis());
  Serial.println("---------");
  
  if (datetime.Hour() == 0 && datetime.Minute() == 30 && !is_on) {
    digitalWrite(relay, LOW);
    
    Serial.println(datetime.Hour());
    Serial.println(datetime.Minute());
    Serial.print("Current Flowing for: ");
    Serial.println(on_duration);

    on_millis = millis();
    is_on = true;
  }

  if (is_on && (millis() - on_millis >= on_duration)) {
    digitalWrite(relay, HIGH);
    Serial.println("Current turned off");
    is_on = false;
  }
  
  delay(5000);
}