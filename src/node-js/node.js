import { Colors } from './colors';

/**
 * Basic Node
 */
export class Node {
  
  /**
   * 
   * @param {*} options Renderer Options
   */
  constructor(options = {x: 0, y:0, height: 100, width: 200, title: "Node"}) {
    this.inputs = [];
    this.outputs = [];

    this.options = options;

    this.error = false;
  }

  /**
   * Update the Node
   */
  update() {

  }

  /**
   * Draw the node using p5
   * @param {number} x 
   * @param {number} y 
   * @param {number} width 
   * @param {number} height 
   */
  draw(x, y, width, height) {
    if(this.error) {
      stroke(Colors.RED);
    }
  }

  /**
   * Draw the content of the node
   */
  drawContent() {
    // Empty because this is the base node
  }
}