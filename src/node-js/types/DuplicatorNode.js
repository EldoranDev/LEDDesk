import { Node } from '../node';
import { Input } from '../input';
import { Output } from '../output';

export default class DuplicatorNode extends Node {
  constructor(params = {}, options = {}) {
    let o = Object.assign(
      {},
      options,
      { 
        width: 100,
        title: "Duplicator",
      }
    );
    
    super(params, o);

    this.inputs = [
      new Input(
        this,
        "1", 
        (con) => {
          return (con != null) ? con.value : null
        }
      ),
    ];

    this.outputs = [
      new Output(
        this,
        "2", 
        () => this.inputs[0].value
      ),
      new Output(
        this,
        "3", 
        () => this.inputs[0].value
      ),
    ]
  }
}

DuplicatorNode.type = "Logic";