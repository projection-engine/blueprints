import Vector from "./Vector";

export default class Vector4D extends Vector {
    constructor(x, y, z, w) {
        super([x, y, z, w])
    }
}