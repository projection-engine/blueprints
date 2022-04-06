import Node from "../../../../../flow/Node";
import {TYPES} from "../../../../../flow/TYPES";
import NODE_TYPES from "../../../../../flow/NODE_TYPES";
import {quat} from "gl-matrix";


export default class QuatRotateX extends Node {
    constructor() {
        super([
            {label: 'Quaternion', key: 'vec', accept: [TYPES.VEC4]},
            {label: 'Angle', key: 'rad', accept: [TYPES.NUMBER]}
        ], [
            {label: 'Result', key: 'res', type: TYPES.VEC4},
        ]);
        this.name = 'QuatRotateX'
        this.size = 1
    }

    get type (){
        return NODE_TYPES.FUNCTION
    }
    static compile(tick, {vec, rad}, entities, attributes, nodeID) {
        attributes[nodeID] = {
            res:quat.rotateX([], vec, rad)
        }
        return attributes
    }
}