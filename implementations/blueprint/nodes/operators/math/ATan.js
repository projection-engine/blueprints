import Node from "../../../../../flow/Node";
import {TYPES} from "../../../../../flow/TYPES";
import NODE_TYPES from "../../../../../flow/NODE_TYPES";


export default class ATan extends Node {
    constructor() {
        super([
            {label: 'A', key: 'a', accept: [TYPES.NUMBER]}
        ], [
            {label: 'Result', key: 'res', type: TYPES.NUMBER}
        ]);
        this.name = 'ArcTangent'
        this.size = 1
    }

    get type() {
        return NODE_TYPES.FUNCTION
    }

    static compile(tick, {a}, entities, attributes, nodeID) {
        attributes[nodeID] = {}
        attributes[nodeID].res = Math.atan(a)

        return attributes
    }
}