export class Color {

  constructor(color) {
    if(typeof(color) == "string") {
      let rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);

      color = {
        r: parseInt(rgb[1], 16),
        g: parseInt(rgb[2], 16),
        b: parseInt(rgb[3], 16)
      };
    }

    this.r = color.r;
    this.g = color.g;
    this.b = color.b;

    
  }

  componentToHex(c) {
    let hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  toString() {
    
    return ("#" + 
    this.componentToHex(this.r) + 
    this.componentToHex(this.g) + 
    this.componentToHex(this.b)
    ).toUpperCase();
  };
}