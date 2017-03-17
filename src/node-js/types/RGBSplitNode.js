import { Node } from '../node';
import { Input } from '../input';
import { Output } from '../output';
import { Color } from '../color';

import { Colors } from '../Colors';

export default class RGBSplitNode extends Node {
  constructor(params = { color: '#FFFFFF' }, options = {}) {
      let o = Object.assign(
      {},
      options,
      { 
        title: "RGB Split",
      }
    );

    super(params, o);

    this.inputs = [
      new Input(
        this, 
        "1",
        (con) => {
          return (con != null) ? con.value : con;
        }
      )
    ];

    this.outputs = [
      new Output(
        this,
        "2",
        () => {
          return this.inputs[0].value.r;
        },
        {
          color: Colors.RED,
          name: () => `${(this.inputs[0].value != undefined ? this.inputs[0].value.r : 0)} R`
        }
      ),
            new Output(
        this,
        "3",
        () => {
          return this.inputs[0].value.g;
        },
        {
          color: Colors.GREEN,
          name: () => `${(this.inputs[0].value != undefined ? this.inputs[0].value.g : 0)} G`
        }
      ),
      new Output(
        this,
        "5",
        () => {
          return this.inputs[0].value.b;
        },
        {
          color: Colors.BLUE,
          name: () => `${(this.inputs[0].value != undefined ? this.inputs[0].value.b : 0)} B`
        }
      )
    ]
  }
}

RGBSplitNode.type = "Color";