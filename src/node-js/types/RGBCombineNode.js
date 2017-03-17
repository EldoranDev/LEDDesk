import { Node } from '../node';
import { Input } from '../input';
import { Output } from '../output';
import { Color } from '../color';

import { Colors } from '../Colors';

export default class RGBCombineNode extends Node {
  constructor(params = { color: '#FFFFFF' }, options = {}) {
      let o = Object.assign(
      {},
      options,
      { 
        title: "RGB Combine",
      }
    );

    super(params, o);

    this.inputs = [
      new Input(
        this,
        "1",
        (con) => {
          return (con != null) ? Math.min(255, con.value) : null;
        },
        {
          color: Colors.RED,
          name: () => "R"
        }
      ),
      new Input(
        this,
        "2",
        (con) => {
          return (con != null) ? Math.min(255, con.value) : null;
        },
        {
          color: Colors.GREEN,
          name: () => "G"
        }
      ),
      new Input(
        this,
        "3",
        (con) => {
          return (con != null) ? Math.min(255, con.value) : null;
        },
        {
          color: Colors.BLUE,
          name: () => "B"
        }
      )
    ];

    this.outputs = [
      new Output(
        this,
        "4", 
        () => {
          return new Color({
            r: parseInt(this.inputs[0].value),
            g: parseInt(this.inputs[1].value),
            b: parseInt(this.inputs[2].value)
          });
        }
      )
    ];
  }
}

RGBCombineNode.type = 'Color';