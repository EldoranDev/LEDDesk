#define R 9
#define W 10
#define B 11
#define G 6

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
}

void loop() {
  // put your main code here, to run repeatedly:

}
