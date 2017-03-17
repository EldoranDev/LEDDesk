import { Node } from '../node';
import { Input } from '../input';

export default class OutputNode extends Node {
  constructor(params = {}, options = {x: 0, y: 0}) {
    let o = Object.assign(
      {},
      options,
      { 
        width: 120,
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

    this.contentCreator = (p5) => {
        
    };

    this.contentUpdater = (p5) => {
      p5.push();
      p5.rectMode(p5.CENTER);
      p5.fill(this.inputs[0].value ? this.inputs[0].value.toString() : '#000');
      p5.rect(this.options.x + 60, this.options.y + 60, 50, 50);
      p5.pop();
      
    }
  }
}