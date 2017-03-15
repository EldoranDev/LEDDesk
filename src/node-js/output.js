export class Output {
  constructor(parent, func, options = {}) {

    this.options = Object.assign(
      {}, 
      {
        color: '#FFF', 
        name: () => "Out"
      },
      options
    );

    this.parent = parent,
    this.func = func;
    this.connection = null;
  }

  get value() {
    return this.func();
  }
}