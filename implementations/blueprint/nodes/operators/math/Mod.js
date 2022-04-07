import Node from "../../../../../flow/Node";
import {TYPES} from "../../../../../flow/TYPES";
import NODE_TYPES from "../../../../../flow/NODE_TYPES";


export default class Mod extends Node {
    a = 0
    b = 0
    constructor() {
        super([
            {label: 'A', key: 'a', accept: [TYPES.NUMBER], bundled: true, type: TYPES.NUMBER},
            {label: 'B', key: 'b', accept: [TYPES.NUMBER], bundled: true, type: TYPES.NUMBER}
        ], [
            {label: 'Result', key: 'res', type: TYPES.NUMBER}
        ]);
        this.name = 'Modulo'
        this.size = 1
    }

    get type() {
        return NODE_TYPES.FUNCTION
    }

    static compile(tick, {a, b}, entities, attributes, nodeID, executors) {
        const aValue = a !== undefined ? a : executors[nodeID].a,
            bValue = b !== undefined ? b : executors[nodeID].b
        attributes[nodeID] = {
            res: aValue % bValue
        }
        return attributes
    }
}