import Node from "../../templates/Node";
import {vec2, vec3, vec4} from "gl-matrix";
import {TYPES} from "../../templates/TYPES";


export default class SubtractVector extends Node {
    value

    constructor( ) {
        super([
            {label: 'Vector A', key: 'vecA', accept: [TYPES.VEC]},
            {label: 'Vector B', key: 'vecB', accept: [TYPES.VEC]}
        ],[{label: 'Value', key: 'value', type: TYPES.VEC}]);


        this.name = 'Subtract vectors'
    }

    compile() {
        switch (this.vecA.length) {
            case 2:
                vec2.sub(this.value, this.vecA, this.vecB)
                break
            case 3:
                vec3.sub(this.value, this.vecA, this.vecB)
                break
            case 4:
                vec4.sub(this.value, this.vecA, this.vecB)
                break
            default:
                break
        }
    }
}