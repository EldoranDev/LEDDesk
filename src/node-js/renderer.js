import { RenderNode, InsideNode, InsideNodeTitle } from './helper';
import { Colors } from './colors';

export default (p5) => {

  let world = null;
  let selection = null;

  let moving = false;
  let moveOffset = null;

  p5.setup = () => {
    let renderer = p5.createCanvas(window.innerWidth, window.innerHeight);
  }

  p5.draw = () => {
    p5.background(Colors.BACKGROUND);

    if(moving && p5.mouseIsPressed) {
      selection.options.x = p5.mouseX - moveOffset.x;
      selection.options.y = p5.mouseY - moveOffset.y;
    }

    if(world != null) {

      for(let i = 0; i < world.nodes.length; i++) {
        RenderNode(
          p5, 
          world.nodes[i], 
          {
            selected: selection == world.nodes[i]
          });
      }
    }
  }

  p5.windowResized = () => {
    p5.resizeCanvas(window.innerWidth, window.innerHeight);
  }

  p5.setData = (data) => {
    world = data;
  }

  p5.mousePressed = () => {
    selection = null;

    let mousePos = p5.createVector(p5.mouseX, p5.mouseY);

    for(let i = 0; i < world.nodes.length; i++) {
      
      // Check Node
      if(InsideNode(p5, world.nodes[i], mousePos)) {
        // Inside of the node
        selection = world.nodes[i];

        if(InsideNodeTitle(p5, selection, mousePos)) {
          moving = true;
          moveOffset = p5.createVector(mousePos.x - selection.options.x, mousePos.y - selection.options.y);
        }
        break;
      }
    }
  }

  p5.mouseReleased = () => {
    moving = false;
  }
}