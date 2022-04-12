import Node from "../../../../base/Node";
import {TYPES} from "../../../../base/TYPES";
import NODE_TYPES from "../../../../base/NODE_TYPES";


export default class Abs extends Node {
    constructor() {
        super([
            {label: 'A', key: 'a', accept: [TYPES.NUMBER]}
        ], [
            {label: 'Result', key: 'res', type: TYPES.NUMBER}
        ]);
        this.name = 'AbsoluteValue'
        this.size = 1
    }

    get type() {
        return NODE_TYPES.FUNCTION
    }

    static compile(tick, {a}, entities, attributes, nodeID) {
        attributes[nodeID] = {}
        attributes[nodeID].res = Math.abs(a)

        return attributes
    }
}