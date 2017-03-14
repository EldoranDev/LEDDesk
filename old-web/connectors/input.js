class Input extends Connector{
  
  constructor(parent, name, color, func) {
    super();

    this.parent = parent;
    this.name = name;
    this.color = color;
    this.func = func;

    this.center = createVector();

    this.connection = null;

    this.error = false;
    this.value = null;
  }

  show(x, y) {
    this.center.x = x;
    this.center.y = y;

    push();

    ellipseMode(CENTER);
    fill(this.color);
    ellipse(x, y, CONNECTOR_SIZE, CONNECTOR_SIZE);

    textAlign(LEFT, CENTER);
    
    let display = (!isNaN(this.value) && this.value != null) ? this.value.toFixed(2) : this.value;

    text(`${this.name} (${display})`, x + 12, y);

    pop();
  }

  getValue() {
    if(!this.error) {
      return this.value;
    } else {
      return null;
    }
  }

  setValue(val) {
    try {
      this.value = this.func(val);
      this.error = false;
    }catch(e) {
      this.error = true;
    }
  }
}