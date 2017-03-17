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
    this.data = {};

    this.inputCreator = null;
    this.contentDoms = {};
    this.contentUpdater = null;

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

  toJSON() {
    return {
      id: this.id,
      type: this.constructor.name,
      params: this.params,
      options: this.options
    }
  }

  createContent(p5) {
    console.log(this.contentCreator);
    if(this.contentCreator != null) {
      this.contentCreator(p5);
    }
  }


  contentUpdate(p5) {
    if(this.contentUpdater != null) {
      this.contentUpdater(p5);
    }
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

    let keys = Object.keys(this.contentDoms);

    for(let i = 0; i < keys.length; i++) {
      this.contentDoms[keys[i]].remove();
    }
  }
}