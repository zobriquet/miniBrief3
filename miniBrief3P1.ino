const int LED_PIN = 9;
const int LED_PIN1 = 10;
const int LED_PIN2 = 11;
String receivedData = "";

void setup() {
  Serial.begin(115200);
  pinMode(LED_PIN, OUTPUT);
  pinMode(LED_PIN1, OUTPUT);
  pinMode(LED_PIN2, OUTPUT);
}

void loop() {
  while (Serial.available() > 0) {
    char c = Serial.read();
    if (c == '\n' || c == '\r') {
      if (receivedData.length() > 0) {
        processData(receivedData);
        receivedData = "";
      }
    } else {
      receivedData += c;
    }
  }
}

void processData(String data) {
  data.trim();
  String label = "";
  
  // Parse JSON: {"label":"class_1","confidence":0.85}
  if (data.indexOf("{") >= 0) {
    int labelStart = data.indexOf("\"label\":\"") + 9;
    int labelEnd = data.indexOf("\"", labelStart);
    if (labelEnd > labelStart) {
      label = data.substring(labelStart, labelEnd);
    }
  }
  // Parse CSV: class_1,0.85
  else if (data.indexOf(",") > 0) {
    label = data.substring(0, data.indexOf(","));
  }
  // Plain label
  else {
    label = data;
  }
  
  // Control LED
  if (label.indexOf("class_1") >= 0) {
   analogWrite(LED_PIN, 255);
   analogWrite(LED_PIN1, 255);
   analogWrite(LED_PIN2, 255);

  } else if (label.indexOf("class_2") >= 0) {
    analogWrite(LED_PIN, 0);
    analogWtite(LED_PIN, 0);
    analogWrite(LED_PIN, 0);
  }
}