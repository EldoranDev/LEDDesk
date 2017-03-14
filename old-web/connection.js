class Connection {
  constructor(output, input) {
    this.input = input;
    this.output = output;
  }

  update() {
    this.input.setValue(this.output.getValue());
  }

  destroy() {
    connections.splice(connections.indexOf(this), 1);
    this.output.connections.splice(this.output.connections.indexOf(this), 1);
    this.input.connection = null;
  }
}