import Node from "../Node";

export default class Vector4D extends Node {
    constructor(x, y, z, w) {
        super(
            [
                {label: 'x', key: 'x'},
                {label: 'y', key: 'y'},
                {label: 'z', key: 'z'},
                {label: 'w', key: 'w'},
            ],
            [{label: 'vector', key: 'vector'}])

        this.x = x
        this.y = y
        this.z = z
        this.w = w
        this.vector = [this.x, this.y, this.z, this.w]
    }
}