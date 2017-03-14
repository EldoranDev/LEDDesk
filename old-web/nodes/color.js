class ColorNode extends Node {
  constructor(x, y) {
    super(x, y, 200, 100, "Fixed Color");

    this.color = '#FFFFFF';

    this.outputs = [
      new Output(this, "", '#C9C240', () => {
        return color(this.color);
      }, false)
    ];

    this.r = createSlider(0, 255, 0);
    this.g = createSlider(0, 255, 0);
    this.b = createSlider(0, 255, 0);
    
  }

  drawContent() {
    push();
    this.r.position(this.x + 10, this.y + 30, 0);
    this.g.position(this.x + 10, this.y + 50, 0);
    this.b.position(this.x + 10, this.y + 70, 0);

    textAlign(LEFT, CENTER);
    fill('#E53232');
    text("R", this.x + 150, this.y + 36);
    fill('#40C950');
    text("G", this.x + 150, this.y + 56);
    fill('#447EC9');
    text("B", this.x + 150, this.y + 76);

    this.color = color(this.r.value(), this.g.value(), this.b.value());
    
    pop();
  }

  destroy() {
    super.destroy();

    this.r.remove();
    this.g.remove();
    this.b.remove();
  }
}