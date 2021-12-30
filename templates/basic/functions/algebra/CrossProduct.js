import {linearAlgebraMath} from "pj-math";
import Function from "../Function";


export default class CrossProduct extends Function {
    response

    constructor(vecA, vecB) {
        super([
            {label: 'Vector A', key: 'vecA', accept: ['Vector2D', 'Vector3D', 'Vector4D']},
            {label: 'Vector B', key: 'vecB', accept: ['Vector2D', 'Vector3D', 'Vector4D']}
        ]);
        this.vecA = vecA
        this.vecB = vecB
        this.name = 'Cross product'
    }

    execute() {
        this.response = linearAlgebraMath.crossProduct(this.vecA, this.vecB)
    }
}