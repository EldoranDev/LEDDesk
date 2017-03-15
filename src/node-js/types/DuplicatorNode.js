import { Node } from '../node';
import { Input } from '../input';
import { Output } from '../output';

export default class DuplicatorNode extends Node {
  constructor(params = {}, options = {x: 0, y: 0}) {
    let o = Object.assign(
      {},
      options,
      { 
        height: 100,
        width: 200,
        title: "Duplicator"
      }
    );
    
    super(params, o);

    this.inputs = [
      new Input(
        this, 
        (con) => {
          return (con != null) ? con.value : null
        }
      ),
    ];

    this.outputs = [
      new Output(
        this,
        () => this.inputs[0].value
      ),
      new Output(
        this,
        () => this.inputs[0].value
      ),
    ]
  }
}