import { Colors } from './colors';

export function RenderNode(p5, node) {

  let o = node.options;

  p5.fill(Colors.NODE_BACKGROUND);
  p5.rect(o.x, o.y, o.width, o.height);

  p5.noStroke();
  p5.fill(Colors.NODE_TITLE);
  p5.rect(o.x + 1, o.y + 1, o.width - 2, 20);
};