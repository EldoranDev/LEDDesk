class ModNode extends Node {
    constructor(x, y){
        super(x, y, 200, 100, "Modulo");

        this.mod = 0;

        this.inputs = [
            new Input(this, "X", "#FFF", (val) => val)
        ]

        this.outputs = [
            new Output(this, "Mod(X)", '#FFF', () => {
                return this.inputs[0] % this.mod;
            })
        ];
    }
}