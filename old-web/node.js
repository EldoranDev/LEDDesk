class Node {
  
  constructor(x, y, width, height, title) {
    this.x = x;
    this.y = y;

    this.selected = false;
    
    this.width = width,
    this.height = height;
    this.title = title;

    this.inputs = [];
    this.outputs = [];

    this.offset = createVector();
  }

  show() {
    push();

    if(this.error) {
      strokeWeight(2),
      stroke('#FF0000');
    }else if(this.selected) {
      strokeWeight(2);
      stroke('#C9C240')
    } else {
      stroke(0);
    }
    fill("#11283A");
    rect(this.x, this.y, this.width, this.height);

    noStroke();
    fill('#447EC9');
    rect(this.x+1, this.y+1, this.width-2, 20);

    fill(255);
    text(this.title, this.x + 10,  this.y + 15);
    
    let between = (this.height+20) / (this.inputs.length + 1);

    for(let i = 0; i < this.inputs.length; i++) {
      this.inputs[i].show(this.x + 0, this.y + (i+1) * between);
    }

    between = (this.height + 20) / (this.outputs.length + 1);

    for(let i = 0; i < this.outputs.length; i++) {
      this.outputs[i].show(this.x + this.width, this.y + (i+1) * between);
    }

    this.drawContent();

    pop();
  }

  drawContent() {

  }

  mouseDown() {
    this.offset.x = mouseX - this.x;
    this.offset.y = mouseY - this.y ;
  }

  mouseMove() {
    this.x = mouseX - this.offset.x;
    this.y = mouseY - this.offset.y;
  }

  destroy() {
    for(let i = 0; i < this.inputs.length; i++) {
      if(this.inputs[i].connection != null) {
        this.inputs[i].connection.destroy();
      }
    }

    for(let i = 0; i < this.outputs.length; i++) {
      for(let j = 0; j < this.outputs[i].connections.length; j++) {
        this.outputs[i].connections[j].destroy();
      }
    }

    nodes.splice(nodes.indexOf(this), 1);
  }
}