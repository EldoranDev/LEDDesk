class RGBSplitterNode extends Node{
  constructor(x, y) {
    super(x, y, 200, 100, "RGB Splitter");

    this.inputs = [
      new Input(this, "Color", "#fff", (val) => {
        return color(val);
      }),
    ]

    this.outputs = [
      new Output(this, 'R', "#E53232", () => {
        if(!this.inputs[0].error) {
          try {
            return red(this.inputs[0].getValue());
          } catch(e) {
            return 0;
          }
        }
      }, true),
      new Output(this, 'G', '#40C950', () => {
        if(!this.inputs[0].error) {
          try {
            return green(this.inputs[0].getValue());
          } catch(e) {
            return 0;
          }
        }
      },true),
      
      new Output(this, 'B', '#447EC9', () => {
        if(!this.inputs[0].error) {
          try {
            return blue(this.inputs[0].getValue());
          } catch(e) {
            return 0;
          }
        }
      }, true)
    ];
  }
}