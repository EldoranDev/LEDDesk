import { Colors } from './colors';
import RenderSettings from './render-settings';

export function RenderNode(p5, node, options) {

  let o = node.options;

  if(options.selected) {
    p5.stroke(Colors.YELLOW);
  }

  p5.fill(Colors.NODE_BACKGROUND);
  p5.rect(o.x, o.y, o.width, o.height);

  p5.noStroke();
  p5.fill(Colors.NODE_TITLE);
  p5.rect(o.x + 1, o.y + 1, o.width - 2, RenderSettings.TITLE_HEIGHT);
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