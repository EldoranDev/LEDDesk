export class Output {
  constructor(parent, id, func, options = {}) {

    this.options = Object.assign(
      {}, 
      {
        center: {x:0, y:0},
        color: '#FFF', 
        name: () => "Out"
      },
      options
    );

    this.idAddon = id;
    this.parent = parent;
    this.func = func;
    this.connection = null;
  }

  get id() {
    return this.parent.id + "-" + this.idAddon;
  }

  get value() {
    return this.func();
  }
}