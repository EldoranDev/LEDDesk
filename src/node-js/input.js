export class Input {
  constructor(parent, func, options = {}) {

    this.options = Object.assign(
      {}, 
      {
        center: {x:0, y:0},
        color: '#FFF', 
        name: () => "In"
      },
      options
    );

    this.parent = parent,
    this.func = func;
    this.connection = null;
  }

  get value() {
    return this.func(this.connection);
  }
}