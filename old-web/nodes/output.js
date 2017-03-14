class OutputNode extends Node {
  constructor(x, y) {
    super(x, y, 200, 100, "Output(                )");
    
    this.mode = '';
    this.useRGB();

    this.sel = createSelect();
    
    this.sel.option('RGB');
    this.sel.option('Color');
    
    this.color = color(0,0,0);

    this.sel.changed(() => {
      switch(this.sel.value()) {
        case 'RGB':
          this.useRGB();
          break;
        case 'Color':
          this.useColor();
          break;
      }
    });
  }

  useRGB() {
    this.clearConnections();
    this.mode = 'rgb';

    this.inputs = [
      new Input(this, 'R', '#E53232', (v) => v),
      new Input(this, 'G', '#40C950', (v) => v),
      new Input(this, 'B', '#447EC9', (v) => v),
    ];
  }

  useColor() {
    this.clearConnections();
    this.mode = 'color';

    this.inputs = [
      new Input(this, 'Color', '#FFF', (v) => color(v))
    ];
  }

  clearConnections() {
    for(let i = 0; i < this.inputs.length; i++) {
      if(this.inputs[i].connection != null) {
        this.inputs[i].connection.destroy();
      }
    }
  }

  drawContent() {
    this.sel.position(this.x + 52, this.y+2);

    switch(this.mode) {
      case 'rgb':
        this.color = color(this.inputs[0].getValue(), this.inputs[1].getValue(), this.inputs[2].getValue());
        break;
      case 'color':
        this.color = (this.inputs[0].getValue() != null) ?  this.inputs[0].getValue() : color('#000');
        break;
    }

    stroke(255);
    fill(this.color);
    rect(this.x + 80, this.y + 20 + 20, 100, 50);
  }

    destroy() {

  }
}