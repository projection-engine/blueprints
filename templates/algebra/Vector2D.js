import Vector from "./Vector";

export default class Vector2D extends Vector {
    constructor(x, y, inputs, outputs) {
        super([x, y], inputs, outputs)
    }
}