import { RenderNode } from './node-renderer';
import { Colors } from './colors';

import {
  OutputNode
} from './types/types';

export default (p5) => {

  let world = null;

  p5.setup = () => {
    let renderer = p5.createCanvas(window.innerWidth, window.innerHeight);
  }

  p5.draw = () => {
    p5.background(Colors.BACKGROUND);

    if(world != null) {

      for(let i = 0; i < world.nodes.length; i++) {
        RenderNode(world.nodes[i]);
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
    
  }
}