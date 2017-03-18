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
        () => Number(this.params.number),
        {
          color: "#FFF",
          name: () => this.params.number
        }
      ),
    ];

    this.contentCreator = (p5) => {
      this.contentDoms.number = p5.createInput();
      this.contentDoms.number.value(this.params.number);
      this.contentDoms.number.style('width: 40px');

      this.contentDoms.up = p5.createButton("+");
      this.contentDoms.down = p5.createButton("-");

      this.contentDoms.up.mousePressed(() => {
        this.params.number++;
        this.contentDoms.number.value(this.params.number);
      });

      this.contentDoms.down.mousePressed(() => {
        this.params.number--;
        this.contentDoms.number.value(this.params.number);
      })

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
      this.contentDoms.number.position(this.options.x + 70, this.options.y + 50);
      this.contentDoms.up.position(this.options.x + 120, this.options.y + 50);
      this.contentDoms.down.position(this.options.x + 45, this.options.y + 50);
    };
  }
}

NumberNode.type = 'Inputs';