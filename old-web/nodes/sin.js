class SinNode extends Node {
  constructor(x, y) {
    super(x, y, 200, 100, "Sinus");

    this.inputs = [
      new Input(this, "Number", '#fff', (val) => val)
    ];

    this.outputs = [
      new Output(this, "Sin(x)", '#fff', () => {
        return Math.sin(this.inputs[0].getValue());
      })
    ]
  }
}