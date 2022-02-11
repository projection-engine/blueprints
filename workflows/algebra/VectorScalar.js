
import {vec2, vec3, vec4} from "gl-matrix";
import Node from "../../templates/Node";
import {TYPES} from "../../templates/TYPES";


export default class VectorScalar extends Node {
    value

    constructor() {
        super([
            {label: 'Vector A', key: 'vecA', accept: [TYPES.VEC]},
            {label: 'Scalar', key: 'scalar', type: TYPES.NUMBER}
        ],[{label: 'Value', key: 'value', type: TYPES.VEC}]);

        this.scalar = 0
        this.name = 'Vector times scalar'
    }

    compile() {
        switch (this.vecA.length) {
            case 2:
                vec2.scale(this.value, this.vecA, this.scalar)
                break
            case 3:
                vec3.scale(this.value, this.vecA, this.scalar)
                break
            case 4:
                vec4.scale(this.value, this.vecA, this.scalar)
                break
            default:
                break
        }
    }
}