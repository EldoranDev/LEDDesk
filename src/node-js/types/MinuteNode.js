import { Node } from '../node';
import { Input } from '../input';
import { Output } from '../output';
import { Color } from '../color';

import { Colors } from '../Colors';

export default class MinutesNode extends Node {
  constructor(params = { interval: 100, step: 0.1 }, options = {}) {
    let o = Object.assign(
      {},
      options,
      { 
        width: 100,
        title: "Minutes",
      }
    );

    super(params, o);

    this.outputs = [
      new Output(
        this,
        "1",
        () => new Date().getMinutes(),
        {
          name: () => `${new Date().getMinutes()}`
        }
      )
    ];

  }

  destroy() {
    super.destroy();
  }
}

MinutesNode.type = 'Inputs';