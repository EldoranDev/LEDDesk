import { Node } from '../node';
import { Input } from '../input';
import { Output } from '../output';
import { Color } from '../color';

import { Colors } from '../Colors';

export default class TimeNode extends Node {
  constructor(params = {}, options = {}) {
    let o = Object.assign(
      {},
      options,
      { 
        width: 100,
        title: "Time",
      }
    );

    super(params, o);

    this.outputs = [
      new Output(
        this,
        "1",
        () => Date.now(),
        {
          name: () => `${Date.now()}`
        }
      )
    ];

  }

  destroy() {
    super.destroy();

    clearInterval(this.data.interval);
  }
}

TimeNode.type = 'Inputs';