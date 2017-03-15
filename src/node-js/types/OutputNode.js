import { Node } from '../node';

export default class OutputNode extends Node {
  constructor(options = {x: 0, y: 0}) {
    let o = Object.assign(
      {},
      options,
      { 
        height: 100,
        width: 200,
        title: "Output"
      }
    );
    
    super(o);
  }
}