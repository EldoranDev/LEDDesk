class Output extends Connector {
    constructor(parent, name, color, func, valueAsName) {
    super();

    this.parent = parent;
    this.name = name;
    this.color = color;
    this.func = func;
    this.center = createVector();
    this.connections = [];

    this.valueAsName = valueAsName;

    this.value = null;
  }

  getValue() {
    return this.value;
  }

  show(x, y) {
    this.center.x = x;
    this.center.y = y;
    
    this.value = this.func();

    if(this.valueAsName){
      this.name = this.value;
    }

    if(this.name == undefined) {
      this.name = "";
    }
    push();

    ellipseMode(CENTER);
    fill(this.color);
    ellipse(x, y, CONNECTOR_SIZE, CONNECTOR_SIZE);
    
    fill('white');
    textAlign(RIGHT, CENTER);
    text(this.name, x-12, y);

    pop();
  }


}