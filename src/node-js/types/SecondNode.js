import { Node } from '../node';
import { Input } from '../input';
import { Output } from '../output';
import { Color } from '../color';

import { Colors } from '../Colors';

export default class SecondNode extends Node {
  constructor(params = {}, options = {}) {
    let o = Object.assign(
      {},
      options,
      { 
        width: 100,
        title: "Seconds",
      }
    );

    super(params, o);

    this.outputs = [
      new Output(
        this,
        "1",
        () => new Date().getSeconds(),
        {
          name: () => `${new Date().getSeconds()}`
        }
      )
    ];

  }

  destroy() {
    super.destroy();
  }
}

SecondNode.type = 'Inputs';