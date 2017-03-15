import { Node } from '../node';
import { Input } from '../input';
import { Output } from '../output';

export default class NumberNode extends Node {
  constructor(params = { number: 0 }, options = {x: 0, y: 0}) {
    let o = Object.assign(
      {},
      options,
      { 
        height: 100,
        width: 200,
        title: "Static Number"
      }
    );
    
    super(params, o);

    this.outputs = [
      new Output(
        this,
        () => this.params.number,
        {
          color: "#FFF",
          name: () => this.params.number
        }
      ),
    ]
  }
}