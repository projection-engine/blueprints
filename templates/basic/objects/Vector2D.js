import Node from "../Node";

export default class Vector2D extends Node {
    constructor(x, y) {
        super(
            [
                {label: 'x', key: 'x'},
                {label: 'y', key: 'y'}
            ],
            [{label: 'vector', key: 'vector'}])

        this.x = x
        this.y = y
        this.vector = [this.x, this.y]
    }
}