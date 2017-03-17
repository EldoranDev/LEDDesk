import { Node } from '../node';
import { Input } from '../input';
import { Output } from '../output';

export default class GreaterNode extends Node {
    constructor(params = {}, options = {}) {
      let o = Object.assign(
        {},
        options,
        { 
          width: 100,
          title: "Greater",
        }
      );

      super(params, o);

      this.inputs = [
        new Input(
          this,
          "1", 
          (con) => {
            return con ? con.value : null
          },
          {
            name: () => `x`
          }
        ),

        new Input(
          this,
          "2",
          (con) => {
            return con ? con.value : null
          },
          {
            name: () => `y`
          }
        )
      ];

      this.outputs = [
        new Output(
          this,
          "3",
          () => {
            return (this.inputs[0].value !== undefined && this.inputs[1].value !== undefined) ? this.inputs[0].value > this.inputs[1].value : false;
          },
          {
            name: () => {
              return `x > y: ${(this.inputs[0].value !== undefined && this.inputs[1].value !== undefined) ? this.inputs[0].value > this.inputs[1].value : false}`;
            }
          }
        )
      ];
    }
}

GreaterNode.type = 'Math';