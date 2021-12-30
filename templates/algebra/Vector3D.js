import Vector from "./Vector";

export default class Vector3D extends Vector {
    constructor(x, y, z, inputs, outputs) {
        super([x, y, z], inputs, outputs)
    }
}