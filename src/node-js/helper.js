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