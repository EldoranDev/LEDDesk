import { Node } from '../node';
import { Input } from '../input';
import { Output } from '../output';

export default class MapNode extends Node {
    constructor(params = {from: { low: 0, high: 1}, to: { low: 0, high: 255 }}, options = {}) {
      let o = Object.assign(
        {},
        options,
        { 
          title: "Sinus",
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
            return (this.inputs[0].value != null) ? this.map(this.inputs[0].value) : 0;
          },
          {
            name: () => {
              return `map(x): ${(this.inputs[0].value != null) ? this.map(this.inputs[0].value).toFixed(2) : (0).toFixed(2)}`;
            }
          }
        )
      ];
    }

    map(val, l1, h1, l2, h2) {
      return this.params.to.high + (this.params.to.high - this.params.to.low) * (val - this.params.from.high) / (this.params.from.high - this.params.from.low);
    }
}

MapNode.type = 'Math';