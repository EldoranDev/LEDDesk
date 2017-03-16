import { Node } from '../node';
import { Input } from '../input';
import { Output } from '../output';

export default class NumberNode extends Node {
  constructor(params = { number: 0 }, options = {}) {
    let o = Object.assign(
      {},
      options,
      { 
        title: "Static Number",
      }
    );
    
    super(params, o);

    this.outputs = [
      new Output(
        this,
        "1", 
        () => this.params.number,
        {
          color: "#FFF",
          name: () => this.params.number
        }
      ),
    ]
  }
}

NumberNode.type = 'Inputs';