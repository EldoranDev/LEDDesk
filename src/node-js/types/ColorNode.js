import { Node } from '../node';
import { Input } from '../input';
import { Output } from '../output';

export default class ColorNode extends Node {
  constructor(params = { color: '#FFFFFF' }, options = {}) {
      let o = Object.assign(
      {},
      options,
      { 
        title: "Static Color",
      }
    );

    super(params, o);

    this.outputs = [
      new Output(
        this,
        "1", 
        () => this.params.color,
        {
          color: "#FFF",
          name: () => this.params.color
        }
      ),
    ]

    this.contentCreator = (p5) => {
      this.contentDoms.color = p5.createInput(this.params.color, 'color');  
      this.contentDoms.color.value(this.params.color);

      this.contentDoms.color.input ( () => {
        this.params.color = this.contentDoms.color.value();
      })
    }

    this.contentUpdater = (p5) => {
      this.contentDoms.color.position(this.options.x + 50, this.options.y + 50);
    };
  }
}

ColorNode.type = "Inputs";