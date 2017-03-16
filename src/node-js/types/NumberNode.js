import { Node } from '../node';
import { Input } from '../input';
import { Output } from '../output';

export default class NumberNode extends Node {
  constructor(params = { number: 0 }, options = {}) {
    let o = Object.assign(
      {},
      options,
      { 
        title: "Static Number",
      }
    );
    
    super(params, o);

    this.outputs = [
      new Output(
        this,
        "1", 
        () => this.params.number,
        {
          color: "#FFF",
          name: () => this.params.number
        }
      ),
    ]

    this.contentCreator = (p5) => {
      console.log("CREATION");
      this.contentDoms.number = p5.createInput(this.params.number);

      this.contentDoms.number.input( () => {

        if(!isNaN(this.contentDoms.number.value())) {
          this.params.number = this.contentDoms.number.value();
          this.error = false;
        } else {
          this.error = true;
          this.params.number = 0;
        }
      });
    }

    this.contentUpdater = (p5) => {
      this.contentDoms.number.position(this.options.x + 30, this.options.y + 50);
    };
  }
}

NumberNode.type = 'Inputs';