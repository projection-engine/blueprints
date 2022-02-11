import Node from "../../templates/Node";
import {vec2, vec3, vec4} from "gl-matrix";
import {TYPES} from "../../templates/TYPES";



export default class DotProduct extends Node {
    value

    constructor() {
        super([
            {label: 'Vector A', key: 'vecA', accept: [TYPES.VEC]},
            {label: 'Vector B', key: 'vecB', accept: [TYPES.VEC]}
        ],[{label: 'Value', key: 'value', type: TYPES.VEC}]);


        this.name = 'Dot product'
    }

    compile() {
        switch (this.vecA.length) {
            case 2:
                vec2.dot(this.value, this.vecA, this.vecB)
                break
            case 3:
                vec3.dot(this.value, this.vecA, this.vecB)
                break
            case 4:
                vec4.dot(this.value, this.vecA, this.vecB)
                break
            default:
                break
        }
    }
}