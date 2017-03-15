export class Connection {
  constructor(world, output, input) {
    this.output = output;
    this.input = input;
    this.world = world;
    
    if(this.output.connection != null) {
      this.output.connection.destroy();
    }

    if(this.input.connection != null) {
      this.input.connection.destroy();
    }

    this.output.connection = this;
    this.input.connection = this;
    world.connections.push(this);
  }

  get value() {
    return this.output.value;
  }

  destroy() {
    this.input.connection = null;
    this.output.connection = null;
    
    this.world.connections.splice(this.world.connections.indexOf(this), 1);
  }
}