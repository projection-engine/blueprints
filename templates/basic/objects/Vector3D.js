import Node from "../Node";

export default class Vector3D extends Node {
    constructor(x, y, z) {
        super(
            [
                {label: 'x', key: 'x'},
                {label: 'y', key: 'y'},
                {label: 'z', key: 'z'}
            ],
            [{label: 'vector', key: 'vector'}])

        this.x = x
        this.y = y
        this.z = z
        this.vector = [this.x, this.y, this.z]
    }
}