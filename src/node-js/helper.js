import { Colors } from './colors';
import RenderSettings from './render-settings';

export function RenderNode(p5, node, options) {

  let o = node.options;

  if(options.selected) {
    p5.stroke(Colors.YELLOW);
  }

  // Render Box
  p5.fill(Colors.NODE_BACKGROUND);
  p5.rect(o.x, o.y, o.width, o.height);

  p5.noStroke();
  p5.fill(Colors.NODE_TITLE);
  p5.rect(o.x + 1, o.y + 1, o.width - 2, RenderSettings.TITLE_HEIGHT);

  p5.fill(255);
  p5.textAlign(p5.LEFT, p5.CENTER);
  p5.text(o.title, o.x + 10, o.y + 11);

  // Render Inputs
  let gap = (o.height - RenderSettings.TITLE_HEIGHT) / (node.inputs.length + 1);
  
  p5.push();
  
  for(let i = 0; i < node.inputs.length; i++) {
    let con = node.inputs[i];
    
    let y = o.y + (i+1) * gap + RenderSettings.TITLE_HEIGHT;
    
    con.options.center = p5.createVector(o.x, y);
    
    p5.ellipseMode(p5.CENTER);
    p5.fill(con.options.color);
    p5.ellipse(
      o.x,
      y,
      RenderSettings.CONNECTOR_SIZE,
      RenderSettings.CONNECTOR_SIZE
    );

    p5.textAlign(p5.LEFT, p5.CENTER);
    p5.text(con.options.name(), o.x + RenderSettings.CONNECTOR_SIZE/2 + 2, y);
 
  }

  gap = (o.height - RenderSettings.TITLE_HEIGHT) / (node.outputs.length + 1);
  
  for(let i = 0; i < node.outputs.length; i++) {
    let con = node.outputs[i];
    let y = o.y + (i+1) * gap + RenderSettings.TITLE_HEIGHT;
    let x = o.x + o.width;

    con.options.center = p5.createVector(x, y);

    p5.ellipseMode(p5.CENTER);
    p5.fill(con.options.color);
    p5.ellipse(
      x,
      y,
      RenderSettings.CONNECTOR_SIZE,
      RenderSettings.CONNECTOR_SIZE
    );

    p5.textAlign(p5.RIGHT, p5.CENTER);
    p5.text(con.options.name(), x - RenderSettings.CONNECTOR_SIZE/2 - 2, y);
  }

  p5.pop();
};

export function RenderConnection(p5, con) {
  p5.push();

  let distance = p5.abs(con.output.options.center.x - con.input.options.center.x);

  distance = p5.max(40, distance);

  p5.stroke('#FFF');
  p5.strokeWeight(3);
  p5.noFill();
  p5.bezier(
    con.output.options.center.x,
    con.output.options.center.y,
    con.output.options.center.x + distance,
    con.output.options.center.y,
    con.input.options.center.x - distance,
    con.input.options.center.y,
    con.input.options.center.x,
    con.input.options.center.y,
    )

  p5.pop();
}

export function InsideNode(p5, node, mouse) {
  return (
    mouse.x > node.options.x - (RenderSettings.CONNECTOR_SIZE/2) && mouse.x < node.options.x + node.options.width  + (RenderSettings.CONNECTOR_SIZE/2) &&
    mouse.y > node.options.y - (RenderSettings.CONNECTOR_SIZE/2) && mouse.y < node.options.y + node.options.height + (RenderSettings.CONNECTOR_SIZE/2)
  );
}

export function InsideNodeTitle(p5, node, mouse) {
  return (
    mouse.x > node.options.x && mouse.x < node.options.x + node.options.width &&
    mouse.y > node.options.y  && mouse.y < node.options.y + RenderSettings.TITLE_HEIGHT
  );
}

export function InsideNodeConnector(p5, node, mouse) {
   let o = node.options;
   let gap = (o.height - RenderSettings.TITLE_HEIGHT) / (node.inputs.length + 1);

   for(let i = 0; i < node.inputs.length; i++) {
      if(p5.pow(mouse.x - o.x, 2) + p5.pow(mouse.y - ((o.y + gap * (i+1))+20),2) < p5.pow(RenderSettings.CONNECTOR_SIZE, 2)) {
                return {
          pos: p5.createVector(o.x, (o.y + gap * (i+1))+20),
          connector: node.inputs[i]
        };
      }
   }

   gap = (o.height - RenderSettings.TITLE_HEIGHT) / (node.outputs.length + 1);
   for(let i = 0; i < node.outputs.length; i++) {
      if(p5.pow(mouse.x - (o.x + o.width), 2) + p5.pow(mouse.y - ((o.y + gap * (i+1))+20),2) < p5.pow(RenderSettings.CONNECTOR_SIZE, 2)) {
        return {
          pos: p5.createVector(o.x + o.width, (o.y + gap * (i+1))+20),
          connector: node.outputs[i]
        };
      }
   }

   return null;
}

export function uuid() {
    var d = Date.now();
    
    d += performance.now(); //use high-precision timer if available
    
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}