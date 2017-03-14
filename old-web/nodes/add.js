class AddNode extends Node {
    constructor(x, y) {
        super(x, y, 200, 100, "Add");

        this.add = 0;

        this.inputs = [
            new Input(this, "Number", "#FFF", (val) => val)
        ];

        this.outputs = [
            new Output(this, "Out", "#FFF", () => {
                return (this.inputs[0].getValue() + this.add);
            })
        ];

        this.input = createInput("0");
        this.input.style('width: 50px');
    }

    drawContent() {
        this.input.position(this.x + 90, this.y + 50);
        
        if(isNaN(this.input.value())) {
            this.error = true;
        } else {
            this.error = false;
            this.add = Number(this.input.value());
        }
    }

    destroy() {
        super.destroy();
        this.input.remove();
    }
}