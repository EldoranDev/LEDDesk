export class Input {
  constructor(parent, func, options = {}) {

    this.options = Object.assign(
      {}, 
      {
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