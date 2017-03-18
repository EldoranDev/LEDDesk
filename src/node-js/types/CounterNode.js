import { Node } from '../node';
import { Input } from '../input';
import { Output } from '../output';
import { Color } from '../color';

import { Colors } from '../Colors';

export default class CounterNode extends Node {
  constructor(params = { interval: 100, step: 0.1 }, options = {}) {
    let o = Object.assign(
      {},
      options,
      { 
        width: 100,
        title: "Counter",
      }
    );

    super(params, o);

    this.data.count = 0;

    this.outputs = [
      new Output(
        this,
        "1",
        () => this.data.count,
        {
          name: () => `${this.data.count.toFixed(2)}`
        }
      )
    ];

    this.startInterval();
  }

  startInterval() {
    if(this.data.interval != undefined) {
      clearInterval(this.data.interval);
    }

    this.data.interval = setInterval(() => {
      this.data.count += this.params.step;
    }, this.params.interval);
  }

  destroy() {
    super.destroy();

    clearInterval(this.data.interval);
  }
}

CounterNode.type = 'Inputs';