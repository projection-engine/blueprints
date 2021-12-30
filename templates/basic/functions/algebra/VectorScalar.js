import {linearAlgebraMath} from "pj-math";
import Function from "../Function";


export default class VectorScalar extends Function {
    response

    constructor(vecA, scalar) {
        super([
            {label: 'Vector A', key: 'vecA', accept: ['Vector2D', 'Vector3D', 'Vector4D']},
            {label: 'Scalar', key: 'scalar', accept: ['Constant']}
        ]);
        this.vecA = vecA
        this.scalar = scalar
        this.name = 'Vector times scalar'
    }

    execute() {
        this.response = linearAlgebraMath.multiply(this.vecA, this.scalar)
    }
}