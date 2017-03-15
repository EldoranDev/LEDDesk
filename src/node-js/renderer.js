import { RenderNode, InsideNode, InsideNodeTitle, InsideNodeConnector, RenderConnection } from './helper';
import { Colors } from './colors';

import { Connection } from './connection';

import { Output } from './output';
import { Input } from './input';

export default (p5) => {

  let world = null;
  let selection = null;

  // Node moving
  let moving = false;
  let moveOffset = null;

  // Connectors
  let startConnector = null;
  let connectorPos = null;

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

      for(let i = 0; i < world.connections.length; i++) {
        RenderConnection(p5, world.connections[i]);
      }

      if(startConnector != null) {
        p5.push();
        p5.stroke('#FFF');
        p5.strokeWeight(3);
        p5.line(connectorPos.x, connectorPos.y, p5.mouseX, p5.mouseY);
        p5.pop();  
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
        } else {
          let conInfo = InsideNodeConnector(p5, selection, mousePos);

          if(conInfo != null) {
            startConnector = conInfo.connector;
            connectorPos = conInfo.pos;
          }
        }
        break;
      }
    }
  }

  p5.mouseReleased = () => {
    let mousePos = p5.createVector(p5.mouseX, p5.mouseY);

    // foce node drop
    moving = false;

    if(startConnector != null) {
      //Handle connect
      for(let i = 0; i < world.nodes.length; i++) {
      // Check Node
        if(InsideNode(p5, world.nodes[i], mousePos)) {
            let conInfo = InsideNodeConnector(p5, world.nodes[i], mousePos);
            
            if(conInfo != null) {
              if(startConnector.parent != conInfo.connector.parent) {
                let con = null;

                if(startConnector instanceof Output && conInfo.connector instanceof Input) {
                  con = new Connection(world, startConnector, conInfo.connector);  
                } else if(startConnector instanceof Input && conInfo.connector instanceof Output){
                  con = new Connection(world, conInfo.connector, startConnector);
                }
              }
            }
            break;
        }          
      }

    startConnector = null;
    }
  }

  p5.keyPressed = () => {
    if(p5.keyCode == p5.DELETE) {
      if(selection != null) {
        selection.destroy();
        world.nodes.splice(world.nodes.indexOf(selection), 1);
      }
    }
  }
}