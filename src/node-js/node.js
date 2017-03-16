import { Colors } from './colors';
import { uuid } from './helper';

/**
 * Basic Node
 */
export class Node {
  
  /**
   * 
   * @param {*} options Renderer Options
   */
  constructor(params = {}, options = {}) {
    
    this.id = uuid();

    this.inputs = [];
    this.outputs = [];

    this.options = Object.assign({}, 
    {
      x: 0, 
      y:0, 
      height: 100, 
      width: 200, 
      title: "Node",
    }, options);
    this.params = params;
    
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

  toJSON() {
    return {
      id: this.id,
      type: this.constructor.name,
      params: this.params,
      options: this.options
    }
  }

  /**
   * Draw the content of the node
   */
  drawContent() {
    // Empty because this is the base node
  }

  get connectors() {
    return [
      ...this.inputs,
      ...this.outputs
    ]
  }

  destroy() {
    for(let i = 0; i < this.connectors.length; i++) {
      if(this.connectors[i].connection != null){
        this.connectors[i].connection.destroy();
      }
    }
  }
}