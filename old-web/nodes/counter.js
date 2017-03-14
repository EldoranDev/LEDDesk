class CounterNode extends Node {
  constructor(x,y) {
    super(x, y, 200, 100, "Counter");

    this.count = 0;

    this.speed = 100;
    this.stepSize = 1;

    this.timer = setInterval(() => {
      this.tick();
    }, this.speed);

    this.speedInput = createInput(this.speed);
    this.stepInput = createInput(this.stepSize);

    this.speedInput.style('width: 60px;');
    this.stepInput.style('width: 60px;');

    this.speedInput.input(() => this.restartTimer());
    this.stepInput.input(() => this.restartTimer());

    this.outputs = [
      new Output(this, "Counter", "#fff", () => {
        return this.count;
      }, true)
    ];
  }

  restartTimer() {
    if(
      isNaN(this.speedInput.value()) ||
      isNaN(this.stepInput.value())
      ) {
        this.error = true;
      } else {
        if(this.speedInput.value() > 0) {
          this.error = false;
          clearInterval(this.timer);

          this.speed = Number(this.speedInput.value());
          this.stepSize = Number(this.stepInput.value());
          
          this.timer = setInterval(() => {
            this.tick();
          }, this.speed);

        } else {
          this.error = true;
        }
      }
  }

  tick() {
    this.count += this.stepSize;
    this.count = Number(this.count.toFixed(2));
  }

  update() {
    
  }

  drawContent() {
    this.speedInput.position(this.x + 10, this.y + 40);
    this.stepInput.position(this.x + 10, this.y + 70);

    text("Delay (ms)", this.x + 80, this.y + 55);
    text("Step Size", this.x + 80, this.y + 85);
    this.update();
  }

  destroy() {
    super.destroy();

    clearInterval(this.timer);
  }
}