#include "websocket.h"

// ESP8266WiFiMulti WiFiMulti1;
SocketIOclient socketIO;

void handleEvent(uint8_t *payload) {    
    JsonDocument doc;
    deserializeJson(doc, payload);

    if (doc[0] == "state") {
        String newState = doc[1]["state"];
        auto state_to_write = (newState == "0") ? HIGH : LOW;

        toggleRelayStatus(state_to_write, 0);
    }
}

void socketIOEvent(socketIOmessageType_t type, uint8_t * payload, size_t length) {
    switch(type) {
        case sIOtype_DISCONNECT:
            Serial.printf("[IOc] Disconnected!\n", payload);
            break;
        case sIOtype_CONNECT:
            Serial.printf("[IOc] Connected to url: %s\n", payload);

            // join default namespace (no auto join in Socket.IO V3)
            socketIO.send(sIOtype_CONNECT, "/");
            break;
        case sIOtype_EVENT:
            Serial.printf("[IOc] get event: %s\n", payload);
            handleEvent(payload);
            break;
        case sIOtype_ACK:
            Serial.printf("[IOc] get ack: %u\n", length);
            hexdump(payload, length);
            break;
        case sIOtype_ERROR:
            Serial.printf("[IOc] get error: %u\n", length);
            hexdump(payload, length);
            break;
        case sIOtype_BINARY_EVENT:
            Serial.printf("[IOc] get binary: %u\n", length);
            hexdump(payload, length);
            break;
        case sIOtype_BINARY_ACK:
            Serial.printf("[IOc] get binary ack: %u\n", length);
            hexdump(payload, length);
            break;
    }
}

void websocketSetup() {
    initializeWifi();

    // server address, port and URL
    if (LOCAL_API) {
        // Serial.println("INNNN");
        socketIO.begin(API_ADDRESS, API_PORT, "/socket.io/?EIO=4&nodeId=" + String(NODE_ID));
    } else{
        // Serial.println("INNNN222");
        socketIO.beginSSL(API_ADDRESS, API_PORT, "/socket.io/?EIO=4&nodeId=" + String(NODE_ID));
    }

    // event handler
    socketIO.onEvent(socketIOEvent);
}

void socketLoop() {
    socketIO.loop();
}