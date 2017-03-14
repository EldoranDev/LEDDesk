class RepeaterNode extends Node {
  constructor(x, y) {
    super(x, y, 200, 100, "Repeater");

    this.inputs = [
      new Input("Input", "#fff")
    ];

    this.outputs = [
      new Output("Output 1", "#fff"),
      new Output("Output 2", "#fff")
    ];
  }

  drawContent() {
    push();

    /*
    ellipseMode(CENTER);
    fill('#E5D932');
    ellipse(0, (this.height)/2 + 10, 10, 10);

    
    ellipse(this.width, this.height/2 + 10, 10, 10);
    */
    
    pop();  
    
  }
}