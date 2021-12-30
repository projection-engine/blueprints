import {linearAlgebraMath} from "pj-math";
import Function from "../Function";


export default class AddVector extends Function {
    response

    constructor(vecA, vecB) {
        super([
            {label: 'Vector A', key: 'vecA', accept: ['Vector2D', 'Vector3D', 'Vector4D']},
            {label: 'Vector B', key: 'vecB', accept: ['Vector2D', 'Vector3D', 'Vector4D']}
        ]);
        this.vecA = vecA
        this.vecB = vecB
        this.name = 'Sum vectors'
    }

    execute() {
        this.response = linearAlgebraMath.add(this.vecA, this.vecB)
    }
}