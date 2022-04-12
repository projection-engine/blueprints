import Node from "../../../base/Node";
import {TYPES} from "../../../base/TYPES";
import NODE_TYPES from "../../../base/NODE_TYPES";
import {vec3, vec4} from "gl-matrix";


export default class RotateVector extends Node {

    constructor() {
        super(
            [
                {label: 'Quat', key: 'a', accept: [TYPES.VEC4]},
                {label: 'Vector', key: 'b', accept: [TYPES.VEC3, TYPES.VEC4]}
            ],
            [
                {label: 'Result', key: 'res', type: TYPES.BOOL}
            ],
        );
        this.name = 'RotateVector'
    }

    get type (){
        return NODE_TYPES.FUNCTION
    }
    static compile(tick, {a, b},  entities, attributes, nodeID) {

        attributes[nodeID] = {}
        attributes[nodeID].res = (b.length === 3 ? vec3 : vec4).transformQuat([], b, a)

        return attributes
    }
}