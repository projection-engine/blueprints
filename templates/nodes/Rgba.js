import Node from '../Node'
import Vector4D from "../algebra/Vector4D";

export default class Rgba extends Vector4D {
    constructor(r, g, b, a) {
        super(r, g, b, a, [
                {label: 'r', key: 'r'},
                {label: 'g', key: 'g'},
                {label: 'b', key: 'b'},
                {label: 'a', key: 'a'}
            ],
            [{label: 'rgba', type: 'object', key: 'rgba'}]);

        this.name = 'RGBA'

    }

    get contribution() {
        return {r: this.values[0], g: this.values[1], b: this.values[2], a: this.values[3]}
    }
}