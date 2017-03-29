#define G 9
#define B 10
#define W 11
#define R 6

char currentColor = 0;
bool newData = false;

char data[32];

short dataSize = 0;
short i = 0;

char valueBuf[4];
byte value = 0;

void setup() {
  // put your setup code here, to run once:
  pinMode(R, OUTPUT);
  pinMode(G, OUTPUT);
  pinMode(B, OUTPUT);
  pinMode(W, OUTPUT);

  analogWrite(R, 0);
  analogWrite(G, 0);
  analogWrite(B, 0);
  analogWrite(W, 0);

  Serial.begin(9600);
}

void loop() {
  if(Serial.available() > 0) {

    dataSize = Serial.readBytesUntil('\n', data, 32);
    if(dataSize < 32) {
      data[dataSize] = '\0';
    }
    
    
    if(dataSize <= 4) {
     for(i = 1; i <= dataSize; i++) {
      valueBuf[i-1] = data[i];
     }

     valueBuf[dataSize-1] = '\0';

     sscanf(valueBuf, "%d", &value);
     newData = true;
    }
  }

  if(newData) {
    newData = false;
    
    switch(data[0]) {
      case 'R':
        analogWrite(R, value);
        break;
      case 'G':
        analogWrite(G, value);
        break;
     case 'B':
        analogWrite(B, value);
        break;
     case 'W':
        analogWrite(W, value);
        break;
    }
  }
  
  delay(1);
}
