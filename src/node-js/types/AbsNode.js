import { Node } from '../node';
import { Input } from '../input';
import { Output } from '../output';

export default class AbsNode extends Node {
    constructor(params = {}, options = {}) {
      let o = Object.assign(
        {},
        options,
        { 
          width: 100,
          title: "Absolute",
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
          {
            name: () => `x`
          }
        ),
      ];

      this.outputs = [
        new Output(
          this,
          "2",
          () => {
            return (this.inputs[0].value != null) ? Math.abs(this.inputs[0].value) : 0;
          },
          {
            name: () => {
              return `abs(x): ${(this.inputs[0].value != null) ? Math.abs(this.inputs[0].value).toFixed(2) : (0).toFixed(2)}`;
            }
          }
        )
      ];
    }
}

AbsNode.type = 'Math';