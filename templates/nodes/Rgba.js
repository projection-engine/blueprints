import Node from '../Node'
import Vector4D from "../algebra/Vector4D";

export default class Rgba extends Vector4D {
    constructor(r, g, b, a) {
        super(r, g, b, a);
    }

    get color() {
        return {r: this.values[0], g: this.values[1], b: this.values[2], a: this.values[3]}
    }
}