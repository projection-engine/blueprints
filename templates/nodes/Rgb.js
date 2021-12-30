import Node from '../Node'
import Vector3D from "../algebra/Vector3D";

export default class Rgb extends Vector3D {
    constructor(r, g, b) {
        super(r, g, b, [
                {label: 'R', key: 'r'},
                {label: 'G', key: 'g'},
                {label: 'B', key: 'b'}
            ],
            [{label: 'rgb', type: 'object', key: 'rgb'}]);
        this.name = 'RGB'
    }

    get contribution() {
        return {r: this.values[0], g: this.values[1], b: this.values[2]}
    }
}