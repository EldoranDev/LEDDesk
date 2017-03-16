import { Node } from '../node';
import { Input } from '../input';

export default class OutputNode extends Node {
  constructor(params = {}, options = {x: 0, y: 0}) {
    let o = Object.assign(
      {},
      options,
      { 
        title: "Output"
      }
    );
    
    super(params, o);

    this.inputs = [
      new Input(
        this,
        "1", 
        (con) => {
          return (con != null) ? con.value : null
        }, 
        {color: '#FFF'}
      ),
    ];
  }
}